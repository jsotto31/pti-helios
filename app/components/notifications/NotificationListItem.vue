<template>
    <v-alert class="rounded-0 bg-surface" elevation="5" variant="text" closable>
        <template #prepend>
            <v-icon :color="icon.color">{{ icon.icon }}</v-icon>
        </template>
        <h4 class="font-weight-medium">{{ notification.data.title }}</h4>
        <h5 class="font-weight-regular">{{ notification.data.text }}</h5>
    </v-alert>
</template>

<script setup lang="ts">
import type { NotificationType } from '~/stores/notification';
const props = defineProps<{notification: NotificationType}>()
const {notifications} = storeToRefs(useNotificationStore())
const icon = computed(() => {
    switch(props.notification.type){
        case 'success':
            return {icon: 'mdi-check-circle', color: 'success'}
        case 'error':
            return {icon: 'mdi-alert-circle', color: 'error'}
        case 'warning':
            return {icon: 'mdi-alert-circle', color: 'warning'}
        case 'info':
            return {icon: 'mdi-information', color: 'info'}
        default:
            return {icon: 'mdi-information', color: 'info'}
    }
})

let timer : NodeJS.Timeout | null = null;

timer = setTimeout(() => {
    notifications.value = notifications.value.filter(item => item.id != props.notification.id)

    if(timer){
        clearTimeout(timer)
    }
}, 4500);

</script>

<style scoped>

</style>