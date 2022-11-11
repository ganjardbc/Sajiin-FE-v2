import axios from 'axios'

const defaultForm = () => {
    return {
        id: '',
        payment_id: '',
        image: '',
        name: '',
        status: 'active',
        description: ''
    }
}

export default {
    namespaced: true,

    state: {
        form: defaultForm(),
        errorMessage: defaultForm(),
        limit: 5,
        offset: 0,
        totalRecord: 0,
        loading: false,
        typeForm: 'create',
        data: [],
        filter: {
            search: '',
            status: 'active',
        }
    },

    getters: {},

    mutations: {
        RESET_ERROR_MESSAGE (state) {
            state.errorMessage = defaultForm()
        },
        SET_LOADING (state, value) {
            state.loading = value
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
        setFormData ({ commit, state }, data) {
            commit('SET_FORM_DATA', data)
        },
        resetFormData ({ commit, state }) {
            commit('SET_FORM_DATA', null)
            commit('SET_MESSAGE_DATA', null)
        },
        resetFilter ({ commit, state }) {
            state.limit = 5
            state.offset = 0
        },
        getData ({ commit, state }, data) {
            commit('SET_LOADING', true)

            let dataPrev = []

            const params = {
                limit: state.limit,
                offset: state.offset,
                search: state.filter.search,
                status: state.filter.status,
            }

            return axios.post('/api/payment/getAll', params, { 
                    headers: { Authorization: data.token } 
                })
                .then((res) => {
                    const payload = res.data.data 

                    payload && payload.map((dt) => {
                        dataPrev.push({ ...dt })
                    })

                    commit('SET_DATA', dataPrev)
                    commit('SET_TOTAL_RECORD', res.data.total_record)

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