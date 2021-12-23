<template>
    <button
		v-if="!isChip"
        :class="`btn ${sizeClass}`"
        :style="buttonStyle"
    >
        <span class="btnLabelContent">
            <slot />
        </span>
    </button>
	<div 
		v-else
		:class="`chip ${sizeClass}`"
        :style="buttonStyle"
	>
        <span class="btnLabelContent">
		    <slot />
        </span>
	</div>
</template>
 
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    props: {
        color: {
            type: String,
            default: "primary",
        },
        size: {
            type: String,
            default: "sm",
        },
        flat: {
            type: Boolean,
            default: false,
        },
		chip:{
			type: Boolean,
			default: false,
		}
    },
    setup(props) {
        let buttonStyle: any = {
            backgroundColor: `var(--${props.color})`,
        };
        if (props.flat) {
            buttonStyle.backgroundColor = `var(--bg)`;
            buttonStyle.color = `var(--${props.color})`;
        }

        return {
            sizeClass: props.size,
            buttonStyle,
			isChip: props.chip,
        };
    },
});
</script>
 
<style lang="scss">
.btn {
    position: relative;
    overflow: hidden;
    transition: all .1s;
    color: #fff;
    outline: 0;
    border: 0;
    border-radius: 0.25rem;
    cursor: pointer;
	&:active{
		background-color: var(--activate)
	}
}
.chip{
	display: inline-block;
	position: relative;
    overflow: hidden;
    transition: all .1s;
    color: #fff;
    outline: 0;
    border: 0;
    border-radius: 0.25rem;
}

.ic{
	padding: 0;
	font-size:1rem;
}
.sm {
    padding: 0.5rem 1rem;
	font-size: 1rem;
}
.md {
    padding: 0.75rem 1.5rem;
    font-size: 1.25rem;
}
.lg {
    padding: 1rem 2rem;
    font-size: 1.5rem;
}
</style>