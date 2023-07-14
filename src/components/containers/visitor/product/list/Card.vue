<template>
    <div id="App">
        <div v-for="(dt, i) in dataProduct" :key="i" class="margin margin-top-15px margin-bottom-15px">
            <div :class="`card no-padding box-shadow ${dt.status === 'active' ? 'bg-white' : 'bg-white-grey'}`">
                <router-link :to="{name: 'visitor-product-detail', params: {productId: dt.product_id}}">
                    <div class="display-flex margin margin-15px">
                        <div style="width: calc(100% - 75px);">
                            <div class="fonts fonts-11 semibold">{{ dt.name }}</div>
                            <div class="fonts fonts-9 normal grey overflow-ellipsis">{{ dt.description }}</div>
                        </div>
                        <div style="width: 60px; margin-left: 15px;">
                            <div class="image image-padding border-full">
                                <img 
                                    v-if="dt.image" 
                                    :src="productImageThumbnailUrl + dt.image" 
                                    alt="" 
                                    class="post-center">
                                <i v-else class="post-middle-absolute icn fa fa-lg fa-image"></i>
                            </div>
                        </div>
                    </div>
                </router-link>
                <div class="display-flex space-between align-center margin margin-15px">
                    <AppCardCaption 
                        icon="fa fa-lg fa-calculator" 
                        :caption="
                            dt.price 
                                ? format(dt.price) 
                                : dt.details.length > 0 
                                    ? format(dt.details[0].price)
                                    : 0
                        " />
                    <div class="display-flex flex-end align-center">
                        <div 
                            v-if="dt.details.length > 0" 
                            class="fonts fonts-10 grey normal">{{ dt.details.length }} varians</div>
                        <button 
                            class="btn btn-main-reverse with-border btn-small btn-small-radius" 
                            style="margin-left: 15px;"
                            :disabled="!isButtonEnable(dt)"
                            @click="addToCart(dt)">
                            {{ dt.status === 'active' ? 'Add to Cart' : 'Not Available' }}
                         </button>
                    </div>
                </div>
            </div>
        </div>

        <AddCartPopup 
            v-if="visibleAddToCart" 
            :data.sync="selectedData" 
            @onClose="onCloseCart" />
    </div>
</template>
<script>
import { mapState } from 'vuex'
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
    computed: {
        ...mapState({
            dataShop: (state) => state.storeVisitorShop.data,
        }),
        selectedShop () {
            return this.dataShop.shop
        },
        dataProduct () {
            return this.data.map((product) => {
                const details = product.details.map((item) => {
                    let firstPrice = item.price
                    let secondPrice = 0
                    if (item.is_discount) {
                        secondPrice = item.price 
                        firstPrice = item.price - (item.price * (item.value_discount / 100))
                    }
                    return {
                        ...item,
                        price: firstPrice,
                        second_price: secondPrice,
                    }
                })
                return {
                    ...product,
                    details: details,
                }
            })
        }
    },
    methods: {
        isButtonEnable (data) {
            let status = true
            if (this.selectedShop.is_digital_order_active) {
                if (data.status === 'active') {
                    status = true
                } else {
                    status = false
                }
            } else {
                status = false
            }
            return status 
        },
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