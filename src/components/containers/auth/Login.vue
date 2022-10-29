<template>
    <div 
        id="Login" 
        class="post-top" 
        style="padding-left: 10px; padding-right: 10px;">
        <div 
            class="card card-login border-radius box-shadow bg-white" 
            style="margin: auto;"
            v-loading="loading">
            <form 
                action="#" 
                @submit.prevent="submit" 
                class="width width-100 padding padding-top-30px padding-bottom-30px">
                <div 
                    class="image image-all image-center bg-transparent" 
                    style="width: 200px; padding-bottom: 30%;">
                    <img 
                        :src="logo" 
                        alt="SAJI-IN"
                        class="post-center" 
                        style="width: 100%;">
                </div>

                <div class="padding padding-top-15px padding-bottom-15px">
                    <div class="field-group">
                        <div class="field-label">Your E-mail</div>
                        <el-input 
                            placeholder="example@gmail.com"
                            type="email"
                            v-model="form.email"
                            :disabled="loading"></el-input>
                        <div 
                            v-if="errorMessage.email" 
                            class="field-error">
                            {{ errorMessage.email }}
                        </div>
                    </div>

                    <div class="field-group">
                        <div class="field-label">Your Password</div>
                        <el-input 
                            placeholder="password"
                            type="password"
                            v-model="form.password"
                            :disabled="loading"
                            show-password></el-input>
                        <div 
                            v-if="errorMessage.password" 
                            class="field-error">
                            {{ errorMessage.password }}
                        </div>
                    </div>
                </div>

                <button 
                    :class="`btn btn-full btn-main`" 
                    :disabled="isButtonDisabled">
                    Login
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import logo from '@/assets/img/logo.png'

export default {
    name: "Login",
    components: {},

    data () {
        return {
            logo: logo,
        }
    },

    mounted() {},

    computed: {
        ...mapState({
            form: (state) => state.storeAuth.form,
            errorMessage: (state) => state.storeAuth.errorMessage,
            loading: (state) => state.storeAuth.loading,
        }),
        isButtonDisabled () {
            let status = true 
            if (this.form.email && this.form.password) {
                status = false
            }
            return status
        }
    },

    methods: {
        ...mapActions({
            login: 'storeAuth/login',
        }),

        async submit () {
            const res = await this.login(this.form)
            if (res.data.status === 'ok') {
                console.log('submit', res)

                const data = res.data.data 

                this.$session.set('token', data.token)
                this.$session.set('tokenBearer', `Bearer ${data.token}`)
                this.$session.set('user', data.user)
                this.$session.set('role', data.role)
                this.$session.set('shop', data.shop)
                this.$session.set('employee', data.employee)
                this.$session.set('permissions', data.permissions)

                this.$router.replace({ name: 'owner-home' })

                // if (data) {
                //     const payload = {
                //         id: data.user.id,
                //         name: data.user.name,
                //         email: data.user.email,
                //         token: data.token,
                //     }
                //     this.$socket.emit('admin', payload)
                // }
            }
        }
    },

    beforeCreate: function () {
        if (this.$session.get('token')) 
        {
            this.$router.replace({ name: 'owner-home' })
        }
    }
}

</script>
