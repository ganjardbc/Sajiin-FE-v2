<template>
    <div id="App">
        <el-popover
            placement="bottom-start"
            width="250"
            trigger="click">
            <div>Notification</div>
            <button 
                slot="reference"
                class="btn btn-sekunder btn-icon btn-circle">
                <i class="icn fa fa-lg fa-bell"></i>
            </button>
        </el-popover>
    </div>
</template>
<script>
export default {
    name: 'App'
}
</script>