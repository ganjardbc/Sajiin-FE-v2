<template>
    <div id="App" class="padding padding-15px" v-loading="loading">
        <div class="display-flex space-between align-center">
            <div class="fonts fonts-11 semibold">Not Available</div>
            <div class="fonts fonts-11 normal red">View All</div>
        </div>
        <AppEmpty v-if="data.length === 0" />
        <Card :data.sync="data" status="inactive" />
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Card from '../CardGrid'
import AppEmpty from '../../../../../modules/AppEmpty'

export default {
    name: 'App',
    mounted () {
        this.getProductData()
    },
    components: {
        Card,
        AppEmpty
    },
    computed: {
        ...mapState({
            data: (state) => state.storeVisitorProductInactive.data,
            loading: (state) => state.storeVisitorProductInactive.loading,
            dataShop: (state) => state.storeVisitorShop.data,
        }),
        selectedShop () {
            return this.dataShop.shop
        }
    },
    methods: {
        ...mapActions({
            getProduct: 'storeVisitorProductInactive/getData',
        }),

        // LIST DATA
        getProductData () {
            // const shop_id = this.$route.params.shopId
            const shop_id = this.selectedShop && this.selectedShop.id
            const status = 'inactive'
            if (shop_id) this.getProduct({ shop_id, status })
        },
    },
    watch: {
        dataShop(props, prevProps) {
            if (props !== prevProps) {
                this.getProductData()
            }
        }
    }
}
</script>