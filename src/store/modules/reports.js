import axios from 'axios'
import moment from 'moment'

const defaultOrderStatus = () => {
    return [
        {value: 'all', label: 'All'},
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

const defaultOrderPaymentStatus = () => {
    return [
        {value: 'all', label: 'All'},
        {value: '1', label: 'Paid'},
        {value: '0', label: 'Unpaid'},
    ]
}

const downloadList = () => {
    return [
        {value: 'daily', label: 'Daily'},
        {value: 'this-week', label: 'Weekly'},
        {value: 'this-month', label: 'Monthly'},
        {value: 'this-year', label: 'Yearly'},
        {value: 'custom', label: 'Custom'},
    ]
}

export default {
    namespaced: true,

    state: {
        orderStatus: defaultOrderStatus(),
        orderType: defaultOrderType(),
        orderPaymentStatus: defaultOrderPaymentStatus(),
        downloadList: downloadList(),
        limit: 10,
        offset: 0,
        totalRecord: 0,
        grandItem: 0,
        grandTotal: 0,
        cashIn: 0,
        cashOut: 0,
        loading: false,
        loadMore: false,
        typeForm: 'create',
        data: [],
        filter: {
            search: '',
            report_type: '',
            order_date: [],
            order_status: '',
            payment_status: '',
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
        SET_GRAND_ITEM (state, value) {
            state.grandItem = value
        },
        SET_GRAND_TOTAL (state, value) {
            state.grandTotal = value
        },
        SET_CASH_IN (state, value) {
            state.cashIn = value
        },
        SET_CASH_OUT (state, value) {
            state.cashOut = value
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
            state.totalRecord = 0
            state.grandTotal = 0
            state.grandItem = 0
            state.cashIn = 0
            state.cashOut = 0
            state.filter = {
                search: '',
                report_type: '',
                order_date: [],
                order_status: '',
                payment_status: '',
            }
        },
        getData ({ commit, state }, data) {
            commit('SET_LOADING', true)

            let dataPrev = []
            const params = {
                limit: state.limit,
                offset: state.offset,
                search: data.search,
                status: data.status,
                payment_status: data.payment_status,
                start_date: data.start_date,
                end_date: data.end_date,
                shop_id: data.shop_id,
                cashbook_id: data.cashbook_id,
            }

            if (data.disable_limit) {
                delete params.limit
                delete params.offset
            }

            return axios.post('/api/order/getReport', params, { 
                    headers: { Authorization: data.token } 
                })
                .then((res) => {
                    const payload = res.data.data 

                    payload && payload.map((dt) => {
                        dataPrev.push({ ...dt })
                    })

                    commit('SET_DATA', dataPrev)
                    commit('SET_GRAND_ITEM', res.data.grand_item)
                    commit('SET_GRAND_TOTAL', res.data.grand_total)
                    commit('SET_CASH_IN', res.data.cash_in)
                    commit('SET_CASH_OUT', res.data.cash_out)
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
        download ({ commit, state }, data) {
            commit('SET_LOADING', true)

            const params = {
                search: data.search,
                status: data.status,
                payment_status: data.payment_status,
                start_date: data.start_date,
                end_date: data.end_date,
                shop_id: data.shop_id,
                cashbook_id: data.cashbook_id,
            }

            return axios.post('/api/order/downloadReport', params, { 
                    headers: { Authorization: data.token },
                    responseType: 'blob'
                })
                .then((res) => {
                    var file = new Blob([res.data], {
                        type: 'application/pdf'
                    })

                    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                        window.navigator.msSaveOrOpenBlob(file)
                    } else {
                        var fileURL = URL.createObjectURL(file)
                        window.open(fileURL, '_blank')
                    }

                    return res 
                })
                .finally(() => {
                    commit('SET_LOADING', false)
                })

        }
    }
}