<template>
	<div :style="avatarStyle">
		<span v-if="text" class="avatarContent">{{text}}</span>
	</div>
</template>
 
<script lang="ts">
import { defineComponent, PropType } from "vue";
import { RandomInt } from "lib/RandomInt/random-int";

type dimension = "sm" | "md" | "lg" 
interface AvartarDimension{
	"sm": string,
	"md": string,
	"lg": string
}

export default defineComponent({
	props:{
		color:{
			type: String,
			default: "primary"
		},
		text:{
			type: String,
			default: ""
		},
		size:{
			type: String as PropType<dimension>,
			default: "md"
		}
	},
	setup(props) {
		//Currently support initial only
		//Will support images in near future.
		const dimension: AvartarDimension = {
			"sm": "32px",
			"md": "48px",
			"lg": "64px",
		}
		const avatarStyle = {
			height: dimension[props.size],
			width: dimension[props.size],
			borderRadius: "50%",
			position:"relative",
			backgroundColor: `rgb(${RandomInt(50, 200)}, ${RandomInt(50, 200)}, ${RandomInt(50, 200)})`
		}
		const text: string = props.text ?
		props.text.length === 1 ?
		props.text :
		props.text[0]: 
		""

		return{
			text,
			avatarStyle
		}
	},
});
</script>
 
<style lang="scss" scoped>
.avatarContent{
	position:absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	color: white;
	font-weight: 500;

}
</style>