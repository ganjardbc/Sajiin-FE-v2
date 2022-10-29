<template>
    <div id="App">
        <div 
            v-for="(dt, i) in data"
            :key="i"
            class="card box-shadow margin margin-top-15px margin-bottom-15px">
            <div class="display-flex space-between align-center margin margin-bottom-15px">
                <div class="width width-80px margin marign-right-20px">
                    <div class="image image-padding border border-full">
                        <img 
                            v-if="dt.image" 
                            :src="productImageThumbnailUrl + dt.image" 
                            alt="" 
                            class="post-center">
                        <i v-else class="post-middle-absolute icn fa fa-lg fa-image"></i>
                        <button 
                            class="btn btn-sekunder btn-small-icon btn-circle" 
                            style="position: absolute; bottom: 5px; right: 5px;" 
                            @click="onChangeCover(dt)">
                            <i class="post-center fonts fonts-11 grey fa fa-lg fa-camera" />
                        </button>
                    </div>
                </div>
                <div class="display-flex space-between" style="width: calc(100% - 100px);">
                    <div style="width: calc(100% - 100px);">
                        <div class="fonts fonts-11 semibold">{{ dt.name }}</div>
                        <div class="fonts fonts-10 grey overflow-ellipsis">{{ dt.description }}</div>
                        <div class="fonts fonts-10 grey">{{ dt.created_at | moment("from", "now") }}</div>
                    </div>
                    <div class="width width-100px display-flex flex-end">
                        <AppCardCapsule :data="dt.status" />
                    </div>
                </div>
            </div>

            <AppCardCollapse v-if="dt.details.length > 0" :title="`Varians (${dt.details.length})`">
                <div class="width width-100">
                    <div 
                        v-for="(detail, j) in dt.details" 
                        :key="j"
                        class="card box-shadow bg-white margin margin-top-15px margin-bottom-15px">
                        <div class="display-flex space-between">
                            <div style="width: calc(100% - 100px);">
                                <div class="fonts fonts-11 semibold">{{ detail.name }}</div>
                                <div class="fonts fonts-10 grey">Rp. {{ detail.price }}</div>
                                <div class="fonts fonts-10 grey">{{ detail.created_at | moment("from", "now") }}</div>
                            </div>
                            <div class="width width-100px display-flex flex-end">
                                <AppCardCapsule :data="detail.status" />
                            </div>
                        </div>
                    </div>
                </div>
            </AppCardCollapse>

            <div class="display-flex space-between margin margin-top-15px">
                <button 
                    class="btn btn-sekunder btn-full"
                    @click="onEdit(dt)">
                    <i class="icn icn-left fa fa-lw fa-edit"></i> Edit Product
                </button>
                <el-popover
                    placement="top-end"
                    width="180"
                    trigger="click">
                    <div class="width width-100">
                        <button 
                            class="btn btn-white btn-full btn-align-left"
                            @click="onDetail(dt)">
                            <i class="icn icn-left fa fa-lw fa-eye"></i> Detail 
                        </button>
                        <button 
                            class="btn btn-white btn-full btn-align-left"
                            @click="onDelete(dt)">
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
</template>
<script>
import AppCardCapsule from '../../../modules/AppCardCapsule'
import AppCardCollapse from '../../../modules/AppCardCollapse'

export default {
    name: 'App',
    props: {
        data: null,
    },
    components: {
        AppCardCapsule,
        AppCardCollapse,
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
        }
    }
}
</script>