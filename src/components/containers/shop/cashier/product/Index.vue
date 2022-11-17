<template>
    <div id="App">
        <div class="display-flex space-between display-mobile margin margin-bottom-5px">
            <div class="width width-70 width-mobile display-flex space-between">
                <h1 class="fonts big black bold">Cashier</h1>
                <div class="display-flex">
                    <button 
                        class="btn btn-icon btn-white" 
                        @click="onRefresh">
                        <i class="fa fa-lw fa-retweet"></i>
                    </button>
                </div>
            </div>
            <div class="width width-30 width-mobile">
                <SearchField 
                    :placeholder="'Search products ..'" 
                    :enableResponsive="true" 
                    :onChange="(data) => onSearch(data)" />
            </div>
        </div>
        <div class="width width-100">
            <CardCategory 
                :data="dataCategory"
                @onChange="onCategory" />
        </div>
        <div class="width width-100">
            <div v-loading="loadingProduct" class="display-flex wrap">
                <AppEmpty v-if="dataProduct.length === 0" />
                <div v-for="(data, i) in dataProduct" :key="i" class="column-3 mobile-column">
                    <CardProduct :data="data" />
                </div>
            </div>
            <div class="width width-100 display-flex flex-end align-center padding padding-top-15px">
                <div class="fonts fonts-10 normal black">Total {{ totalRecord }}</div>
                <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="limit"
                    :pager-count="5"
                    layout="prev, pager, next"
                    :total="totalRecord">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import SearchField from '../../../../modules/SearchField'
import AppEmpty from '../../../../modules/AppEmpty'
import CardProduct from './CardProduct'
import CardCategory from './CardCategory'

export default {
    name: 'App',
    data () {
        return {
            currentPage: 1,
        }
    },
    mounted () {
        this.resetFilterCategory()
        this.getDataCategory()
        this.getDataProduct()
    },
    components: {
        AppEmpty,
        SearchField,
        CardProduct,
        CardCategory
    },
    computed: {
        ...mapState({
            dataProduct: (state) => state.storeCashierProduct.data,
            totalRecord: (state) => state.storeCashierProduct.totalRecord,
            limit: (state) => state.storeCashierProduct.limit,
            filter: (state) => state.storeCashierProduct.filter,
            loadingProduct: (state) => state.storeCashierProduct.loading,
            dataCategory: (state) => state.storeCashierCategory.data,
            loadingCategory: (state) => state.storeCashierCategory.loading,
        }),
        shopId () {
            return this.$store.state.storeSelectedShop.selectedData
        },
    },
    watch: {
        shopId (prevProps, nextProps) {
            if (prevProps !== nextProps) {
                this.resetFilterCategory()
                this.getDataCategory()
                this.getDataProduct()
            }
        }
    },
    methods: {
        ...mapActions({
            getProduct: 'storeCashierProduct/getData',
            resetProductFilter: 'storeCashierProduct/resetFilter',
            setProductPagination: 'storeCashierProduct/setPagination',
            getCategory: 'storeCashierCategory/getData'
        }),
        onRefresh () {
            this.getDataProduct()
        },
        onSearch (data) {
            this.filter.search = data 
            this.resetProductFilter()
            this.getDataProduct()
        },
        onCategory (data) {
            this.filter.category = data 
            this.resetProductFilter()
            this.getDataProduct()
        },
        handleCurrentChange (value) {
            this.setProductPagination(value)
            this.getDataProduct()
        },
        resetFilterCategory () {
            this.filter.category = ''
        },

        // LIST DATA
        getDataProduct () {
            const token = this.$session.get('tokenBearer')
            const shop_id = this.shopId
            this.getProduct({ token, shop_id })
        },
        getDataCategory () {
            const token = this.$session.get('tokenBearer')
            this.getCategory({ token })
        }
    }
}
</script>