<template>
    <div id="App">
        <AppMobileLayout title="Home" :enableLeftSlot="true">
            <div slot="left-button">
                <router-link :to="{name: 'visitor-home'}" class="logo">
                    <img :src="logo" alt="SAJI-IN" style="height: 35px;">
                </router-link>
            </div>
            <div slot="right-button">
                <button class="btn btn-main-reverse with-hover btn-small-radius" @click="onClickExit">
                    Exit <i class="icn icn-right fa fa-lg fa-sign-out-alt"></i>
                </button>
            </div>

            <div v-loading="loading" class="width width-100">
                <div class="padding padding-15px" style="padding-bottom: 0;">
                    <div class="width width-80px width-center">
                        <div class="image image-padding image-center image-circle border-full bg-white-grey">
                            <img v-if="selectedShop && selectedShop.image" :src="selectedShop && selectedShop.image ? (shopImageThumbnailUrl + selectedShop.image) : ''" alt="">
                            <i v-else class="post-middle-absolute fa fa-lg fa-store" style="color: #999;" />
                        </div>
                    </div>
                </div>

                <div class="padding padding-15px" style="padding-bottom: 0;">
                    <h1 class="fonts fonts-11 semibold align-center">{{ selectedShop && selectedShop.name || '-' }}</h1>
                    <div class="fonts fonts-10 grey normal align-center">{{ selectedShop && selectedShop.location || '-' }}</div>
                    <div class="display-flex center padding padding-top-15px">
                        <AppCardCapsule 
                            :data="cashBook ? 'active' : 'inactive'"
                            :label="cashBook ? 'Open' : 'Closed'"
                        />
                    </div>
                </div>

                <div class="padding padding-15px display-flex bottom-dividings">
                    <div class="width width-50">
                        <div class="display-flex align-center margin margin-top-5px">
                            <div style="width: 30px; text-align: left;">
                                <div class="card-value center small">
                                    <i class="fonts fonts-9 white fa fa-lg fa-calendar-alt"></i>
                                </div>
                            </div>
                            <div style="width: calc(100% - 30px);">
                                <div class="fonts fonts-10 normal grey overflow-ellipsis">{{ selectedShop && selectedShop.open_day }} - {{ selectedShop && selectedShop.close_day }}</div>
                            </div>
                        </div>
                        <div class="display-flex align-center margin margin-top-5px">
                            <div style="width: 30px; text-align: left;">
                                <div class="card-value center small">
                                    <i class="fonts fonts-9 white fa fa-lg fa-clock"></i>
                                </div>
                            </div>
                            <div style="width: calc(100% - 30px);">
                                <div class="fonts fonts-10 normal grey overflow-ellipsis">{{ selectedShop && selectedShop.open_time }} - {{ selectedShop && selectedShop.close_time }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="width width-50">
                        <div class="display-flex align-center margin margin-top-5px">
                            <div style="width: 30px; text-align: left;">
                                <div class="card-value center small">
                                    <i class="fonts fonts-9 white fa fa-lg fa-phone"></i>
                                </div>
                            </div>
                            <div style="width: calc(100% - 30px);">
                                <div class="fonts fonts-10 normal grey overflow-ellipsis">{{ selectedShop && selectedShop.phone }}</div>
                            </div>
                        </div>
                        <div class="display-flex align-center margin margin-top-5px">
                            <div style="width: 30px; text-align: left;">
                                <div class="card-value center small">
                                    <i class="fonts fonts-9 white fa fa-lg fa-envelope"></i>
                                </div>
                            </div>
                            <div style="width: calc(100% - 30px);">
                                <div class="fonts fonts-10 normal grey overflow-ellipsis">{{ selectedShop && selectedShop.email }}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <ProductList :style="`
                    padding-bottom: ${isDigitalOrderActive ? '55px' : '0'};
                `" />

                <div v-if="cashBook">
                    <BottomCart v-if="isDigitalOrderActive" />
                </div>
            </div>
        </AppMobileLayout>

        <AppPopupConfirmed 
            v-if="visibleConfirmed"
            :title="'Exit from this shop ?'"
            @onClickNo="onClickNo"
            @onClickYes="onClickYes"
        />
    </div>
</template>
<script>
import { mapState } from 'vuex'
import logo from '@/assets/img/logo.png'
import BottomCart from '../cart/BottomCart'
import ProductList from '../product/Index'
import AppPopupConfirmed from '../../../modules/AppPopupConfirmed'
import AppMobileLayout from '../../../modules/AppMobileLayout'
import AppCardCapsule from '../../../modules/AppCardCapsule'

export default {
    name: 'App',
    metaInfo: {
        title: 'Visitor',
        titleTemplate: '%s | Home',
        htmlAttrs: {
            lang: 'en',
            amp: true
        }
    },
    data () {
        return {
            logo: logo,
            visibleConfirmed: false,
        }
    },
    computed: {
        ...mapState({
            data: (state) => state.storeVisitorShop.data,
            loading: (state) => state.storeVisitorShop.loading,
        }),
        cashBook () {
            return this.data && this.data.cashbook
        },
        selectedShop () {
            return this.data && this.data.shop
        },
        isDigitalOrderActive () {
            return this.selectedShop && this.selectedShop.is_digital_order_active
        },
    },
    components: {
        BottomCart,
        ProductList,
        AppPopupConfirmed,
        AppMobileLayout,
        AppCardCapsule
    },
    methods: {
        onClickExit () {
            this.visibleConfirmed = true 
        },
        onClickYes () {
            this.visibleConfirmed = false 
            this.$router.replace({ name: 'login' })
        },
        onClickNo () {
            this.visibleConfirmed = false 
        },
    },
}
</script>