<template>
    <div id="App">
        <el-select 
            v-model="selectedData" 
            placeholder="Select shop"
            class="select-shop">
            <el-option
                v-for="(item, i) in data"
                :key="i"
                :label="item.name"
                :value="item.id">
            </el-option>
        </el-select>
    </div>
</template>
<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'App',
    data () {
        return {}
    },
    mounted () {},
    computed: {
        ...mapState({
            data: (state) => state.storeSelectedShop.data,
        }),
        selectedData: {
            get () {
                return this.$store.state.storeSelectedShop.selectedData
            },
            set (value) {
                this.$store.state.storeSelectedShop.selectedData = value
            }
        }
    },
    methods: {
        ...mapActions({
            getShop: 'storeSelectedShop/getData',
        }),
        getData () {
            const token = this.$session.get('tokenBearer')
            this.getShop({ token })
        }
    }
}
</script>