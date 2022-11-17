<template>
    <div id="App">
        <AppSideForm 
            :title="'Carts'" 
            :enableCustomFooter="true"
            :onClose="onClose">
            <div slot="toolbar">
                <button 
                    class="btn btn-small btn-main-reverse with-border with-hover margin margin-right-10px"
                    :disabled="!isThereDetails"
                    @click="deleteAllProduct">
                    Clear Carts
                </button>
            </div>
            <div class="right-form-body">
                <div class="width width-100">
                    <AppEmpty v-if="!isThereDetails" />
                    <CardProduct :data.sync="details" />
                </div>
            </div>
            <div slot="footer">
                <div class="right-form-footer">
                    <div class="card bg-white box-shadow margin margin-bottom-20px">
                        <AppCardCollapse :title="`Customer ${form.customer_name ? ' : ' + form.customer_name : ''}`">
                            <div class="field-group">
                                <el-input 
                                    placeholder="Customer name"
                                    type="text"
                                    :disabled="!isThereDetails"
                                    v-model="form.customer_name"></el-input>
                                <Table v-if="isThereDetails" class="margin margin-top-15px" />
                            </div>
                        </AppCardCollapse>
                        <div class="padding padding-bottom-15px margin margin-bottom-15px border-bottom"></div>
                        <div class="display-flex space-between">
                            <div class="fonts fonts-10 semibold black">Total ({{ orderQuantity }} products)</div>
                            <div class="fonts fonts-10 semibold orange">{{ format(orderPrice) }}</div>
                        </div>
                    </div>

                    <div class="width width-100 display-flex">
                        <button 
                            class="btn btn-main btn-full"
                            :disabled="isButtonEnable"
                            @click="onCreateOrder">
                            Create Order 
                        </button>
                        <div class="width width-20px"></div>
                        <button 
                            class="btn btn-sekunder btn-full"
                            :disabled="isButtonEnable"
                            @click="onCheckOut">
                            Continue to Payment
                        </button>
                    </div>
                </div>
            </div>
        </AppSideForm>
    </div>
</template>
<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import AppEmpty from '../../../../modules/AppEmpty'
import AppSideForm from '../../../../modules/AppSideForm'
import AppCardCollapse from '../../../../modules/AppCardCollapse'
import Table from '../table'
import CardProduct from './CardProduct'

export default {
    name: 'App',
    components: {
        AppEmpty,
        AppSideForm,
        AppCardCollapse,
        Table,
        CardProduct
    },
    computed: {
        ...mapGetters({
            getShopData: 'storeSelectedShop/getSelectedData'
        }),
        ...mapState({
            form: (state) => state.storeCashier.form.order,
            errorMessage: (state) => state.storeCashier.errorMessage,
            details: (state) => state.storeCashier.form.details 
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
        isThereDetails () {
            return this.details.length > 0
        },
        isButtonEnable () {
            let status = false 
            if (this.details.length === 0) {
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
            deleteAllProduct: 'storeCashier/deleteAllProduct'
        }),
        onCreateOrder () {
            const payload = {
                shop: this.getShopData,
                total_item: this.orderQuantity,
                total_price: this.orderPrice
            }
            this.setOrder(payload)
            this.$emit('onCreateOrder')
        },
        onCheckOut () {
            const payload = {
                shop: this.getShopData,
                total_item: this.orderQuantity,
                total_price: this.orderPrice
            }
            this.setOrder(payload)
            this.$emit('onCheckOut')
        },
        onClose () {
            this.$emit('onClose')
        }
    }
}
</script>