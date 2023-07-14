<template>
    <div id="App">
        <div class="component-mobile-content" style="height: 100vh; padding-top: 0px;">
            <div class="post-center padding padding-15px">
                <div class="width width-400-px width-mobile width-center">
                    <div class="card box-shadow" style="padding-top: 30px; padding-bottom: 30px;">
                        <div class="display-flex column align-center">
                            <div class="content-center margin margin-10px">
                                <div class="image image-circle image-130px bg-white-grey" style="margin: auto;">
                                    <i class="post-center fa fa-2x fa-store" style="font-size: 32pt;"></i>
                                </div>
                                <div class="fonts fonts-16 black semibold" style="margin-top: 30px;">
                                    Make your Orders
                                </div>
                                <div class="fonts fonts-10 grey">
                                    by scan the QR shop that have join with us
                                </div>
                            </div>
                            <div class="margin margin-10px">
                                <router-link :to="{name: 'visitor-qrshop'}">
                                    <button class="btn btn-main">
                                        <i class="icn icn-left fa fa-lw fa-qrcode"></i> Scan QR Shop 
                                    </button>
                                </router-link>
                            </div>
                            <div class="width width-100">
                                <div class="display-flex center padding padding-top-10px">
                                    <div class="fonts fonts-11 black align-center">Or</div>
                                </div>
                                <div class="display-flex center padding padding-top-10px">
                                    <router-link :to="{name: 'login'}" class="fonts fonts-11 red semibold align-center">Login as Owner</router-link>
                                </div>
                            </div>
                            <div class="width width-100 display-flex center margin margin-top-30px padding padding-top-30px border-top">
                                <router-link :to="{name: 'visitor-landing'}" class="logo">
                                    <img :src="logo" alt="SAJI-IN" style="height: 30px;">
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import logo from '@/assets/img/logo.png'

export default {
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
            logo: logo,
        }
    },
}
</script>