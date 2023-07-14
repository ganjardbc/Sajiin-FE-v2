<template>
    <div id="App">
        <AppSideForm 
            :title="'Edit Product'" 
            :subtitle="form.order_id"
            :enableCustomFooter="true"
            :onClose="onClose">
            <div slot="toolbar">
                <button 
                    class="btn btn-sekunder margin margin-right-10px"
                    @click="onOpenVisibleAddProduct">
                    Add Product
                </button>
            </div>
            <AppEmpty v-if="form.details && form.details.length === 0" />
            <Card v-if="form.details" :data.sync="form.details" />
            <div slot="footer">
                <div class="right-form-footer">
                    <div class="card bg-white box-shadow margin margin-bottom-20px">
                        <div class="display-flex space-between">
                            <div class="fonts fonts-10 semibold black">Total ({{ form.total_item }} products)</div>
                            <div class="fonts fonts-10 semibold black">{{ format(form.total_price) }}</div>
                        </div>
                        <div v-if="isThereDiscount" class="display-flex space-between">
                            <div class="fonts fonts-10 normal black">Discount</div>
                            <div class="fonts fonts-10 normal black align-right">{{ format(totalDiscount) }}</div>
                        </div>
                    </div>
                    <button 
                        class="btn btn-main btn-full" 
                        :disabled="form.details && form.details.length === 0"
                        @click="onSave">
                        Save Product
                    </button>
                </div>
            </div>
        </AppSideForm>

        <AddProduct v-if="visibleAddProduct" @onClose="onCloseVisibleAddProduct" />
    </div>
</template>

<script>
import { mapState } from 'vuex'
import AppSideForm from '../../../../modules/AppSideForm'
import AppCardCapsule from '../../../../modules/AppCardCapsule'
import AppEmpty from '../../../../modules/AppEmpty'
import AddProduct from './addProduct/Index'
import Card from './Card'

export default {
    name: 'App',
    data () {
        return {
            visibleAddProduct: false 
        }
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
        orderPriceBeforeDiscount () {
            let price = 0
            this.form && this.form.details && this.form.details.map((item) => {
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
            return this.orderPriceBeforeDiscount - this.form.total_price
        },
        isThereDiscount () {
            let status = false
            this.form && this.form.details && this.form.details.map((item) => {
                if (item.is_discount) {
                    status = true 
                }
            })
            return status
        },
    },
    components: {
        AppCardCapsule,
        AppSideForm,
        AppEmpty,
        Card,
        AddProduct,
    },
    methods: {
        isOrderStatusCanceled (data) {
            return data.status === 'canceled'
        },
        isButtonEditProductDisabled (data) {
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
        onSave () {
            this.$emit('onSave')
        },
        onClose () {
            this.$emit('onClose')
        },
        onOpenVisibleAddProduct () {
            this.visibleAddProduct = true
        },
        onCloseVisibleAddProduct () {
            this.visibleAddProduct = false
        },
    },
}
</script>