<template>
    <div id="App">
        <div class="width width-100">
            <div class="display-flex space-between align-center">
                <h1 class="fonts big black bold">Reports</h1>
            </div>
            <div class="display-flex space-between display-mobile margin margin-bottom-15px" style="align-items: flex-end;">
                <div class="display-flex display-mobile" style="align-items: flex-end;">
                    <div class="width width-150px width-mobile margin margin-right-10px no-margin-padding">
                        <div class="field-group padding padding-bottom-5px">
                            <div class="field-label">Report Type</div>
                            <el-select 
                                v-model="filter.report_type" 
                                :clearable="false"
                                placeholder="Select"
                                no-data-text="No Data Disaplayed"
                                @change="handleReportType">
                                <el-option
                                    v-for="(item, i) in downloadList"
                                    :key="i"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div v-if="filter.report_type === 'custom'" class="width width-300px width-mobile margin margin-right-10px no-margin-padding">
                        <div class="field-group padding padding-bottom-5px">
                            <div class="field-label">Range Date</div>
                            <el-date-picker
                                v-model="filter.order_date"
                                :type="dateType"
                                align="left"
                                unlink-panels
                                range-separator="To"
                                start-placeholder="Start date"
                                end-placeholder="End date"
                                format="dd MMMM yyyy"
                                :picker-options="pickerOptions"
                                @change="handleOrderDate"
                                style="width: 100% !important;">
                            </el-date-picker>
                        </div>
                    </div>
                    <div class="width width-150px width-mobile margin margin-right-10px no-margin-padding">
                        <div class="field-group padding padding-bottom-5px">
                            <div class="field-label">Order Status</div>
                            <el-select 
                                v-model="filter.order_status" 
                                :clearable="false"
                                placeholder="Select"
                                no-data-text="No Data Disaplayed"
                                :disabled="!filter.order_status">
                                <el-option
                                    v-for="(item, i) in orderStatus"
                                    :key="i"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                    <div class="width width-150px width-mobile margin margin-right-10px no-margin-padding">
                        <div class="field-group padding padding-bottom-5px">
                            <div class="field-label">Payment Status</div>
                            <el-select 
                                v-model="filter.payment_status" 
                                :clearable="false"
                                placeholder="Select"
                                no-data-text="No Data Disaplayed"
                                :disabled="!filter.payment_status">
                                <el-option
                                    v-for="(item, i) in orderPaymentStatus"
                                    :key="i"
                                    :label="item.label"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="display-flex flex-end">
                    <div class="field-group padding padding-bottom-5px">
                        <div class="display-flex space-between">
                            <div style="width: calc(50% - 5px); margin-right: 5px;">
                                <button class="btn btn-sekunder btn-full" :disabled="!isButtonApplyEnable" @click="handleFilterSearch">
                                    Apply
                                </button>
                            </div>
                            <div style="width: calc(50% - 5px); margin-left: 5px;">
                                <button class="btn btn-sekunder btn-full" :disabled="!isButtonApplyEnable" @click="handleFilterClear">
                                    Clear
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="display-flex display-mobile margin margin-bottom-15px">
                <div class="width width-row-2 width-mobile border-right-mobile-bottom">
                    <div class="card bg-white content-center" style="border-radius: 0;">
                        <div class="fonts align-center medium teal semibold overflow-ellipsis">{{ grandItem }}</div>
                        <div class="fonts align-center fonts-10 grey normal">Total Item</div>
                    </div>
                </div>
                <div class="width width-row-2 width-mobile">
                    <div class="card bg-white content-center" style="border-radius: 0;">
                        <div class="fonts align-center medium teal semibold overflow-ellipsis">{{ format(grandTotal) }}</div>
                        <div class="fonts align-center fonts-10 grey normal">Grand Price</div>
                    </div>
                </div>
            </div>

            <div v-loading="loading" class="width width-100">
                <Card />
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

        <div class="main-content-footer">
            <div class="main-content-footer-container">
                <button class="btn btn-main btn-full" :disabled="!isButtonReportEnable" @click="downloadReport">
                    <i class="icn icn-left fa fa-lw fa-download"></i> Download Report
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import Card from './Card'
import moment from 'moment'

export default {
    name: 'App',
    metaInfo: {
        title: 'Shop',
        titleTemplate: '%s | Reports',
        htmlAttrs: {
            lang: 'en',
            amp: true
        }
    },
    data () {
        return {
            currentPage: 1,
            dateType: 'daterange',
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            }
        }
    },
    mounted () {
        this.handleFilterClear()
    },
    computed: {
        ...mapState({
            data: (state) => state.storeReports.data,
            filter: (state) => state.storeReports.filter,
            loading: (state) => state.storeReports.loading,
            limit: (state) => state.storeReports.limit,
            grandItem: (state) => state.storeReports.grandItem,
            grandTotal: (state) => state.storeReports.grandTotal,
            cashIn: (state) => state.storeReports.cashIn,
            cashOut: (state) => state.storeReports.cashOut,
            totalRecord: (state) => state.storeReports.totalRecord,
            downloadList: (state) => state.storeReports.downloadList,
            orderStatus: (state) => state.storeReports.orderStatus,
            orderPaymentStatus: (state) => state.storeReports.orderPaymentStatus,
        }),
        isButtonApplyEnable () {
            return this.filter.order_date && this.filter.payment_status && this.filter.order_status
        },
        isButtonReportEnable () {
            return this.data.length > 0
        },
        shopId () {
            return this.$store.state.storeSelectedShop.selectedData
        },
    },
    components: {
        Card
    },
    methods: {
        ...mapActions({
            getData: 'storeReports/getData',
            download: 'storeReports/download',
            resetFilter: 'storeReports/resetFilter',
            setPagination: 'storeReports/setPagination'
        }),
        getReport () {
            const token = this.$cookies.get('tokenBearer')
            const shop_id = this.shopId
            const search = this.filter.search 
            const startDate = moment(this.filter.order_date[0]).format('YYYY-MM-DD 00:00:00')
            const endDate = moment(this.filter.order_date[1]).format('YYYY-MM-DD 23:59:59')
            const orderStatus = this.filter.order_status !== 'all' ? this.filter.order_status : ''
            const paymentStatus = this.filter.payment_status !== 'all' ? this.filter.payment_status : ''

            const payload = {
                search: search,
                status: orderStatus,
                payment_status: paymentStatus,
                start_date: startDate,
                end_date: endDate,
                shop_id: shop_id,
                token: token,
            }

            this.getData(payload)
        },
        handleCurrentChange (value) {
            this.setPagination(value)
            this.getReport()
        },
        handleFilterSearch () {
            this.currentPage = 1
            this.handleCurrentChange(1)
        },
        handleFilterClear () {
            this.currentPage = 1
            this.dateType = 'daterange'
            this.resetFilter()
        },
        onSearch (data) {
            this.filter.search = data 
            this.handleCurrentChange(1)
        },
        onRefresh () {
            console.log('onRefresh')
        },
        handleReportType (data) {
            let startDate = null
            let endDate = null 

            switch (data) {
                case 'daily':
                    endDate = moment()
                    startDate = moment()
                    break
                case 'this-week':
                    endDate = moment()
                    startDate = moment().subtract(7, 'days')
                    break
                case 'this-month':
                    endDate = moment()
                    startDate = moment().startOf('month')
                    break
                case 'this-year':
                    endDate = moment()
                    startDate = moment().startOf('year')
                    break
                default:
                    endDate = moment()
                    startDate = moment()
                    break
            }

            if (data === 'custom') {
                this.filter.order_status = ''
                this.filter.payment_status = ''
                this.filter.order_date = []
            } else {
                this.filter.order_status = 'done'
                this.filter.payment_status = '1'
                this.filter.order_date = [startDate, endDate]
            }
        },
        handleOrderDate (data) {
            this.filter.order_status = 'done'
            this.filter.payment_status = '1'
        },
        downloadReport () {
            const token = this.$cookies.get('tokenBearer')
            const shop_id = this.shopId
            const search = this.filter.search 
            const startDate = moment(this.filter.order_date[0]).format('YYYY-MM-DD 00:00:00')
            const endDate = moment(this.filter.order_date[1]).format('YYYY-MM-DD 23:59:59')
            const orderStatus = this.filter.order_status !== 'all' ? this.filter.order_status : ''
            const paymentStatus = this.filter.payment_status !== 'all' ? this.filter.payment_status : ''

            const payload = {
                search: search,
                status: orderStatus,
                payment_status: paymentStatus,
                start_date: startDate,
                end_date: endDate,
                shop_id: shop_id,
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
        }
    }
}
</script>