<template>
    <div id="App" class="margin margin-bottom-15px">
        <div class="card bg-white box-shadow">
            <div class="fonts fonts-14 semibold black">Thermal Printer</div>
            <el-alert
                title="How to use thermal printer ?"
                description="To using thermal printer you must having third party application from sajiin, to get this application you have contact Admin Sajiin and follow the instructions."
                type="warning"
                :closable="true"
                show-icon
                style="margin: 15px 0;">
            </el-alert>
            <div class="padding padding-top-10px padding-bottom-10px">
                <div class="fonts fonts-11 semibold black">Status</div>
                <div class="display-flex space-between">
                    <div class="fonts micro black">Enable the thermal url ?</div>
                    <el-switch 
                        v-model="form.thermal_status"
                        :active-value="true"
                        :inactive-value="false"
                        @change="onChangeThermalStatus"></el-switch>
                </div>
            </div>
            <div class="padding padding-top-10px padding-bottom-10px">
                <div class="fonts fonts-11 semibold black">URL</div>
                <div class="fonts fonts-10 normal grey">Set your thermal printer url</div>
                <el-input 
                    placeholder=""
                    type="url"
                    :disabled="!form.thermal_status"
                    @input="onSetThermalUrl"
                    v-model="form.thermal_url"></el-input>
            </div>
            <div class="display-flex flex-end">
                <button 
                    class="btn btn-main" 
                    :disabled="visibleButtonSave"
                    @click="onSave">
                    Save Setting
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            visibleButtonSave: true,
            form: {
                thermal_status: false,
                thermal_url: '',
            }
        }
    },
    mounted () {
        this.form.thermal_status = this.$cookies.get('thermalStatus')
        this.form.thermal_url = this.$cookies.get('thermalUrl')
    },
    methods: {
        onSetThermalUrl (currentValue) {
            let prevValue = this.$cookies.get('thermalUrl')
            this.visibleButtonSave = true 
            if (
                this.form.thermal_status && 
                currentValue !== '' && 
                prevValue !== currentValue
            ) {
                this.visibleButtonSave = false 
            }
        },
        onChangeThermalStatus (value) {
            this.$cookies.set('thermalStatus', value)
            this.$message(`Success setting thermal status`)
        },
        onSave () {
            const value = this.form.thermal_url
            if (value) {
                this.visibleButtonSave = true
                this.$cookies.set('thermalUrl', value)
                this.$message(`Success setting thermal url to ${value}`)
            } else {
                this.visibleButtonSave = false 
                this.$message({
                    message: `Failed to update thermal url.`,
                    type: 'error'
                })
            }
        }
    }
}
</script>