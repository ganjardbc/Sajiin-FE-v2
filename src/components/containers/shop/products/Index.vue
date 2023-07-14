<template>
    <div 
        id="App" 
        :class="formClass ? 'content-form' : 'content-form hide'">
        <div class="left">
            <div class="display-flex space-between display-mobile margin margin-bottom-15px">
                <div class="width width-75 width-mobile display-flex space-between">
                    <h1 class="fonts big black bold">Products</h1>
                    <div class="display-flex">
                        <button 
                            class="btn btn-icon btn-white" 
                            @click="onRefresh">
                            <i class="fa fa-lw fa-retweet"></i>
                        </button>
                        <button 
                            v-if="isRoleOwner"
                            class="btn btn-icon btn-white" 
                            @click="onCreate">
                            <i class="fa fa-lw fa-plus" />
                        </button>
                    </div>
                </div>
                <div class="width width-25 width-mobile">
                    <SearchField 
                        :placeholder="'Search products ..'" 
                        :enableResponsive="true" 
                        :onChange="(data) => onSearch(data)" />
                </div>
            </div>

            <el-alert 
                v-if="!isRoleOwner"
                title="Create New Products ?"
                description="To create new products please contact your Owner."
                type="warning"
                :closable="true"
                show-icon
                style="margin: 10px 0 20px 0;">
            </el-alert>

            <div class="display-flex space-between align-center display-mobile margin margin-bottom-15px">
                <AppTabs 
                    class="width width-300px width-mobile"
                    :selectedIndex.sync="selectedIndex" 
                    :isFull="true"
                    :isScrollable="false"
                    :data="tabs" 
                    :onChange="(data) => onChangeTabs(data)"
                />
            </div>

            <div class="width width-100">
                <div v-loading="loading">
                    <AppEmpty v-if="data.length === 0" />
                    <Card 
                        :data.sync="data"
                        @onChangeCover="uploadImage"
                        @onDetail="onDetail"
                        @onEdit="onEdit"
                        @onDelete="onDelete"
                        @onChangeProductStatus="onChangeProductStatus"
                        @onChangeVarianStatus="onChangeVarianStatus" />
                </div>
                <div class="width width-100 display-flex flex-end align-center padding padding-top-15px">
                    <div class="fonts fonts-10 normal black">Total {{ totalRecord }}</div>
                    <el-pagination
                        background
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size="limit"
                        :pager-count="5"
                        layout="prev, pager, next"
                        :total="totalRecord">
                    </el-pagination>
                </div>
            </div>

        </div>

        <div class="right">
            <Form 
                @uploadImage="uploadImage"
                @removeImage="removeImage"
                @onSave="onOpenVisibleConfirmed"
                @onClose="onClose">
            </Form>

            <AppFileUpload 
                v-if="visibleUpdateCover"
                @onClose="onCloseCover"
                @onUpload="onUpdateCover"
            />

            <AppPopupConfirmed 
                v-if="visibleConfirmed"
                :title="titleConfirmed"
                @onClickNo="onClickNo"
                @onClickYes="onClickYes"
            />

            <AppPopupConfirmed 
                v-if="visibleConfirmedDelete"
                :title="'Delete this product ?'"
                @onClickNo="onClickNoDelete"
                @onClickYes="onClickYesDelete"
            />

            <AppPopupAlert 
                v-if="visibleAlert"
                :title="titleAlert"
                :icon="iconAlert"
                @onClickOk="onClickOk"
            />

            <AppPopupLoader 
                v-if="loadingForm"
            />
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import AppEmpty from '../../../modules/AppEmpty'
import AppPopupLoader from '../../../modules/AppPopupLoader'
import AppPopupConfirmed from '../../../modules/AppPopupConfirmed'
import AppPopupAlert from '../../../modules/AppPopupAlert'
import AppFileUpload from '../../../modules/AppFileUpload'
import AppTabs from '../../../modules/AppTabs'
import SearchField from '../../../modules/SearchField'
import Form from './Form'
import Card from './Card'

const tabs = [
    {id: 1, label: 'Active', status: 'active'},
    {id: 2, label: 'Inactive', status: ''},
]

export default {
    name: 'App',
    metaInfo: {
        title: 'Shop',
        titleTemplate: '%s | Products',
        htmlAttrs: {
            lang: 'en',
            amp: true
        }
    },
    data () {
        return {
            tabs: tabs,
            formClass: false,
            visibleUpdateCover: false,
            visibleAlert: false,
            titleAlert: 'Failed to preceed data',
            iconAlert: 'fa fa-4x fa-info-circle',
            visibleConfirmed: false,
            visibleConfirmedDelete: false,
            titleConfirmed: 'Save this data ?',
            currentPage: 0,
            selectedIndex: 0,
        }
    },
    mounted () {
        this.getCategoryData()
        this.onChangeTabs(0)
    },
    components: {
        AppEmpty,
        AppPopupLoader,
        AppPopupConfirmed,
        AppPopupAlert,
        AppFileUpload,
        AppTabs,
        SearchField,
        Form,
        Card,
    },
    computed: {
        ...mapState({
            filter: (state) => state.storeProduct.filter,
            form: (state) => state.storeProduct.form,
            data: (state) => state.storeProduct.data,
            totalRecord: (state) => state.storeProduct.totalRecord,
            limit: (state) => state.storeProduct.limit,
            loading: (state) => state.storeProduct.loading,
            loadingForm: (state) => state.storeProduct.loadingForm,
            typeForm: (state) => state.storeProduct.typeForm,
            formVarian: (state) => state.storeProductDetail.form,
        }),
        typeForm: {
            get () {
                return this.$store.state.storeProduct.typeForm
            },
            set (value) {
                this.$store.state.storeProduct.typeForm = value
            }
        },
        shopId () {
            return this.$store.state.storeSelectedShop.selectedData
        },
        isRoleOwner () {
            let status = false 
            const user = this.$cookies.get('user')
            if (user.role_name === 'owner') {
                status = true
            }
            return status
        },
    },
    watch: {
        shopId (prevProps, nextProps) {
            if (prevProps !== nextProps) {
                this.getCategoryData()
                this.getData()
            }
        }
    },
    methods: {
        ...mapActions({
            getproduct: 'storeProduct/getData',
            setPagination: 'storeProduct/setPagination',
            resetFormData: 'storeProduct/resetFormData',
            resetFilter: 'storeProduct/resetFilter',
            setFormData: 'storeProduct/setFormData',
            createData: 'storeProduct/createData',
            updateData: 'storeProduct/updateData',
            deleteData: 'storeProduct/deleteData',
            uploadCover: 'storeProduct/uploadCover',
            setLoadingForm: 'storeProduct/setLoadingForm',
            updateDataVarian: 'storeProductDetail/updateData',
            setFormDataVarian: 'storeProductDetail/setFormData',
            getCategory: 'storeProduct/getDataCategory',
        }),
        onSearch (data) {
            this.filter.search = data 
            this.resetFilter()
            this.getData()
        },
        onClose () {
            this.formClass = false
        },
        onRefresh () {
            this.getData()
        },
        onChangeTabs (data) {
            this.selectedIndex = data
            switch (this.selectedIndex) {
                case 0:
                    this.filter.status = 'active'
                    break
                case 1:
                    this.filter.status = 'inactive'
                    break
            }
            this.handleFilterSearch()
        },

        // LIST DATA
        getCategoryData () {
            const token = this.$cookies.get('tokenBearer')
            const shop_id = this.shopId 
            if (shop_id) {
                this.getCategory({ 
                    token, 
                    shop_id: shop_id,
                    type: 'employee'
                })
            }
        },
        getData () {
            const token = this.$cookies.get('tokenBearer')
            const shop_id = this.shopId
            if (shop_id) {
                this.getproduct({ token, shop_id })
            }
        },
        handleCurrentChange (value) {
            this.setPagination(value)
            this.getData()
        },
        handleFilterSearch () {
            this.currentPage = 1
            this.handleCurrentChange(1)
        },

        // ALERT
        onClickOk () {
            this.visibleAlert = false
        },

        // CONFIRMED
        onClickNo () {
            this.visibleConfirmed = false 
        },
        onClickYes () {
            this.visibleConfirmed = false 
            const token = this.$cookies.get('tokenBearer')
            switch (this.typeForm) {
                case 'create':
                    this.createData({
                        ...this.form,
                        token: token
                    }).then((res) => {
                        const status = res.data.status 
                        if (status === 'ok') {
                            this.formClass = false 
                            this.getData()
                        } else {
                            this.$message({
                                message: 'Failed to save this product',
                                type: 'error'
                            })
                        }
                    })
                    break
                case 'edit':
                    this.updateData({
                        ...this.form,
                        token: token
                    }).then((res) => {
                        const status = res.data.status 
                        if (status === 'ok') {
                            this.formClass = false 
                            this.getData()
                        } else {
                            this.$message({
                                message: 'Failed to edit this product',
                                type: 'error'
                            })
                        }
                    })
                    break
            }
        },

        // SAVE
        onOpenVisibleConfirmed () {
            this.visibleConfirmed = true
            switch (this.typeForm) {
                case 'create':
                    this.titleConfirmed = 'Save this product ?'
                    break
                case 'edit':
                    this.titleConfirmed = 'Edit this product ?'
                    break
            }
        },

        // CREATE
        onCreate () {
            this.formClass = true
            this.resetFormData()
            this.form.shop_id = this.shopId
            this.typeForm = 'create'
        },

        // DETAIL
        onDetail (data) {
            this.formClass = true
            this.resetFormData()
            this.setFormData(data)
            this.typeForm = 'detail'
        },

        // EDIT
        onEdit (data) {
            this.formClass = true
            this.resetFormData()
            this.setFormData(data)
            this.typeForm = 'edit'
        },

        // DELETE
        onDelete (data) {
            this.visibleConfirmedDelete = true 
            this.setFormData(data)
        },
        onClickNoDelete () {
            this.visibleConfirmedDelete = false 
        },
        onClickYesDelete () {
            this.visibleConfirmedDelete = false 
            const token = this.$cookies.get('tokenBearer')
            this.deleteData({
                ...this.form,
                token: token
            }).then((res) => {
                const status = res.data.status 
                if (status === 'ok') {
                    this.getData()
                } else {
                    this.visibleAlert = true 
                    this.titleAlert = 'Failed to delete this product'
                }
            })
        },

        // IMAGE
        uploadImage (data) {
            this.visibleUpdateCover = true
            this.setFormData(data)
        },
        removeImage () {
            console.log('removeImage')
        },
        onCloseCover () {
            this.visibleUpdateCover = false 
        },
        onUpdateCover (data) {
            this.visibleUpdateCover = false 
            const token = this.$cookies.get('tokenBearer')
            this.uploadCover({
                ...this.form,
                image: data,
                token: token
            }).then((res) => {
                const status = res.data.status 
                if (status === 'ok') {
                    this.getData()
                } else {
                    this.visibleAlert = true 
                    this.titleAlert = 'Failed to upload cover'
                }
            })
        },

        // STATUS
        onChangeProductStatus (data) {
            this.setFormData(data)
            const token = this.$cookies.get('tokenBearer')
            this.updateData({
                ...this.form,
                token: token
            }).then((res) => {
                const status = res.data.status 
                if (status === 'ok') {
                    this.$message(`Success changed status for product ${data.name}.`)
                } else {
                    this.$message({
                        message: `Failed to change status for product ${data.name}.`,
                        type: 'error'
                    });
                }
            })
        },
        onChangeVarianStatus (data) {
            this.setLoadingForm(true)
            this.setFormDataVarian(data)
            const token = this.$cookies.get('tokenBearer')
            this.updateDataVarian({
                ...this.formVarian,
                token: token
            }).then((res) => {
                const status = res.data.status 
                if (status === 'ok') {
                    this.$message(`Success changed status for varian ${data.name}.`)
                } else {
                    this.$message({
                        message: `Failed to change status for varian ${data.name}.`,
                        type: 'error'
                    });
                }
            }).finally(() => {
                this.setLoadingForm(false)
            })
        }
    }
}
</script>