<template>
    <div 
        id="Register" 
        class="post-top" 
        style="padding-left: 10px; padding-right: 10px;">
        <div 
            class="card card-login border-radius box-shadow bg-white" 
            style="margin: auto;"
            v-loading="loading">
            <form 
                action="#" 
                @submit.prevent="submit" 
                class="width width-100 padding padding-top-20px padding-bottom-20px">
                <div class="width width-100 display-flex space-between align-center">
                    <div class="width width-100px">
                        <div class="image image-full image-center bg-transparent" style="padding-bottom: 40%;">
                            <img 
                                :src="logo" 
                                alt=""
                                class="post-center" 
                                style="width: 100%;">
                        </div>
                    </div>
                    <div>
                        <router-link :to="{name: 'login'}" class="fonts fonts-11 red semibold">Back to Login</router-link>
                    </div>
                </div>

                <div class="padding padding-top-15px padding-bottom-15px">
                    <div class="field-group">
                        <div class="field-label">Full Name</div>
                        <el-input 
                            placeholder=""
                            type="text"
                            v-model="form.name"
                            :disabled="loading"></el-input>
                        <div 
                            v-if="errorMessage.name" 
                            class="field-error">
                            {{ errorMessage.name && errorMessage.name[0] }}
                        </div>
                    </div>

                    <div class="field-group">
                        <div class="field-label">Your Email</div>
                        <el-input 
                            placeholder=""
                            type="email"
                            v-model="form.email"
                            :disabled="loading"
                            @input="onChangeEmail"></el-input>
                        <div 
                            v-if="errorMessage.email" 
                            class="field-error">
                            {{ errorMessage.email && errorMessage.email[0] }}
                        </div>
                    </div>

                    <div class="field-group">
                        <div class="field-label">Create Username</div>
                        <el-input 
                            placeholder=""
                            type="text"
                            v-model="form.username"
                            :disabled="loading"></el-input>
                        <div 
                            v-if="errorMessage.username" 
                            class="field-error">
                            {{ errorMessage.username && errorMessage.username[0] }}
                        </div>
                    </div>

                    <div class="field-group">
                        <div class="field-label">Create Password</div>
                        <el-input 
                            placeholder=""
                            type="password"
                            v-model="form.password"
                            :disabled="loading"
                            show-password></el-input>
                        <div 
                            v-if="errorMessage.password" 
                            class="field-error">
                            {{ errorMessage.password && errorMessage.password[0] }}
                        </div>
                    </div>
                </div>

                <button 
                    class="btn btn-full btn-main" 
                    :disabled="isButtonDisabled">
                    Register
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import logo from '@/assets/img/logo.png'

export default {
    name: "Register",

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
            register: 'storeAuth/register',
        }),

        onChangeEmail (data) {
            const email = data.split('@')
            this.form.username = email[0]
        },

        async submit () {
            const res = await this.register(this.form)
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
