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
        payment_id: ''
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
        payment_id: ''
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
    },

    getters: {},

    mutations: {
        SET_LOADING (state, data) {
            state.loading = data 
        },
        SET_MESSAGE_DATA (state, data) {
            state.errorMessage = data 
        },
        RESET_ORDER (state) {
            state.form = defaultForm()
        },
        ADD_PRODUCT (state, data) {
            const currentProduct = state
                .form
                .details
                .find((item) => (
                    item.product_id === data.id && 
                    item.proddetail_id === data.varian.id 
                ))
            if (currentProduct === undefined) {
                const quantity = 1
                const price = data.varian.price
                const subtotal = quantity * price
                const payload = {
                    ...state.formProduct,
                    price: price,
                    discount: 0,
                    quantity: quantity,
                    subtotal: subtotal,
                    product_image: data.image,
                    product_name: data.name,
                    product_detail: data.varian.name,
                    product_id: data.id,
                    proddetail_id: data.varian.id,
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
                        if (
                            item.product_id === data.id && 
                            item.proddetail_id === data.varian.id
                        ) {
                            quantity = item.quantity + 1
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
                    status: 'on-progress'
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

            return axios.post('/api/order/postAdmin', params, { 
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
                    commit('SET_LOADING', false)
                })
        },
    }
}