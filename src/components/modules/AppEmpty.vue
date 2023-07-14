<template>
    <div id="AppEmpty" class="content-center" style="padding-top: 20px; padding-bottom: 20px;">
        <div style="width: 120px; height: 120px; border-radius: 100%; margin: auto; text-align: center;">
            <i :class="`post-center fonts fonts-50 red ${icon ? icon : 'fa fa-3x fa-info-circle'}`"></i>
        </div>
        <div class="fonts fonts-11 semibold align-center" style="margin-top: 20px;">{{ title ? title : 'NO DATA(S) FOUND' }}</div>
    </div>
</template>
<script>
export default {
    name: 'AppEmpty',
    props: {
        icon: null,
        title: null,
    }
}
</script>