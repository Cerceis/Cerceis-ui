import { PropType } from "vue"
import {
	DataHeaders,
	ItemPerPage,
	ApiOptions
} from "./Types"

export const Props = {
	color: {
		type: String,
		default: "primary",
	},
	items:{
		type: Array,
		default: []
	},
	datatable: {
		type: Boolean,
		default: false,
	},
	headers: {
		type: Array as PropType<DataHeaders[]>,
		default:[]
	},
	search:{
		type: String,
		default: ""
	},
	mobileBreakPoint:{
		type: Number,
		default: 350
	},
	itemPerPage:{
		type: Array as PropType<ItemPerPage[]>,
		default:[
			{
				label:'10',
				value: 10
			},
			{
				label:'25',
				value: 25
			},
			{
				label:'50',
				value: 50
			}
		]
	},
	itemPerPageDefault:{
		type: Number,
		default:10
	},
	api:{
		type: Object as PropType<ApiOptions>,
		default: null
	}
}