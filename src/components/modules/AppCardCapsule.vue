<template>
    <div id="App">
        <div :class="`card-capsule ${getColor()}`">
            {{ data }}
        </div>
    </div>
</template>
<script>
export default {
    name: 'App',
    props: {
        data: null 
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
            }
            return color
        }
    }
}
</script>