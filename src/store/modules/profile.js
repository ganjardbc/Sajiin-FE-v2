import axios from 'axios'

const defaultForm = () => {
    return {
        id: '',
        image: '',
        name: '',
        username: '',
        email: '',
        password: '',
        email_verified_at: '',
        provider: '',
        enabled: '',
        status: '',
        owner_id: '',
        role_id: '',
        role_name: ''
    }
}

export default {
    namespaced: true,

    state: {
        form: defaultForm(),
        errorMessage: defaultForm(),
        data: null,
        loading: false,
        loadingForm: false,
    },

    getters: {},

    mutations: {
        RESET_ERROR_MESSAGE (state) {
            state.errorMessage = defaultForm()
        },
        SET_MESSAGE_DATA (state, value) {
            if (value) {
                state.errorMessage = value 
            } else {
                state.errorMessage = defaultForm() 
            }
        },
        SET_DATA (state, value) {
            state.data = value
            state.form = {
                ...state.form,
                ...value
            }
        },
        SET_LOADING (state, value) {
            state.loading = value
        },
        SET_LOADING_FORM (state, value) {
            state.loadingForm = value
        },
    },

    actions: {
        logout ({ commit }, token = '') {
            commit('SET_LOADING_FORM', true)
            return axios.post(
                '/api/logout', 
                {token: token}, 
                { headers: { Authorization: token } })
                .then((res) => {
                    return res
                })
                .finally(() => {
                    commit('SET_LOADING_FORM', false)
                })
        },
        getData ({ commit }, token = '') {
            commit('SET_LOADING', true)
            return axios.get('/api/me', { headers: { Authorization: token } })
                .then((res) => {
                    if (res.data.status === 'ok') {
                        const data = res.data.data 
                        commit('SET_DATA', data.user)
                    }
                    return res
                })
                .finally(() => {
                    commit('SET_LOADING', false)
                })
        },
        updateData ({ commit, state }, data) {
            commit('SET_LOADING_FORM', true)
            
            const params = {
                ...data
            }

            return axios.post('/api/user/update', params, { 
                    headers: { Authorization: data.token } 
                })
                .then((res) => {
                    const data = res.data 
                    if (data.status === 'ok') {
                        commit('SET_MESSAGE_DATA', data.message)
                    } else {
                        commit('SET_MESSAGE_DATA', data.message)
                    }
                    return res
                })
                .catch((e) => {
                    console.log('error', e)
                })
                .finally(() => {
                    commit('SET_LOADING_FORM', false)
                })
        },
        uploadCover ({ commit, state }, data) {
            commit('SET_LOADING_FORM', true)
    
            let params = new FormData()
            params.append('id', data.id)
            params.append('image', data.image)
    
            return axios.post('/api/user/uploadImage', params, { 
                    headers: { Authorization: data.token } 
                })
                .then((res) => {
                    return res
                })
                .catch((e) => {
                    console.log('error', e)
                })
                .finally(() => {
                    commit('SET_LOADING_FORM', false)
                })
        },
    }
}