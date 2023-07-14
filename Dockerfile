FROM node:14-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY ./ .
RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/docs /usr/share/nginx/html
COPY --from=build-stage /app/default.conf /etc/nginx/conf.d/
EXPOSE 8081
CMD ["nginx", "-g", "daemon off;"]