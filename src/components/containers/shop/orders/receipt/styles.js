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
    .width.width-center {
        margin: auto;
    }
    .image img {
        width: 100%;
    }
`
const cssFonts = `
    .fonts {
        font-family: sans-serif;
        color: #000;
    }
    .fonts.fonts-10 {
        font-size: 10pt;
    }
    .fonts.fonts-8 {
        font-size: 8pt;
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
`
const cssDisplay = `
    .display-flex {
        display: flex;
        flex-direction: row;
    }
    .display-flex.space-between {
        justify-content: space-between;
    }
`
const cssPadding = `
    .padding {
        position: relative;
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
    .padding.padding-5px {
        padding: 5px;
    }
    .padding.padding-top-5px {
        padding-top: 5px;
    }
    .padding.padding-bottom-5px {
        padding-bottom: 5px;
    }
`
const cssMargin = `
    .margin {
        position: relative;
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
    .margin.margin-5px {
        margin: 5px;
    }
    .margin.margin-top-5px {
        margin-top: 5px;
    }
    .margin.margin-bottom-5px {
        margin-bottom: 5px;
    }
`
const cssBorder = `
    .border-bottom {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }
`
const styles = [ cssCover, cssFonts, cssDisplay, cssPadding, cssMargin, cssBorder ]

export default styles