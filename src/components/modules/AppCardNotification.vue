<template>
    <div id="App">
        <el-popover
            placement="bottom-end"
            width="250"
            trigger="click"
            popper-class="app-card-notification">
            <div class="width width-100" style="break-word: unset !important;">
                <div class="display-flex space-between align-center padding padding-bottom-5px">
                    <div class="fonts fonts-10 semibold black">Notifications {{ totalUnread ? `(${totalUnread})` : '' }}</div>
                    <button class="btn btn-small-icon btn-circle btn-white" @click="onReload">
                        <i class="fa fa-lw fa-retweet"></i>
                    </button>
                </div>
                <div v-loading="loading" style="max-height: 300px; text-align: left;" class="change-scrollbar">
                    <AppEmpty v-if="data.length === 0" />
                    <div v-else class="width width-100" style="width: calc(100% - 2px);">
                        <div 
                            v-for="(dt, i) in data" :key="i" 
                            :class="`card border-full ${dt.is_read ? 'bg-white' : 'bg-white-grey'}`"
                            style="margin: 5px 0; cursor: pointer;"
                            @click="onRoute(dt)">
                            <div class="display-flex align-center space-between margin margin-bottom-5px">
                                <div class="fonts fonts-10 semibold black" style="text-transform: capitalize;">{{ dt.type }}</div>
                                <div class="fonts fonts-9 grey">{{ dt.created_at | moment("from", "now") }}</div>
                            </div>
                            <div class="fonts fonts-9 normal black margin margin-bottom-5px">{{ dt.message }}</div>
                            <div class="fonts fonts-9 grey">{{ dt.target }}</div>
                        </div>

                        <div 
                            v-if="data.length !== totalRecord" 
                            class="display-flex center padding padding-top-10px padding-bottom-10px">
                            <button 
                                class="btn btn-small btn-sekunder" 
                                @click="onLoadMore">
                                Load More
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <button 
                slot="reference"
                class="btn btn-white btn-icon btn-circle">
                <i class="fa fa-lg fa-bell"></i>
                <span v-if="totalUnread" class="notif">{{ totalUnread }}</span>
            </button>
        </el-popover>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import AppEmpty from './AppEmpty'
import icon from '@/assets/img/icon.png'

export default {
    name: 'App',
    data () {
        return {
            icon: icon,
            currentPage: 0,
            selectedIndex: 0,
        }
    },
    components: {
        AppEmpty
    },
    computed: {
        ...mapState({
            filter: (state) => state.storeNotification.filter,
            form: (state) => state.storeNotification.form,
            data: (state) => state.storeNotification.data,
            totalRecord: (state) => state.storeNotification.totalRecord,
            totalUnread: (state) => state.storeNotification.totalUnread,
            totalRead: (state) => state.storeNotification.totalRead,
            loading: (state) => state.storeNotification.loading,
        }),
        limit: {
            get() {
                return this.$store.state.storeNotification.limit
            },
            set (value) {
                this.$store.state.storeNotification.limit = value 
            }
        },
        offset: {
            get() {
                return this.$store.state.storeNotification.offset
            },
            set (value) {
                this.$store.state.storeNotification.offset = value 
            }
        },
        shopId () {
            return this.$store.state.storeSelectedShop.selectedData
        },
        paramShopId () {
            return this.$route.params.shopId
        },
    },
    methods: {
        ...mapActions({
            getNotification: 'storeNotification/getData',
            resetFilter: 'storeNotification/resetFilter',
            setFormData: 'storeNotification/setFormData',
            updateData: 'storeNotification/updateData',
        }),
        onLoadMore () {
            this.offset = this.offset + this.limit
            this.getData()
        },
        onReload () {
            this.resetFilter()
            this.getData()
        },
        onSearch (data) {
            this.filter.search = data 
            this.resetFilter()
            this.getData()
        },
        onRoute (data) {
            const type = data.type 
            switch (type) {
                case 'order':
                    let path = 'shop-orders'
                    const roleName = this.$cookies.get('user') 
                        ? this.$cookies.get('user').role_name 
                        : ''

                    if (roleName === 'owner') {
                        path = 'shop-orders'
                    } else {
                        path = 'employee-orders'
                    }

                    this.updateNotification(data)
                    this.$router.push({
                        name: path, 
                        query: { 
                            search: data.target 
                        }
                    }).catch(error => {
                        if (error.name != "NavigationDuplicated") {
                            throw error;
                        }
                    })
                    break
                default:
                    this.$message('Undefined notification !')
                    break
            }
        },

        // CRUD 
        updateNotification (data) {
            this.setFormData({
                ...data,
                is_read: 1,
            })
            const token = this.$cookies.get('tokenBearer')
            this.updateData({
                ...this.form,
                token: token
            }).then((res) => {
                const status = res.data.status 
                const newData = res.data.data 
                if (status === 'ok') {
                    const findData = this.data.find((item) => item.notification_id === newData.notification_id)
                    if (findData) {
                        findData.is_read = newData.is_read
                    }
                }
            })
        },

        // LIST DATA
        getData () {
            const token = this.$cookies.get('tokenBearer')
            const shop_id = this.shopId
            if (shop_id) {
                this.getNotification({ token, shop_id })
            }
        },

        // OTHERS 
        buildPushNotification (data) {
            if (Notification.permission === "granted") {
                new Notification(data.shopName, {
                    body: data.message,
                    icon: this.icon
                })
            }
        },
        buildNotification (data) {
            let title = 'Notification'
            this.$notify({
                title: data.shopName,
                message: data.message,
                position: 'top-right',
                type: 'success',
                offset: 70,
                duration: 0,
            })
        }
    },
    watch: {
        shopId (prevProps, nextProps) {
            if (prevProps !== nextProps) {
                this.onReload()
            }
        }
    },
    mounted() {
        this.onReload()
    },
    sockets: {
        notification: function (data) {
            this.buildNotification(data)
            this.buildPushNotification(data)
            this.onReload()
        },
    }
}
</script>
<style>
.app-card-notification {
    word-break: unset;
}
</style>