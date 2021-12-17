<template>
    <label class="switch">
        <input 
			type="checkbox" 
			
			:value="value"
			v-model="model"
		/>
        <span class="slider round" :style="sliderStyle" ></span>
    </label>
</template>
 
<script lang="ts">
import { defineComponent, ref, Ref, computed, PropType } from "vue";
import { ColorPalette } from "./shared/Types"

export default defineComponent({
	props:{
		color:{
			type: String as PropType<ColorPalette>,
			default: "primary"
		},
		value:{
			type: null
		},
		modelValue:{}
	},
    setup(props, {emit}) {
		//Styles
		const sliderStyle: Ref<{}> = ref({});
		sliderStyle.value = {
			backgroundColor: `var(--${props.color})`,
		};
		//Value
		const model = computed({
			get(){ return props.modelValue },
			set(value) { emit('update:modelValue', value) }
		})
     
		return{
			value:props.value,
			sliderStyle,
			model
		}
	},
});
</script>
 
<style lang="scss" scoped>
/* The switch - the box around the slider */
.switch {
    position: relative;
    display: inline-block;
    width: 48px;
    height: 26px;
}

/* Hide default HTML checkbox */
.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

/* The slider */
.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--primary);
    -webkit-transition: 0.4s;
    transition: 0.4s;
}

.slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: 0.4s;
    transition: 0.4s;
}

input:not(:checked) + .slider {
    background-color: #ccc !important;
	box-shadow: 0 0 1px #ccc;
}

input:checked + .slider:before {
    -webkit-transform: translateX(22px);
    -ms-transform: translateX(22px);
    transform: translateX(22px);
}

.slider.round {
    border-radius: 34px;
}

.slider.round:before {
    border-radius: 50%;
}
</style>