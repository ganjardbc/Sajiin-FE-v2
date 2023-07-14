<template>
    <div id="App" class="padding padding-15px">
        <div class="fonts fonts-11 semibold">Categories</div>
        <CardCategory 
            :data="data"
            @onChange="onCategory" />
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import CardCategory from './Card'

export default {
    components: {
        CardCategory
    },
    mounted () {
        this.getDataCategory()
    },
    computed: {
        ...mapState({
            data: (state) => state.storeVisitorCategory.data,
            filterProduct: (state) => state.storeVisitorProductList.filter,
            dataShop: (state) => state.storeVisitorShop.data,
        }),
        selectedShop () {
            return this.dataShop.shop
        }
    },
    methods: {
        ...mapActions({
            getCategory: 'storeVisitorCategory/getData',
            getProduct: 'storeVisitorProductList/getData',
            resetFilterProduct: 'storeVisitorProductList/resetFilter',
        }),
        onCategory (data) {
            this.filterProduct.category = data
            this.resetFilterProduct()
            this.getDataProduct()
        },
        getDataCategory () {
            const shop_id = this.selectedShop && this.selectedShop.id
            if (shop_id) this.getCategory({ shop_id })
        },
        getDataProduct () {
            const shop_id = this.selectedShop && this.selectedShop.id
            if (shop_id) this.getProduct({ shop_id })
        },
    },
    watch: {
        dataShop(props, prevProps) {
            if (props !== prevProps) {
                this.getDataCategory()
            }
        }
    }
}
</script>