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
                    <div class="field-label">Cover</div>
                    <div class="width width-80px">
                        <div class="image image-padding border border-full">
                            <img 
                                v-if="form.image" 
                                :src="getCover" 
                                alt="" 
                                class="post-center">
                            <i v-else class="post-middle-absolute icn fa fa-lg fa-image"></i>
                        </div>
                    </div>
                </div>
                <div class="field-group">
                    <div class="field-label">Foto ID</div>
                    <el-input 
                        placeholder=""
                        type="text"
                        v-model="form.prodimage_id"
                        :disabled="true"></el-input>
                    <div 
                        v-if="errorMessage.prodimage_id" 
                        class="field-error">
                        {{ errorMessage.prodimage_id && errorMessage.prodimage_id[0] }}
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
        </AppSideForm>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import AppSideForm from '../../../../modules/AppSideForm'
import AppImage from '../../../../modules/AppImage'

export default {
    name: 'App',
    data () {
        return {}
    },
    mounted () {},
    computed: {
        ...mapState({
            form: (state) => state.storeProductImage.form,
            errorMessage: (state) => state.storeProductImage.errorMessage,
            typeForm: (state) => state.storeProductImage.typeForm,
        }),
        title () {
            let currentTitle = ''
            switch (this.typeForm) {
                case 'create':
                    currentTitle = 'Create Foto'
                    break
                case 'detail':
                    currentTitle = 'Detail Foto'
                    break
                case 'edit':
                    currentTitle = 'Edit Foto'
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
            return this.form.image ? this.shopImageThumbnailUrl + this.form.image : ''
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