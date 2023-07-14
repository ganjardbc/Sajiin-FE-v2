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
                class="width width-100 padding padding-top-30px padding-bottom-20px">
                <div class="width width-150px width-center">
                    <div 
                        class="image image-full image-center bg-transparent" 
                        style="padding-bottom: 40%;">
                        <img 
                            :src="logo" 
                            alt=""
                            class="post-center" 
                            style="width: 100%;">
                    </div>
                </div>

                <div class="fonts fonts-11 semibold black align-center margin margin-top-15px">Serve All You Want</div>

                <div class="padding padding-top-15px padding-bottom-15px">
                    <div class="field-group">
                        <div class="field-label">Username</div>
                        <el-input 
                            placeholder=""
                            type="text"
                            v-model="form.username"
                            :disabled="loading"></el-input>
                        <div 
                            v-if="errorMessage.username" 
                            class="field-error">
                            {{ errorMessage.username }}
                        </div>
                    </div>

                    <div class="field-group">
                        <div class="field-label">Password</div>
                        <el-input 
                            placeholder=""
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

                <button class="btn btn-full btn-main" :disabled="isButtonDisabled">Login</button>

                <div class="width width-100">
                    <div class="display-flex center padding padding-top-15px">
                        <div class="fonts fonts-11 black align-center">Or</div>
                    </div>
                    <div class="display-flex center padding padding-top-10px">
                        <router-link :to="{name: 'visitor-qrscanner'}" class="fonts fonts-11 red semibold align-center">QR Code Scanner</router-link>
                    </div>
                </div>

                <div class="display-flex center padding padding-top-30px">
                    <div class="fonts fonts-10 grey align-center">App Version 1.0.0</div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import logo from '@/assets/img/logo.png'

export default {
    name: "Login",

    metaInfo: {
        title: 'SAJI-IN',
        titleTemplate: '%s | Serve All You Want',
        htmlAttrs: {
            lang: 'en',
            amp: true
        }
    },

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
            if (this.form.username && this.form.password) {
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
                const data = res.data.data 

                this.$cookies.set('token', data.token)
                this.$cookies.set('tokenBearer', `Bearer ${data.token}`)
                this.$cookies.set('user', data.user)
                this.$cookies.set('role', data.role)
                this.$cookies.set('shop', data.shop)
                this.$cookies.set('employee', data.employee)
                this.$cookies.set('permissions', JSON.stringify(data.permissions))

                if (data.user.role_name === 'admin') {
                    this.$router.replace('/admin/home')
                }
                else if (data.user.role_name === 'owner') {
                    this.$router.replace('/owner/home')
                }
                else {
                    this.$router.replace('/employee/home')
                }
            }
        }
    },
}

</script>
