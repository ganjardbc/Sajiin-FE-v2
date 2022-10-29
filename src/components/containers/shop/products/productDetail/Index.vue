<template>
    <div 
        id="App" 
        :class="formClass ? 'content-form' : 'content-form hide'">
        <div class="left">
            <div class="display-flex space-between margin margin-bottom-5px">
                <h1 class="fonts big black bold">Varians</h1>
                <div class="display-flex">
                    <button 
                        class="btn btn-icon btn-white" 
                        @click="onRefresh">
                        <i class="fa fa-lw fa-retweet"></i>
                    </button>
                    <button 
                        v-if="typeFormProduct !== 'detail'"
                        class="btn btn-icon btn-white" 
                        @click="onCreate">
                        <i class="fa fa-lw fa-plus" />
                    </button>
                </div>
            </div>

            <div class="margin margin-bottom-15px">
                <SearchField 
                    :placeholder="'Search varians ..'" 
                    :enableResponsive="true" 
                    :onChange="(data) => onSearch(data)" />
            </div>

            <div 
                v-loading="loading" 
                class="margin margin-bottom-15px">
                <AppEmpty v-if="!loading && data.length === 0" />
                <Card 
                    :data.sync="data"
                    @onChangeCover="uploadImage"
                    @onDetail="onDetail"
                    @onEdit="onEdit"
                    @onDelete="onDelete" />
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
                :title="'Delete this varian ?'"
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
import AppEmpty from '../../../../modules/AppEmpty'
import AppPopupLoader from '../../../../modules/AppPopupLoader'
import AppPopupConfirmed from '../../../../modules/AppPopupConfirmed'
import AppPopupAlert from '../../../../modules/AppPopupAlert'
import AppFileUpload from '../../../../modules/AppFileUpload'
import SearchField from '../../../../modules/SearchField'
import Form from './Form'
import Card from './Card'

export default {
    name: 'App',
    data () {
        return {
            formClass: false,
            visibleUpdateCover: false,
            visibleAlert: false,
            titleAlert: 'Failed to preceed data',
            iconAlert: 'fa fa-4x fa-info-circle',
            visibleConfirmed: false,
            visibleConfirmedDelete: false,
            titleConfirmed: 'Save this data ?',
            currentPage: 0,
        }
    },
    mounted () {
        this.resetData()
        this.getData()
    },
    components: {
        AppEmpty,
        AppPopupLoader,
        AppPopupConfirmed,
        AppPopupAlert,
        AppFileUpload,
        SearchField,
        Form,
        Card,
    },
    computed: {
        ...mapState({
            formProduct: (state) => state.storeProduct.form,
            filter: (state) => state.storeProductDetail.filter,
            form: (state) => state.storeProductDetail.form,
            data: (state) => state.storeProductDetail.data,
            totalRecord: (state) => state.storeProductDetail.totalRecord,
            limit: (state) => state.storeProductDetail.limit,
            loading: (state) => state.storeProductDetail.loading,
            loadingForm: (state) => state.storeProductDetail.loadingForm,
            typeForm: (state) => state.storeProductDetail.typeForm,
            typeFormProduct: (state) => state.storeProduct.typeForm,
        }),
        typeForm: {
            get () {
                return this.$store.state.storeProductDetail.typeForm
            },
            set (value) {
                this.$store.state.storeProductDetail.typeForm = value
            }
        },
    },
    methods: {
        ...mapActions({
            getProductDetail: 'storeProductDetail/getData',
            setPagination: 'storeProductDetail/setPagination',
            resetFormData: 'storeProductDetail/resetFormData',
            resetFilter: 'storeProductDetail/resetFilter',
            setFormData: 'storeProductDetail/setFormData',
            createData: 'storeProductDetail/createData',
            updateData: 'storeProductDetail/updateData',
            deleteData: 'storeProductDetail/deleteData',
            uploadCover: 'storeProductDetail/uploadCover',
            resetData: 'storeProductDetail/resetData',
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

        // LIST DATA
        getData () {
            const token = this.$session.get('tokenBearer')
            const product_id = this.formProduct.product_id 
            this.getProductDetail({ token: token, product_id: product_id })
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
            const token = this.$session.get('tokenBearer')
            switch (this.typeForm) {
                case 'create':
                    this.createData({
                        ...this.form,
                        product_id: this.formProduct.id,
                        token: token
                    }).then((res) => {
                        const status = res.data.status 
                        if (status === 'ok') {
                            this.formClass = false 
                            this.getData()
                        } else {
                            this.visibleAlert = true 
                            this.titleAlert = 'Failed to save this varian'
                        }
                    })
                    break
                case 'edit':
                    this.updateData({
                        ...this.form,
                        product_id: this.formProduct.id,
                        token: token
                    }).then((res) => {
                        const status = res.data.status 
                        if (status === 'ok') {
                            this.formClass = false 
                            this.getData()
                        } else {
                            this.visibleAlert = true 
                            this.titleAlert = 'Failed to edit this varian'
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
                    this.titleConfirmed = 'Save this varian ?'
                    break
                case 'edit':
                    this.titleConfirmed = 'Edit this varian ?'
                    break
            }
        },

        // CREATE
        onCreate () {
            this.formClass = true
            this.typeForm = 'create'
            this.resetFormData()
            this.form.shop_id = this.shopId
        },

        // DETAIL
        onDetail (data) {
            this.formClass = true
            this.typeForm = 'detail'
            this.resetFormData()
            this.setFormData(data)
            console.log(data)
        },

        // EDIT
        onEdit (data) {
            this.formClass = true
            this.typeForm = 'edit'
            this.resetFormData()
            this.setFormData(data)
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
            const token = this.$session.get('tokenBearer')
            this.deleteData({
                ...this.form,
                token: token
            }).then((res) => {
                const status = res.data.status 
                if (status === 'ok') {
                    this.getData()
                } else {
                    this.visibleAlert = true 
                    this.titleAlert = 'Failed to delete this varian'
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
            const token = this.$session.get('tokenBearer')
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
    }
}
</script>