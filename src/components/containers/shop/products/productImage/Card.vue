<template>
    <div id="App">
        <div 
            v-for="(dt, i) in data"
            :key="i"
            class="card box-shadow margin margin-top-15px margin-bottom-15px">
            <div class="display-flex space-between">
                <div style="width: calc(100% - 100px);">
                    <div class="fonts fonts-11 semibold">{{ dt.name }}</div>
                    <div class="fonts fonts-10 grey">Rp. {{ dt.price }}</div>
                    <div class="fonts fonts-10 grey">{{ dt.created_at | moment("DD MMMM YYYY") }}</div>
                </div>
                <div class="width width-100px display-flex flex-end">
                    <AppCardCapsule :data="dt.status" />
                </div>
            </div>
            <div class="display-flex space-between padding padding-top-15px">
                <button 
                    class="btn btn-sekunder btn-full"
                    @click="onEdit(dt)">
                    <i class="icn icn-left fa fa-lw fa-edit"></i> Edit Varian
                </button>
                <el-popover
                    placement="top-end"
                    width="180"
                    trigger="click">
                    <div class="width width-100">
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
                        class="btn btn-icon btn-sekunder margin margin-left-10px">
                        <i class="fa fa-lw fa-ellipsis-h"></i>
                    </button>
                </el-popover>
            </div>
        </div>
    </div>
</template>
<script>
import AppCardCapsule from '../../../../modules/AppCardCapsule'
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
        }
    }
}
</script>