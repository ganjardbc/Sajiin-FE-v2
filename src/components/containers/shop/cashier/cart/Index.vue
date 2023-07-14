<template>
    <div id="App">
        <AppSideForm 
            :title="'Carts'" 
            :enableCustomFooter="true"
            :onClose="onClose">
            <div slot="toolbar">
                <button 
                    class="btn btn-main-reverse with-border with-hover margin margin-right-10px"
                    :disabled="!isThereDetails"
                    @click="deleteAllProduct">
                    Clear Carts
                </button>
            </div>
            <div class="right-form-body">
                <div class="width width-100 padding padding-bottom-15px">
                    <AppEmpty v-if="!isThereDetails" />
                    <CardProduct :data.sync="details" />

                    <div class="padding padding-bottom-15px margin margin-bottom-30px border-bottom"></div>

                    <div class="card box-shadow bg-white">
                        <div class="field-group">
                            <div class="field-label">Name</div>
                            <el-input 
                                placeholder="Customer Name"
                                type="text"
                                :disabled="!isThereDetails"
                                v-model="form.customer_name"></el-input>
                        </div>

                        <div v-if="isThereDetails" class="field-group">
                            <div class="field-label">Table</div>
                            <Table class="margin margin-top-15px" />
                        </div>
                    </div>
                </div>
            </div>
            <div slot="footer">
                <div class="right-form-footer">
                    <div class="card bg-white box-shadow margin margin-bottom-20px">
                        <div class="display-flex space-between">
                            <div class="fonts fonts-10 semibold black">Total ({{ orderQuantity }} products)</div>
                            <div class="fonts fonts-10 semibold main-color">{{ format(orderPrice) }}</div>
                        </div>
                        <div v-if="isThereDiscount" class="display-flex space-between">
                            <div class="fonts fonts-10 normal black">Discount</div>
                            <div class="fonts fonts-10 normal black align-right">{{ format(totalDiscount) }}</div>
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
import { mapState, mapActions } from 'vuex'
import AppEmpty from '../../../../modules/AppEmpty'
import AppSideForm from '../../../../modules/AppSideForm'
import AppCardCollapse from '../../../../modules/AppCardCollapse'
import Table from '../table/Index'
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
        ...mapState({
            form: (state) => state.storeCashier.form.order,
            errorMessage: (state) => state.storeCashier.errorMessage,
            details: (state) => state.storeCashier.form.details,
            dataCurrent: (state) => state.storeCashBook.dataCurrent,
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
        getShopData () {
            return this.dataCurrent && this.dataCurrent.shop
        },
        getUserData () {
            return this.$cookies.get('user')
        },
    },
    methods: {
        ...mapActions({
            setOrder: 'storeCashier/setOrder',
            deleteAllProduct: 'storeCashier/deleteAllProduct'
        }),
        onCreateOrder () {
            const payload = {
                user: this.getUserData,
                shop: this.getShopData,
                total_item: this.orderQuantity,
                total_price: this.orderPrice
            }
            this.setOrder(payload)
            this.$emit('onCreateOrder')
        },
        onCheckOut () {
            const payload = {
                user: this.getUserData,
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