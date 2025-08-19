
export type NotificationType = {
    id: number,
    type: "success" | "error" | "warning" | "info",
    data: any,
    created_at?: string,
    updated_at?: string,
}

let id = 0;

export const useNotificationStore = defineStore("notification", () => {
    const notifications: Ref<NotificationType[]> = ref([])

    function addNotification(title: string, text: string, type: "success" | "error" | "warning" | "info"){
        id++;
        notifications.value.push({
            id, data: {title, text}, type
        })
    }

    return {notifications, addNotification}
})