<template>
    <div id="App" class="display-flex align-center">
        <div class="width width-20px">
            <i :class="`fonts fonts-9 ${iconColor ? iconColor : 'grey'} ${icon}`"></i>
        </div>
        <div class="margin margin-top-5px" style="width: calc(100% - 20px);">
            <div class="fonts fonts-10 grey overflow-ellipsis">{{ caption }}</div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'App',
    props: {
        icon: null,
        iconColor: null,
        caption: null,
    }
}
</script>