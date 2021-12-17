# Chip Group

## Description
A component that display a list of chips, which can be configured to show max amount of chip. It is best on where the length of chip is dynamic and has unknown or undefined maximum length.

## Dependencies 
- [ CerceisUI ] FloatPanel

## Props
- **items**: string[]: default = []: Array of strings.
- **max**: number: default = 3: Max numbers of chip display.

## Types / Interfaces
- **FilteredItems** [Interface]: The data structure after filtering max numbers of element. Consist of 2 list, displayList as list of element to display, remainingList as list of element to hide and show when needed.

## Slots
- chip: Slot that lets you style your chip.
    - ### SlotProps
        - label: string: Label of the chip.
        - remain: number: Number of hidden element.
        - remainList: string[]: List of remaining label that is hidden.

## Examples
```
<c-chip-group :items="['Apple', 'Orange', 'Melon', 'Banana', 'Lemon']">
    <template v-slot:chip="{label, remain, open}">
        <c-btn v-if="label" chip size="sm">
            {{label}}
        </c-btn>
        <c-btn v-else flat size="sm" @click="open">
            {{`他+${remain}`}}
        </c-btn>
    </template>
    <template v-slot:remainContent="{remainList}">
        <c-container>
            <div v-for="label in remainList" :key=label>
                {{label}}
                <c-divider />
            </div>
        </c-container>
    </template>
</c-chip-group>
```
\* Example shown in dark mode  
![](../../DocumentationAsset/images/ChipGroup-i01.png)