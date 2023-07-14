<template>
    <div id="Auth" class="display-popup-normal bg-white" style="z-index: 1000;">
        <keep-alive>
            <router-view />
        </keep-alive>
    </div>
</template>
<script>
export default {
    beforeMount: function () {
        if (this.$cookies.get('token')) 
        {
            const user = this.$cookies.get('user')
            if (user.role_name === 'admin') {
                // window.location = '/admin/home'
                this.$router.replace('/admin/home')
            }
            else if (user.role_name === 'owner') {
                // window.location = '/owner/home'
                this.$router.replace('/owner/home')
            }
            else {
                // window.location = '/employee/home'
                this.$router.replace('/employee/home')
            }
        }
    }
}
</script>