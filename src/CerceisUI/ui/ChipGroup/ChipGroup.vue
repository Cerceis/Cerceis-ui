<template>
    <div class="flex gap-1">
        <slot v-for="(label, i) in filteredItems.displayList" :key=i name=chip :label="label">
        </slot>
        <c-float v-if="filteredItems.remainingList.length >= 0" pos="right">
            <template v-slot:activator="{open}">
                <slot name=chip :remain="filteredItems.remainingList.length" :open=open>
                </slot>
            </template>
            <template v-slot:content>
                <slot name=remainContent :remainList="filteredItems.remainingList">
                </slot>
            </template>
        </c-float>
        
    </div>
</template>
 
<script lang="ts">
import { defineComponent, PropType, computed, ComputedRef } from "vue";

export interface FilteredItems{
    displayList: string[],
    remainingList: string[]
}

export default defineComponent({
    props:{
        items:{
            type: Array as PropType<string[]>,
            default: []
        },
        max:{
            type: Number,
            default: 3
        }
    },
    setup(props) {
        const filteredItems: ComputedRef<FilteredItems> = computed(()=>{
            return {
                displayList:props.items.splice(0, props.max),
                remainingList:props.items,
            }
        })
        return {
            filteredItems,
            items:props.items,
        }
    },
});
</script>
 
<style lang="scss" scoped>
</style>