<template>
    <div id="App">
        <div :class="`card-capsule ${getColor()}`">
            {{ label ? label : data.replace(/-/g, ' ') }}
        </div>
    </div>
</template>
<script>
export default {
    name: 'App',
    props: {
        data: null,
        label: null,
    },
    methods: {
        getColor () {
            let color = 'normal'
            switch (this.data) {
                case 'unconfirmed':
                    color = 'normal'
                    break
                case 'confirmed':
                    color = 'wip'
                    break
                case 'cooking':
                    color = 'wip'
                    break
                case 'delivered':
                    color = 'wip'
                    break
                case 'on-progress':
                    color = 'wip'
                    break
                case 'todo':
                    color = 'normal'
                    break
                case 'wip':
                    color = 'wip'
                    break
                case 'done':
                    color = 'active'
                    break
                case 'canceled':
                    color = 'inactive'
                    break
                case 'active':
                    color = 'active'
                    break
                case 'inactive':
                    color = 'inactive'
                    break
                case 'paid':
                    color = 'active'
                    break
                case 'unpaid':
                    color = 'inactive'
                    break
                case 'open':
                    color = 'active'
                    break
                case 'closed':
                    color = 'inactive'
                    break
            }
            return color
        }
    }
}
</script>