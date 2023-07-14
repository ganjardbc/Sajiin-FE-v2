<template>
    <div id="admin">
        <div :class="`sidebar ${visibleSidebar && 'show'}`">
            <div class="header">
                <div class="header-content display-flex space-between align-center">
                    <div class="title">Shop</div>
                    <button 
                        class="close-button btn btn-icon btn-white btn-circle"
                        @click="onCloseSidebar">
                        <i class="fa fa-lg fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="content">
                <div class="padding padding-10px">
                    <SelectShopField />
                </div>
                <AppListMenu 
                    :data.sync="sidebar"
                    :isSidebarSmall="true"
                    @onClick="onCloseSidebar" />
            </div>
        </div>
        <div class="main">
            <div class="header">
                <div class="header-content-fixed">
                    <div class="header-content-main">
                        <div class="header-content-main-left">
                            <button 
                                class="btn btn-white btn-icon btn-circle margin margin-right-5px"
                                @click="onOpenSidebar">
                                <i class="icn fa fa-lw fa-bars"></i>
                            </button>
                        </div>
                        <div class="header-content-main-center">
                            <router-link :to="{name: 'shop-home'}" class="header-content-main-link">
                                <img :src="storeLogo ? storeLogo : logo" alt="" class="header-content-main-logo">
                            </router-link>
                        </div>
                        <div class="header-content-main-right">
                            <div class="display-flex align-center padding padding-right-10px margin margin-right-10px border-right">
                                <AppCardNotification />
                            </div>
                            <AppCardProfile :data.sync="dataUser" />
                        </div>
                    </div>
                </div>
            </div>
            <div class="main-content">
                <div class="main-content-smalls">
                    <router-view />
                </div>
                <div class="display-flex center padding padding-20px">
                    <div class="fonts fonts-10 grey align-center">App Version 1.0.0</div>
                </div>
            </div>
        </div>

        <AppToast />

        <AppToastMessage />

        <AppPopupLoader 
            v-if="loadingShop"
            title="Getting Shop Data, Please Wait"
        />
    </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import VueLoadImage from 'vue-load-image'
import logo from '@/assets/img/logo.png'
import icon from '@/assets/img/icon.png'
import AppListMenu from '../../modules/AppListMenu'
import AppToast from '../../modules/AppToast'
import AppToastMessage from '../../modules/AppToastMessage'
import AppCardNotification from '../../modules/AppCardNotification'
import AppCardProfile from '../../modules/AppCardProfile'
import AppPopupLoader from '../../modules/AppPopupLoader'
import SelectShopField from '../../modules/SelectShopField'

const defaultSidebar = [
    {
        icon: 'fa fa-lg fa-database', label: 'DASHBOARD', value: 0, disableMenu: true, menu: [
            {icon: 'fa fa-lg fa-store', label: 'Back to Shops', value: 0, link: 'owner-home', permission: 'settings'},
        ]
    },
    {
        icon: 'fa fa-lg fa-database', label: 'DASHBOARD', value: 0, disableMenu: false, menu: [
            {icon: 'fa fa-lg fa-tachometer-alt', label: 'Dashboard', value: 0, link: 'shop-dashboard', permission: 'dashboard'},
        ]
    },
    {
        icon: 'fa fa-lg fa-database', label: 'CASHIER', value: 0, disableMenu: false, menu: [
            {icon: 'fa fa-lg fa-laptop', label: 'Cashier', value: 0, link: 'shop-cashier', permission: 'cashier'},
            {icon: 'fa fa-lg fa-book-open', label: 'Cash Book', value: 0, link: 'shop-cash-book', permission: 'cashbooks'},
        ]
    },
    {
        icon: 'fa fa-lg fa-database', label: 'ORDER', value: 0, disableMenu: false, menu: [
            {icon: 'fa fa-lg fa-list-ul', label: 'Orders', value: 0, link: 'shop-orders', permission: 'orders'},
            {icon: 'fa fa-lg fa-list-alt', label: 'Task Lists', value: 0, link: 'shop-task-lists', permission: 'tasklists'},
            {icon: 'fa fa-lg fa-calendar-alt', label: 'Reports', value: 0, link: 'shop-reports', permission: 'reports'},
        ]
    },
    {
        icon: 'fa fa-lg fa-database', label: 'PRODUCT', value: 0, disableMenu: false, menu: [
            {icon: 'fa fa-lg fa-list-ol', label: 'Categories', value: 0, link: 'shop-categories', permission: 'categories'},
            {icon: 'fa fa-lg fa-utensils', label: 'Products', value: 0, link: 'shop-products', permission: 'products'},
        ]
    },
    {
        icon: 'fa fa-lg fa-database', label: 'EMPLOYEE', value: 0, disableMenu: false, menu: [
            {icon: 'fa fa-lg fa-clock', label: 'Shifts', value: 0, link: 'shop-shifts', permission: 'shifts'},
            {icon: 'fa fa-lg fa-users', label: 'Employees', value: 0, link: 'shop-employees', permission: 'employees'},
        ]
    },
    {
        icon: 'fa fa-lg fa-database', label: 'SHOP', value: 0, disableMenu: false, menu: [
            {icon: 'fa fa-lg fa-th-large', label: 'Tables', value: 0, link: 'shop-tables', permission: 'tables'},
            {icon: 'fa fa-lg fa-cogs', label: 'Settings', value: 0, link: 'shop-settings', permission: 'settings'},
        ]
    }
]

export default {
    name: 'admin',
    data () {
        return {
            logo: logo,
            icon: icon,
            visibleSidebar: false,
            sidebar: defaultSidebar
        }
    },
    components: {
        VueLoadImage,
        AppCardNotification,
        AppCardProfile,
        AppPopupLoader,
        AppToastMessage,
        AppToast,
        AppListMenu,
        SelectShopField
    },
    methods: {
        ...mapActions({
            // new store
            getUserData: 'storeAuth/getUserData',
            setShop: 'storeSelectedShop/setSelectedData',
            getShop: 'storeSelectedShop/getData',
            getCashBook: 'storeCashBook/getCurrent',
            resetCashBook: 'storeCashBook/restDataCurrent',

            // old store
            setToast: 'toast/setToast',
            setMultipleToast: 'toastmessage/setMultipleToast',
        }),
        goBack () {
            this.$router.push({name: 'owner-home'})
        },
        setShopData () {
            const shop_id = this.$route.params.shopId
            const shop = this.dataShop.find((item) => item.shop_id === shop_id)
            this.$cookies.set('shop', shop)
            this.setShop(shop && shop.id)
        },
        getShopData () {
            const token = this.$cookies.get('tokenBearer')
            this.getShop({ token })
                .then((res) => {
                    const status = res.data.status 
                    if (status === 'ok') {
                        this.$message('Success getting shop')
                        this.setShopData()
                        this.getDataCashBook(this.shopId)
                        this.addShopSocket()
                    } else {
                        this.$message({
                            message: 'Failed getting shop',
                            type: 'error'
                        })
                    }
                })
        },
        getDataCashBook (shop_id) {
            const token = this.$cookies.get('tokenBearer')
            const today = new Date()
            if (shop_id) {
                this.resetCashBook()
                this.getCashBook({ token, today: today, shop_id: shop_id })
                    .then((res) => {
                        const status = res.data.status 
                        if (status === 'ok') {
                            this.$message('Success getting cash book')
                        } else {
                            this.$message({
                                message: 'Failed getting cash book',
                                type: 'error'
                            })
                        }
                    })
            }
        },
        
        onOpenSidebar () {
            this.visibleSidebar = true 
        },
        onCloseSidebar () {
            this.visibleSidebar = false 
        },
        onChangeMenu (data) {
            this.selectedLabel = this.menuShops[data].label
        },
        makeToast (title, subtitle) {
            const time = new Date().getTime()
            const payload = {
                visible: true,
                title: title,
                subtitle: subtitle
            }
            this.setToast(payload)
        },
        makeMultipleToast (title, subtitle) {
            const time = new Date().getTime()
            const payload = {
                id: time,
                visible: true,
                title: title,
                subtitle: subtitle
            }
            this.setMultipleToast(payload)
        },
        userData () {
            const token = this.$cookies.get('tokenBearer')
            this.getUserData(token).then((res) => {
                const data = res.data.data 

                this.$cookies.set('user', data.user)
                this.$cookies.set('role', data.role)
                this.$cookies.set('shop', data.shop)
                this.$cookies.set('employee', data.employee)
                this.$cookies.set('permissions', JSON.stringify(data.permissions))
            }).catch(() => {
                this.$cookies.remove('token')
                this.$cookies.remove('tokenBearer')
                this.$cookies.remove('user')
                this.$cookies.remove('role')
                this.$cookies.remove('shop')
                this.$cookies.remove('employee')
                this.$cookies.remove('permissions')
                this.$cookies.remove('thermalStatus')
                this.$cookies.remove('thermalUrl')

                this.$router.replace({ name: 'login' })
            })
        },
        addShopSocket () {
            for (let i = 0; i < this.dataShop.length; i++) {
                const data = this.dataShop[i]
                const payload = {
                    id: data.id,
                    shopId: data.shop_id,
                    name: data.name,
                    image: data.image
                }
                this.$socket.emit('addShop', payload)
            }
        }
    },
    computed: {
        ...mapState({
            data: (state) => state.storeAuth.data,
            loadingShop: (state) => state.storeSelectedShop.loading,
            dataShop: (state) => state.storeSelectedShop.data,
        }),
        ...mapGetters({
            getSelectedData: 'storeSelectedShop/getSelectedData'
        }),
        shopId () {
            return this.$store.state.storeSelectedShop.selectedData
        },
        dataUser () {
            return this.data && this.data.user
        },
        storeLogo () {
            return this.getSelectedData ? this.shopImageThumbnailUrl + this.getSelectedData.image : ''
        }
    },
    beforeMount (){
        if (!this.$cookies.get('token')) {
            this.$router.push({ name: 'login' })
        }
        if (this.$cookies.get('token')) {
            this.userData()
        }
    },
    mounted () {
        this.getShopData()
    },
    sockets: {
        connect: function () {
            this.addShopSocket()
        },
        // shopList: function (data) {
        //     console.log('shopList', data)
        // },
    }
}
</script>