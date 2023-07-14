<template>
    <div id="app">
        <ReloadApp 
            v-if="updateApplication" 
            @closeReload="closeReload" 
            @reloadApplication="reloadApplication" />
        <router-view />
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import ReloadApp from './ReloadApp'

export default {
    name: 'app',
    data () {
        return {}
    },
    components: {
        ReloadApp
    },
    computed: {
        ...mapState({
            updateApplication: (state) => state.application.updateApplication,
        }),
    },
    methods: {
        ...mapActions({
            setUpdateApplication: 'application/setUpdateApplication',
            setBluetoothSupported: 'application/setBluetoothSupported'
        }),
        reloadApplication () {
            this.setUpdateApplication(false)
            window.location.reload()
        },
        closeReload () {
            this.setUpdateApplication(false)
        },
        addUserSocket () {
            const data = this.$cookies.get('user')
            const token = this.$cookies.get('token')
            if (data && token) {
                const payload = {
                    id: data.id,
                    name: data.name,
                    roleName: data.role_name,
                    email: data.email,
                    token: token
                }
                this.$socket.emit('addUser', payload)
            }
        },
        setUpNotification () {
            if (!("Notification" in window)) {
                this.$message({
                    message: 'This browser does not support desktop notification',
                    type: 'error'
                })
            } else {
                if (Notification.permission === "denied") {
                    this.$message({
                        message: 'This browser disabled the desktop notification',
                        type: 'error'
                    })

                    Notification.requestPermission().then((permission) => {
                        if (permission === "granted") {
                            this.$message({
                                message: 'You allowed the notifications',
                                type: 'info'
                            })
                        } else {
                            this.$message({
                                message: 'You blocked the notifications',
                                type: 'error'
                            })
                        }
                    })
                }
            }
        },
        // setUpNewUpdate () {
        //     if (this.$workbox) {
        //         this.$workbox.addEventListener("installed", (event) => {
        //             if (event.isUpdate) {
        //                 this.setUpdateApplication(true)
        //             } else {
        //                 this.setUpdateApplication(false)
        //             }
        //         })
        //     }
        // },
        onCheckBluetooth () {
            navigator.bluetooth.getAvailability().then((available) => {
                if (!available) {
                    this.$message({
                        message: 'Oops ! Bluetooth is not supported.',
                        type: 'error'
                    })
                    this.setBluetoothSupported(false)
                }
            })
        },
    },
    mounted () {
        this.setUpNotification()
        // this.setUpNewUpdate()
        this.onCheckBluetooth()
    },
    // sockets: {
    //     connect: function () {
    //         this.$message('Your are connected')
    //         this.addUserSocket()
    //     },
    //     disconnect: function () {
    //         this.$message({
    //             message: 'Your are disconnected',
    //             type: 'error'
    //         })
    //     },
    // }
}
</script>
<style>
    @import url('https://use.fontawesome.com/releases/v5.15.3/css/all.css');
</style>