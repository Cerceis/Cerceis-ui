<template>
    <slot name="activator" :open="toggleSidebar"></slot>
    <div v-if="panelOpen" class="overlay" @click="toggleSidebar"></div>
    <div ref="panelContainer" :style="sidebarStyle" class="sidebarContainer shadow">
        <slot name="content" :toggle="toggleSidebar" />
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
        const panelContainer: Ref<HTMLElement | null> = ref(null);
        const panelOpen: Ref<boolean> = ref(false);
        const panelPos: Ref<number> = ref(0);
        const currentPanelWidth: ComputedRef<number> = computed(()=>{
            if(panelContainer.value)
                return panelContainer.value.getBoundingClientRect().width
            return 0
        })

        const sidebarStyle: ComputedRef<{}> = computed(()=>{
            if(panelOpen.value)
                panelPos.value = 0;
            else
                panelPos.value = -currentPanelWidth.value;
            switch(props.pos){
                case "right":
                    return {
                        top: "0",
                        right: `${panelPos.value}px`,
                        height: `100vh`
                    }
                case "top":
                    return {
                        top: `${panelPos.value}px`,
                        left: "0",
                        width: `100vw`,
                    }
                case "bottom":
                    return {
                        bottom: `${panelPos.value}px`,
                        left: "0",
                        width: `100vw`,
                    }
                default:
                    return {
                        top: "0",
                        left: `${panelPos.value}px`,
                        height: `100vh`
                    }
            }
        })

        const toggleSidebar = (): void => {
            if(panelOpen.value){//While Opened
                panelOpen.value = false;
            }
            else{ //While Closed
                if(panelContainer.value)
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
    transition: all .2s;
    padding:1em;
    z-index: 999;
}
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
</style>