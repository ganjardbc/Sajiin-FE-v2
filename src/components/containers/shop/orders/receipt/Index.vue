<template>
    <div id="App">
        <AppSideForm 
            :title="title" 
            :enableCustomFooter="true"
            :onClose="onClose">

            <div slot="toolbar">
                <button class="btn btn-icon btn-white" @click="onDownloadReceipt" title="Download">
                    <i class="fa fa-lw fa-download" />
                </button>
            </div>

            <div class="display-flex align-center">
                <button 
                    v-for="(dt, i) in thermalSizing"
                    :key="i"
                    :class="`card card-status ${selectedIndex === dt.id ? 'active' : 'normal'} border-big-radius margin margin-5px`"
                    @click="onChangeSize(dt)">
                    {{ dt.sizeThermal.x }}{{ dt.sizeThermal.x !== '100%' ? 'mm' : '' }}
                </button>
            </div>

            <!-- <div v-if="loadingReceipt">
                <AppLoader />
            </div>
            <div v-else id="component-to-print">
                <ViewPdf :src="fileUrl" />
            </div> -->

            <div class="card bg-white box-shadow margin margin-bottom-10px margin-top-10px">
                <div id="component-to-print" :style="`width: ${selectedData.sizeReceipt.x}; margin: auto;`">
                    <div class="padding padding-5px">
                        <div class="width width-100">
                            <div class="width width-60px width-center">
                                <div class="image image-padding bg-white">
                                    <img 
                                        v-if="form.shop_image" 
                                        :src="`${shopImageThumbnailUrl}${form.shop_image}?not-from-cache-please`" 
                                        :alt="form.shop && form.shop.name">
                                    <i v-else class="post-middle-absolute fa fa-lg fa-store" />
                                </div>
                            </div>
                            <div class="fonts fonts-10 semibold align-center margin margin-top-5px margin-bottom-5px">{{ form.shop && form.shop.name }}</div>
                            <div class="fonts fonts-8 normal align-center">{{ form.shop && form.shop.location }}</div>
                            <div v-if="form.shop && form.shop.phone" class="fonts fonts-8 normal align-center">{{ form.shop && form.shop.phone }}</div>
                        </div>
                        <div class="margin margin-top-5px margin-bottom-5px">
                            <div class="display-flex space-between">
                                <div style="width: 60px;">
                                    <div class="fonts fonts-8">Order ID</div>
                                </div>
                                <div style="width: calc(100% - 60px);">
                                    <div class="fonts fonts-8">: {{ form.order_id }}</div>
                                </div>
                            </div>
                            <div class="display-flex space-between">
                                <div style="width: 60px;">
                                    <div class="fonts fonts-8">Date</div>
                                </div>
                                <div style="width: calc(100% - 60px);">
                                    <div class="fonts fonts-8">: {{ form.created_at | moment("DD/MM/YYYY") }}</div>
                                </div>
                            </div>
                            <div class="display-flex space-between">
                                <div style="width: 60px;">
                                    <div class="fonts fonts-8">Customer</div>
                                </div>
                                <div style="width: calc(100% - 60px);">
                                    <div class="fonts fonts-8">: {{ form.customer_name || '-' }}</div>
                                </div>
                            </div>
                            <div class="display-flex space-between">
                                <div style="width: 60px;">
                                    <div class="fonts fonts-8">Cashier</div>
                                </div>
                                <div style="width: calc(100% - 60px);">
                                    <div class="fonts fonts-8">: {{ form.cashier_name || '-' }}</div>
                                </div>
                            </div>
                            <div class="display-flex space-between">
                                <div style="width: 60px;">
                                    <div class="fonts fonts-8">Table</div>
                                </div>
                                <div style="width: calc(100% - 60px);">
                                    <div class="fonts fonts-8">: {{ form.table_name || '-' }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="margin margin-top-5px margin-bottom-5px">
                            <div class="display-flex space-between">
                                <div style="width: calc(100% - 110px);">
                                    <span class="fonts fonts-8 black semibold">Products</span>
                                </div>
                                <div style="width: 30px;">
                                    <span class="fonts fonts-8 black semibold">Qty</span>
                                </div>
                                <div style="width: 80px;">
                                    <span class="fonts fonts-8 black semibold">Subtotal</span>
                                </div>
                            </div>

                            <div 
                                v-for="(dt, index) in form.details" 
                                :key="index"
                                class="width width-100">
                                <div :class="`display-flex space-between`">
                                    <div style="width: calc(100% - 110px);">
                                        <span class="fonts fonts-8 black">{{ dt.product_name }}</span>
                                        <span v-if="dt.product_detail" class="fonts fonts-8 black"> - {{ dt.product_detail }}</span>
                                    </div>
                                    <div style="width: 30px;">
                                        <span class="fonts fonts-8 black">{{ dt.quantity }}</span>
                                    </div>
                                    <div style="width: 80px;">
                                        <span class="fonts fonts-8 black">{{ format(dt.subtotal) }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="width width-100 border-bottom"></div>                            
                        <div class="margin margin-top-5px margin-bottom-5px">
                            <div class="display-flex flex-end">
                                <div style="width: calc(100% - 80px);">
                                    <div class="fonts fonts-8 black">Total</div>
                                </div>
                                <div style="width: 80px;">
                                    <div class="fonts fonts-8 black">{{ format(form.total_price) }}</div>
                                </div>
                            </div>
                        </div>
                        <div v-if="form.is_discount" class="width width-100 border-bottom"></div>
                        <div v-if="form.is_discount" class="padding padding-top-5px padding-bottom-5px">
                            <div v-if="form.is_discount" class="display-flex flex-end">
                                <div style="width: calc(100% - 80px);">
                                    <div class="fonts fonts-8 black">Discount</div>
                                </div>
                                <div style="width: 80px;">
                                    <div class="fonts fonts-8 black">{{ format(form.total_discount) }}</div>
                                </div>
                            </div>
                        </div>
                        <div class="width width-100 border-bottom"></div>                            
                        <div class="margin margin-top-5px margin-bottom-5px">
                            <div class="display-flex flex-end">
                                <div style="width: calc(100% - 80px);">
                                    <div class="fonts fonts-8 black">Bills</div>
                                </div>
                                <div style="width: 80px;">
                                    <div class="fonts fonts-8 black">{{ format(form.bills_price) }}</div>
                                </div>
                            </div>
                            <div class="display-flex flex-end">
                                <div style="width: calc(100% - 80px);">
                                    <div class="fonts fonts-8 black">Change</div>
                                </div>
                                <div style="width: 80px;">
                                    <div class="fonts fonts-8 black">{{ format(form.change_price) }}</div>
                                </div>
                            </div>
                        </div>

                        <div class="margin margin-top-10px">
                            <div class="fonts fonts-8 normal align-center">Scan to Check this Order</div>
                            <div class="width width-150px width-center">
                                <VueQrcode :value="`${initUrl}visitor/${form.shop && form.shop.shop_id}/order/${form.order_id}`" errorCorrectionLevel="L" :width="150" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div slot="footer">
                <div class="right-form-footer">
                    <button 
                        class="btn btn-main btn-full"
                        @click="onPrintPreview">
                        Print to Viewer 
                    </button>
                    <button 
                        v-if="isBluetoothSupported"
                        class="btn btn-sekunder btn-full margin margin-top-15px"
                        @click="onPrintToThermal">
                        Print to Thermal
                    </button>
                </div>
            </div>
        </AppSideForm>

        <PrintReceipt 
            v-if="visiblePrintReceipt"
            @onPrint="onPrintThermal"
            @onClose="visiblePrintReceipt = false"
        />
    </div>
</template>
<script>
import m from 'moment'
import ViewPdf from 'vue-pdf'
import { Printd } from 'printd'
import { mapState, mapActions } from 'vuex'
import AppSideForm from '../../../../modules/AppSideForm'
import AppCardCapsule from '../../../../modules/AppCardCapsule'
import AppCardPriceSuggestion from '../../../../modules/AppCardPriceSuggestion'
import AppLoader from '../../../../modules/AppLoader'
import PrintReceipt from './PrintReceipt'
import VueQrcode from 'vue-qrcode'
import printStyles from './styles'
import CMD from './markdown'
import { replaceString, formatCurrency } from '../../../../../services/utils'

const thermalSizing = [
    {id: 1, sizeThermal: {x: '100%', y: 'auto'}, sizeReceipt: {x: '100%', y: 'auto'}},
    {id: 2, sizeThermal: {x: '80', y: '200'}, sizeReceipt: {x: '302.36px', y: '755.90px'}},
    {id: 3, sizeThermal: {x: '72', y: '200'}, sizeReceipt: {x: '272.13px', y: '755.90px'}},
    {id: 4, sizeThermal: {x: '51', y: '200'}, sizeReceipt: {x: '192.755px', y: '755.90px'}},
]

export default {
    name: 'App',
    data () {
        return {
            title: 'Print Receipt',
            visiblePrintReceipt: false,
            selectedIndex: 1,
            selectedData: thermalSizing[0],
            thermalSizing: thermalSizing,
            printObj: {
              id: "printMe",
              popTitle: "",
              extraHead: ""
            },
            fileUrl: '',
            canvas: {
                width: 120,
                height: 120
            }
        }
    },
    components: {
        VueQrcode,
        AppSideForm,
        AppCardCapsule,
        AppCardPriceSuggestion,
        AppLoader,
        PrintReceipt,
        ViewPdf
    },
    methods: {
        ...mapActions({
            download: 'storeOrders/download',
            downloadOnly: 'storeOrders/downloadOnly',
        }),

        onPrintPreview () {
            const printer = new Printd()
            printer.print( 
                document.getElementById('component-to-print'), 
                printStyles
            )
        },

        async onPrintToThermal () {
            try {
                const device = await navigator.bluetooth.requestDevice({
                    filters: [{
                        services: ["000018f0-0000-1000-8000-00805f9b34fb"],
                        optionalServices: ["device_information"],
                        acceptAllDevices: true
                    }]
                })

                const server = await device.gatt.connect()
                const service = await server.getPrimaryService("000018f0-0000-1000-8000-00805f9b34fb")
                const printer = await service.getCharacteristic("00002af1-0000-1000-8000-00805f9b34fb")
                const data = this.form 
                const encoder = new TextEncoder("utf-8")

                // Styling 
                const fontNormal = CMD.TEXT_FORMAT.TXT_FONT_A
                const fontSmall = CMD.TEXT_FORMAT.TXT_FONT_B
                const fontBold = CMD.TEXT_FORMAT.TXT_BOLD_ON
                const fontBoldOff = CMD.TEXT_FORMAT.TXT_BOLD_OFF
                const alignLeft = CMD.TEXT_FORMAT.TXT_ALIGN_LT
                const alignCenter = CMD.TEXT_FORMAT.TXT_ALIGN_CT
                const alignRight = CMD.TEXT_FORMAT.TXT_ALIGN_RT
                const tabSpacing = CMD.FEED_CONTROL_SEQUENCES.CTL_HT

                // Header 
                await printer.writeValue(encoder.encode(alignCenter + fontBold + fontNormal + data.shop.name + fontBoldOff +  CMD.EOL))
                if (data.shop.location) {
                    await printer.writeValue(encoder.encode(replaceString(data.shop.location) +  CMD.EOL))
                }
                if (data.shop.phone) {
                    await printer.writeValue(encoder.encode(replaceString(data.shop.phone) +  CMD.EOL))
                }
                await this.sendPrintLine(printer)

                // order 
                await printer.writeValue(encoder.encode(alignLeft + 'Order-ID : ' + data.order_id +  CMD.EOL))
                await printer.writeValue(encoder.encode('Date     : ' + m(data.created_at).format('DD/MM/YYYY') +  CMD.EOL))
                if (data.customer_name) {
                    await printer.writeValue(encoder.encode('Customer : ' + replaceString(data.customer_name) + CMD.EOL))
                }
                if (data.cashier_name) {
                    await printer.writeValue(encoder.encode('Cashier  : ' + replaceString(data.cashier_name) + CMD.EOL))
                }
                if (data.table_name) {
                    await printer.writeValue(encoder.encode('Table    : ' + replaceString(data.table_name) + CMD.EOL))
                }
                await this.sendPrintLine(printer)

                // Products 
                if (data.details && data.details.length > 0) {
                    // await printer.writeValue(encoder.encode(fontBold + fontSmall + alignLeft + 'Products                          Subtotal' + fontBoldOff + fontNormal + CMD.EOL))

                    for (let i = 0; i < data.details.length; i++) {
                        const element = data.details[i]
                        let productName = element.product_name
                        if (element.product_detail) {
                            productName += `, ${element.product_detail}`
                        }

                        await printer.writeValue(encoder.encode(alignLeft + productName +  CMD.EOL))
                        await printer.writeValue(encoder.encode(alignRight + element.quantity + ' x ' + formatCurrency(element.subtotal) +  CMD.EOL))
                    }

                    await this.sendPrintLine(printer)
                }

                // Total 
                await printer.writeValue(encoder.encode(alignLeft + 'Total    : ' + formatCurrency(data.total_price) + CMD.EOL))

                // Discount 
                if (data.total_discount) {
                    await printer.writeValue(encoder.encode(alignLeft + 'Discount : ' + formatCurrency(data.total_discount) + CMD.EOL))
                }

                // Bills 
                await printer.writeValue(encoder.encode(alignLeft + 'Bills    : ' + formatCurrency(data.bills_price) + CMD.EOL))
                await printer.writeValue(encoder.encode(alignLeft + 'Change   : ' + formatCurrency(data.change_price) + CMD.EOL))

                await printer.writeValue(encoder.encode(CMD.EOL + alignCenter + 'THANK YOU FOR YOUR ORDER !' + CMD.EOL))
                await this.sendNewLine(printer)

            } catch (e) {
                console.log('printing error', e)
            }
        },

        async sendPrintLine (printer) {
            let encoder = new TextEncoder("utf-8")
            let line = encoder.encode(CMD.TEXT_FORMAT.TXT_ALIGN_LT + '--------------------------------' +  CMD.EOL)
            // let line = encoder.encode(CMD.LINE_SPACING.LS_DEFAULT + CMD.EOL)

            await printer.writeValue(line)
        },

        async sendNewLine (printer) {
            let encoder = new TextEncoder("utf-8")
            let line = encoder.encode(CMD.LINE_SPACING.LS_DEFAULT + CMD.EOL)

            await printer.writeValue(line)
            await printer.writeValue(line)
        },

        onPrintThermal () {
            const payload = {
                data: {
                    ...this.form,
                    created_at: m(this.form.created_at).format('DD/MM/YYYY HH:mm:ss'),
                    updated_at: m(this.form.updated_at).format('DD/MM/YYYY HH:mm:ss'),
                    shop_image: `${this.shopImageThumbnailUrl}${this.form.shop_image}`
                }
            }
            fetch(
                this.printerUrl+'/print-receipt', {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(payload) 
                })
                .then(response => response.json())
                .then((res) => {
                    console.log('res', res)

                    if (res.status === 'ok') {
                        this.visiblePrintReceipt = false
                        this.$message('Printing this order receipt')
                    } else {
                        this.$message({
                            message: 'Failed to print this order receipt',
                            type: 'error'
                        })
                    }
                })
        },
        onDownloadReceipt () {
            const token = this.$cookies.get('tokenBearer')
            const order_id = this.form.order_id
            const size_x = this.selectedData.sizeThermal.x
            const size_y = this.selectedData.sizeThermal.y
            this.download({ token, order_id, size_x, size_y }).then((res) => {
                if (res.status === 200) {
                    this.$message('Downloaded order receipt')
                } else {
                    this.$message({
                        message: 'Failed to download order receipt',
                        type: 'error'
                    })
                }
            })
        },
        onViewDownloadReceipt () {
            const token = this.$cookies.get('tokenBearer')
            const order_id = this.form.order_id
            const size_x = this.selectedData.sizeThermal.x
            const size_y = this.selectedData.sizeThermal.y
            this.downloadOnly({ token, order_id, size_x, size_y }).then((res) => {
                var file = new Blob([res.data], {
                    type: 'application/pdf'
                })
                var fileUrl = URL.createObjectURL(file)

                this.fileUrl = fileUrl

                console.log('onViewDownloadReceipt', fileUrl)

                if (res.status === 200) {
                    this.$message('Downloaded order receipt')
                } else {
                    this.$message({
                        message: 'Failed to download order receipt',
                        type: 'error'
                    })
                }
            })
        },
        onClose () {
            this.$emit('onClose')
        },
        onChangeSize (value) {
            this.selectedIndex = value.id 
            this.selectedData = value
        },
    },
    computed: {
        ...mapState({
            form: (state) => state.storeOrders.form,
            errorMessage: (state) => state.storeOrders.errorMessage,
            loadingReceipt: (state) => state.storeOrders.loadingReceipt,
            details: (state) => state.storeOrders.form.details,
            isBluetoothSupported: (state) => state.application.isBluetoothSupported
        })
    },
}
</script>