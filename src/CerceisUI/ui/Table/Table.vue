<template>
    <div class="tableContainer" :style="localCssProps">
        <slot name="top" />
        <table>
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
						<slot :name="header.value" :item=item />
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

import { defineComponent, computed, Ref, ref, ComputedRef, watch, onMounted } from "vue";
import { Props } from "./Props";

export default defineComponent({
    props: Props,
    setup(props, { slots }) {
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
		const linkToNextSetOfData: Ref<string> = ref("");
		//Reset page value then user changes the display option
		watch(itemPerPageModel, () => {
			currentPage.value = 0;
		})
		const totalPages: ComputedRef<number> = computed((): number =>{
			if(itemPerPageModel.value === -1) return 1;
			return Math.ceil(totalItems.value/itemPerPageModel.value);
		})
		//Filter items accordign to page
		const displayItems: ComputedRef<any[]> = computed((): any[] =>{
			const tmpResult = items.value.filter((item: any) => {
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
			if(currentPage.value+1 < totalPages.value) currentPage.value++;
			else if(linkToNextSetOfData.value){
				await grabDataSet(linkToNextSetOfData.value)
				currentPage.value++
			}
		}
		const previousPage = (): void => {
			if(currentPage.value-1 >= 0) currentPage.value--;
		}

		const grabDataSet = async(url: string)=>{
			if(props.api.url){
				//When api is provided
				console.log("API mode initialized");
				loading.value = true;
				const apiResponse = await fetch(url);
				const apiResults = await apiResponse.json();
				//Check if all fields are presented
				const apiResultsKeys = Object.keys(apiResults);
				if(apiResultsKeys.length !== 4) throw "Invalid api response"
				if(!apiResultsKeys.includes(props.api.results)) throw "Invalid api response"
				if(!apiResultsKeys.includes(props.api.next)) throw "Invalid api response"
				if(!apiResultsKeys.includes(props.api.previous)) throw "Invalid api response"
				if(!apiResultsKeys.includes(props.api.count)) throw "Invalid api response"

				items.value = [...items.value, ...apiResults.results];
				
				linkToNextSetOfData.value = apiResults.next;
				loading.value = false;
			}
		}

		onMounted(async() =>{
			await grabDataSet(props.api.url)
		})
	
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
			loading
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