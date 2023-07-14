<template>
    <div id="CloseCashbook">
        <AppCardPopup 
            title="Close Cash Book" 
            @onClose="onClose">
            <div>
                <div class="margin margin-bottom-15px">
                    <div class="fonts fonts-11 normal black">
                        This cash book will set to closed and you can download the reports for this cash book.
                    </div>
                </div>
                <div class="margin margin-bottom-15px">
                    <div class="fonts fonts-11 semibold black">
                        {{ form.cash_date | moment("DD MMMM YYYY") }}
                    </div>
                    <div class="field-group">
                        <OrderStatus :data="form" />
                    </div>
                    <div class="field-group">
                        <div class="field-label">Cash Summary</div>
                        <div class="fonts medium semibold main-color overflow-ellipsis">
                            {{ format(form && form.cash_summary || 0) }}
                        </div>
                    </div>
                    <div class="field-group">
                        <div class="field-label">Cash Actual</div>
                        <div class="field-caption">
                            Set cash actual for this cash book to make comparison between cash in system and cash actual.
                        </div>
                        <currency-input
                            class="field field-sekunder"
                            v-model="form.cash_actual"
                            :precision="0"
                        />
                        <div 
                            v-if="errorMessage.cash_actual" 
                            class="field-error">
                            {{ errorMessage.cash_actual && errorMessage.cash_actual[0] }}
                        </div>
                    </div>
                    <div v-if="form.cash_actual" class="width width-100 margin margin-bottom-15px">
                        <el-alert
                            v-if="form.cash_summary > form.cash_actual"
                            title="Cash Actual is Not The Same !"
                            description="It's look like cash summary and actual is not the same, please check your cash again."
                            type="error"
                            :closable="false"
                            show-icon >
                        </el-alert>
                    </div>
                </div>
                <div class="width width-100">
                    <div class="field-group display-flex space-between">
                        <div style="width: calc(50% - 7.5px);">
                            <button 
                                class="btn btn-grey btn-full" 
                                @click="onClose">
                                Cancel
                            </button>
                        </div>
                        <div style="width: calc(50% - 7.5px);">
                            <button 
                                class="btn btn-main btn-full"
                                @click="onSave">
                                Close Cash Book
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppCardPopup>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import AppCardPopup from '../../../modules/AppCardPopup'
import OrderStatus from './OrderStatus'

export default {
    name: 'CloseCashbook',
    components: {
        AppCardPopup,
        OrderStatus,
    },
    computed: {
        ...mapState({
            form: (state) => state.storeCashBook.form,
            errorMessage: (state) => state.storeCashBook.errorMessage,
            typeForm: (state) => state.storeCashBook.typeForm,
            loadingForm: (state) => state.storeCashBook.loadingForm,
        }),
    },
    methods: {
        onClose () {
            this.$emit('onClose')
        },
        onSave () {
            const payload = {
                ...this.form, 
                cash_status: 'closed'
            }
            this.$emit('onSave', payload)
        }
    }
}
</script>