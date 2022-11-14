<template>
    <div id="App">
        <div class="cashier-container">
            <Product />
        </div>

        <div :class="`content-form ${!visibleCart && 'hide'}`">
            <div class="right">
                <Cart 
                    @onCreateOrder="onCreateOrder"
                    @onCheckOut="onOpenCheckOut"
                    @onClose="onCloseCart" />
            </div>
        </div>

        <div :class="`content-form ${!visibleCheckOut && 'hide'}`">
            <div class="right">
                <CheckOut 
                    @onCreateOrder="onCreateOrder"
                    @onClose="onCloseCheckOut" />
            </div>
        </div>

        <CartPopup @onClick="onOpenCart" />

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

        <!-- <div class="left-form">
            <Product />
        </div>

        <div class="right-form bg-white border border-left">
            <Cart />
        </div> -->
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import AppPopupLoader from '../../../modules/AppPopupLoader'
import AppPopupConfirmed from '../../../modules/AppPopupConfirmed'
import AppPopupAlert from '../../../modules/AppPopupAlert'
import Product from './product'
import Cart from './cart'
import CartPopup from './cart/CartPopup'
import CheckOut from './checkOut'

export default {
    name: 'App',
    data () {
        return {
            typeForm: 'carts',
            visibleForm: false,
            visibleCart: false,
            visibleCheckOut: false,
            visibleAlert: false,
            titleAlert: 'Failed to preceed data',
            iconAlert: 'fa fa-4x fa-info-circle',
            visibleConfirmed: false,
            visibleConfirmedDelete: false,
            titleConfirmed: 'Create this order ?',
        }
    },
    mounted () {
        this.resetOrder()
    },
    watch: {
        shopId (prevProps, nextProps) {
            if (prevProps !== nextProps) {
                this.resetOrder()
            }
        }
    },
    components: {
        AppPopupLoader,
        AppPopupConfirmed,
        AppPopupAlert,
        Product,
        Cart,
        CartPopup,
        CheckOut,
    },
    computed: {
        ...mapState({
            form: (state) => state.storeCashier.form,
            loading: (state) => state.storeCashier.loading
        }),
        shopId () {
            return this.$store.state.storeSelectedShop.selectedData
        },
    },
    methods: {
        ...mapActions({
            resetOrder: 'storeCashier/resetOrder',
            createOrder: 'storeCashier/createOrder'
        }),
        onOpenCart () {
            this.visibleCart = true
        },
        onCloseCart () {
            this.visibleCart = false
        },
        onOpenCheckOut () {
            this.visibleCheckOut = true
        },
        onCloseCheckOut () {
            this.visibleCheckOut = false 
        },
        onCreateOrder () {
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
            const token = this.$session.get('tokenBearer')
            this.createOrder({
                ...this.form,
                token: token
            }).then((res) => {
                const status = res.data.status 
                if (status === 'ok') {
                    this.onCloseCart()
                    this.onCloseCheckOut()
                    this.resetOrder()
                    this.$message(`Success create new order.`);
                } else {
                    this.visibleAlert = true 
                    this.titleAlert = 'Failed to create this order'
                }
            })
        }
    }
}
</script>