<template>
    <div v-if="spinnerType === 'triple'" class="triple-spinner" :style="spinnerStyle"></div>
	<div v-if="spinnerType === 'default'" class="nb-spinner" :style="spinnerStyle"></div>
</template>
 
<script lang="ts">
import { defineComponent, PropType } from "vue";

type spinnerType = "triple" | "default"
type dimension = "xs" | "sm" | "md" | "lg";
interface AvartarDimension {
    xs: string;
    sm: string;
    md: string;
    lg: string;
}

export default defineComponent({
    props: {
        size: {
            type: String as PropType<dimension>,
            default: "md",
        },
		type:{
			type: String as PropType<spinnerType>,
			default: "default",
		}
    },
    setup(props) {
        const dimension: AvartarDimension = {
            xs: "16px",
            sm: "32px",
            md: "64px",
            lg: "128px",
        };
        const spinnerStyle = {
            width: dimension[props.size],
            height: dimension[props.size],
        };

        return {
            spinnerStyle,
			spinnerType: props.type
        };
    },
});
</script>
 
<style lang="scss" scoped>
//Type 1
.nb-spinner {
    width: 75pxx;
    height: 75px;
    margin: 0;
    background: transparent;
    border-top: 4px solid var(--primary);
    border-right: 4px solid transparent;
    border-radius: 50%;
    -webkit-animation: 1s spin linear infinite;
    animation: 1s spin linear infinite;
}
    
@-webkit-keyframes spin {
    from {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
          
@keyframes spin {
    from {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

//Type 2
.triple-spinner {
    display: block;
    position: relative;
    border-radius: 50%;
    border: 4px solid transparent;
    border-top: 4px solid var(--primary);
    border-right: 4px solid var(--primary);
    -webkit-animation: spin 2s linear infinite;
    animation: spin 2s linear infinite;
}

.triple-spinner::before,
.triple-spinner::after {
    content: "";
    position: absolute;
    border-radius: 50%;
    border: 4px solid transparent;
}
.triple-spinner::before {
    top: 5px;
    left: 5px;
    right: 5px;
    bottom: 5px;
    border-top-color: var(--secondary);
    border-right-color: var(--secondary);
    -webkit-animation: spin 3s linear infinite;
    animation: spin 3.5s linear infinite;
}
.triple-spinner::after {
    top: 15px;
    left: 15px;
    right: 15px;
    bottom: 15px;
    border-top-color: var(--accent);
    border-right-color: var(--accent);
    -webkit-animation: spin 1.5s linear infinite;
    animation: spin 1.75s linear infinite;
}

@-webkit-keyframes spin {
    from {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@keyframes spin {
    from {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    to {
        -webkit-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}
</style>