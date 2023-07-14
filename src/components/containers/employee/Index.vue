<template>
    <div id="App">
        <div class="padding padding-top-50px padding-bottom-50px">
            <AppEmpty 
                icon="fa fa-3x fa-shapes"
                title="WELCOME TO SAJI-IN EMPLOYEE PANEL" />
            <AppCardCircle :data="cards" />
        </div>
    </div>
</template>
<script>
import AppEmpty from '../../modules/AppEmpty'
import AppCardCircle from '../../modules/AppCardCircle'

export default {
    name: 'App',
    metaInfo: {
        title: 'Employee',
        titleTemplate: '%s | Home',
        htmlAttrs: {
            lang: 'en',
            amp: true
        }
    },
    data () {
        return {
            cards: []
        }
    },
    mounted () {
        const role = this.$cookies.get('role')
        switch (role.role_name) {
            case 'kitchen':
                this.cards = [
                    {title: 'Task Lists', icon: 'fa fa-2x fa-list-alt', link: 'employee-task-lists'},
                    {title: 'Profile', icon: 'fa fa-2x fa-user', link: 'employee-profile'},
                ]
                break
            case 'waiter':
                this.cards = [
                    {title: 'Orders', icon: 'fa fa-2x fa-list-ul', link: 'employee-orders'},
                    {title: 'Profile', icon: 'fa fa-2x fa-user', link: 'employee-profile'},
                ]
                break
            case 'cashier':
                this.cards = [
                    {title: 'Cashier', icon: 'fa fa-2x fa-laptop', link: 'employee-cashier'},
                    {title: 'Cash Book', icon: 'fa fa-2x fa-book-open', link: 'employee-cash-book'},
                    {title: 'Orders', icon: 'fa fa-2x fa-list-ul', link: 'employee-orders'},
                    {title: 'Products', icon: 'fa fa-2x fa-utensils', link: 'employee-products'},
                ]
                break
            case 'supervisor':
                this.cards = [
                    {title: 'Cash Book', icon: 'fa fa-2x fa-book-open', link: 'employee-cash-book'},
                    {title: 'Orders', icon: 'fa fa-2x fa-list-ul', link: 'employee-orders'},
                    {title: 'Products', icon: 'fa fa-2x fa-utensils', link: 'employee-products'},
                    {title: 'Employees', icon: 'fa fa-2x fa-users', link: 'employee-employees'},
                ]
                break
        }
    },
    components: {
        AppEmpty,
        AppCardCircle
    }
}
</script>