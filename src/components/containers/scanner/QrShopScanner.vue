<template>
    <div id="App" class="component-mobile-content">
        <AppMobileLayout :title="'QR Shop Scanner'">
            <div>
                <div v-if="error" style="padding: 10px;">
                    <div class="card box-shadow">
                        <p class="fonts fonts-11 red semibold">{{ error }}</p>
                    </div>
                </div>

                <div v-if="visibleLoader">
                    <AppLoader />
                </div>

                <div v-else>
                    <div v-if="!selectedIndex" style="padding: 10px 15px;">
                        <div class="content-center margin margin-10px">
                            <div class="fonts fonts-16 black semibold" style="margin-top: 30px;">
                                Scan The QR Code
                            </div>
                            <div class="padding padding-top-15px padding-bottom-15px">
                                <div class="card bg-white width width-300px width-center" style="border: 5px #FB3640 solid;">
                                    <div class="image image-300px bg-white-grey">
                                        <qrcode-stream @decode="onDecode" @init="onInit">
                                            <div v-if="loading" class="post-middle-absolute">
                                                <AppLoader />
                                            </div>
                                        </qrcode-stream>
                                    </div>
                                </div>
                            </div> 
                            <div class="fonts fonts-10 grey">
                                Place the camera to the QR Code and visit that related shop.
                            </div>
                        </div>
                    </div>

                    <div v-else style="padding: 10px 15px;"> 
                        <div class="card box-shadow" style="margin-top: 15px; margin-bottom: 15px; overflow: unset;">
                            <div class="display-flex space-between" style="padding-top: 5px; padding-bottom: 5px;">
                                <div style="width: 60px; margin-right: 15px;">
                                    <div class="image image-padding border border-full">
                                        <i v-if="!selectedIndex.shop.image" class="post-middle-absolute fa fa-lg fa-store" style="font-size: 32px; color: #999;" />
                                        <img v-else :src="shopImageThumbnailUrl + selectedIndex.shop.image" alt="" class="post-center">
                                    </div>
                                </div>
                                <div style="width: calc(100% - 75px);">
                                    <div class="display-flex space-between align-center" style="margin-bottom: 5px;">
                                        <div class="fonts fonts-11 semibold" style="margin-right: 10px;">{{ selectedIndex.shop.name }}</div>
                                        <AppCardCapsule 
                                            :data="selectedIndex.shop.status"
                                            :label="selectedIndex.shop.status"
                                        />
                                    </div>
                                    <div class="display-flex">
                                        <div style="width: 25px; text-align: center; margin-right: 5px;">
                                            <i class="fonts fonts-9 grey fa fa-lg fa-calendar-alt"></i>
                                        </div>
                                        <div style="width: calc(100% - 30px);">
                                            <div class="fonts fonts-10 normal grey overflow-ellipsis">{{ selectedIndex.shop.open_day }} - {{ selectedIndex.shop.close_day }}</div>
                                        </div>
                                    </div>
                                    <div class="display-flex">
                                        <div style="width: 25px; text-align: center; margin-right: 5px;">
                                            <i class="fonts fonts-9 grey fa fa-lg fa-clock"></i>
                                        </div>
                                        <div style="width: calc(100% - 30px);">
                                            <div class="fonts fonts-10 normal grey overflow-ellipsis">{{ selectedIndex.shop.open_time }} - {{ selectedIndex.shop.close_time }}</div>
                                        </div>
                                    </div>
                                    <div class="display-flex">
                                        <div style="width: 25px; text-align: center; margin-right: 5px;">
                                            <i class="fonts fonts-9 grey fa fa-lg fa-map-marker-alt"></i>
                                        </div>
                                        <div style="width: calc(100% - 30px);">
                                            <div class="fonts fonts-10 normal grey overflow-ellipsis">{{ selectedIndex.shop.location }}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style="padding-top: 15px;">
                                <button class="btn btn-full btn-main" @click="onChangeShop(selectedIndex)">
                                    Enter This Shop 
                                </button>

                                <button class="btn btn-full btn-grey" style="margin-top: 10px;" @click="rescanQR">
                                    Re-scan QR Code
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppMobileLayout>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import VueQrcode from 'vue-qrcode'
import axios from 'axios'
import AppLoader from '../../modules/AppLoader'
import AppMobileLayout from '../../modules/AppMobileLayout'
import AppCardCapsule from '../../modules/AppCardCapsule'

export default {
    name: 'App',
    metaInfo: {
        title: 'SAJI-IN',
        titleTemplate: '%s | QR Shop Scanner',
        htmlAttrs: {
            lang: 'en',
            amp: true
        }
    },
    data () {
        return {
            loading: false,
            result: '',
            error: '',
            validCode: '',
            visibleAlertSave: false,
            visibleLoaderAction: false,
            visibleLoader: false,
            openCreateShop: false,
            selectedShop: null,
            selectedIndex: null,
            datas: []
        }
    },
    components: {
        AppMobileLayout,
        AppLoader,
        AppCardCapsule,
        VueQrcode,
    },
    methods: {
        ...mapActions({
            setShop: 'store/setData',
            setToast: 'toast/setToast'
        }),
        makeToast (title) {
            const payload = {
                visible: true,
                title: title
            }
            this.setToast(payload)
        },
        onDecode (result) {
            const spliting = result.split("/")
            this.result = spliting[spliting.length - 1]
            this.getByID(this.result)
        },

        async onInit (promise) {
            this.loading = true

            try {
                await promise
            } catch (error) {
                if (error.name === 'NotAllowedError') {
                    this.error = "ERROR: you need to grant camera access permisson"
                } else if (error.name === 'NotFoundError') {
                    this.error = "ERROR: no camera on this device"
                } else if (error.name === 'NotSupportedError') {
                    this.error = "ERROR: secure context required (HTTPS, localhost)"
                } else if (error.name === 'NotReadableError') {
                    this.error = "ERROR: is the camera already in use?"
                } else if (error.name === 'OverconstrainedError') {
                    this.error = "ERROR: installed cameras are not suitable"
                } else if (error.name === 'StreamApiNotSupportedError') {
                    this.error = "ERROR: Stream API is not supported in this browser"
                }
            } finally {
                this.loading = false
            }
        },
        rescanQR () {
            this.selectedIndex = null
        },
        onShowHideSave () {
            this.visibleAlertSave = !this.visibleAlertSave
            this.selectedIndex = null
        },
        onButtonShop () {
            this.openCreateShop = !this.openCreateShop
            this.selectedIndex = null
            this.error = ''
            this.result = ''
        },
        onChangeShop (data) {
            this.selectedShop = data
            this.openCreateShop = !this.openCreateShop
            this.$router.replace({ name: 'visitor-home', params: { shopId: this.selectedShop.shop.shop_id } })
        },
        async getByID (id) {
            this.visibleLoader = true 
            this.error = ''

            const payload = {
                shop_id: id
            }

            const rest = await axios.post('/api/public/shopByID', payload)

            if (rest && rest.status === 200) {
                const data = rest.data.data

                if (data) {
                    this.selectedIndex = data 
                } else {
                    this.error = 'Shop not found, please re-scan QR Code.'
                }

                this.visibleLoader = false 
            } else {
                this.visibleLoader = false 
                this.error = 'There is an error, please try again.'
            }
        },
    },
    watch: {
        code (props) {
            if (props) {
                this.validCode = props
            }
        }
    }
}
</script>