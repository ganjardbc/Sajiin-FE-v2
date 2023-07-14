<template>
    <div id="App">
        <AppSideForm 
            :title="'Detail Order'"
            :subtitle="form.order_id"
            :enableCustomFooter="true"
            :onClose="onClose">
            <div v-if="isActiveOrder(form)" slot="toolbar">
                <button 
                    class="btn btn-grey with-border with-hover margin margin-right-10px"
                    @click="onChangeStatus(form, 'canceled')">
                    Cancel Order
                </button>
            </div>

            <div class="card bg-white box-shadow margin margin-bottom-15px margin-top-15px">
                <div class="display-flex">
                    <div style="width: calc(100% - 75px);">
                        <div class="fonts fonts-11 semibold" style="margin-bottom: 10px;">{{ form.shop_name ? form.shop_name : '-' }}</div>
                        <div class="margin margin-bottom-15px">
                            <div class="fonts fonts-10 grey">
                                Order ID
                            </div>
                            <div class="fonts fonts-10 semibold black">
                                {{ form.order_id }}
                            </div>
                        </div>
                        <div class="margin margin-bottom-15px">
                            <div class="fonts fonts-10 grey">
                                Order Status 
                            </div>
                            <div class="display-flex padding padding-top-10px">
                                <AppCardCapsule :data="form.status" />
                            </div>
                        </div>
                        <div class="margin margin-bottom-15px">
                            <div class="fonts fonts-10 grey">
                                Order Date
                            </div>
                            <div class="fonts fonts-10 black semibold">
                                {{ form.created_at | moment("dddd, DD MMM YYYY") }}
                            </div>
                        </div>
                        <div 
                            v-if="form.cashbook"
                            class="margin margin-bottom-15px">
                            <div class="fonts fonts-10 grey">
                                Cash Book 
                            </div>
                            <div class="fonts fonts-10 black semibold">
                                {{ form.cashbook && form.cashbook.cash_date | moment("dddd, DD MMM YYYY") }}
                            </div>
                        </div>
                        <div style="margin-bottom: 0;">
                            <div class="fonts fonts-10 grey">
                                Cashier
                            </div>
                            <div class="fonts fonts-10 black semibold">
                                {{ form.cashier_name || '-' }}
                            </div>
                        </div>
                    </div>
                    <div style="width: 75px;">
                        <div class="image image-padding image-radius border-full">
                            <img v-if="form.shop_image" :src="shopImageThumbnailUrl + form.shop_image" alt="">
                            <i v-else class="post-middle-absolute fa fa-lg fa-store" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="card bg-white box-shadow margin margin-bottom-15px margin-top-15px">
                <div class="fonts fonts-11 semibold black">Customer</div>
                <div class="margin margin-bottom-15px">
                    <div class="fonts fonts-10 grey">
                        Name
                    </div>
                    <div class="fonts fonts-10 semibold black">
                        {{ form.customer_name ? form.customer_name : '-' }}
                    </div>
                </div>
                <div>
                    <div class="fonts fonts-10 grey">
                        Table
                    </div>
                    <div class="fonts fonts-10 semibold black">
                        {{ form.table_name ? form.table_name : '-' }}
                    </div>
                </div>

                <div class="padding padding-bottom-15px margin margin-bottom-15px border-bottom"></div>

                <div>
                    <div class="fonts fonts-9 grey normal margin margin-bottom-10px">
                        You can still edit customer as long as the order status is "New Order" or "On Progress"
                    </div>
                    <button 
                        class="btn btn-sekunder btn-full" 
                        :disabled="!isButtonCustomerDisabled(form)"
                        @click="onCustomer(form)">
                        Edit Customer
                    </button>
                </div>
            </div>

            <div class="card bg-white box-shadow margin margin-bottom-15px margin-top-15px">
                <div class="display-flex space-between align-center margin margin-bottom-5px">
                    <div class="fonts fonts-11 semibold black">Products</div>
                    <AppCardProgressProduct :data="form.details" />
                </div>
                <div class="display-flex space-between margin margin-bottom-10px">
                    <div class="width width-70">
                        <div class="fonts fonts-10 grey">Products</div>
                    </div>
                    <div class="width width-30">
                        <div class="fonts fonts-10 grey">Price</div>
                    </div>
                </div>

                <div 
                    v-for="(dt, index) in form.details" 
                    :key="index" 
                    class="display-flex space-between margin margin-bottom-15px">
                    <div class="width width-70 display-flex">
                        <div class="width width-40px margin margin-right-15px">
                            <div class="image image-padding border-full">
                                <img v-if="dt.product_image" :src="productImageThumbnailUrl + dt.product_image" alt="" class="post-center">
                                <i v-else class="post-middle-absolute icn fa fa-lg fa-image"></i>
                            </div>
                        </div>
                        <div style="width: calc(100% - 60px);">
                            <div class="fonts fonts-10 semibold black">
                                {{ dt.product_name }}
                                <span v-if="dt.product_detail" class="fonts fonts-10 normal black"> - {{ dt.product_detail }}</span>
                            </div>
                            <div class="fonts fonts-9 grey">
                                {{ dt.quantity }} x {{ format(dt.price) }}
                                <span v-if="dt.is_discount" class="fonts fonts-9 grey text-line">{{ format(dt.second_price) }}</span>
                            </div>
                            <div v-if="dt.note" class="fonts fonts-9 grey">
                                {{ dt.note }}
                            </div>
                            <div class="margin margin-top-5px">
                                <AppCardCapsule :data="dt.status" />
                            </div>
                        </div>
                    </div>
                    <div class="width width-30">
                        <div class="fonts fonts-10 semibold black">{{ format(dt.subtotal) }}</div>
                    </div>
                </div>

                <div class="margin margin-bottom-15px border-bottom"></div>

                <div class="display-flex space-between">
                    <div class="width width-70">
                        <div class="fonts fonts-10 semibold black">Total ({{ form.total_item }} products)</div>
                    </div>
                    <div class="width width-30">
                        <div class="fonts fonts-10 semibold black">{{ format(form.total_price) }}</div>
                    </div>
                </div>

                <div  class="padding padding-bottom-15px margin margin-bottom-15px border-bottom"></div>

                <div v-if="form.is_discount" class="display-flex space-between">
                    <div class="width width-70">
                        <div class="fonts fonts-10 normal black">Discount</div>
                    </div>
                    <div class="width width-30">
                        <div class="fonts fonts-10 normal black">{{ format(form.total_discount) }}</div>
                    </div>
                </div>

                <div v-if="form.is_discount" class="padding padding-bottom-15px margin margin-bottom-15px border-bottom"></div>

                <div>
                    <div class="fonts fonts-9 grey normal margin margin-bottom-10px">
                        You can still edit products as long as the order status is "New Order / On Progress" and the payment status is "Unpaid"
                    </div>
                    <button 
                        class="btn btn-sekunder btn-full" 
                        :disabled="!isButtonEditDisabled(form)"
                        @click="onProduct(form)">
                        Edit Product 
                    </button>
                </div>
            </div>

            <div class="card bg-white box-shadow margin margin-bottom-15px margin-top-15px">
                <div class="fonts fonts-11 semibold black">Payment</div>
                <div class="display-flex space-between">
                    <div class="width width-70">
                        <div class="fonts fonts-10 black">Payment Status</div>
                    </div>
                    <div class="width width-30 display-flex">
                        <div class="fonts fonts-10 semibold black">{{ form.payment_status ? 'Paid' : 'Unpaid' }}</div>
                    </div>
                </div>
                <div class="display-flex space-between margin margin-bottom-15px">
                    <div class="width width-70">
                        <div class="fonts fonts-10 black">Payment Method</div>
                    </div>
                    <div class="width width-30">
                        <div class="fonts fonts-10 semibold black">{{ form.payment_name ? form.payment_name : '-' }}</div>
                    </div>
                </div>

                <div class="fonts fonts-11 semibold black">Bills</div>
                <div class="display-flex space-between">
                    <div class="width width-70">
                        <div class="fonts fonts-10 black">Bill Payment</div>
                    </div>
                    <div class="width width-30">
                        <div class="fonts fonts-10 black semibold">{{ format(form.bills_price) }}</div>
                    </div>
                </div>
                <div class="display-flex space-between">
                    <div class="width width-70">
                        <div class="fonts fonts-10 black">Change</div>
                    </div>
                    <div class="width width-30">
                        <div class="fonts fonts-10 black semibold">{{ format(form.change_price) }}</div>
                    </div>
                </div>

                <div v-if="form.status === 'on-progress' && !form.payment_status">
                    <div class="padding padding-bottom-15px margin margin-bottom-15px border-bottom"></div>

                    <div class="fonts fonts-9 grey normal margin margin-bottom-10px">
                        For this order you can continue to check out
                    </div>
                    <button 
                        class="btn btn-sekunder btn-full" 
                        @click="onCheckout(form)">
                        Check Out
                    </button>
                </div>

                <div v-if="form.status !== 'canceled' && form.payment_status">
                    <div class="padding padding-bottom-15px margin margin-bottom-15px border-bottom"></div>

                    <div class="fonts fonts-9 grey normal margin margin-bottom-10px">
                        For this order you can print the receipt 
                    </div>
                    <button 
                        class="btn btn-sekunder btn-full" 
                        @click="onReceipt(form)">
                        Print Receipt
                    </button>
                </div>
            </div>

            <div slot="footer">
                <div class="right-form-footer display-flex space-between">
                    <div v-if="form.status !== 'canceled' && form.payment_status" style="width: calc(50% - 7.5px);">
                        <button 
                            class="btn btn-full btn-sekunder"
                            @click="onReceipt(form)">
                            Print Receipt
                        </button>
                    </div>

                    <div v-if="form.status === 'on-progress' && !form.payment_status" style="width: calc(50% - 7.5px);">
                        <button 
                            class="btn btn-full btn-sekunder"
                            @click="onCheckout(form)">
                            Check Out
                        </button>
                    </div>

                    <div v-if="form.status === 'on-progress' || form.status === 'done'" style="width: calc(50% - 7.5px);">
                        <button 
                            :disabled="isButtonDoneDisabled(form)"
                            class="btn btn-full btn-green"
                            @click="onChangeStatus(form, 'done')">
                            Mark as Done
                        </button>
                    </div>

                    <div v-if="form.status === 'new-order'" class="width width-100">
                        <button 
                            class="btn btn-full btn-sekunder"
                            @click="onChangeStatus(form, 'on-progress')">
                            Pick Order
                        </button>
                    </div>

                    <div v-if="form.status === 'canceled'" class="width width-100">
                        <button 
                            class="btn btn-full btn-sekunder btn-full" 
                            @click="onChangeStatus(form, 'new-order')">
                            Re-open This Order
                        </button>
                    </div>
                </div>
            </div>
        </AppSideForm>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import AppSideForm from '../../../modules/AppSideForm'
import AppCardCapsule from '../../../modules/AppCardCapsule'
import AppImage from '../../../modules/AppImage'
import AppTabs from '../../../modules/AppTabs'
import AppCardProgressProduct from '../../../modules/AppCardProgressProduct'

export default {
    name: 'App',
    data () {
        return {}
    },
    mounted () {
        this.selectedIndex = 0
    },
    watch: {
        formId () {
            this.selectedIndex = 0
        }
    },
    computed: {
        ...mapState({
            form: (state) => state.storeOrders.form,
            errorMessage: (state) => state.storeOrders.errorMessage,
            typeForm: (state) => state.storeOrders.typeForm,
            category: (state) => state.storeCategory.data,
        }),
        formId: {
            get () {
                return this.$store.state.storeOrders.form.id
            },
            set (value) {
                this.$store.state.storeOrders.form.id = value
            }
        },
        getCover () {
            return this.form.image ? this.productImageThumbnailUrl + this.form.image : ''
        },
    },
    components: {
        AppCardCapsule,
        AppSideForm,
        AppImage,
        AppTabs,
        AppCardProgressProduct,
    },
    methods: {
        isOrderStatusCanceled (data) {
            return data.status === 'canceled'
        },
        isButtonEditDisabled (data) {
            return !data.payment_status && (data.status === 'new-order' || data.status === 'on-progress')
        },
        isButtonCustomerDisabled (data) {
            return data.status === 'new-order' || data.status === 'on-progress'
        },
        isButtonDoneDisabled (data) {
            return data.payment_status && data.status !== 'on-progress'
        },
        isOrderStatusDC (data) {
            return data.status === 'done' || data.status === 'canceled'
        },
        isActiveOrder (data) {
            let status = false
            if (data.status === 'new-order') status = true 
            if (data.status === 'on-progress') status = true 
            return status
        },
        onChangeTabs (data) {
            this.selectedIndex = data
        },
        uploadImage (data) {
            this.$emit('uploadImage', data)
        },
        removeImage (data) {
            this.$emit('removeImage', data)
        },
        onSave () {
            this.$emit('onSave')
        },
        onClose () {
            this.$emit('onClose')
        },
        onChangeStatus (data, status) {
            const payload = {
                ...data,
                status: status
            }
            this.$emit('onChangeStatus', payload)
        },
        onCheckout (data) {
            this.$emit('onCheckout', data)
        },
        onReceipt (data) {
            this.$emit('onReceipt', data)
        },
        onProduct (data) {
            this.$emit('onProduct', data)
        },
        onCustomer (data) {
            this.$emit('onCustomer', data)
        }
    },
}
</script>