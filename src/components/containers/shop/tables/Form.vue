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
                <!-- <div class="field-group">
                    <div class="field-label">Shop ID</div>
                    <el-input 
                        placeholder=""
                        type="text"
                        v-model="form.shop_id"
                        :disabled="true"></el-input>
                    <div 
                        v-if="errorMessage.shop_id" 
                        class="field-error">
                        {{ errorMessage.shop_id && errorMessage.shop_id[0] }}
                    </div>
                </div> -->
                <div class="field-group">
                    <div class="field-label">Table ID</div>
                    <el-input 
                        placeholder=""
                        type="text"
                        v-model="form.table_id"
                        :disabled="true"></el-input>
                    <div 
                        v-if="errorMessage.table_id" 
                        class="field-error">
                        {{ errorMessage.table_id && errorMessage.table_id[0] }}
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
                    <div class="field-label">Code</div>
                    <el-input 
                        placeholder=""
                        type="text"
                        v-model="form.code"
                        :disabled="isDetailForm"></el-input>
                    <div 
                        v-if="errorMessage.code" 
                        class="field-error">
                        {{ errorMessage.code && errorMessage.code[0] }}
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
            form: (state) => state.storeTable.form,
            errorMessage: (state) => state.storeTable.errorMessage,
            dayLists: (state) => state.storeTable.dayLists,
        }),
        isDetailForm () {
            let status = false 
            if (this.title === 'DETAIL') {
                status = true 
            }
            return status
        },
        getCover () {
            return this.form.image ? this.tableImageThumbnailUrl + this.form.image : ''
        }
    },
    components: {
        AppSideForm,
        AppImage,
    },
    props: {
        title: {
            type: String,
            required: true
        },
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