<template>
    <div id="CashierCashBookForm">
        <AppCardPopup 
            title="Creat Cash Book" 
            @onClose="onClose">
            <div v-loading="loadingForm">
                <div class="margin margin-bottom-20px">
                    <div class="field-group">
                        <div class="field-label">Cash Book ID</div>
                        <el-input 
                            placeholder=""
                            type="text"
                            v-model="form.cashbook_id"
                            :disabled="true"></el-input>
                        <div 
                            v-if="errorMessage.cashbook_id" 
                            class="field-error">
                            {{ errorMessage.cashbook_id && errorMessage.cashbook_id[0] }}
                        </div>
                    </div>
                    <div class="field-group">
                        <div class="field-label">Cash Date</div>
                        <el-date-picker 
                            placeholder="Pick a day"
                            type="date"
                            format="dd MMMM yyyy"
                            v-model="form.cash_date"
                            :disabled="false"
                            :picker-options="pickerOptions"
                            style="width: 100% !important;"></el-date-picker>
                        <div 
                            v-if="errorMessage.cash_date" 
                            class="field-error">
                            {{ errorMessage.cash_date && errorMessage.cash_date[0] }}
                        </div>
                    </div>
                    <div class="field-group">
                        <div class="field-label">Cash Modal</div>
                        <currency-input
                            class="field field-sekunder"
                            v-model="form.cash_modal"
                            :precision="0"
                        />
                        <div 
                            v-if="errorMessage.cash_modal" 
                            class="field-error">
                            {{ errorMessage.cash_modal && errorMessage.cash_modal[0] }}
                        </div>
                    </div>
                    <div class="field-group">
                        <div class="field-label">Cash Status</div>
                        <div class="display-flex space-between">
                            <div class="fonts micro black">Change the cash status to Open/Closed</div>
                            <el-switch 
                                v-model="form.cash_status"
                                active-color="#38c172"
                                active-text="Open"
                                inactive-text="Closed"
                                :active-value="'open'"
                                :inactive-value="'closed'"
                                :disabled="true"></el-switch>
                        </div>
                        <div 
                            v-if="errorMessage.cash_status" 
                            class="field-error">
                            {{ errorMessage.cash_status && errorMessage.cash_status[0] }}
                        </div>
                    </div>
                </div>

                <div class="width width-100">
                    <button 
                        class="btn btn-main btn-full" 
                        :disabled="!isCanSave"
                        @click="onSave">
                        Save Data
                    </button>
                </div>
            </div>
        </AppCardPopup>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import AppCardPopup from '../../../../modules/AppCardPopup'

export default {
    name: 'CashierCashBookForm',
    data () {
        return {
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() > Date.now();
                },
            }
        }
    },
    mounted () {},
    components: {
        AppCardPopup
    },
    computed: {
        ...mapState({
            form: (state) => state.storeCashBook.form,
            errorMessage: (state) => state.storeCashBook.errorMessage,
            typeForm: (state) => state.storeCashBook.typeForm,
            loadingForm: (state) => state.storeCashBook.loadingForm,
        }),
        isCanSave () {
            let status = false 
            if (this.form.cash_modal > 0) {
                status = true 
            }
            return status
        }
    },
    methods: {
        onClose () {
            this.$emit('onClose')
        },
        onSave () {
            this.$emit('onSave')
        },
    }
}
</script>