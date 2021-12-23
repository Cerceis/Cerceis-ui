<template>
    <div class="tableContainer" :style="localCssProps">
        <slot name="top" :search="searchHandle"/>
		<div v-if="mobileMode">
			<slot name="mobile"
				v-for="(item, itemIndex) in displayItems" :key=itemIndex 
				:item=item :index=itemIndex
			/>
		</div>
		<table v-else>
			<tr>
				<th v-for="(header, headerIndex) in headers" :key=headerIndex>
					<c-btn size="sm" @click="sortAs(header.value)" :color="localCssProps.mainColor">
					{{ header.label }}
					<span 
						v-if="isDataTable" 
						:class="
							sortState[header.value] === 'non' ? 'bar' :
							sortState[header.value] === 'asc' ? 'arrow-up' :
							sortState[header.value] === 'desc' ? 'arrow-down':
							'bar'
						"
					></span>
					</c-btn>
				</th>
				<th v-if="slotExist['actions']"></th>
			</tr>

			<tr v-for="(item, itemIndex) in displayItems" :key=itemIndex>
				<td v-for="(header, headerIndex) in headers" :key=headerIndex>
					<template v-if="slotExist[header.value]">
						<slot :name="header.value" :item=item :index="itemIndex+(currentPage*itemPerPageModel)" />
					</template>
					<template v-else>
						{{item[header.value]}}
					</template>
				</td>
				<td v-if="slotExist['actions']">
					<slot name="actions" :item=item />
				</td>
			</tr>
			<tr v-if="loading" class="loaderContainer"> 
				<td colspan="100%">
					<c-loader-linear style="width:100%" :color="localCssProps.mainColor" />
				</td>
			</tr>
		</table>
		<div v-if="isDataTable" class="footer">
			<c-select v-model="itemPerPageModel" :options="itemPerPage" style="width:75px;">	
			</c-select>
			<div class="pag">
				<c-btn size="ic" @click="previousPage">
					<c-icon size="xs" name="left-arrow-2"></c-icon>
				</c-btn>
				<span>
					{{currentPage+1}} / {{totalPages}}
				</span>
				<c-btn size="ic" @click="nextPage">
					<c-icon size="xs" name="right-arrow-2"></c-icon>
				</c-btn>
			</div>
		</div>
    </div>
</template>
 
<script lang="ts">

import { defineComponent, computed, Ref, ref, ComputedRef, watch, onMounted, onUnmounted } from "vue";
import { Props } from "./Props";
import { ApiParams, ApiInfo } from "./Types"

//During ApiMode, search does not work

export default defineComponent({
    props: Props,
    setup(props, { slots }) {
		//MobileMode
		const windowWidth = ref(window.screen.width);
		const mobileMode: ComputedRef<boolean> = computed(()=>{
			return windowWidth.value <= props.mobileBreakPoint ? true : false
		})
		const onWidthChange = (): void => {windowWidth.value = window.screen.width}
		onMounted(() => window.addEventListener('resize', onWidthChange))
  		onUnmounted(() => window.removeEventListener('resize', onWidthChange))
		//Check if slots exists
		let slotExist: any = {};
		Object.keys(slots).forEach(slot => {
			slotExist[slot] = true;
		})
        //Styles
        const localCssProps = computed(() => {
            return {
                "--mainColor": `var(--${props.color})`,
				"mainColor": props.color,
            };
        });
		//itemPerPage
		//Set a default pagination modelValue
		const loading: Ref<boolean> = ref(false);
		const itemPerPageModel: Ref<number> =  ref(props.itemPerPageDefault ?? props.itemPerPage[0].value);
		const totalItems: Ref<number> = ref(0);
		const currentPage: Ref<number> = ref(0);
		const items: Ref<any[]> = ref(props.items);
		//Reset page value then user changes the display option
		watch(itemPerPageModel, async() => {
			currentPage.value = 0;
			if(apiMode.value){
				items.value = [];
				loadedPage.value.clear();
				await processApi()
			}
		})
		const totalPages: ComputedRef<number> = computed((): number =>{
			if(itemPerPageModel.value === -1) return 1;
			if(apiMode.value) return Math.ceil(apiInfo.value.count/apiParams.value.limit)
			return Math.ceil(totalItems.value/itemPerPageModel.value);
		})
		//Filter items accordign to page
		const displayItems: ComputedRef<any[]> = computed((): any[] =>{	
			const tmpResult = apiMode.value	? 
			items.value :
			items.value.filter((item: any) => {
				//Any of the field.
				let returnValue = 0;
				for(let i in props.headers){
					if(String(item[props.headers[i].value]).toUpperCase().includes(props.search.toUpperCase()))
						returnValue ++;
				}
				return returnValue > 0
			})
			totalItems.value = tmpResult.length;
			if(itemPerPageModel.value === -1) return tmpResult;
			return tmpResult.filter((item: any, index: number) => {
				return index >= (currentPage.value * itemPerPageModel.value) && index < ((currentPage.value+1) * itemPerPageModel.value);
			})
		})
		//Page handlers
		const nextPage = async(): Promise<void> => {
			if(currentPage.value+1 < totalPages.value){
				currentPage.value++;
			}
			if(!loadedPage.value.has(currentPage.value) && apiMode.value){
				await processApi()
				loadedPage.value.add(currentPage.value);
			}
			
		}
		const previousPage = (): void => {
			if(currentPage.value-1 >= 0) currentPage.value--;
		}
		//API mode
		const loadedPage: Ref<Set<Number>> = ref(new Set()) 
		const apiMode: ComputedRef<boolean> = computed(()=> props.api && props.api.url ? true : false)
		const apiInfo: Ref<ApiInfo> = ref({
			baseUrl: "",
			fixedUrl: "",
			count:0,
			nextUrl:null,
			previousUrl:null
		})
		const apiParams: Ref<ApiParams> = ref({
			limit: 0,
			offset: 0,
			search: ""
		})
		onMounted(async() =>{
			if(apiMode.value){
				loadedPage.value.add(0);
				await processApi()
			}
				
		})
		const processApi = async (): Promise<void> => {
			calibrateApiInfo()
			await grabDataSet(props.api.url)
		}
		const searchHandle = async (): Promise<void> => {
			items.value = [];
			currentPage.value = 0;
			loadedPage.value.clear();
			await processApi()
		}
		const calibrateApiInfo = (): void => {
			apiParams.value.limit = itemPerPageModel.value;
			apiParams.value.offset = currentPage.value * itemPerPageModel.value;
			apiParams.value.search = props.search;
			apiInfo.value.baseUrl = props.api.url.split("?")[0]
			apiInfo.value.fixedUrl = 
			`${apiInfo.value.baseUrl}?offset=${apiParams.value.offset}&limit=${apiParams.value.limit}&search=${apiParams.value.search}`
		}
		const grabDataSet = async(url: string)=>{
			if(props.api.url){
				//When api is provided
				loading.value = true;
				const apiResponse = await fetch(apiInfo.value.fixedUrl);
				const apiResults = await apiResponse.json();
				apiInfo.value.nextUrl = apiResults[props.api.next];
				apiInfo.value.count = apiResults[props.api.count];
				items.value = [...items.value, ...apiResults[props.api.results]];
				loading.value = false;
			}
		}

		//Sorting
		const sortState: Ref<any> = ref({})
		props.headers!.forEach(header => {
			sortState.value[header.value] = "non"
		})
		const sortAs = (targetHeader: string) => {
			//Switch sorting status
			for(let header in sortState.value){
				if(header === targetHeader){
					switch(sortState.value[header]){
						case "non":
							sortState.value[header] = "asc"
							break
						case "asc":
							sortState.value[header] = "desc"
							break
						case "desc":
							sortState.value[header] = "non"
							break
					}
				}else{
					sortState.value[header] = "non"
				}
			}
			//Calculate sorting result for each header
			switch(sortState.value[targetHeader]){
				case "asc":
					items.value.sort((a: any, b: any): number => 
						a[targetHeader].localeCompare(b[targetHeader])
					)
					break
				case "desc":
					items.value.sort((a: any, b: any): number => 
						b[targetHeader].localeCompare(a[targetHeader])
					)
					break
			}
			
		}

        return {
            headers: props.headers,
            localCssProps, slotExist,
            isDataTable: props.datatable,
			sortAs, items, sortState,
			itemPerPage: props.itemPerPage,
			itemPerPageModel,
			displayItems,
			currentPage, totalPages,
			nextPage, previousPage,
			loading, mobileMode,
			searchHandle
        };
    },
});
</script>
<style lang="scss" scoped>
//Header
.tableContainer > table > tr > th {
    padding: 0.5em;
    color: white;
    background-color: var(--mainColor);
    text-align: start;
}
//Header border
.tableContainer > table > tr > th:first-child {
    border-radius: .4em 0 0 0;
}
.tableContainer > table > tr > th:last-child {
    border-radius: 0 .4em 0 0;
}
//Row border
.tableContainer > table > tr > td {
    padding: 0.5em;
    border-bottom: 1px solid #bbbbbb;
}
[data-theme="dark"].tableContainer > table > tr > td {
    padding: 0.5em;
    border-bottom: 1px solid #6b6b6b;
}
//Even/odd color variation
.tableContainer > table > tr:nth-child(2n + 3) > td {
    background: #c7c7c75d;
}
[data-theme="dark"] .tableContainer > table > tr:nth-child(2n + 3) > td {
    background: #5757575d;
}
//Hover
.tableContainer > table > tr:hover {
    background: #9e9e9e;
}

.tableContainer table {
    width: 100%;
    border-spacing: 0;
}

.tableContainer .footer{
	display:flex;
	padding: 0.5em;
	background-color: var(--mainColor);
	border-radius: 0 0 .4em .4em;
}
.footer{
	.pag{
		display:flex;
		align-items: center;
		gap:.5em;
	}
}

.arrow-up {
	position:absolute;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid white;
}
.bar {
	position:absolute;
    width: 10px;
    height: 0;
    border-bottom: 3px solid white;
}
.arrow-down {
	position:absolute;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-bottom: 5px solid white;
	transform:rotate(180deg);
}

.loaderContainer{
	td{
		padding: 0 !important;
		margin: 0 !important;
	}
}
</style>