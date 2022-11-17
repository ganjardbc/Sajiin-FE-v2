<template>
    <div id="App" class="display-flex wrap">
        <div v-for="(dt, i) in data" :key="i" class="margin margin-right-3px margin-bottom-5px">
            <div 
                class="card-capsule active" 
                style="cursor: pointer;"
                @click="onChange(dt.value)">
                {{ format(dt.value) }}
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
                { value: 10000 },
                { value: 20000 },
                { value: 50000 },
                { value: 100000 },
                { value: 150000 },
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