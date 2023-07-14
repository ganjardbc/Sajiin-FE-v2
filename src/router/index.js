import routeAuth from './modules/auth'
import routeAdmin from './modules/admin'

export const routes = [
    { ...routeAuth },
    { ...routeAdmin },
];