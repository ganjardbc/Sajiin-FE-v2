import Vue from 'vue'
import Vuex from 'vuex'
import toast from './modules/toast'
import toastmessage from './modules/toastmessage'
import application from './modules/application'
import storeAuth from './modules/auth'
import storeProfile from './modules/profile'
import storeDashboard from './modules/dashboard'
import storeShop from './modules/shop'
import storeSelectedShop from './modules/selectedShop'
import storePayment from './modules/payment'
import storeShipment from './modules/shipment'
import storeTable from './modules/table'
import storeCategory from './modules/category'
import storeNotification from './modules/notification'
import storeProduct from './modules/product'
import storeProductDetail from './modules/productDetail'
import storeProductImage from './modules/productImage'
import storeTopping from './modules/topping'
import storeOrders from './modules/orders'
import storeTaskLists from './modules/taskList'
import storeBizpars from './modules/bizpars'
import storePermissions from './modules/permissions'
import storeRoles from './modules/roles'
import storeRolePermissions from './modules/rolePermissions'
import storeUsers from './modules/users'
import storeReports from './modules/reports'
import storeEmployee from './modules/employee'
import storeShift from './modules/shift'
import storeCashBook from './modules/cashBook'
import storeShopAdmin from './modules/admin/shop'
import storePositionAdmin from './modules/admin/position'
import storeEmployeeAdmin from './modules/admin/employee'
import storeShiftAdmin from './modules/admin/shift'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    toast,
    toastmessage,
    application,
    storeAuth,
    storeProfile,
    storeDashboard,
    storeShop,
    storeSelectedShop,
    storePayment,
    storeShipment,
    storeTable,
    storeCategory,
    storeNotification,
    storeProduct,
    storeProductDetail,
    storeProductImage,
    storeTopping,
    storeOrders,
    storeTaskLists,
    storeBizpars,
    storePermissions,
    storeRoles,
    storeRolePermissions,
    storeUsers,
    storeReports,
    storeEmployee,
    storeShift,
    storeCashBook,
    storeShopAdmin,
    storePositionAdmin,
    storeEmployeeAdmin,
    storeShiftAdmin,
  }
})