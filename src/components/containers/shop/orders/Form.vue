<template>
    <div id="App">
        <AppSideForm 
            :title="title" 
            :enableSaveButton="!isDetailForm"
            :onSave="onSave"
            :onClose="onClose">
            <!-- <AppTabs 
                v-if="!isCreateForm"
                :selectedIndex.sync="selectedIndex" 
                :data="tabs" 
                :onChange="(data) => onChangeTabs(data)"
                class="margin margin-bottom-20px" />
            <FormData v-if="selectedIndex === 0" />
            <ProductDetail v-if="selectedIndex === 1" /> -->
            <div>
                {{ form }}
            </div>
        </AppSideForm>
    </div>
</template>

<script>
import { mapState } from 'vuex'
import AppSideForm from '../../../modules/AppSideForm'
import AppImage from '../../../modules/AppImage'
import AppTabs from '../../../modules/AppTabs'
import FormData from './FormData'
import ProductDetail from './productDetail/Index'

const tabs = [
    {id: 1, label: 'Data', status: 'active'},
    {id: 2, label: 'Orders', status: ''},
]

export default {
    name: 'App',
    data () {
        return {
            selectedIndex: 0,
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
            form: (state) => state.storeOrders.form,
            errorMessage: (state) => state.storeOrders.errorMessage,
            typeForm: (state) => state.storeOrders.typeForm,
            category: (state) => state.storeCategory.data,
        }),
        formId: {
            get () {
                return this.$store.state.storeOrders.form.id
            },
            set (value) {
                this.$store.state.storeOrders.form.id = value
            }
        },
        title () {
            let currentTitle = ''
            switch (this.typeForm) {
                case 'create':
                    currentTitle = 'Create Order'
                    break
                case 'detail':
                    currentTitle = 'Detail Order'
                    break
                case 'edit':
                    currentTitle = 'Edit Order'
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
        getCover () {
            return this.form.image ? this.productImageThumbnailUrl + this.form.image : ''
        }
    },
    components: {
        AppSideForm,
        AppImage,
        AppTabs,
        ProductDetail,
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