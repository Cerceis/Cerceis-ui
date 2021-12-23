<template>
    <div class="timePickerContainer">
        <div class="flex justify-center align-center caption gap-1" style="margin-bottom:1em;">
            <span>H</span>:
            <span>m</span>
            <span v-if="allowSeconds">:</span>
            <span v-if="allowSeconds">s</span>
        </div>
        <div class="flex justify-center align-center gap-1">
            <span>
                {{String(currentValue.h).length === 1 ? `0${currentValue.h}` : currentValue.h}}
            </span>:
            <span>
                {{String(currentValue.m).length === 1 ? `0${currentValue.m}` : currentValue.m}}
            </span>
            <span v-if="allowSeconds">:</span>
            <span v-if="allowSeconds">
                {{
                    String(currentValue.s).length === 1 ? `0${currentValue.s}` : currentValue.s
                }}
            </span>
        </div>
        <div class="flex">
            <div class="f-1">
                <div class="flex align-center justify-center">{{currentValue.h}}</div>
                <c-divider />
                <div class="scrollContainer">
                    <div 
                        v-for="hour in listOfHours" :key="hour" 
                        :class="`flex justify-center text-h5 scrollItem ${
                            hour === currentValue.h ? 'highlight': ''
                        }`"
                        @click="applySelection(hour, 'h')"
                        :id="`hours-${hour}`"
                    >
                        {{hour}}
                    </div>
                </div>
            </div>
            <div class="f-1">
                <div class="flex align-center justify-center">{{currentValue.m}}</div>
                <c-divider />
                <div class="scrollContainer">
                    <div 
                        v-for="minute in oneToFiftyNine" :key="minute" 
                        :class="`flex justify-center text-h5 scrollItem ${
                            minute === currentValue.m ? 'highlight': ''
                        }`"
                        @click="applySelection(minute, 'm')"
                        :id="`minutes-${minute}`"
                    >
                        {{minute}}
                    </div>
                </div>
            </div>
            <div v-if="allowSeconds" class="f-1">
                <div class="flex align-center justify-center">{{currentValue.s}}</div>
                <c-divider />
                <div class="scrollContainer">
                    <div 
                        v-for="second in oneToFiftyNine" :key="second" 
                        :class="`flex justify-center text-h5 scrollItem ${
                            second === currentValue.s ? 'highlight': ''
                        }`"
                        @click="applySelection(second, 's')"
                        :id="`seconds-${second}`"
                    >
                        {{second}}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
 
<script lang="ts">
import { defineComponent, ref, Ref, onMounted, computed, ComputedRef, nextTick, watch } from "vue";

type SelectionField = "h" | "m" | "s"
interface DateValue{
    h: number,
    m: number,
    s: number
}


export default defineComponent({
    props:{
        modelValue:{
			type: String,
			default: "",
		},
        allowSeconds:{
            type: Boolean,
            default: false
        }
    },
    setup(props, {emit}) {
        const currentDate: ComputedRef<Date> = computed((): Date=> {
            if(!props.modelValue) return new Date()
            const tmp: string[] = props.modelValue.split(":")
            if(tmp.length !== 2 && tmp.length !== 3) throw "Invalid time format (Must be HH:mm or HH:mm:ss)"
            return props.allowSeconds ?
                new Date(0,0,0,Number(tmp[0]),Number(tmp[1]), Number(tmp[2])) :
                new Date(0,0,0,Number(tmp[0]),Number(tmp[1]))
        })
        const listOfHours: number[] = [
            0,1,2,3,4,5,6,7,8,9,10,
            11,12,13,14,15,16,17,18,19,20,
            21,22,23
        ]
        const oneToFiftyNine: number[] = [
            1,2,3,4,5,6,7,8,9,10,
            11,12,13,14,15,16,17,18,19,20,
            21,22,23,24,25,26,27,28,29,30,
            31,32,33,34,35,36,37,38,39,40,
            41,42,43,44,45,46,47,48,49,50,
            51,52,53,54,55,56,57,58,59
        ]
        const currentValue: Ref<DateValue> = ref({
            h: currentDate.value.getHours(),
            m: currentDate.value.getMinutes(),
            s: currentDate.value.getSeconds()
        })

        //Watch incomming input
        watch(
            ()=> props.modelValue,
            ()=>{
                currentValue.value = {
                    h: currentDate.value.getHours(),
                    m: currentDate.value.getMinutes(),
                    s: currentDate.value.getSeconds()
                }
            }
        )

        const callibrateTime = ():void =>{
            const tmpDate = new Date(
                0,0,0,
                currentValue.value.h,
                currentValue.value.m,
                currentValue.value.s
            )
            currentValue.value = {
                h: tmpDate.getHours(),
                m: tmpDate.getMinutes(),
                s: tmpDate.getSeconds()
            }
        }

        onMounted(()=>{
            nextTick(() => {
                const eleList = [
                    document.getElementById(`hours-${currentValue.value.h}`),
                    document.getElementById(`minutes-${currentValue.value.m}`),
                    document.getElementById(`seconds-${currentValue.value.s}`)
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
            callibrateTime()
            emit("update:modelValue", 
                props.allowSeconds ?
                    `${
                        String(currentValue.value.h).length === 1 ? `0${currentValue.value.h}` : currentValue.value.h
                    }:${
                        String(currentValue.value.m).length === 1 ? `0${currentValue.value.m}` : currentValue.value.m
                    }:${
                        String(currentValue.value.s).length === 1 ? `0${currentValue.value.s}` : currentValue.value.s
                    }` :
                    `${
                        String(currentValue.value.h).length === 1 ? `0${currentValue.value.h}` : currentValue.value.h
                    }:${
                        String(currentValue.value.m).length === 1 ? `0${currentValue.value.m}` : currentValue.value.m
                    }`
            )
        }


        return {
            allowSeconds: props.allowSeconds,
            currentValue,
            listOfHours, oneToFiftyNine,
            applySelection
        }
    },
});

</script>
 
<style lang="scss" scoped>

.timePickerContainer{
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