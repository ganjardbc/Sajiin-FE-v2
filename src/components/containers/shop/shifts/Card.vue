<template>
    <div id="App">
        <div v-for="(dt, i) in data" :key="i" class="card box-shadow margin margin-top-15px margin-bottom-15px">
            <div class="display-flex space-between align-center padding padding-bottom-15px margin margin-bottom-20px border-bottom">
                <div class="display-flex align-center">
                    <div class="width width-30px">
                        <i class="fa fa-1x fa-th-large fonts main-color"></i>
                    </div>
                    <div>
                        <div class="fonts fonts-10 semibold">{{ dt.shift.shift_id }}</div>
                        <div class="fonts fonts-10 grey">{{ dt.shift.created_at | moment("DD MMMM YYYY") }}</div>
                    </div>
                </div>
                <div class="display-flex flex-end align-center">
                    <AppCardCapsule :data="dt.shift.status" class="margin margin-left-10px" />
                    <el-popover
                        placement="bottom-end"
                        width="180"
                        trigger="click">
                        <div class="width width-100">
                            <button 
                                class="btn btn-white btn-full btn-align-left"
                                @click="onEdit(dt.shift)">
                                <i class="icn icn-left fa fa-lw fa-edit"></i> Edit 
                            </button>
                            <button 
                                class="btn btn-white btn-full btn-align-left"
                                @click="onDetail(dt.shift)">
                                <i class="icn icn-left fa fa-lw fa-align-left"></i> Detail 
                            </button>
                            <button 
                                class="btn btn-white btn-full btn-align-left"
                                @click="onDelete(dt.shift)">
                                <i class="icn icn-left fa fa-lw fa-trash-alt"></i> Delete
                            </button>
                        </div>
                        <button 
                            slot="reference"
                            class="btn btn-icon btn-circle btn-white">
                            <i class="fa fa-lw fa-ellipsis-v"></i>
                        </button>
                    </el-popover>
                </div>
            </div>

            <div class="display-flex space-between">
                <div class="width width-80px margin marign-right-15px">
                    <div class="image image-padding border-full">
                        <i class="post-middle-absolute icn fa fa-lg fa-image"></i>
                    </div>
                </div>
                <div style="width: calc(100% - 95px);">
                    <div class="width width-100">
                        <div class="fonts fonts-11 semibold">{{ dt.shift.title }}</div>
                        <AppCardCaption 
                            icon="fa fa-lg fa-info-circle" 
                            :caption="dt.shift.description" />
                        <AppCardCaption 
                            icon="fa fa-lg fa-clock" 
                            :caption="`${dt.shift.start_time} - ${dt.shift.end_time}`" />
                    </div>
                    <div class="display-flex space-between padding padding-top-15px">
                        <div class="fonts micro black">
                            Change status to {{ dt.shift.status === 'active' ? 'Inactive' : 'Active' }} ?
                        </div>
                        <el-switch 
                            v-model="dt.shift.status"
                            :active-value="'active'"
                            :inactive-value="'inactive'"
                            @change="onChangeStatus(dt.shift)"></el-switch>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AppCardCapsule from '../../../modules/AppCardCapsule'
import AppCardCaption from '../../../modules/AppCardCaption'

export default {
    name: 'App',
    props: {
        data: null,
    },
    components: {
        AppCardCapsule,
        AppCardCaption,
    },
    methods: {
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
        },

        // STATUS
        onChangeStatus (data) {
            this.$emit('onChangeStatus', data)
        },
    }
}
</script>