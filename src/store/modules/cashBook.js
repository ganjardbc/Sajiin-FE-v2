import axios from 'axios'
import moment from 'moment'

const defaultMessage = () => {
    return {
        id: '',
        cashbook_id: '',
        cash_date: '',
        cash_modal: '',
        cash_summary: '',
        cash_actual: '',
        cash_profit: '',
        cash_in: '',
        cash_out: '',
        cash_status: '',
        description: '',
        shop_id: '',
        status: '',
        is_available: ''
    }
}

const defaultForm = () => {
    return {
        id: '',
        cashbook_id: '',
        cash_date: '',
        cash_modal: 0,
        cash_summary: 0,
        cash_actual: 0,
        cash_profit: 0,
        cash_in: 0,
        cash_out: 0,
        cash_status: 'open',
        description: '',
        shop_id: '',
        status: 'active',
        is_available: 1
    }
}

export default {
    namespaced: true,

    state: {
        form: defaultForm(),
        errorMessage: defaultMessage(),
        limit: 10,
        offset: 0,
        totalRecord: 0,
        loading: false,
        loadMore: false,
        loadingForm: false,
        typeForm: 'create',
        data: [],
        dataCurrent: null,
        filter: {
            search: '',
            status: 'active',
        },
        shop: {
            limit: 1000,
            offset: 0,
            totalRecord: 0,
            data: [],
            loading: false,
            loadMore: false,
            loadingForm: false,
            filter: {
                search: '',
                status: 'active',
            },
        },
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
        SET_DATA_CURRENT (state, value) {
            state.dataCurrent = value 
        },
        SET_MESSAGE_DATA (state, value) {
            if (value) {
                state.errorMessage = value 
            } else {
                state.errorMessage = defaultMessage() 
            }
        },
        SET_FORM_DATA (state, value) {
            if (value) {
                state.form = value
            } else {
                const time = new Date().getTime()
                state.form = {
                    ...defaultForm(),
                    cashbook_id: `CB-${time}`,
                    cash_date: new Date(),
                    status: 'active',
                    is_available: 1
                }
            }
        },
        SET_TOTAL_RECORD (state, value) {
            state.totalRecord = value
        },

        // SHOP
        SET_SHOP_LOADING (state, value) {
            state.shop.loading = value
        },
        SET_SHOP_LOAD_MORE (state, value) {
            state.shop.loadMore = value
        },
        SET_SHOP_LOADING_FORM (state, value) {
            state.shop.loadingForm = value 
        },
        SET_SHOP_DATA (state, value) {
            state.shop.data = value
        },
        SET_SHOP_TOTAL_RECORD (state, value) {
            state.shop.totalRecord = value
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
            state.limit = 10
            state.offset = 0
        },
        restDataCurrent ({ commit, state }) {
            state.dataCurrent = null
        },
        getData ({ commit, state }, data) {
            commit('SET_LOADING', true)

            let dataPrev = []

            const params = {
                limit: state.limit,
                offset: state.offset,
                search: state.filter.search,
                status: state.filter.status,
                shop_id: data.shop_id
            }

            return axios.post('/api/cashbook/getAll', params, { 
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
        getCurrent ({ commit, state }, data) {
            commit('SET_LOADING', true)
            
            const params = {
                shop_id: data.shop_id,
                date: moment(data.date).format('YYYY-MM-DD')
            }

            return axios.post('/api/cashbook/getCurrent', params, { 
                    headers: { Authorization: data.token } 
                })
                .then((res) => {
                    const data = res.data.data 

                    commit('SET_DATA_CURRENT', data)

                    return res
                })
                .catch((e) => {
                    console.log('error', e)
                })
                .finally(() => {
                    commit('SET_LOADING', false)
                })
        },
        createData ({ commit, state }, data) {
            commit('SET_LOADING_FORM', true)
            
            const params = {
                ...data,
                cash_date: moment(data.cash_date).format('YYYY-MM-DD hh:mm:ss')
            }

            return axios.post('/api/cashbook/post', params, { 
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
        updateData ({ commit, state }, data) {
            commit('SET_LOADING_FORM', true)
            
            const params = {
                ...data,
                cash_date: moment(data.cash_date).format('YYYY-MM-DD hh:mm:ss')
            }

            return axios.post('/api/cashbook/update', params, { 
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
        deleteData ({ commit, state }, data) {
            commit('SET_LOADING_FORM', true)
            
            const params = {
                ...data
            }

            return axios.post('/api/cashbook/delete', params, { 
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

        // SHOP
        getDataShop ({ commit, state }, data) {
            commit('SET_SHOP_LOADING', true)

            let dataPrev = []

            const params = {
                limit: state.shop.limit,
                offset: state.shop.offset,
                search: state.shop.filter.search,
                status: state.shop.filter.status,
            }

            return axios.post('/api/shop/getAll', params, { 
                    headers: { Authorization: data.token } 
                })
                .then((res) => {
                    const payload = res.data.data 

                    payload && payload.map((dt) => {
                        dataPrev.push({ ...dt })
                    })

                    commit('SET_SHOP_DATA', dataPrev)
                    commit('SET_SHOP_TOTAL_RECORD', res.data.total_record)

                    return res
                })
                .catch((e) => {
                    console.log('error', e)
                })
                .finally(() => {
                    commit('SET_SHOP_LOADING', false)
                })
        },
    }
}