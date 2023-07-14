<template>
    <div id="App">
        <div class="display-popup" style="z-index: 1000;">
            <div class="card-container-popup">
                <div class="card-popup no-padding mobile bg-white box-shadow">
                    <div class="card-popoup-header display-flex align-center space-between">
                        <div class="fonts normal semibold">Printer Checker</div>
                        <button class="btn btn-icon btn-white" @click="onClose">
                            <i class="fa fa-lw fa-times" />
                        </button>
                    </div>
                    <div v-if="loading" class="card-popup-body">
                        <AppLoader />
                    </div>
                    <div v-if="!loading" class="card-popup-body padding padding-bottom-50px">
                        <div v-if="!printerUrl" class="width width-100">
                            <AppEmpty title="THERMAL URL IS NOT SET" />
                            <div class="display-flex center">
                                <button class="btn btn-sekunder" @click="toSetting">
                                    <i class="icn icn-left fa fa-lg fa-cog"></i> Set Thermal Url ?
                                </button>
                            </div>
                        </div>

                        <div v-if="printerUrl" class="width width-100">
                            <div v-if="!data" class="width width-100">
                                <AppEmpty :title="'CAN NOT FIND PRINTER'" />
                                <div class="display-flex center">
                                    <button class="btn btn-sekunder" @click="getPrinter">
                                        <i class="icn icn-left fa fa-lg fa-retweet"></i> Re-Scan 
                                    </button>
                                </div>
                            </div>

                            <div v-if="data" class="width width-100">
                                <AppEmpty icon="fa fa-3x fa-check-circle" :title="'PRINTER IS CONNECTED'" />
                                <div class="fonts micro black align-center">You can continue to print this receipt.</div>
                                <div class="display-flex center margin margin-top-15px">
                                    <button class="btn btn-sekunder" @click="getPrinter">
                                        <i class="icn icn-left fa fa-lg fa-retweet"></i> Re-Scan 
                                    </button>
                                    <button class="btn btn-main margin margin-left-10px" @click="onPrint">
                                        <i class="icn icn-left fa fa-lg fa-print"></i> Print 
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import AppEmpty from '../../../../modules/AppEmpty'
import AppLoader from '../../../../modules/AppLoader'
import AppCardCapsule from '../../../../modules/AppCardCapsule'

export default {
    data () {
        return {
            loading: false,
            printerUrl: '',
            messageError: '',
            data: null
        }
    },
    components: {
        AppEmpty,
        AppLoader,
        AppCardCapsule
    },
    mounted () {
        this.printerUrl = this.$cookies.get('thermalUrl')
        this.getPrinter()
    },
    methods: {
        getPrinter () {
            if (this.printerUrl) {
                this.data = null
                this.loading = true 
                fetch(
                    this.printerUrl+'/get-device', {
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        method: 'GET'
                    })
                    .then(response => response.json())
                    .then((res) => {
                        console.log('getPrinter', res)
                        if (res.status === 'ok') {
                            this.data = res.data 
                        } else {
                            this.messageError = 'CAN NOT FIND PRINTER'
                        }
                    })
                    .finally(() => {
                        this.loading = false 
                    })
            }
        },
        onClose () {
            this.$emit('onClose')
        },
        onPrint () {
            this.$emit('onPrint')
        },
        toSetting () {
            this.$emit('onClose')
            this.$router.push({name: 'owner-settings'})
        }
    }
}
</script>