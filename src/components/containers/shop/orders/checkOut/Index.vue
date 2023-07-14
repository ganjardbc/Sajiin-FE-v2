<template>
    <div id="App">
        <AppSideForm 
            :title="title" 
            :subtitle="form.order_id"
            :enableCustomFooter="true"
            :onClose="onClose">
            <div class="card bg-white box-shadow margin margin-bottom-15px margin-top-15px">
                <div class="display-flex space-between align-center padding padding-bottom-10px">
                    <div class="fonts fonts-11 semibold black">
                        Payment
                    </div>
                    <AppCardCapsule 
                        :data="form.payment_status ? 'paid' : 'unpaid'" />
                </div>
                <div class="margin margin-bottom-15px">
                    <Payment />
                </div>
                <div class="display-flex space-between">
                    <div class="fonts fonts-10 semibold black">Total ({{ form.total_item }} products)</div>
                    <div class="fonts fonts-10 semibold main-color">{{ format(form.total_price) }}</div>
                </div>
                <div v-if="isThereDiscount" class="padding padding-bottom-15px margin margin-bottom-15px border-bottom"></div>
                <div v-if="isThereDiscount" class="display-flex space-between">
                    <div class="fonts fonts-10 normal grey">Discount</div>
                    <div class="fonts fonts-10 normal black">{{ format(totalDiscount) }}</div>
                </div>
            </div>

            <div class="card bg-white box-shadow margin margin-bottom-15px margin-top-15px">
                <div class="fonts fonts-11 semibold black">
                    Bills
                </div>
                <div class="field-group">
                    <div class="field-label">Bills Price</div>
                    <currency-input
                        class="field field-sekunder"
                        v-model="form.bills_price"
                        :precision="0"
                        @change="onChangeBills"
                    />
                    <div 
                        v-if="errorMessage.bills_price" 
                        class="field-error">
                        {{ errorMessage.bills_price && errorMessage.bills_price[0] }}
                    </div>
                </div>
                <div class="padding padding-bottom-5px">
                    <AppCardPriceSuggestion @onChange="onChangeBiilsSuggestion" />
                </div>
                <div class="padding padding-bottom-7px margin margin-bottom-15px border-bottom"></div>
                <div class="display-flex space-between">
                    <div class="fonts fonts-10 semibold black">Change</div>
                    <div class="fonts fonts-10 semibold main-color">{{ format(form.change_price) }}</div>
                </div>
            </div>

            <div slot="footer">
                <div class="right-form-footer">
                    <div class="field-group" style="padding-top: 0;">
                        <div class="field-label">Order Status</div>
                        <div class="display-flex space-between">
                            <div class="fonts micro black">Mark this order status as "Done" ?</div>
                            <el-switch 
                                v-model="form.status"
                                :disabled="isButtonEnable"
                                :active-value="'done'"
                                :inactive-value="'on-progress'"></el-switch>
                        </div>
                    </div>
                    <button 
                        class="btn btn-main btn-full"
                        :disabled="isButtonEnable"
                        @click="onCreateOrder">
                        Save Order
                    </button>
                </div>
            </div>
        </AppSideForm>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import AppSideForm from '../../../../modules/AppSideForm'
import AppCardCapsule from '../../../../modules/AppCardCapsule'
import AppCardPriceSuggestion from '../../../../modules/AppCardPriceSuggestion'
import Payment from '../payment/Index'
import Table from '../table/Index'

export default {
    name: 'App',
    data () {
        return {
            title: 'Check Out'
        }
    },
    components: {
        AppSideForm,
        AppCardCapsule,
        AppCardPriceSuggestion,
        Payment,
        Table,
    },
    methods: {
        ...mapActions({
            setOrderBills: 'storeOrders/setOrderBills'
        }),
        onClose () {
            this.$emit('onClose')
        },
        onCreateOrder () {
            this.$emit('onCreateOrder')
        },
        onChangeBiilsSuggestion (data) {
            this.form.bills_price = data 
            this.setOrderBills(data)
        },
        onChangeBills (data) {
            this.form.bills_price = data 
            this.setOrderBills(data)
        }
    },
    computed: {
        ...mapState({
            form: (state) => state.storeOrders.form,
            errorMessage: (state) => state.storeOrders.errorMessage,
            details: (state) => state.storeOrders.form.details,
        }),
        orderQuantity () {
            let quantity = 0
            this.details && this.details.map((item) => {
                quantity += item.quantity
            })
            return quantity
        },
        orderPrice () {
            let price = 0
            this.details && this.details.map((item) => {
                let quantity = item.quantity
                price += quantity * item.price
            })
            return price
        },
        orderPriceBeforeDiscount () {
            let price = 0
            this.details && this.details.map((item) => {
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
            return this.orderPriceBeforeDiscount - this.orderPrice
        },
        isThereDiscount () {
            let status = false
            this.details && this.details.map((item) => {
                if (item.is_discount) {
                    status = true 
                }
            })
            return status
        },
        isButtonEnable () {
            let status = false 
            if (!this.form.payment_id) {
                status = true 
            }
            if (!this.form.bills_price) {
                status = true 
            }
            if (this.form.change_price < 0) {
                status = true 
            }
            return status
        },
    }
}
</script>