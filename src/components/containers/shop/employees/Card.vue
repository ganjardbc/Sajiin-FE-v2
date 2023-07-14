<template>
    <div id="App">
        <div v-for="(dt, i) in data" :key="i" class="card box-shadow margin margin-top-15px margin-bottom-15px">
            <div class="display-flex space-between align-center padding padding-bottom-15px margin margin-bottom-20px border-bottom">
                <div class="display-flex align-center">
                    <div class="width width-30px">
                        <i class="fa fa-1x fa-users fonts main-color"></i>
                    </div>
                    <div>
                        <div class="fonts fonts-10 semibold">{{ dt.employee.employee_id }}</div>
                        <div class="fonts fonts-10 grey">{{ dt.employee.created_at | moment("DD MMMM YYYY") }}</div>
                    </div>
                </div>
                <div class="display-flex flex-end align-center">
                    <AppCardCapsule :data="dt.employee.status" class="margin margin-left-10px" />
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
                            v-if="dt.employee.image" 
                            :src="employeeImageThumbnailUrl + dt.employee.image" 
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
                        <div class="fonts fonts-11 semibold">{{ dt.employee.name }}</div>
                        <AppCardCaption 
                            v-if="dt.user"
                            icon="fa fa-lg fa-user" 
                            :caption="dt.user.username" />
                        <AppCardCaption 
                            v-if="dt.role"
                            icon="fa fa-lg fa-flag" 
                            :caption="dt.role.description" />
                        <AppCardCaption 
                            v-if="dt.shift"
                            icon="fa fa-lg fa-clock" 
                            :caption="`${dt.shift.title} (${dt.shift.start_time} - ${dt.shift.end_time})`" />
                        <AppCardCaption 
                            v-if="dt.shop"
                            icon="fa fa-lg fa-store" 
                            :caption="dt.shop.name" />
                    </div>
                    <div class="display-flex space-between padding padding-top-15px">
                        <div class="fonts micro black">
                            Change status to {{ dt.employee.status === 'active' ? 'Inactive' : 'Active' }} ?
                        </div>
                        <el-switch 
                            v-model="dt.employee.status"
                            :active-value="'active'"
                            :inactive-value="'inactive'"
                            @change="onChangeStatus(dt)"></el-switch>
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
            this.$emit('onChangeCover', {
                ...data.employee,
                user: data.user,
            })
        },

        // DETAIL
        onDetail (data) {
            this.$emit('onDetail', {
                ...data.employee,
                user: data.user,
            })
        },

        // EDIT
        onEdit (data) {
            this.$emit('onEdit', {
                ...data.employee,
                user: data.user,
            })
        },

        // DELETE
        onDelete (data) {
            this.$emit('onDelete', {
                ...data.employee,
                user: data.user,
            })
        },

        // STATUS
        onChangeStatus (data) {
            this.$emit('onChangeStatus', {
                ...data.employee,
                user: data.user,
            })
        },
    }
}
</script>