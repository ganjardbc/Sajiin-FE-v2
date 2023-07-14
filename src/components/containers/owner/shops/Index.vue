<template>
    <div 
        id="App" 
        :class="formClass ? 'content-form' : 'content-form hide'">
        <div class="left">
            <!-- <div 
                v-if="dataUser" 
                class="width width-70 width-center width-mobile margin margin-bottom-30px">
                <div class="card bg-white box-shadow no-padding">
                    <div class="display-flex space-between align-center padding padding-15px">
                        <div class="width width-120px">
                            <div 
                                class="image image-100px image-circle border-full" 
                                style="text-align: center;">
                                <img 
                                    v-if="dataUser && dataUser.image" 
                                    :src="dataUser && dataUser.image ? (adminImageThumbnailUrl + dataUser.image) : ''" 
                                    alt="">
                                <i 
                                    v-else 
                                    class="post-top fa fa-lg fa-user-circle" 
                                    style="color: #999;" />
                            </div>
                        </div>
                        <div 
                            class="display-flex space-between display-mobile align-center" 
                            style="width: calc(100% - 120px);">
                            <div>
                                <div class="fonts big black bold">{{ dataUser && dataUser.name }}</div>
                                <div class="fonts fonts-11 grey" style="text-transform: capitalize;">{{ dataUser && dataUser.role_name }}</div>
                            </div>
                            <div class="display-flex" style="margin: 15px 0;">
                                <router-link 
                                    :to="{name: 'owner-profile'}" 
                                    class="btn btn-sekunder">
                                    View Profile <i class="icn icn-right fa fa-lg fa-arrow-right"></i>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->

            <div class="display-flex space-between display-mobile margin margin-bottom-15px">
                <div class="width width-75 width-mobile display-flex space-between">
                    <h1 class="fonts big black bold">Shops</h1>
                    <div class="display-flex">
                        <button 
                            class="btn btn-icon btn-white" 
                            @click="onRefresh">
                            <i class="fa fa-lw fa-retweet"></i>
                        </button>
                    </div>
                </div>
                <div class="width width-25 width-mobile">
                    <SearchField 
                        :placeholder="'Search shops ..'" 
                        :enableResponsive="true" 
                        :onChange="(data) => onSearch(data)" />
                </div>
            </div>
            
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

            <el-alert
                title="Create New Shop ?"
                description="To create new shop please contact Sajiin Admin and follow the instructions."
                type="warning"
                :closable="true"
                show-icon
                style="margin-bottom: 15px;">
            </el-alert>

            <div class="width width-100">
                <div v-loading="loading">
                    <AppEmpty v-if="data.length === 0" />
                    <Card 
                        :data.sync="data"
                        @onChangeCover="uploadImage"
                        @onDetail="onDetail"
                        @onEdit="onEdit"
                        @onDelete="onDelete"
                        @onManage="onManage"
                        @onChangeStatus="onChangeStatus"
                        @onQrCode="onOpenQrCode" />
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
                :title="'Delete this shop ?'"
                @onClickNo="onClickNoDelete"
                @onClickYes="onClickYesDelete"
            />

            <AppPopupAlert 
                v-if="visibleAlert"
                :title="titleAlert"
                :icon="iconAlert"
                @onClickOk="onClickOk"
            />

            <AppPopupQrCode 
                v-if="visibleQrCode"
                :data="form"
                @onClose="onCloseQrCode"
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
import AppPopupQrCode from '../../../modules/AppPopupQrCode'
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
        title: 'Owner',
        titleTemplate: '%s | Shops',
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
            visibleQrCode: false,
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
        this.onChangeTabs(0)
    },
    components: {
        AppTabs,
        AppEmpty,
        AppPopupLoader,
        AppPopupConfirmed,
        AppPopupAlert,
        AppFileUpload,
        AppPopupQrCode,
        SearchField,
        Form,
        Card,
    },
    computed: {
        ...mapState({
            filter: (state) => state.storeShop.filter,
            form: (state) => state.storeShop.form,
            data: (state) => state.storeShop.data,
            totalRecord: (state) => state.storeShop.totalRecord,
            limit: (state) => state.storeShop.limit,
            loading: (state) => state.storeShop.loading,
            loadingForm: (state) => state.storeShop.loadingForm,
            typeForm: (state) => state.storeShop.typeForm,
            dataAuth: (state) => state.storeAuth.data,
        }),
        dataUser () {
            return this.dataAuth && this.dataAuth.user
        },
        typeForm: {
            get () {
                return this.$store.state.storeShop.typeForm
            },
            set (value) {
                this.$store.state.storeShop.typeForm = value
            }
        },
    },
    methods: {
        ...mapActions({
            getShop: 'storeShop/getData',
            setPagination: 'storeShop/setPagination',
            resetFormData: 'storeShop/resetFormData',
            resetFilter: 'storeShop/resetFilter',
            setFormData: 'storeShop/setFormData',
            createData: 'storeShop/createData',
            updateData: 'storeShop/updateData',
            deleteData: 'storeShop/deleteData',
            uploadCover: 'storeShop/uploadCover',
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
        getData () {
            const token = this.$cookies.get('tokenBearer')
            this.getShop({ token })
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
                                message: 'Failed to save this shop',
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
                                message: 'Failed to edit this shop',
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
                    this.titleConfirmed = 'Save this shop ?'
                    break
                case 'edit':
                    this.titleConfirmed = 'Edit this shop ?'
                    break
            }
        },

        // CREATE
        onCreate () {
            this.formClass = true
            this.typeForm = 'create'
            this.resetFormData()
        },

        // DETAIL
        onDetail (data) {
            this.formClass = true
            this.typeForm = 'detail'
            this.resetFormData()
            this.setFormData(data)
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
                    this.titleAlert = 'Failed to delete this shop'
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

        // MANAGE
        onManage (data) {
            this.$store.state.storeSelectedShop.selectedData = data.id
            this.$router.push({ name: 'shop-home', params: { shopId: data.shop_id } })
            // window.location = `/shop/${data.shop_id}/home`
        },

        // STATUS
        onChangeStatus (data) {
            this.setFormData(data)
            const token = this.$cookies.get('tokenBearer')
            this.updateData({
                ...this.form,
                token: token
            }).then((res) => {
                const status = res.data.status 
                if (status === 'ok') {
                    this.$message(`Success changed status for shop ${data.name}.`)
                } else {
                    this.$message({
                        message: `Failed to change status for shop ${data.name}.`,
                        type: 'error'
                    })
                }
            })
        },

        // QR CODE
        onOpenQrCode (data) {
            this.visibleQrCode = true 
            this.setFormData(data)
        },
        onCloseQrCode () {
            this.visibleQrCode = false 
        }
    }
}
</script>