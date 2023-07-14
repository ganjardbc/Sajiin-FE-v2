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
                        <div class="image image-150px image-circle border-full" style="margin: auto; text-align: center;">
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
                        <div class="card no-padding-mobile box-shadow bg-white margin margin-bottom-20px">
                            <div class="fonts fonts-13 black semibold">General Info</div>
                            <div class="field-group">
                                <div class="field-label">ID</div>
                                <el-input 
                                    placeholder=""
                                    type="text"
                                    v-model="form.id"
                                    :disabled="true"></el-input>
                                <div 
                                    v-if="errorMessage.id" 
                                    class="field-error">
                                    {{ errorMessage.id && errorMessage.id[0] }}
                                </div>
                            </div>
                            <div class="field-group">
                                <div class="field-label">Full Name</div>
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
                                <div class="field-caption">To change your email just fill again your new email</div>
                                <el-input 
                                    placeholder=""
                                    type="email"
                                    v-model="form.email"
                                    :disabled="false"></el-input>
                                <div 
                                    v-if="errorMessage.email" 
                                    class="field-error">
                                    {{ errorMessage.email && errorMessage.email[0] }}
                                </div>
                            </div>
                            <div class="field-group">
                                <div class="field-label">Username</div>
                                <el-input 
                                    placeholder=""
                                    type="text"
                                    v-model="form.username"
                                    :disabled="false"></el-input>
                                <div 
                                    v-if="errorMessage.username" 
                                    class="field-error">
                                    {{ errorMessage.username && errorMessage.username[0] }}
                                </div>
                            </div>
                        </div>

                        <div class="card no-padding-mobile box-shadow bg-white margin margin-bottom-20px">
                            <div class="fonts fonts-13 black semibold">Private Info</div>
                            <div class="field-group">
                                <div class="field-label">Role</div>
                                <el-input 
                                    placeholder=""
                                    type="text"
                                    v-model="form.role_name"
                                    :disabled="true"></el-input>
                                <div 
                                    v-if="errorMessage.role_name" 
                                    class="field-error">
                                    {{ errorMessage.role_name && errorMessage.role_name[0] }}
                                </div>
                            </div>
                        </div>

                        <div class="display-flex flex-end">
                            <button class="btn btn-main btn-full" @click="onSaveSubmit">
                                Update Data
                            </button>
                        </div>
                    </div>

                    <div v-if="selectedIndex === 1">
                        <div class="card no-padding-mobile box-shadow bg-white margin margin-bottom-20px">
                            <div class="fonts fonts-13 black semibold">Change Password</div>
                            <div class="field-group">
                                <div class="field-label">New Password</div>
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

                        <div class="display-flex flex-end">
                            <button 
                                :disabled="form.password ? false : true"
                                class="btn btn-main btn-full" 
                                @click="onSaveSubmit">
                                Change Password
                            </button>
                        </div>
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
    {id: 2, label: 'Change Password', status: ''},
]

export default {
    name: 'App',
    metaInfo: {
        title: 'Owner',
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
        this.getData()
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
            form: (state) => state.storeProfile.form,
            errorMessage: (state) => state.storeProfile.errorMessage,
            loading: (state) => state.storeProfile.loading,
            loadingForm: (state) => state.storeProfile.loadingForm,
        }),
        getImage () {
            return this.form.image ? this.adminImageThumbnailUrl + this.form.image : ''
        }
    },
    methods: {
        ...mapActions({
            getUser: 'storeProfile/getData',
            logout: 'storeProfile/logout',
            updateData: 'storeProfile/updateData',
            uploadCover: 'storeProfile/uploadCover',
            setDataAuth: 'storeAuth/setData',
        }),
        onChangeTabs (data) {
            this.selectedIndex = data 
        },
        getData () {
            const token = this.$cookies.get('tokenBearer')
            this.getUser(token)
                .then((res) => {
                    const data = res.data.data
                    this.setDataAuth(data)
                    this.$cookies.set('user', data.user)
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