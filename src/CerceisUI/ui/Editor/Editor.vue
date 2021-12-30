<template>
    EDITOR
    <div id="editorContainer rounded">
        <div class="editorControls">
            <c-btn @click="insertInto('bold')">B</c-btn>
            asdasd
        </div>
        <div contenteditable id="editor" @input="onInput" class="pa-3"></div>
    </div>
    Plain text mode:
    <div class="testContainer rounded pa-3 ma-1">
        <pre>{{rawEditorValue}}</pre>
    </div>
    HTML mode:
    <div class="testContainer rounded pa-3 ma-1">
        <div v-html="htmlEditorValue"></div>
    </div>
</template>
 
<script lang="ts">
import { defineComponent, computed, ComputedRef, ref, Ref} from "vue";
 /**
  * Should be outputted as HTML mode, then later refine a version of plaintext
  */
export default defineComponent({
    setup() {
        const ediorEle = document.getElementById("editor")
        const rawEditorValue: Ref<string> = ref("");
        const htmlEditorValue: ComputedRef<string> = computed((): string=>{
            return rawEditorValue.value.replaceAll("\n", "<br>")
        })
        const onInput = (e: any): void =>{
            rawEditorValue.value = e.target.outerText;
        }
        const insertInto = (insertMode: string): void =>{
            const selection: any = window.getSelection();
            if(!selection) return
            const startPart: string = rawEditorValue.value.slice(0, selection.anchorOffset)
            const endPart: string = rawEditorValue.value.slice(selection.anchorOffset, rawEditorValue.value.length)
            const selectionString: string = selection.toString()
            console.log(selection)
            console.log(startPart)
            console.log(endPart)
            const updateEditorContent = (): void => {
                //Update editor data
                const ele = document.getElementById("editor")
                if(ele) ele.textContent = rawEditorValue.value
            }
            switch(insertMode){
                case "bold":
                    if(!selectionString) return
                    rawEditorValue.value = `${startPart}${endPart.replace(selectionString, `<b>${selectionString}</b>`)}`
                    updateEditorContent()
                    break   
            }
          
        }
    
        return {
            rawEditorValue,
            htmlEditorValue,
            onInput,
            insertInto
        }
    },
});
</script>
 
<style lang="scss" scoped>
#editorContainer{
    position: relative;
    min-width: 200px;
    min-height: 200px;
}
.editorControls{
    display:flex;
    background-color: var(--primary);
    width: 100%;
    border-radius: .5em .5em 0 0;
}
#editor{
    height:100%;
    min-height: 200px;
    background: white;
    color:black;
    outline: none;
    border-radius: 0 0 .5em .5em;
}
.testContainer{
    border: 1px solid var(--activate);
}
</style>