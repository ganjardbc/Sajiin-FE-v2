import axios from 'axios'

const defaultList = () => {
    return {
        email: '',
        password: '',
        remember: false
    }
}

export default {
    namespaced: true,

    state: {
        form: defaultList(),
        errorMessage: defaultList(),
        data: null,
        loading: false,
    },

    getters: {},

    mutations: {
        RESET_ERROR_MESSAGE (state) {
            state.errorMessage = defaultList()
        },
        SET_DATA (state, value) {
            state.data = value
        },
        SET_LOADING (state, value) {
            state.loading = value
        },
    },

    actions: {
        setData ({ commit }, data) {
            commit('SET_DATA', data)
        },
        login ({ commit, state }, data) {
            commit('RESET_ERROR_MESSAGE')
            commit('SET_LOADING', true)

            return axios.post('/api/auth/login', data)
                .then((res) => {
                    const status = res.data.status
                    const message = res.data.message
                    if (status === 'email-invalid') {
                        state.errorMessage.email = message
                    } 
                    if (status === 'password-invalid') {
                        state.errorMessage.password = message
                    }
                    return res
                })
                .finally(() => {
                    commit('SET_LOADING', false)
                })
        },
        getUserData ({ commit }, token = '') {
            return axios.get('/api/me', { headers: { Authorization: token } })
                .then((res) => {
                    if (res.data.status === 'ok') {
                        const data = res.data.data 
                        commit('SET_DATA', data)
                    }
                    return res
                })
        }
    }
}