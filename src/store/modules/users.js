import axios from 'axios'

const defaultMessage = () => {
    return {
        id: '',
        image: '',
        name: '',
        username: '',
        email: '',
        password: '',
        email_verified_at: '',
        provider: '',
        enabled: '',
        status: '',
        role_id: '',
        owner_id: ''
    }
}

const defaultForm = () => {
    return {
        id: '',
        image: '',
        name: '',
        username: '',
        email: '',
        password: '',
        email_verified_at: '',
        provider: '',
        enabled: 0,
        status: 'inactive',
        role_id: '',
        owner_id: ''
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
            status: '',
        },
        role: {
            limit: 1000,
            offset: 0,
            totalRecord: 0,
            loading: false,
            data: [],
            filter: {
                search: '',
                status: 'active',
            },
        },
        employee: {
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
                state.form = value
            } else {
                state.form = {
                    ...defaultForm(),
                    status: 'active',
                    is_available: 1
                }
            }
        },
        SET_TOTAL_RECORD (state, value) {
            state.totalRecord = value
        },

        // ROLE
        SET_ROLE_LOADING (state, value) {
            state.role.loading = value
        },
        SET_ROLE_TOTAL_RECORD (state, value) {
            state.role.totalRecord = value
        },
        SET_ROLE_DATA (state, value) {
            state.role.data = value
        },

        // EMPLOYEE
        SET_EMPLOYEE_LOADING (state, value) {
            state.employee.loading = value
        },
        SET_EMPLOYEE_LOAD_MORE (state, value) {
            state.employee.loadMore = value
        },
        SET_EMPLOYEE_LOADING_FORM (state, value) {
            state.employee.loadingForm = value 
        },
        SET_EMPLOYEE_DATA (state, value) {
            state.employee.data = value
        },
        SET_EMPLOYEE_TOTAL_RECORD (state, value) {
            state.employee.totalRecord = value
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
        getData ({ commit, state }, data) {
            commit('SET_LOADING', true)

            let dataPrev = []

            const params = {
                limit: state.limit,
                offset: state.offset,
                search: state.filter.search,
                status: state.filter.status,
            }

            return axios.post('/api/user/getAll', params, { 
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
        createData ({ commit, state }, data) {
            commit('SET_LOADING_FORM', true)
            
            const params = {
                ...data
            }

            return axios.post('/api/user/post', params, { 
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

            return axios.post('/api/user/update', params, { 
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

            return axios.post('/api/user/delete', params, { 
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
            params.append('id', data.id)
            params.append('image', data.image)
    
            return axios.post('/api/user/uploadImage', params, { 
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

        // ROLE
        getDataRole ({ commit, state }, data) {
            commit('SET_ROLE_LOADING', true)

            let dataPrev = []

            const params = {
                limit: state.role.limit,
                offset: state.role.offset,
                search: state.role.filter.search,
                status: state.role.filter.status,
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

        // EMPLOYEE
        getDataEmployee ({ commit, state }, data) {
            commit('SET_EMPLOYEE_LOADING', true)

            let dataPrev = []

            const params = {
                limit: state.employee.limit,
                offset: state.employee.offset,
                search: state.employee.filter.search,
                status: state.employee.filter.status,
            }

            return axios.post('/api/employee/getAll', params, { 
                    headers: { Authorization: data.token } 
                })
                .then((res) => {
                    const payload = res.data.data 

                    payload && payload.map((dt) => {
                        dataPrev.push({ ...dt })
                    })

                    commit('SET_EMPLOYEE_DATA', dataPrev)
                    commit('SET_EMPLOYEE_TOTAL_RECORD', res.data.total_record)

                    return res
                })
                .catch((e) => {
                    console.log('error', e)
                })
                .finally(() => {
                    commit('SET_EMPLOYEE_LOADING', false)
                })
        },
    }
}