<template>
    <div id="App">
        <div :class="`card-capsule ${data}`">
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
}
</script>