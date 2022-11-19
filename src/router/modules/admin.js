import Layout from '@/components/containers/admin/Layout'
import Home from '@/components/containers/admin/Index'
import Bizpars from '@/components/containers/admin/bizpars/Index'
import Payments from '@/components/containers/admin/payments/Index'
import Shipments from '@/components/containers/admin/shipments/Index'
import Categories from '@/components/containers/admin/categories/Index'
import Shops from '@/components/containers/admin/shops/Index'
import Permissions from '@/components/containers/admin/permissions/Index'

const routes = {
    path: '/admin',
    component: Layout,
    children: [
        {
            name: 'admin-home',
            path: 'home',
            component: Home
        },
        {
            name: 'admin-bizpars',
            path: 'bizpars',
            component: Bizpars
        },
        {
            name: 'admin-payments',
            path: 'payments',
            component: Payments
        },
        {
            name: 'admin-shipments',
            path: 'shipments',
            component: Shipments
        },
        {
            name: 'admin-categories',
            path: 'categories',
            component: Categories
        },
        {
            name: 'admin-shops',
            path: 'shops',
            component: Shops
        },
        {
            name: 'admin-permissions',
            path: 'permissions',
            component: Permissions
        }
    ]
}

export default routes 