<template>
    <div id="App">
        <div class="card-dashboard-container">
            <div style="padding-bottom: 15px;">
                <h1 class="fonts big black bold">Dashboard</h1>
            </div>
        </div>

        <div class="padding padding-bottom-15px">
            <div class="display-flex display-mobile space-between">
                <div class="width width-row-4">
                    <AppCardDashboard height="180px">
                        <div class="post-top display-flex column center align-center">
                            <div class="padding padding-top-30px"></div>
                            <div class="fonts fonts-32 teal semibold">{{ matrix ? (matrix.confirmed + matrix.unconfirmed) : 0 }}</div>
                            <div class="fonts fonts-10 grey">New Orders</div>
                        </div>
                    </AppCardDashboard>
                </div>
                <div class="width width-row-4">
                    <AppCardDashboard height="180px">
                        <div class="post-top display-flex column center align-center">
                            <div class="padding padding-top-30px"></div>
                            <div class="fonts fonts-32 teal semibold">{{ matrix ? matrix.cooking : 0 }}</div>
                            <div class="fonts fonts-10 grey">Progress Orders</div>
                        </div>
                    </AppCardDashboard>
                </div>
                <div class="width width-row-4">
                    <AppCardDashboard height="180px">
                        <div class="post-top display-flex column center align-center">
                            <div class="padding padding-top-30px"></div>
                            <div class="fonts fonts-32 teal semibold">{{ matrix ? matrix.done : 0 }}</div>
                            <div class="fonts fonts-10 grey">Done Orders</div>
                        </div>
                    </AppCardDashboard>
                </div>
                <div class="width width-row-4">
                    <AppCardDashboard height="180px">
                        <div class="post-top display-flex column center align-center">
                            <div class="padding padding-top-30px"></div>
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
        }))
    },
    methods: {
        ...mapActions({
            getData: 'storeDashboard/getData',
            getMatrix: 'storeDashboard/getMatrix',
        }),
        getDashboard () {
            const shop = this.$session.get('shop')
            const payload = {
                token: this.$session.get('tokenBearer'),
                shop_id: shop.id,
            }
            this.getData(payload)
        },
        getDashboardMatrix () {
            const shop = this.$session.get('shop')
            const payload = {
                token: this.$session.get('tokenBearer'),
                shop_id: shop.id,
            }
            this.getMatrix(payload)
        }
    }
}
</script>