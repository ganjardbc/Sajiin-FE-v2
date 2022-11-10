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
                    Delete All
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
                    <div class="card bg-white box-shadow">
                        <div class="display-flex space-between">
                            <div class="fonts fonts-11 normal grey">Quantity</div>
                            <div class="fonts fonts-11 semibold black">{{ orderQuantity }} products</div>
                        </div>
                        <div class="display-flex space-between">
                            <div class="fonts fonts-11 normal grey">Total Price</div>
                            <div class="fonts fonts-11 semibold orange">Rp. {{ orderPrice }}</div>
                        </div>
                    </div>

                    <div class="width width-100 margin margin-top-15px">
                        <button 
                            class="btn btn-main btn-full"
                            :disabled="!isThereDetails"
                            @click="onCheckOut">
                            Check Out
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
import CardProduct from './CardProduct'

export default {
    name: 'App',
    components: {
        AppEmpty,
        AppSideForm,
        CardProduct
    },
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
        ...mapActions({
            deleteAllProduct: 'storeCashier/deleteAllProduct'
        }),
        onCheckOut () {
            console.log('onCheckOut', this.form)
        },
        onSave () {
            console.log('onSave')
        },
        onClose () {
            this.$emit('onClose')
        }
    }
}
</script>