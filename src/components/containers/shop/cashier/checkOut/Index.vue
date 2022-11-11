<template>
    <div id="App">
        <AppSideForm 
            :title="'Check Out'" 
            :enableCustomFooter="true"
            :onClose="onClose">
            <div class="right-form-body">
                <div class="card bg-white box-shadow margin margin-bottom-15px margin-top-15px">
                    <div class="fonts fonts-11 semibold black">
                        Customer
                    </div>
                    <div class="field-group">
                        <div class="field-label">Customer Name</div>
                        <el-input 
                            placeholder=""
                            type="text"
                            v-model="form.customer_name"></el-input>
                        <div 
                            v-if="errorMessage.customer_name" 
                            class="field-error">
                            {{ errorMessage.customer_name && errorMessage.customer_name[0] }}
                        </div>
                    </div>
                    <div class="field-group">
                        <div class="field-label">Note (optional)</div>
                        <el-input 
                            placeholder=""
                            type="textarea"
                            v-model="form.note"
                            :autosize="{ minRows: 2, maxRows: 2}"></el-input>
                        <div 
                            v-if="errorMessage.note" 
                            class="field-error">
                            {{ errorMessage.note && errorMessage.note[0] }}
                        </div>
                    </div>
                </div>
                <div class="card bg-white box-shadow margin margin-bottom-15px margin-top-15px">
                    <div class="fonts fonts-11 semibold black padding padding-bottom-10px">
                        Table
                    </div>
                    <Table />
                </div>
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
                        <div class="fonts fonts-10 normal grey">Subtotal ({{ orderQuantity }} products)</div>
                        <div class="fonts fonts-10 normal grey">Rp. {{ orderPrice }}</div>
                    </div>
                    <div class="display-flex space-between">
                        <div class="fonts fonts-10 normal grey">Discount</div>
                        <div class="fonts fonts-10 normal grey">Rp. 0</div>
                    </div>
                    <div class="padding padding-bottom-15px margin margin-bottom-15px border-bottom"></div>
                    <div class="display-flex space-between">
                        <div class="fonts fonts-11 semibold black">Total</div>
                        <div class="fonts fonts-11 semibold orange">Rp. {{ orderPrice }}</div>
                    </div>
                </div>
                <div class="card bg-white box-shadow margin margin-bottom-15px margin-top-15px">
                    <div class="fonts fonts-11 semibold black">
                        Bills
                    </div>
                    <div class="field-group">
                        <div class="field-label">Bills Price</div>
                        <el-input 
                            placeholder="0"
                            type="number"
                            clearable
                            @change="onChangeBills"
                            v-model="form.bills_price"></el-input>
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
                        <div class="fonts fonts-11 semibold black">Change</div>
                        <div class="fonts fonts-11 semibold orange">Rp. {{ form.change_price }}</div>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <div class="right-form-footer">
                    <button 
                        class="btn btn-main btn-full"
                        :disabled="isButtonEnable"
                        @click="onCreateOrder">
                        Create Order
                    </button>
                </div>
            </div>
        </AppSideForm>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import AppEmpty from '../../../../modules/AppEmpty'
import AppSideForm from '../../../../modules/AppSideForm'
import AppCardCapsule from '../../../../modules/AppCardCapsule'
import AppCardPriceSuggestion from '../../../../modules/AppCardPriceSuggestion'
import CardProduct from './CardProduct'
import Payment from '../payment'
import Table from '../table'

export default {
    name: 'App',
    components: {
        AppEmpty,
        AppSideForm,
        AppCardCapsule,
        AppCardPriceSuggestion,
        CardProduct,
        Payment,
        Table
    },
    computed: {
        ...mapState({
            form: (state) => state.storeCashier.form.order,
            details: (state) => state.storeCashier.form.details ,
            errorMessage: (state) => state.storeCashier.errorMessage
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
        isButtonEnable () {
            let status = false 
            if (!this.details) {
                status = true 
            }
            if (!this.form.customer_name) {
                status = true 
            }
            return status
        },
    },
    methods: {
        ...mapActions({
            setOrder: 'storeCashier/setOrder',
            setOrderBills: 'storeCashier/setOrderBills'
        }),
        onCreateOrder () {
            this.$emit('onCreateOrder')
        },
        onClose () {
            this.$emit('onClose')
        },
        onChangeBiilsSuggestion (data) {
            this.form.bills_price = data 
            this.setOrderBills(data)
        },
        onChangeBills (data) {
            this.form.bills_price = data 
            this.setOrderBills(data)
        }
    }
}
</script>