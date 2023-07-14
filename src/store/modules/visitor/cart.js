import axios from 'axios'

const defaultMessage = () => {
    return {
        id: "",
        toping_price: "",
        price: "",
        discount: "",
        quantity: "",
        subtotal: "",
        note: "",
        product_image: "",
        product_name: "",
        product_detail: "",
        product_toping: "",
        promo_code: "",
        order_id: "",
        product_id: "",
        proddetail_id: "",
        toping_id: "",
        shop_id: "",
        assigned_id: "",
        status: ""
    }
}

const defaultForm = () => {
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

export default {
    namespaced: true,

    state: {
        form: defaultForm(),
        errorMessage: defaultMessage(),
        limit: 50,
        offset: 0,
        totalRecord: 0,
        loading: false,
        loadMore: false,
        loadingForm: false,
        typeForm: 'create',
        data: [],
        filter: {
            search: '',
            status: 'active',
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
        ADD_TO_CART (state, data) {
            const currentProduct = state
                .data
                .find((item) => (
                    item.product_id === data.product_id && 
                    item.proddetail_id === data.proddetail_id 
                ))
            if (currentProduct === undefined) {
                const quantity = data.quantity
                const discount = data.value_discount
                const isDiscount = data.is_discount
                const price = data.price 
                const secondPrice = data.second_price
                const subtotal = quantity * price
                const payload = {
                    ...state.form,
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
                state.data.push(payload)
            } else {
                const payload = state
                    .data
                    .map((item) => {
                        let quantity = item.quantity
                        let price = item.price
                        let subtotal = quantity * price 
                        if (
                            item.product_id === data.product_id && 
                            item.proddetail_id === data.proddetail_id
                        ) {
                            quantity = item.quantity + data.quantity
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
                state.data = payload
            }
        },
        RESET_FORM (state) {
            state.form = defaultForm()
        },
        CHANGE_QUANTITY_PRODUCT (state, data) {
            const payload = state.data.map((item, index) => {
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
            state.data = payload
        },
        DELETE_PRODUCT (state, data) {
            let payload = []
            state.data.map((item, index) => {
                if (index !== data) {
                    payload.push({ ...item })
                }
            })
            state.data = payload
        },
        DELETE_ALL_PRODUCT (state, data) {
            state.data = []
        },
    },

    actions: {
        setPagination ({ commit, state }, data) {
            state.offset = (data - 1) * state.limit
        },
        resetFilter ({ commit, state }) {
            state.limit = 100
            state.offset = 0
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
        resetForm ({ commit, state }) {
            commit('RESET_FORM')
        },
        addToCart ({ commit, state }, data) {
            commit('ADD_TO_CART', data)
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
            }

            return axios.post('/api/category/getAll', params, { 
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
        }
    }
}