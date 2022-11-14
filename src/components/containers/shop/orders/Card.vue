<template>
    <div id="App">
        <div v-for="(dt, i) in data" :key="i" class="card box-shadow margin margin-top-15px margin-bottom-15px">
            <div class="display-flex space-between align-center padding padding-bottom-15px margin margin-bottom-20px border-bottom">
                <div class="display-flex align-center">
                    <div class="width width-30px">
                        <i class="fa fa-1x fa-list-ul fonts orange"></i>
                    </div>
                    <div class="display-flex flex-start align-center wrap" style="width: calc(100% - 30px);">
                        <div class="fonts fonts-10 semibold margin margin-right-10px">Order</div>
                        <div class="fonts fonts-10 grey margin margin-right-10px">{{ dt.order.created_at | moment("DD MMM YYYY") }}</div>
                        <AppCardCapsule :data="dt.order.status" class="margin margin-right-10px" />
                        <div class="fonts fonts-10 grey margin margin-right-10px">{{ dt.order.order_id }}</div>
                    </div>
                </div>
                <div class="display-flex flex-end align-center">
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
                                @click="onDelete(dt.order)">
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

            <div class="display-flex space-between display-mobile margin margin-bottom-15px">
                <div class="width width-25 width-mobile display-flex column space-between display-row-mobile margin margin-top-5px margin-bottom-5px">
                    <div class="fonts fonts-9 normal grey margin margin-bottom-5px">Customer</div>
                    <div class="fonts fonts-11 semibold black">{{ dt.order.customer_name || '-' }}</div>
                </div>
                <div class="width width-25 width-mobile display-flex column space-between display-row-mobile margin margin-top-5px margin-bottom-5px">
                    <div class="fonts fonts-9 normal grey margin margin-bottom-5px">Table</div>
                    <div class="fonts fonts-11 semibold black">{{ dt.order.table_name || '-' }}</div>
                </div>
                <div class="width width-25 width-mobile display-flex column space-between display-row-mobile margin margin-top-5px margin-bottom-5px">
                    <div class="fonts fonts-9 normal grey margin margin-bottom-5px">Total Price</div>
                    <div class="fonts fonts-11 semibold">Rp. {{ dt.order.total_price }}</div>
                </div>
                <div class="width width-25 width-mobile display-flex column space-between display-row-mobile margin margin-top-5px margin-bottom-5px">
                    <div class="fonts fonts-9 normal grey margin margin-bottom-5px">Payment Status</div>
                    <div class="display-flex">
                        <AppCardCapsule :data="dt.order.payment_status ? 'paid' : 'unpaid'" />
                    </div>
                </div>
            </div>

            <AppCardCollapse 
                v-if="dt.details.length > 0" 
                :title="`Products (${dt.order.total_item})`"
                class="margin margin-bottom-15px">
                <div class="width width-100" style="overflow-y: auto; max-height: 400px;">
                    <div 
                        v-for="(detail, j) in dt.details" 
                        :key="j"
                        class="margin margin-15px">
                        <div class="card box-shadow bg-white">
                            <div class="display-flex space-between align-center">
                                <div class="width width-45px margin margin-right-15px">
                                    <div class="image image-padding">
                                        <img 
                                            v-if="detail.product_image" 
                                            :src="productImageThumbnailUrl + detail.product_image" 
                                            alt="" 
                                            class="post-center">
                                        <i v-else class="post-middle-absolute icn fa fa-lg fa-image"></i>
                                    </div>
                                </div>
                                <div style="width: calc(100% - 160px);">
                                    <div class="fonts fonts-11 semibold">{{ detail.product_name }}</div>
                                    <div class="fonts fonts-9 normal grey">{{ detail.note }}</div>
                                </div>
                                <div class="width width-100px display-flex flex-end">
                                    <AppCardCapsule :data="detail.status" />
                                </div>
                            </div>

                            <div class="width width-100 padding padding-top-15px">
                                <div class="display-flex space-between">
                                    <div class="fonts fonts-9 normal grey">Price ({{ detail.quantity }} products)</div>
                                    <div class="fonts fonts-9 normal grey">Rp. {{ detail.price }}</div>
                                </div>
                                <div class="padding padding-bottom-10px margin margin-bottom-10px border-bottom"></div>
                                <div class="display-flex space-between">
                                    <div class="fonts fonts-10 semibold black">Total</div>
                                    <div class="fonts fonts-10 semibold orange">Rp. {{ detail.subtotal }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AppCardCollapse>

            <div class="display-flex flex-end">
                <div v-if="dt.order.status !== 'canceled'" class="display-flex">
                    <button 
                        v-if="dt.order.payment_status" 
                        class="btn btn-main-reverse with-hover">
                        <i class="icn icn-left fa fa-lw fa-receipt"></i> Print Receipt
                    </button>
                    <button 
                        v-else 
                        class="btn btn-main">
                        <i class="icn icn-left fa fa-lw fa-calculator"></i> Check Out
                    </button>
                </div>
                <div class="display-flex">
                    <button 
                        class="btn btn-sekunder margin margin-left-10px" 
                        @click="onDetail(dt)">
                        <i class="icn icn-left fa fa-lw fa-align-left"></i> Order Detail
                    </button>
                </div>
            </div>
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