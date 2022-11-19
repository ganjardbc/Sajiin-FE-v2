import Vue from 'vue'
import Vuex from 'vuex'

// old store
import auth from './auth'
import cart from './cart'
import toast from './toast'
import order from './order'
import wishelist from './wishelist'
import customer from './customer'
import table from './table'
import store from './store'
import visitor from './visitor'
import toastmessage from './toastmessage'
import notification from './notification'

// new store
import storeAuth from './modules/auth'
import storeProfile from './modules/profile'
import storeDashboard from './modules/dashboard'
import storeShop from './modules/shop'
import storeSelectedShop from './modules/selectedShop'
import storePayment from './modules/payment'
import storeShipment from './modules/shipment'
import storeTable from './modules/table'
import storeCategory from './modules/category'
import storeProduct from './modules/product'
import storeProductDetail from './modules/productDetail'
import storeProductImage from './modules/productImage'
import storeTopping from './modules/topping'
import storeOrders from './modules/orders'
import storeCashier from './modules/cashier/index'
import storeCashierCategory from './modules/cashier/category'
import storeCashierProduct from './modules/cashier/product'
import storeCashierTable from './modules/cashier/table'
import storeCashierPayment from './modules/cashier/payment'
import storeBizpars from './modules/bizpars'
import storePermissions from './modules/permissions'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    // new store
    storeAuth,
    storeProfile,
    storeDashboard,
    storeShop,
    storeSelectedShop,
    storePayment,
    storeShipment,
    storeTable,
    storeCategory,
    storeProduct,
    storeProductDetail,
    storeProductImage,
    storeTopping,
    storeOrders,
    storeCashier,
    storeCashierCategory,
    storeCashierProduct,
    storeCashierTable,
    storeCashierPayment,
    storeBizpars,
    storePermissions,

    // old store
    auth,
    cart,
    toast,
    wishelist,
    order,
    customer,
    table,
    store,
    visitor,
    toastmessage,
    notification
  }
})