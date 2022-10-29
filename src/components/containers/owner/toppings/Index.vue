<template>
    <div 
        id="App" 
        :class="formClass ? 'content-form' : 'content-form hide'">
        <div class="left">
            <div class="display-flex space-between margin margin-bottom-15px">
                <h1 class="fonts big black bold">Extras</h1>
                <div class="display-flex">
                    <button 
                        class="btn btn-icon btn-white" 
                        @click="onRefresh">
                        <i class="fa fa-lw fa-retweet"></i>
                    </button>
                    <button 
                        class="btn btn-icon btn-white" 
                        @click="onCreate">
                        <i class="fa fa-lw fa-plus" />
                    </button>
                    <SearchField 
                        :placeholder="'Search extras ..'" 
                        :enableResponsive="true" 
                        :onChange="(data) => onSearch(data)" 
                        style="margin-left: 5px;" />
                </div>
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
                :title="formTitle" 
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
                :title="'Delete this table ?'"
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
import SearchField from '../../../modules/SearchField'
import Form from './Form'
import Card from './Card'

export default {
    name: 'App',
    data () {
        return {
            formTitle: 'CREATE',
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
            filter: (state) => state.storeTopping.filter,
            form: (state) => state.storeTopping.form,
            data: (state) => state.storeTopping.data,
            totalRecord: (state) => state.storeTopping.totalRecord,
            limit: (state) => state.storeTopping.limit,
            loading: (state) => state.storeTopping.loading,
            loadingForm: (state) => state.storeTopping.loadingForm,
        }),
    },
    methods: {
        ...mapActions({
            getTable: 'storeTopping/getData',
            setPagination: 'storeTopping/setPagination',
            resetFormData: 'storeTopping/resetFormData',
            resetFilter: 'storeTopping/resetFilter',
            setFormData: 'storeTopping/setFormData',
            createData: 'storeTopping/createData',
            updateData: 'storeTopping/updateData',
            deleteData: 'storeTopping/deleteData',
            uploadCover: 'storeTopping/uploadCover',
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
            this.getTable({ token })
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
            switch (this.formTitle) {
                case 'CREATE':
                    this.createData({
                        ...this.form,
                        token: token
                    }).then((res) => {
                        const status = res.data.status 
                        if (status === 'ok') {
                            this.formClass = false 
                            this.getData()
                        } else {
                            this.visibleAlert = true 
                            this.titleAlert = 'Failed to save this table'
                        }
                    })
                    break
                case 'EDIT':
                    this.updateData({
                        ...this.form,
                        token: token
                    }).then((res) => {
                        const status = res.data.status 
                        if (status === 'ok') {
                            this.formClass = false 
                            this.getData()
                        } else {
                            this.visibleAlert = true 
                            this.titleAlert = 'Failed to edit this table'
                        }
                    })
                    break
            }
        },

        // SAVE
        onOpenVisibleConfirmed () {
            this.visibleConfirmed = true
            switch (this.formTitle) {
                case 'CREATE':
                    this.titleConfirmed = 'Save this table ?'
                    break
                case 'EDIT':
                    this.titleConfirmed = 'Edit this table ?'
                    break
            }
        },

        // CREATE
        onCreate () {
            this.formClass = true
            this.formTitle = 'CREATE'
            this.resetFormData()
            this.form.shop_id = this.shopId
        },

        // DETAIL
        onDetail (data) {
            this.formClass = true
            this.formTitle = 'DETAIL'
            this.resetFormData()
            this.setFormData(data)
            console.log(data)
        },

        // EDIT
        onEdit (data) {
            this.formClass = true
            this.formTitle = 'EDIT'
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
                    this.titleAlert = 'Failed to delete this table'
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