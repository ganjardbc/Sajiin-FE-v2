<template>
    <div id="App">
        <AppSideForm 
            :title="title" 
            :enableCustomFooter="true"
            :onClose="onClose">
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
                <div class="fonts fonts-11 semibold black padding padding-bottom-5px">
                    Table
                </div>
                <div>
                    <Table />
                </div>
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
                    <div class="fonts fonts-10 normal grey">{{ format(orderPrice) }}</div>
                </div>
                <div class="display-flex space-between">
                    <div class="fonts fonts-10 normal grey">Discount</div>
                    <div class="fonts fonts-10 normal grey">{{ format(0) }}</div>
                </div>
                <div class="padding padding-bottom-15px margin margin-bottom-15px border-bottom"></div>
                <div class="display-flex space-between">
                    <div class="fonts fonts-10 semibold black">Total</div>
                    <div class="fonts fonts-10 semibold orange">{{ format(orderPrice) }}</div>
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
                    <div class="fonts fonts-10 semibold black">Change</div>
                    <div class="fonts fonts-10 semibold orange">{{ format(form.change_price) }}</div>
                </div>
            </div>

            <div slot="footer">
                <div class="right-form-footer">
                    <div class="field-group" style="padding-top: 0;">
                        <div class="field-label">Order Status</div>
                        <div class="display-flex space-between">
                            <div class="fonts micro black">Make this order status as "Done" ?</div>
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
                        Create Order
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
        isButtonEnable () {
            let status = false 
            if (!this.form.payment_id) {
                status = true 
            }
            if (!this.form.table_id) {
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