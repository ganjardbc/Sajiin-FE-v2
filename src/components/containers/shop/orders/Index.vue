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
                        <!-- <button 
                            class="btn btn-icon btn-white" 
                            @click="onCreate">
                            <i class="fa fa-lw fa-plus" />
                        </button> -->
                    </div>
                </div>
                <div class="width width-25 width-mobile">
                    <SearchField 
                        :placeholder="'Search by order-id ..'" 
                        :enableResponsive="true" 
                        :onChange="(data) => onSearch(data)" />
                </div>
            </div>

            <AppTabs 
                :selectedIndex.sync="selectedIndex" 
                :data="tabs" 
                :onChange="(data) => onChangeTabs(data)"
                class="width width-500px width-mobile margin margin-bottom-20px" />

            <div class="width width-100">
                <div v-loading="loading">
                    <AppEmpty v-if="data.length === 0" />
                    <Card 
                        :data.sync="data"
                        @onChangeCover="uploadImage"
                        @onDetail="onDetail"
                        @onEdit="onEdit"
                        @onDelete="onDelete"
                        @onChangeStatus="onChangeStatus"
                        @onCheckout="onOpenCheckout" />
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
                <Form 
                    @uploadImage="uploadImage"
                    @removeImage="removeImage"
                    @onSave="onOpenVisibleConfirmed"
                    @onClose="onClose"
                    @onChangeStatus="onChangeStatus"
                    @onCheckout="onOpenCheckout">
                </Form>
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

        <AppFileUpload 
            v-if="visibleUpdateCover"
            @onClose="onCloseCover"
            @onUpload="onUpdateCover"
        />

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
import AppFileUpload from '../../../modules/AppFileUpload'
import SearchField from '../../../modules/SearchField'
import AppTabs from '../../../modules/AppTabs'
import Form from './Form'
import Card from './Card'
import FormCheckout from './checkOut'

const tabs = [
    {id: 1, label: 'All', status: 'active'},
    {id: 2, label: 'New Order', status: ''},
    {id: 3, label: 'On Progress', status: ''},
    {id: 4, label: 'Done', status: ''},
    {id: 5, label: 'Canceled', status: ''},
]

export default {
    name: 'App',
    data () {
        return {
            formClass: false,
            visibleFormOrder: false,
            visibleFormCheckout: false,
            visibleUpdateCover: false,
            visibleAlert: false,
            titleAlert: 'Failed to preceed data',
            iconAlert: 'fa fa-4x fa-info-circle',
            visibleConfirmed: false,
            visibleConfirmedDelete: false,
            visibleConfirmedStatus: false,
            titleConfirmed: 'Save this data ?',
            titleConfirmedStatus: 'Update this order status ?',
            currentPage: 1,
            selectedIndex: 0,
            selectedData: null,
            tabs: tabs,
        }
    },
    mounted () {
        this.onChangeTabs(0)
    },
    components: {
        AppEmpty,
        AppPopupLoader,
        AppPopupConfirmed,
        AppPopupAlert,
        AppFileUpload,
        AppTabs,
        SearchField,
        Form,
        Card,
        FormCheckout
    },
    computed: {
        ...mapState({
            filter: (state) => state.storeOrders.filter,
            form: (state) => state.storeOrders.form,
            data: (state) => state.storeOrders.data,
            totalRecord: (state) => state.storeOrders.totalRecord,
            limit: (state) => state.storeOrders.limit,
            loading: (state) => state.storeOrders.loading,
            loadingForm: (state) => state.storeOrders.loadingForm,
            typeForm: (state) => state.storeOrders.typeForm,
            formVarian: (state) => state.storeOrdersDetail.form,
        }),
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
            getOrder: 'storeOrders/getData',
            setPagination: 'storeOrders/setPagination',
            resetFormData: 'storeOrders/resetFormData',
            resetFilter: 'storeOrders/resetFilter',
            setFormData: 'storeOrders/setFormData',
            createData: 'storeOrders/createData',
            updateData: 'storeOrders/updateData',
            deleteData: 'storeOrders/deleteData',
            uploadCover: 'storeOrders/uploadCover',
            setLoadingForm: 'storeOrders/setLoadingForm',
            updateDataVarian: 'storeOrdersDetail/updateData',
            setFormDataVarian: 'storeOrdersDetail/setFormData',
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
                    this.filter.payment_status = ''
                    break
                case 1:
                    this.filter.status = 'new-order'
                    this.filter.payment_status = ''
                    break
                case 2:
                    this.filter.status = 'on-progress'
                    this.filter.payment_status = ''
                    break
                case 3:
                    this.filter.status = 'done'
                    this.filter.payment_status = '1'
                    break
                case 4:
                    this.filter.status = 'canceled'
                    this.filter.payment_status = ''
                    break
            }
            this.handleFilterSearch()
        },

        // LIST DATA
        getData () {
            const token = this.$session.get('tokenBearer')
            const shop_id = this.shopId
            this.getOrder({ token, shop_id })
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
            const token = this.$session.get('tokenBearer')
            switch (this.typeForm) {
                case 'create':
                    this.createData({
                        ...this.form,
                        token: token
                    }).then((res) => {
                        const status = res.data.status 
                        if (status === 'ok') {
                            this.visibleFormOrder = false 
                            this.visibleFormCheckout = false 
                            this.getData()
                        } else {
                            this.visibleAlert = true 
                            this.titleAlert = 'Failed to save this order'
                        }
                    })
                    break
                case 'edit':
                    this.updateData({
                        ...this.form,
                        token: token
                    }).then((res) => {
                        const status = res.data.status 
                        if (status === 'ok') {
                            this.visibleFormOrder = false 
                            this.visibleFormCheckout = false 
                            this.getData()
                        } else {
                            this.visibleAlert = true 
                            this.titleAlert = 'Failed to edit this order'
                        }
                    })
                    break
            }
        },

        // SAVE
        onOpenVisibleConfirmed () {
            this.visibleConfirmed = true
            switch (this.typeForm) {
                case 'create':
                    this.titleConfirmed = 'Save this order ?'
                    break
                case 'edit':
                    this.titleConfirmed = 'Edit this order ?'
                    break
            }
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
            const token = this.$session.get('tokenBearer')
            this.deleteData({
                ...this.form,
                token: token
            }).then((res) => {
                const status = res.data.status 
                if (status === 'ok') {
                    this.getData()
                } else {
                    this.visibleAlert = true 
                    this.titleAlert = 'Failed to delete this order'
                }
            })
        },

        // IMAGE
        uploadImage (data) {
            this.visibleUpdateCover = true
            this.setFormData(data)
        },
        removeImage () {
            console.log('removeImage')
        },
        onCloseCover () {
            this.visibleUpdateCover = false 
        },
        onUpdateCover (data) {
            this.visibleUpdateCover = false 
            const token = this.$session.get('tokenBearer')
            this.uploadCover({
                ...this.form,
                image: data,
                token: token
            }).then((res) => {
                const status = res.data.status 
                if (status === 'ok') {
                    this.getData()
                } else {
                    this.visibleAlert = true 
                    this.titleAlert = 'Failed to upload cover'
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

            const token = this.$session.get('tokenBearer')
            this.setFormData(this.selectedData)
            this.updateData({
                ...this.form,
                token: token
            }).then((res) => {
                const status = res.data.status 
                if (status === 'ok') {
                    this.$message(`Success changed status for order ${this.selectedData.order_id}.`)
                    this.getData()
                } else {
                    this.$message(`Failed to change status for order ${this.selectedData.order_id}.`)
                }
            })
        },
        onChangeStatus (data) {
            this.visibleConfirmedStatus = true 
            this.titleConfirmedStatus = `Update this order status to "${data.status}"`
            this.selectedData = data 
        },

        // CHECKOUT 
        onOpenCheckout (data) {
            this.visibleFormCheckout = true 
            this.typeForm = 'edit'
            this.setFormData(data)
        },
        onCloseCheckout () {
            this.visibleFormCheckout = false
        },
        onSaveCheckout () {
            this.visibleFormCheckout = false 
        }
    }
}
</script>