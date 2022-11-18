<template>
    <div id="App">
        <div class="card-check-out-fixed">
            <div class="card small-padding box-shadow bg-white">
                <div class="display-flex align-center">
                    <div style="width: 50px;">
                        <div class="image image-40px bg-main">
                            <i class="post-top icn fa fa-lw fa-shopping-cart" style="color: #fff;"></i>
                        </div>
                    </div>
                    <div style="width: calc(100% - 90px);">
                        <div class="fonts fonts-10 black">Carts</div>
                        <div class="display-flex">
                            <span class="fonts fonts-10 semibold">{{ orderQuantity }} Products</span>
                            <span style="margin: 0 3px;">|</span>
                            <span class="fonts fonts-10 orange semibold">{{ format(orderPrice) }}</span>
                        </div>
                    </div>
                    <div style="width: 40px;">
                        <button class="btn btn-icon btn-white" @click="onClick">
                            <i class="fa fa-lw fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    name: 'App',
    computed: {
        ...mapState({
            form: (state) => state.storeCashier.form,
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
        }
    },
    methods: {
        onClick () {
            this.$emit('onClick')
        }
    }
}
</script>