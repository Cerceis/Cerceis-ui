<template>
    <div class="chipGroupContainer">
        <slot v-for="(label, i) in filteredItems.displayList" :key=i name=chip :label="label">
        </slot>
        <slot v-if="filteredItems.remainingList.length >= 0" name=chip :remain="filteredItems.remainingList.length">
        </slot>
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
.chipGroupContainer{
    display:flex;

    gap:.5em;
}
</style>