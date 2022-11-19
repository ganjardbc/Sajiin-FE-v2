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
            <el-table-column width="100">
                <template slot-scope="scope">
                    <div class="image image-padding border border-full">
                        <img 
                            v-if="scope.row.image" 
                            :src="shipmentImageThumbnaiUrl + scope.row.image" 
                            alt="" 
                            class="post-center">
                        <i v-else class="post-middle-absolute icn fa fa-lg fa-image"></i>
                        <button 
                            class="btn btn-sekunder btn-small-icon btn-circle" 
                            style="position: absolute; bottom: 5px; right: 5px;" 
                            @click="onChangeCover(scope.row)">
                            <i class="post-center fonts fonts-11 grey fa fa-lg fa-camera" />
                        </button>
                    </div>
                </template>
            </el-table-column>
            <el-table-column
                prop="name"
                label="Name"
                width="180">
            </el-table-column>
            <el-table-column
                prop="description"
                label="Description">
            </el-table-column>
            <el-table-column 
                label="Status"
                width="100">
                <template slot-scope="scope">
                    <div class="display-flex flex-start">
                        <AppCardCapsule :data="scope.row.status" />
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
                                @click="onChangeCover(scope.row)">
                                <i class="icn icn-left fa fa-lg fa-camera"></i> Change Cover
                            </button>
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
            offset: (state) => state.storePayment.offset,
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