

export default defineNuxtRouteMiddleware((to, from) => {
    if(import.meta.server) return;

    const {isAuthenticated} = storeToRefs(useAuthStore());
    if (isAuthenticated.value) {
      return navigateTo('/')
    }
  })