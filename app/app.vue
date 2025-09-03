<template>
  <div>
    <NuxtLoadingIndicator color="linear-gradient(90deg, rgb(var(--v-theme-primary)) 0%, #9F67F6 50%, #4C1D95 100%)"></NuxtLoadingIndicator>
    <NuxtRouteAnnouncer />
  </div>
  <ClientOnly>
    <NuxtLayout>
      <NuxtPage></NuxtPage>
    </NuxtLayout>
    <template #fallback>
      <div class="h-screen w-screen d-flex justify-center align-center bg-background">
        <Loader></Loader>
      </div>
    </template>
  </ClientOnly>
  <NotificationContainer></NotificationContainer>
</template>
<script setup lang="ts">
import Loader from './components/globals/loader.vue';
import NotificationContainer from './components/notifications/NotificationContainer.vue';


useHead({
  titleTemplate(title) {
    return title ? `${title} | Solution` : 'Solution';
  },
})

useThemeToggle()
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');

* {
  font-family: "Geist", sans-serif;
  font-optical-sizing: auto;
  font-style: normal;
  font-variation-settings:
    "wdth" 100;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

</style>