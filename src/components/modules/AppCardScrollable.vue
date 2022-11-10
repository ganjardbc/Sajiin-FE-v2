<template>
    <div id="AppTabs" class="tabs display-flex align-center">
        <button v-if="isScrollable" class="tabs-button" @click="toLeft(path ? path : 'nav-topic')">
            <i class="fa fa-lg fa-angle-left" />
        </button>
        <div 
            :class="isScrollable ? 'tabs-content full' : ''" :id="path ? path : 'nav-topic'"
            :style="`
                height: ${customHeight ? customHeight : ''}; 
                white-space: ${isScrollable ? 'nowrap' : 'wrap'}; 
                flex-wrap: ${isScrollable ? 'nowrap' : 'wrap'};
            `">
            <slot />
        </div>
        <button v-if="isScrollable" class="tabs-button" @click="toRight(path ? path : 'nav-topic')">
            <i class="fa fa-lg fa-angle-right" />
        </button>
    </div>
</template>

<script>
export default {
    name: 'AppTabs',
    props: {
        path: {
            required: false
        },
        isScrollable: {
            type: Boolean,
            required: false,
            default: false
        },
        customHeight: {
            default: null
        }
    },
    methods: {
        toLeft: function (path) {
			var wd = $('#'+path).width()
			var sc = $('#'+path).scrollLeft()
			if (sc >= 0) {
				$('#'+path).animate({scrollLeft: (sc - wd)}, 500)
			}
		},
		toRight: function (path) {
			var wd = $('#'+path).width()
			var sc = $('#'+path).scrollLeft()
			if (true) {
				$('#'+path).animate({scrollLeft: (sc + wd)}, 500)
			}
		}
    },
}
</script>