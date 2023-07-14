<template>
    <div id="App" style="position: fixed; bottom: 10px; right: 0; width: 100%; display: flex; justify-content: center; z-index: 100;">
        <router-link :to="{name: 'visitor-carts'}">
            <button class="btn btn-main-reverse with-border btn-radius-rounded box-shadow" style="display: flex; align-items: center; padding-top: 15px; padding-bottom: 15px;">
                <i class="icn icn-left fa fa-lg fa-shopping-cart"></i>
                <div class="fonts fonts-11 main-color semibold" style="line-height: 0;">{{ orderQuantity }} products | {{ format(orderSubtotal) }}</div>
            </button>
        </router-link>
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'App',
    computed: {
        ...mapState({
            data: (state) => state.storeVisitorOrder.form.details,
            dataShop: (state) => state.storeVisitorShop.data,
        }),
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
    },
}
</script>