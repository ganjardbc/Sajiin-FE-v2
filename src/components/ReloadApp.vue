<template>
    <div id="App" class="card-toast show">
        <div class="card-toast-content" style="min-width: 300px;">
            <div class="padding padding-15px">
                <div class="display-flex padding padding-bottom-15px">
                    <div style="width: 50px;">
                        <div class="btn btn-icon" style="padding: 0; cursor: default;">
                            <i class="fa fa-2x fa-bell fonts green" />
                        </div>
                    </div>
                    <div style="width: calc(100% - 50px);">
                        <div class="fonts fonts-11 semibold white">New update is available</div>
                        <div class="fonts fonts-9 normal white">Click "Update Now" to reload the app</div>
                    </div>
                </div>
                <div class="display-flex space-between">
                    <div style="width: calc(50% - 5px);">
                        <button class="btn btn-sekunder btn-small btn-full" @click="closeReload">
                            Later
                        </button>
                    </div>
                    <div style="width: calc(50% - 5px);">
                        <button class="btn btn-main btn-small btn-full" @click="reloadApplication">
                            Update Now
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    methods: {
        closeReload () {
            this.$emit('closeReload')
        },
        reloadApplication () {
            this.$emit('reloadApplication')
        }
    }
}
</script>