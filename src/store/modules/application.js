export default {
    namespaced: true,

    state: {
        isBluetoothSupported: false,
        updateApplication: false
    },

    getters: {},

    mutations: {
        SET_UPDATE_APPLICATION (state, value) {
            state.updateApplication = value
        },
        SET_BLUETOOTH_SUPPORTED (state, value) {
            state.isBluetoothSupported = value 
        }
    },

    actions: {
        setUpdateApplication ({ commit }, data) {
            commit('SET_UPDATE_APPLICATION', data)
        },
        setBluetoothSupported ({ commit }, data) {
            commit('SET_BLUETOOTH_SUPPORTED', data)
        }
    }
}