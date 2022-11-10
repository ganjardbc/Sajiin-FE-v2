<template>
    <div id="App" class="display-flex space-between align-center wrap">
        <AppCardScrollable :isScrollable="false" customHeight="auto">
            <div v-for="(dt, i) in data" :key="i" style="margin: 5px; flex-grow: 1; display: inline-block;">
                <div 
                    :class="`card card-status ${selectedIndex === dt.id ? 'inactive' : 'normal'} no-padding border-big-radius`" 
                    style="margin: 0 0;"
                    @click="onSelected(dt.id)">
                    <div class="display-flex nowrap align-center" style="padding: 10px 15px 10px 10px;">
                        <div class="width width-40px">
                            <div class="image image-30px image-circle">
                                <img 
                                    v-if="dt.image" 
                                    :src="categoryImageThumbnailUrl + dt.image" 
                                    alt="" 
                                    class="post-center">
                                <i v-else class="post-middle-absolute icn fa fa-lw fa-image"></i>
                            </div>
                        </div>
                        <div style="width: calc(100% - 40px);">
                            <div class="fonts fonts-10 black semibold">{{ dt.name }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </AppCardScrollable>
    </div>
</template>
<script>
import AppCardScrollable from '../../../../modules/AppCardScrollable'

export default {
    name: 'App',
    data () {
        return {
            selectedIndex: null,
        }
    },
    props: {
        data: null,
    },
    components: {
        AppCardScrollable
    },
    methods: {
        onSelected (data) {
            if (this.selectedIndex === data) {
                this.selectedIndex = null 
            } else {
                this.selectedIndex = data
            }
            this.$emit('onChange', this.selectedIndex)
        }
    }
}
</script>