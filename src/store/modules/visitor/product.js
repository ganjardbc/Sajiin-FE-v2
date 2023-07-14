import axios from 'axios'

export default {
    namespaced: true,

    state: {
        loading: false,
        data: null,
    },

    getters: {},

    mutations: {
        SET_LOADING (state, value) {
            state.loading = value
        },
        SET_DATA (state, value) {
            state.data = value
        },
    },

    actions: {
        setPagination ({ commit, state }, data) {
            state.offset = (data - 1) * state.limit
        },
        resetFilter ({ commit, state }) {
            state.limit = 8
            state.offset = 0
        },
        getData ({ commit, state }, data) {
            commit('SET_LOADING', true)

            return axios.post('/api/public/productByID', { product_id: data })
                .then((res) => {
                    const payload = res.data.data 
                    commit('SET_DATA', payload)
                    return res
                })
                .catch((e) => {
                    console.log('error', e)
                })
                .finally(() => {
                    commit('SET_LOADING', false)
                })
        },
    }
}