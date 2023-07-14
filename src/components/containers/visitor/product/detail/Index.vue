<template>
    <div id="App">
        <AppMobileLayout title="Detail Product">
            <div v-if="isDigitalOrderActive" slot="right-button">
                <router-link :to="{name: 'visitor-carts'}">
                    <button class="btn btn-icon btn-white btn-circle">
                        <i class="fa fa-lg fa-shopping-cart"></i>
                        <span class="notif">{{ cartQuantity }}</span>
                    </button>
                </router-link>
            </div>
            <div v-if="loading" class="padding padding-15px">
                <AppLoader />
            </div>
            <div v-else class="width width-100">
                <div v-if="cashBook">
                    <AppEmpty v-if="data && data.length === 0" />
                    <div v-if="data && data.product" class="width width-100">
                        <div class="padding padding-10px">
                            <div class="image image-padding border-full bg-white-grey">
                                <img 
                                    v-if="data.product.image" 
                                    :src="productImageCoverUrl + data.product.image" 
                                    alt="" 
                                    class="post-center">
                                <i v-else class="post-middle-absolute icn fa fa-3x fa-image"></i>
                            </div>
                        </div>

                        <div class="padding padding-10px">
                            <div class="display-flex space-between">
                                <div style="width: calc(100% - 110px);">
                                    <div class="fonts fonts-14 semibold black">{{ data.product.name }}</div>
                                    <div 
                                        v-if="detailSelected || data.product.price" 
                                        class="fonts fonts-14 semibold main">
                                        {{ detailSelected 
                                            ? format(varianPrice(detailSelected))
                                            : data.product.price 
                                                ? format(data.product.price) 
                                                : ''
                                        }}
                                    </div>
                                </div>
                                <div style="width: 110px;" class="display-flex flex-end">
                                    <AppCardCapsule 
                                        :data="data.product.status"
                                        :label="data.product.status === 'active' ? 'Available' : 'Not Available'"
                                        style="margin-top: 5px;"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div class="width width-100 padding padding-top-7px margin margin-bottom-7px bottom-dividing"></div>

                        <div class="padding padding-10px">
                            <div class="fonts fonts-11 semibold black">Description</div>
                            <div class="fonts fonts-10 grey">{{ data.product.description }}</div>
                        </div>

                        <div class="width width-100 padding padding-top-7px margin margin-bottom-7px bottom-dividing"></div>

                        <div class="padding padding-10px">
                            <div class="fonts fonts-11 semibold black">Add to Cart</div>
                            <div 
                                v-if="detailProduct && detailProduct.length > 0 ? true : false" 
                                class="field-group"
                                style="padding-bottom: 0;">
                                <div class="field-label">Varians</div>
                                <ul class="menu-capsule">
                                    <li 
                                        v-for="(dt, index) in detailProduct" 
                                        :key="index" 
                                        :class="
                                            data.product.status === 'active'
                                                ? dt.is_available 
                                                    ? detailSelected === dt.id  
                                                        ? 'enable' 
                                                        : '' 
                                                    : 'disable'
                                                : 'disable'
                                        " 
                                        @click="onChangeDetail(dt.id)">
                                        <div class="row">
                                            <div style="width: 25px;">
                                                <i class="icn fa fa-1x fa-utensils" />
                                            </div>
                                            <div>
                                                <div class="ttl">{{ dt.name }}</div>
                                                <div class="val">
                                                    <span class="fonts fonts-10 black semibold">{{ format(dt.price) }}</span>
                                                    <span v-if="dt.is_discount" class="fonts fonts-9 grey normal text-line">{{ format(dt.second_price) }}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>

                            <div class="field-group">
                                <div class="field-label">Quantity</div>
                                <el-input-number 
                                    v-model="form.quantity"
                                    :min="0"
                                    :max="10"
                                    style="width: 100%;"
                                    :disabled="!isQuantityEnabled(data.product)"></el-input-number>
                            </div>

                            <div class="display-flex space-between margin margin-top-10px margin-bottom-10px">
                                <div class="fonts fonts-11 semibold black">Total ({{ orderQuantity }} products)</div>
                                <div class="fonts fonts-11 semibold orange">{{ format(orderPrice) }}</div>
                            </div>
                            <button 
                                class="btn btn-full btn-main" 
                                :disabled="enableButtonAddProduct || !form.price"
                                @click="onAddProduct">
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
                <AppEmpty 
                    v-else
                    title="This Shop Still Closed, Please Wait To Make The Orders." />
            </div>
        </AppMobileLayout>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import AppMobileLayout from '../../../../modules/AppMobileLayout'
import AppLoader from '../../../../modules/AppLoader'
import AppEmpty from '../../../../modules/AppEmpty'
import AppCardCapsule from '../../../../modules/AppCardCapsule'

export default {
    name: 'App',
    metaInfo: {
        title: 'Visitor',
        titleTemplate: '%s | Detail Product',
        htmlAttrs: {
            lang: 'en',
            amp: true
        }
    },
    data () {
        return {
            detailSelected: null,
        }
    },
    components: {
        AppMobileLayout,
        AppLoader,
        AppEmpty,
        AppCardCapsule,
    },
    mounted () {
        this.resetProduct()
        this.getProductData()
    },
    computed: {
        ...mapState({
            form: (state) => state.storeVisitorOrder.formProduct,
            dataCart: (state) => state.storeVisitorOrder.form.details,
            data: (state) => state.storeVisitorProduct.data,
            loading: (state) => state.storeVisitorProduct.loading,
            dataShop: (state) => state.storeVisitorShop.data,
        }),
        cashBook () {
            return this.dataShop && this.dataShop.cashbook
        },
        selectedShop () {
            return this.dataShop && this.dataShop.shop
        },
        detailProduct () {
            return this.data.details.map((item) => {
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
        },
        isDigitalOrderActive () {
            return this.selectedShop && this.selectedShop.is_digital_order_active
        },
        enableButtonAddProduct () {
            let status = false
            if (this.data.product.status === 'inactive') {
                status = true
            }
            if (this.form.quantity === 0) {
                status = true 
            }
            return status
        },
        orderQuantity () {
            return this.form.quantity
        },
        orderPrice () {
            this.form.subtotal = this.form.quantity * this.form.price
            return this.form.subtotal
        },
        cartQuantity () {
            let quantity = 0
            this.dataCart && this.dataCart.map((item) => {
                quantity += item.quantity
            })
            return quantity
        },
    },
    methods: {
        ...mapActions({
            getProduct: 'storeVisitorProduct/getData',
            addProduct: 'storeVisitorOrder/addProduct',
            resetProduct: 'storeVisitorOrder/resetProduct'
        }),
        isQuantityEnabled (data) {
            let status = true
            if (this.isDigitalOrderActive) {
                if (data.status === 'active' || !this.form.price) {
                    status = true
                } else {
                    status = false
                }
            } else {
                status = false
            }
            return status 
        },
        varianPrice (data) {
            const varian = this.detailProduct.find((item) => item.id === data)
            return varian ? varian.price : 0
        },
        getProductData () {
            const product_id = this.$route.params.productId 
            this.getProduct(product_id).then((res) => {
                this.onChangeDetail(null)
            })
        },
        restQuantity () {
            this.form.quantity = 0
        },
        onChangeDetail (index) {
            if (this.detailSelected === index) {
                const product = this.data.product

                this.detailSelected = null 
                this.form.proddetail_id = null 
                this.form.product_detail = null

                if (product.price  ) {
                    this.form.price = product.price 
                } else {
                    this.form.price = null 
                }
            } else {
                const product = this.data.product
                const detail = this.detailProduct.find((item) => item.id === index)
                const detailId = detail ? detail.id : null 
                const detailName = detail ? detail.name : null 
                const detailPrice = detail ? detail.price : null 

                this.detailSelected = index
                this.form.proddetail_id = detailId
                this.form.product_detail = detailName

                if (index) {
                    this.form.price = detailPrice 
                } else {
                    this.form.price = product.price  
                }
            }

            const product = this.data.product

            this.form.product_id = product && product.id
            this.form.product_image = product && product.image
            this.form.product_name = product && product.name

            this.restQuantity()
        },
        onAddProduct () {
            const detail = this.detailProduct.find((item) => item.id === this.detailSelected)
            const payload = {
                product_id: this.form.product_id,
                product_image: this.form.product_image,
                product_name: this.form.product_name,
                proddetail_id: this.form.proddetail_id,
                product_detail: this.form.product_detail,
                price: this.form.price,
                second_price: detail.second_price,
                value_discount: detail.value_discount,
                is_discount: detail.is_discount,
                quantity: this.form.quantity,
                shop_id: this.form.shop_id,
                shop_id: this.selectedShop.id,
                varian: detail,
            }
            this.addProduct(payload)
            this.$message(`Adding ${this.form.product_name} to cart.`)
            this.restQuantity()
        }
    }
}
</script>