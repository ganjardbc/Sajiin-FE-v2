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
                    <div class="field-label">Shipment ID</div>
                    <el-input 
                        placeholder=""
                        type="text"
                        v-model="form.shipment_id"
                        :disabled="true"></el-input>
                    <div 
                        v-if="errorMessage.shipment_id" 
                        class="field-error">
                        {{ errorMessage.shipment_id && errorMessage.shipment_id[0] }}
                    </div>
                </div>
                <div class="field-group">
                    <div class="field-label">Name</div>
                    <el-input 
                        placeholder=""
                        type="text"
                        v-model="form.name"
                        :disabled="isDetailForm"></el-input>
                    <div 
                        v-if="errorMessage.name" 
                        class="field-error">
                        {{ errorMessage.name && errorMessage.name[0] }}
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
                        <div class="fonts micro black">Is this payment still active ?</div>
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
                        <div class="fonts micro black">Is this payment still available ?</div>
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
            form: (state) => state.storeShipment.form,
            errorMessage: (state) => state.storeShipment.errorMessage,
            typeForm: (state) => state.storeShipment.typeForm,
        }),
        title () {
            let currentTitle = ''
            switch (this.typeForm) {
                case 'create':
                    currentTitle = 'Create Shipment'
                    break
                case 'detail':
                    currentTitle = 'Detail Shipment'
                    break
                case 'edit':
                    currentTitle = 'Edit Shipment'
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
            return this.form.image ? this.shipmentImageThumbnaiUrl + this.form.image : ''
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