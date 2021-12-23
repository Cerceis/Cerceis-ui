# Notification

## Description
A notification widget, that can be also act as toast/message/alert tool.

## Dependencies 
- [ CerceisUI ] Icon
- [ CerceisUI ] FloatPanel
- [ CerceisUI ] Container
- [ CerceisUI ] Button

## Tag
***c-notification***

## Usage
By default, the notification service is provided into vue on initialize. To use the notifications functions you will need to inject it into your component.
```
//Example written in composition api.

import { inject } from "vue";

setup(){
    const notification: any = inject("notificationService")
    notification.add({
        title: "A new notification",
        text:"Hello universe!",
        life: 3000,
    })
}   
```
## Notification functions
|Name|Params|Return|Description|
|---|---|---|---|
|add|notification: Notification|Notification| Add a new notification by passing in a **Notification**|
|clear|N/A|void| Clear all notifications|
|clearSingle|notification: Notification|void| Clear a single notification by passing in a **Notification**|


## Props
|Name|Type|Default|Description|
|---|---|---|---|
|**v-model**|boolean|false|Open/close the notification panel.|
|**icon**|string|""|Specifiy which icon to use for notification. (Usage same as **c-icon**). If no icon is provided, by default it will use a bell icon which available internally without adding files to "icons" folder.|
|**size**|string|IconSize|"sm"| Size of the icon.|
|**pos**|string|FloatPosition|"bottom"|Direction of where the panel should float.|

# Types / Interfaces
```
export interface Notification{
    id: string, //Unique id
    title: string, //Label
    datetime: string,
    life: number, //Life until notification dissapear, -1 to stay forever or until user close it.
    text: string, //
    pop: boolean, //Specifiy to pop-up automatically or not
}
```

