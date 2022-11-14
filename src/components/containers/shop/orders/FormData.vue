<template>
    <div id="App">
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
                <div class="field-label">Product ID</div>
                <el-input 
                    placeholder=""
                    type="text"
                    v-model="form.product_id"
                    :disabled="true"></el-input>
                <div 
                    v-if="errorMessage.product_id" 
                    class="field-error">
                    {{ errorMessage.product_id && errorMessage.product_id[0] }}
                </div>
            </div>
            <div class="field-group">
                <div class="field-label">Category</div>
                <el-select 
                    v-model="form.category_id" 
                    placeholder="Select"
                    no-data-text="No Data Disaplayed"
                    :disabled="isDetailForm">
                    <el-option
                        v-for="item in category"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
                <div 
                    v-if="errorMessage.category_id" 
                    class="field-error">
                    {{ errorMessage.category_id && errorMessage.category_id[0] }}
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
            <div class="field-group">
                <div class="field-label">Note (optional)</div>
                <el-input 
                    placeholder=""
                    type="textarea"
                    v-model="form.note"
                    :disabled="isDetailForm"
                    :autosize="{ minRows: 2, maxRows: 2}"></el-input>
                <div 
                    v-if="errorMessage.note" 
                    class="field-error">
                    {{ errorMessage.note && errorMessage.note[0] }}
                </div>
            </div>
        </div>

        <div class="margin margin-bottom-0px">
            <div class="fonts fonts-13 black semibold">Configuration</div>
            <div class="field-group">
                <div class="field-label">Status</div>
                <div class="display-flex space-between">
                    <div class="fonts micro black">Is this product still active ?</div>
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
                    <div class="fonts micro black">Is this product still available ?</div>
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
    </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'App',
    data () {
        return {}
    },
    mounted () {},
    computed: {
        ...mapState({
            form: (state) => state.storeProduct.form,
            errorMessage: (state) => state.storeProduct.errorMessage,
            category: (state) => state.storeCategory.data,
            typeForm: (state) => state.storeProduct.typeForm,
        }),
        isDetailForm () {
            let status = false 
            if (this.typeForm === 'detail') {
                status = true 
            }
            return status
        },
        isCreateForm () {
            let status = false 
            if (this.typeForm === 'create') {
                status = true 
            }
            return status
        },
        getCover () {
            return this.form.image ? this.productImageThumbnailUrl + this.form.image : ''
        }
    },
    components: {},
    props: {},
    methods: {},
}
</script>