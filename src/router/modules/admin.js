import Layout from '@/components/containers/admin/Layout'
import Profile from '@/components/containers/user/profile/Index'
import Settings from '@/components/containers/user/settings/Index'
import Home from '@/components/containers/admin/Index'
import Bizpars from '@/components/containers/admin/bizpars/Index'
import Payments from '@/components/containers/admin/payments/Index'
import Shipments from '@/components/containers/admin/shipments/Index'
import Categories from '@/components/containers/admin/categories/Index'
import Positions from '@/components/containers/admin/positions/Index'
import Employees from '@/components/containers/admin/employees/Index'
import Shifts from '@/components/containers/admin/shifts/Index'
import Shops from '@/components/containers/admin/shops/Index'
import Permissions from '@/components/containers/admin/permissions/Index'
import Roles from '@/components/containers/admin/roles/Index'
import Users from '@/components/containers/admin/users/Index'

const routes = {
    path: '/admin',
    component: Layout,
    children: [
        {
            name: 'admin-profile',
            path: 'profile',
            component: Profile
        },
        {
            name: 'admin-settings',
            path: 'settings',
            component: Settings
        },
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
            name: 'admin-positions',
            path: 'positions',
            component: Positions
        },
        {
            name: 'admin-employees',
            path: 'employees',
            component: Employees
        },
        {
            name: 'admin-shifts',
            path: 'shifts',
            component: Shifts
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
        },
        {
            name: 'admin-roles',
            path: 'roles',
            component: Roles
        },
        {
            name: 'admin-users',
            path: 'users',
            component: Users
        }
    ]
}

export default routes 