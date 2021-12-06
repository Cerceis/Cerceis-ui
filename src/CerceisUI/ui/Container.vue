<template>
    <div class="containerStyle">
        <slot />
    </div>
</template>
 
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    setup(){
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