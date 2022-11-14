<template>
    <div id="App">
        <AppSideForm 
            :title="title" 
            :enableSaveButton="!isDetailForm"
            :onSave="onSave"
            :onClose="onClose">
            <div class="margin margin-bottom-20px padding padding-bottom-20px border-bottom">
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
                    <div class="field-label">About</div>
                    <el-input 
                        placeholder=""
                        type="textarea"
                        v-model="form.about"
                        :disabled="isDetailForm"
                        :autosize="{ minRows: 2, maxRows: 2}"></el-input>
                    <div 
                        v-if="errorMessage.about" 
                        class="field-error">
                        {{ errorMessage.about && errorMessage.about[0] }}
                    </div>
                </div>
                <div class="field-group">
                    <div class="field-label">Address</div>
                    <el-input 
                        placeholder=""
                        type="textarea"
                        v-model="form.location"
                        :disabled="isDetailForm"
                        :autosize="{ minRows: 2, maxRows: 2}"></el-input>
                    <div 
                        v-if="errorMessage.location" 
                        class="field-error">
                        {{ errorMessage.location && errorMessage.location[0] }}
                    </div>
                </div>
            </div>

            <div class="margin margin-bottom-20px padding padding-bottom-20px border-bottom">
                <div class="fonts fonts-13 black semibold">Opening Hour</div>
                <div class="display-flex">
                    <div class="field-group" style="width: calc(100% - 10px); margin-right: 10px;">
                        <div class="field-label">Open Day</div>
                        <el-select 
                            v-model="form.open_day" 
                            placeholder="Select"
                            no-data-text="No Data Disaplayed"
                            :disabled="isDetailForm">
                            <el-option
                                v-for="item in dayLists"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                        <div 
                            v-if="errorMessage.open_day" 
                            class="field-error">
                            {{ errorMessage.open_day && errorMessage.open_day[0] }}
                        </div>
                    </div>
                    <div class="field-group" style="width: calc(100% - 10px); margin-left: 10px;">
                        <div class="field-label">Close Day</div>
                        <el-select 
                            v-model="form.close_day" 
                            placeholder="Select"
                            no-data-text="No Data Disaplayed"
                            :disabled="isDetailForm">
                            <el-option
                                v-for="item in dayLists"
                                :key="item"
                                :label="item"
                                :value="item">
                            </el-option>
                        </el-select>
                        <div 
                            v-if="errorMessage.close_day" 
                            class="field-error">
                            {{ errorMessage.close_day && errorMessage.close_day[0] }}
                        </div>
                    </div>
                </div>
                <div class="display-flex">
                    <div class="field-group" style="width: calc(100% - 10px); margin-right: 10px;">
                        <div class="field-label">Open Time</div>
                        <el-input 
                            placeholder=""
                            v-model="form.open_time"
                            :disabled="isDetailForm"
                            type="time">
                        </el-input>
                        <div 
                            v-if="errorMessage.open_time" 
                            class="field-error">
                            {{ errorMessage.open_time && errorMessage.open_time[0] }}
                        </div>
                    </div>
                    <div class="field-group" style="width: calc(100% - 10px); margin-left: 10px;">
                        <div class="field-label">Close Time</div>
                        <el-input 
                            placeholder=""
                            v-model="form.close_time"
                            :disabled="isDetailForm"
                            type="time">
                        </el-input>
                        <div 
                            v-if="errorMessage.close_time" 
                            class="field-error">
                            {{ errorMessage.close_time && errorMessage.close_time[0] }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="margin margin-bottom-20px padding padding-bottom-20px border-bottom">
                <div class="fonts fonts-13 black semibold">Contact</div>
                <div class="field-group">
                    <div class="field-label">Email</div>
                    <el-input 
                        placeholder=""
                        type="email"
                        v-model="form.email"
                        :disabled="isDetailForm"></el-input>
                    <div 
                        v-if="errorMessage.email" 
                        class="field-error">
                        {{ errorMessage.email && errorMessage.email[0] }}
                    </div>
                </div>
                <div class="field-group">
                    <div class="field-label">Phone</div>
                    <el-input 
                        placeholder=""
                        type="text"
                        v-model="form.phone"
                        :disabled="isDetailForm"></el-input>
                    <div 
                        v-if="errorMessage.phone" 
                        class="field-error">
                        {{ errorMessage.phone && errorMessage.phone[0] }}
                    </div>
                </div>
            </div>

            <div class="margin margin-bottom-0px">
                <div class="fonts fonts-13 black semibold">Configuration</div>
                <div class="field-group">
                    <div class="field-label">Status</div>
                    <div class="display-flex space-between">
                        <div class="fonts micro black">Is this shop still active ?</div>
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
                        <div class="fonts micro black">Is this shop still available ?</div>
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
            form: (state) => state.storeShop.form,
            errorMessage: (state) => state.storeShop.errorMessage,
            dayLists: (state) => state.storeShop.dayLists,
            typeForm: (state) => state.storeShop.typeForm,
        }),
        title () {
            let currentTitle = ''
            switch (this.typeForm) {
                case 'create':
                    currentTitle = 'Create Shop'
                    break
                case 'detail':
                    currentTitle = 'Detail Shop'
                    break
                case 'edit':
                    currentTitle = 'Edit Shop'
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