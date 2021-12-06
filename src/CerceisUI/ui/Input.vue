<template>
	<div class="inputContainer">
		<label 
			:for="inputId" 
			class="inputLabel text-b2"
			:style="labelStyle"
		>{{labelContent}}</label>
		<input 
			:id="inputId" 
			:type="type" 
			class="input rounded" 
			:style="inputStyle"
			:value="syncedValue" 
			@focus="$emit('focus', $event)"
			@input="$emit('update:modelValue', $event.target.value)"
		/>
	</div>
</template>
 
<script lang="ts">
import { defineComponent, ref, Ref, computed } from "vue";
const GenerateObjectId = (): string => {
	const timestamp: string = (new Date().getTime() / 1000 | 0).toString(16);
	return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
		return (Math.random() * 16 | 0).toString(16);
	}).toLowerCase();
}

export default defineComponent({
	props:{
		type:{
			type: String,
			default: "text"
		},
		label:{
			type: String,
			default: ""
		},
		modelValue:{
			type: String,
			default: ""
		},
		error:{
			type: Boolean,
			default: false
		}
	},
	setup(props) {
		const inputId: string = GenerateObjectId();
		const labelContent: Ref<String> = ref(props.label);
		const localInputValue: Ref<String> = ref("");

		const syncedValue  = computed(() => localInputValue.value = props.modelValue)

		const inputStyle = {
			outline: props.error ? "solid 2px var(--error)" : "",
		}
		const labelStyle = computed(()=>{
			return {color: props.error ? "var(--error)" : "var(--text)",}
		})
	
		return{
			syncedValue,
			labelContent,
			type: props.type,
			inputId,
			inputStyle, labelStyle
		}
	},
});
</script>
 
<style lang="scss">
.inputContainer{
	position:relative;
	display: inline-block;
	padding:13px 0;
}
.inputLabel {
	position:absolute;
	content: var(--labelContent);
	color:var(--text);
	top:0px;
	left:10px;
	background-color: var(--bg);
	padding: 0 5px;
}
.input{
	width:calc(100% - .7em - 13px);
	padding: .7em;
	background:var(--bg);
	color:var(--text);
	text-decoration: none;
	border: 2px solid rgba(77,77,77, 1);
	&:focus{
		outline: solid 2px var(--primary);
	}
}
</style>