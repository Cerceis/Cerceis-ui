<template>
	<span class="checkboxContainer">
		<span class="innerWarp">
			<input :id="id" type="checkbox" v-model="model" :value="value" />
			<label :for="id">
				<span :style="checkBoxStyle"></span>
				{{ label }}
				<ins><i :style="labelStyle">{{ label }}</i></ins>
		</label>
		</span>
	</span>
</template>
 
<script lang="ts">
import { defineComponent, ref, Ref, computed } from "vue";
import { GenerateObjectId } from "lib/GenerateObjectId/generate-objectid";

export default defineComponent({
    props: {
        color: {
            type: String,
            default: "primary",
        },
		label: {
			type: String,
			default: ""
		},
        value: {
            type: null,
        },
        modelValue: {
            type: [Array, Boolean],
        },
    },
    setup(props, { emit }) {
        //Styles
        const checkBoxStyle: Ref<{}> = ref({});
        checkBoxStyle.value = {
            border: `0.5em solid var(--${props.color})`,
        };
		const labelStyle: Ref<{}> = ref({});
        labelStyle.value = {
            color: `var(--${props.color})`,
        };
		//Label
		const label = computed(()=> props.label)
        //Value
        const model = computed({
            get() {
                return props.modelValue;
            },
            set(value) {
                emit("update:modelValue", value);
            },
        });

        return {
            id: GenerateObjectId(),
            value: props.value,
            checkBoxStyle, labelStyle,
            model,
			label
        };
    },
});
</script>
 
<style lang="scss" scoped>
* {
    box-sizing: border-box;
    user-select: none;
}
.checkboxContainer{
	position:relative;
}
.innerWarp{
	display:inline-block;
}
input[type="checkbox"] {
	display:none;
	position:absolute;
    height: 0;
    width: 0;
}

input[type="checkbox"] + label {
    position: relative;
    display: flex;
    margin: 0.6em 0;
    align-items: center;
    color: #9e9e9e;
    transition: color 250ms cubic-bezier(0.4, 0, 0.23, 1);
}
input[type="checkbox"] + label > ins {
    position: absolute;
    display: block;
    bottom: 0;
    left: 2em;
    height: 0;
    width: 100%;
    overflow: hidden;
    text-decoration: none;
    transition: height 300ms cubic-bezier(0.4, 0, 0.23, 1);
}
input[type="checkbox"] + label > ins > i {
    position: absolute;
    bottom: 0;
    //color: var(--primary);
	font-style: normal;
}
input[type="checkbox"] + label > span {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 1em;
    width: 1em;
    height: 1em;
    background: transparent;
    border: 2px solid #9e9e9e;
    border-radius: 2px;
    cursor: pointer;
    transition: all 250ms cubic-bezier(0.4, 0, 0.23, 1);
}

input[type="checkbox"] + label:hover,
input[type="checkbox"]:focus + label {
    color: var(--text);
}
input[type="checkbox"] + label:hover > span,
input[type="checkbox"]:focus + label > span {
    background: rgba(255, 255, 255, 0.1);
}


input[type="checkbox"]:checked + label > ins {
    height: 100%;
}
input[type="checkbox"]:checked + label > span {
	position: relative;
    //border: 0.5em solid var(--primary);
    animation: shrink-bounce 200ms cubic-bezier(0.4, 0, 0.23, 1);
}
input[type="checkbox"]:not(:checked) + label > span {
	border: 2px solid #9e9e9e !important;
}
input[type="checkbox"]:checked + label > span:before {
    content: "";
    position: absolute;
	top:50%;
	padding:1px;
    border-right: 3px solid transparent;
    border-bottom: 3px solid transparent;
    transform: rotate(45deg);
    animation: checkbox-check 125ms 250ms cubic-bezier(0.4, 0, 0.23, 1) forwards;
}

@keyframes shrink-bounce {
    0% {
        transform: scale(1);
    }
    33% {
        transform: scale(0.85);
    }
    100% {
        transform: scale(1);
    }
}
@keyframes checkbox-check {
    0% {
        width: 0;
        height: 0;
        border-color: white;
        transform: translate3d(0, 0, 0) rotate(45deg);
    }
    33% {
        width: 0.2em;
        height: 0;
        transform: translate3d(0, 0, 0) rotate(45deg);
    }
    100% {
        width: 0.2em;
        height: 0.5em;
        border-color: white;
        transform: translate3d(0, -0.5em, 0) rotate(45deg);
    }
}
</style>