# Dialog

## Description
A pop up container.

## Dependencies 
- [ CerceisUI ] Container

## Props
- **v-model**: boolean: default = false: Open/close the dialog.

## Slots
- default: Content of the dialog
    - ### SlotProps
        - close: Function: Function that lets you close the dialog.

## Examples
```
//dialogDisplay: Ref<boolean>

<c-btn @click="dialogDisplay=!dialogDisplay">
    OPEN
</c-btn>
<c-dialog v-model="dialogDisplay">
    Dialog content
</c-dialog>
```