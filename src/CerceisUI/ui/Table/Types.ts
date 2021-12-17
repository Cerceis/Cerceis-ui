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
