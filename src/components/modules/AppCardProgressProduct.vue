<template>
    <div id="App">
        <div v-if="data" class="display-flex flex-start align-center">
            <span class="margin margin-right-5px">
                <span class="fonts fonts-10 semibold black">{{ calculateAllDone(data) }} / {{ calculateAll(data) }} Done</span>
            </span>
            <i 
                v-if="isStatusDone(data)" 
                class="fonts fonts-11 green fa fa-1x fa-check-circle"></i>
            <i 
                v-else-if="isStatusOnProgress(data)"
                class="fonts fonts-11 orange fa fa-1x fa-check-circle"></i>
            <i 
                v-else-if="isStatusEmpty(data)"
                class="fonts fonts-11 light-grey fa fa-1x fa-check-circle"></i>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AppCardProgressProduct',
    props: {
        data: null 
    },
    methods: {
        calculateAllDone (data) {
            let status = 0
            data && data.map((item) => {
                if (item.status === 'on-progress' || item.status === 'done') {
                    status += item.quantity
                }
            })
            return status 
        },
        calculateDone (data) {
            let status = 0
            data && data.map((item) => {
                if (item.status === 'done') {
                    status += item.quantity
                }
            })
            return status 
        },
        calculateOnProgress (data) {
            let status = 0
            data && data.map((item) => {
                if (item.status === 'on-progress') {
                    status += item.quantity
                }
            })
            return status 
        },
        calculateAll (data) {
            let status = 0
            data && data.map((item) => {
                status += item.quantity
            })
            return status 
        },
        isStatusDone (data) {
            return this.calculateDone(data) === this.calculateAll(data)
        },
        isStatusOnProgress (data) {
            return this.calculateAllDone(data) > 0
        },
        isStatusEmpty (data) {
            return this.calculateOnProgress(data) === 0
        }
    }
}
</script>