<template>
    <div id="App" class="margin margin-15px margin-mobile-left-none margin-mobile-right-none">
        <div class="card bg-white box-shadow">
            <div class="display-flex">
                <div class="width width-65px">
                    <div class="image image-50px border-full">
                        <img 
                            v-if="data.image" 
                            :src="productImageThumbnailUrl + data.image" 
                            alt="" 
                            class="post-center">
                        <i v-else class="post-middle-absolute icn fa fa-lg fa-image"></i>
                    </div>
                </div>
                <div style="width: calc(100% - 65px)">
                    <div class="fonts fonts-11 semibold">{{ data.name }}</div>
                    <div class="fonts fonts-9 grey">
                        {{ indexDetail 
                            ? format(varianPrice(indexDetail))
                            : data.price 
                                ? format(data.price) 
                                : ''
                        }}
                    </div>
                </div>
            </div>

            <div class="width width-100">
                <div class="field-group">
                    <div class="field-label">Varians ({{ detailProduct.length }})</div>
                    <el-select 
                        v-model="indexDetail" 
                        placeholder="Select one varian"
                        no-data-text="No Data Disaplayed"
                        :disabled="data.status === 'inactive'"
                        clearable>
                        <el-option
                            v-for="item in detailProduct"
                            :key="item.id"
                            :label="`${item.name} : ${format(item.price)}`"
                            :value="item.id"
                            style="height: auto; padding: 7px 20px;">
                            <div class="display-flex space-between margin margin-bottom-7px">
                                <div class="fonts fonts-10 grey">{{ item.name }}</div>
                                <div v-if="item.is_discount" class="fonts fonts-10 red semibold">-{{ item.value_discount }}%</div>
                            </div>
                            <div class="display-flex flex-start">
                                <div class="fonts fonts-10 black semibold">{{ format(item.price) }}</div>
                                <div v-if="item.is_discount" class="fonts fonts-10 grey text-line margin margin-left-5px">{{ format(item.second_price) }}</div>
                            </div>
                        </el-option>
                    </el-select>
                </div>
                <div class="width width-100 padding padding-top-5px">
                    <button 
                        class="btn btn-main btn-full"
                        :disabled="isButtonEnable(data)"
                        @click="addToCart(data)">
                        <i class="icn icn-left fa fa-lw fa-cart-plus"></i> Add to Cart 
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import AppCardCollapse from '../../../../modules/AppCardCollapse'

export default {
    name: 'App',
    data () {
        return {
            indexDetail: null,
        }
    },
    components: {
        AppCardCollapse
    },
    props: {
        data: null 
    },
    computed: {
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
        }
    },
    methods: {
        ...mapActions({
            addProduct: 'storeCashier/addProduct'
        }),
        isButtonEnable (data) {
            let status = false 
            if (data.status === 'inactive') {
                status = true
            } else {
                if (data.price) {
                    status = false 
                } else {
                    if (this.indexDetail) {
                        status = false
                    } else {
                        status = true
                    }
                }
            }
            return status
        },
        varianPrice (data) {
            const varian = this.detailProduct.find((item) => item.id === data)
            return varian ? varian.price : 0
        },
        addToCart (value) {
            const varian = this.detailProduct.find((item) => item.id === this.indexDetail)
            const payload = {
                ...value,
                varian: varian
            }
            this.indexDetail = null 
            this.addProduct(payload)
            this.$message(`Adding ${value.name} to cart.`)
        }
    }
}
</script>