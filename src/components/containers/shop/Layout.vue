<template>
    <div id="admin">
        <div :class="`sidebar ${visibleSidebar && 'show'}`">
            <div class="header">
                <div class="header-content display-flex space-between align-center">
                    <div class="width width-90px" style="margin-left: -5px;">
                        <router-link :to="{name: 'shop-home'}" class="logo">
                            <img :src="logo" alt="" style="width: 100%;">
                        </router-link>
                    </div>
                    <button 
                        class="close-button btn btn-icon btn-white btn-circle"
                        @click="onOpenSidebar">
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
                    :isSidebarSmall="true" />
            </div>
            <!-- <div class="footer">
                <AppCardProfile :data.sync="dataUser" />
            </div> -->
        </div>
        <div class="main">
            <div class="header">
                <div class="header-content display-flex space-between align-center">
                    <div class="display-flex align-center padding padding-left-15px padding-right-15px">
                        <button 
                            class="close-button btn btn-white btn-icon btn-circle margin margin-right-5px"
                            @click="onOpenSidebar">
                            <i class="icn fa fa-lw fa-bars"></i>
                        </button>
                        <router-link :to="{name: 'owner-home'}" class="btn btn-white btn-circle margin margin-right-5px">
                            <i class="icn icn-left fa fa-lw fa-store"></i> Shops
                        </router-link>
                    </div>
                    <div class="display-flex flex-end align-center padding padding-left-15px padding-right-15px">
                        <div class="padding padding-right-10px margin margin-right-10px border-right">
                            <AppCardNotification />
                        </div>
                        <AppCardProfile :data.sync="dataUser" />
                    </div>
                </div>
            </div>
            <!-- <div class="header header-double-mobile">
                <div class="header-content display-flex row-reverse display-mobile space-between align-center">
                    <div class="width width-300px width-mobile display-flex space-between align-center" style="height: 60px;">
                        <div class="display-flex padding padding-left-15px padding-right-15px">
                            <button 
                                class="close-button btn btn-white btn-icon btn-circle"
                                @click="onOpenSidebar">
                                <i class="icn fa fa-lw fa-bars"></i>
                            </button>
                        </div>
                        <div class="display-flex align-center flex-end padding padding-left-15px padding-right-15px">
                            <div class="display-flex align-center padding padding-right-10px margin margin-right-10px border-right">
                                <router-link :to="{name: 'owner-home'}">
                                    <button class="btn btn-white btn-icon btn-circle margin margin-right-5px">
                                        <i class="icn fa fa-lg fa-home"></i>
                                    </button>
                                </router-link>
                                <AppCardNotification />
                            </div>
                            <AppCardProfile :data.sync="dataUser" />
                        </div>
                    </div>
                    <div class="width width-280px width-mobile display-flex align-center border-mobile-top"  style="height: 60px;">
                        <div class="width width-100">
                            <div class="padding padding-left-15px padding-right-15px">
                                <SelectShopField />
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->
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
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import VueLoadImage from 'vue-load-image'
import logo from '@/assets/img/logo.png'
import icon from '@/assets/img/icon.png'
import AppListMenu from '../../modules/AppListMenu'
import AppToast from '../../modules/AppToast'
import AppToastMessage from '../../modules/AppToastMessage'
import AppCardNotification from '../../modules/AppCardNotification'
import AppCardProfile from '../../modules/AppCardProfile'
import SelectShopField from '../../modules/SelectShopField'

const defaultSidebar = [
    {
        icon: 'fa fa-lg fa-database', label: 'DASHBOARD', value: 0, disableMenu: false, menu: [
            {icon: 'fa fa-lg fa-tachometer-alt', label: 'Dashboard', value: 0, link: 'shop-home', permission: 'dashboard'},
        ]
    },
    {
        icon: 'fa fa-lg fa-database', label: 'ORDER', value: 0, disableMenu: false, menu: [
            {icon: 'fa fa-lg fa-laptop', label: 'Cashier', value: 0, link: 'shop-cashier', permission: 'cashier'},
            {icon: 'fa fa-lg fa-list-ul', label: 'Orders', value: 0, link: 'shop-orders', permission: 'orders'},
            {icon: 'fa fa-lg fa-calendar-alt', label: 'Reports', value: 0, link: 'shop-reports', permission: 'users'},
        ]
    },
    {
        icon: 'fa fa-lg fa-database', label: 'SHOP', value: 0, disableMenu: false, menu: [
            {icon: 'fa fa-lg fa-utensils', label: 'Products', value: 0, link: 'shop-products', permission: 'products'},
            {icon: 'fa fa-lg fa-th-large', label: 'Tables', value: 0, link: 'shop-tables', permission: 'tables'},
            // {icon: 'fa fa-lg fa-cogs', label: 'Settings', value: 0, link: 'shop-settings', permission: 'users'},
        ]
    },
]

export default {
    name: 'admin',
    data () {
        return {
            logo: logo,
            icon: icon,
            visibleSidebar: false,
            sidebar: defaultSidebar,
            countNotif: 0,
        }
    },
    beforeMount (){
        if (!this.$session.get('token')) {
            this.$router.push({ name: 'login' })
        }
        if (this.$session.get('token')) {
            this.userData()
        }
    },
    mounted () {
        this.getShopData()
        this.getCategoryData()
    },
    components: {
        VueLoadImage,
        AppCardNotification,
        AppCardProfile,
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
            getCategory: 'storeCategory/getData',

            // old store
            setToast: 'toast/setToast',
            setMultipleToast: 'toastmessage/setMultipleToast',
        }),
        setShopData () {
            const shop_id = this.$route.params.shopId
            const shop = this.dataShop.find((item) => item.shop_id === shop_id)
            this.setShop(shop && shop.id)
        },
        getShopData () {
            const token = this.$session.get('tokenBearer')
            this.getShop({ token })
                .then((res) => {
                    this.setShopData()
                })
        },
        getCategoryData () {
            const token = this.$session.get('tokenBearer')
            this.filterCategory.status = 'active'
            this.getCategory({ token })
        },
        onOpenSidebar () {
            this.visibleSidebar = !this.visibleSidebar
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
        async userData () {
            const token = this.$session.get('tokenBearer')
            const res = await this.getUserData(token)
            if (res.data.status === 'ok') {
                const data = res.data.data 

                this.$session.set('user', data.user)
                this.$session.set('role', data.role)
                this.$session.set('shop', data.shop)
                this.$session.set('employee', data.employee)
                this.$session.set('permissions', data.permissions)
            }
        },
    },
    computed: {
        ...mapState({
            data: (state) => state.storeAuth.data,
            filterCategory: (state) => state.storeCategory.filter,
            dataShop: (state) => state.storeSelectedShop.data
        }),
        dataUser () {
            return this.data && this.data.user
        }
    },
    sockets: {
        orderList: function (data) {
            const lth = data.length
            const payload = data && data[lth - 1]
            this.makeMultipleToast(payload.title, payload.subtitle)
        }
    }
}
</script>