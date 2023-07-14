<template>
    <div id="App">
        <AppSideForm 
            :title="'Edit Customer'" 
            :subtitle="form.order_id"
            :enableCustomFooter="true"
            :onClose="onClose">
            <div class="card bg-white box-shadow margin margin-bottom-15px margin-top-15px">
                <div class="field-group">
                    <div class="field-label">Name</div>
                    <el-input 
                        placeholder="Customer Name"
                        type="text"
                        v-model="form.customer_name"></el-input>
                </div>

                <div class="field-group">
                    <div class="field-label">Table</div>
                    <Table class="margin margin-top-15px" />
                </div>
            </div>

            <div slot="footer">
                <button 
                    class="btn btn-main btn-full"
                    @click="onSave">
                    Save Customer
                </button>
            </div>
        </AppSideForm>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import AppSideForm from '../../../../modules/AppSideForm'
import AppCardCapsule from '../../../../modules/AppCardCapsule'
import AppEmpty from '../../../../modules/AppEmpty'
import Table from '../table/Index'

export default {
    name: 'App',
    data () {
        return {
            visibleAddProduct: false 
        }
    },
    mounted () {
        this.selectedIndex = 0
    },
    watch: {
        formId () {
            this.selectedIndex = 0
        }
    },
    computed: {
        ...mapState({
            form: (state) => state.storeOrders.form,
            errorMessage: (state) => state.storeOrders.errorMessage,
            typeForm: (state) => state.storeOrders.typeForm,
            category: (state) => state.storeCategory.data,
        }),
        formId: {
            get () {
                return this.$store.state.storeOrders.form.id
            },
            set (value) {
                this.$store.state.storeOrders.form.id = value
            }
        },
    },
    components: {
        AppCardCapsule,
        AppSideForm,
        AppEmpty,
        Table,
    },
    methods: {
        isActiveOrder (data) {
            let status = false
            if (data.status === 'new-order') status = true 
            if (data.status === 'on-progress') status = true 
            return status
        },
        onSave () {
            this.$emit('onSave')
        },
        onClose () {
            this.$emit('onClose')
        },
    },
}
</script>