<template>
    <div id="AppMobileLayout">
        <div class="navbar-header">
            <div class="navbar-header-content">
                <div v-if="!enableLeftSlot" class="display-flex align-center">
                    <button class="btn btn-icon btn-circle btn-white margin margin-right-10px" @click="onBack">
                        <i class="fa fa-lg fa-arrow-left"></i>
                    </button>
                    <div class="fonts fonts-11 semibold black">{{ title ? title : 'Title' }}</div>
                </div>
                <div v-if="enableLeftSlot" class="display-flex align-center">
                    <slot name="left-button" />
                </div>
                <div class="display-flex flex-end align-center">
                    <slot name="right-button" />
                </div>
            </div>
        </div>
        <div>
            <slot />
        </div>
    </div>
</template>
<script>
export default {
    name: 'AppMobileLayout',
    props: {
        title: {
            type: String,
            required: false
        },
        enableLeftSlot: false,
    },
    methods: {
        onBack () {
            this.$router.back()
        }
    }
}
</script>