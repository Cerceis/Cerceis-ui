# Table / Datatable

## Description
Component that can be a generic table, or a DataTable when specifically defined by passing ***datatable*** prop. There's also **ApiMode** that automatically generates pagination and fetch next set of data when needed. For more info read **ApiMode**

## Dependencies 
- [CerceisUI] Button
- [CerceisUI] LoaderLinear
- [CerceisUI] Select

## Tag
***c-table***

## Props
|Name|Type|Default|Description|
|---|---|---|---|
|**datatable**|boolean|false|Toggle DataTable mode.|
|**color**|string|"primary"|Color of the table.|
|**items**|Object[]|[]|List of items to display. (Disabled in ApiMode)|
|**headers**|DataHeaders[]|[]|List of headers.|
|**search**|string|""|Filter the items. This work different when in ApiMode, instead of filtering in real-time, you will need to invoke **search** function available from **top**'s slot props.|
|**mobileBreakPoint**|number|350|Specify mobile break point in pixel to interchange between mobile layout.|
|**itemsPerPage**|ItemPerPage[]|<pre>[{<br>label:'10',value: 10},{label:'25',value: 25},{label:'50',value: 50}<br>]}</pre>|Set avaiable option for item per page in datatable mode.|
|itemPerPageDefault**|number|10|Set the default option for itemPerPage on load.|
|**api**|ApiOptions|null| Triggers api mode, for more info, read ***Api mode*** section.

## Slots
- top: Top of the table, usually where search bar is implemented.
    - ### SlotProps
        - search(): triggers search, this is only needed when ***Api mode*** is enabled.
- mobile: The layout of each row when the table when into mobile mode. (ex. A card layout. So that each row turns into a card in mobile mode).
    - ### SlotProps
        - item: The item object.
        - index: Index of the current row. (Starts from 0)
- [Your header value]: Every header value you defined is accessible. Therefore you can define the layout of each specific column.
    - ### SlotProp
        - item: The item object.
        - index: Index of the current row.
- actions: This column is available by default (Only visible when specified). Usually where actions/buttons/controls are displayed.
    - ### SlotProp
        - item: The item object.


# Types / Interfaces
```
export interface DataHeaders {
    label: string,
    value: SortState,
}

export type SortState = "non" | "asc" | "desc"

export interface ItemPerPage {
	label: string,
	value: number
}

export interface ApiOptions{
	url:string,
	next:string
	previous:string
	count:number,
	results:string
}

export interface ApiInfo{
	fixedUrl: string,
	baseUrl: string,
	count: number,
	nextUrl: string | null,
	previousUrl: string | null
}

export interface ApiParams{
	limit: number,
	offset: number,
	search: string
}
```

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








