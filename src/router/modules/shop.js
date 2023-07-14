import Layout from '@/components/containers/shop/Layout'
import Home from '@/components/containers/shop/Index'
import Profile from '@/components/containers/user/profile/Index'
import Settings from '@/components/containers/shop/settings/Index'
import Dashboard from '@/components/containers/shop/dashboard/Index'
import Cashier from '@/components/containers/shop/cashier/Index'
import CashBook from '@/components/containers/shop/cashBook/Index'
import Orders from '@/components/containers/shop/orders/Index'
import TaskLists from '@/components/containers/shop/taskLists/Index'
import Products from '@/components/containers/shop/products/Index'
import Categories from '@/components/containers/shop/categories/Index'
import Employees from '@/components/containers/shop/employees/Index'
import Shifts from '@/components/containers/shop/shifts/Index'
import Notifications from '@/components/containers/shop/notifications/Index'
import Tables from '@/components/containers/shop/tables/Index'
import Reports from '@/components/containers/shop/reports/Index'

const routes = {
    path: '/shop/:shopId',
    component: Layout,
    children: [
        {
            name: 'shop-profile',
            path: 'profile',
            component: Profile
        },
        {
            name: 'shop-settings',
            path: 'settings',
            component: Settings
        },
        {
            name: 'shop-home',
            path: 'home',
            component: Home
        },
        {
            name: 'shop-dashboard',
            path: 'dashboard',
            component: Dashboard
        },
        {
            name: 'shop-cashier',
            path: 'cashier',
            component: Cashier
        },
        {
            name: 'shop-cash-book',
            path: 'cash-book',
            component: CashBook
        },
        {
            name: 'shop-orders',
            path: 'orders',
            component: Orders
        },
        {
            name: 'shop-task-lists',
            path: 'task-lists',
            component: TaskLists
        },
        {
            name: 'shop-products',
            path: 'products',
            component: Products
        },
        {
            name: 'shop-categories',
            path: 'categories',
            component: Categories
        },
        {
            name: 'shop-tables',
            path: 'tables',
            component: Tables
        },
        {
            name: 'shop-employees',
            path: 'employees',
            component: Employees
        },
        {
            name: 'shop-shifts',
            path: 'shifts',
            component: Shifts
        },
        {
            name: 'shop-notifications',
            path: 'notifications',
            component: Notifications
        },
        {
            name: 'shop-reports',
            path: 'reports',
            component: Reports
        },
    ]
}

export default routes 