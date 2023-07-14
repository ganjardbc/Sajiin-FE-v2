<template>
    <div id="App">
        <div class="width width-100">
            <div class="display-flex space-between display-mobile margin margin-bottom-15px">
                <div class="width width-60 width-mobile display-flex space-between">
                    <h1 class="fonts big black bold">Task lists</h1>
                    <div class="display-flex">
                        <button 
                            class="btn btn-icon btn-white" 
                            @click="onRefresh">
                            <i class="fa fa-lw fa-retweet"></i>
                        </button>
                    </div>
                </div>
                <div class="width width-25 width-mobile display-flex space-between">
                    <SearchField 
                        :placeholder="'Search task lists ..'" 
                        :enableResponsive="true" 
                        :onChange="(data) => onSearch(data)"
                        class="width width-100 margin margin-mobile-bottom-15px"
                     />
                </div>
                <div class="width width-15 width-mobile display-flex space-between">
                    <el-select 
                        v-model="filter.cashbook_id" 
                        @change="handleFilterSearch"
                        :loading="loadingCashbook"
                        clearable
                        placeholder="Select"
                        no-data-text="No Data Disaplayed"
                        class="width width-100 margin margin-left-10px margin-mobile-left-none"
                    >
                        <el-option
                            v-for="(item, i) in cashBookList(stateCashbookList)"
                            :key="i"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            
            <div class="width width-100">
                <div v-loading="loading">
                    <AppEmpty v-if="data.length === 0" />
                    <Card 
                        :data.sync="data"
                        @onViewProduct="onViewProduct" />
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

        <div :class="`content-form ${!visibleFormTaskList && 'hide'}`">
            <div class="right">
                <Form 
                    @onClose="onCloseProduct"
                    @onChangeStatatus="onChangeStatatus"></Form>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import SearchField from '../../../modules/SearchField'
import AppTabs from '../../../modules/AppTabs'
import AppEmpty from '../../../modules/AppEmpty'
import Card from './Card'
import Form from './Form'

export default {
    name: 'App',
    metaInfo: {
        title: 'Shop',
        titleTemplate: '%s | Task Lists',
        htmlAttrs: {
            lang: 'en',
            amp: true
        }
    },
    data () {
        return {
            currentPage: 0,
            visibleFormTaskList: false,
        }
    },
    mounted () {
        this.getData()
    },
    components: {
        SearchField,
        AppTabs,
        AppEmpty,
        Card,
        Form
    },
    computed: {
        ...mapState({
            data: (state) => state.storeTaskLists.data,
            selected: (state) => state.storeTaskLists.selected,
            totalRecord: (state) => state.storeTaskLists.totalRecord,
            limit: (state) => state.storeTaskLists.limit,
            loading: (state) => state.storeTaskLists.loading,
            filter: (state) => state.storeTaskLists.filter,
            loadingCashbook: (state) => state.storeCashBook.loading,
            dataCurrent: (state) => state.storeCashBook.dataCurrent,
        }),
        stateCashbookList () {
            return this.dataCurrent && this.dataCurrent.all_cashbook
        },
        shopId () {
            return this.$store.state.storeSelectedShop.selectedData
        },
    },
    watch: {
        shopId (prevProps, nextProps) {
            if (prevProps !== nextProps) {
                this.getData()
            }
        }
    },
    methods: {
        ...mapActions({
            getTaskList: 'storeTaskLists/getData',
            setPagination: 'storeTaskLists/setPagination',
            setSelected: 'storeTaskLists/setSelected',
            updateData: 'storeTaskLists/updateData',
            resetFilter: 'storeTaskLists/resetFilter',
        }),
        onChangeTabs (data) {
            this.selectedIndex = data 
        },
        onSearch (data) {
            this.filter.search = data 
            this.resetFilter()
            this.getData()
        },
        onRefresh () {
            this.getData()
        },

        // LIST DATA 
        getData () {
            const token = this.$cookies.get('tokenBearer')
            const shop_id = this.shopId
            if (shop_id) {
                this.getTaskList({ token, shop_id })
            }
        },
        handleCurrentChange (value) {
            this.setPagination(value)
            this.getData()
        },
        handleFilterSearch () {
            this.currentPage = 1
            this.handleCurrentChange(1)
        },

        // VIEW PRODUCT 
        onViewProduct (data) {
            this.setSelected(data)
            this.visibleFormTaskList = true 
        },
        onCloseProduct () {
            this.visibleFormTaskList = false 
        },

        // STATUS 
        onChangeStatatus (data) {
            const token = this.$cookies.get('tokenBearer')
            const payload = { ...data }
            this.updateData({ payload, token })
                .then((res) => {
                    const resData = res.data 
                    if (resData.status === 'ok') {
                        const newPayload = {
                            ...this.selected, 
                            details: resData.data 
                        }
                        this.setSelected(newPayload)
                        this.onRefresh()
                        this.$message(`Success changed status for product ${data.product_name}.`)
                    } else {
                        this.$message(`Failed to chang status for product ${data.product_name}.`)
                    }
                })
        }
    }
}
</script>