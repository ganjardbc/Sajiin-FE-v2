<template>
    <div id="AppShopLink" class="width width-100">
        <div v-if="!disableLabel" class="margin margin-bottom-10px">
            <div class="fonts fonts-13px black semibold">Link Shop</div>
        </div>
        <div class="padding padding-15px bg-white-grey border-full border-radius display-flex space-between align-center">
            <div style="width: calc(100% - 110px);">
                <a 
                    :href="`${link}`" 
                    target="_blank"
                    style="width: 100%;">
                    <div class="fonts fonts-11 normal red overflow-ellipsis" id="visitor-shop-link">{{ `${link}` }}</div>
                </a>
            </div>
            <div style="width: 95px;" class="display-flex flex-end">
                <button 
                    @click="onCopy('visitor-shop-link')"
                    class="btn btn-small btn-sekunder">
                    Copy Link
                </button>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AppShopLink',
    props: {
        link: null,
        disableLabel: false,
    },
    methods: {
        onCopy (id) {
            const str = document.getElementById(id).innerHTML
            const el = document.createElement('input')
            el.value = str
            document.body.appendChild(el)
            el.select()

            try {
                var successful = document.execCommand('copy')
                var msg = successful ? 'Success' : 'Failed'
                this.$message(`${msg} copying this link !`)
            } catch (err) {
                this.makeToast('Oops, can not copy this link !')
            }

            document.body.removeChild(el)
        }
    }
}
</script>