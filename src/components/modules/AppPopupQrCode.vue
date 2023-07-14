<template>
    <div id="App">
        <AppCardPopup title="QR Shop Scanner" @onClose="onClose">
            <div class="width width-100">
                <div class="content-center" style="width: 200px; margin: auto; padding: 12px 0;">
                    <div 
                        class="image image-padding" 
                        style="
                            background-color: #fff; 
                            border-width: 6px;
                            border-style: solid;
                            border-color: #FB3640;
                            border-radius: 0;
                        ">
                        <VueQrcode :value="`${initUrl}visitor/${data.shop_id}`" />
                    </div>
                </div>
                <div class="padding padding-15px">
                    <div class="fonts fonts-14px semibold black align-center">{{ data.name }}</div>
                    <div class="fonts fonts-12px black align-center">{{ data.shop_id }}</div>
                </div>
                <div v-if="data.is_digital_menu_active" class="field-group">
                    <AppShopLink :link="`${initUrl}visitor/${data.shop_id}`" :disableLabel="true" />
                </div>
            </div>

            <div :style="`display: none;`">
                <div id="component-to-print" class="width width-794px width-center">
                    <div class="display-flex bg-white" style="padding: 15px 30px;">
                        <img :src="logo" alt="" style="height: 40px; margin-right: 15px;">
                        <img :src="shopImageThumbnailUrl + data.image" alt="" style="height: 40px;">
                    </div>
                    <div style="position: relative; width: 100%; padding: 60px 0;">
                        <div class="padding padding-15px">
                            <div class="fonts fonts-24px semibold black align-center">Scan Here</div>
                            <div class="fonts fonts-11px normal black align-center">Scan this QR Code to view the menus and make your orders.</div>
                        </div>
                        <div class="content-center" style="width: 200px; margin: auto; padding: 30px 0;">
                            <div 
                                class="image image-padding" 
                                style="
                                    background-color: #fff; 
                                    border-width: 6px;
                                    border-style: solid;
                                    border-color: #FB3640;
                                    border-radius: 0;
                                ">
                                <VueQrcode :value="`${initUrl}visitor/${data.shop_id}`" />
                            </div>
                        </div>
                        <div class="padding padding-15px">
                            <div class="fonts fonts-14px semibold black align-center">{{ data.name }}</div>
                            <div class="fonts fonts-11px semibold black align-center">{{ data.location }}</div>
                        </div>
                    </div>
                    <div class="bg-white-grey" style="padding: 30px;">
                        <div class="padding padding-15px" style="padding-top: 0;">
                            <div class="fonts fonts-14px semibold black align-center">HOW TO MAKE ORDERS</div>
                        </div>
                        <div class="display-flex space-between">
                            <div v-for="(dt, i) in howToOrder" :key="i" style="width: calc(calc(100% - 60px) / 3);">
                                <div class="btn btn-main btn-small-icon btn-circle" style="padding: 0 0;">{{ dt.id }}</div>
                                <div class="margin margin-top-10px">
                                    <div class="fonts fonts-11px semibold black">{{ dt.title }}</div>
                                    <div class="fonts fonts-9px normal grey">{{ dt.description }}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="bg-main" style="padding: 30px;">
                        <div class="display-flex space-between">
                            <div v-for="(dt, i) in info" :key="i" style="width: calc(calc(100% - 60px) / 3);">
                                <div class="fonts fonts-9px white">{{ dt.title }}</div>
                                <div class="fonts fonts-9px semibold white">{{ dt.value }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div slot="footer" class="padding padding-15px">
                <button 
                    class="btn btn-main-reverse with-hover with-border btn-full" 
                    @click="onPrintPreview">
                    Download or Print QR Shop
                </button>
            </div>
        </AppCardPopup>
    </div>
</template>
<script>
import { Printd } from 'printd'
import VueQrcode from 'vue-qrcode'
import AppCardPopup from './AppCardPopup'
import AppShopLink from './AppShopLink'
import logo from '@/assets/img/logo.png'

export default {
    name: 'App',
    data () {
        return {
            logo: logo,
            selectedIndex: 0,
            howToOrder: [
                {id: 1, title: 'Scan QR Code', description: 'Open your camera or QR scanner app to scan the QR Code and open the link in your browser.'},
                {id: 2, title: 'Chose Menu', description: 'Choose your favourite menu in the shop catalogs, put the quantity and add to cart.'},
                {id: 3, title: 'Checkout Order', description: 'Checkout your order and put your name and choose the visible table (if any) and create your order.'},
            ],
            info: [
                {id: 1, icon: 'fab fa-lg fa-instagram', title: 'Instagram', value: '@sajiin_id'},
                {id: 2, icon: 'fa fa-lg fa-globe', title: 'Website', value: 'www.sajiin.com'},
                {id: 3, icon: 'fa fa-lg fa-envelope', title: 'Email', value: 'sajiin.official@gmail.com'},
            ]
        }
    },
    props: {
        data: null,
    },
    components: {
        VueQrcode,
        AppCardPopup,
        AppShopLink,
    },
    methods: {
        onClose () {
            this.$emit('onClose')
        },
        onPrintPreview () {
            const printer = new Printd()
            const cssCover = `
                .width {
                    position: relative;
                }
                .width.width-100 {
                    width: 100%;
                }
                .width.width-50px {
                    width: 50px;
                }
                .width.width-60px {
                    width: 60px;
                }
                .width.width-80px {
                    width: 80px;
                }
                .width.width-150px {
                    width: 150px;
                }
                .width.width-720px {
                    width: 720px;
                }
                .width.width-center {
                    margin: auto;
                }
                .image {
                    position: relative;
                }
                .image.image-padding {
                    width: 100%;
                    padding-bottom: 100%;
                }
                .image img {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                }
            `
            const cssFonts = `
                .fonts {
                    font-family: sans-serif;
                    color: #000;
                }
                .fonts.fonts-8px {
                    font-size: 8px;
                }
                .fonts.fonts-9px {
                    font-size: 9px;
                }
                .fonts.fonts-10px {
                    font-size: 10px;
                }
                .fonts.fonts-11px {
                    font-size: 11px;
                }
                .fonts.fonts-14px {
                    font-size: 14px;
                }
                .fonts.fonts-24px {
                    font-size: 24px;
                }
                .fonts.align-center {
                    text-align: center;
                }
                .fonts.semibold {
                    font-weight: bold;
                }
                .fonts.normal {
                    font-weight: normal;
                }
                .fonts.white {
                    color: #fff;
                }
                .fonts.black {
                    color: #151f2d;
                }
                .fonts.grey {
                    color: #555;
                }
            `
            const cssDisplay = `
                .display-flex {
                    display: flex;
                    flex-direction: row;
                }
                .display-flex.space-between {
                    justify-content: space-between;
                }
                .display-flex.center {
                    justify-content: center;
                }
                .display-flex.align-center {
                    align-items: center;
                }
            `
            const cssPadding = `
                .padding {
                    position: relative;
                }
                .padding.padding-5px {
                    padding: 5px;
                }
                .padding.padding-top-5px {
                    padding-top: 5px;
                }
                .padding.padding-bottom-5px {
                    padding-bottom: 5px;
                }
                .padding.padding-10px {
                    padding: 10px;
                }
                .padding.padding-top-10px {
                    padding-top: 10px;
                }
                .padding.padding-bottom-10px {
                    padding-bottom: 10px;
                }
                .padding.padding-15px {
                    padding: 15px;
                }
                .padding.padding-top-15px {
                    padding-top: 15px;
                }
                .padding.padding-bottom-15px {
                    padding-bottom: 15px;
                }
                .padding.padding-30px {
                    padding: 30px;
                }
                .padding.padding-top-30px {
                    padding-top: 30px;
                }
                .padding.padding-bottom-30px {
                    padding-bottom: 30px;
                }
            `
            const cssMargin = `
                .margin {
                    position: relative;
                }
                .margin.margin-5px {
                    margin: 5px;
                }
                .margin.margin-top-5px {
                    margin-top: 5px;
                }
                .margin.margin-bottom-5px {
                    margin-bottom: 5px;
                }
                .margin.margin-10px {
                    margin: 10px;
                }
                .margin.margin-top-10px {
                    margin-top: 10px;
                }
                .margin.margin-bottom-10px {
                    margin-bottom: 10px;
                }
                .margin.margin-15px {
                    margin: 15px;
                }
                .margin.margin-top-15px {
                    margin-top: 15px;
                }
                .margin.margin-bottom-15px {
                    margin-bottom: 15px;
                }
                .margin.margin-30px {
                    margin: 30px;
                }
                .margin.margin-top-30px {
                    margin-top: 30px;
                }
                .margin.margin-bottom-30px {
                    margin-bottom: 30px;
                }
            `
            const cssBorder = `
                .border-bottom {
                    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                }
                .btn {
                    position: relative;
                    font-family: "GraphikSemibold", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
                    padding: 11px 12.8px;
                    border: 0;
                    cursor: pointer;
                    font-size: 13px;
                    font-weight: bold;
                    display: flex;
                    flex-wrap: nowrap;
                    justify-content: center;
                    align-items: center;
                    border-radius: 4px;
                }
                .btn.btn-main {
                    background-color: #FB3640;
                    color: #fff;
                    border: 1px #FB3640 solid;
                }
                .btn.btn-small-icon {
                    width: 30px;
                    height: 30px;
                    padding: 8px 0;
                    text-align: center;
                }
                .btn.btn-circle {
                    border-radius: 40px;
                }
            `
            const cssBackground = `
                * {
                    margin: 0;
                    padding: 0;
                }
                @media print {
                    body {-webkit-print-color-adjust: exact;}
                }
                .bg-white-grey {
                    background-color: #f9f9f9;
                }
                .bg-main {
                    background-color: #FB3640;
                }
            `
            const styles = [ cssBackground, cssCover, cssFonts, cssDisplay, cssPadding, cssMargin, cssBorder ]
            printer.print( 
                document.getElementById('component-to-print'), 
                styles
            )
        },
    }
}
</script>
