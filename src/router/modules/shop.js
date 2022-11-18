import Layout from '@/components/containers/shop/Layout'
import Home from '@/components/containers/shop/Index'
import Dashboard from '@/components/containers/shop/dashboard/Index'
import Cashier from '@/components/containers/shop/cashier/Index'
import CashBook from '@/components/containers/shop/cashBook/Index'
import Orders from '@/components/containers/shop/orders/Index'
import TaskLists from '@/components/containers/shop/taskLists/Index'
import Products from '@/components/containers/shop/products/Index'
import Employees from '@/components/containers/shop/employees/Index'
import Shifts from '@/components/containers/shop/shifts/Index'
import Settings from '@/components/containers/shop/settings/Index'
import Notifications from '@/components/containers/shop/notifications/Index'
import Tables from '@/components/containers/shop/tables/Index'
import Reports from '@/components/containers/shop/reports/Index'

const routes = {
    path: '/shop/:shopId',
    component: Layout,
    children: [
        {
            name: 'shop-home',
            path: 'home',
            component: Dashboard
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
            name: 'shop-tasklists',
            path: 'tasklists',
            component: TaskLists
        },
        {
            name: 'shop-products',
            path: 'products',
            component: Products
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
            name: 'shop-settings',
            path: 'settings',
            component: Settings
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