<template>
    <div id="App">
        <div 
            class="card bg-white-grey"
            style="width: calc(100% - 20px); padding: 10px;">
            <div 
                class="display-flex space-between align-center"
                style="cursor: pointer;"
                @click="openCollapse">
                <div class="fonts fonts-10 semibold black">
                    {{ title ? title : 'Collapse' }}
                </div>
                <button class="btn btn-white-grey btn-small-icon">
                    <i :class="`icn fa fa-lw ${visibleCollapse ? 'fa-chevron-up' : 'fa-chevron-down'}`"></i>
                </button>
            </div>
            <div v-if="visibleCollapse">
                <slot />
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'App',
    props: {
        title: null 
    },
    data() {
        return {
            visibleCollapse: false,
        }
    },
    methods: {
        openCollapse () {
            this.visibleCollapse = !this.visibleCollapse
        }
    }
}
</script>