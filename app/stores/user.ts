

export type UserType = {
    id: number,
    email: string,
    name: string,
    type: 'employee' | 'admin',
    email_verification_at: string,
    created_at: string,
    updated_at: string,
}

export const useAuthStore = defineStore("user-store", () => {
    const user = ref<UserType|null>(null)
    const isAuthenticated = ref(false)
    const config = useRuntimeConfig()
    const apiUrl = config.public.apiUrl
    const loading = ref(false);

    async function setUser(){
        try {
            loading.value = true;
            const response = await $fetch(apiUrl + "/api/user", {
                credentials: 'include',
                headers: {
                    'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value as string
                },
                onResponse(event){
                    if(event.response.ok){
                        isAuthenticated.value = true;
                    }

                    loading.value = false;
                }
            });

            user.value = response as UserType
        } catch (error) {
            console.log("error: " + error)
        }
    }

    async function logout(){
        try {
            loading.value = true;
            await $fetch(apiUrl + "/logout", {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value as string
                },
                onResponse(){
                    window.location.reload()
                    loading.value = false;
                }
            });
        } catch (error) {
            console.log("error: " + error)
        }
    }

    return {user, isAuthenticated, setUser, logout, loading}
})