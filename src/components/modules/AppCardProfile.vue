<template>
    <div id="App">
        <el-popover
            placement="bottom-end"
            width="180"
            trigger="click">
            <div class="width width-100 content-center">
                <div class="padding margin margin-bottom-15px padding padding-bottom-15px border-bottom">
                    <div 
                        class="image image-80px image-center image-circle" 
                        style="text-align: center; margin-bottom: 15px;">
                        <img 
                            v-if="data && data.image" 
                            :src="data && data.image ? (adminImageThumbnailUrl + data.image) : ''" 
                            alt="">
                        <i 
                            v-else 
                            class="post-top fa fa-lg fa-user-circle" 
                            style="color: #999;" />
                    </div>
                    <div class="fonts fonts-11 align-center semibold black">{{ data && data.name }}</div>
                    <div class="fonts fonts-9 align-center grey">@{{ data && data.username }}</div>
                </div>
                <button class="btn btn-full btn-sekunder" @click="onLogout">
                    <i class="icn icn-left fa fa-lw fa-power-off"></i> Logout
                </button>
            </div>
            <button 
                slot="reference"
                class="btn btn-sekunder btn-circle">
                <i class="icn icn-left fa fa-lw fa-user"></i> 
                {{ data && data.username }}
                <i class="icn icn-right fa fa-lw fa-caret-down"></i>
            </button>
        </el-popover>

        <!-- <button class="btn btn-icon btn-circle btn-white" @click="onLogout">
            <i class="icn fa fa-lw fa-power-off"></i>
        </button> -->

        <AppPopupConfirmed 
            v-if="visibleConfirmedLogout"
            :title="'Logout from your account ?'"
            @onClickNo="onClickNoLogout"
            @onClickYes="onClickYesLogout"
        />
    </div>
</template>
<script>
import { mapActions } from 'vuex'
import AppPopupConfirmed from './AppPopupConfirmed'

export default {
    name: 'App',
    data () {
        return {
            visibleConfirmedLogout: false 
        }
    },
    components: {
        AppPopupConfirmed
    },
    props: {
        data: null 
    },
    methods: {
        ...mapActions({
            logout: 'storeProfile/logout',
        }),

        // LOGOUT
        onLogout () {
            this.visibleConfirmedLogout = true
        },
        onClickNoLogout () {
            this.visibleConfirmedLogout = false
        },
        onClickYesLogout () {
            this.visibleConfirmedLogout = false
            const token = this.$session.get('tokenBearer')
            this.logout(token).then((res) => {
                if (res.data.status === 'ok') {
                    this.$session.remove('token')
                    this.$session.remove('tokenBearer')
                    this.$session.remove('user')
                    this.$session.remove('role')
                    this.$session.remove('shop')
                    this.$session.remove('employee')
                    this.$session.remove('permissions')

                    this.$router.push({ name: 'login' })
                }
            })
        },
    }
}
</script>