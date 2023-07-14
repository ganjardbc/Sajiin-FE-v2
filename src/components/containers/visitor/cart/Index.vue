<template>
    <div id="App">
        <AppMobileLayout title="Carts">
            <div slot="right-button">
                <button 
                    class="btn btn-main-reverse with-hover btn-small-radius"
                    @click="deleteAllProduct">
                    Clear All
                </button>
            </div>

            <AppEmpty v-if="data.length === 0" />

            <div 
                v-if="data" 
                class="padding padding-10px" 
                style="padding-top: 0; padding-bottom: 130px;">
                <Card :data.sync="data" />
            </div>

            <div class="navbar-bottom">
                <div class="navbar-bottom-content padding padding-10px">
                    <div class="card bg-white box-shadow margin margin-bottom-20px">
                        <div class="display-flex space-between">
                            <div class="fonts fonts-10 semibold black">Total ({{ orderQuantity }} products)</div>
                            <div class="fonts fonts-10 semibold main-color align-right">{{ format(orderSubtotal) }}</div>
                        </div>
                        <div v-if="isThereDiscount" class="display-flex space-between">
                            <div class="fonts fonts-10 normal black">Discount</div>
                            <div class="fonts fonts-10 normal black align-right">{{ format(totalDiscount) }}</div>
                        </div>
                    </div>
                    <button 
                        class="btn btn-full btn-main" 
                        :disabled="!enableButtonCheckout"
                        @click="onCheckOut">
                        Check Out
                    </button>
                </div>
            </div>
        </AppMobileLayout>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import AppMobileLayout from '../../../modules/AppMobileLayout'
import AppLoader from '../../../modules/AppLoader'
import AppEmpty from '../../../modules/AppEmpty'
import Card from './Card'

export default {
    name: 'App',
    metaInfo: {
        title: 'Visitor',
        titleTemplate: '%s | Carts',
        htmlAttrs: {
            lang: 'en',
            amp: true
        }
    },
    components: {
        AppMobileLayout,
        AppLoader,
        AppEmpty,
        Card,
    },
    computed: {
        ...mapState({
            data: (state) => state.storeVisitorOrder.form.details,
            dataShop: (state) => state.storeVisitorShop.data,
        }),
        enableButtonCheckout () {
            return this.data && this.data.length > 0
        },
        orderQuantity () {
            let quantity = 0
            this.data && this.data.map((item) => {
                quantity += item.quantity
            })
            return quantity
        },
        orderSubtotal () {
            let subtotal = 0
            this.data && this.data.map((item) => {
                subtotal += item.subtotal
            })
            return subtotal
        },
        orderPriceBeforeDiscount () {
            let price = 0
            this.data && this.data.map((item) => {
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
            this.data && this.data.map((item) => {
                if (item.is_discount) {
                    status = true 
                }
            })
            return status
        },
    },
    methods: {
        ...mapActions({
            deleteAllProduct: 'storeVisitorOrder/deleteAllProduct'
        }),
        onCheckOut () {
            this.$router.push({name: 'visitor-checkout'})
        }
    }
}
</script>