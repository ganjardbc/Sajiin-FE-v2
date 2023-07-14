<template>
	<div id="App" class="display-flex center wrap">
        <router-link v-for="(dt, i) in data" :key="i" :to="{name: dt.link}" class="margin margin-15px">
            <div class="card bg-white width width-80px">
                <div class="image image-60px image-center image-circle bg-main box-shadow">
                    <i :class="`post-middle-absolute fonts fonts-20 white ${ dt.icon }`"></i>
                </div>
                <div class="fonts align-center fonts-11 semibold black margin margin-top-15px">{{ dt.title }}</div>
            </div>
        </router-link>
    </div>
</template>
<script>
export default {
    props: {
        data: null 
    }
}
</script>