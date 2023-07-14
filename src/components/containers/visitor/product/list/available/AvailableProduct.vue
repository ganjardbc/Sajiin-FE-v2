<template>
    <div id="App" class="padding padding-15px">
        <div class="fonts fonts-11 semibold">Our Products</div>
        <AppEmpty v-if="!loading && data.length === 0" />
        <Card :data.sync="data" status="active" />
        <AppLoader v-if="loading" />
        <div v-if="loadMore" class="padding padding-15px display-flex center">
            <button 
                class="btn btn-sekunder btn-small-radius"
                @click="getProductData">
                Load More
            </button>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import Card from '../Card'
import AppEmpty from '../../../../../modules/AppEmpty'
import AppLoader from '../../../../../modules/AppLoader'

export default {
    name: 'App',
    mounted () {
        this.getProductData()
    },
    components: {
        Card,
        AppEmpty,
        AppLoader,
    },
    computed: {
        ...mapState({
            data: (state) => state.storeVisitorProductActive.data,
            loading: (state) => state.storeVisitorProductActive.loading,
            loadMore: (state) => state.storeVisitorProductActive.loadMore,
            dataShop: (state) => state.storeVisitorShop.data,
        }),
        selectedShop () {
            return this.dataShop.shop
        }
    },
    methods: {
        ...mapActions({
            getProduct: 'storeVisitorProductActive/getData',
        }),

        // LIST DATA
        getProductData () {
            const shop_id = this.selectedShop && this.selectedShop.id
            if (shop_id) this.getProduct({ shop_id })
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