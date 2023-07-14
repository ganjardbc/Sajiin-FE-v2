import axios from 'axios'
import moment from 'moment'

export default {
    namespaced: true,

    state: {
        loading: false,
        data: false,
        selected: false
    },

    getters: {
        data (state) {
            return state.data
        },
        selected (state) {
            return state.selected
        }
    },

    mutations: {
        SET_DATA (state, value) {
            state.data = value
        },
        SET_SELECTED (state, value) {
            state.selected = value
        },
        SET_LOADING (state, value) {
            state.loading = value
        }
    },

    actions: {
        async setData ({commit}, data = '') {
            commit('SET_SELECTED', data)
        },
        async getShop ({commit}, data) {
            commit('SET_LOADING', true)
            const params = {
                shop_id: data.shop_id,
                date: moment(data.date).format('YYYY-MM-DD')
            }
            const url = '/api/public/shopByID'
            return await axios.post(url, params)
                .then((res) => {
                    if (res && res.status === 200) {
                        const data = res.data.data
                        commit('SET_DATA', data)
                    } else {
                        commit('SET_DATA', null)
                    }
                    return res
                })
                .catch(() => {
                    commit('SET_DATA', null)
                })
                .finally(() => {
                    commit('SET_LOADING', false)
                })
        }
    }
}