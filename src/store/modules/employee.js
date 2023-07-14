import axios from 'axios'

const defaultMessage = () => {
    return {
        id: '',
        employee_id: '',
        image: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        status: '',
        shop_id: '',
        role_id: '',
        user_id: '',
        username: '',
        password: '',
    }
}

const defaultForm = () => {
    return {
        id: '',
        employee_id: '',
        image: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        about: '',
        status: 'active',
        shop_id: '',
        role_id: '',
        user_id: '',
        username: '',
        password: '',
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
        filter: {
            search: '',
            status: 'active',
        },
        position: {
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
        shift: {
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
        role: {
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
                state.form = {
                    ...value,
                    user_id: value.user && value.user.id,
                    email: value.user && value.user.email,
                    email_old: value.user && value.user.email,
                    username: value.user && value.user.username,
                    username_old: value.user && value.user.username
                }
            } else {
                const time = new Date().getTime()
                state.form = {
                    ...defaultForm(),
                    employee_id: `EM-${time}`,
                    status: 'active',
                    is_available: 1
                }
            }
        },
        SET_TOTAL_RECORD (state, value) {
            state.totalRecord = value
        },

        // POSITION
        SET_POSITION_LOADING (state, value) {
            state.position.loading = value
        },
        SET_POSITION_LOAD_MORE (state, value) {
            state.position.loadMore = value
        },
        SET_POSITION_LOADING_FORM (state, value) {
            state.position.loadingForm = value 
        },
        SET_POSITION_DATA (state, value) {
            state.position.data = value
        },
        SET_POSITION_TOTAL_RECORD (state, value) {
            state.position.totalRecord = value
        },

        // SHIFT
        SET_SHIFT_LOADING (state, value) {
            state.shift.loading = value
        },
        SET_SHIFT_LOAD_MORE (state, value) {
            state.shift.loadMore = value
        },
        SET_SHIFT_LOADING_FORM (state, value) {
            state.shift.loadingForm = value 
        },
        SET_SHIFT_DATA (state, value) {
            state.shift.data = value
        },
        SET_SHIFT_TOTAL_RECORD (state, value) {
            state.shift.totalRecord = value
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

        // ROLE
        SET_ROLE_LOADING (state, value) {
            state.role.loading = value
        },
        SET_ROLE_LOAD_MORE (state, value) {
            state.role.loadMore = value
        },
        SET_ROLE_LOADING_FORM (state, value) {
            state.role.loadingForm = value 
        },
        SET_ROLE_DATA (state, value) {
            state.role.data = value
        },
        SET_ROLE_TOTAL_RECORD (state, value) {
            state.role.totalRecord = value
        },
    },

    actions: {
        logout ({ commit }, token = '') {
            commit('SET_LOADING_FORM', true)
            return axios.post(
                '/api/logout', 
                {token: token}, 
                { headers: { Authorization: token } })
                .then((res) => {
                    return res
                })
                .finally(() => {
                    commit('SET_LOADING_FORM', false)
                })
        },
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

            return axios.post('/api/employee/getAll', params, { 
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
        getById ({ commit, state }, data) {
            commit('SET_LOADING_FORM', true)

            const params = {
                employee_id: data.employee_id
            }

            return axios.post('/api/employee/getByID', params, { 
                    headers: { Authorization: data.token } 
                })
                .then((res) => {
                    const data = res.data.data
                    const payload = {
                        ...data.employee,
                        user: data.user,
                        role: data.role,
                        shift: data.shift,
                        shop: data.shop,
                    }

                    commit('SET_FORM_DATA', payload)

                    return res
                })
                .catch((e) => {
                    console.log('error', e)
                })
                .finally(() => {
                    commit('SET_LOADING_FORM', false)
                })
        },
        createData ({ commit, state }, data) {
            commit('SET_LOADING_FORM', true)
            
            const params = {
                ...data
            }

            return axios.post('/api/employee/post', params, { 
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

            delete params.user

            return axios.post('/api/employee/update', params, { 
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

            return axios.post('/api/employee/delete', params, { 
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
            params.append('employee_id', data.employee_id)
            params.append('image', data.image)
    
            return axios.post('/api/employee/uploadImage', params, { 
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

        // POSITION
        getDataPosition ({ commit, state }, data) {
            commit('SET_POSITION_LOADING', true)

            let dataPrev = []

            const params = {
                limit: state.position.limit,
                offset: state.position.offset,
                search: state.position.filter.search,
                status: state.position.filter.status,
            }

            return axios.post('/api/position/getAll', params, { 
                    headers: { Authorization: data.token } 
                })
                .then((res) => {
                    const payload = res.data.data 

                    payload && payload.map((dt) => {
                        dataPrev.push({ ...dt })
                    })

                    commit('SET_POSITION_DATA', dataPrev)
                    commit('SET_POSITION_TOTAL_RECORD', res.data.total_record)

                    return res
                })
                .catch((e) => {
                    console.log('error', e)
                })
                .finally(() => {
                    commit('SET_POSITION_LOADING', false)
                })
        },

        // SHIFT
        getDataShift ({ commit, state }, data) {
            commit('SET_SHIFT_LOADING', true)

            let dataPrev = []

            const params = {
                limit: state.shift.limit,
                offset: state.shift.offset,
                search: state.shift.filter.search,
                status: state.shift.filter.status,
                shop_id: data.shop_id,
            }

            return axios.post('/api/shift/getAll', params, { 
                    headers: { Authorization: data.token } 
                })
                .then((res) => {
                    const payload = res.data.data 

                    payload && payload.map((dt) => {
                        dataPrev.push({ ...dt.shift })
                    })

                    commit('SET_SHIFT_DATA', dataPrev)
                    commit('SET_SHIFT_TOTAL_RECORD', res.data.total_record)

                    return res
                })
                .catch((e) => {
                    console.log('error', e)
                })
                .finally(() => {
                    commit('SET_SHIFT_LOADING', false)
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

        // ROLE
        getDataRole ({ commit, state }, data) {
            commit('SET_ROLE_LOADING', true)

            let dataPrev = []

            const params = {
                limit: state.shop.limit,
                offset: state.shop.offset,
                search: state.shop.filter.search,
                status: state.shop.filter.status,
                type: 'employee',
            }

            return axios.post('/api/role/getAll', params, { 
                    headers: { Authorization: data.token } 
                })
                .then((res) => {
                    const payload = res.data.data 

                    payload && payload.map((dt) => {
                        dataPrev.push({ ...dt })
                    })

                    commit('SET_ROLE_DATA', dataPrev)
                    commit('SET_ROLE_TOTAL_RECORD', res.data.total_record)

                    return res
                })
                .catch((e) => {
                    console.log('error', e)
                })
                .finally(() => {
                    commit('SET_ROLE_LOADING', false)
                })
        },
    }
}