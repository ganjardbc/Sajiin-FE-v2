<template>
    <div id="App" class="card-dashboard-container">
        <div class="padding padding-bottom-15px">
            <h1 class="fonts big black bold">Settings</h1>
        </div>
        <ThermalPrinter />
    </div>
</template>
<script>
import ThermalPrinter from './ThermalPrinter'

export default {
    metaInfo: {
        title: 'Owner',
        titleTemplate: '%s | Settings',
        htmlAttrs: {
            lang: 'en',
            amp: true
        }
    },
    components: {
        ThermalPrinter
    }
}
</script>