<template>
    <div id="App">
        <div v-for="(dt, i) in data" :key="i">
            <div class="margin margin-top-15px margin-bottom-15px">
                <div class="card box-shadow">
                    <div class="display-flex space-between align-center padding padding-top-5px padding-bottom-5px">
                        <div class="width width-80px margin marign-right-20px">
                            <div class="image image-padding border border-full">
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
                        <div class="display-flex space-between" style="width: calc(100% - 100px);">
                            <div style="width: calc(100% - 100px);">
                                <div class="fonts fonts-11 semibold">{{ dt.shop.name }}</div>
                                <div class="fonts fonts-10 grey">{{ dt.shop.open_day + ' - ' + dt.shop.close_day }} | {{ dt.shop.open_time + ' - ' + dt.shop.close_time }}</div>
                                <div class="fonts fonts-10 grey">{{ dt.shop.created_at | moment("from", "now") }}</div>
                            </div>
                            <div class="width width-100px display-flex flex-end">
                                <AppCardCapsule :data="dt.shop.status" />
                            </div>
                        </div>
                    </div>
                    <div class="display-flex space-between padding padding-top-15px">
                        <button 
                            class="btn btn-sekunder btn-full"
                            @click="onManage(dt.shop)">
                            <i class="icn icn-left fa fa-lw fa-store"></i> Manage Shop
                        </button>
                        <el-popover
                            placement="top-end"
                            width="180"
                            trigger="click">
                            <div class="width width-100">
                                <button 
                                    class="btn btn-white btn-full btn-align-left"
                                    @click="onDetail(dt.shop)">
                                    <i class="icn icn-left fa fa-lw fa-eye"></i> Detail 
                                </button>
                                <button 
                                    class="btn btn-white btn-full btn-align-left"
                                    @click="onEdit(dt.shop)">
                                    <i class="icn icn-left fa fa-lw fa-edit"></i> Edit 
                                </button>
                                <button 
                                    class="btn btn-white btn-full btn-align-left"
                                    @click="onDelete(dt.shop)">
                                    <i class="icn icn-left fa fa-lw fa-trash-alt"></i> Delete
                                </button>
                            </div>
                            <button 
                                slot="reference"
                                class="btn btn-icon btn-sekunder margin margin-left-10px">
                                <i class="fa fa-lw fa-ellipsis-h"></i>
                            </button>
                        </el-popover>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AppCardCapsule from '../../../modules/AppCardCapsule'

export default {
    name: 'App',
    props: {
        data: null,
    },
    components: {
        AppCardCapsule
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
        }
    }
}
</script>