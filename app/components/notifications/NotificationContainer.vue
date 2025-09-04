<template>
    <div class="notification-container">
        <TransitionGroup name="notification-slide-right">
            <NotificationListItem class="notification-list-item mb-3" v-for="notification, index in notifications" :notification="notification" :key="notification.id"></NotificationListItem>
        </TransitionGroup>
    </div>
</template>

<script setup lang="ts">
import NotificationListItem from './NotificationListItem.vue'
const {notifications} = storeToRefs(useNotificationStore())
</script>

<style scoped>
.notification-container{
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 400px;
    z-index: 9999;
}

.notification-slide-right-enter-active,
.notification-slide-right-leave-active {
  transition: all 0.35s;
}
.notification-slide-right-enter-from,
.notification-slide-right-leave-to {
  opacity: 0;
  transform: translateX(50px);
}

</style>