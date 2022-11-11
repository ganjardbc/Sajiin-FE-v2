<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'App',
    data () {
        return {}
    },
    mounted () {
        const data = this.$session.get('user');
        const token = this.$session.get('token');
        if (data && token) {
            // const payload = {
            //     id: data.id,
            //     name: data.name,
            //     email: data.email,
            //     token: token
            // }
            // this.$socket.emit('admin', payload)

            // this.setShopData()
            // this.getShopData()
            // this.getCategoryData()
        }
    },
    computed: {
        ...mapState({
            // filterCategory: (state) => state.storeCategory.filter,
        })
    },
    methods: {
        ...mapActions({
            setToast: 'toast/setToast',
            // setShop: 'storeSelectedShop/setSelectedData',
            // getShop: 'storeSelectedShop/getData',
            // getCategory: 'storeCategory/getData'
        }),
        makeToast (title) {
            const payload = {
                visible: true,
                title: title
            }
            this.setToast(payload)
        },
        // setShopData () {
        //     const shop_id = this.$route.params.shopId
        //     this.setShop(shop_id)
        // },
        // getShopData () {
        //     const token = this.$session.get('tokenBearer')
        //     this.getShop({ token })
        // },
        // getCategoryData () {
        //     const token = this.$session.get('tokenBearer')
        //     this.filterCategory.status = 'active'
        //     this.getCategory({ token })
        // }
    },
    sockets: {
        connect: function () {
            this.makeToast('Connected to Socket')
        },
    }
}
</script>
<style>
    @import url('https://use.fontawesome.com/releases/v5.15.3/css/all.css');
</style>