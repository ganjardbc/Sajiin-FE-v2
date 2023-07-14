<template>
    <div id="App">
        <Category v-if="cashBook" />
        <Product v-if="cashBook" />
        <AppEmpty 
            v-if="!cashBook" 
            title="This Shop Still Closed, Please Wait To Make The Orders." />
    </div>
</template>
<script>
import { mapState } from 'vuex'
import Category from './category/Index'
import Product from './list/Index'
import AppEmpty from '../../../modules/AppEmpty'

export default {
    name: 'App',
    components: {
        AppEmpty,
        Category,
        Product,
    },
    computed: {
        ...mapState({
            data: (state) => state.storeVisitorShop.data,
        }),
        cashBook () {
            return this.data && this.data.cashbook
        }
    }
}
</script>