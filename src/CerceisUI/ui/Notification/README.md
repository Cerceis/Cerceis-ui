# Notification

## Description
A notification widget, that can be also act as toast/message/alert tool.

## Dependencies 
- [ CerceisUI ] Icon
- [ CerceisUI ] FloatPanel
- [ CerceisUI ] Container

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
//dialogDisplay: Ref<boolean>

<c-btn @click="dialogDisplay=!dialogDisplay">
    OPEN
</c-btn>
<c-dialog v-model="dialogDisplay">
    Dialog content
</c-dialog>
```