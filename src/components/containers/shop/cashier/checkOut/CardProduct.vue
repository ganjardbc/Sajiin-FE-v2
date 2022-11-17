<template>
    <div id="App">
        <div v-for="(dt, index) in data" :key="index" class="margin margin-top-15px margin-bottom-15px">
            <div class="card bg-white box-shadow">
                <div class="display-flex margin margin-bottom-10px">
                    <div style="width: 60px; margin-right: 10px;">
                        <div class="image image-padding">
                            <img 
                                v-if="dt.product_image"
                                :src="productImageThumbnailUrl + dt.product_image" 
                                alt=""
                                class="post-center" 
                                style="width: 100%;">
                            <i v-else class="post-middle-absolute icn fa fa-lw fa-image"></i>
                        </div>
                    </div>
                    <div style="width: calc(100% - 70px);">
                        <div class="width width-100">
                            <div class="fonts fonts-10 semibold black" style="margin-bottom: 3px;">
                                {{ dt.product_name }}
                            </div>
                            <div class="display-flex">
                                <div class="fonts fonts-9 black">{{ dt.quantity }} {{ dt.product_detail }} x {{ format(dt.price) }}</div>
                            </div>
                            <div class="fonts fonts-10 semibold black" style="margin-top: 3px;">{{ format(dt.subtotal) }}</div>
                        </div>
                    </div>
                </div>
                <div class="display-flex space-between">
                    <button 
                        :class="`btn btn-icon btn-white`" 
                        @click="onDelete(index)">
                        <i class="far fa-lw fa-trash-alt"></i>
                    </button>

                    <AddQtyField 
                        :maximumValue="'10'" 
                        :value="dt.quantity" 
                        :id="index" 
                        :onChange="(data) => onTotal(data, index)"
                        style="width: 120px;" />
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