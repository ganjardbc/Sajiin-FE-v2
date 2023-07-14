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
                prop="key"
                label="Key"
                width="180">
            </el-table-column>
            <el-table-column
                prop="value"
                label="Value"
                min-width="180">
            </el-table-column>
            <el-table-column
                prop="type"
                label="Type"
                min-width="180">
            </el-table-column>
            <el-table-column width="60">
                <template slot-scope="scope">
                    <el-popover
                        placement="bottom-end"
                        width="180"
                        trigger="click">
                        <div class="width width-100">
                            <button 
                                class="btn btn-white btn-full btn-align-left"
                                @click="onDetail(scope.row)">
                                <i class="icn icn-left fa fa-lw fa-align-left"></i> Detail 
                            </button>
                            <button 
                                class="btn btn-white btn-full btn-align-left"
                                @click="onEdit(scope.row)">
                                <i class="icn icn-left fa fa-lw fa-edit"></i> Edit 
                            </button>
                            <button 
                                class="btn btn-white btn-full btn-align-left"
                                @click="onDelete(scope.row)">
                                <i class="icn icn-left fa fa-lw fa-trash-alt"></i> Delete
                            </button>
                        </div>
                        <button 
                            slot="reference"
                            class="btn btn-icon btn-sekunder">
                            <i class="fa fa-lw fa-ellipsis-h"></i>
                        </button>
                    </el-popover>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import AppCardCapsule from '../../../modules/AppCardCapsule'

export default {
    name: 'App',
    components: {
        AppCardCapsule
    },
    props: {
        data: null,
    },
    computed: {
        ...mapState({
            offset: (state) => state.storeBizpars.offset,
        })
    },
    methods: {
        indexMethod(index) {
            return (index + 1) + this.offset
        },

        // COVER
        onChangeCover (data) {
            this.$emit('onChangeCover', data)
        },

        // DETAIL
        onDetail (data) {
            this.$emit('onDetail', data)
        },

        // EDIT
        onEdit (data) {
            this.$emit('onEdit', data)
        },

        // DELETE
        onDelete (data) {
            this.$emit('onDelete', data)
        }
    }
}
</script>