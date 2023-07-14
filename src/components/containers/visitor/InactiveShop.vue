<template>
    <div id="App">
        <div class="component-mobile-content" style="height: 100vh; padding-top: 0px;">
            <div class="post-center padding padding-15px">
                <div class="width width-400-px width-mobile width-center">
                    <div class="card box-shadow" style="padding-top: 30px; padding-bottom: 30px;">
                        <div v-if="!loading" class="display-flex column align-center">
                            <div class="content-center margin margin-10px">
                                <div class="width width-130px width-center">
                                    <div class="image image-padding image-center image-circle border-full bg-white-grey">
                                        <img v-if="selectedShop && selectedShop.image" :src="selectedShop && selectedShop.image ? (shopImageThumbnailUrl + selectedShop.image) : ''" alt="">
                                        <i v-else class="post-middle-absolute fa fa-lg fa-store" style="color: #999;" />
                                    </div>
                                </div>
                                <div class="fonts fonts-16 semibold align-center" style="margin-top: 30px;">{{ selectedShop && selectedShop.name || '-' }}</div>
                                <div class="fonts align-center fonts-10 black">
                                    The Owner from this shop has been set Digital Menu to inactive,
                                    So you can not view the menus or create the orders from this shop.
                                </div>
                            </div>
                            <div class="margin margin-10px">
                                <router-link :to="{name: 'visitor-landing'}">
                                    <button class="btn btn-main">
                                        <i class="icn icn-left fa fa-lw fa-home"></i> Back to Main Page
                                    </button>
                                </router-link>
                            </div>
                            <div class="width width-100 display-flex center margin margin-top-30px padding padding-top-30px border-top">
                                <router-link :to="{name: 'visitor-landing'}" class="logo">
                                    <img :src="logo" alt="SAJI-IN" style="height: 30px;">
                                </router-link>
                            </div>
                        </div>
                        <div v-if="loading" class="display-flex column align-center">
                            <AppLoader />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import logo from '@/assets/img/logo.png'
import AppLoader from '../../modules/AppLoader'

export default {
    name: 'App',
    data () {
        return {
            logo: logo,
        }
    },
    components: {
        AppLoader
    },
    computed: {
        ...mapState({
            data: (state) => state.storeVisitorShop.data,
            loading: (state) => state.storeVisitorShop.loading,
        }),
        selectedShop () {
            return this.data.shop
        },
        isDigitalMenuActive () {
            return this.selectedShop && this.selectedShop.is_digital_menu_active
        },
        isDigitalOrderActive () {
            return this.selectedShop && this.selectedShop.is_digital_order_active
        }
    },
}
</script>