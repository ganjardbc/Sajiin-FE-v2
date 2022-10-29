<template>
    <div id="admin">
        <div :class="'sidebar show'">
            <div class="header">
                <div class="header-content display-flex space-between align-center">
                    <div class="width width-90px" style="margin-left: -5px;">
                        <router-link :to="{name: 'admin-home'}" class="logo">
                            <img :src="logo" alt="SAJI-IN" style="width: 100%;">
                        </router-link>
                    </div>
                    <button class="close btn btn-icon btn-white btn-circle">
                        <i class="fa fa-lg fa-times"></i>
                    </button>
                </div>
            </div>
            <div class="content">
                <AppListMenu 
                    :data.sync="sidebar"
                    :isSidebarSmall="true" />
            </div>
        </div>
        <div class="main">
            <div class="header">
                <div class="header-content display-flex space-between align-center">
                    <div class="display-flex padding padding-left-15px padding-right-15px">
                        <SelectShopField />
                    </div>
                    <div class="display-flex flex-end padding padding-left-15px padding-right-15px">
                        <el-popover
                            placement="bottom-end"
                            width="250"
                            trigger="click">
                            <div>Notification</div>
                            <button 
                                slot="reference"
                                class="btn btn-white btn-icon btn-circle">
                                <i class="icn fa fa-lg fa-bell"></i>
                            </button>
                        </el-popover>
                        <el-popover
                            placement="bottom-end"
                            width="180"
                            trigger="click">
                            <div class="width width-100 content-center">
                                <div class="padding margin margin-bottom-15px border-bottom">
                                    <div 
                                        class="image image-80px image-center image-circle border-full" 
                                        style="text-align: center; margin-bottom: 15px;">
                                        <img 
                                            v-if="dataUser && dataUser.image" 
                                            :src="dataUser && dataUser.image ? (adminImageThumbnailUrl + dataUser.image) : ''" 
                                            alt="">
                                        <i 
                                            v-else 
                                            class="post-top fa fa-lg fa-user-circle" 
                                            style="color: #999;" />
                                    </div>
                                    <div class="fonts fonts-11 align-center semibold black">{{ dataUser && dataUser.username }}</div>
                                    <div class="fonts fonts-9 align-center grey">{{ dataUser && dataUser.role_name }}</div>
                                </div>
                                <router-link :to="{name: 'admin-profile'}">
                                    <button class="btn btn-full btn-small btn-sekunder">Edit Profile</button>
                                </router-link>
                            </div>
                            <button 
                                slot="reference"
                                class="btn btn-sekunder btn-circle margin margin-left-5px">
                                <i class="icn icn-left fa fa-lw fa-user"></i> {{ dataUser && dataUser.username }}
                            </button>
                        </el-popover>
                    </div>
                </div>
            </div>
            <div class="main-content">
                <div class="main-content-smalls">
                    <router-view />
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
import AppPopupProfile from '../../modules/AppPopupProfile'
import SelectShopField from '../../modules/SelectShopField'

const sidebarAdmin = [
    {
        icon: 'fa fa-lg fa-database', label: 'SHOP', value: 0, disableMenu: false, menu: [
            {icon: 'fa fa-lg fa-store', label: 'Shops', value: 0, link: 'admin-shops', permission: 'shops'},
        ]
    },
    {
        icon: 'fa fa-lg fa-database', label: 'OTHERS', value: 0, disableMenu: false, menu: [
            {icon: 'fa fa-lg fa-cogs', label: 'Settings', value: 0, link: 'admin-settings', permission: 'users'},
        ]
    },
]

export default {
    name: 'admin',
    data () {
        return {
            logo: logo,
            icon: icon,
            sidebar: sidebarAdmin,
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
    },
    components: {
        VueLoadImage,
        AppPopupProfile,
        AppToastMessage,
        AppToast,
        AppListMenu,
        SelectShopField
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
        getShopData () {
            const token = this.$session.get('tokenBearer')
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