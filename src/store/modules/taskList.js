import axios from 'axios'
import moment from 'moment'

const defaultMessage = () => {
    return {
        id: '',
        role_id: '',
        role_name: '',
        description: '',
        type: '',
        status: '',
    }
}

const defaultForm = () => {
    return {
        id: '',
        role_id: '',
        role_name: '',
        description: '',
        type: 'admin',
        status: 'active',
    }
}

export default {
    namespaced: true,

    state: {
        form: defaultForm(),
        errorMessage: defaultMessage(),
        limit: 12,
        offset: 0,
        totalRecord: 0,
        loading: false,
        loadMore: false,
        loadingForm: false,
        typeForm: 'create',
        data: [],
        selected: null,
        filter: {
            search: '',
            cashbook_id: '',
            status: 'on-progress',
        },
        cashbook: {
            loading: false,
            data: [],
        }
    },

    getters: {},

    mutations: {
        RESET_ERROR_MESSAGE (state) {
            state.errorMessage = defaultMessage()
        },
        SET_LOADING (state, value) {
            state.loading = value
        },
        SET_LOAD_MORE (state, value) {
            state.loadMore = value
        },
        SET_LOADING_FORM (state, value) {
            state.loadingForm = value 
        },
        SET_OFFSET (state, value) {
            state.offset += value
        },
        SET_DATA (state, value) {
            state.data = value
        },
        SET_SELECTED (state, value) {
            state.selected = value
        },
        SET_MESSAGE_DATA (state, value) {
            if (value) {
                state.errorMessage = value 
            } else {
                state.errorMessage = defaultMessage() 
            }
        },
        SET_TOTAL_RECORD (state, value) {
            state.totalRecord = value
        },

        // CASH BOOK
        SET_LOADING_CASHBOOK (state, value) {
            state.cashbook.loading = value 
        },
        SET_DATA_CASHBOOK (state, value) {
            let data = [
                {value: '', label: 'All Cash Book'},
            ]
            let cashBook = value.all_cashbook

            cashBook && cashBook.map((item) => {
                data.push({ 
                    value: item.id, 
                    label: moment(item.cash_date ).format('DD MMMM YYYY')
                })
            })

            state.cashbook.data = data 
        },
    },

    actions: {
        setPagination ({ commit, state }, data) {
            state.offset = (data - 1) * state.limit
        },
        resetFilter ({ commit, state }) {
            state.limit = 12
            state.offset = 0
        },
        setSelected ({ commit, state }, data) {
            commit('SET_SELECTED', data)
        },
        getData ({ commit, state }, data) {
            commit('SET_LOADING', true)

            let dataPrev = []

            const params = {
                limit: state.limit,
                offset: state.offset,
                search: state.filter.search,
                status: state.filter.status,
                cashbook_id: state.filter.cashbook_id,
                shop_id: data.shop_id,
            }

            return axios.post('/api/orderItem/getAll', params, { 
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
        updateData ({ commit, state }, data) {
            commit('SET_LOADING_FORM', true)
            
            const params = {
                ...data.payload
            }

            return axios.post('/api/orderItem/update', params, { 
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

        // CASH BOOK
        getCashBook ({ commit, state }, data) {
            commit('SET_LOADING_CASHBOOK', true)
            
            const params = {
                shop_id: data.shop_id,
                date: moment(data.date).format('YYYY-MM-DD')
            }

            return axios.post('/api/cashbook/getCurrent', params, { 
                    headers: { Authorization: data.token } 
                })
                .then((res) => {
                    const data = res.data.data 

                    commit('SET_DATA_CASHBOOK', data)

                    return res
                })
                .catch((e) => {
                    console.log('error', e)
                })
                .finally(() => {
                    commit('SET_LOADING_CASHBOOK', false)
                })
        },
    }
}