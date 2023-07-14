<template>
    <div id="CashierCashBookNotif">
        <el-popover
            :disabled="openedCashBook && openedCashBook.length === 0"
            placement="bottom-end"
            width="310"
            trigger="click">
            <div class="width width-100">
                <div class="width width-100 change-scrollbar" style="max-height: 300px;">
                    <el-alert
                        title="Please Close The Cash Book !"
                        description="It's look like there are still opened cash book."
                        type="error"
                        :closable="false"
                        :show-icon="false"
                        style="margin: 15px 0;">
                    </el-alert>
                    <div 
                        v-for="(dt, i) in openedCashBook" 
                        :key="i" 
                        style="margin: 15px 2px;">
                        <div class="card bg-white border-full" style="cursor: pointer;" @click="onRoute(dt)">
                            <div class="display-flex space-between">
                                <div class="">
                                    <div class="fonts fonts-10 semibold black margin margin-right-5px">
                                        {{ dt.cash_date | moment("DD MMMM YYYY") }}
                                    </div>
                                    <div class="fonts fonts-8 normal grey">
                                        {{ dt.cashbook_id }}
                                    </div>
                                </div>
                                <AppCardCapsule :data="dt.cash_status" />
                            </div>
                            <div class="display-flex space-between align-center"></div>
                        </div>
                    </div>
                </div>
            </div>
            <button 
                slot="reference"
                :disabled="openedCashBook && openedCashBook.length === 0"
                class="btn btn-icon btn-small-radius btn-sekunder margin margin-left-10px">
                <i class="fa fa-lg fa-info fonts orange"></i>
                <span v-if="openedCashBook && openedCashBook.length > 0" class="notif">{{ openedCashBook && openedCashBook.length }}</span>
            </button>
        </el-popover>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import AppCardCapsule from '../../../../modules/AppCardCapsule'

export default {
    name: 'CashierCashBookNotif',
    components: {
        AppCardCapsule
    },
    computed: {
        ...mapState({
            dataCurrent: (state) => state.storeCashBook.dataCurrent,
        }),
        currentCashBook () {
            return this.dataCurrent && this.dataCurrent.current_cashbook
        },
        openedCashBook () {
            return this.dataCurrent && this.dataCurrent.opened_cashbook
        },
        shopCashBook () {
            return this.$cookies.get('shop')
        },
    },
    methods: {
        onRoute (data) {
            let path = 'shop-cash-book'
            const roleName = this.$cookies.get('user') 
                ? this.$cookies.get('user').role_name 
                : ''

            if (roleName === 'owner') {
                path = 'shop-cash-book'
            } else {
                path = 'employee-cash-book'
            }

            this.$router.push({
                name: path, 
                query: { 
                    search: data.cashbook_id 
                }
            }).catch(error => {
                if (error.name != "NavigationDuplicated") {
                    throw error;
                }
            })
        },
    }
}
</script>