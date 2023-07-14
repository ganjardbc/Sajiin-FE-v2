import Layout from '@/components/containers/scanner/Layout'
import Landing from '@/components/containers/scanner/Index'
import QrShopScanner from '@/components/containers/scanner/QrShopScanner'
import QrCodeScanner from '@/components/containers/scanner/QrCodeScanner'

const routes = {
    path: '/visitor',
    component: Layout,
    children: [
        {
            name: 'visitor-landing',
            path: '/',
            component: Landing
        },
        {
            name: 'visitor-qrshop',
            path: '/qrshop-scanner',
            component: QrShopScanner
        },
        {
            name: 'visitor-qrscanner',
            path: '/qrcode-scanner',
            component: QrCodeScanner
        },
    ]
}

export default routes 