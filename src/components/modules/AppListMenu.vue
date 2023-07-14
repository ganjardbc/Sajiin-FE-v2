<template>
    <div id="AppListMenu">
        <ul :class="(isSidebarSmall 
                ? 'content-scroll menu-list hover with-icon' 
                : 'content-scroll menu-list hover with-big-icon ' + (enableGridView ? 'display-flex wrap' : '')
            )">
            <li 
                v-for="(dt, index) in dataSideBar" 
                :key="index" 
                :class="'ml-list ' + (enableGridView ? 'fixed-column-3' : '')"
            >
                <router-link v-if="!dt.menu" :to="{name: dt.link}" class="ml-link" :title="dt.label" exact>
                    <div class="ml-icon">
                        <i :class="dt.icon" />
                    </div>
                    <div class="ml-label">
                        {{ dt.label }}
                    </div>
                    <div class="val-container">
                        <div v-if="dt.value > 0" class="ml-value">
                            <div class="post-center">{{ dt.value }}</div>
                        </div>
                    </div>
                </router-link>
                <div v-if="dt.menu" class="submenu">
                    <div v-if="!dt.disableMenu" class="sublist">
                        <div class="sublabel">
                            {{ dt.label }}
                        </div>
                    </div>
                    <ul v-if="dt.menu.length > 0" class="subcontent">
                        <li v-for="(sb, index) in dt.menu" :key="index" class="ml-list" @click="onClick">
                            <router-link :to="{name: sb.link}" class="ml-link" :title="sb.label">
                                <div class="ml-icon" exact>
                                    <i :class="sb.icon" />
                                </div>
                                <div class="ml-label">
                                    {{ sb.label }}
                                </div>
                                <div class="val-container">
                                    <div v-if="sb.value > 0" class="ml-value">
                                        <div class="post-center">{{ sb.value }}</div>
                                    </div>
                                </div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'AppListMenu',
    data () {
        return {
            sidebar: [],
        }
    },
    mounted() {},
    methods: {
        onClick () {
            this.$emit('onClick')
        },
        onCheckSubmenus (data) {
            let menu = []
            data && data.map((dt) => {
                const stt = this.onCheckPermission(dt.permission)
                if (stt) {
                    menu.push({
                        ...dt
                    })
                }
            })
            return menu
        },
        onCheckPermission (value) {
            let stt = false
            const data = this.permissions
            if (data && data.length > 0) {
                const isTherePermission = data.find((item) => item.permission_name === value)
                if (isTherePermission) {
                    stt = true
                }
            }
            return stt
        },
    },
    computed: {
        permissions() {
            return this.$cookies.get('permissions')
        },
        dataSideBar() {
            let menu = []
            this.data && this.data.map((dt) => {
                if (dt.menu) {
                    let submenu = this.onCheckSubmenus(dt.menu)
                    if (submenu.length > 0) {
                        let submenuPayload = []
                        submenu && submenu.map((sb) => {
                            submenuPayload.push({...sb})
                        })
                        if (submenuPayload.length > 0) {
                            menu.push({
                                ...dt,
                                menu: submenuPayload
                            })
                        }
                    }
                }
            })
            return menu
        }
    },
    props: {
        enableGridView: {
            type: Boolean,
            required: false
        },
        disableResponsive: {
            type: Boolean,
            required: false
        },
        isSidebarSmall: {
            type: Boolean,
            required: false
        },
        data: {
            required: true
        }
    }
}
</script>