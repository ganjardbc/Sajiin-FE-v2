import axios from 'axios'
import moment from 'moment'

export default {
    namespaced: true,

    state: {
        options: {
            chart: {
                id: 'vuechart-example'
            },
            xaxis: {
                categories: []
            }
        },
        series: [
            {
                name: 'orders',
                data: []
            }
        ],
        matrix: {
            allOrder: 0,
            allAdmin: 0,
            done: 0,
            canceled: 0,
            newOrder: 0,
            onProgress: 0,
        },
        loading: false,
    },

    getters: {},

    mutations: {
        SET_SERIES (state, value) {
            state.series = [{
                ...state.series[0],
                data: value
            }]
        },
        SET_OPTIONS (state, value) {
            state.options = {
                ...state.options,
                xaxis: {
                    caregories: value
                }
            }
        },
        SET_MATRIX (state, value) {
            state.matrix = value
        },
        SET_LOADING (state, value) {
            state.loading = value
        },
    },

    actions: {
        getData ({ commit }, data) {
            commit('SET_LOADING', true)
            const payload = {
                shop_id: data.shop_id 
            }
            return axios.post(
                '/api/order/getDashboard', 
                payload, 
                { 
                    headers: { Authorization: data.token } 
                })
                .then((res) => {
                    if (res.data.status === 'ok') {
                        let yAxis = []
                        let xAxis = []
                        const data = res.data.data 
                        data && data.map((dt) => {
                            yAxis.push(moment(dt.date).format("MMM, Do"))
                            xAxis.push(dt.count)
                        })
                        commit('SET_OPTIONS', yAxis)
                        commit('SET_SERIES', xAxis)
                    }
                    return res
                })
                .finally(() => {
                    commit('SET_LOADING', false)
                })
        },
        async getMatrix ({ commit }, data) {
            commit('SET_LOADING', true)
            const payload = {
                shop_id: data.shop_id 
            }
            return await axios.post(
                '/api/order/getCountByStatus', 
                payload, 
                { 
                    headers: { Authorization: data.token } 
                })
                .then((res) => {
                    const data = res.data.data
                    const matrix = {
                        allOrder: data.all_order,
                        done: data.done,
                        canceled: data.canceled,
                        newOrder: data.new_order,
                        onProgress: data.on_progress,
                    }

                    commit('SET_MATRIX', matrix)

                    return res
                })
                .finally(() => {
                    commit('SET_LOADING', false)
                })
        }
    }
}