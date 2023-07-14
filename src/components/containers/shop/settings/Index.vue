<template>
    <div id="App" class="card-dashboard-container">
        <div class="padding padding-bottom-15px">
            <h1 class="fonts big black bold">Settings</h1>
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
                        class="btn btn-main-reverse with-hover btn-full margin margin-top-20px"
                        @click="onOpenQrCode">
                        Show QR-Code 
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
                                <div class="field-label">Shop ID</div>
                                <el-input 
                                    placeholder=""
                                    type="text"
                                    v-model="form.shop_id"
                                    :disabled="true"></el-input>
                                <div 
                                    v-if="errorMessage.shop_id" 
                                    class="field-error">
                                    {{ errorMessage.shop_id && errorMessage.shop_id[0] }}
                                </div>
                            </div>
                            <div class="field-group">
                                <div class="field-label">Name</div>
                                <el-input 
                                    placeholder=""
                                    type="text"
                                    v-model="form.name"></el-input>
                                <div 
                                    v-if="errorMessage.name" 
                                    class="field-error">
                                    {{ errorMessage.name && errorMessage.name[0] }}
                                </div>
                            </div>
                            <div class="field-group">
                                <div class="field-label">About</div>
                                <el-input 
                                    placeholder=""
                                    type="textarea"
                                    v-model="form.about"
                                    :autosize="{ minRows: 2, maxRows: 2}"></el-input>
                                <div 
                                    v-if="errorMessage.about" 
                                    class="field-error">
                                    {{ errorMessage.about && errorMessage.about[0] }}
                                </div>
                            </div>
                            <div class="field-group">
                                <div class="field-label">Address</div>
                                <el-input 
                                    placeholder=""
                                    type="textarea"
                                    v-model="form.location"
                                    :autosize="{ minRows: 2, maxRows: 2}"></el-input>
                                <div 
                                    v-if="errorMessage.location" 
                                    class="field-error">
                                    {{ errorMessage.location && errorMessage.location[0] }}
                                </div>
                            </div>
                        </div>
                    </div> 

                    <div v-if="selectedIndex === 1">
                        <div class="card no-padding-mobile box-shadow bg-white margin margin-bottom-20px">
                            <div class="fonts fonts-13 black semibold">Opening Hour</div>
                            <div class="display-flex">
                                <div class="field-group" style="width: calc(100% - 10px); margin-right: 10px;">
                                    <div class="field-label">Open Day</div>
                                    <el-select 
                                        v-model="form.open_day" 
                                        placeholder="Select"
                                        no-data-text="No Data Disaplayed">
                                        <el-option
                                            v-for="item in dayLists"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                        </el-option>
                                    </el-select>
                                    <div 
                                        v-if="errorMessage.open_day" 
                                        class="field-error">
                                        {{ errorMessage.open_day && errorMessage.open_day[0] }}
                                    </div>
                                </div>
                                <div class="field-group" style="width: calc(100% - 10px); margin-left: 10px;">
                                    <div class="field-label">Close Day</div>
                                    <el-select 
                                        v-model="form.close_day" 
                                        placeholder="Select"
                                        no-data-text="No Data Disaplayed">
                                        <el-option
                                            v-for="item in dayLists"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                        </el-option>
                                    </el-select>
                                    <div 
                                        v-if="errorMessage.close_day" 
                                        class="field-error">
                                        {{ errorMessage.close_day && errorMessage.close_day[0] }}
                                    </div>
                                </div>
                            </div>
                            <div class="display-flex">
                                <div class="field-group" style="width: calc(100% - 10px); margin-right: 10px;">
                                    <div class="field-label">Open Time</div>
                                    <el-input 
                                        placeholder=""
                                        v-model="form.open_time"
                                        type="time">
                                    </el-input>
                                    <div 
                                        v-if="errorMessage.open_time" 
                                        class="field-error">
                                        {{ errorMessage.open_time && errorMessage.open_time[0] }}
                                    </div>
                                </div>
                                <div class="field-group" style="width: calc(100% - 10px); margin-left: 10px;">
                                    <div class="field-label">Close Time</div>
                                    <el-input 
                                        placeholder=""
                                        v-model="form.close_time"
                                        type="time">
                                    </el-input>
                                    <div 
                                        v-if="errorMessage.close_time" 
                                        class="field-error">
                                        {{ errorMessage.close_time && errorMessage.close_time[0] }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="selectedIndex === 2">
                        <div class="card no-padding-mobile box-shadow bg-white margin margin-bottom-20px">
                            <div class="fonts fonts-13 black semibold">Contact</div>
                            <div class="field-group">
                                <div class="field-label">Email</div>
                                <el-input 
                                    placeholder=""
                                    type="email"
                                    v-model="form.email"></el-input>
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
                                    type="number"
                                    v-model="form.phone"></el-input>
                                <div 
                                    v-if="errorMessage.phone" 
                                    class="field-error">
                                    {{ errorMessage.phone && errorMessage.phone[0] }}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div v-if="selectedIndex === 3">
                        <div class="card no-padding-mobile box-shadow bg-white margin margin-bottom-20px">
                            <div class="fonts fonts-13 black semibold">Configuration</div>
                            <div class="field-group">
                                <div class="field-label">Status</div>
                                <div class="display-flex space-between">
                                    <div class="fonts micro black">Is this shop {{ form.status === 'active' ? 'Inactive' : 'Active' }} ?</div>
                                    <el-switch 
                                        v-model="form.status"
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
                                <div class="field-label">Digital Menu</div>
                                <div class="display-flex space-between">
                                    <div class="fonts micro black">Activated digital menu ?</div>
                                    <el-switch 
                                        v-model="form.is_digital_menu_active"
                                        :active-value="1"
                                        :inactive-value="0"
                                        @change="onChangeDigitalMenu"></el-switch>
                                </div>
                                <div 
                                    v-if="errorMessage.is_digital_menu_active" 
                                    class="field-error">
                                    {{ errorMessage.is_digital_menu_active && errorMessage.is_digital_menu_active[0] }}
                                </div>

                                <div class="display-flex space-between margin margin-top-10px">
                                    <div class="fonts micro black">Activated digital order ?</div>
                                    <el-switch 
                                        v-model="form.is_digital_order_active"
                                        :active-value="1"
                                        :inactive-value="0"
                                        @change="onChangeDigitalOrder"></el-switch>
                                </div>
                                <div 
                                    v-if="errorMessage.is_digital_order_active" 
                                    class="field-error">
                                    {{ errorMessage.is_digital_order_active && errorMessage.is_digital_order_active[0] }}
                                </div>
                            </div>
                            <div v-if="form.is_digital_menu_active" class="field-group">
                                <AppShopLink :link="`${initUrl}visitor/${form.shop_id}`" />
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

        <AppPopupQrCode 
            v-if="visibleQrCode"
            :data="form"
            @onClose="onCloseQrCode"
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
import AppPopupQrCode from '../../../modules/AppPopupQrCode'
import AppTabs from '../../../modules/AppTabs'
import AppShopLink from '../../../modules/AppShopLink'

const tabs = [
    {id: 1, label: 'General Info', status: 'active'},
    {id: 2, label: 'Opening Hour', status: ''},
    {id: 3, label: 'Contact', status: ''},
    {id: 4, label: 'Configuration', status: ''},
]

export default {
    name: 'App',
    metaInfo: {
        title: 'Shop',
        titleTemplate: '%s | Settings',
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
            visibleQrCode: false,
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
        AppPopupQrCode,
        AppShopLink,
    },
    computed: {
        ...mapState({
            form: (state) => state.storeShop.form,
            errorMessage: (state) => state.storeShop.errorMessage,
            loading: (state) => state.storeShop.loading,
            loadingForm: (state) => state.storeShop.loadingForm,
            dayLists: (state) => state.storeShop.dayLists,
        }),
        getImage () {
            return this.form.image ? this.shopImageThumbnailUrl + this.form.image : ''
        }
    },
    methods: {
        ...mapActions({
            getShopByID: 'storeShop/getByID',
            logout: 'storeShop/logout',
            updateData: 'storeShop/updateData',
            uploadCover: 'storeShop/uploadCover',
            setDataAuth: 'storeAuth/setData',
        }),
        onChangeTabs (data) {
            this.selectedIndex = data 
        },
        getData () {
            const token = this.$cookies.get('tokenBearer')
            const shop_id = this.$route.params.shopId
            this.getShopByID({
                token: token,
                shop_id: shop_id,
            })
        },
        onChangeDigitalMenu (data) {
            this.form.is_digital_menu_active = data
            this.form.is_digital_order_active = 0
        },
        onChangeDigitalOrder (data) {
            this.form.is_digital_order_active = data
            this.form.is_digital_menu_active = 1
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
                    this.$message('Success edit this shop')
                } else {
                    this.$message({
                        message: 'Failed to edit this shop',
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
            this.visibleConfirmedLogout = false
            const token = this.$cookies.get('tokenBearer')
            this.logout(token).then((res) => {
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

        // QR CODE
        onOpenQrCode () {
            this.visibleQrCode = true 
        },
        onCloseQrCode () {
            this.visibleQrCode = false 
        }
    }
}
</script>