<template>
    <div id="AppSideForm" :class="isZoomed ? 'form-side zoomed' : 'form-side'">
        <div class="fs-content">
            <div class="fs-header display-flex justify-content align-center">
                <div style="width: calc(100% - 90px); margin-left: 10px;">
                    <div class="fonts normal semibold">{{ title }}</div>
                </div>
                <div class="display-flex align-right" style="width: 150px;">
                    <slot name="toolbar" />
                    <button class="btn btn-icon btn-white" @click="onClose" title="Close">
                        <i class="fa fa-lw fa-arrow-right" />
                    </button>
                </div>
            </div>
            <div class="fs-body">
                <slot />
            </div>
            <div class="fs-footer">
                <slot name="footer" />
                <button 
                    class="btn btn-main btn-full"
                    :disabled="!enableSaveButton"
                    @click="onSave" title="Save">
                    Save
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
        enableCreateButton: {
            type: Boolean,
            required: false
        },
        enableSaveButton: {
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
        onCreate: {
            type: Function,
            required: false
        }
    },
    methods: {
        onZoom () {
            this.isZoomed = !this.isZoomed
        }
    }
}
</script>