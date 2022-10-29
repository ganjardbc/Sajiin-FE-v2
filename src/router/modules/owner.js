import Layout from '@/components/containers/owner/Layout'
import Shops from '@/components/containers/owner/shops/Index'
import Profile from '@/components/containers/owner/profile/Index'
import Settings from '@/components/containers/owner/settings/Index'

const routes = {
    path: '/owner',
    component: Layout,
    children: [
        {
            name: 'owner-home',
            path: 'home',
            component: Shops
        },
        {
            name: 'owner-profile',
            path: 'profile',
            component: Profile
        },
        {
            name: 'owner-settings',
            path: 'settings',
            component: Settings
        },
    ]
}

export default routes 