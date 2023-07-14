<template>
    <div id="App" class="padding padding-15px">
        <div class="fonts fonts-11 semibold">Products</div>
        <AppTabs 
            :selectedIndex.sync="selectedIndex" 
            :isScrollable="false"
            :isFull="true"
            :data="tabs" 
            :onChange="(data) => onChangeTabs(data)"
            class="margin margin-bottom-20px margin-top-20px" />
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
import Card from './Card'
import AppTabs from '../../../../modules/AppTabs'
import AppEmpty from '../../../../modules/AppEmpty'
import AppLoader from '../../../../modules/AppLoader'

export default {
    name: 'App',
    data () {
        return {
            selectedIndex: 0,
            tabs: [
                {id: 1, label: 'All Products', status: 'active'},
                {id: 2, label: 'Available', status: ''},
                {id: 3, label: 'Not Available', status: ''}
            ]
        }
    },
    mounted () {
        this.getProductData()
    },
    components: {
        Card,
        AppTabs,
        AppEmpty,
        AppLoader,
    },
    computed: {
        ...mapState({
            data: (state) => state.storeVisitorProductList.data,
            filter: (state) => state.storeVisitorProductList.filter,
            totalRecord: (state) => state.storeVisitorProductList.totalRecord,
            loading: (state) => state.storeVisitorProductList.loading,
            loadMore: (state) => state.storeVisitorProductList.loadMore,
            dataShop: (state) => state.storeVisitorShop.data,
        }),
        selectedShop () {
            return this.dataShop.shop
        }
    },
    methods: {
        ...mapActions({
            getProduct: 'storeVisitorProductList/getData',
            resetFilter: 'storeVisitorProductList/resetFilter',
        }),

        onChangeTabs (data) {
            this.selectedIndex = data
            switch (this.selectedIndex) {
                case 0:
                    this.filter.status = ''
                    break
                case 1:
                    this.filter.status = 'active'
                    break
                case 2:
                    this.filter.status = 'inactive'
                    break
            }
            this.resetFilter()
            this.getProductData()
        },

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