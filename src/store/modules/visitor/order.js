import axios from 'axios'

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
        payment_id: '',
        cashbook_id: '',
    }
}

const defaultOrder = () => {
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
        status: 'new-order',
        type: 'dine-in',
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
        payment_id: '',
        cashbook_id: '',
    }
}

const defaultProduct = () => {
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
        cart_id: 0,
        owner_id: 0,
        disableButton: false,
        disableSelect: false,
        status: ""
    }
}

const defaultForm = () => {
    return {
        order: defaultOrder(),
        details: [],
        customer: null,
        table: null,
        address: null,
        shipment: null,
        payment: null,
        shop: null,
        config: null
    }
}

export default {
    namespaced: true,

    state: {
        form: defaultForm(),
        formProduct: defaultProduct(),
        errorMessage: defaultMessage(),
        data: null,
        loading: false,
        loadingForm: false,
    },

    getters: {},

    mutations: {
        SET_LOADING (state, data) {
            state.loading = data 
        },
        SET_LOADING_FORM (state, data) {
            state.loadingForm = data 
        },
        SET_DATA (state, data) {
            state.data = data 
        },
        SET_MESSAGE_DATA (state, data) {
            state.errorMessage = data 
        },
        RESET_ORDER (state) {
            state.form = defaultForm()
        },
        RESET_PRODUCT (state) {
            state.formProduct = defaultProduct()
        },
        ADD_PRODUCT (state, data) {
            let currentProduct = undefined 
            if (data.varian) {
                currentProduct = state
                    .form
                    .details
                    .find((item) => (
                        item.product_id === data.product_id && 
                        item.proddetail_id === data.proddetail_id
                    ))
            } else {
                currentProduct = state
                    .form
                    .details
                    .find((item) => (
                        item.product_id === data.product_id && 
                        item.proddetail_id === null
                    ))
            }
            if (currentProduct === undefined) {
                const time = new Date().getTime()
                const quantity = data.quantity
                const discount = data.value_discount
                const isDiscount = data.is_discount
                const price = data.price 
                const secondPrice = data.second_price
                const subtotal = quantity * price
                const payload = {
                    ...state.formProduct,
                    cart_id: `CRT-${time}`,
                    price: price,
                    second_price: secondPrice,
                    discount: discount,
                    is_discount: isDiscount,
                    quantity: quantity,
                    subtotal: subtotal,
                    product_image: data.product_image,
                    product_name: data.product_name,
                    product_detail: data.product_detail,
                    product_id: data.product_id,
                    proddetail_id: data.proddetail_id,
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
                                item.product_id === data.product_id && 
                                item.proddetail_id === data.proddetail_id
                            ) {
                                quantity = item.quantity + data.quantity
                                price = item.price
                                subtotal = quantity * price
                            }
                        } else {
                            if (
                                item.product_id === data.product_id && 
                                item.proddetail_id === null
                            ) {
                                quantity = item.quantity + data.quantity
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
        DELETE_PRODUCT (state, data) {
            let payload = []
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
        SET_ORDER (state, data) {
            const time = new Date().getTime()
            const payload = {
                ...state.form,
                order: {
                    ...state.form.order,
                    order_id: `ODR-${time}`,
                    shop_id: data.shop.id,
                    shop_name: data.shop.name,
                    total_item: data.total_item,
                    total_price: data.total_price,
                    status: 'new-order'
                },
                shop: {
                    ...data.shop
                }
            }
            state.form = payload
        },
        SET_ORDER_BILLS (state, data) {
            const bills_price = data ? parseInt(data) : 0
            const total_price = parseInt(state.form.order.total_price)
            const total = bills_price - total_price
            const payload = {
                ...state.form,
                order: {
                    ...state.form.order,
                    bills_price: bills_price,
                    change_price: total,
                    payment_status: total >= 0 ? 1 : 0
                }
            }
            state.form = payload 
        }
    },

    actions: {
        // PRODUCT
        addProduct ({ commit, state }, data) {
            commit('ADD_PRODUCT', data)
        },
        changeQuantityProduct ({ commit, state }, data) {
            commit('CHANGE_QUANTITY_PRODUCT', data)
        },
        deleteProduct ({ commit, state }, data) {
            commit('DELETE_PRODUCT', data)
        },
        deleteAllProduct ({ commit, state }) {
            commit('DELETE_ALL_PRODUCT')
        },
        resetProduct ({ commit, state }) {
            commit('RESET_PRODUCT')
        },

        // ORDER
        resetOrder ({ commit, state }) {
            commit('RESET_ORDER')
        },
        setOrder ({ commit, state }, data) {
            commit('SET_ORDER', data)
        },
        setOrderBills ({ commit, state }, data) {
            commit('SET_ORDER_BILLS', data)
        },
        createOrder ({ commit, state }, data) {
            commit('SET_LOADING', true)
            
            const params = {
                ...data
            }

            return axios.post('/api/public/createOrder', params)
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
                    commit('SET_LOADING', false)
                })
        },
        getById ({ commit, state }, data) {
            commit('SET_LOADING', true)

            const params = {
                order_id: data.order_id
            }

            return axios.post('/api/public/orderByID', params)
                .then((res) => {
                    if (res.data.status === 'ok') {
                        const payload = res.data.data 
                        commit('SET_DATA', payload)
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
        download ({ commit, state }, data) {
            commit('SET_LOADING_FORM', true)

            const params = {
                order_id: data.order_id,
                size_x: data.size_x,
                size_y: data.size_y,
            }

            return axios.post('/api/order/downloadReceipt', params, {
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

        }
    }
}