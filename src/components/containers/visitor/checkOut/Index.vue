<template>
    <div id="App">
        <AppMobileLayout title="Check Out">
            <AppEmpty v-if="dataCart.length === 0" />

            <div v-if="dataCart.length > 0" class="padding padding-10px" style="padding-bottom: 50px;">
                <div class="card box-shadow bg-white margin margin-bottom-20px">
                    <div class="fonts fonts-11 semibold black">Customer Info</div>
                    <div class="field-group">
                        <el-input 
                            placeholder="Customer name"
                            type="text"
                            v-model="formOrder.customer_name"></el-input>
                        <Table class="margin margin-top-15px" />
                    </div>
                </div>

                <div class="card bg-white box-shadow margin margin-bottom-20px">
                    <div class="fonts fonts-11 semibold black">Products</div>
                    <div class="display-flex space-between margin margin-bottom-10px">
                        <div class="width width-70">
                            <div class="fonts fonts-10 grey">Products</div>
                        </div>
                        <div class="width width-30">
                            <div class="fonts fonts-10 grey">Price</div>
                        </div>
                    </div>
                    <div 
                        v-for="(dt, index) in dataCart" 
                        :key="index" 
                        class="display-flex space-between margin margin-bottom-15px">
                        <div class="width width-70 display-flex">
                            <div style="width: 60px; margin-right: 15px;">
                                <div class="image image-padding border-full">
                                    <img v-if="dt.product_image" :src="productImageThumbnailUrl + dt.product_image" alt="" class="post-center">
                                    <i v-else class="post-middle-absolute icn fa fa-lg fa-image"></i>
                                </div>
                            </div>
                            <div style="width: calc(100% - 75px);">
                                <div class="display-flex">
                                    <span class="fonts fonts-10 semibold black">{{ dt.product_name }}</span>
                                    <span v-if="dt.product_detail" class="fonts fonts-10 normal black margin margin-left-5px"> - {{ dt.product_detail }}</span>
                                </div>
                                <div class="fonts fonts-9 grey">
                                    {{ dt.quantity }} x {{ format(dt.price) }}
                                    <span v-if="dt.is_discount" class="fonts fonts-9 grey text-line">{{ format(dt.second_price) }}</span>
                                </div>
                                <div v-if="dt.product_toping" class="fonts fonts-9 grey">
                                    {{ dt.quantity }} {{ dt.product_toping }} x {{ format(dt.toping_price) }}
                                </div>
                                <div v-if="dt.note" class="fonts fonts-9 grey">
                                    {{ dt.note }}
                                </div>
                            </div>
                        </div>
                        <div class="width width-30">
                            <div class="fonts fonts-10 semibold black">{{ format(dt.subtotal) }}</div>
                        </div>
                    </div>
                    <div class="padding padding-bottom-5px margin margin-bottom-15px border-bottom"></div>
                    <div class="display-flex space-between">
                        <div class="width width-70">
                            <div class="fonts fonts-10 semibold black">Total ({{ orderQuantity }} roduct)</div>
                        </div>
                        <div class="width width-30">
                            <div class="fonts fonts-10 semibold black">{{ format(orderSubtotal) }}</div>
                        </div>
                    </div>
                    <div v-if="isThereDiscount" class="padding padding-bottom-15px margin margin-bottom-15px border-bottom"></div>
                    <div v-if="isThereDiscount" class="display-flex space-between">
                        <div class="width width-70">
                            <div class="fonts fonts-10 normal black">Discount</div>
                        </div>
                        <div class="width width-30">
                            <div class="fonts fonts-10 normal black">{{ format(totalDiscount) }}</div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="navbar-bottom">
                <div class="navbar-bottom-content padding padding-10px">
                    <button 
                        class="btn btn-full btn-main" 
                        :disabled="!enableButtonCreateOrder"
                        @click="onCreateOrder">
                        Create Order
                    </button>
                </div>
            </div>
        </AppMobileLayout>

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
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import AppMobileLayout from '../../../modules/AppMobileLayout'
import AppPopupLoader from '../../../modules/AppPopupLoader'
import AppPopupConfirmed from '../../../modules/AppPopupConfirmed'
import AppPopupAlert from '../../../modules/AppPopupAlert'
import AppLoader from '../../../modules/AppLoader'
import AppEmpty from '../../../modules/AppEmpty'
import Table from '../table/Index'

export default {
    name: 'App',
    metaInfo: {
        title: 'Visitor',
        titleTemplate: '%s | Check Out',
        htmlAttrs: {
            lang: 'en',
            amp: true
        }
    },
    data () {
        return {
            visibleAlert: false,
            titleAlert: 'Failed to preceed data',
            iconAlert: 'fa fa-4x fa-info-circle',
            visibleConfirmed: false,
            visibleConfirmedDelete: false,
            titleConfirmed: 'Create this order ?',
        }
    },
    components: {
        AppMobileLayout,
        AppPopupLoader,
        AppPopupConfirmed,
        AppPopupAlert,
        AppLoader,
        AppEmpty,
        Table
    },
    computed: {
        ...mapState({
            form: (state) => state.storeVisitorOrder.form,
            formOrder: (state) => state.storeVisitorOrder.form.order,
            loading: (state) => state.storeVisitorOrder.loading,
            dataCart: (state) => state.storeVisitorOrder.form.details,
            dataShop: (state) => state.storeVisitorShop.data,
        }),
        selectedShop () {
            return this.dataShop.shop
        },
        enableButtonCreateOrder () {
            let status = false
            // this.formOrder.shop_id && 
            if (
                this.dataCart && 
                this.dataCart.length > 0 && 
                this.formOrder.customer_name 
                // && this.formOrder.table_id
            ) {
                status = true   
            }
            return status
        },
        orderQuantity () {
            let quantity = 0
            this.dataCart && this.dataCart.map((item) => {
                quantity += item.quantity
            })
            return quantity
        },
        orderSubtotal () {
            let subtotal = 0
            this.dataCart && this.dataCart.map((item) => {
                subtotal += item.subtotal
            })
            return subtotal
        },
        orderPriceBeforeDiscount () {
            let price = 0
            this.dataCart && this.dataCart.map((item) => {
                let quantity = item.quantity
                if (item.is_discount) {
                    price += quantity * item.second_price
                } else {
                    price += quantity * item.price
                }
            })
            return price
        },
        totalDiscount () {
            return this.orderPriceBeforeDiscount - this.orderSubtotal
        },
        isThereDiscount () {
            let status = false
            this.dataCart && this.dataCart.map((item) => {
                if (item.is_discount) {
                    status = true 
                }
            })
            return status
        },
    },
    methods: {
        ...mapActions({
            setOrder: 'storeVisitorOrder/setOrder',
            resetOrder: 'storeVisitorOrder/resetOrder',
            createOrder: 'storeVisitorOrder/createOrder'
        }),

        // ORDER
        onCreateOrder () {
            const payload = {
                total_item: this.orderQuantity,
                total_price: this.orderSubtotal,
                shop: this.selectedShop,
            }
            this.setOrder(payload)
            this.visibleConfirmed = true
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
            this.createOrder(this.form).then((res) => {
                const status = res.data.status 
                const data = res.data.data 
                // const order = res.data.data.order 
                if (status === 'ok') {
                    this.resetOrder()
                    this.$message(`Your order has been submited.`)
                    this.onSendNotification(data.order)
                    this.$router.replace({ name: 'visitor-order', params: { 'orderId' : data.order.order_id } })
                } else {
                    this.visibleAlert = true 
                    this.titleAlert = 'Failed to create this order'
                }
            })
        },

        // SOCKET
        onSendNotification (data) {
            const shop = this.selectedShop
            const payload = {
                shopId: shop.shop_id,
                orderId: data.order_id,
                shopName: data.shop_name,
                tableName: data.table_name,
                customerName: data.customer_name,
                type: 'order'
            }
            this.$socket.emit('notification', payload)
        }
    }
}
</script>