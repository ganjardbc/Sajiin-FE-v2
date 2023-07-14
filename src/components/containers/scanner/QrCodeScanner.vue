<template>
    <div id="App" class="component-mobile-content">
        <AppMobileLayout :title="'QR Code Scanner'">
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
                    <div style="padding: 10px 15px;">
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
                                Place the camera to the QR Code and visit that related link.
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
        titleTemplate: '%s | QR Code Scanner',
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
            visibleLoader: false,
            openCreateShop: false,
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
            window.location.replace(result)
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