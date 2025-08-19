export default defineNuxtPlugin(async (nuxtApp) => {
    if(import.meta.client){
        const $user = useAuthStore();
        const $route = useRouteStore();
        await $user.setUser()
    }
})