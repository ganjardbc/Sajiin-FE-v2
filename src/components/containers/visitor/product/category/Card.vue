<template>
    <div id="App" class="display-flex space-between align-center wrap">
        <div class="horizontal-scroll" style="overflow-x: auto;">
            <div style="margin: 10px 5px 5px 0; flex-grow: 1; display: inline-block;">
                <div 
                    :class="`card card-status ${selectedIndex === 'all' ? 'active' : 'normal'} no-padding border-big-radius`" 
                    style="margin: 0 0;"
                    @click="onSelected('all')">
                    <div class="display-flex nowrap align-center" style="padding: 5px 10px 5px 5px;">
                        <div class="width width-40px">
                            <div class="image image-30px image-circle bg-white border-full">
                                <i class="post-middle-absolute icn fa fa-lw fa-utensils"></i>
                            </div>
                        </div>
                        <div style="width: calc(100% - 40px);">
                            <div class="fonts fonts-10 black semibold">All Products</div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-for="(dt, i) in data" :key="i" style="margin: 10px 8px 5px 0; flex-grow: 1; display: inline-block;">
                <div 
                    :class="`card card-status ${selectedIndex === dt.id ? 'active' : 'normal'} no-padding border-big-radius`" 
                    style="margin: 0 0;"
                    @click="onSelected(dt.id)">
                    <div class="display-flex nowrap align-center" style="padding: 5px 10px 5px 5px;">
                        <div class="width width-40px">
                            <div class="image image-30px image-circle bg-white border-full">
                                <img 
                                    v-if="dt.image" 
                                    :src="categoryImageThumbnailUrl + dt.image" 
                                    alt="" 
                                    class="post-center">
                                <i v-else class="post-middle-absolute icn fa fa-lw fa-utensils"></i>
                            </div>
                        </div>
                        <div style="width: calc(100% - 40px);">
                            <div class="fonts fonts-10 black semibold">{{ dt.name }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AppCardScrollable from '../../../../modules/AppCardScrollable'

export default {
    name: 'App',
    data () {
        return {
            selectedIndex: 'all',
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
            if (data === 'all') {
                this.selectedIndex = 'all' 
                this.$emit('onChange', null)
            } else {
                this.selectedIndex = data
                this.$emit('onChange', this.selectedIndex)
            }
        }
    }
}
</script>