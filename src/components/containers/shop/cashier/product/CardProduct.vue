<template>
    <div id="App" class="margin margin-15px">
        <div class="card bg-white box-shadow">
            <div class="display-flex align-center">
                <div class="width width-65px">
                    <div class="image image-50px">
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
                    <div class="fonts fonts-9 grey overflow-ellipsis">{{ data.description }}</div>
                </div>
            </div>

            <!-- <div class="image image-half-padding">
                <img 
                    v-if="data.image" 
                    :src="productImageThumbnailUrl + data.image" 
                    alt="" 
                    class="post-center">
                <i v-else class="post-middle-absolute icn fa fa-lg fa-image"></i>
            </div> -->

            <div class="width width-100">
                
                <!-- <div class="width width-100 padding padding-top-10px">
                    <div class="fonts fonts-11 semibold">{{ data.name }}</div>
                    <div class="fonts fonts-9 grey overflow-ellipsis">{{ data.description }}</div>
                </div> -->

                <div class="field-group">
                    <div class="field-label">Varians ({{ data.details.length }})</div>
                    <el-select 
                        v-model="indexDetail" 
                        placeholder="Select one varian"
                        no-data-text="No Data Disaplayed"
                        :disabled="data.status === 'inactive'">
                        <el-option
                            v-for="item in data.details"
                            :key="item.id"
                            :label="`${item.name} : ${format(item.price)}`"
                            :value="item.id">
                            <span class="margin margin-top-7px fonts fonts-10 grey" style="float: left;">{{ item.name }}</span>
                            <span class="margin margin-top-7px fonts fonts-10 black semibold" style="float: right;">{{ format(item.price) }}</span>
                        </el-option>
                    </el-select>
                </div>
                <div class="width width-100 padding padding-top-5px">
                    <button 
                        class="btn btn-main btn-full"
                        :disabled="!indexDetail || data.status === 'inactive'"
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
    methods: {
        ...mapActions({
            addProduct: 'storeCashier/addProduct'
        }),
        addToCart (value) {
            const varian = this.data.details.find((item) => item.id === this.indexDetail)
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