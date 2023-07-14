<template>
    <div id="App" class="card-dashboard-container">
        <div class="padding padding-bottom-15px">
            <h1 class="fonts big black bold">Profile</h1>
        </div>
        <div 
            v-loading="loading" 
            class="display-flex display-mobile space-between padding padding-top-10px padding-bottom-10px">
            <div class="width width-30 width-mobile" style="margin-bottom: 30px;">
                <div class="card no-padding-mobile box-shadow bg-white">
                    <div class="content-center margin margin-bottom-20px">
                        <div class="image image-150px border-full" style="margin: auto; text-align: center;">
                            <i 
                                v-if="!getImage" 
                                class="post-middle-absolute fonts grey fa fa-2x fa-user-circle" />
                            <img v-else :src="getImage" alt="">
                        </div>
                    </div>
                    <button 
                        class="btn btn-sekunder btn-full margin margin-top-20px" 
                        @click="onButtonUpload">
                        Change Cover
                    </button>
                    <div class="border border-bottom margin margin-top-20-px"></div>
                    <button 
                        class="btn btn-primary btn-full margin margin-top-20px" 
                        @click="onLogout">
                        Logout
                    </button>
                </div>
            </div>
            <div class="width width-70 width-mobile">
                <div class="padding padding-left-30px no-margin-padding">
                    <AppTabs
                        :isFull="true" 
                        :selectedIndex.sync="selectedIndex" 
                        :data="tabs" 
                        :onChange="(data) => onChangeTabs(data)"
                        class="margin margin-bottom-20px" />
                    
                    <div v-if="selectedIndex === 0">
                        <div 
                            v-if="form.shop && form.role && form.shift" 
                            class="card no-padding-mobile box-shadow bg-white margin margin-bottom-20px">
                            <div class="width width-100">
                                <div class="fonts fonts-13 black semibold">Private Info</div>
                                <div class="display-flex space-between padding padding-top-10px">
                                    <div class="fonts micro black semibold" style="width: 140px;">Shop</div>
                                    <div class="fonts micro black" style="width: calc(100% - 140px);">
                                        {{ form.shop && form.shop.name }}
                                    </div>
                                </div>
                                <div class="display-flex space-between">
                                    <div class="fonts micro black semibold" style="width: 140px;">Role & Position</div>
                                    <div class="fonts micro black" style="width: calc(100% - 140px);">
                                        {{ form.role && form.role.description }}
                                    </div>
                                </div>
                                <div class="display-flex space-between">
                                    <div class="fonts micro black semibold" style="width: 140px;">Shift</div>
                                    <div style="width: calc(100% - 140px);">
                                        <div class="fonts micro black">
                                            {{ form.shift && form.shift.title }}
                                        </div>
                                        <div class="fonts micro black">
                                            {{ form.shift && form.shift.start_time }} - {{ form.shift && form.shift.end_time }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="card no-padding-mobile box-shadow bg-white margin margin-bottom-20px">
                            <div class="fonts fonts-13 black semibold">General Info</div>
                            <div class="field-group">
                                <div class="field-label">Employee ID</div>
                                <el-input 
                                    placeholder=""
                                    type="text"
                                    v-model="form.employee_id"
                                    :disabled="true"></el-input>
                                <div 
                                    v-if="errorMessage.employee_id" 
                                    class="field-error">
                                    {{ errorMessage.employee_id && errorMessage.employee_id[0] }}
                                </div>
                            </div>
                            <div class="field-group">
                                <div class="field-label">Name</div>
                                <el-input 
                                    placeholder=""
                                    type="text"
                                    v-model="form.name"
                                    :disabled="false"></el-input>
                                <div 
                                    v-if="errorMessage.name" 
                                    class="field-error">
                                    {{ errorMessage.name && errorMessage.name[0] }}
                                </div>
                            </div>
                            <div class="field-group">
                                <div class="field-label">Email</div>
                                <el-input 
                                    placeholder=""
                                    type="text"
                                    v-model="form.email"
                                    :disabled="false"
                                    @input="onChangeEmail"></el-input>
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
                                    :disabled="false"></el-input>
                                <div 
                                    v-if="errorMessage.phone" 
                                    class="field-error">
                                    {{ errorMessage.phone && errorMessage.phone[0] }}
                                </div>
                            </div>
                            <div class="field-group">
                                <div class="field-label">Address</div>
                                <el-input 
                                    placeholder=""
                                    type="textarea"
                                    v-model="form.address"
                                    :disabled="false"
                                    :autosize="{ minRows: 2, maxRows: 2}"></el-input>
                                <div 
                                    v-if="errorMessage.address" 
                                    class="field-error">
                                    {{ errorMessage.address && errorMessage.address[0] }}
                                </div>
                            </div>
                            <div class="field-group">
                                <div class="field-label">About (optional)</div>
                                <el-input 
                                    placeholder=""
                                    type="textarea"
                                    v-model="form.about"
                                    :disabled="false"
                                    :autosize="{ minRows: 2, maxRows: 2}"></el-input>
                                <div 
                                    v-if="errorMessage.about" 
                                    class="field-error">
                                    {{ errorMessage.about && errorMessage.about[0] }}
                                </div>
                            </div>
                        </div>

                        <div class="card no-padding-mobile box-shadow bg-white margin margin-bottom-20px">
                            <div class="fonts fonts-13 black semibold">Configuration</div>
                            <div class="field-group">
                                <div class="field-label">Status</div>
                                <div class="display-flex space-between">
                                    <div class="fonts micro black">Is this employee {{ form.status === 'active' ? 'Inactive' : 'Active' }} ?</div>
                                    <el-switch 
                                        v-model="form.status"
                                        :disabled="false"
                                        :active-value="'active'"
                                        :inactive-value="'inactive'"></el-switch>
                                </div>
                                <div 
                                    v-if="errorMessage.status" 
                                    class="field-error">
                                    {{ errorMessage.status && errorMessage.status[0] }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="selectedIndex === 1">
                        <div class="card no-padding-mobile box-shadow bg-white margin margin-bottom-20px">
                            <div class="margin margin-bottom-20px">
                                <div class="fonts fonts-13 black semibold">User</div>
                                <div class="field-group">
                                    <div class="field-label">Username</div>
                                    <div class="field-caption">Create new username or change current username.</div>
                                    <div v-if="form.user_username_old" class="field-caption">This current username is "{{ form.user_username_old }}".</div>
                                    <el-input 
                                        placeholder=""
                                        type="text"
                                        v-model="form.username"
                                        :disabled="false"
                                        @input="onChageUsername"></el-input>
                                    <div 
                                        v-if="errorMessage.username" 
                                        class="field-error">
                                        {{ errorMessage.username && errorMessage.username[0] }}
                                    </div>
                                </div>
                                <div class="field-group">
                                    <div class="field-label">Password</div>
                                    <div class="field-caption">Create new password or change current password.</div>
                                    <el-input 
                                        placeholder=""
                                        type="password"
                                        v-model="form.password"
                                        :disabled="false"
                                        show-password></el-input>
                                    <div 
                                        v-if="errorMessage.password" 
                                        class="field-error">
                                        {{ errorMessage.password && errorMessage.password[0] }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="display-flex flex-end">
                        <button class="btn btn-main btn-full" @click="onSaveSubmit">
                            Update Data
                        </button>
                    </div>

                </div>
            </div>
        </div>

        <AppFileUpload 
            v-if="visibleUpdateCover"
            @onClose="onCloseCover"
            @onUpload="onUpdateCover"
        />

        <AppPopupConfirmed 
            v-if="visibleConfirmedUpdate"
            :title="'Update your data ?'"
            @onClickNo="onClickNoUpdate"
            @onClickYes="onClickYesUpdate"
        />
        
        <AppPopupConfirmed 
            v-if="visibleConfirmedLogout"
            :title="'Logout from your account ?'"
            @onClickNo="onClickNoLogout"
            @onClickYes="onClickYesLogout"
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
</template>
<script>
import { mapActions, mapState } from 'vuex'
import AppPopupConfirmed from '../../../modules/AppPopupConfirmed'
import AppPopupLoader from '../../../modules/AppPopupLoader'
import AppPopupAlert from '../../../modules/AppPopupAlert'
import AppFileUpload from '../../../modules/AppFileUpload'
import AppTabs from '../../../modules/AppTabs'

const tabs = [
    {id: 1, label: 'Data', status: 'active'},
    // {id: 2, label: 'Position', status: ''},
    {id: 2, label: 'User', status: ''},
]

export default {
    name: 'App',
    metaInfo: {
        title: 'Employee',
        titleTemplate: '%s | Profile',
        htmlAttrs: {
            lang: 'en',
            amp: true
        }
    },
    data () {
        return {
            tabs: tabs,
            selectedIndex: 0,
            visibleUpdateCover: false,
            visibleConfirmedLogout: false, 
            visibleConfirmedUpdate: false,
            visibleAlert: false,
            titleAlert: 'Failed to proceed data',
            iconAlert: 'fa fa-4x fa-info-circle',
        }
    },
    mounted () {
        this.getAllData()
    },
    watch: {
        shopId (prevProps, nextProps) {
            if (prevProps !== nextProps) {
                this.getAllData()
            }
        }
    },
    components: {
        AppTabs,
        AppFileUpload,
        AppPopupConfirmed,
        AppPopupLoader,
        AppPopupAlert,
    },
    computed: {
        ...mapState({
            form: (state) => state.storeEmployee.form,
            errorMessage: (state) => state.storeEmployee.errorMessage,
            loading: (state) => state.storeEmployee.loading,
        }),
        loadingForm: {
            set(value) {
                this.$store.state.storeProfile.loadingForm = value 
            },
            get() {
                return this.$store.state.storeProfile.loadingForm
            }
        },
        getImage () {
            return this.form.image ? this.employeeImageThumbnailUrl + this.form.image : ''
        },
        shopId () {
            return this.$store.state.storeSelectedShop.selectedData
        },
    },
    methods: {
        ...mapActions({
            getById: 'storeEmployee/getById',
            updateData: 'storeEmployee/updateData',
            uploadCover: 'storeEmployee/uploadCover',
            logout: 'storeEmployee/logout',
            setDataAuth: 'storeAuth/setData',
        }),
        onChageUsername (value) {
            this.form.user_username = value.replace(/[ ]/g,'_')
        },
        onChangeEmail (data) {
            this.form.user_email = data 
        },
        onChangeTabs (data) {
            this.selectedIndex = data 
        },

        // LIST DATA
        getAllData () {
            this.getData()
        },
        getData () {
            const token = this.$cookies.get('tokenBearer')
            const employee = this.$cookies.get('employee')
            const employee_id = employee.employee_id;
            this.getById({ token, employee_id: employee_id })
                .then((res) => {
                    const data = {
                        ...res.data.data,
                        user: {
                            ...res.data.data.user,
                            main_role_id: res.data.data.role.role_id,
                            role_name: res.data.data.role.role_name 
                        }
                    }
                    this.setDataAuth(data)
                    this.$cookies.set('user', data.user)
                    this.$cookies.set('role', data.role)
                    this.$cookies.set('employee', data.employee)
                })
        },

        // ALERT
        onClickOk () {
            this.visibleAlert = false
        },

        // UPDATE 
        onSaveSubmit () {
            this.visibleConfirmedUpdate = true 
        },
        onClickNoUpdate () {
            this.visibleConfirmedUpdate = false 
        },
        onClickYesUpdate () {
            this.visibleConfirmedUpdate = false 
            const token = this.$cookies.get('tokenBearer')
            this.updateData({
                ...this.form,
                token
            }).then((res) => {
                const status = res.data.status 
                if (status === 'ok') {
                    this.getData()
                    this.$message('Success edit profile')
                } else {
                    this.$message({
                        message: 'Failed to edit profile',
                        type: 'error'
                    })
                }
            })
        },

        // LOGOUT
        onLogout () {
            this.visibleConfirmedLogout = true
        },
        onClickNoLogout () {
            this.visibleConfirmedLogout = false
        },
        onClickYesLogout () {
            this.loadingForm = true
            this.visibleConfirmedLogout = false
            const token = this.$cookies.get('tokenBearer')
            this.logout(token)
                .then((res) => {
                    if (res.data.status === 'ok') {
                        this.$cookies.remove('token')
                        this.$cookies.remove('tokenBearer')
                        this.$cookies.remove('user')
                        this.$cookies.remove('role')
                        this.$cookies.remove('shop')
                        this.$cookies.remove('employee')
                        this.$cookies.remove('permissions')

                        this.$router.push({ name: 'login' })
                    }
                })
                .finally(() => {
                    this.loadingForm = false 
                })
        },

        // IMAGE
        onButtonUpload () {
            this.visibleUpdateCover = true
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
    }
}
</script>