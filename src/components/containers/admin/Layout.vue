<template>
    <div id="admin">
        <div :class="`sidebar ${visibleSidebar && 'show'}`">
            <div class="header">
                <div class="header-content display-flex space-between align-center">
                    <div class="width width-90px" style="margin-left: -5px;">
                        <div class="title">Admin</div>
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
                            <router-link :to="{name: 'admin-home'}" class="width width-90px">
                                <img :src="logo" alt="" style="width: 100%;">
                            </router-link>
                        </div>
                        <div class="header-content-main-right">
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

const defaultSidebar = [
    {
        icon: 'fa fa-lg fa-database', label: 'MASTERDATA', value: 0, disableMenu: false, menu: [
            {icon: 'fa fa-lg fa-list', label: 'Bizpars', value: 0, link: 'admin-bizpars', permission: 'bizpars'},
            {icon: 'fa fa-lg fa-calculator', label: 'Payments', value: 0, link: 'admin-payments', permission: 'payments'},
            // {icon: 'fa fa-lg fa-building', label: 'Positions', value: 0, link: 'admin-positions', permission: 'employees'},
        ]
    },
    {
        icon: 'fa fa-lg fa-database', label: 'USER', value: 0, disableMenu: false, menu: [
            {icon: 'fa fa-lg fa-key', label: 'Permissions', value: 0, link: 'admin-permissions', permission: 'permissions'},
            {icon: 'fa fa-lg fa-flag', label: 'Roles', value: 0, link: 'admin-roles', permission: 'roles'},
            {icon: 'fa fa-lg fa-users', label: 'Users', value: 0, link: 'admin-users', permission: 'users'},
        ]
    },
    {
        icon: 'fa fa-lg fa-database', label: 'SHOP', value: 0, disableMenu: false, menu: [
            {icon: 'fa fa-lg fa-store', label: 'Shops', value: 0, link: 'admin-shops', permission: 'shops'},
        ]
    },
    {
        icon: 'fa fa-lg fa-database', label: 'EMPLOYEE', value: 0, disableMenu: false, menu: [
            {icon: 'fa fa-lg fa-clock', label: 'Shifts', value: 0, link: 'admin-shifts', permission: 'employees'},
            {icon: 'fa fa-lg fa-users', label: 'Employees', value: 0, link: 'admin-employees', permission: 'employees'},
        ]
    },
    {
        icon: 'fa fa-lg fa-database', label: 'SETTING', value: 0, disableMenu: false, menu: [
            {icon: 'fa fa-lg fa-cogs', label: 'Settings', value: 0, link: 'admin-settings', permission: 'settings'},
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
    components: {
        VueLoadImage,
        AppToastMessage,
        AppToast,
        AppListMenu,
        AppCardNotification,
        AppCardProfile,
    },
    methods: {
        ...mapActions({
            // new store
            getUserData: 'storeAuth/getUserData',
            getShop: 'storeSelectedShop/getData',

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
        getShopData () {
            const token = this.$cookies.get('tokenBearer')
            this.getShop({ token })
        }
    },
    computed: {
        ...mapState({
            data: (state) => state.storeAuth.data,
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