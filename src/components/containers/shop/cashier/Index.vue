<template>
    <div id="App">
        <div class="cashier-container">
            <div class="display-flex space-between margin margin-bottom-5px">
                <h1 class="fonts big black bold">Cashier</h1>
                <CashBookNotification />
            </div>
            <CashBook @onOpenOrderList="onOpenOrderList" />
            <Product v-if="currentCashBook" />
        </div>

        <div :class="`content-form ${!visibleCart && 'hide'}`">
            <div class="right">
                <Cart 
                    @onCreateOrder="onCreateOrder"
                    @onCheckOut="onOpenCheckOut"
                    @onClose="onCloseCart" />
            </div>
        </div>

        <div :class="`content-form ${!visibleCheckOut && 'hide'}`">
            <div class="right">
                <CheckOut 
                    @onCreateOrder="onCreateOrder"
                    @onClose="onCloseCheckOut" />
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

        <div :class="`content-form ${!visibleOrderList && 'hide'}`">
            <div class="right">
                <OrderList 
                    @onDownload="onDownloadReport"
                    @onClose="onCloseOrderList">
                </OrderList>
            </div>
        </div>

        <CartPopup 
            v-if="currentCashBook"
            @onClick="onOpenCart" />

        <AppPopupConfirmed 
            v-if="visibleConfirmed"
            :title="titleConfirmed"
            @onClickNo="onClickNo"
            @onClickYes="onClickYes"
        />

        <AppPopupAlert 
            v-if="visibleAlert"
            :title="titleAlert"
            :icon="iconAlert"
            @onClickOk="onClickOk"
        />

        <AppPopupLoader 
            v-if="loading"
        />

        <AppPopupLoader 
            v-if="loadingDownload"
        />
    </div>
</template>
<script>
import moment from 'moment'
import { mapState, mapActions } from 'vuex'
import AppPopupLoader from '../../../modules/AppPopupLoader'
import AppPopupConfirmed from '../../../modules/AppPopupConfirmed'
import AppPopupAlert from '../../../modules/AppPopupAlert'
import FormReceipt from '../orders/receipt/Index'
import CashBook from './cashBook/Index'
import CashBookNotification from './cashBook/Notification'
import Product from './product/Index'
import Cart from './cart/Index'
import CartPopup from './cart/CartPopup'
import CheckOut from './checkOut/Index'
import OrderList from '../cashBook/OrderList'

export default {
    name: 'App',
    metaInfo: {
        title: 'Shop',
        titleTemplate: '%s | Cashier',
        htmlAttrs: {
            lang: 'en',
            amp: true
        }
    },
    data () {
        return {
            typeForm: 'carts',
            visibleForm: false,
            visibleCart: false,
            visibleCheckOut: false,
            visibleFormReceipt: false,
            visibleOrderList: false,
            visibleAlert: false,
            titleAlert: 'Failed to preceed data',
            iconAlert: 'fa fa-4x fa-info-circle',
            visibleConfirmed: false,
            visibleConfirmedDelete: false,
            titleConfirmed: 'Create this order ?',
        }
    },
    watch: {
        shopId (prevProps, nextProps) {
            if (prevProps !== nextProps) {
                this.resetOrder()
            }
        }
    },
    components: {
        AppPopupLoader,
        AppPopupConfirmed,
        AppPopupAlert,
        FormReceipt,
        CashBook,
        CashBookNotification,
        Product,
        Cart,
        CartPopup,
        CheckOut,
        OrderList,
    },
    computed: {
        ...mapState({
            form: (state) => state.storeCashier.form,
            loading: (state) => state.storeCashier.loading,
            dataCurrent: (state) => state.storeCashBook.dataCurrent,
            loadingDownload: (state) => state.storeReports.loading,
        }),
        currentCashBook () {
            return this.dataCurrent && this.dataCurrent.current_cashbook
        },
        shopId () {
            return this.$store.state.storeSelectedShop.selectedData
        },
    },
    methods: {
        ...mapActions({
            resetOrder: 'storeCashier/resetOrder',
            createOrder: 'storeCashier/createOrder',
            getById: 'storeCashier/getById',
            setFormData: 'storeOrders/setFormData',
            getCashBook: 'storeCashBook/getCurrent',
            setFormCashBook: 'storeCashBook/setFormData',
            download: 'storeReports/download',
            reports: 'storeReports/getData',
        }),
        onOpenCart () {
            this.visibleCart = true
        },
        onCloseCart () {
            this.visibleCart = false
        },
        onOpenCheckOut () {
            this.visibleCheckOut = true
        },
        onCloseCheckOut () {
            this.visibleCheckOut = false 
        },
        onCreateOrder () {
            this.visibleConfirmed = true 
        },

        // RECEIPT 
        onOpenReceipt (data) {
            const token = this.$cookies.get('tokenBearer')
            this.getById({
                token: token,
                order_id: data.order.order_id,
            }).then((res) => {
                const response = res.data.data 
                const payload = {
                    ...response.order,
                    shop_image: response.shop.image,
                    address: response.address,
                    customer: response.customer,
                    details: response.details,
                    payment: response.payment,
                    shipment: response.shipment,
                    shop: response.shop,
                    table: response.table
                }
                if (payload.payment_status) {
                    this.visibleFormReceipt = true 
                    this.setFormData(payload)
                }
            })
        },
        onCloseReceipt () {
            this.visibleFormReceipt = false
        },
        onPrintReceipt () {
            alert('onPrintReceipt')
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
            const cashbook_id = this.currentCashBook && this.currentCashBook.id 
            const payload = {
                ...this.form,
                order: {
                    ...this.form.order,
                    cashbook_id: cashbook_id,
                },
                token: token
            }
            this.createOrder(payload).then((res) => {
                const status = res.data.status 
                if (status === 'ok') {
                    this.onCloseCart()
                    this.onCloseCheckOut()
                    this.resetOrder()
                    this.getDataCashBook()
                    this.onOpenReceipt(res.data.data)
                    this.$message(`Success create new order.`)
                } else {
                    this.visibleAlert = true 
                    this.titleAlert = 'Failed to create this order'
                }
            })
        },

        // CASH BOOK
        getDataCashBook () {
            const token = this.$cookies.get('tokenBearer')
            const today = new Date()
            const shop_id = this.shopId
            if (shop_id) {
                this.getCashBook({ token, today: today, shop_id: shop_id })
            }
        },
        onCloseOrderList () {
            this.visibleOrderList = false 
        },
        onOpenOrderList (data) {
            this.setFormCashBook(data)
            this.onGetReport(data)
        },
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
        onGetReport (data) {
            const token = this.$cookies.get('tokenBearer')
            const shopId = this.shopId
            const search = ''
            const startDate = moment(data.cash_date).format('YYYY-MM-DD 00:00:00')
            const endDate = moment(data.cash_date).format('YYYY-MM-DD 23:59:59')
            const orderStatus = ''
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
                disable_limit: true,
            }

            this.reports(payload).then((res) => {
                if (res.status === 200) {
                    this.visibleOrderList = true 
                }
            })
        },
    }
}
</script>