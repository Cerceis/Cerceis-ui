<template>
    <slot name="activator" :open="toggleSidebar"></slot>
    <div v-if="panelOpen" class="overlay"></div>
    <div ref="panelContainer" :style="sidebarStyle" class="sidebarContainer shadow" tabindex="-1" @blur="toggleSidebar">
        
    </div>
</template>
 
<script lang="ts">
import { defineComponent, PropType, computed, ComputedRef, ref, Ref } from "vue";

export type pos = "left" | "top" | "bottom" | "right"
//There's still bug on toggling panel when you click the button twice.
//But otherwise, using blur as closing signal, everything should work fine.

export default defineComponent({
    props:{
        pos:{
            type: String as PropType<pos>,
            default: "left"
        }
    },
    setup(props) {
        const panelContainer: Ref<any> = ref(null);
        const panelOpen: Ref<boolean> = ref(false);
        const panelwidth: Ref<number> = ref(0);
        const panelHeight: Ref<number> = ref(0);
        const sidebarStyle: ComputedRef<{}> = computed(()=>{
            switch(props.pos){
                case "right":
                    panelHeight.value = 100;
                    return {
                        top: "0",
                        right: "0",
                        width: `${panelwidth.value}vw`,
                        height: `${panelHeight.value}vh`
                    }
                case "top":
                    panelwidth.value = 100;
                    return {
                        top: "0",
                        left: "0",
                        height: `${panelHeight.value}vh`,
                        width: `${panelwidth.value}vw`,
                    }
                case "bottom":
                    panelwidth.value = 100;
                    return {
                        bottom: "0",
                        left: "0",
                        height: `${panelHeight.value}vh`,
                        width: `${panelwidth.value}vw`,
                    }
                default:
                    panelHeight.value = 100;
                    return {
                        top: "0",
                        left: "0",
                        width: `${panelwidth.value}vw`,
                        height: `${panelHeight.value}vh`
                    }
            }
        })

        const toggleSidebar = (): void => {

            if(panelOpen.value){//Open
                panelwidth.value = 0;
                panelOpen.value = false;
            }
            else{ //Closed
                panelwidth.value = 20;
                panelContainer.value.focus();
                panelOpen.value = true;
            }
                
        }

        return{
            panelOpen,
            panelContainer,
            toggleSidebar,
            sidebarStyle
        }
    },
});
</script>
 
<style lang="scss" scoped>
.sidebarContainer{
    position: fixed;
    background-color: var(--bg);
    transition: all .4s;
}
.overlay{
    position: fixed;
    top: 0;
    left:0;
    height: 100vh;
    width: 100vw;
    background-color: black;
    opacity: .3;
}
</style>