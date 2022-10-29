import axios from 'axios'

const defaultForm = () => {
    return {
        id: '',
        prodimage_id: '',
        image: '',
        description: '',
        product_id: ''
    }
}

export default {
    namespaced: true,

    state: {
        form: defaultForm(),
        errorMessage: defaultForm(),
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
        }
    },

    getters: {},

    mutations: {
        RESET_ERROR_MESSAGE (state) {
            state.errorMessage = defaultForm()
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
                state.errorMessage = defaultForm() 
            }
        },
        SET_FORM_DATA (state, value) {
            if (value) {
                state.form = value
            } else {
                const time = new Date().getTime()
                state.form = {
                    ...defaultForm(),
                    prodimage_id: `PI-${time}`,
                    status: 'active',
                    is_available: 1
                }
            }
        },
        SET_TOTAL_RECORD (state, value) {
            state.totalRecord = value
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
            state.limit = 5
            state.offset = 0
        },
        resetData ({ commit, state }) {
            state.data = []
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
                product_id: data.product_id
            }

            return axios.post('/api/productImage/getAll', params, { 
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

            return axios.post('/api/productImage/post', params, { 
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

            return axios.post('/api/productImage/update', params, { 
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

            return axios.post('/api/productImage/delete', params, { 
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
            params.append('prodimage_id', data.prodimage_id)
            params.append('image', data.image)
    
            return axios.post('/api/productImage/uploadImage', params, { 
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