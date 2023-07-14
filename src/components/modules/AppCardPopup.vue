<template>
    <div id="App" class="display-popup-normal" style="z-index: 1000;">
        <div :class="`post-middle-absolute width width-${width ? width : '500px'} width-mobile`">
            <div class="padding padding-10px">
                <div class="card box-shadow bg-white no-padding">
                    <div class="display-flex space-between align-center" style="padding: 10px 15px;">
                        <div class="fonts fonts-11 semibold">{{ title }}</div>
                        <button class="btn btn-icon btn-white" @click="onClose">
                            <i class="fa fa-lg fa-times"></i>
                        </button>
                    </div>
                    <div 
                        class="change-scrollbar" 
                        :style="`
                            padding: 10px 15px;
                            max-height: calc(100vh - ${height ? height : '230px'}); 
                            overflow-y: auto;
                            overflow-x: hidden;
                        `">
                        <slot />
                    </div>
                    <slot name="footer" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'App',
    props: {
        title: {
            type: String,
            required: false,
            default: 'Form'
        },
        enableRadius: {
            type: Boolean,
            required: false
        },
        width: null,
        height: null,
    },
    methods: {
        onClose () {
            this.$emit('onClose')
        }
    }
}
</script>