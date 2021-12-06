<template>
	<div class="selectContainer" @click="initSelect()" tabindex="-1" @blur="cancelSelection">
		<input type="text" class="selectInput rounded" disabled :value="labelValue">
		<span :class="triClass"></span>
		<div v-if="selectionOpened" class="optionsContainer slide-in-top">
			<div 
				class="option" 
				@click="selectOption($event, option)"
				v-for="(option, index) in options" :key="index" :value="option.value">
				{{option.label}}
			</div>
		</div>
	</div>
</template>
 
<script lang="ts">
import { defineComponent, PropType, computed, Ref, ref } from "vue";

export interface Option{
	label: string,
	value: any
}
 
export default defineComponent({
	props:{
		options:{
			type: Array as PropType<Option[]>,
			default: []
		},
		modelValue:{
			default: ""
		},
	},
	setup(props, { emit }) {
		const localInputValue: Ref<any> = ref("");
		const labelValue  = computed(() => localInputValue.value = (props.options.find(op => op.value === props.modelValue))?.label )

		const selectionOpened: Ref<boolean> = ref(false);
		const triClass: Ref<string> = ref("tri tri-up");

		const initSelect = (): void =>{
			if(selectionOpened.value) return
			/*
				0: input
				1: tri
				n: options
			*/
			triClass.value = "tri tri-down";
			selectionOpened.value = !selectionOpened.value;
		}


		const selectOption = (e: any, option: Option): void =>{
			e.stopPropagation();
			triClass.value = "tri tri-up";
			localInputValue.value = option.label;
			selectionOpened.value = false;
			emit('update:modelValue', option.value)
		}

		const cancelSelection = (): void =>{
			triClass.value = "tri tri-up";	
			selectionOpened.value = false;
		}

		return {
			triClass,
			initSelect, selectionOpened,
			selectOption, labelValue,
			options: props.options,
			cancelSelection
		}
	},
});
</script>
 
<style lang="scss" scoped>
select{
	padding: .5em;	
}
.optionsContainer{
	position: absolute;
	top:0;
	left:0;
	width:100%;
	z-index: 2;
	box-shadow:0 0 10px 2px black;
}
.option{
	padding: .5em;
	background-color: var(--bg);
	&:hover{
		background: var(--primary);
	}
}
.selectContainer{
	position: relative;
}
.selectInput{
	background-color: var(--bg);
	color: var(--text) !important;
	width:calc(100% - .7em - 13px);
	padding: .7em;
	text-decoration: none;
	border: 2px solid rgba(77,77,77, 1);
}
.tri{
	position:absolute;
	top:50%;
	right:10px;
	width: 0;
	height: 0;
	border-style: solid;
	border-width: 0 5px 6px 5px;
	border-color: transparent transparent var(--text) transparent;
	transition: all .4s;
}
.tri-up{
	transform:translate(-10px, -50%);
}
.tri-down{
	transform:translate(-10px, -50%) rotate(180deg);
}

.slide-in-top {
	-webkit-animation: slide-in-top 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	animation: slide-in-top 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}
@-webkit-keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-10px);
            transform: translateY(-10px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
}
@keyframes slide-in-top {
  0% {
    -webkit-transform: translateY(-10px);
            transform: translateY(-10px);
    opacity: 0;
  }
  100% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
    opacity: 1;
  }
}


</style>