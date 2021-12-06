<template>
    <div class="CLoaderLinearContainer" :style="localCssProps">
        <div class="CLoaderLinearInner"></div>
    </div>
</template>
 
<script lang="ts">
import { defineComponent, PropType, computed } from "vue";
import { ColorPalette } from "./shared/Types";

export default defineComponent({
    props: {
        color: {
            type: String as PropType<ColorPalette>,
            default: "primary",
        },
		height:{
			type: String,
			default: "5px",
		}
    },
    setup(props) {
		//Styles
		const localCssProps = computed(() => {
            return {
                "--mainColor": `var(--${props.color})`,
				"--height": props.height
            };
        });


		return{
			localCssProps
		}
	},
});
</script>
 
<style lang="scss" scoped>
.CLoaderLinearContainer {
	position:relative;
	width:100%;
	height:var(--height);
	backdrop-filter: brightness(0.5);
	overflow:hidden;
}

.CLoaderLinearInner {
	position:absolute;
	top:0;
	left:0;
	width:0%;
	height:var(--height);
	background-color: var(--mainColor);
	animation: move 1s ease-in-out infinite;
}

@keyframes move {
	0%{
		left:0;
		width:0%;
	}
	25%{
		width:20%;
	}
	50%{
		width:30%;
	}
	100% {
		width:0%;
		left:100%;
	}
}
</style>