<template>
    <span class="notificationWrapper">
        <span v-if="notificationList.length > 0" class="notificationLabel" :style="notificationStyle">
            {{notificationLabel}}
        </span>
        <!---This is the main content--->
        <c-float :pos="pos">
            <template v-slot:activator="{open}">
                <c-icon 
                    :class="activatorClass"
                    :size="size" 
                    :name="customIconAssetName" 
                    :setSrc="defaultIconAsset"
                    @click="open"
                ></c-icon>
            </template>
            <template v-slot:content v-if="notificationList.length > 0">
                <c-container class="notificationContentContainer">
                    <c-btn class="expand" @click="clear">全部消す</c-btn>
                    <div class="notificationPanel" v-for="notification in notificationList" :key="notification.id">
                        <c-divider />
                        <c-icon 
                            class="closeBtn" name="cancel-1" 
                            :setSrc="defaultCloseIconAsset" 
                            size="xs"
                            @click="clearSingle(notification, $event)"
                        ></c-icon>
                        <div class="caption my-1">{{notification.datetime}}</div>
                        <span>{{notification.title}}</span>
                        <div class="text-b2" style="opacity:.7;">
                            {{notification.text}}
                        </div>
                    </div>
                </c-container>
            </template>
        </c-float>
        <!---This is pop-up--->
         <c-float :pos="pos" forced>
            <template v-slot:content v-if="currentPopNotification">
                <c-container class="notificationPanel" :key="currentPopNotification.id">
                    <c-icon 
                        class="closeBtn" name="cancel-1" 
                        :setSrc="defaultCloseIconAsset" 
                        size="xs"
                        @click="clearSingle(currentPopNotification, $event)"
                    ></c-icon>
                    <div class="caption my-1">{{currentPopNotification.datetime}}</div>
                    <span>{{currentPopNotification.title}}</span>
                    <c-divider />
                    <div class="text-b2">
                        {{currentPopNotification.text}}
                    </div>
                </c-container>
            </template>
        </c-float>
    </span>
</template>
 
<script lang="ts">
import { defineComponent, computed, ComputedRef, ref, Ref, PropType } from "vue";
import { notificationList, currentPopNotification, clearSingle, clear } from "./NotificationService"
import { IconSize } from "../Icon/Icon.vue"
import { FloatPosition } from "../FloatPanel/FloatPanel.vue"

export default defineComponent({
    props:{
        modelValue:{
            type: Boolean,
            default: false
        },
        icon:{
            type: String,
            default: null
        },
        size:{
            type: String as PropType<IconSize>,
            default: "sm"
        },
        pos:{
            type: String as PropType<FloatPosition>,
            default: "bottom"
        }
    },
    setup(props){
        const defaultIconAsset: Ref<string | null> = ref(require("./defaultIcons/default.svg"));
        const defaultCloseIconAsset: Ref<string | null> = ref(require("./defaultIcons/close.svg"));
        const customIconAssetName: Ref<string> = ref("");
        const notificationLabel: ComputedRef<number> = computed(()=> notificationList.value.length)
        const activatorClass: ComputedRef<string> = computed(()=>{
            if(notificationList.value.length > 0) return "heartbeat"
            return ""
        })

        if(props.icon){
            defaultIconAsset.value = null;
            customIconAssetName.value = props.icon;
        }

        //Style
        const notificationStyle = computed(()=>{
            switch(props.size){
                case "xs":
                    return {
                        width: "25px",
                        height: "25px",
                        top: "-10px",
                        left: "-10px",
                        fontSize: ".475em !important"
                    };
                case "sm":
                    return {
                        width: "25px",
                        height: "25px",
                        top: "-10px",
                        left: "-10px",
                        fontSize: ".475em !important"
                    };
                case "md":
                    return {
                        width: "32px",
                        height: "32px",
                        top: "-5px",
                        left: "-5px",
                        fontSize: ".7em !important",
                        fontWeight: "bold"
                    };
                case "lg":
                    return {
                        width: "42px",
                        height: "42px",
                        top: "-5px",
                        left: "-5px",
                        fontSize: "1em !important",
                        fontWeight: "bold"
                    };
            }
		})

        return{
            notificationList,
            defaultIconAsset, defaultCloseIconAsset,
            customIconAssetName, 
            notificationLabel,
            notificationStyle,
            size: props.size,
            pos: props.pos,
            currentPopNotification,
            activatorClass,
            clearSingle,
            clear
        }
    },
});
</script>
 
<style lang="scss" scoped>
.notificationWrapper{
    position: relative;
    cursor: pointer;

    .notificationLabel{
        display:flex;
        justify-content: center;
        justify-items: center;
        align-content: center;
        align-items: center;
        left: 0;
        top: -10px;
        position: absolute;
        border-radius: 50%;
        background: var(--error);
        z-index: 2;
        color: var(--text);
    }

    .notificationPanel{
        position: relative;
        top:0;
        left:0;
        width: 200px;
        
        
        &:hover{
            background-color: var(--activate);
        }

        .closeBtn{
            position: absolute;
            right:0;
            top:0;

            &:active{
                filter: brightness(120%);
            }

        }
    }

    .notificationContentContainer{
        max-height: 600px;
        overflow-y:scroll;
    }
}

.heartbeat {
	-webkit-animation: heartbeat 1.5s ease-in-out infinite both;
	        animation: heartbeat 1.5s ease-in-out infinite both;
}
@-webkit-keyframes heartbeat {
  from {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: center center;
            transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  10% {
    -webkit-transform: scale(0.91);
            transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  17% {
    -webkit-transform: scale(0.98);
            transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  33% {
    -webkit-transform: scale(0.87);
            transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  45% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
}
@keyframes heartbeat {
  from {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: center center;
            transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  10% {
    -webkit-transform: scale(0.91);
            transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  17% {
    -webkit-transform: scale(0.98);
            transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  33% {
    -webkit-transform: scale(0.87);
            transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  45% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
}

</style>