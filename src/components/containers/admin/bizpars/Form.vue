<template>
    <div id="App">
        <AppSideForm 
            :title="title" 
            :enableSaveButton="!isDetailForm"
            :onSave="onSave"
            :onClose="onClose">
            <div class="width width-100">
                <div class="field-group">
                    <div class="field-label">Key</div>
                    <el-input 
                        placeholder=""
                        type="text"
                        v-model="form.key"
                        :disabled="true"></el-input>
                    <div 
                        v-if="errorMessage.key" 
                        class="field-error">
                        {{ errorMessage.key && errorMessage.key[0] }}
                    </div>
                </div>
                <div class="field-group">
                    <div class="field-label">Value</div>
                    <el-input 
                        placeholder=""
                        type="text"
                        v-model="form.value"
                        :disabled="isDetailForm"></el-input>
                    <div 
                        v-if="errorMessage.value" 
                        class="field-error">
                        {{ errorMessage.value && errorMessage.value[0] }}
                    </div>
                </div>
                <div class="field-group">
                    <div class="field-label">Type</div>
                    <el-input 
                        placeholder=""
                        type="text"
                        v-model="form.type"
                        :disabled="isDetailForm"></el-input>
                    <div 
                        v-if="errorMessage.type" 
                        class="field-error">
                        {{ errorMessage.type && errorMessage.type[0] }}
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
        return {}
    },
    mounted () {},
    computed: {
        ...mapState({
            form: (state) => state.storeBizpars.form,
            errorMessage: (state) => state.storeBizpars.errorMessage,
            typeForm: (state) => state.storeBizpars.typeForm,
        }),
        title () {
            let currentTitle = ''
            switch (this.typeForm) {
                case 'create':
                    currentTitle = 'Create Bizpars'
                    break
                case 'detail':
                    currentTitle = 'Detail Bizpars'
                    break
                case 'edit':
                    currentTitle = 'Edit Bizpars'
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