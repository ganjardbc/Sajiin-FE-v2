import Layout from '@/components/containers/owner/Layout'
// import Home from '@/components/containers/owner/Index'
import Shops from '@/components/containers/owner/shops/Index'
import Categories from '@/components/containers/owner/categories/Index'
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
        // {
        //     name: 'owner-shops',
        //     path: 'shops',
        //     component: Shops
        // },
        {
            name: 'owner-categories',
            path: 'categories',
            component: Categories
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
    ],
}

export default routes 