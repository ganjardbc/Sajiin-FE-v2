import axios from 'axios'

export default {
    namespaced: true,

    state: {
        limit: 10,
        offset: 0,
        totalRecord: 0,
        loading: false,
        loadMore: false,
        typeForm: 'create',
        data: [],
        filter: {
            search: '',
            category: '',
            status: '',
        }
    },

    getters: {},

    mutations: {
        SET_LOADING (state, value) {
            state.loading = value
        },
        SET_LOAD_MORE (state, value) {
            state.loadMore = value
        },
        SET_OFFSET (state, value) {
            state.offset += value
        },
        SET_DATA (state, value) {
            state.data = value
        },
        SET_TOTAL_RECORD (state, value) {
            state.totalRecord = value
        },

    },

    actions: {
        setPagination ({ commit, state }, data) {
            state.offset = (data - 1) * state.limit
        },
        resetFilter ({ commit, state }) {
            state.limit = 10
            state.offset = 0
            state.data = []
        },
        getData ({ commit, state }, data) {
            commit('SET_LOADING', true)
            commit('SET_LOAD_MORE', false)

            let dataPrev = []

            if (state.offset > 0) {
                dataPrev = Object.assign([], state.data)
            } else {
                dataPrev = []
            }

            const params = {
                limit: state.limit,
                offset: state.offset,
                search: state.filter.search,
                category: state.filter.category,
                status: state.filter.status,
                shop_id: data.shop_id
            }

            return axios.post('/api/public/product', params, { 
                    headers: { Authorization: data.token } 
                })
                .then((res) => {
                    const payload = res.data.data 

                    payload && payload.map((dt) => {
                        dataPrev.push({ ...dt.product, details: dt.details })
                    })

                    commit('SET_DATA', dataPrev)
                    commit('SET_TOTAL_RECORD', res.data.total_record)

                    if (payload.length > 0) {
                        state.offset += state.limit
                    }

                    if (payload.length < state.limit) {
                        commit('SET_LOAD_MORE', false)
                    } else {
                        commit('SET_LOAD_MORE', true)
                    }

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