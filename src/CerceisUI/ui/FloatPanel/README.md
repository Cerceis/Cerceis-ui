# Float panel (tooltip)

## Description
A floating panel that can be toggle on off on desired element. (aka tooltip).

## Dependencies 
- N/A

## Props
- **v-model**: boolean: default = false: Open/close the notification panel.
- **icon**: string: default = "": Specifiy which icon to use for notification. (Usage same as **c-icon**).
    - If no icon is provided, by default it will use a bell icon which available internally without adding files to "icons" folder.

## Slots
- default: Content of the dialog
    - ### SlotProps
        - close: Function: Function that lets you close the dialog.

## Examples
```
<c-float v-if="filteredItems.remainingList.length >= 0">
    <template v-slot:activator="{open}">
        <slot name=chip :remain="filteredItems.remainingList.length" :open=open>
        </slot>
    </template>
    <template v-slot:content>
        <slot name=remainContent :remainList="filteredItems.remainingList">
        </slot>
    </template>
</c-float>
```