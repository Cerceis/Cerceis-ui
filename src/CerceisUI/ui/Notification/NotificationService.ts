import { Ref, ref, computed, ComputedRef } from "vue"
import { Notification } from "./Types"

export const GenerateObjectId = (): string => {
	const timestamp: string = (new Date().getTime() / 1000 | 0).toString(16);
	return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, () => {
		return (Math.random() * 16 | 0).toString(16);
	}).toLowerCase();
}

export const startTimer = (notification: Notification): void => {
    if(!timerStarted.value) timerStarted.value = true;
    if(notification.life === -1) return
    timerMap.value[notification.id] = setTimeout(() =>{
        delete timerMap.value[notification.id]
        popNotificationList.value.shift()
        if(currentPopNotification.value)
            startTimer(currentPopNotification.value)
        else 
            timerStarted.value = false
    }, notification.life)
}

export const clearSingle = (notification: Notification, e: any): void =>{
    if(e) e.stopPropagation();
    if(notification.pop){
        clearTimeout(timerMap.value[notification.id])
        if(popNotificationList.value.length === 0) timerStarted.value = false
    }
    else{
        const targetIndex: number = notificationList.value.findIndex((noti: Notification): boolean=> {
            return noti.id === notification.id
        });
        notificationList.value.splice(targetIndex, 1);
    }
}

export const timerMap: Ref<{
    [key: string]: number
}> = ref({});
export const timerStarted: Ref<boolean> = ref(false);
export const notificationList: Ref<Notification[]> = ref([]);
export const popNotificationList: Ref<Notification[]> = ref([]);
export const currentPopNotification: ComputedRef<Notification> = computed(()=> popNotificationList.value[0])

export const add = (notification: Notification): void =>{
    notification.id = GenerateObjectId();
    notification.datetime = (new Date).toLocaleString();
    if(notification.pop){
        popNotificationList.value.push(notification);
        if(!timerStarted.value)
            startTimer(currentPopNotification.value)
    }
    else{
        notificationList.value = [notification, ...notificationList.value];
    }
    
}

export const clear = (): void =>{
    notificationList.value = []
    popNotificationList.value = []
}