# Time Picker

## Description
Time picker. Available in format of "HH:mm" or "HH:mm:ss".

## Dependencies 
- [ CerceisUI ] Divider

## Tag
***c-time-picker***

## Props
|Name|Type|Default|Description|
|---|---|---|---|
|**v-model**|string|""|Depends on the option, it could accept/return string format of "HH:mm:ss" or "HH:mm".|
|**allowSeconds**|boolean|false|Allow seconds and change the output format into "HH:mm:ss".|

# Types / Interfaces
```
type SelectionField = "h" | "m" | "s"

interface DateValue{
    h: number,
    m: number,
    s: number
}
```