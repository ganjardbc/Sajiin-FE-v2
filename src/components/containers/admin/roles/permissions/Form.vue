<template>
    <div id="App">
        <AppSideForm 
            :title="title" 
            :enableSaveButton="false"
            :onSave="onSave"
            :onClose="onClose">
            <Card 
                :data.sync="data" 
                @onSelect="onSelect" />
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
        </AppSideForm>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import AppSideForm from '../../../../modules/AppSideForm'
import Card from './CardForm'

export default {
    name: 'App',
    data () {
        return {
            currentPage: 0,
        }
    },
    mounted () {
        this.getData()
    },
    computed: {
        ...mapState({
            offset: (state) => state.storeRolePermissions.permission.offset,
            limit: (state) => state.storeRolePermissions.permission.limit,
            totalRecord: (state) => state.storeRolePermissions.permission.totalRecord,
            form: (state) => state.storeRolePermissions.permission.form,
            errorMessage: (state) => state.storeRolePermissions.permission.errorMessage,
            typeForm: (state) => state.storeRolePermissions.permission.typeForm,
            data: (state) => state.storeRolePermissions.permission.data,
        }),
        title () {
            let currentTitle = 'Choose Permission'
            return currentTitle
        },
        isDetailForm () {
            let status = false 
            if (this.typeForm === 'detail') {
                status = true 
            }
            return status
        }
    },
    components: {
        AppSideForm,
        Card
    },
    methods: {
        ...mapActions({
            getDataPermission: 'storeRolePermissions/getDataPermission',
            setPaginationPermission: 'storeRolePermissions/setPaginationPermission'
        }),
        getData () {
            const token = this.$cookies.get('tokenBearer')
            this.getDataPermission({ token })
        },
        handleCurrentChange (value) {
            this.setPaginationPermission(value)
            this.getData()
        },
        onSelect (data) {
            this.$emit('onSelect', data)
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