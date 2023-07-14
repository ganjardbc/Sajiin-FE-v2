<template>
    <div id="App">
        <AppSideForm 
            :title="title" 
            :enableSaveButton="!isDetailForm"
            :onSave="onSave"
            :onClose="onClose">
            <div class="margin margin-bottom-20px">
                <div class="fonts fonts-13 black semibold">General Info</div>
                <div class="field-group">
                    <div class="field-label">Position ID</div>
                    <el-input 
                        placeholder=""
                        type="text"
                        v-model="form.position_id"
                        :disabled="true"></el-input>
                    <div 
                        v-if="errorMessage.position_id" 
                        class="field-error">
                        {{ errorMessage.position_id && errorMessage.position_id[0] }}
                    </div>
                </div>
                <div class="field-group">
                    <div class="field-label">Title</div>
                    <el-input 
                        placeholder=""
                        type="text"
                        v-model="form.title"
                        :disabled="isDetailForm"></el-input>
                    <div 
                        v-if="errorMessage.title" 
                        class="field-error">
                        {{ errorMessage.title && errorMessage.title[0] }}
                    </div>
                </div>
                <div class="field-group">
                    <div class="field-label">Description</div>
                    <el-input 
                        placeholder=""
                        type="textarea"
                        v-model="form.description"
                        :disabled="isDetailForm"
                        :autosize="{ minRows: 2, maxRows: 2}"></el-input>
                    <div 
                        v-if="errorMessage.description" 
                        class="field-error">
                        {{ errorMessage.description && errorMessage.description[0] }}
                    </div>
                </div>
            </div>
            <div class="margin margin-bottom-0px">
                <div class="fonts fonts-13 black semibold">Configuration</div>
                <div class="field-group">
                    <div class="field-label">Status</div>
                    <div class="display-flex space-between">
                        <div class="fonts micro black">Is this category {{ form.status === 'active' ? 'Inactive' : 'Active' }} ?</div>
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
                <div class="field-group">
                    <div class="field-label">Available</div>
                    <div class="display-flex space-between">
                        <div class="fonts micro black">Is this category still available ?</div>
                        <el-switch 
                            v-model="form.is_available"
                            :disabled="isDetailForm"
                            :active-value="1"
                            :inactive-value="0"></el-switch>
                    </div>
                    <div 
                        v-if="errorMessage.is_available" 
                        class="field-error">
                        {{ errorMessage.is_available && errorMessage.is_available[0] }}
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
            form: (state) => state.storePositionAdmin.form,
            errorMessage: (state) => state.storePositionAdmin.errorMessage,
            typeForm: (state) => state.storePositionAdmin.typeForm,
        }),
        title () {
            let currentTitle = ''
            switch (this.typeForm) {
                case 'create':
                    currentTitle = 'Create Position'
                    break
                case 'detail':
                    currentTitle = 'Detail Position'
                    break
                case 'edit':
                    currentTitle = 'Edit Position'
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
        getCover () {
            return this.form.image ? this.positionImageThumbnailUrl + this.form.image : ''
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