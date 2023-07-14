<template>
    <div id="App">
        <AppSideForm 
            :title="'Detail Products'"
            :enableCustomFooter="true"
            :onClose="onClose">
            <div v-loading="loadingForm">
                <div 
                    v-if="selected && selected.order" 
                    class="card bg-white box-shadow margin margin-bottom-15px margin-top-15px">
                    <div class="post-top-right-absolute" style="top: 15px; right: 15px;">
                        <AppCardCapsule :data="selected.order.status" />
                    </div>
                    <div class="margin margin-bottom-15px">
                        <div class="fonts fonts-10 grey">Order ID</div>
                        <div class="fonts fonts-10 semibold black">{{ selected.order.order_id || '-' }}</div>
                    </div>
                    <div class="margin margin-bottom-15px">
                        <div class="fonts fonts-10 grey">Customer</div>
                        <div class="fonts fonts-10 semibold black">{{ selected.order.customer_name || '-' }}</div>
                    </div>
                    <div class="margin margin-bottom-15px">
                        <div class="fonts fonts-10 grey">Table</div>
                        <div class="fonts fonts-10 semibold black">{{ selected.order.table_name || '-' }}</div>
                    </div>
                    <div class="margin margin-bottom-15px">
                        <div class="fonts fonts-10 grey">Cashier</div>
                        <div class="fonts fonts-10 semibold black">{{ selected.order.cashier_name || '-' }}</div>
                    </div>
                </div>

                <div 
                    v-if="selected && selected.order && selected.details" 
                    class="card bg-white box-shadow margin margin-bottom-15px margin-top-15px">
                    <div class="display-flex space-between align-center">
                        <div class="fonts fonts-11 semibold black">Products</div>
                        <AppCardProgressProduct :data="selected.details" />
                    </div>
                    <div v-for="(detail, j) in selected.details" :key="j" style="margin: 15px 0;">
                        <div class="card bg-white border border-full">
                            <div class="display-flex space-between margin margin-bottom-15px">
                                <div class="width width-45px margin margin-right-15px">
                                    <div class="image image-padding border-full">
                                        <img 
                                            v-if="detail.product_image" 
                                            :src="productImageThumbnailUrl + detail.product_image" 
                                            alt="" 
                                            class="post-center">
                                        <i v-else class="post-middle-absolute icn fa fa-lg fa-image"></i>
                                    </div>
                                </div>
                                <div style="width: calc(100% - 160px);">
                                    <div class="fonts fonts-11 semibold">{{ detail.product_name }}</div>
                                    <div class="fonts fonts-10 normal grey">{{ detail.quantity }} x {{ detail.product_detail }}</div>
                                    <div v-if="detail.note" class="fonts fonts-10 normal grey">{{ detail.note }}</div>
                                </div>
                                <div class="width width-100px display-flex flex-end">
                                    <AppCardCapsule :data="detail.status" />
                                </div>
                            </div>
                            <div class="padding padding-15px bg-white-grey border-radius">
                                <div v-if="detail.employee" class="margin margin-bottom-15px">
                                    <div class="display-flex space-between margin margin-bottom-15px">
                                        <div class="width width-35px margin margin-right-15px">
                                            <div class="image image-padding image-circle border-full">
                                                <img 
                                                    v-if="detail.employee.image" 
                                                    :src="employeeImageThumbnailUrl + detail.employee.image" 
                                                    alt="" 
                                                    class="post-center">
                                                <i v-else class="post-middle-absolute icn fa fa-lg fa-image"></i>
                                            </div>
                                        </div>
                                        <div style="width: calc(100% - 50px);">
                                            <div class="fonts fonts-11 semibold">{{ detail.employee.name }}</div>
                                            <div class="fonts fonts-9 grey">{{ detail.employee.employee_id }}</div>
                                            <div class="fonts fonts-9 grey">{{ detail.employee.updated_at | moment("DD/MM/YYYY hh:mm") }}</div>
                                        </div>
                                    </div>
                                </div>
                                <button 
                                    v-if="detail.status === 'to-do'" 
                                    class="btn btn-sekunder btn-full"
                                    @click="onChangeStatatus(detail, 'on-progress')">Pick Item</button>
                                <button 
                                    v-if="detail.status === 'on-progress'" 
                                    class="btn btn-green btn-full"
                                    @click="onChangeStatatus(detail, 'done')">Mark as Done</button>
                                <button 
                                    v-if="detail.status === 'done'" 
                                    class="btn btn-main-reverse with-border with-hover btn-full"
                                    @click="onChangeStatatus(detail, 'to-do')">Re-Open</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppSideForm>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import AppTabs from '../../../modules/AppTabs'
import AppEmpty from '../../../modules/AppEmpty'
import AppSideForm from '../../../modules/AppSideForm'
import AppCardCapsule from '../../../modules/AppCardCapsule'
import AppCardProgressProduct from '../../../modules/AppCardProgressProduct'

const tabs = [
    {id: 1, label: 'All', status: 'active'},
    {id: 2, label: 'To Do', status: ''},
    {id: 3, label: 'On Progress', status: ''},
    {id: 4, label: 'Done', status: ''},
]

export default {
    name: 'App',
    data () {
        return {
            tabs: tabs,
            selectedIndex: 0,
        }
    },
    components: {
        AppTabs,
        AppEmpty,
        AppSideForm,
        AppCardCapsule,
        AppCardProgressProduct
    },
    computed: {
        ...mapState({
            selected: (state) => state.storeTaskLists.selected,
            loadingForm: (state) => state.storeTaskLists.loadingForm,
        }),
        dataUser () {
            return this.$cookies.get('user')
        },
    },
    methods: {
        onClose () {
            this.$emit('onClose')
        },
        onChangeTabs (data) {
            this.selectedIndex = data 
        },
        onChangeStatatus (data, status) {
            const user_id = this.dataUser.id 
            let payload = {
                ...data, 
                status: status,
                assigned_id: user_id
            }
            this.$emit('onChangeStatatus', payload)
        },
    }
}
</script>