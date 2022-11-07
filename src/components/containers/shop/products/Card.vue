<template>
    <div id="App">
        <div v-for="(dt, i) in data" :key="i" class="card box-shadow margin margin-top-15px margin-bottom-15px">
            <div class="display-flex space-between margin margin-bottom-15px">
                <div class="display-flex">
                    <div style="margin-right: 10px;"><i class="fa fa-1x fa-utensils fonts orange"></i></div>
                    <div>
                        <div class="fonts fonts-11 semibold">{{ dt.product_id }}</div>
                        <div class="fonts fonts-10 grey">{{ dt.created_at | moment("from", "now") }}</div>
                    </div>
                </div>
                <AppCardCapsule :data="dt.status" class="margin margin-left-10px" />
            </div>

            <div class="display-flex space-between">
                <div class="width width-80px margin marign-right-15px">
                    <div class="image image-padding">
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
                <div style="width: calc(100% - 95px);">
                    <div class="display-flex space-between">
                        <div class="padding padding-right-15px" style="width: calc(100% - 55px);">
                            <div class="fonts fonts-11 semibold">{{ dt.name }}</div>
                            <AppCardCaption 
                                icon="fa fa-lg fa-info-circle" 
                                :caption="dt.description" />
                        </div>
                        <div class="width width-40px">
                            <el-popover
                                placement="bottom-end"
                                width="180"
                                trigger="click">
                                <div class="width width-100">
                                    <button 
                                        class="btn btn-white btn-full btn-align-left"
                                        @click="onEdit(dt)">
                                        <i class="icn icn-left fa fa-lw fa-edit"></i> Edit 
                                    </button>
                                    <button 
                                        class="btn btn-white btn-full btn-align-left"
                                        @click="onDetail(dt)">
                                        <i class="icn icn-left fa fa-lw fa-align-left"></i> Detail 
                                    </button>
                                    <button 
                                        class="btn btn-white btn-full btn-align-left"
                                        @click="onDelete(dt)">
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
                            Change product status to {{ dt.status === 'active' ? 'Inactive' : 'Active' }} ?
                        </div>
                        <el-switch 
                            v-model="dt.status"
                            :active-value="'active'"
                            :inactive-value="'inactive'"
                            @change="onChangeProductStatus(dt)"></el-switch>
                    </div>
                </div>
            </div>

            <AppCardCollapse 
                v-if="dt.details.length > 0" 
                :title="`Varians (${dt.details.length})`"
                class="margin margin-top-15px">
                <div class="width width-100">
                    <div 
                        v-for="(detail, j) in dt.details" 
                        :key="j"
                        class="card box-shadow bg-white margin margin-top-15px margin-bottom-15px">
                        <div class="display-flex space-between">
                            <div style="width: calc(100% - 100px);">
                                <div class="fonts fonts-11 semibold">{{ detail.name }}</div>
                                <div class="display-flex align-center margin margin-right-15px">
                                    <i class="width width-20px fonts fonts-10 grey fa fa-lg fa-calculator"></i>
                                    <div class="fonts fonts-10 grey">
                                        Rp. {{ detail.price }}
                                    </div>
                                </div>
                                <div class="display-flex align-center margin margin-right-15px">
                                    <i class="width width-20px fonts fonts-10 grey fa fa-lg fa-history"></i>
                                    <div class="fonts fonts-10 grey">
                                        {{ detail.created_at | moment("from", "now") }}
                                    </div>
                                </div>
                            </div>
                            <div class="width width-100px display-flex flex-end">
                                <AppCardCapsule :data="detail.status" />
                            </div>
                        </div>
                        <div class="display-flex space-between padding padding-top-15px">
                            <div class="fonts micro black">
                                Change varian status to {{ detail.status === 'active' ? 'Inactive' : 'Active' }} ?
                            </div>
                            <el-switch 
                                v-model="detail.status"
                                :active-value="'active'"
                                :inactive-value="'inactive'"
                                @change="onChangeVarianStatus(detail)"></el-switch>
                        </div>
                    </div>
                </div>
            </AppCardCollapse>
        </div>
    </div>
</template>
<script>
import AppCardCapsule from '../../../modules/AppCardCapsule'
import AppCardCollapse from '../../../modules/AppCardCollapse'
import AppCardCaption from '../../../modules/AppCardCaption'

export default {
    name: 'App',
    props: {
        data: null,
    },
    components: {
        AppCardCapsule,
        AppCardCollapse,
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
        onChangeProductStatus (data) {
            this.$emit('onChangeProductStatus', data)
        },
        onChangeVarianStatus (data) {
            this.$emit('onChangeVarianStatus', data)
        }
    }
}
</script>