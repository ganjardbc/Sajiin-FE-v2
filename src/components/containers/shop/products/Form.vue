<template>
    <div id="App">
        <AppSideForm 
            :title="title" 
            :enableSaveButton="isButtonApplyEnable"
            :onSave="onSave"
            :onClose="onClose">
            <div 
                v-if="errorMessage.details && errorMessage.details[0]" 
                class="padding padding-bottom-15px">
                <el-alert
                    title="Need Varians"
                    description="You have to add at least one Varian(s)."
                    type="error"
                    :closable="false"
                    show-icon>
                </el-alert>
            </div>
            <AppTabs 
                :selectedIndex.sync="selectedIndex" 
                :data="tabs" 
                :isFull="true"
                :onChange="(data) => onChangeTabs(data)"
                class="margin margin-bottom-20px" />
            <FormData v-if="selectedIndex === 0" />
            <ProductVarian v-if="selectedIndex === 1" />
        </AppSideForm>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import AppSideForm from '../../../modules/AppSideForm'
import AppEmpty from '../../../modules/AppEmpty'
import AppImage from '../../../modules/AppImage'
import AppTabs from '../../../modules/AppTabs'
import FormData from './FormData'
import ProductVarian from './productVarian/Index'

const tabs = [
    {id: 1, label: 'Data', status: 'active'},
    {id: 2, label: 'Varians', status: ''},
]

export default {
    name: 'App',
    data () {
        return {
            selectedIndex: 1,
            tabs: tabs,
        }
    },
    mounted () {
        this.selectedIndex = 0
    },
    watch: {
        formId () {
            this.selectedIndex = 0
        }
    },
    computed: {
        ...mapState({
            form: (state) => state.storeProduct.form,
            errorMessage: (state) => state.storeProduct.errorMessage,
            typeForm: (state) => state.storeProduct.typeForm,
            category: (state) => state.storeCategory.data,
        }),
        formId: {
            get () {
                return this.$store.state.storeProduct.form.id
            },
            set (value) {
                this.$store.state.storeProduct.form.id = value
            }
        },
        title () {
            let currentTitle = ''
            switch (this.typeForm) {
                case 'create':
                    currentTitle = 'Create Product'
                    break
                case 'detail':
                    currentTitle = 'Detail Product'
                    break
                case 'edit':
                    currentTitle = 'Edit Product'
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
            let status = false 
            if (this.typeForm === 'create') {
                status = true 
            }
            return status
        },
        isButtonApplyEnable () {
            let status = false 
            if (!this.isDetailForm) {
                if (this.form.category_id && this.form.name && this.form.description && this.form.details.length > 0) {
                    status = true 
                }
            }

            return status
        },
        getCover () {
            return this.form.image ? this.productImageThumbnailUrl + this.form.image : ''
        }
    },
    components: {
        AppEmpty,
        AppSideForm,
        AppImage,
        AppTabs,
        ProductVarian,
        FormData,
    },
    methods: {
        onChangeTabs (data) {
            this.selectedIndex = data
        },
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