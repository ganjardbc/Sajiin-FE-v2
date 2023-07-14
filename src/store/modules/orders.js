import moment from 'moment'
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

const defaultOrderPaymentStatus = () => {
    return [
        {value: '', label: 'All Payment'},
        {value: '1', label: 'Paid'},
        {value: '0', label: 'Unpaid'},
    ]
}

const defaultOrder = () => {
    return {
        id: 0,
        toping_price: 0,
        price: 0,
        discount: 0,
        quantity: 0,
        subtotal: 0,
        note: "",
        product_image: "",
        product_name: "",
        product_detail: "",
        product_toping: "",
        promo_code: "",
        order_id: 0,
        product_id: 0,
        proddetail_id: 0,
        toping_id: 0,
        shop_id: 0,
        assigned_id: 0,
        status: ""
    }
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
        formProduct: defaultOrder(),
        errorMessage: defaultMessage(),
        orderStatus: defaultOrderStatus(),
        orderType: defaultOrderType(),
        orderPaymentStatus: defaultOrderPaymentStatus(),
        limit: 10,
        offset: 0,
        totalRecord: 0,
        loading: false,
        loadMore: false,
        loadingForm: false,
        loadingReceipt: false,
        typeForm: 'create',
        data: [],
        selectedData: null,
        filter: {
            search: '',
            status: '',
            payment_status: '',
            cashbook_id: ''
        },
        product: {
            limit: 5,
            offset: 0,
            totalRecord: 0,
            loading: false,
            data: [],
            filter: {
                search: '',
                status: 'active',
            }
        },
        category: {
            limit: 50,
            offset: 0,
            totalRecord: 0,
            loading: false,
            data: [],
            filter: {
                search: '',
                status: 'active',
            }
        },
        cashbook: {
            loading: false,
            data: [],
        }
    },

    getters: {},

    mutations: {
        // ORDER
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
        SET_LOADING_RECEIPT (state, value) {
            state.loadingReceipt = value 
        },
        SET_OFFSET (state, value) {
            state.offset += value
        },
        SET_DATA (state, value) {
            state.data = value
        },
        SET_SELECTED_DATA (state, value) {
            state.selectedData = value 
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
        },

        // PRODUCT
        ADD_PRODUCT (state, data) {
            let currentProduct = undefined 
            if (data.varian) {
                currentProduct = state
                    .form
                    .details
                    .find((item) => (
                        item.product_id === data.id && 
                        item.proddetail_id === data.varian.id 
                    ))
            } else {
                currentProduct = state
                    .form
                    .details
                    .find((item) => (
                        item.product_id === data.id && 
                        item.proddetail_id === null
                    ))
            }
            if (currentProduct === undefined) {
                const quantity = 1
                const price = data.varian ? data.varian.price : data.price
                const secondPrice = data.varian ? data.varian.second_price : 0
                const discount = data.varian ? data.varian.value_discount : 0
                const isDiscount = data.varian ? data.varian.is_discount : 0
                const productDetail = data.varian ? data.varian.name : ''
                const productDetailId = data.varian ? data.varian.id : ''
                const subtotal = quantity * price
                const payload = {
                    ...state.formProduct,
                    price: price,
                    second_price: secondPrice,
                    discount: discount,
                    is_discount: isDiscount,
                    quantity: quantity,
                    subtotal: subtotal,
                    product_image: data.image,
                    product_name: data.name,
                    product_detail: productDetail,
                    product_id: data.id,
                    proddetail_id: productDetailId,
                    shop_id: data.shop_id,
                    status: "to-do"
                }
                state.form.details.push(payload)
            } else {
                const payload = state
                    .form
                    .details
                    .map((item) => {
                        let quantity = item.quantity
                        let price = item.price
                        let subtotal = quantity * price 
                        if (data.varian) {
                            if (
                                item.product_id === data.id && 
                                item.proddetail_id === data.varian.id
                            ) {
                                quantity = item.quantity + 1
                                price = item.price
                                subtotal = quantity * price
                            }
                        } else {
                            if (
                                item.product_id === data.id && 
                                item.proddetail_id === null
                            ) {
                                quantity = item.quantity + 1
                                price = item.price
                                subtotal = quantity * price
                            }
                        }
                        return {
                            ...item,
                            price: price,
                            quantity: quantity,
                            subtotal: subtotal,
                        }
                    })
                state.form.details = payload
            }
        },
        CHANGE_QUANTITY_PRODUCT (state, data) {
            const payload = state.form.details.map((item, index) => {
                    let quantity = item.quantity
                    let price = item.price
                    let subtotal = quantity * price 
                    if (index === data.index) {
                        quantity = data.quantity
                        price = item.price
                        subtotal = quantity * price
                    }
                    return {
                        ...item,
                        price: price,
                        quantity: quantity,
                        subtotal: subtotal,
                    }
                })
            state.form.details = payload
        },
        CHANGE_QUANTITY_ORDER (state) {
            let quantity = 0
            state.form.details.map((item, index) => {
                quantity += item.quantity
            })
            state.form = {
                ...state.form,
                total_item: quantity
            }
        },
        CHANGE_PRICE_ORDER (state) {
            let price = 0
            state.form.details.map((item, index) => {
                let quantity = item.quantity
                price += quantity * item.price
            })
            state.form = {
                ...state.form,
                total_price: price
            }
        },
        DELETE_PRODUCT (state, data) {
            let payload = []
            state.form.details && 
                state.form.details.map((item, index) => {
                    if (index !== data) {
                        payload.push({ ...item })
                    }
                })
            state.form.details = payload
        },
        DELETE_ALL_PRODUCT (state, data) {
            state.form.details = []
        },
        SET_LOADING_PRODUCT (state, value) {
            state.product.loading = value
        },
        SET_OFFSET_PRODUCT (state, value) {
            state.product.offset += value
        },
        SET_DATA_PRODUCT (state, value) {
            state.product.data = value
        },
        SET_TOTAL_RECORD_PRODUCT (state, value) {
            state.product.totalRecord = value
        },

        // CATEGORY
        SET_LOADING_CATEGORY (state, value) {
            state.category.loading = value
        },
        SET_OFFSET_CATEGORY (state, value) {
            state.category.offset += value
        },
        SET_DATA_CATEGORY (state, value) {
            state.category.data = value
        },
        SET_TOTAL_RECORD_CATEGORY (state, value) {
            state.category.totalRecord = value
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
        // PRODUCT
        addProduct ({ commit, state }, data) {
            commit('ADD_PRODUCT', data)
            commit('CHANGE_QUANTITY_ORDER')
            commit('CHANGE_PRICE_ORDER')
        },
        changeQuantityProduct ({ commit, state }, data) {
            commit('CHANGE_QUANTITY_PRODUCT', data)
            commit('CHANGE_QUANTITY_ORDER')
            commit('CHANGE_PRICE_ORDER')
        },
        deleteProduct ({ commit, state }, data) {
            commit('DELETE_PRODUCT', data)
            commit('CHANGE_QUANTITY_ORDER')
            commit('CHANGE_PRICE_ORDER')
        },
        deleteAllProduct ({ commit, state }) {
            commit('DELETE_ALL_PRODUCT')
            commit('CHANGE_QUANTITY_ORDER')
            commit('CHANGE_PRICE_ORDER')
        },
        setPaginationProduct ({ commit, state }, data) {
            state.product.offset = (data - 1) * state.product.limit
        },
        resetFilterProduct ({ commit, state }) {
            state.product.limit = 5
            state.product.offset = 0
        },
        getDataProduct ({ commit, state }, data) {
            commit('SET_LOADING_PRODUCT', true)

            let dataPrev = []

            const params = {
                limit: state.product.limit,
                offset: state.product.offset,
                search: state.product.filter.search,
                category: state.product.filter.category,
                status: state.product.filter.status,
                shop_id: data.shop_id
            }

            return axios.post('/api/product/getAll', params, { 
                    headers: { Authorization: data.token } 
                })
                .then((res) => {
                    const payload = res.data.data 

                    payload && payload.map((dt) => {
                        dataPrev.push({ ...dt.product, details: dt.details })
                    })

                    commit('SET_DATA_PRODUCT', dataPrev)
                    commit('SET_TOTAL_RECORD_PRODUCT', res.data.total_record)

                    return res
                })
                .catch((e) => {
                    console.log('error', e)
                })
                .finally(() => {
                    commit('SET_LOADING_PRODUCT', false)
                })
        },

        // CATEGORY
        setPaginationCategory ({ commit, state }, data) {
            state.category.offset = (data - 1) * state.category.limit
        },
        resetFilterCategory ({ commit, state }) {
            state.category.limit = 50
            state.category.offset = 0
        },
        getDataCategory ({ commit, state }, data) {
            commit('SET_LOADING_CATEGORY', true)

            let dataPrev = []

            const params = {
                limit: state.category.limit,
                offset: state.category.offset,
                search: state.category.filter.search,
                status: state.category.filter.status,
                user_id: data.user_id
            }

            return axios.post('/api/category/getAll', params, { 
                    headers: { Authorization: data.token } 
                })
                .then((res) => {
                    const payload = res.data.data 

                    payload && payload.map((dt) => {
                        dataPrev.push({ ...dt })
                    })

                    commit('SET_DATA_CATEGORY', dataPrev)
                    commit('SET_TOTAL_RECORD_CATEGORY', res.data.total_record)

                    return res
                })
                .catch((e) => {
                    console.log('error', e)
                })
                .finally(() => {
                    commit('SET_LOADING_CATEGORY', false)
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

        // ORDER
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
            state.limit = 10
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
                cashbook_id: state.filter.cashbook_id,
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
        getById ({ commit, state }, data) {
            commit('SET_LOADING', true)

            const params = {
                order_id: data.order_id
            }

            return axios.post('/api/order/getByID', params, { 
                    headers: { Authorization: data.token } 
                })
                .then((res) => {
                    if (res.data.status === 'ok') {
                        const payload = res.data.data 
                        commit('SET_SELECTED_DATA', payload)
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
        updateDataProduct ({ commit, state }, data) {
            commit('SET_LOADING_FORM', true)
            
            const params = {
                ...data
            }

            return axios.post('/api/order/updateAdmin', params, { 
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
        download ({ commit, state }, data) {
            commit('SET_LOADING_FORM', true)

            const params = {
                order_id: data.order_id,
                size_x: data.size_x,
                size_y: data.size_y,
            }

            return axios.post('/api/order/downloadReceipt', params, { 
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
                    commit('SET_LOADING_FORM', false)
                })

        },
        downloadOnly ({ commit, state }, data) {
            commit('SET_LOADING_RECEIPT', true)

            const params = {
                order_id: data.order_id,
                size_x: data.size_x,
                size_y: data.size_y,
            }

            return axios.post('/api/order/downloadReceipt', params, {
                    responseType: 'blob'
                })
                .then((res) => {
                    return res 
                })
                .finally(() => {
                    commit('SET_LOADING_RECEIPT', false)
                })

        }
    }
}