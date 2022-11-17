import axios from 'axios'

const defaultOrderStatus = () => {
    return [
        {value: 'new-order', label: 'New Order'},
        {value: 'on-progress', label: 'On Progress'},
        {value: 'done', label: 'Done'},
        {value: 'canceled', label: 'Canceled'},
    ]
}

const defaultOrderType = () => {
    return [
        {value: 'dine-in', label: 'Dine In'},
        {value: 'dine-out', label: 'Dine Out'}
    ]
}

const defaultMessage = () => {
    return {
        id: '',
        order_id: '',
        delivery_fee: '',
        total_price: '',
        total_item: '',
        bills_price: '',
        change_price: '',
        payment_status: '',
        proof_of_payment: '',
        status: '',
        type: '',
        note: '',
        customer_name: '',
        shop_name: '',
        table_name: '',
        payment_name: '',
        shipment_name: '',
        config_id: '',
        shop_id: '',
        customer_id: '',
        table_id: '',
        address_id: '',
        shipment_id: '',
        payment_id: ''
    }
}

const defaultForm = () => {
    return {
        id: '',
        order_id: '',
        delivery_fee: 0,
        total_price: 0,
        total_item: 0,
        bills_price: 0,
        change_price: 0,
        payment_status: 0,
        proof_of_payment: '',
        status: 'unconfirmed',
        type: 'personal',
        note: '',
        customer_name: '',
        shop_name: '',
        table_name: '',
        payment_name: '',
        shipment_name: '',
        config_id: null,
        shop_id: '',
        customer_id: '',
        table_id: '',
        address_id: '',
        shipment_id: '',
        payment_id: ''
    }
}

export default {
    namespaced: true,

    state: {
        form: defaultForm(),
        errorMessage: defaultMessage(),
        orderStatus: defaultOrderStatus(),
        orderType: defaultOrderType(),
        limit: 5,
        offset: 0,
        totalRecord: 0,
        loading: false,
        loadMore: false,
        loadingForm: false,
        typeForm: 'create',
        data: [],
        filter: {
            search: '',
            status: '',
            payment_status: '',
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
                    order_id: `INV-${time}`,
                    status: 'confirmed',
                    is_available: 1
                }
            }
        },
        SET_TOTAL_RECORD (state, value) {
            state.totalRecord = value
        },
        SET_ORDER_BILLS (state, data) {
            const bills_price = data ? parseInt(data) : 0
            const total_price = parseInt(state.form.total_price)
            const total = bills_price - total_price
            const payload = {
                ...state.form,
                bills_price: bills_price,
                change_price: total,
                payment_status: total >= 0 ? 1 : 0
            }
            state.form = payload 
        }
    },

    actions: {
        setPagination ({ commit, state }, data) {
            state.offset = (data - 1) * state.limit
        },
        setFormData ({ commit, state }, data) {
            commit('SET_FORM_DATA', data)
        },
        setLoadingForm ({ commit, state }, data) {
            commit('SET_LOADING_FORM', data)
        },
        setOrderBills ({ commit, state }, data) {
            commit('SET_ORDER_BILLS', data)
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
            commit('SET_LOAD_MORE', false)

            let dataPrev = []

            const params = {
                limit: state.limit,
                offset: state.offset,
                search: state.filter.search,
                status: state.filter.status,
                payment_status: state.filter.payment_status,
                shop_id: data.shop_id
            }

            return axios.post('/api/order/getAll', params, { 
                    headers: { Authorization: data.token } 
                })
                .then((res) => {
                    const payload = res.data.data 

                    payload && payload.map((dt) => {
                        dataPrev.push({ ...dt })
                    })

                    commit('SET_DATA', dataPrev)
                    commit('SET_TOTAL_RECORD', res.data.total_record)

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
        createData ({ commit, state }, data) {
            commit('SET_LOADING_FORM', true)
            
            const params = {
                ...data
            }

            return axios.post('/api/order/post', params, { 
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
                ...data
            }

            return axios.post('/api/order/update', params, { 
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

            return axios.post('/api/order/delete', params, { 
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
        uploadCover ({ commit, state }, data) {
            commit('SET_LOADING_FORM', true)
    
            let params = new FormData()
            params.append('order_id', data.order_id)
            params.append('image', data.image)
    
            return axios.post('/api/order/uploadImage', params, { 
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