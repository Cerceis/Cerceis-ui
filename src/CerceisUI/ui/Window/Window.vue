<template>

    <c-container 
        :id=id
        class="windowContainer rounded" 
        @mousedown="triggerDrag"
        @mouseup="triggerDrag"
        :style="windowStyle"
    >
        <div id="taskbar" class="taskbar flex justify-end align-center">
            <c-btn size="xs">ー</c-btn>
            <c-btn size="xs" @click="triggerFullScreen">口</c-btn>
            <c-btn size="xs">X</c-btn>
        </div>
        <div @click="$event.stopPropagation()">
            <slot></slot>
        </div>
        <div class="resizeHandler"></div>
    </c-container>
</template>
 
<script lang="ts">
import { defineComponent, ref, Ref, computed, ComputedRef } from "vue";
import { GenerateObjectId } from "../shared/Functions"

/**
 * All Window's z-index will be set to 10, focused on 11.
 */


export default defineComponent({
    setup() {
        const dragTriggered: Ref<boolean> = ref(false);
        const fullScreenTriggered: Ref<boolean> = ref(false);
        const anchoredX: Ref<number> = ref(0);
        const anchoredY: Ref<number> = ref(0);
        const posY: Ref<string> = ref("200px");
        const posX: Ref<string> = ref("200px");
        const previousPosY: Ref<string> = ref("200px");
        const previousPosX: Ref<string> = ref("200px");
        const windowWidth: Ref<string> = ref("");
        const windowHeight: Ref<string> = ref("");
        const previousWindowWidth: Ref<string> = ref("");
        const previousWindowHeight: Ref<string> = ref("");
        
        const windowStyle: ComputedRef<{[key: string]: string | number}> = computed(()=>{
            return {
                padding: 0,
                top: posY.value,
                left: posX.value,
                width: windowWidth.value,
                height: windowHeight.value,
            }
        })
        
        const triggerFullScreen = (): void =>{
            if(fullScreenTriggered.value){
                windowWidth.value = previousWindowWidth.value;
                windowHeight.value = previousWindowHeight.value;
                posX.value = previousPosX.value;
                posY.value = previousPosY.value;
                fullScreenTriggered.value = false;
                return
            }
            previousPosX.value = posX.value
            previousPosY.value = posY.value
            posX.value = "0px";
            posY.value = "0px";
            previousWindowWidth.value = windowWidth.value
            previousWindowHeight.value = windowHeight.value
            windowWidth.value = "100%";
            windowHeight.value = "100vh";
            fullScreenTriggered.value = true;
        }

        const moveToFront = (id: string): void => {
            const windowList: any = document.querySelectorAll(".windowContainer")
            for(let i = 0; i<windowList.length; i++){
                windowList[i].style["z-index"] = windowList[i].id === id ? "11" : "10"
            }
        }

        const triggerDrag = (e: any): void =>{
            if(e.target.id === "taskbar"){
                //Move window to the front
                dragTriggered.value = e.buttons === 1 ? true: false;
                if(dragTriggered.value){
                    moveToFront(e.target.parentNode.id)
                    document.addEventListener("mousemove", mousemoveHandle)
                    anchoredX.value = e.layerX;
                    anchoredY.value = e.layerY;
                }else{
                    document.removeEventListener("mousemove", mousemoveHandle)
                }
            }
        }

        const mousemoveHandle = (e: any): void => {
            e.preventDefault();
            if(!dragTriggered.value) return
            if(e.buttons === 0){
                dragTriggered.value = false;
                return
            }
            posX.value = `${e.x - anchoredX.value}px`;
            posY.value = `${e.y - anchoredY.value}px`;
        }

        return {
            id: GenerateObjectId(),
            triggerDrag, mousemoveHandle,
            windowStyle, dragTriggered,
            triggerFullScreen
        }
    },
});
</script>

<style lang="scss" scoped>
.windowContainer {
    position:fixed;
    min-width: 200px;
    min-height: 200px;
    
    .taskbar{
        height:25px;
        width:100%;
        border-radius: .4em .4em 0 0;
        background-color: var(--primary);    
    }

    .resizeHandler{
        position:absolute;
        bottom: 0;
        right : 0;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0 0 10px 10px;
        opacity :.3;
        border-color: transparent transparent var(--text) transparent;
        &:hover{
            cursor:nwse-resize;
        }
    }
}
</style>