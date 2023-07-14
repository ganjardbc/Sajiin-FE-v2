<template>
    <div 
        id="CashierCashBook" 
        class="margin margin-bottom-15px">
        <div v-loading="loading" class="width width-100">
            <el-alert
                v-if="showWarning"
                title="Please Open The Cashier !"
                description="You can not create new order because The Cash Book for this shop is empty, please try to create one."
                type="warning"
                :closable="true"
                show-icon
                style="margin-bottom: 15px;">
            </el-alert>

            <div class="display-flex space-between margin margin-bottom-15px">
                <div class="width width-50">
                    <div class="fonts small black bold margin margin-right-10px">Cash Book</div>
                    <div class="margin margin-right-10px">
                        <div v-if="currentCashBook">
                            <span class="fonts fonts-9 semibold">{{ currentCashBook.cash_date | moment("DD MMMM YYYY") }}</span>
                            <span class="fonts fonts-9 normal">{{ shopCashBook.open_time || '' }} - {{ shopCashBook.close_time || '' }}</span>
                        </div>
                        <div v-else class="fonts fonts-9 normal">No Date</div>
                    </div>
                </div>
                <div class="width width-50 display-flex flex-end">
                    <div v-if="currentCashBook" class="display-flex flex-end align-center">
                        <button 
                            class="btn btn-icon btn-white" 
                            @click="onRefresh">
                            <i class="fa fa-lw fa-retweet"></i>
                        </button>
                        <div class="fonts medium semibold main-color overflow-ellipsis align-right">
                            {{ format(currentCashBook && currentCashBook.cash_summary || 0) }}
                        </div>
                    </div>
                    <button 
                        v-else 
                        class="btn btn-main" 
                        @click="createCashBook">
                        <i class="icn icn-left fa fa-lg fa-plus"></i> Create
                    </button>
                </div>
            </div>

            <div class="card bg-white-grey no-padding margin margin-bottom-15px">
                <div class="width width-100 display-flex space-between align-center wrap">
                    <div class="width width-row-4 width-mobile-row-2 padding padding-top-10px padding-bottom-10px">
                        <div class="padding padding-5px content-center">
                            <div class="display-flex center align-center">
                                <i class="fonts fonts-8 main-color fa fa-lg fa-info-circle margin margin-right-5px"></i>
                                <span class="fonts fonts-9 normal grey overflow-ellipsis align-center">Cash Modal</span>
                            </div>
                            <div class="fonts fonts-10 semibold black overflow-ellipsis align-center">{{ format(currentCashBook && currentCashBook.cash_modal || 0) }}</div>
                        </div>
                    </div>
                    <div class="width width-row-4 width-mobile-row-2 padding padding-top-10px padding-bottom-10px">
                        <div class="padding padding-5px border-left content-center">
                            <div class="display-flex center align-center">
                                <i class="fonts fonts-8 main-color fa fa-lg fa-check-circle margin margin-right-5px"></i>
                                <span class="fonts fonts-9 normal grey overflow-ellipsis align-center">Cash Profit</span>
                            </div>
                            <div class="fonts fonts-10 semibold black overflow-ellipsis align-center">{{ format(currentCashBook && currentCashBook.cash_profit || 0) }}</div>
                        </div>
                    </div>
                    <div class="width width-row-4 width-mobile-row-2 padding padding-top-10px padding-bottom-10px">
                        <div class="padding padding-5px border-left border-mobile-none content-center">
                            <div class="display-flex center align-center">
                                <i class="fonts fonts-8 green fa fa-lg fa-arrow-up margin margin-right-5px"></i>
                                <span class="fonts fonts-9 normal grey overflow-ellipsis align-center">Cash In</span>
                            </div>
                            <div class="fonts fonts-10 semibold black overflow-ellipsis align-center">{{ format(currentCashBook && currentCashBook.cash_in || 0) }}</div>
                        </div>
                    </div>
                    <div class="width width-row-4 width-mobile-row-2 padding padding-top-10px padding-bottom-10px">
                        <div class="padding padding-5px border-left content-center">
                            <div class="display-flex center align-center">
                                <i class="fonts fonts-8 orange fa fa-lg fa-arrow-down margin margin-right-5px"></i>
                                <span class="fonts fonts-9 normal grey overflow-ellipsis align-center">Cash Out</span>
                            </div>
                            <div class="fonts fonts-10 semibold black overflow-ellipsis align-center">{{ format(currentCashBook && currentCashBook.cash_out || 0) }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <OrderStatus 
                :data="currentCashBook"
                :enableButton="true"
                @onClick="onOpenOrderList" />
            
            <AppEmpty 
                v-if="!currentCashBook" 
                title="Please Open the Cashier to Create New Order" />
        </div>

        <Form 
            v-if="visibleForm" 
            @onSave="saveCashBook"
            @onClose="closeCashBook" />
        
        <AppPopupConfirmed 
            v-if="visibleConfirmed"
            :title="'Save this data ?'"
            @onClickNo="onClickNo"
            @onClickYes="onClickYes"
        />
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import AppCardCapsule from '../../../../modules/AppCardCapsule'
import AppPopupConfirmed from '../../../../modules/AppPopupConfirmed'
import AppEmpty from '../../../../modules/AppEmpty'
import Form from './Form'
import OrderStatus from '../../cashBook/OrderStatus'

export default {
    name: 'CashierCashBook',
    data () {
        return {
            showWarning: false,
            visibleForm: false,
            visibleConfirmed: false,
        }
    },
    mounted () {
        // this.getData()
    },
    components: {
        AppCardCapsule,
        AppPopupConfirmed,
        AppEmpty,
        Form,
        OrderStatus
    },
    computed: {
        ...mapState({
            form: (state) => state.storeCashBook.form,
            dataCurrent: (state) => state.storeCashBook.dataCurrent,
            loading: (state) => state.storeCashBook.loading,
        }),
        currentCashBook () {
            return this.dataCurrent && this.dataCurrent.current_cashbook
        },
        openedCashBook () {
            return this.dataCurrent && this.dataCurrent.opened_cashbook
        },
        shopCashBook () {
            return this.dataCurrent && this.dataCurrent.shop 
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
            setFormData: 'storeCashBook/setFormData',
            getCurrent: 'storeCashBook/getCurrent',
            createData: 'storeCashBook/createData'
        }),
        getData () {
            const token = this.$cookies.get('tokenBearer')
            const today = new Date()
            const shop_id = this.shopId
            if (shop_id) {
                this.getCurrent({ token, today: today, shop_id: shop_id })
                    .then((res) => {
                        const data = res.data.data.current_cashbook
                        if (!data) {
                            this.showWarning = true  
                        }
                    })
            }
        },
        onRefresh () {
            this.getData()
        },
        onClickNo () {
            this.visibleConfirmed = false 
        },
        onClickYes () {
            this.visibleConfirmed = false 
            const token = this.$cookies.get('tokenBearer')
            const shop_id = this.shopId
            this.createData({
                ...this.form,
                shop_id: shop_id,
                token: token
            }).then((res) => {
                const status = res.data.status 
                if (status === 'ok') {
                    this.closeCashBook()
                    this.getData()
                } else {
                    this.$message({
                        message: 'Failed to save this cash book',
                        type: 'error'
                    })
                }
            })
        },
        saveCashBook () {
            this.visibleConfirmed = true 
        },
        createCashBook () {
            this.visibleForm = true 
            this.setFormData(null)
        },
        closeCashBook () {
            this.visibleForm = false 
        },
        onOpenOrderList () {
            this.$emit('onOpenOrderList', this.currentCashBook)
        }
    }
}
</script>