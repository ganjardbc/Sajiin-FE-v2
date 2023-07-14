<template>
    <div id="App">
        <AppCardPopup title="Add to Cart" @onClose="onClose">
            <div class="width width-100">
                <div class="field-group display-flex border-bottom">
                    <div style="width: calc(100% - 77px);">
                        <div class="fonts fonts-11 semibold">{{ data.name }}</div>
                        <div class="fonts fonts-9 normal grey">
                            {{ detailSelected 
                                ? format(varianPrice(detailSelected))
                                : data.price 
                                    ? format(data.price) 
                                    : ''
                            }}
                        </div>
                    </div>
                    <div style="width: 60px; margin-left: 15px;">
                        <div class="image image-padding border-full">
                            <img 
                                v-if="data.image" 
                                :src="productImageThumbnailUrl + data.image" 
                                alt="" 
                                class="post-center">
                            <i v-else class="post-middle-absolute icn fa fa-lg fa-image"></i>
                        </div>
                    </div>
                </div>

                <div 
                    v-if="data.details && data.details.length > 0 ? true : false" 
                    class="field-group"
                    style="padding-bottom: 0;">
                    <div class="field-label">Varians</div>
                    <ul class="menu-capsule">
                        <li 
                            v-for="(dt, index) in data.details" 
                            :key="index" 
                            :class="
                                data.status === 'active'
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
                        :disabled="data.status === 'inactive' || !form.price"></el-input-number>
                </div>

                <div class="field-group">
                    <div class="display-flex space-between margin margin-bottom-10px">
                        <div class="fonts fonts-10 semibold black">Total ({{ orderQuantity }} products)</div>
                        <div class="fonts fonts-10 semibold main-color">{{ format(orderPrice) }}</div>
                    </div>
                    <button 
                        class="btn btn-full btn-main" 
                        :disabled="enableButtonAddProduct || !form.price"
                        @click="onAddProduct">
                        Add to Cart
                    </button>
                </div>
            </div>
        </AppCardPopup>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import AppCardPopup from '../../../modules/AppCardPopup'

export default {
    name: 'App',
    data () {
        return {
            detailSelected: null,
        }
    },
    mounted () {
        this.onChangeDetail(null)
    },
    components: {
        AppCardPopup
    },
    props: {
        data: null,
    },
    computed: {
        ...mapState({
            form: (state) => state.storeVisitorOrder.formProduct,
            dataShop: (state) => state.storeVisitorShop.data,
        }),
        selectedShop () {
            return this.dataShop.shop
        },
        enableButtonAddProduct () {
            let status = false
            if (this.data.status === 'inactive') {
                status = true
            }
            if (this.form.quantity === 0) {
                status = true 
            }
            if (!this.form.price) {
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
        }
    },
    methods: {
        ...mapActions({
            addProduct: 'storeVisitorOrder/addProduct',
            resetProduct: 'storeVisitorOrder/resetProduct'
        }),
        varianPrice (data) {
            const varian = this.data.details.find((item) => item.id === data)
            return varian ? varian.price : 0
        },
        restQuantity () {
            this.form.quantity = 0
        },
        onChangeDetail (index) {
            if (this.detailSelected === index) {
                const product = this.data
                
                this.detailSelected = null 
                this.form.proddetail_id = null 
                this.form.product_detail = null

                if (product.price  ) {
                    this.form.price = product.price 
                } else {
                    this.form.price = null 
                }
            } else {
                const detail = this.data.details.find((item) => item.id === index)
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

            const product = this.data

            this.form.product_id = product && product.id
            this.form.product_image = product && product.image
            this.form.product_name = product && product.name

            this.restQuantity()
        },
        onClose () {
            this.$emit('onClose')
        },
        onAddProduct () {
            const detail = this.data.details.find((item) => item.id === this.detailSelected)
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
                shop_id: this.selectedShop.id,
                varian: detail,
            }
            this.addProduct(payload)
            this.$message(`Adding ${this.form.product_name} to cart.`)
            this.resetProduct()
            this.restQuantity()
            this.onClose()
        }
    }
}
</script>