<template>
    <div id="AppSideForm" :class="isZoomed ? 'form-side zoomed' : 'form-side'">
        <div class="fs-header display-flex space-between align-center">
            <div class="width width-50" style="margin-left: 10px;">
                <div class="fonts fonts-11 semibold">{{ title }}</div>
                <div v-if="subtitle" class="fonts fonts-9 normal">{{ subtitle }}</div>
            </div>
            <div class="width width-50 display-flex flex-end align-center">
                <slot name="toolbar" />
                <button class="btn btn-icon btn-white" @click="onClose" title="Close">
                    <i class="fa fa-lg fa-times" />
                </button>
            </div>
        </div>
        <div class="fs-content">
            <div class="fs-body">
                <slot />
            </div>
            <div class="fs-footer">
                <div v-if="enableCustomFooter">
                    <slot name="footer" />
                </div>
                <button
                    v-else 
                    class="btn btn-main btn-full"
                    :disabled="!enableSaveButton"
                    @click="onSave" title="Save">
                    Save Data
                </button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AppSideForm',
    data () {
        return {
            isZoomed: false
        }
    },
    props: {
        title: {
            type: String,
            required: true
        },
        subtitle: {
            type: String,
            required: false
        },
        enableSaveButton: {
            type: Boolean,
            required: false,
            default: false,
        },
        enableCustomFooter: {
            type: Boolean,
            required: false
        },
        onSave: {
            type: Function,
            required: false
        },
        onClose: {
            type: Function,
            required: false
        },
    },
    methods: {
        onZoom () {
            this.isZoomed = !this.isZoomed
        }
    }
}
</script>