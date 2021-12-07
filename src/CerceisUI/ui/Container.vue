<template>
    <div :class="containerClass">
        <slot />
    </div>
</template>
 
<script lang="ts">
import { defineComponent, Ref, ref } from "vue";

export default defineComponent({
    props:{
        flat:{
            type: Boolean,
            default: false
        }
    },
    setup(props){
        
        const containerClass: Ref<string> = ref("containerStyle shadow")
        if(props.flat) containerClass.value = "containerStyle";
        return{
            containerClass
        }
	},
});
</script>
 
<style lang="scss" scoped>
.containerStyle{
	padding: .75em;
	background-color:var(--bg);
	color: var(--text);
}
</style>