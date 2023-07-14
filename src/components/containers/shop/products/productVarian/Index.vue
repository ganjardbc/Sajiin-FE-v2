<template>
    <div id="App" :class="formClass ? 'content-form' : 'content-form hide'">
        <div class="left">
            <div class="display-flex space-between margin margin-bottom-5px">
                <h1 class="fonts big black bold">Varians</h1>
                <div v-if="isRoleOwner" class="display-flex">
                    <button 
                        v-if="typeForm !== 'detail'"
                        class="btn btn-white" 
                        @click="onCreate">
                        <i class="icn icn-left fa fa-lw fa-plus" /> Add Varian
                    </button>
                </div>
            </div>

            <el-alert 
                v-if="!isRoleOwner"
                title="Create New Varians ?"
                description="To create new varians please contact your Owner."
                type="warning"
                :closable="true"
                show-icon
                style="margin: 10px 0 20px 0;">
            </el-alert>

            <AppEmpty v-if="productDetails.length === 0" />

            <Card 
                v-if="productDetails.length > 0"
                :data.sync="productDetails"
                @onChangeCover="uploadImage"
                @onDetail="onDetail"
                @onEdit="onEdit"
                @onDelete="onDelete" />
        </div>
        <div class="right">
            <Form 
                @uploadImage="uploadImage"
                @removeImage="removeImage"
                @onSave="onOpenVisibleConfirmed"
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
import Card from './Card'
import Form from './Form'

export default {
    name: 'App',
    data () {
        return {
            formClass: false,
            visibleConfirmed: false,
            visibleAlert: false,
            titleAlert: 'Failed to preceed data',
            iconAlert: 'fa fa-4x fa-info-circle',
            visibleConfirmed: false,
            visibleConfirmedDelete: false,
            titleConfirmed: 'Save this data ?',
        }
    },
    components: {
        AppEmpty,
        AppPopupLoader,
        AppPopupConfirmed,
        AppPopupAlert,
        Card,
        Form
    },
    computed: {
        ...mapState({
            formProduct: (state) => state.storeProduct.form,
            formDetail: (state) => state.storeProduct.formDetail,
            typeForm: (state) => state.storeProduct.typeForm,
            typeFormDetail: (state) => state.storeProduct.typeFormDetail,
            loadingForm: (state) => state.storeProduct.loadingForm,
        }),
        productDetails () {
            return this.formProduct.details 
        },
        typeFormDetail: {
            get () {
                return this.$store.state.storeProduct.typeFormDetail
            },
            set (value) {
                this.$store.state.storeProduct.typeFormDetail = value
            }
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
    methods: {
        ...mapActions({
            resetFormDetail: 'storeProduct/resetFormDetail',
            setFormDetail: 'storeProduct/setFormDetail',
            createFormDetail: 'storeProduct/createFormDetail',
            editFormDetail: 'storeProduct/editFormDetail',
            deleteFormDetail: 'storeProduct/deleteFormDetail',
        }),
        uploadImage () {
            console.log('uploadImage')
        },
        removeImage () {
            console.log('removeImage')
        },
        onDelete () {
            console.log('onDelete')
        },

        // CLOSE
        onClose () {
            this.formClass = false
        },

        // CONFIRMED
        onClickNo () {
            this.visibleConfirmed = false 
        },
        onClickYes () {
            this.formClass = false 
            this.visibleConfirmed = false 
            switch (this.typeFormDetail) {
                case 'create':
                    this.createFormDetail({
                        ...this.formDetail,
                        product_id: this.formProduct.id
                    })
                    break
                case 'edit':
                    this.editFormDetail(this.formDetail)
                    break
            }
        },

        // SAVE
        onOpenVisibleConfirmed () {
            this.visibleConfirmed = true
            switch (this.typeFormDetail) {
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
            this.typeFormDetail = 'create'
            this.resetFormDetail()
        },

        // DETAIL
        onDetail (data) {
            this.formClass = true
            this.typeFormDetail = 'detail'
            this.resetFormDetail()
            this.setFormDetail(data)
        },

        // EDIT
        onEdit (data) {
            this.formClass = true
            this.typeFormDetail = 'edit'
            this.resetFormDetail()
            this.setFormDetail(data)
        },

        // DELETE
        onDelete (data) {
            this.visibleConfirmedDelete = true 
            this.setFormDetail(data)
        },
        onClickNoDelete () {
            this.visibleConfirmedDelete = false 
        },
        onClickYesDelete () {
            this.visibleConfirmedDelete = false 
            this.deleteFormDetail(this.formDetail)
        },
    }
}
</script>