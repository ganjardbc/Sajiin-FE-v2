<template>
    <div 
        id="App" 
        :class="formClass ? 'content-form' : 'content-form hide'">
        <div class="left">
            <div class="margin margin-bottom-15px">
                <div class="width width-100 display-flex space-between">
                    <h1 class="fonts medium black bold">Permissions</h1>
                    <div class="display-flex">
                        <button 
                            class="btn btn-icon btn-white" 
                            @click="onRefresh">
                            <i class="fa fa-lw fa-retweet"></i>
                        </button>
                        <button 
                            v-if="roleTypeForm !== 'detail'"
                            class="btn btn-icon btn-white" 
                            @click="onCreate">
                            <i class="fa fa-lw fa-plus" />
                        </button>
                    </div>
                </div>
            </div>

            <div 
                v-loading="loading" 
                class="margin margin-bottom-15px">
                <Card 
                    :data.sync="data"
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
                @onSelect="onSelect"
                @onSave="onSelect"
                @onClose="onClose">
            </Form>

            <AppPopupConfirmed 
                v-if="visibleConfirmed"
                :title="titleConfirmed"
                @onClickNo="onClickNo"
                @onClickYes="onClickYes"
            />

            <AppPopupConfirmed 
                v-if="visibleConfirmedDelete"
                :title="'Delete this permission ?'"
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
import SearchField from '../../../../modules/SearchField'
import Form from './Form'
import Card from './Card'

export default {
    name: 'App',
    data () {
        return {
            formClass: false,
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
        SearchField,
        Form,
        Card,
    },
    computed: {
        ...mapState({
            filter: (state) => state.storeRolePermissions.filter,
            form: (state) => state.storeRolePermissions.form,
            data: (state) => state.storeRolePermissions.data,
            totalRecord: (state) => state.storeRolePermissions.totalRecord,
            limit: (state) => state.storeRolePermissions.limit,
            loading: (state) => state.storeRolePermissions.loading,
            loadingForm: (state) => state.storeRolePermissions.loadingForm,
            typeForm: (state) => state.storeRolePermissions.typeForm,
            roleForm: (state) => state.storeRoles.form,
            roleTypeForm: (state) => state.storeRoles.typeForm,
        }),
        typeForm: {
            get () {
                return this.$store.state.storeRolePermissions.typeForm
            },
            set (value) {
                this.$store.state.storeRolePermissions.typeForm = value
            }
        },
    },
    methods: {
        ...mapActions({
            getRoles: 'storeRolePermissions/getData',
            setPagination: 'storeRolePermissions/setPagination',
            resetFormData: 'storeRolePermissions/resetFormData',
            resetFilter: 'storeRolePermissions/resetFilter',
            setFormData: 'storeRolePermissions/setFormData',
            createData: 'storeRolePermissions/createData',
            deleteData: 'storeRolePermissions/deleteData',
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
            const token = this.$cookies.get('tokenBearer')
            const role_id = this.roleForm.id 
            this.getRoles({ token: token, role_id: role_id })
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

        // CREATE
        onCreate () {
            this.formClass = true
            this.typeForm = 'create'
            this.resetFormData()
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
                    this.titleAlert = 'Failed to delete this permission'
                }
            })
        },

        // SELECT
        onSelect (data) {
            const token = this.$cookies.get('tokenBearer')
            const payload = {
                token: token,
                role_id: this.roleForm.id,
                permission_id: data.id,
            }
            this.createData(payload)
                .then((res) => {
                    const status = res.data.status 
                    if (status === 'ok') {
                        this.formClass = false 
                        this.getData()
                    } else {
                        this.$message({
                            message: 'Failed to add this permission',
                            type: 'error'
                        })
                    }
                })
        }
    }
}
</script>