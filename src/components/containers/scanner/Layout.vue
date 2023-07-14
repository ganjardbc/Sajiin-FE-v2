<template>
    <div id="App">
        <router-view />
    </div>
</template>
<script>
import logo from '@/assets/img/logo.png'

export default {
    name: 'App',
    data () {
        return {
            logo: logo,
        }
    },
}
</script>