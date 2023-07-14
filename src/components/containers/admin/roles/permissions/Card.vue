<template>
    <div id="App">
        <el-table
            :data="data"
            border
            empty-text="No Data"
            style="width: 100%">
            <el-table-column
                type="index"
                width="60"
                :index="indexMethod">
            </el-table-column>
            <el-table-column
                prop="permission_name"
                label="Permission Name">
            </el-table-column>
            <el-table-column width="60">
                <template slot-scope="scope">
                    <button 
                        @click="onDelete(scope.row)"
                        class="btn btn-icon btn-sekunder"
                        :disabled="roleTypeForm === 'detail'">
                        <i class="fa fa-lw fa-trash-alt"></i>
                    </button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
    name: 'App',
    props: {
        data: null,
    },
    computed: {
        ...mapState({
            offset: (state) => state.storeRolePermissions.offset,
            roleTypeForm: (state) => state.storeRoles.typeForm,
        })
    },
    methods: {
        indexMethod(index) {
            return (index + 1) + this.offset
        },

        // DELETE
        onDelete (data) {
            this.$emit('onDelete', data)
        }
    }
}
</script>