<template>
    <div class="datePickerContainer">
        <div class="flex align-center justify-center gap-1 caption" style="margin-bottom:1em;">
            <span>Y</span>/
            <span>M</span>
            <template v-if="allowDay">
                /<span>D</span>
            </template>
        </div>
        <div class="flex align-center justify-center gap-1">
            <span>{{currentValue.y}}</span>/
            <span>{{
                String(currentValue.m).length === 1 ? `0${currentValue.m}` : currentValue.m
            }}</span>
            <template v-if="allowDay">
                /<span>{{
                    String(currentValue.d).length === 1 ? `0${currentValue.d}` : currentValue.d    
                }}</span>
            </template>
        </div>
        <div class="flex">
            <div class="f-1">
                <div class="flex align-center justify-center">{{currentValue.y}}</div>
                <c-divider />
                <div class="scrollContainer">
                    <div 
                        v-for="year in listOfyears" :key="year" 
                        :class="`flex justify-center text-h5 scrollItem ${
                            year === currentValue.y ? 'highlight': ''
                        }`"
                        @click="applySelection(year, 'y')"
                        :id="`y-${year}`"
                    >
                        {{year}}
                    </div>
                </div>
            </div>
            <div class="f-1">
                <div class="flex align-center justify-center">{{currentValue.m}}</div>
                <c-divider />
                <div class="scrollContainer">
                    <div 
                        v-for="month in listOfMonths" :key="month" 
                        :class="`flex justify-center text-h5 scrollItem ${
                            month === currentValue.m ? 'highlight': ''
                        }`"
                        @click="applySelection(month, 'm')"
                        :id="`m-${month}`"
                    >
                        {{month}}
                    </div>
                </div>
            </div>
            <template v-if="allowDay">
                <div class="f-1">
                    <div class="flex align-center justify-center">{{currentValue.d}}</div>
                    <c-divider />
                    <div class="scrollContainer">
                        <div 
                            v-for="day in listOfDays" :key="day" 
                            :class="`flex justify-center text-h5 scrollItem ${
                                day === currentValue.d ? 'highlight': ''
                            }`"
                            @click="applySelection(day, 'd')"
                            :id="`d-${day}`"
                        >
                            {{day}}
                        </div>
                    </div>
                </div>
            </template>
        </div>
    </div>
</template>
 
<script lang="ts">
import { defineComponent, ref, Ref, onMounted, computed, ComputedRef, nextTick, watch } from "vue";

type SelectionField = "y" | "m" | "d"
interface DateValue{
    y: number,
    m: number,
    d: number
}


export default defineComponent({
    props:{
        modelValue:{
			type: String,
			default: "",
		},
        minYear:{
            type: Number,
            default: 1970
        },
        maxYear:{
            type: Number,
            default: (new Date).getFullYear()
        },
        allowDay:{
            type: Boolean,
            default: true 
        }
    },
    setup(props, {emit}) {
        const currentDate: ComputedRef<Date> = computed((): Date=> {
            if(!props.modelValue) return new Date()
            const tmp: string[] = props.modelValue.split("-")
            if(tmp.length !== 2 && tmp.length !== 3) throw "Invalid date format (Must be YYYY-MM-DD or YYYY-MM)"
            return props.allowDay ? 
                new Date(Number(tmp[0]),Number(tmp[1])-1, Number(tmp[2])):
                new Date(Number(tmp[0]),Number(tmp[1])-1, 1)
        })
        //Specify pickable year range.
        //1970 until startYear + 50;
        const currentValue: Ref<DateValue> = ref({
            y: currentDate.value.getFullYear(),
            m: currentDate.value.getMonth()+1, //Month starts at 0
            d: currentDate.value.getDate()  
        })
        const listOfyears = (()=>{
            let startYear: number = props.minYear;
            const endYear: number = props.maxYear;
            const tmpList: number[] = [];
            for(;startYear<=endYear;startYear++)
                tmpList.push(startYear);
            return tmpList;
        })();
        const listOfMonths: number[] = [1,2,3,4,5,6,7,8,9,10,11,12]
        const listOfDays: ComputedRef<number[]> = computed((): number[]=>{
            let date = new Date(currentValue.value.y, currentValue.value.m-1, 1);
            let dateCount = 1;
            const days = [];
            while (date.getMonth() === currentValue.value.m-1) {
                days.push(dateCount);
                date.setDate(date.getDate() + 1);
                dateCount++
            }
            return days;
        })

        //Watch incomming input
        watch(
            ()=> props.modelValue,
            ()=>{
                currentValue.value = {
                    y: currentDate.value.getFullYear(),
                    m: currentDate.value.getMonth()+1, //Month starts at 0
                    d: currentDate.value.getDate()  
                }
            }
        )

        const callibrateDate = ():void =>{
            const tmpDate = new Date(
                currentValue.value.y,
                currentValue.value.m-1,
                currentValue.value.d
            )
            currentValue.value = {
                y: tmpDate.getFullYear(),
                m: tmpDate.getMonth()+1, //Month starts at 0
                d: tmpDate.getDate()  
            }
        }

        onMounted(()=>{
            nextTick(() => {
                const eleList = [
                    document.getElementById(`y-${currentValue.value.y}`),
                    document.getElementById(`m-${currentValue.value.m}`),
                    document.getElementById(`d-${currentValue.value.d}`)
                ]
                eleList.forEach(ele => {
                    ele?.scrollIntoView({
                        block: "start",
                        inline: "nearest"
                    })
                })
            });
        })


        const applySelection = (value: number, field: SelectionField): void =>{
            currentValue.value[field] = value;
            //Recallibrate the date if it's not correct
            callibrateDate()
            emit("update:modelValue", 
                props.allowDay ?
                    `${currentValue.value.y}-${
                        String(currentValue.value.m).length === 1 ? `0${currentValue.value.m}` : currentValue.value.m
                    }-${
                        String(currentValue.value.d).length === 1 ? `0${currentValue.value.d}` : currentValue.value.d
                    }`:
                    `${currentValue.value.y}-${
                        String(currentValue.value.m).length === 1 ? `0${currentValue.value.m}` : currentValue.value.m
                    }`
            )
        }

        return {
            currentValue,
            listOfyears, listOfMonths, listOfDays,
            applySelection,
            allowDay:props.allowDay
        }
    },
});

</script>
 
<style lang="scss" scoped>

.datePickerContainer{
    position:relative;
    padding: 1em;
    max-width: 300px;
    transition: all .2s;

    .scrollContainer{
        height: 100px;
        overflow-x: hidden;
        overflow-y: scroll;
        scrollbar-width: none; /* Firefox */
        -ms-overflow-style: none;  /* Internet Explorer 10+ */
        &::-webkit-scrollbar { /* WebKit */
            width: 0;
            height: 0;
        }

        .scrollItem {
            cursor: pointer;
            width: 100%;
            border-radius: 1em;
            &:hover{
                background-color: var(--activate);
            }
            &:active{
                filter: brightness(120%);
            }
        }

        .highlight{
            background-color: var(--primary);
        }
    }

}

</style>