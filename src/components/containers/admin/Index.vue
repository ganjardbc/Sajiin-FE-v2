<template>
    <div id="App">
        <div class="padding padding-top-100px padding-bottom-100px">
            <AppEmpty 
                icon="fa fa-3x fa-shapes"
                title="WELCOME TO SAJI-IN ADMIN PANEL" />
        </div>
    </div>
</template>
<script>
import AppEmpty from '../../modules/AppEmpty.vue'

export default {
    name: 'App',
    metaInfo: {
        title: 'Admin',
        titleTemplate: '%s | Home',
        htmlAttrs: {
            lang: 'en',
            amp: true
        }
    },
    components: {
        AppEmpty
    }
}
</script>