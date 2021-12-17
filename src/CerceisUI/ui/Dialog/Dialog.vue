<template>
    <div v-if="dialogState" class="overlay" @click="closePanel"></div>
    <c-container v-if="dialogState" class="dialogContainer">
        <slot default :close=closePanel></slot>
    </c-container>
</template>
 
<script lang="ts">
import { defineComponent, computed, ComputedRef } from "vue";

export default defineComponent({
    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },
    },
    setup(props, {emit}) {
        const dialogState: ComputedRef<boolean> = computed(() => {
            return props.modelValue;
        });
        const closePanel = (): void=>{
            emit('update:modelValue', false)
        }
        return {
            dialogState, closePanel
        };
    },
});
</script>
 
<style lang="scss" scoped>
.overlay{
    position: fixed;
    top: 0;
    left:0;
    height: 100vh;
    width: 100vw;
    background-color: black;
    opacity: .3;
    z-index: 998;
}
.dialogContainer{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
}
</style>