<template>
    <div id="App">
        <AppSideForm 
            :title="title" 
            :enableCustomFooter="true"
            :onClose="onClose">
            <div v-if="isActiveOrder(form)" slot="toolbar">
                <button 
                    class="btn btn-small btn-grey with-border with-hover margin margin-right-10px"
                    @click="onChangeStatus(form, 'canceled')">
                    Cancel this Order
                </button>
            </div>

            <div class="card bg-white box-shadow margin margin-bottom-15px margin-top-15px">
                <div class="display-flex">
                    <div style="width: calc(100% - 75px);">
                        <div class="fonts fonts-11 semibold" style="margin-bottom: 10px;">{{ form.shop_name ? form.shop_name : '-' }}</div>
                        <div class="margin margin-bottom-15px">
                            <div class="fonts fonts-10 grey">
                                Table
                            </div>
                            <div class="fonts fonts-10 semibold black">
                                {{ form.table_name ? form.table_name : '-' }}
                            </div>
                        </div>
                        <div>
                            <div class="fonts fonts-10 grey">
                                Customer
                            </div>
                            <div class="fonts fonts-10 semibold black">
                                {{ form.customer_name ? form.customer_name : '-' }}
                            </div>
                        </div>
                    </div>
                    <div style="width: 75px;">
                        <div class="image image-padding image-radius">
                            <img v-if="form.shop_image" :src="shopImageThumbnailUrl + form.shop_image" alt="">
                            <i v-else class="post-middle-absolute fa fa-lg fa-store" />
                        </div>
                    </div>
                </div>
            </div>

            <div class="card bg-white box-shadow margin margin-bottom-15px margin-top-15px">
                <div class="fonts fonts-11 semibold black">Order</div>
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
                    <div class="display-flex">
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
                <div style="margin-bottom: 0;">
                    <div class="fonts fonts-10 grey">
                        Cashier
                    </div>
                    <div class="fonts fonts-10 black semibold">
                        -
                    </div>
                </div>
            </div>

            <div class="card bg-white box-shadow margin margin-bottom-15px margin-top-15px">
                <div class="fonts fonts-11 semibold black">Products</div>
                <div class="display-flex space-between margin margin-bottom-10px">
                    <div class="width width-70">
                        <div class="fonts fonts-10 grey">Product(s)</div>
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
                        <div style="width: 60px; margin-right: 15px;">
                            <div class="image image-padding">
                                <img :src="productImageThumbnailUrl + dt.product_image" alt="" class="post-center">
                            </div>
                        </div>
                        <div style="width: calc(100% - 75px);">
                            <div class="fonts fonts-10 semibold black">
                                {{ dt.product_name }}
                            </div>
                            <div class="fonts fonts-9 grey">
                                {{ dt.quantity }} {{ dt.product_detail }} x {{ format(dt.price) }}
                            </div>
                            <div v-if="dt.product_toping" class="fonts fonts-9 grey">
                                {{ dt.quantity }} {{ dt.product_toping }} x {{ format(dt.toping_price) }}
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
                        <div class="fonts fonts-10 semibold black">Total Price ({{ form.total_item }} Product)</div>
                    </div>
                    <div class="width width-30">
                        <div class="fonts fonts-10 semibold black">{{ format(form.total_price) }}</div>
                    </div>
                </div>
            </div>

            <div class="card bg-white box-shadow margin margin-bottom-15px margin-top-15px">
                <div class="fonts fonts-11 semibold black">Payment</div>
                <div class="display-flex space-between">
                    <div class="width width-70">
                        <div class="fonts fonts-10 black">Payment Status</div>
                    </div>
                    <div class="width width-30 display-flex">
                        <AppCardCapsule :data="form.payment_status ? 'paid' : 'unpaid'" />
                    </div>
                </div>
                <div class="display-flex space-between margin margin-bottom-15px">
                    <div class="width width-70">
                        <div class="fonts fonts-10 black">Payment Method</div>
                    </div>
                    <div class="width width-30">
                        <div class="fonts fonts-10 black">{{ form.payment_name ? form.payment_name : '-' }}</div>
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
            </div>

            <div slot="footer">
                <div class="right-form-footer display-flex flex-end">
                    <div v-if="form.status === 'new-order'">
                        <button 
                            class="btn btn-green margin margin-left-10px"
                            @click="onChangeStatus(form, 'on-progress')">
                            Confirm This Order
                        </button>
                    </div>

                    <div v-if="form.status !== 'canceled' && form.payment_status">
                        <button class="btn btn-main-reverse with-hover margin margin-left-10px">
                            Print Receipt
                        </button>
                    </div>

                    <div v-if="form.status === 'on-progress' && !form.payment_status">
                        <button 
                            class="btn btn-main-reverse with-hover margin margin-left-10px"
                            @click="onCheckout(form)">
                            Check Out
                        </button>
                    </div>

                    <div v-if="form.status === 'on-progress'">
                        <button 
                            :disabled="isButtonDoneDisabled(form)"
                            class="btn btn-green margin margin-left-10px"
                            @click="onChangeStatus(form, 'done')">
                            Mark as Done
                        </button>
                    </div>

                    <div v-if="form.status === 'canceled'">
                        <button 
                            class="btn btn-sekunder btn-full" 
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
        title () {
            let currentTitle = ''
            switch (this.typeForm) {
                case 'create':
                    currentTitle = 'Create Order'
                    break
                case 'detail':
                    currentTitle = 'Detail Order'
                    break
                case 'edit':
                    currentTitle = 'Edit Order'
                    break
            }
            return currentTitle
        },
        isDetailForm () {
            let status = false 
            if (this.typeForm === 'detail') {
                status = true 
            }
            return status
        },
        isCreateForm () {
            let status = false 
            if (this.typeForm === 'create') {
                status = true 
            }
            return status
        },
        getCover () {
            return this.form.image ? this.productImageThumbnailUrl + this.form.image : ''
        }
    },
    components: {
        AppCardCapsule,
        AppSideForm,
        AppImage,
        AppTabs,
    },
    methods: {
        isOrderStatusCanceled (data) {
            return data.status === 'canceled'
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
        }
    },
}
</script>