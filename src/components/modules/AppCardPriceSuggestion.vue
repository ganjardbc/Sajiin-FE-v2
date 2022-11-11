<template>
    <div id="App" class="display-flex wrap">
        <div v-for="(dt, i) in data" :key="i" class="margin margin-right-3px margin-bottom-5px">
            <div 
                class="card-capsule active" 
                style="cursor: pointer;"
                @click="onChange(dt.value)">
                {{ dt.label }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'App',
    data () {
        return {
            data: [
                { value: 10000, label: 'Rp. 10.000' },
                { value: 20000, label: 'Rp. 20.000' },
                { value: 50000, label: 'Rp. 50.000' },
                { value: 100000, label: 'Rp. 100.000' },
                { value: 150000, label: 'Rp. 150.000' }
            ]
        }
    },
    methods: {
        onChange (data) {
            this.$emit('onChange', data)
        }
    }
}
</script>