<template>
    <div id="App">
        <div 
            v-for="(dt, i) in data"
            :key="i"
            class="card box-shadow margin margin-top-15px margin-bottom-15px">
            <div class="display-flex space-between align-center padding padding-bottom-15px margin margin-bottom-20px border-bottom">
                <div>
                    <div class="fonts fonts-10 semibold">{{ dt.proddetail_id }}</div>
                    <div class="fonts fonts-10 grey">{{ dt.created_at | moment("DD MMMM YYYY") }}</div>
                </div>
                <div class="display-flex flex-end align-center">
                    <AppCardCapsule :data="dt.status" class="margin margin-left-10px" />
                    <el-popover
                        v-if="typeFormProduct !== 'detail'" 
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
                            class="btn btn-icon btn-circle btn-white">
                            <i class="fa fa-lw fa-ellipsis-v"></i>
                        </button>
                    </el-popover>
                </div>
            </div>
            <div class="width width-100">
                <div class="fonts fonts-11 semibold">{{ dt.name }}</div>
                <AppCardCaption 
                    icon="fa fa-lg fa-calculator" 
                    :caption="format(dt.price)" />
                <AppCardCaption 
                    icon="fa fa-lg fa-info-circle" 
                    :caption="dt.description" />
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import AppCardCapsule from '../../../../modules/AppCardCapsule'
import AppCardCaption from '../../../../modules/AppCardCaption'

export default {
    name: 'App',
    props: {
        data: null,
    },
    components: {
        AppCardCapsule,
        AppCardCaption
    },
    computed: {
        ...mapState({
            typeFormProduct: (state) => state.storeProduct.typeForm,
        })
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