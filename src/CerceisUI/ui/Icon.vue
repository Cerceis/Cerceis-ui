<template>
	<img :width="dimension" :src="iconPath">
</template>
 
<script lang="ts">
import { defineComponent, PropType, computed, ComputedRef } from "vue";

type dimension = "xs" | "sm" | "md" | "lg" 
interface AvartarDimension{
	"xs": string,
	"sm": string,
	"md": string,
	"lg": string
}
 
export default defineComponent({
	props:{
		name:{
			type: String,
			required: true,
		},
		size:{
			type: String as PropType<dimension>,
			default: "md"
		}
	},
	setup(props) {
		const dimension: AvartarDimension = {
			"xs": "16",
			"sm": "32",
			"md": "48",
			"lg": "64",
		}	
		const iconPath: ComputedRef<string> = computed(()=>{
			const filename: string = props.name
			return require(`../icons/${filename}.svg`)
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