<template>
    <div id="App">
        <el-input
            :placeholder="placeholder ? placeholder : 'Search..'"
            suffix-icon="el-icon-search"
            clearable
            v-model="search"
            @change="onSearch">
        </el-input>
    </div>
</template>
<script>
export default {
    name: 'App',
    data () {
        return {
            search: ''
        }
    },
    mounted () {},
    props: {
        id: {
            type: String,
            required: false
        },
        enableResponsive: {
            type: Boolean,
            required: false
        },
        disableBorder: {
            type: Boolean,
            required: false
        },
        placeholder: {
            type: String,
            required: false
        },
        onChange: {
            type: Function,
            required: false
        }
    },
    methods: {
        onTotal () {
            this.onChange(this.search)
        },
        onSearch () {
            this.onChange(this.search)
        }
    },
    watch: {
        maximumValue: function (props) {
            if (props) {
                this.search = parseInt(props)
            }
        }
    }
}
</script>