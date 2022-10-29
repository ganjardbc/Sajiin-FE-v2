import routeAuth from './modules/auth'
import routeAdmin from './modules/admin'
import routeOwner from './modules/owner'
import routeShop from './modules/shop'
import routeCustomer from './customer'
import routeVisitor from './visitor'

export const routes = [
    { ...routeAuth },
    { ...routeAdmin },
    { ...routeOwner },
    { ...routeShop },
    { ...routeCustomer },
    { ...routeVisitor },
];