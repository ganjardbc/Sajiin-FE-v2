<template>
    <div id="App">
        <div :class="formClass ? 'content-form' : 'content-form hide'">
            <div class="left">
                <div class="display-flex space-between display-mobile margin margin-bottom-15px">
                    <div class="width width-75 width-mobile display-flex space-between">
                        <h1 class="fonts big black bold">Cash Book</h1>
                        <div class="display-flex">
                            <button 
                                class="btn btn-icon btn-white" 
                                @click="onRefresh">
                                <i class="fa fa-lw fa-retweet"></i>
                            </button>
                            <button 
                                v-if="visibleCreateButton"
                                class="btn btn-icon btn-white" 
                                @click="onCreate">
                                <i class="fa fa-lw fa-plus" />
                            </button>
                        </div>
                    </div>
                    <div class="width width-25 width-mobile">
                        <el-input
                            placeholder="Search cash book .."
                            suffix-icon="el-icon-search"
                            clearable
                            v-model="filter.search"
                            @change="onSearch">
                        </el-input>
                    </div>
                </div>

                <div class="display-flex space-between align-center display-mobile margin margin-bottom-15px">
                    <AppTabs 
                        class="width width-300px width-mobile"
                        :selectedIndex.sync="selectedIndex" 
                        :isFull="true"
                        :isScrollable="false"
                        :data="tabs" 
                        :onChange="(data) => onChangeTabs(data)"
                    />
                </div>

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
                            @onDownload="onDownloadReport"
                            @onOpenCashBook="onOpenCashBook"
                            @onOpenOrderList="onOpenOrderList" />
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

            <div class="right">
                <Form 
                    @uploadImage="uploadImage"
                    @removeImage="removeImage"
                    @onSave="onOpenVisibleConfirmed"
                    @onClose="onClose">
                </Form>
            </div>
        </div>

        <div :class="formOrderClass ? 'content-form' : 'content-form hide'">
            <div class="right">
                <OrderList 
                    @onDownload="onDownloadReport"
                    @onClose="onCloseOrderList">
                </OrderList>
            </div>
        </div>

        <CloseCashbook 
            v-if="visibleCashBook"
            @onClose="onCloseCashBook"
            @onSave="onSaveCashBook"
        />

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
            v-if="visibleConfirmedDelete"
            :title="'Delete this cash book ?'"
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

        <AppPopupLoader 
            v-if="loadingDownload"
        />
    </div>
</template>

<script>
import moment from 'moment'
import { mapActions, mapState } from 'vuex'
import AppEmpty from '../../../modules/AppEmpty'
import AppPopupLoader from '../../../modules/AppPopupLoader'
import AppPopupConfirmed from '../../../modules/AppPopupConfirmed'
import AppPopupAlert from '../../../modules/AppPopupAlert'
import AppFileUpload from '../../../modules/AppFileUpload'
import AppTabs from '../../../modules/AppTabs'
import SearchField from '../../../modules/SearchField'
import Form from './Form'
import Card from './Card'
import CloseCashbook from './CloseCashbook'
import OrderList from './OrderList'

const tabs = [
    {id: 1, label: 'Active', status: 'active'},
    {id: 2, label: 'Inactive', status: ''},
]

export default {
    name: 'App',
    metaInfo: {
        title: 'Shop',
        titleTemplate: '%s | Cash Book',
        htmlAttrs: {
            lang: 'en',
            amp: true
        }
    },
    data () {
        return {
            tabs: tabs,
            formClass: false,
            formOrderClass: false,
            visibleCreateButton: false,
            visibleUpdateCover: false,
            visibleAlert: false,
            visibleQrCode: false,
            visibleCashBook: false,
            titleAlert: 'Failed to preceed data',
            iconAlert: 'fa fa-4x fa-info-circle',
            visibleConfirmed: false,
            visibleConfirmedDelete: false,
            titleConfirmed: 'Save this data ?',
            currentPage: 0,
            selectedIndex: 0,
        }
    },
    mounted () {
        this.getDataCurrent()
        this.onChangeTabs(0)
    },
    created () {
        this.filter.search = this.paramCashbookId
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
        CloseCashbook,
        OrderList,
    },
    computed: {
        ...mapState({
            filter: (state) => state.storeCashBook.filter,
            form: (state) => state.storeCashBook.form,
            data: (state) => state.storeCashBook.data,
            dataCurrent: (state) => state.storeCashBook.dataCurrent,
            totalRecord: (state) => state.storeCashBook.totalRecord,
            limit: (state) => state.storeCashBook.limit,
            loading: (state) => state.storeCashBook.loading,
            loadingForm: (state) => state.storeCashBook.loadingForm,
            typeForm: (state) => state.storeCashBook.typeForm,
            loadingDownload: (state) => state.storeReports.loading,
        }),
        typeForm: {
            get () {
                return this.$store.state.storeCashBook.typeForm
            },
            set (value) {
                this.$store.state.storeCashBook.typeForm = value
            }
        },
        shopId () {
            return this.$store.state.storeSelectedShop.selectedData
        },
        paramShopId () {
            return this.$route.params.shopId
        },
        paramCashbookId () {
            return this.$route.query.search || ''
        }
    },
    watch: {
        shopId (prevProps, nextProps) {
            if (prevProps !== nextProps) {
                this.getAllData()
            }
        },
        paramCashbookId () {
            this.filter.search = this.paramCashbookId
            this.getAllData()
        }
    },
    methods: {
        ...mapActions({
            getCashBook: 'storeCashBook/getData',
            getCurrentCashBook: 'storeCashBook/getCurrent',
            setPagination: 'storeCashBook/setPagination',
            resetFormData: 'storeCashBook/resetFormData',
            resetFilter: 'storeCashBook/resetFilter',
            setFormData: 'storeCashBook/setFormData',
            createData: 'storeCashBook/createData',
            updateData: 'storeCashBook/updateData',
            deleteData: 'storeCashBook/deleteData',
            uploadCover: 'storeCashBook/uploadCover',
            download: 'storeReports/download',
            reports: 'storeReports/getData',
        }),
        onSearch (data) {
            this.filter.search = data 
            this.resetFilter()
            this.getAllData()
        },
        onClose () {
            this.formClass = false 
        },
        onRefresh () {
            this.getAllData()
        },
        onChangeTabs (data) {
            this.selectedIndex = data
            switch (this.selectedIndex) {
                case 0:
                    this.filter.status = 'active'
                    break
                case 1:
                    this.filter.status = 'inactive'
                    break
            }
            this.handleFilterSearch()
        },

        // LIST DATA
        getAllData () {
            this.getDataCurrent()
            this.getData()
        },
        getDataCurrent () {
            const token = this.$cookies.get('tokenBearer')
            const shop_id = this.shopId
            if (shop_id) {
                this.getCurrentCashBook({ token, shop_id: shop_id })
                    .then((res) => {
                        const data = res.data.data 
                        if (data && !data.current_cashbook) {
                            this.visibleCreateButton = true 
                        } else {
                            this.visibleCreateButton = false  
                        }
                    })
            }
        },
        getData () {
            const token = this.$cookies.get('tokenBearer')
            const shop_id = this.shopId
            if (shop_id) {
                this.getCashBook({ token, shop_id: shop_id })
            }
        },
        handleCurrentChange (value) {
            this.setPagination(value)
            this.getAllData()
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
            switch (this.typeForm) {
                case 'create':
                    this.createData({
                        ...this.form,
                        token: token
                    }).then((res) => {
                        const status = res.data.status 
                        if (status === 'ok') {
                            this.formClass = false 
                            this.visibleCashBook = false 
                            this.getAllData()
                        } else {
                            this.$message({
                                message: 'Failed to save this cash book',
                                type: 'error'
                            })
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
                            this.formClass = false 
                            this.visibleCashBook = false 
                            this.getAllData()
                        } else {
                            this.$message({
                                message: 'Failed to edit this cash book',
                                type: 'error'
                            })
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
                    this.titleConfirmed = 'Save this cash book ?'
                    break
                case 'edit':
                    this.titleConfirmed = 'Edit this cash book ?'
                    break
            }
        },

        // CREATE
        onCreate () {
            this.formClass = true
            this.typeForm = 'create'
            this.resetFormData()
            this.form.shop_id = this.shopId
        },

        // DETAIL
        onDetail (data) {
            this.formClass = true
            this.typeForm = 'detail'
            this.resetFormData()
            this.setFormData(data)
        },

        // EDIT
        onEdit (data) {
            this.formClass = true
            this.typeForm = 'edit'
            this.resetFormData()
            this.setFormData(data)
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
                    this.getAllData()
                } else {
                    this.visibleAlert = true 
                    this.titleAlert = 'Failed to delete this cash book'
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
            const token = this.$cookies.get('tokenBearer')
            this.uploadCover({
                ...this.form,
                image: data,
                token: token
            }).then((res) => {
                const status = res.data.status 
                if (status === 'ok') {
                    this.getAllData()
                } else {
                    this.visibleAlert = true 
                    this.titleAlert = 'Failed to upload cover'
                }
            })
        },

        // STATUS
        onChangeStatus (data) {
            this.setFormData(data)
            const token = this.$cookies.get('tokenBearer')
            this.updateData({
                ...this.form,
                token: token
            }).then((res) => {
                const status = res.data.status 
                if (status === 'ok') {
                    this.$message(`Success changed status.`)
                    this.getDataCurrent()
                } else {
                    this.$message({
                        message: `Failed to change status.`,
                        type: 'error'
                    })
                }
            })
        },

        // DOWNLOAD 
        onDownloadReport (data) {
            const token = this.$cookies.get('tokenBearer')
            const shopId = this.shopId
            const search = ''
            const startDate = moment(data.cash_date).format('YYYY-MM-DD 00:00:00')
            const endDate = moment(data.cash_date).format('YYYY-MM-DD 23:59:59')
            const orderStatus = 'done'
            const paymentStatus = '1'
            const cashbookId = data.id

            const payload = {
                search: search,
                status: orderStatus,
                payment_status: paymentStatus,
                start_date: startDate,
                end_date: endDate,
                shop_id: shopId,
                cashbook_id: cashbookId,
                token: token,
            }

            this.download(payload).then((res) => {
                if (res.status === 200) {
                    this.$message('Downloaded order report')
                } else {
                    this.$message({
                        message: 'Failed to download order report',
                        type: 'error'
                    })
                }
            })
        },
        getReport (data) {
            const token = this.$cookies.get('tokenBearer')
            const shopId = this.shopId
            const search = ''
            const startDate = moment(data.cash_date).format('YYYY-MM-DD 00:00:00')
            const endDate = moment(data.cash_date).format('YYYY-MM-DD 23:59:59')
            const orderStatus = ''
            const paymentStatus = ''
            const cashbookId = data.id

            const payload = {
                search: search,
                status: orderStatus,
                payment_status: paymentStatus,
                start_date: startDate,
                end_date: endDate,
                shop_id: shopId,
                cashbook_id: cashbookId,
                token: token,
                disable_limit: true,
            }

            this.reports(payload).then((res) => {
                if (res.status === 200) {
                    this.formOrderClass = true 
                }
            })
        },

        // CASH BOOK
        onCloseCashBook () {
            this.visibleCashBook = false 
        },
        onOpenCashBook (data) {
            this.visibleCashBook = true 
            this.typeForm = 'edit'
            this.setFormData(data)
        },
        onSaveCashBook (data) {
            this.visibleConfirmed = true
            this.titleConfirmed = 'Close this cash book ?'
            this.setFormData(data)
        },

        // ORDER LIST
        onOpenOrderList (data) {
            this.setFormData(data)
            this.getReport(data)
        },
        onCloseOrderList () {
            this.formOrderClass = false 
        },
    }
}
</script>