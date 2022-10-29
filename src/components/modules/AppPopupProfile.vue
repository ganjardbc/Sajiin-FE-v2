<template>
    <div id="App" class="width width-100">
        <router-link 
            :to="{name: 'admin-profile'}"
            :class="`card-small-profile display-flex align-center`" 
            style="height: 40px;">
            <div 
                class="image" 
                style="text-align: center; width: 40px; height: 40px; margin-right: 10px;">
                <img 
                    v-if="dataUser && dataUser.image" 
                    :src="dataUser && dataUser.image ? (adminImageThumbnailUrl + dataUser.image) : ''" 
                    alt="">
                <i 
                    v-else 
                    class="post-top fa fa-lg fa-user-circle" 
                    style="color: #999;" />
            </div>
            <div style="width: calc(100% - 50px);">
                <div class="fonts fonts-10 semibold black">{{ dataUser && dataUser.name }}</div>
                <div class="fonts fonts-10 black">{{ dataUser && dataUser.role_name }}</div>
            </div>
        </router-link>
    </div>
</template>
<script>
export default {
    name: 'App',
    data() {
        return {
            isSidebarSmall: false,
        }
    },
    props: {
        dataUser: {
            default: null 
        },
        notif: {
            required: true 
        }
    },
}
</script>