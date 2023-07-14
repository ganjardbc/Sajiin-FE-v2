<template>
    <div id="admin">
        <div :class="`sidebar ${visibleSidebar && 'show'}`">
            <div class="header">
                <div class="header-content display-flex space-between align-center">
                    <div class="width width-90px" style="margin-left: -5px;">
                        <div class="title" style="text-transform: capitalize;">
                            {{ dataRole ? dataRole.role_name : 'Employee' }}
                        </div>
                    </div>
                    <button 
                        class="close-button btn btn-icon btn-white btn-circle"
                        @click="onCloseSidebar">
                        <i class="fa fa-lg fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="content">
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
                            <router-link :to="{name: 'employee-home'}" class="header-content-main-link">
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
import { mapState, mapActions } from 'vuex'
import VueLoadImage from 'vue-load-image'
import logo from '@/assets/img/logo.png'
import icon from '@/assets/img/icon.png'
import AppListMenu from '../../modules/AppListMenu'
import AppToast from '../../modules/AppToast'
import AppToastMessage from '../../modules/AppToastMessage'
import AppCardNotification from '../../modules/AppCardNotification'
import AppCardProfile from '../../modules/AppCardProfile'
import AppPopupLoader from '../../modules/AppPopupLoader'

const defaultSidebar = [
    {
        icon: 'fa fa-lg fa-database', label: 'DASHBOARD', value: 0, disableMenu: false, menu: [
            {icon: 'fa fa-lg fa-tachometer-alt', label: 'Dashboard', value: 0, link: 'employee-dashboard', permission: 'dashboard'},
        ]
    },
    {
        icon: 'fa fa-lg fa-database', label: 'SHOP', value: 0, disableMenu: false, menu: [
            {icon: 'fa fa-lg fa-laptop', label: 'Cashier', value: 0, link: 'employee-cashier', permission: 'cashier'},
            {icon: 'fa fa-lg fa-book-open', label: 'Cash Book', value: 0, link: 'employee-cash-book', permission: 'cashbooks'},
            {icon: 'fa fa-lg fa-list-ul', label: 'Orders', value: 0, link: 'employee-orders', permission: 'orders'},
            {icon: 'fa fa-lg fa-list-alt', label: 'Task Lists', value: 0, link: 'employee-task-lists', permission: 'tasklists'},
            {icon: 'fa fa-lg fa-th-large', label: 'Tables', value: 0, link: 'employee-tables', permission: 'tables'},
            {icon: 'fa fa-lg fa-utensils', label: 'Products', value: 0, link: 'employee-products', permission: 'products'},
            {icon: 'fa fa-lg fa-clock', label: 'Shifts', value: 0, link: 'employee-shifts', permission: 'shifts'},
            {icon: 'fa fa-lg fa-users', label: 'Employees', value: 0, link: 'employee-employees', permission: 'employees'},
            {icon: 'fa fa-lg fa-calendar-alt', label: 'Reports', value: 0, link: 'employee-reports', permission: 'reports'},
        ]
    },
    {
        icon: 'fa fa-lg fa-database', label: 'EMPLOYEE', value: 0, disableMenu: false, menu: [
            {icon: 'fa fa-lg fa-user', label: 'Profile', value: 0, link: 'employee-profile', permission: 'profile'},
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
    components: {
        VueLoadImage,
        AppToastMessage,
        AppToast,
        AppListMenu,
        AppCardNotification,
        AppCardProfile,
        AppPopupLoader,
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
        setShopData () {
            const shop = this.$cookies.get('shop')
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
        addShopSocket () {
            const data = this.$cookies.get('shop')
            if (data) {
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
        }),
        shopId () {
            return this.$store.state.storeSelectedShop.selectedData
        },
        dataUser () {
            return this.data && this.data.user
        },
        dataRole () {
            return this.$cookies.get('role')
        },
        dataShop () {
            return this.$cookies.get('shop')
        },
        storeLogo () {
            return this.dataShop ? this.shopImageThumbnailUrl + this.dataShop.image : ''
        }
    },
    watch: {
        shopId (prevProps, nextProps) {
            if (prevProps !== nextProps) {
                this.getDataCashBook(this.shopId)
            }
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