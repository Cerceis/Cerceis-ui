<template>
	<img :width="dimension" :src="iconPath">
</template>
 
<script lang="ts">
import { defineComponent, PropType, computed, ComputedRef } from "vue";

export type IconSize = "xs" | "sm" | "md" | "lg" 
export interface IconDimension{
	"xs": string,
	"sm": string,
	"md": string,
	"lg": string
}
 
export default defineComponent({
	props:{
		name:{
			type: String,
			default: ""
		},
		size:{
			type: String as PropType<IconSize>,
			default: "md"
		},
		setSrc:{ //Set src if available
			type: String,
			default: null
		}
	},
	setup(props) {
		const dimension: IconDimension = {
			"xs": "24",
			"sm": "32",
			"md": "48",
			"lg": "64",
		}	
		const iconPath: ComputedRef<string> = computed(()=>{
			const filename: string = props.name
			return (
				props.setSrc ?
				props.setSrc :
				require(`../../icons/${filename}.svg`)
			)
		})
		
		return {
			iconPath,
			dimension: dimension[props.size],
		}
	},
});
</script>
 
<style lang="scss" scoped>
</style>