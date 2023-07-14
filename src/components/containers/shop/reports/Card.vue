<template>
	<div id="App">
		<el-table :data="data" border empty-text="No Data">
			<el-table-column 
				type="index" 
				label="No" 
				width="50" 
				align="center"
				:index="indexMethod"></el-table-column>
			<el-table-column label="Order ID" min-width="200">
				<template slot-scope="scope">
					<div><AppCardCapsule :data="scope.row.order.status" :label="scope.row.order.order_id" /></div>
				</template>
			</el-table-column>
			<el-table-column label="Order Date" min-width="150">
				<template slot-scope="scope">
					<div>{{ scope.row.order.created_at | moment("DD MMM YYYY") }}</div>
				</template>
			</el-table-column>
			<el-table-column label="Order Item" min-width="350">
				<template slot-scope="scope">
					<div 
						v-for="(dt, i) in scope.row.details" 
						:key="i" 
						class="width width-100 padding padding-bottom-5px padding-top-5px">
						<div>{{ dt.product_name }}</div>
						<div class="display-flex space-between">
							<div> {{ dt.quantity }} x {{ dt.product_detail }}</div>
							<div style="font-weight: bold;">{{ format(dt.price) }}</div>
						</div>
					</div>
				</template>
			</el-table-column>
			<el-table-column label="Total" align="right" min-width="200">
				<template slot-scope="scope">
					<div style="font-weight: bold;">{{ format(scope.row.order.total_price) }}</div>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>
<script>
import { mapState } from 'vuex'
import AppCardCapsule from '../../../modules/AppCardCapsule'

export default {
    name: 'App',
    data () {
    	return {}
    },
    components: {
    	AppCardCapsule
    },
    computed: {
    	...mapState({
            data: (state) => state.storeReports.data,
            offset: (state) => state.storeReports.offset,
        })
    },
    methods: {
    	indexMethod(index) {
            return (index + 1) + this.offset
        },
    }
}
</script>