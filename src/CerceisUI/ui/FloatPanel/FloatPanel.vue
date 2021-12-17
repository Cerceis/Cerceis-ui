<template>
    <span class="floatContainer" ref="refContainer">
        <span class="activator">
            <slot name="activator" :open="activateFloatPanel"></slot>
        </span>
        <span
			ref="refContent"
            class="floatContent fade-in"
            :style="floatContentStyle"
        >
            <slot name="content" v-if="showContent"></slot>
        </span>
    </span>
</template>
 
<script lang="ts">
//FloatPanel = tooltips
import { defineComponent, Ref, ref, PropType, computed, ComputedRef, onBeforeUpdate } from "vue";

export interface FloatContentStyle {
    right?: ComputedRef<string>;
    left?: ComputedRef<string>;
    top?: ComputedRef<string>;
    marginTop?: string;
    marginBottom?: string;
    marginLeft?: string;
    marginRight?: string;
}
export type FloatPosition = "top" | "left" | "bottom" | "right";

export default defineComponent({
    props: {
        pos: {
            type: String as PropType<FloatPosition>,
            default: "bottom",
        },
        forced:{
            type: Boolean,
            default: false
        }
    },
    setup(props) {
        const floatContentStyle: Ref<FloatContentStyle> = ref({});
        const showContent: Ref<boolean> = props.forced ? ref(true) : ref(false);
		const refContainer: Ref<HTMLElement | undefined> = ref();
		const refContent: Ref<HTMLElement | undefined> = ref();
		const eventListenerAdded: Ref<boolean> = ref(false);
        const userActivated: Ref<boolean> = ref(false);
        let forcedClibrated: boolean = false;
        
        const activateFloatPanel = (e: any): void => {
            if(props.forced) return
            e.target.tabindex = "-1";
            e.target.focus();
            userActivated.value = true
            //Add blur event
			const onBlurEventFunc = (targetE: any) => {
				if(!refContainer.value?.contains(targetE.target)){
					deactivateFloatPanel(targetE.target);
					window.removeEventListener("click", onBlurEventFunc);
					eventListenerAdded.value = false;
                    userActivated.value = false;
				}
			}
			if(!eventListenerAdded.value){
				window.addEventListener( "click", onBlurEventFunc);
				eventListenerAdded.value = true;
			}
			showContent.value = true;
            calibratePosition()
        };

        //Bounding is still buggy for "top" , incomplete for "left", done in "right", "bottom"
        const calibratePosition = (): void =>{
            switch (props.pos) {
                case "top":
                    floatContentStyle.value.marginBottom = ".5em";
                    floatContentStyle.value.top = floatContentStyle.value.top = computed((): string=>{
						const bounds: any = refContent.value?.getBoundingClientRect()
						const offScreenValue: number = (bounds?.height - bounds?.y);
						if(offScreenValue > 0) return `-${bounds.y + offScreenValue}px`;
						return `-${bounds.height}px`;
					})
					floatContentStyle.value.left = computed((): string =>{
						const bounds: any = refContent.value?.getBoundingClientRect()
						const offScreenValue: number = (bounds?.x + bounds?.width) - window.innerWidth;
						//If the new position won't overflow the opposite direction
						if(bounds?.width + offScreenValue > window.innerWidth) return `-${bounds.x}px`;
						if(offScreenValue > 0) return `-${offScreenValue}px`;
 						return `0px`;
					}) 
                    break;
                case "left":
                    floatContentStyle.value.marginRight = ".5em";
					floatContentStyle.value.top = computed((): string=>{
						const bounds: any = refContent.value?.getBoundingClientRect()
						const offScreenValue: number = (bounds?.y + bounds?.height) - window.innerHeight;
						if(offScreenValue > 0) return `-${offScreenValue}px`;
						return `0px`;
					})
                    
                    floatContentStyle.value.left = computed((): string =>{
						const bounds: any = refContent.value?.getBoundingClientRect()
						const offScreenValue: number = (bounds?.width - bounds?.x);
						if(offScreenValue > 0) return `-${bounds.x}px`
						return `${-bounds.width}px`
					})
                    break;
                case "right":
                    floatContentStyle.value.marginLeft = ".5em";
					//Update position if is out of client window
					floatContentStyle.value.top = computed((): string=>{
						const bounds: any = refContent.value?.getBoundingClientRect()
						const offScreenValue: number = (bounds?.y + bounds?.height) - window.innerHeight;
						if(offScreenValue > 0) return `-${offScreenValue}px`;
						return `0px`;
					})
					floatContentStyle.value.left = computed((): string =>{
						const bounds: any = refContent.value?.getBoundingClientRect()
						const offScreenValue: number = (bounds?.x + bounds?.width) - window.innerWidth;
						//If the new position won't overflow the opposite direction
						if(bounds?.width + offScreenValue > window.innerWidth) return `-${bounds.x}px`;
						if(offScreenValue > 0) return `-${offScreenValue}px`;
 						return `${refContainer.value?.clientWidth}px`;
					}) 
                    break;
                case "bottom":
                    floatContentStyle.value.marginTop = ".5em";
					floatContentStyle.value.top = computed((): string=>{
						const bounds: any = refContent.value?.getBoundingClientRect()
						const offScreenValue: number = (bounds?.y + bounds?.height) - window.innerHeight;
						if(offScreenValue > 0) return `-${offScreenValue}px`;
						return `${refContainer.value?.clientHeight}px`;
					})
					floatContentStyle.value.left = computed((): string =>{
						const bounds: any = refContent.value?.getBoundingClientRect()
						const offScreenValue: number = (bounds?.x + bounds?.width) - window.innerWidth;
						if(bounds?.width + offScreenValue > window.innerWidth) return `-${bounds.x}px`;
						if(offScreenValue > 0) return `-${offScreenValue}px`;
 						return `${0}px`;
					}) 
                    break;
            }
        }

        const deactivateFloatPanel = (e: any): void => {
            showContent.value = false;
        };

        onBeforeUpdate(()=>{
            if(!forcedClibrated && props.forced){
                calibratePosition();
                forcedClibrated = true
            }else{
                calibratePosition();   
                if(userActivated.value)
                    showContent.value = true;
            }
        })
        
        return {
            activateFloatPanel,
            deactivateFloatPanel,
            showContent,
            floatContentStyle,
			refContainer, refContent
        };
    },
});
</script>
 
<style lang="scss" scoped>
.floatContainer {
    position: relative;
}
.floatContent {
    position: absolute;
    z-index: 500;
}
.fade-in {
    -webkit-animation: fade-in .2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
    animation: fade-in .2s cubic-bezier(0.39, 0.575, 0.565, 1) both;
}
@-webkit-keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
@keyframes fade-in {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>