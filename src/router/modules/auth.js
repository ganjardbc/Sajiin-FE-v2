import Layout from '@/components/containers/auth/Layout'
import Login from '@/components/containers/auth/Login'

const routes = {
    path: '/',
    component: Layout,
    children: [
        {
            name: 'login',
            path: '/',
            component: Login
        },
    ]
}

export default routes