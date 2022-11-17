const formatCurrency = (value) => {
    let currency = 'Rp. 0,-'
    if (value > 0) {
        currency = `Rp ${(value + '').replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")},-`
    }
    if (value < 0) {
        currency = `- Rp ${(value + '').replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ".")},-`
    }
    return currency
}

export {
    formatCurrency
}