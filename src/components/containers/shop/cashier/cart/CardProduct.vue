<template>
    <div id="App">
        <div v-for="(dt, index) in data" :key="index" class="margin margin-top-15px margin-bottom-15px">
            <div class="card bg-white box-shadow">
                <div class="display-flex">
                    <div class="width width-50px">
                        <div class="image image-40px border-full">
                            <img 
                                v-if="dt.product_image"
                                :src="productImageThumbnailUrl + dt.product_image" 
                                alt=""
                                class="post-center" 
                                style="width: 100%;">
                            <i v-else class="post-middle-absolute icn fa fa-lw fa-image"></i>
                        </div>
                    </div>
                    <div style="width: calc(100% - 50px);">
                        <div class="width width-100">
                            <div class="fonts fonts-10 black">{{ dt.product_name }}</div>
                            <div class="fonts fonts-10 black" style="margin-bottom: 3px;">{{ dt.product_detail }}</div>
                            <div class="display-flex space-between">
                                <div class="display-flex">
                                    <div class="fonts fonts-10 semibold black">{{ format(dt.price) }}</div>
                                    <div v-if="dt.is_discount" class="fonts fonts-10 grey text-line margin margin-left-5px">{{ format(dt.second_price) }}</div>
                                </div>
                                <div class="fonts fonts-10 semibold red align-right">{{ format(dt.subtotal) }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="display-flex space-between display-mobile">
                    <div class="display-flex margin margin-top-15px">
                        <button 
                            :class="`btn btn-icon btn-sekunder`" 
                            style="margin-right: 5px;"
                            @click="onDelete(index)">
                            <i class="far fa-lw fa-trash-alt"></i>
                        </button>
                        <div class="width width-150px width-mobile">
                            <el-input 
                                placeholder="Write a note"
                                type="text"
                                v-model="dt.note"></el-input>
                        </div>
                    </div>
                    <div class="width width-130px width-mobile margin margin-top-15px">
                        <el-input-number 
                            v-model="dt.quantity"
                            @change="(data) => onTotal(data, index)" 
                            :min="1"
                            :max="10"
                            style="width: 100%;"></el-input-number>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import AddQtyField from '../../../../modules/AddQtyField'

export default {
    name: 'App',
    props: {
        data: null 
    },
    components: {
        AddQtyField
    },
    methods: {
        ...mapActions({
            deleteProduct: 'storeCashier/deleteProduct',
            changeQuantityProduct: 'storeCashier/changeQuantityProduct'
        }),
        onTotal (value, index) {
            const payload = {
                quantity: value,
                index: index
            }
            if (value !== 0) {
                this.changeQuantityProduct(payload)
            } else {
                this.deleteProduct(index)
            }
        },
        onDelete (index) {
            this.deleteProduct(index)
        }
    }
}
</script>