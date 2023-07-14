<template>
    <div id="App">
        <AppSideForm 
            :title="title" 
            :enableSaveButton="!isDetailForm"
            :onSave="onSave"
            :onClose="onClose">
            <AppTabs 
                v-if="!isCreateForm"
                :selectedIndex.sync="selectedIndex" 
                :data="tabs" 
                :isFull="true"
                :onChange="(data) => onChangeTabs(data)"
                class="margin margin-bottom-20px" />
            <FormData v-if="selectedIndex === 0" />
            <Permissions v-if="selectedIndex === 1" />
        </AppSideForm>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AppSideForm from '../../../modules/AppSideForm'
import AppTabs from '../../../modules/AppTabs'
import FormData from './FormData'
import Permissions from './permissions/Index'

const tabs = [
    {id: 1, label: 'Data', status: 'active'},
    {id: 2, label: 'Permissions', status: ''},
]

export default {
    name: 'App',
    data () {
        return {
            selectedIndex: 0,
            tabs: tabs,
        }
    },
    mounted () {},
    watch: {
        form (props, prevProps) {
            if (props !== prevProps) {
                this.onChangeTabs(0)
                this.resetDataRolePermissions()
            }
        } 
    },
    computed: {
        ...mapState({
            form: (state) => state.storeRoles.form,
            typeForm: (state) => state.storeRoles.typeForm,
        }),
        title () {
            let currentTitle = ''
            switch (this.typeForm) {
                case 'create':
                    currentTitle = 'Create Role'
                    break
                case 'detail':
                    currentTitle = 'Detail Role'
                    break
                case 'edit':
                    currentTitle = 'Edit Role'
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
    },
    components: {
        AppSideForm,
        AppTabs,
        FormData,
        Permissions,
    },
    methods: {
        ...mapActions({
            resetDataRolePermissions: 'storeRolePermissions/resetData'
        }),
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