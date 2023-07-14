<template>
    <div id="App">
        <AppCardPopup title="Choose Product" @onClose="onClose">
            <div class="width width-100">
                <div class="width width-100 display-flex space-between margin margin-bottom-10px">
                    <div style="width: calc(100% - 50px);">
                        <SearchField 
                            :placeholder="'Search products ..'" 
                            :enableResponsive="true" 
                            :onChange="(data) => onSearch(data)" /> 
                    </div>
                    <button 
                        class="btn btn-icon btn-white" 
                        @click="onRefresh">
                        <i class="fa fa-lw fa-retweet"></i>
                    </button>
                </div>
                <div class="width width-100">
                    <CardCategory 
                        :data="dataCategory"
                        @onChange="onCategory" />
                </div>
                <div v-loading="loading" class="width width-100">
                    <AppEmpty v-if="data.length === 0" />
                    <div 
                        v-for="(dt, i) in data" 
                        :key="i" 
                        class="margin margin-top-15px margin-bottom-15px">
                        <Card :data="dt" @addToCart="onClose" />
                    </div>
                </div>
                <div class="width width-100 display-flex flex-end align-center">
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
        </AppCardPopup>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import SearchField from '../../../../../modules/SearchField'
import AppEmpty from '../../../../../modules/AppEmpty'
import AppCardPopup from '../../../../../modules/AppCardPopup'
import Card from './Card'
import CardCategory from './CardCategory'

export default {
    data () {
        return {
            currentPage: 1,
        }
    },
    mounted () {
        this.resetFilterProduct()
        this.getCategory()
        this.getProduct()
    },
    components: {
        SearchField,
        AppEmpty,
        AppCardPopup,
        Card,
        CardCategory,
    },
    computed: {
        ...mapState({
            data: (state) => state.storeOrders.product.data,
            loading: (state) => state.storeOrders.product.loading,
            filter: (state) => state.storeOrders.product.filter,
            limit: (state) => state.storeOrders.product.limit,
            offset: (state) => state.storeOrders.product.offset,
            totalRecord: (state) => state.storeOrders.product.totalRecord,
            dataCategory: (state) => state.storeOrders.category.data,
        }),
        shopId () {
            return this.$store.state.storeSelectedShop.selectedData
        },
    },
    watch: {
        shopId (prevProps, nextProps) {
            if (prevProps !== nextProps) {
                this.resetFilterProduct()
                this.getCategory()
                this.getProduct()
            }
        }
    },
    methods: {
        ...mapActions({
            getDataProduct: 'storeOrders/getDataProduct',
            resetFilterProduct: 'storeOrders/resetFilterProduct',
            setPaginationProduct: 'storeOrders/setPaginationProduct',
            getDataCategory: 'storeOrders/getDataCategory',
        }),

        // PRODUCT
        getProduct () {
            const token = this.$cookies.get('tokenBearer')
            const shop_id = this.shopId
            this.getDataProduct({ token, shop_id })
        },
        onSearch (data) {
            this.filter.search = data 
            this.resetFilterProduct()
            this.getProduct()
        },
        onRefresh () {
            this.getProduct()
        },
        onClose () {
            this.$emit('onClose')
        },
        handleCurrentChange (data) {
            this.setPaginationProduct(data)
            this.getProduct()
        },

        // CATEGORY
        getCategory () {
            const token = this.$cookies.get('tokenBearer')
            const user_id = this.$cookies.get('user')
            this.getDataCategory({ token, user_id: user_id.id })
        },
        onCategory (data) {
            this.filter.category = data 
            this.resetFilterProduct()
            this.getProduct()
        }
    }
}
</script>