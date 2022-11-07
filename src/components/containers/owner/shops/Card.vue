<template>
    <div id="App">
        <div v-for="(dt, i) in data" :key="i" class="card box-shadow margin margin-top-15px margin-bottom-15px">
            <div class="display-flex space-between margin margin-bottom-15px">
                <div class="display-flex">
                    <div style="margin-right: 10px;"><i class="fa fa-1x fa-store fonts orange"></i></div>
                    <div>
                        <div class="fonts fonts-11 semibold">{{ dt.shop.shop_id }}</div>
                        <div class="fonts fonts-10 grey">{{ dt.shop.created_at | moment("from", "now") }}</div>
                    </div>
                </div>
                <AppCardCapsule :data="dt.shop.status" class="margin margin-left-10px" />
            </div>

            <div class="display-flex space-between">
                <div class="width width-80px margin marign-right-15px">
                    <div class="image image-padding">
                        <img 
                            v-if="dt.shop.image" 
                            :src="shopImageThumbnailUrl + dt.shop.image" 
                            alt="" 
                            class="post-center">
                        <i v-else class="post-middle-absolute icn fa fa-lg fa-image"></i>
                        <button 
                            class="btn btn-sekunder btn-small-icon btn-circle" 
                            style="position: absolute; bottom: 5px; right: 5px;" 
                            @click="onChangeCover(dt.shop)">
                            <i class="post-center fonts fonts-11 grey fa fa-lg fa-camera" />
                        </button>
                    </div>
                </div>
                <div style="width: calc(100% - 95px);">
                    <div class="display-flex space-between">
                        <div class="padding padding-right-15px" style="width: calc(100% - 55px);">
                            <div class="fonts fonts-11 semibold">{{ dt.shop.name }}</div>
                            <div class="display-flex display-mobile">
                                <AppCardCaption 
                                    class="margin margin-right-15px"
                                    icon="far fa-lg fa-calendar" 
                                    :caption="`${dt.shop.open_day} - ${dt.shop.close_day}`" />
                                <AppCardCaption 
                                    class="margin margin-right-15px"
                                    icon="far fa-lg fa-clock" 
                                    :caption="`${dt.shop.open_time} - ${dt.shop.close_time}`" />
                            </div>
                        </div>
                        <div class="width width-40px">
                            <el-popover
                                placement="bottom-end"
                                width="180"
                                trigger="click">
                                <div class="width width-100">
                                    <button 
                                        v-if="dt.shop.status === 'active'"
                                        class="btn btn-white btn-full btn-align-left"
                                        @click="onManage(dt.shop)">
                                        <i class="icn icn-left fa fa-lw fa-store"></i> Manage 
                                    </button>
                                    <button 
                                        class="btn btn-white btn-full btn-align-left"
                                        @click="onEdit(dt.shop)">
                                        <i class="icn icn-left fa fa-lw fa-edit"></i> Edit 
                                    </button>
                                    <button 
                                        class="btn btn-white btn-full btn-align-left"
                                        @click="onDetail(dt.shop)">
                                        <i class="icn icn-left fa fa-lw fa-align-left"></i> Detail 
                                    </button>
                                    <button 
                                        class="btn btn-white btn-full btn-align-left"
                                        @click="onDelete(dt.shop)">
                                        <i class="icn icn-left fa fa-lw fa-trash-alt"></i> Delete
                                    </button>
                                </div>
                                <button 
                                    slot="reference"
                                    class="btn btn-icon btn-sekunder">
                                    <i class="fa fa-lw fa-ellipsis-h"></i>
                                </button>
                            </el-popover>
                        </div>
                    </div>
                    <div class="display-flex space-between padding padding-top-15px">
                        <div class="fonts micro black">
                            Change shop status to {{ dt.shop.status === 'active' ? 'Inactive' : 'Active' }} ?
                        </div>
                        <el-switch 
                            v-model="dt.shop.status"
                            :active-value="'active'"
                            :inactive-value="'inactive'"
                            @change="onChangeStatus(dt.shop)"></el-switch>
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

        // MANAGE
        onManage (data) {
            this.$emit('onManage', data)
        },

        // STATUS
        onChangeStatus (data) {
            this.$emit('onChangeStatus', data)
        }
    }
}
</script>