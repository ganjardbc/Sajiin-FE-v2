<template>
    <div id="App">
        <div v-for="(dt, i) in data" :key="i" class="card box-shadow margin margin-top-15px margin-bottom-15px">
            <div class="display-flex space-between align-center padding padding-bottom-15px margin margin-bottom-20px border-bottom">
                <div class="display-flex align-center">
                    <div class="width width-30px">
                        <i class="fa fa-1x fa-book-open fonts main-color"></i>
                    </div>
                    <div>
                        <div class="fonts fonts-10 semibold">{{ dt.cashbook.cashbook_id }}</div>
                        <div class="fonts fonts-10 grey">{{ dt.cashbook.created_at | moment("DD MMMM YYYY") }}</div>
                    </div>
                </div>
                <div class="display-flex flex-end align-center">
                    <el-popover
                        placement="bottom-end"
                        width="180"
                        trigger="click">
                        <div class="width width-100">
                            <button 
                                class="btn btn-white btn-full btn-align-left"
                                @click="onDelete(dt.cashbook)">
                                <i class="icn icn-left fa fa-lw fa-trash-alt"></i> Delete
                            </button>
                        </div>
                        <button 
                            slot="reference"
                            class="btn btn-icon btn-circle btn-white">
                            <i class="fa fa-lw fa-ellipsis-v"></i>
                        </button>
                    </el-popover>
                </div>
            </div>

            <div class="width width-100">
                <div class="width width-100">
                    <div class="display-flex space-between margin margin-bottom-15px">
                        <div class="display-flex flex-start display-mobile">
                            <div class="fonts fonts-10 semibold margin margin-right-5px">{{ dt.cashbook.cash_date | moment("DD MMMM YYYY") }}</div>
                            <div class="fonts fonts-10 grey">{{ dt.shop.open_time }} - {{ dt.shop.close_time }}</div>
                        </div>
                        <AppCardCapsule :data="dt.cashbook.cash_status" class="margin margin-left-10px" />
                    </div>
                    <div class="width width-100 display-flex align-center margin margin-bottom-15px">
                        <div style="width: calc(50% - 20px);">
                            <div class="fonts fonts-9 normal grey">Cash Summary</div>
                            <div class="fonts fonts-11 semibold main-color overflow-ellipsis">{{ format(dt.cashbook.cash_summary) }}</div>
                        </div>
                        <div class="image image-40px image-circle bg-white">
                            <i class="post-middle-absolute fonts fonts-10 fa fa-lg fa-equals"></i>
                        </div>
                        <div style="width: calc(50% - 20px);">
                            <div class="fonts fonts-9 normal grey align-right">Cash Actual</div>
                            <div class="fonts fonts-11 semibold black overflow-ellipsis align-right">{{ format(dt.cashbook.cash_actual) }}</div>
                        </div>
                    </div>
                    <div v-if="dt.cashbook.cash_status === 'closed'" class="width width-100 margin margin-bottom-15px">
                        <el-alert
                            v-if="dt.cashbook.cash_summary > dt.cashbook.cash_actual"
                            title="Cash Actual is Not The Same !"
                            description="It's look like cash summary and actual is not the same, please check your cash again."
                            type="error"
                            :closable="false"
                            show-icon >
                        </el-alert>
                    </div>
                    <div class="width width-100 margin margin-bottom-15px">
                        <div class="card bg-white-grey no-padding display-flex space-between align-center wrap">
                            <div class="width width-row-4 width-mobile-row-2 padding padding-top-10px padding-bottom-10px">
                                <div class="padding padding-5px content-center">
                                    <div class="display-flex center align-center">
                                        <i class="fonts fonts-8 main-color fa fa-lg fa-info-circle margin margin-right-5px"></i>
                                        <span class="fonts fonts-9 normal grey overflow-ellipsis align-center">Cash Modal</span>
                                    </div>
                                    <div class="fonts fonts-10 semibold black overflow-ellipsis align-center">{{ format(dt.cashbook.cash_modal) }}</div>
                                </div>
                            </div>
                            <div class="width width-row-4 width-mobile-row-2 padding padding-top-10px padding-bottom-10px">
                                <div class="padding padding-5px border-left content-center">
                                    <div class="display-flex center align-center">
                                        <i class="fonts fonts-8 main-color fa fa-lg fa-check-circle margin margin-right-5px"></i>
                                        <span class="fonts fonts-9 normal grey overflow-ellipsis align-center">Cash Profit</span>
                                    </div>
                                    <div class="fonts fonts-10 semibold black overflow-ellipsis align-center">{{ format(dt.cashbook.cash_profit) }}</div>
                                </div>
                            </div>
                            <div class="width width-row-4 width-mobile-row-2 padding padding-top-10px padding-bottom-10px">
                                <div class="padding padding-5px border-left border-mobile-none content-center">
                                    <div class="display-flex center align-center">
                                        <i class="fonts fonts-8 green fa fa-lg fa-arrow-up margin margin-right-5px"></i>
                                        <span class="fonts fonts-9 normal grey overflow-ellipsis align-center">Cash In</span>
                                    </div>
                                    <div class="fonts fonts-10 semibold black overflow-ellipsis align-center">{{ format(dt.cashbook.cash_in) }}</div>
                                </div>
                            </div>
                            <div class="width width-row-4 width-mobile-row-2 padding padding-top-10px padding-bottom-10px">
                                <div class="padding padding-5px border-left content-center">
                                    <div class="display-flex center align-center">
                                        <i class="fonts fonts-8 orange fa fa-lg fa-arrow-down margin margin-right-5px"></i>
                                        <span class="fonts fonts-9 normal grey overflow-ellipsis align-center">Cash Out</span>
                                    </div>
                                    <div class="fonts fonts-10 semibold black overflow-ellipsis align-center">{{ format(dt.cashbook.cash_out) }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <OrderStatus 
                        :data="dt.cashbook" 
                        class="margin margin-bottom-15px"
                        :enableButton="true"
                        @onClick="onOpenOrderList(dt.cashbook)" />
                </div>
                <div class="display-flex space-between align-center">
                    <el-switch 
                        v-model="dt.cashbook.status"
                        active-text="Active"
                        inactive-text="Inactive"
                        :active-value="'active'"
                        :inactive-value="'inactive'"
                        @change="onChangeStatus(dt.cashbook)"></el-switch>
                    <div class="display-flex flex-end align-center">
                        <button 
                            v-if="dt.cashbook.cash_status === 'open'" 
                            class="btn btn-sekunder margin margin-left-5px"
                            :disabled="isCanClosing(dt.cashbook)"
                            @click="onOpenCashBook(dt.cashbook)">
                            Closing
                        </button>
                        <button 
                            v-else 
                            class="btn btn-main margin margin-left-5px" 
                            :disabled="isStatusInactive(dt.cashbook)"
                            @click="onDownload(dt.cashbook)">
                            Reports
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AppCardCapsule from '../../../modules/AppCardCapsule'
import AppCardCaption from '../../../modules/AppCardCaption'
import OrderStatus from './OrderStatus'

export default {
    name: 'App',
    props: {
        data: null,
    },
    components: {
        AppCardCapsule,
        AppCardCaption,
        OrderStatus,
    },
    methods: {
        // OTHER 
        isCanClosing (data) {
            let status = true 
            if (data.status === 'active') {
                if (!data.order_total || (data.order_done < data.order_total)) {
                    status = true 
                } else {
                    status = false 
                }
            }
            return status 
        },
        isStatusInactive (data) {
            let status = true 
            if (data.status === 'active') {
                status = false 
            }
            return status 
        },

        // COVER
        onChangeCover (data) {
            this.$emit('onChangeCover', data)
        },

        // DETAIL
        onDetail (data) {
            this.$emit('onDetail', data)
        },

        // EDIT
        onEdit (data) {
            this.$emit('onEdit', data)
        },

        // DELETE
        onDelete (data) {
            this.$emit('onDelete', data)
        },

        // STATUS
        onChangeStatus (data) {
            this.$emit('onChangeStatus', data)
        },

        // DOWNLOAD 
        onDownload (data) {
            this.$emit('onDownload', data)
        },

        // CASH BOOK
        onOpenCashBook (data) {
            this.$emit('onOpenCashBook', data)
        },

        // ORDER LIST 
        onOpenOrderList (data) {
            this.$emit('onOpenOrderList', data)
        }
    }
}
</script>