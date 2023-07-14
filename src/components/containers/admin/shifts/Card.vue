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
                prop="shift.title"
                label="Tittle"
                width="180">
            </el-table-column>
            <el-table-column
                label="Time"
                width="180">
                <template slot-scope="scope">
                    <span>{{ scope.row.shift.start_time }} - {{ scope.row.shift.end_time }}</span>
                </template>
            </el-table-column>
            <el-table-column
                prop="shop.name"
                label="Shop"
                min-width="200">
            </el-table-column>
            <el-table-column 
                label="Status"
                width="100">
                <template slot-scope="scope">
                    <div class="display-flex flex-start">
                        <AppCardCapsule :data="scope.row.shift.status" />
                    </div>
                </template>
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
            offset: (state) => state.storeCategory.offset,
        })
    },
    methods: {
        indexMethod(index) {
            return (index + 1) + this.offset
        },

        // COVER
        onChangeCover (data) {
            this.$emit('onChangeCover', data.shift)
        },

        // DETAIL
        onDetail (data) {
            this.$emit('onDetail', data.shift)
        },

        // EDIT
        onEdit (data) {
            this.$emit('onEdit', data.shift)
        },

        // DELETE
        onDelete (data) {
            this.$emit('onDelete', data.shift)
        }
    }
}
</script>