<template>
    <div id="App">
        <div :class="`content-form ${!visibleForm && 'hide'}`">
            <div class="left padding padding-bottom-50px">
                <Product />
            </div>
            <div class="right">
                <Cart @onClose="onCloseCart" />
            </div>
        </div>

        <CartPopup @onClick="onOpenCart" />

        <!-- <div class="left-form">
            <Product />
        </div>

        <div class="right-form bg-white border border-left">
            <Cart />
        </div> -->
    </div>
</template>
<script>
import Product from './product'
import Cart from './cart'
import CartPopup from './cart/CartPopup'

export default {
    name: 'App',
    data () {
        return {
            visibleForm: false,
        }
    },
    components: {
        Product,
        Cart,
        CartPopup,
    },
    methods: {
        onOpenCart () {
            this.visibleForm = true
        },
        onCloseCart () {
            this.visibleForm = false
        },
    }
}
</script>