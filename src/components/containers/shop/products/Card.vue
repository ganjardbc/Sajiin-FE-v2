<template>
    <div id="App">
        <div v-for="(dt, i) in data" :key="i" class="card box-shadow margin margin-top-15px margin-bottom-15px">
            <div class="display-flex space-between align-center padding padding-bottom-15px margin margin-bottom-20px border-bottom">
                <div class="display-flex align-center">
                    <div class="width width-30px">
                        <i class="fa fa-1x fa-utensils fonts main-color"></i>
                    </div>
                    <div>
                        <div class="fonts fonts-10 semibold">{{ dt.product_id }}</div>
                        <div class="fonts fonts-10 grey">{{ dt.created_at | moment("DD MMMM YYYY") }}</div>
                    </div>
                </div>
                <div class="display-flex flex-end align-center">
                    <AppCardCapsule :data="dt.status" class="margin margin-left-10px" />
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
                                v-if="isRoleOwner"
                                class="btn btn-white btn-full btn-align-left"
                                @click="onDelete(dt)">
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
                            <i class="post-middle-absolute fonts fonts-11 grey fa fa-lg fa-camera" />
                        </button>
                    </div>
                </div>
                <div style="width: calc(100% - 95px);">
                    <div class="width width-100">
                        <div class="fonts fonts-11 semibold">{{ dt.name }}</div>
                        <AppCardCaption 
                            v-if="dt.description"
                            icon="fa fa-lg fa-info-circle" 
                            :caption="dt.description" />
                        <AppCardCaption 
                            v-if="dt.price"
                            icon="fa fa-lg fa-calculator" 
                            :caption="format(dt.price)" />
                    </div>
                    <div class="display-flex space-between padding padding-top-15px">
                        <div class="fonts micro black">
                            Change status to {{ dt.status === 'active' ? 'Inactive' : 'Active' }} ?
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
                <div class="width width-100" style="overflow-y: auto; max-height: 400px;">
                    <div v-for="(detail, j) in dt.details" :key="j" style="margin: 15px 4px;">
                        <div class="card bg-white border border-full">
                            <div class="display-flex space-between">
                                <div style="width: calc(100% - 100px);">
                                    <div class="fonts fonts-11 semibold">{{ detail.name }}</div>
                                    <AppCardCaption 
                                        icon="fa fa-lg fa-calculator" 
                                        :caption="format(detail.price)" />
                                    <AppCardCaption 
                                        v-if="detail.is_discount"
                                        icon="fa fa-lg fa-percent" 
                                        :caption="`${format(detail.price - (detail.price * (detail.value_discount / 100)))} (${detail.value_discount}%)`" />
                                    <AppCardCaption 
                                        icon="fa fa-lg fa-info-circle" 
                                        :caption="detail.description" />
                                </div>
                                <div class="width width-100px display-flex flex-end">
                                    <AppCardCapsule :data="detail.status" />
                                </div>
                            </div>
                            <div class="display-flex space-between padding padding-top-15px">
                                <div class="fonts micro black">
                                    Change status to {{ detail.status === 'active' ? 'Inactive' : 'Active' }} ?
                                </div>
                                <el-switch 
                                    v-model="detail.status"
                                    :active-value="'active'"
                                    :inactive-value="'inactive'"
                                    @change="onChangeVarianStatus(detail)"></el-switch>
                            </div>
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
    computed: {
        isRoleOwner () {
            let status = false 
            const user = this.$cookies.get('user')
            if (user.role_name === 'owner') {
                status = true
            }
            return status
        },
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