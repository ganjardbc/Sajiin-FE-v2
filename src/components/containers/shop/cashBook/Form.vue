<template>
    <div id="App">
        <AppSideForm 
            :title="title" 
            :enableSaveButton="isCanSave"
            :onSave="onSave"
            :onClose="onClose">
            <div class="margin margin-bottom-20px">
                <div class="fonts fonts-13 black semibold">General Info</div>
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
                        :disabled="isCreateForm"
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
                        :disabled="isDetailForm"
                    />
                    <div 
                        v-if="errorMessage.cash_modal" 
                        class="field-error">
                        {{ errorMessage.cash_modal && errorMessage.cash_modal[0] }}
                    </div>
                </div>
                <div v-if="isCreateForm" class="field-group">
                    <div class="field-label">Cash In</div>
                    <currency-input
                        class="field field-sekunder"
                        v-model="form.cash_in"
                        :precision="0"
                        :disabled="true"
                    />
                    <div 
                        v-if="errorMessage.cash_in" 
                        class="field-error">
                        {{ errorMessage.cash_in && errorMessage.cash_in[0] }}
                    </div>
                </div>
                <div v-if="isCreateForm" class="field-group">
                    <div class="field-label">Cash Out</div>
                    <currency-input
                        class="field field-sekunder"
                        v-model="form.cash_out"
                        :precision="0"
                        :disabled="true"
                    />
                    <div 
                        v-if="errorMessage.cash_out" 
                        class="field-error">
                        {{ errorMessage.cash_out && errorMessage.cash_out[0] }}
                    </div>
                </div>
                <div v-if="isCreateForm" class="field-group">
                    <div class="field-label">Cash Summary</div>
                    <currency-input
                        class="field field-sekunder"
                        v-model="form.cash_summary"
                        :precision="0"
                        :disabled="true"
                    />
                    <div 
                        v-if="errorMessage.cash_summary" 
                        class="field-error">
                        {{ errorMessage.cash_summary && errorMessage.cash_summary[0] }}
                    </div>
                </div>
            </div>

            <div v-if="isCreateForm" class="margin margin-bottom-20px">
                <div class="fonts fonts-13 black semibold">Closing</div>
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
                            :disabled="isDetailForm"></el-switch>
                    </div>
                    <div 
                        v-if="errorMessage.cash_status" 
                        class="field-error">
                        {{ errorMessage.cash_status && errorMessage.cash_status[0] }}
                    </div>
                </div>
                <div v-if="form.cash_status === 'closed'" class="field-group">
                    <div class="field-label">Cash Actual</div>
                    <currency-input
                        class="field field-sekunder"
                        v-model="form.cash_actual"
                        :precision="0"
                        :disabled="isDetailForm"
                    />
                    <div 
                        v-if="errorMessage.cash_actual" 
                        class="field-error">
                        {{ errorMessage.cash_actual && errorMessage.cash_actual[0] }}
                    </div>
                </div>
                <el-alert
                    v-if="form.cash_summary > form.cash_actual"
                    title="Cash Actual is Not The Same !"
                    description="It's look like cash summary and actual is not the same, please check your cash again."
                    type="error"
                    :closable="false"
                    show-icon >
                </el-alert>
            </div>

            <div class="margin margin-bottom-0px">
                <div class="fonts fonts-13 black semibold">Configuration</div>
                <div class="field-group">
                    <div class="field-label">Status</div>
                    <div class="display-flex space-between">
                        <div class="fonts micro black">Is this cash book still {{ form.status === 'active' ? 'Inactive' : 'Active' }} ?</div>
                        <el-switch 
                            v-model="form.status"
                            :disabled="isDetailForm"
                            :active-value="'active'"
                            :inactive-value="'inactive'"></el-switch>
                    </div>
                    <div 
                        v-if="errorMessage.status" 
                        class="field-error">
                        {{ errorMessage.status && errorMessage.status[0] }}
                    </div>
                </div>
            </div>
        </AppSideForm>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import AppSideForm from '../../../modules/AppSideForm'
import AppImage from '../../../modules/AppImage'

export default {
    name: 'App',
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
    computed: {
        ...mapState({
            form: (state) => state.storeCashBook.form,
            errorMessage: (state) => state.storeCashBook.errorMessage,
            typeForm: (state) => state.storeCashBook.typeForm,
        }),
        title () {
            let currentTitle = ''
            switch (this.typeForm) {
                case 'create':
                    currentTitle = 'Create Shift'
                    break
                case 'detail':
                    currentTitle = 'Detail Shift'
                    break
                case 'edit':
                    currentTitle = 'Edit Shift'
                    break
            }
            return currentTitle
        },
        isDetailForm () {
            let status = false 
            if (this.typeForm === 'detail') {
                status = true 
            }
            return status
        },
        isCreateForm () {
            let status = true 
            if (this.typeForm === 'create') {
                status = false 
            }
            return status
        },
        isEditForm () {
            let status = true 
            if (this.typeForm === 'edit') {
                status = false 
            }
            return status
        },
        isCanSave () {
            let status = false 
            if (!this.isDetailForm && this.form.cash_modal > 0) {
                status = true 
            }
            return status
        }
    },
    components: {
        AppSideForm,
        AppImage,
    },
    methods: {
        uploadImage (data) {
            this.$emit('uploadImage', data)
        },
        removeImage (data) {
            this.$emit('removeImage', data)
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