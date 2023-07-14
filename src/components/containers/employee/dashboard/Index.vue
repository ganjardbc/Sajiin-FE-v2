<template>
    <div id="App">
        <div class="card-dashboard-container">
            <div style="padding-bottom: 15px;">
                <h1 class="fonts big black bold">Dashboard</h1>
            </div>
        </div>

        <div class="padding padding-bottom-15px">
            <div class="display-flex display-mobile space-between">
                <div class="width width-row-5">
                    <AppCardDashboard height="180px" innerHeight="calc(100% - 20px)">
                        <div class="post-top display-flex column center align-center">
                            <div class="fonts fonts-32 teal semibold">{{ matrix ? matrix.allOrder : 0 }}</div>
                            <div class="fonts fonts-10 grey">All Orders</div>
                        </div>
                    </AppCardDashboard>
                </div>
                <div class="width width-row-5">
                    <AppCardDashboard height="180px" innerHeight="calc(100% - 20px)">
                        <div class="post-top display-flex column center align-center">
                            <div class="fonts fonts-32 teal semibold">{{ matrix ? matrix.newOrder : 0 }}</div>
                            <div class="fonts fonts-10 grey">New Orders</div>
                        </div>
                    </AppCardDashboard>
                </div>
                <div class="width width-row-5">
                    <AppCardDashboard height="180px" innerHeight="calc(100% - 20px)">
                        <div class="post-top display-flex column center align-center">
                            <div class="fonts fonts-32 teal semibold">{{ matrix ? matrix.onProgress : 0 }}</div>
                            <div class="fonts fonts-10 grey">On Progress Orders</div>
                        </div>
                    </AppCardDashboard>
                </div>
                <div class="width width-row-5">
                    <AppCardDashboard height="180px" innerHeight="calc(100% - 20px)">
                        <div class="post-top display-flex column center align-center">
                            <div class="fonts fonts-32 teal semibold">{{ matrix ? matrix.done : 0 }}</div>
                            <div class="fonts fonts-10 grey">Done Orders</div>
                        </div>
                    </AppCardDashboard>
                </div>
                <div class="width width-row-5">
                    <AppCardDashboard height="180px" innerHeight="calc(100% - 20px)">
                        <div class="post-top display-flex column center align-center">
                            <div class="fonts fonts-32 teal semibold">{{ matrix ? matrix.canceled : 0 }}</div>
                            <div class="fonts fonts-10 grey">Canceled Orders</div>
                        </div>
                    </AppCardDashboard>
                </div>
            </div>
        </div>

        <div class="display-flex display-mobile space-between">
            <div class="display-flex display-mobile" style="width: 100%;">
                <AppCardDashboard title="Last 30 Day's Orders" height="600px">
                    <apexchart width="98%" height="98%" type="line" :options="options" :series="series"></apexchart>
                </AppCardDashboard>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'
import AppCardDashboard from '../../../modules/AppCardDashboard'

export default {
    name: 'App',
    metaInfo: {
        title: 'Employee',
        titleTemplate: '%s | Dashboard',
        htmlAttrs: {
            lang: 'en',
            amp: true
        }
    },
    mounted () {
        this.getDashboardMatrix()
        this.getDashboard()
    },
    components: {
        AppCardDashboard
    },
    computed: {
        ...mapState(({
            loading: (state) => state.storeDashboard.loading,
            options: (state) => state.storeDashboard.options,
            series: (state) => state.storeDashboard.series,
            matrix: (state) => state.storeDashboard.matrix,
        })),
        shopId () {
            return this.$store.state.storeSelectedShop.selectedData
        }
    },
    watch: {
        shopId (prevProps, nextProps) {
            if (prevProps !== nextProps) {
                this.getDashboardMatrix()
                this.getDashboard()
            }
        }
    },
    methods: {
        ...mapActions({
            getData: 'storeDashboard/getData',
            getMatrix: 'storeDashboard/getMatrix',
        }),
        getDashboard () {
            const shop_id = this.shopId
            const payload = {
                token: this.$cookies.get('tokenBearer'),
                shop_id: shop_id,
            }
            this.getData(payload)
        },
        getDashboardMatrix () {
            const shop_id = this.shopId
            const payload = {
                token: this.$cookies.get('tokenBearer'),
                shop_id: shop_id,
            }
            this.getMatrix(payload)
        }
    }
}
</script>