<template>
    <div id="App">
        <div class="width width-100">
            <div class="display-flex space-between display-mobile margin margin-bottom-15px">
                <div class="width width-75 width-mobile display-flex space-between">
                    <h1 class="fonts big black bold">Orders</h1>
                    <div class="display-flex">
                        <button 
                            class="btn btn-icon btn-white" 
                            @click="onRefresh">
                            <i class="fa fa-lw fa-retweet"></i>
                        </button>
                    </div>
                </div>
                <div class="width width-25 width-mobile">
                    <el-input
                        placeholder="Search orders .."
                        suffix-icon="el-icon-search"
                        clearable
                        v-model="filter.search"
                        @change="onSearch">
                    </el-input>
                </div>
            </div>

            <div class="display-flex row-reverse space-between align-center display-mobile">
                <div 
                    class="width width-300px width-mobile display-flex space-between" 
                    style="padding-bottom: 10px;">
                    <el-select 
                        v-model="filter.payment_status" 
                        @change="handleFilterSearch"
                        clearable
                        placeholder="Select payment"
                        no-data-text="No Data Disaplayed"
                        style="width: calc(50% - 7.5px);">
                        <el-option
                            v-for="(item, i) in orderPaymentStatus"
                            :key="i"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                    <el-select 
                        v-model="filter.cashbook_id" 
                        @change="handleFilterSearch"
                        :loading="loadingCashbook"
                        clearable
                        placeholder="Select cash book"
                        no-data-text="No Data Disaplayed"
                        style="width: calc(50% - 7.5px);">
                        <el-option
                            v-for="(item, i) in cashBookList(stateCashbookList)"
                            :key="i"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div 
                    class="width width-500px width-mobile"
                    style="padding-bottom: 10px;">
                    <AppTabs 
                        :selectedIndex.sync="selectedIndex" 
                        :isFull="true"
                        :isScrollable="false"
                        :data="tabs" 
                        :onChange="(data) => onChangeTabs(data)"
                    />
                </div>
            </div>

            <div class="width width-100">
                <div v-loading="loading">
                    <AppEmpty v-if="data.length === 0" />
                    <Card 
                        :data.sync="data"
                        @onDetail="onDetail"
                        @onEdit="onEdit"
                        @onDelete="onDelete"
                        @onChangeStatus="onChangeStatus"
                        @onCheckout="onOpenCheckout"
                        @onReceipt="onOpenReceipt" />
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

        <div :class="`content-form ${!visibleFormOrder && 'hide'}`">
            <div class="right">
                <DetailOrder 
                    @onSave="onOpenVisibleConfirmed"
                    @onClose="onClose"
                    @onChangeStatus="onChangeStatus"
                    @onCheckout="onOpenCheckout"
                    @onReceipt="onOpenReceipt"
                    @onProduct="onOpenProduct"
                    @onCustomer="onOpenCustomer">
                </DetailOrder>
            </div>
        </div>

        <div :class="`content-form ${!visibleFormCheckout && 'hide'}`">
            <div class="right">
                <FormCheckout 
                    @onSave="onSaveCheckout"
                    @onClose="onCloseCheckout"
                    @onCreateOrder="onOpenVisibleConfirmed">
                </FormCheckout>
            </div>
        </div>

        <div :class="`content-form ${!visibleFormReceipt && 'hide'}`">
            <div class="right">
                <FormReceipt 
                    @onSave="onOpenReceipt"
                    @onClose="onCloseReceipt"
                    @onPrint="onPrintReceipt">
                </FormReceipt>
            </div>
        </div>

        <div :class="`content-form ${!visibleFormCustomer && 'hide'}`">
            <div class="right">
                <FormCustomer 
                    @onSave="onSaveCustomer"
                    @onClose="onCloseCustomer">
                </FormCustomer>
            </div>
        </div>

        <div :class="`content-form ${!visibleFormProduct && 'hide'}`">
            <div class="right">
                <FormProduct 
                    @onSave="onSaveProduct"
                    @onClose="onCloseProduct">
                </FormProduct>
            </div>
        </div>

        <AppPopupConfirmed 
            v-if="visibleConfirmed"
            :title="titleConfirmed"
            @onClickNo="onClickNo"
            @onClickYes="onClickYes"
        />

        <AppPopupConfirmed 
            v-if="visibleConfirmedStatus"
            :title="titleConfirmedStatus"
            @onClickNo="onClickNoStatus"
            @onClickYes="onClickYesStatus"
        />

        <AppPopupConfirmed 
            v-if="visibleConfirmedProduct"
            :title="titleConfirmedProduct"
            @onClickNo="onClickNoProduct"
            @onClickYes="onClickYesProduct"
        />

        <AppPopupConfirmed 
            v-if="visibleConfirmedDelete"
            :title="'Delete this order ?'"
            @onClickNo="onClickNoDelete"
            @onClickYes="onClickYesDelete"
        />

        <AppPopupAlert 
            v-if="visibleAlert"
            :title="titleAlert"
            :icon="iconAlert"
            @onClickOk="onClickOk"
        />

        <AppPopupLoader 
            v-if="loadingForm"
        />
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import AppEmpty from '../../../modules/AppEmpty'
import AppPopupLoader from '../../../modules/AppPopupLoader'
import AppPopupConfirmed from '../../../modules/AppPopupConfirmed'
import AppPopupAlert from '../../../modules/AppPopupAlert'
import SearchField from '../../../modules/SearchField'
import AppTabs from '../../../modules/AppTabs'
import DetailOrder from './DetailOrder'
import Card from './Card'
import FormCheckout from './checkOut/Index'
import FormReceipt from './receipt/Index'
import FormProduct from './product/Index'
import FormCustomer from './customer/Index'

const tabs = [
    {id: 1, label: 'All Order', status: 'active'},
    {id: 2, label: 'New Order', status: ''},
    {id: 3, label: 'On Progress', status: ''},
    {id: 4, label: 'Done', status: ''},
    {id: 5, label: 'Canceled', status: ''},
]

export default {
    name: 'App',
    metaInfo: {
        title: 'Shop',
        titleTemplate: '%s | Orders',
        htmlAttrs: {
            lang: 'en',
            amp: true
        }
    },
    data () {
        return {
            formClass: false,
            visibleFormOrder: false,
            visibleFormCheckout: false,
            visibleFormReceipt: false,
            visibleFormProduct: false,
            visibleFormCustomer: false,
            visibleAlert: false,
            titleAlert: 'Failed to preceed data',
            iconAlert: 'fa fa-4x fa-info-circle',
            visibleConfirmed: false,
            visibleConfirmedDelete: false,
            visibleConfirmedStatus: false,
            visibleConfirmedProduct: false,
            titleConfirmed: 'Save this data ?',
            titleConfirmedStatus: 'Update this order status ?',
            titleConfirmedProduct: 'Update product from this order ?',
            currentPage: 1,
            selectedIndex: 0,
            selectedData: null,
            tabs: tabs,
        }
    },
    mounted () {
        this.onChangeTabs(0)
    },
    created () {
        this.filter.search = this.paramOrderId
    },
    components: {
        AppEmpty,
        AppPopupLoader,
        AppPopupConfirmed,
        AppPopupAlert,
        AppTabs,
        SearchField,
        DetailOrder,
        Card,
        FormCheckout,
        FormReceipt,
        FormProduct,
        FormCustomer,
    },
    computed: {
        ...mapState({
            filter: (state) => state.storeOrders.filter,
            form: (state) => state.storeOrders.form,
            data: (state) => state.storeOrders.data,
            totalRecord: (state) => state.storeOrders.totalRecord,
            orderPaymentStatus: (state) => state.storeOrders.orderPaymentStatus,
            limit: (state) => state.storeOrders.limit,
            loading: (state) => state.storeOrders.loading,
            loadingForm: (state) => state.storeOrders.loadingForm,
            typeForm: (state) => state.storeOrders.typeForm,
            formVarian: (state) => state.storeOrdersDetail.form,
            loadingCashbook: (state) => state.storeCashBook.loading,
            dataCurrent: (state) => state.storeCashBook.dataCurrent,
        }),
        stateCashbookList () {
            return this.dataCurrent && this.dataCurrent.all_cashbook
        },
        typeForm: {
            get () {
                return this.$store.state.storeOrders.typeForm
            },
            set (value) {
                this.$store.state.storeOrders.typeForm = value
            }
        },
        shopId () {
            return this.$store.state.storeSelectedShop.selectedData
        },
        paramOrderId () {
            return this.$route.query.search || ''
        }
    },
    watch: {
        shopId (prevProps, nextProps) {
            if (prevProps !== nextProps) {
                this.getData()
            }
        },
        paramOrderId () {
            this.filter.search = this.paramOrderId
            this.getData()
        }
    },
    methods: {
        ...mapActions({
            getOrder: 'storeOrders/getData',
            setPagination: 'storeOrders/setPagination',
            resetFormData: 'storeOrders/resetFormData',
            resetFilter: 'storeOrders/resetFilter',
            setFormData: 'storeOrders/setFormData',
            createData: 'storeOrders/createData',
            updateData: 'storeOrders/updateData',
            deleteData: 'storeOrders/deleteData',
            updateDataProduct: 'storeOrders/updateDataProduct',
            setLoadingForm: 'storeOrders/setLoadingForm',
        }),
        onSearch (data) {
            this.filter.search = data 
            this.resetFilter()
            this.getData()
        },
        onClose () {
            this.visibleFormOrder = false
        },
        onRefresh () {
            this.getData()
        },
        onChangeTabs (data) {
            this.selectedIndex = data
            switch (this.selectedIndex) {
                case 0:
                    this.filter.status = ''
                    break
                case 1:
                    this.filter.status = 'new-order'
                    break
                case 2:
                    this.filter.status = 'on-progress'
                    break
                case 3:
                    this.filter.status = 'done'
                    break
                case 4:
                    this.filter.status = 'canceled'
                    break
            }
            this.handleFilterSearch()
        },

        // LIST DATA 
        getData () {
            const token = this.$cookies.get('tokenBearer')
            const shop_id = this.shopId
            if (shop_id) {
                this.getOrder({ token, shop_id })
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

        // ALERT
        onClickOk () {
            this.visibleAlert = false
        },

        // CONFIRMED
        onClickNo () {
            this.visibleConfirmed = false 
        },
        onClickYes () {
            this.visibleConfirmed = false 
            const token = this.$cookies.get('tokenBearer')
            this.updateData({
                ...this.form,
                token: token
            }).then((res) => {
                const status = res.data.status 
                if (status === 'ok') {
                    this.visibleFormOrder = false 
                    this.visibleFormCheckout = false 
                    this.visibleFormCustomer = false 
                    this.getData()
                    this.$message('This order has been updated')

                    if (this.typeForm === 'checkout') {
                        this.visibleFormReceipt = true 
                    }
                } else {
                    this.visibleAlert = true 
                    this.titleAlert = 'Failed to save this order'
                }
            })
        },

        // SAVE
        onOpenVisibleConfirmed () {
            this.visibleConfirmed = true
            this.titleConfirmed = 'Save this order ?'
        },

        // CREATE
        onCreate () {
            this.visibleFormOrder = true
            this.resetFormData()
            this.form.shop_id = this.shopId
            this.typeForm = 'create'
        },

        // DETAIL
        onDetail (data) {
            this.visibleFormOrder = true
            this.resetFormData()
            this.setFormData(data)
            this.typeForm = 'detail'
        },

        // EDIT
        onEdit (data) {
            this.visibleFormOrder = true
            this.resetFormData()
            this.setFormData(data)
            this.typeForm = 'edit'
        },

        // DELETE
        onDelete (data) {
            this.visibleConfirmedDelete = true 
            this.setFormData(data)
        },
        onClickNoDelete () {
            this.visibleConfirmedDelete = false 
        },
        onClickYesDelete () {
            this.visibleConfirmedDelete = false 
            const token = this.$cookies.get('tokenBearer')
            this.deleteData({
                ...this.form,
                token: token
            }).then((res) => {
                const status = res.data.status 
                if (status === 'ok') {
                    this.getData()
                    this.$message('This order has been deleted')
                } else {
                    this.visibleAlert = true 
                    this.titleAlert = 'Failed to delete this order'
                }
            })
        },

        // STATUS
        onClickNoStatus () {
            this.visibleConfirmedStatus = false 
        },
        onClickYesStatus () {
            this.visibleFormOrder = false
            this.visibleConfirmedStatus = false 

            const token = this.$cookies.get('tokenBearer')
            this.setFormData(this.selectedData)
            this.updateData({
                ...this.form,
                token: token
            }).then((res) => {
                const status = res.data.status 
                if (status === 'ok') {
                    this.getData()
                    this.$message(`Success changed status for order ${this.selectedData.order_id}.`)
                } else {
                    this.$message(`Failed to change status for order ${this.selectedData.order_id}.`)
                }
            })
        },
        onChangeStatus (data) {
            if (data.status === 'new-order') {
               this.titleConfirmedStatus = 'Re-Open this order ?'
            }
            if (data.status === 'on-progress') {
               this.titleConfirmedStatus = 'Pick this order ?'
            }
            if (data.status === 'done') {
               this.titleConfirmedStatus = 'Mark as "Done" for this order ?'
            }
            if (data.status === 'canceled') {
               this.titleConfirmedStatus = 'Cancel this order ?'
            }
            this.visibleConfirmedStatus = true 
            this.selectedData = data 
        },

        // CHECKOUT 
        onOpenCheckout (data) {
            this.visibleFormCheckout = true 
            this.typeForm = 'checkout'
            this.setFormData(data)
        },
        onCloseCheckout () {
            this.visibleFormCheckout = false
        },
        onSaveCheckout () {
            this.visibleFormCheckout = false 
        },

        // RECEIPT 
        onOpenReceipt (data) {
            this.visibleFormReceipt = true 
            this.typeForm = 'receipt'
            this.setFormData(data)
        },
        onCloseReceipt () {
            this.visibleFormReceipt = false
        },
        onPrintReceipt () {
            alert('onPrintReceipt')
        },

        // CUSTOMER
        onOpenCustomer (data) {
            this.visibleFormCustomer = true 
            this.typeForm = 'edit-customer'
            this.setFormData(data)
        },
        onSaveCustomer () {
            this.visibleConfirmed = true
            this.titleConfirmed = 'Edit this customer ?'
        },
        onCloseCustomer () {
            this.visibleFormCustomer = false 
        },

        // PRODUCT 
        onOpenProduct (data) {
            this.visibleFormProduct = true 
            this.typeForm = 'edit-product'
            this.setFormData(data)
        },
        onCloseProduct () {
            this.visibleFormProduct = false
        },
        onSaveProduct () {
            this.visibleConfirmedProduct = true
        },
        onClickNoProduct () {
            this.visibleConfirmedProduct = false 
        },
        onClickYesProduct () {
            this.visibleConfirmedProduct = false 

            const token = this.$cookies.get('tokenBearer')
            const order = this.form 
            const details = this.form.details

            delete order.shop_image
            delete order.details
            delete order.shop 
            delete order.table 
            delete order.payment
            delete order.cashier
            delete order.created_by
            delete order.created_at

            this.updateDataProduct({
                order: order,
                details: details,
                token: token
            }).then((res) => {
                const status = res.data.status 
                if (status === 'ok') {
                    this.visibleFormOrder = false
                    this.visibleFormProduct = false
                    this.getData()
                    this.$message(`Success changed products for order ${this.form.order_id}.`)
                } else {
                    this.$message(`Failed to change products for order ${this.form.order_id}.`)
                }
            })
        },
    }
}
</script>