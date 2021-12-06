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
	count:string,
	results:string
}
