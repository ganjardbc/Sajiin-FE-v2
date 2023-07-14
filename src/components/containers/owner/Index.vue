<template>
    <div id="App">
        <div class="padding padding-top-50px padding-bottom-50px">
            <AppEmpty 
                icon="fa fa-3x fa-shapes"
                title="WELCOME TO SAJI-IN OWNER PANEL" />
            <AppCardCircle :data="cards" />
        </div>
    </div>
</template>
<script>
import AppEmpty from '../../modules/AppEmpty'
import AppCardCircle from '../../modules/AppCardCircle'

export default {
    name: 'App',
    metaInfo: {
        title: 'Owner',
        titleTemplate: '%s | Home',
        htmlAttrs: {
            lang: 'en',
            amp: true
        }
    },
    data () {
        return {
            cards: [
                {title: 'Shops', icon: 'fa fa-2x fa-store', link: 'owner-shops'},
                {title: 'Profile', icon: 'fa fa-2x fa-user', link: 'owner-profile'},
            ]
        }
    },
    components: {
        AppEmpty,
        AppCardCircle
    }
}
</script>