<template>
    <div id="App" class="display-flex">
        <div class="horizontal-scroll" style="overflow-x: auto;">
            <div class="display-flex left">
                <div 
                    v-for="(dt, i) in data" 
                    :key="i" 
                    :style="`
                        position: relative; 
                        width: 200px; 
                        min-width: 200px;
                        padding: 10px 0; 
                        margin-right: ${i <= (data.length - 1) ? '15px' : '0'};
                    `">
                    <div :class="`card no-padding border-full ${status === 'active' ? 'bg-white' : 'bg-white-grey'}`">
                        <router-link :to="{name: 'visitor-product-detail', params: {productId: dt.product_id}}">
                            <div class="margin margin-15px">
                                <div class="image image-padding border-full">
                                    <img 
                                        v-if="dt.image" 
                                        :src="productImageThumbnailUrl + dt.image" 
                                        alt="" 
                                        class="post-center">
                                    <i v-else class="post-middle-absolute icn fa fa-lg fa-image"></i>
                                </div>
                                <div class="width width-100 margin margin-top-15px">
                                    <div class="fonts fonts-11 semibold">{{ dt.name }}</div>
                                    <div class="fonts fonts-9 normal grey overflow-ellipsis">{{ dt.description }}</div>
                                </div>
                            </div>
                            <div class="margin margin-15px">
                                <AppCardCaption 
                                    icon="fa fa-lg fa-calculator" 
                                    :caption="format(dt.details.length > 0 ? dt.details[0].price : 0)" />
                                <AppCardCaption 
                                    icon="fa fa-lg fa-th-list" 
                                    :caption="`${ dt.details.length } varians`" />
                            </div>
                        </router-link>
                        <div class="margin margin-15px">
                            <button 
                                class="btn btn-main btn-full btn-small btn-small-radius" 
                                :disabled="status === 'active' ? false : true"
                                @click="addToCart(dt)">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
                <!-- <div :style="`
                        position: relative; 
                        width: 150px; 
                        min-width: 150px;
                        height: 375px;
                    `" class="display-flex column align-center center">
                    <button class="btn btn-icon btn-sekunder" style="width: 80px; height: 80px; border-radius: 100%;">
                        <i class="fa fa-lg fa-arrow-right"></i>
                    </button>
                </div> -->
            </div>
        </div>

        <AddCartPopup 
            v-if="visibleAddToCart" 
            :data.sync="selectedData" 
            @onClose="onCloseCart" />
    </div>
</template>
<script>
import AppCardCaption from '../../../../modules/AppCardCaption'
import AppCardCapsule from '../../../../modules/AppCardCapsule'
import AppCardCollapse from '../../../../modules/AppCardCollapse'
import AddCartPopup from '../../cart/AddCartPopup'

export default {
    name: 'App',
    data () {
        return {
            selectedData: null,
            visibleAddToCart: false,
        }
    },
    components: {
        AppCardCaption,
        AppCardCapsule,
        AppCardCollapse,
        AddCartPopup
    },
    props: {
        data: null,
        status: null,
    },
    methods: {
        addToCart (data) {
            this.selectedData = data
            this.visibleAddToCart = true
        },
        onCloseCart () {
            this.visibleAddToCart = false
        }
    }
}
</script>