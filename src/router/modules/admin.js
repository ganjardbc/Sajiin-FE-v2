import Layout from '@/components/containers/admin/Layout'
import Home from '@/components/containers/admin/Index'

const routes = {
    path: '/admin',
    component: Layout,
    children: [
        {
            name: 'admin-home',
            path: 'home',
            component: Home
        },
    ]
}

export default routes 