<template>
    <div id="App">
        <div class="card no-padding bg-white border-full" style="cursor: pointer;" @click="onOpen">
            <div class="display-flex space-between align-center" style="padding: 10px 15px;">
                <div v-if="selectedData" class="display-flex align-center" style="width: calc(100% - 40px);">
                    <div style="width: 45px; margin-right: 15px">
                        <div class="image image-padding border-full">
                            <img v-if="selectedData.image" :src="selectedData ? (paymentImageThumbnailUrl + selectedData.image) : ''" alt="" class="post-center">
                            <i v-else class="post-middle-absolute icn fa fa-lg fa-image"></i>
                        </div>
                    </div>
                    <div style="width: calc(100% - 60px);">
                        <div style="width: 100%;">
                            <div class="fonts fonts-10 semibold black">
                                {{ selectedData && selectedData.name }}
                            </div>
                            <div class="fonts fonts-10 grey">
                                {{ selectedData && selectedData.description }}
                            </div>
                        </div>
                    </div>
                </div>
                <div v-else class="fonts fonts-10 normal grey">
                    Choose Payment 
                </div>
                <button class="btn btn-white btn-small-icon" @click="onOpen">
                    <i class="fa fa-lw fa-chevron-right"></i>
                </button>
            </div>
        </div>

        <AppCardPopup 
            v-if="visiblePopup" 
            title="Choose Payment" 
            @onClose="onClose">
            <div class="width width-100">
                <div class="width width-100 display-flex space-between">
                    <div style="width: calc(100% - 50px);">
                        <SearchField 
                            :placeholder="'Search payments ..'" 
                            :enableResponsive="true" 
                            :onChange="(data) => onSearch(data)" />
                    </div>
                    <button 
                        class="btn btn-icon btn-white" 
                        @click="onRefresh">
                        <i class="fa fa-lw fa-retweet"></i>
                    </button>
                </div>
                <div v-loading="loading" class="width width-100">
                    <AppEmpty v-if="data.length === 0" />
                    <div v-for="(dt, i) in data" :key="i" class="margin margin-top-15px margin-bottom-15px">
                        <div class="card no-padding border-full">
                            <div class="padding padding-15px display-flex space-between align-center">
                                <div class="width width-60px">
                                    <div class="image image-45px">
                                        <img v-if="dt.image" :src="paymentImageThumbnailUrl + dt.image" alt="" class="post-center">
                                        <i v-else class="post-middle-absolute icn fa fa-lg fa-image"></i>
                                    </div>
                                </div>
                                <div style="width: calc(100% - 100px);">
                                    <div class="fonts fonts-10 semibold">{{ dt.name }}</div>
                                    <div class="fonts fonts-9 grey">{{ dt.description }}</div>
                                </div>
                                <div class="width width-40px">
                                    <button 
                                        :class="`btn btn-icon ${selectedID === dt.id ? 'btn-main' : 'btn-sekunder'}`" 
                                        @click="onChange(dt)">
                                        <i class="fa fa-lw fa-check"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="width width-100 display-flex flex-end align-center">
                    <div class="fonts fonts-10 normal black">Total {{ totalRecord }}</div>
                    <el-pagination
                        background
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size="limit"
                        :pager-count="5"
                        layout="prev, pager, next"
                        :total="totalRecord">
                    </el-pagination>
                </div>
            </div>
        </AppCardPopup>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'
import SearchField from '../../../../modules/SearchField'
import AppEmpty from '../../../../modules/AppEmpty'
import AppCardPopup from '../../../../modules/AppCardPopup'

export default {
    name: 'App',
    data () {
        return {
            visiblePopup: false,
            currentPage: 1
        }
    },
    mounted () {
        this.getDataPayment()
    },
    components: {
        SearchField,
        AppEmpty,
        AppCardPopup
    },
    computed: {
        ...mapState({
            data: (state) => state.storeCashierPayment.data,
            totalRecord: (state) => state.storeCashierPayment.totalRecord,
            limit: (state) => state.storeCashierPayment.limit,
            filter: (state) => state.storeCashierPayment.filter,
            loading: (state) => state.storeCashierPayment.loading,
            form: (state) => state.storeOrders.form,
        }),
        shopId () {
            return this.$store.state.storeSelectedShop.selectedData
        },
        selectedID () {
            return this.form.payment_id
        },
        selectedData () {
            return this.form.payment
        }
    },
    watch: {
        shopId (prevProps, nextProps) {
            if (prevProps !== nextProps) {
                this.getDataPayment()
            }
        }
    },
    methods: {
        ...mapActions({
            getData: 'storeCashierPayment/getData',
            resetFilter: 'storeCashierPayment/resetFilter',
            setPagination: 'storeCashierPayment/setPagination',
        }),
        onClose () {
            this.visiblePopup = false 
        },
        onOpen () {
            this.visiblePopup = true 
        },
        onChange (data) {
            this.form.payment_id = data.id 
            this.form.payment_name = data.name 
            this.form.payment = data 
            this.visiblePopup = false 
        },
        onRefresh () {
            this.getDataPayment()
        },
        onSearch (data) {
            this.filter.search = data 
            this.resetFilter()
            this.getDataPayment()
        },
        handleCurrentChange (value) {
            this.setPagination(value)
            this.getDataPayment()
        },

        // LIST DATA
        getDataPayment () {
            const token = this.$cookies.get('tokenBearer')
            const shop_id = this.shopId
            this.getData({ token, shop_id })
        },
    }
}
</script>