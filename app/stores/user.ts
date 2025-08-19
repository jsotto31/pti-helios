

export type UserType = {
    id: number,
    email: string,
    name: string,
    email_verification_at: string,
    created_at: string,
    updated_at: string,
}

export const useAuthStore = defineStore("user-store", () => {
    const user = ref<UserType|null>(null)
    const isAuthenticated = ref(false)
    const config = useRuntimeConfig()
    const apiUrl = config.public.apiUrl

    async function setUser(){
        try {
            const response = await $fetch(apiUrl + "/api/user", {
                credentials: 'include',
                headers: {
                    'X-XSRF-TOKEN': useCookie('XSRF-TOKEN').value as string
                },
                onResponse(event){
                    if(event.response.ok){
                        isAuthenticated.value = true;
                    }
                }
            });

            user.value = response as UserType
        } catch (error) {
            console.log("error: " + error)
        }
    }

    return {user, isAuthenticated, setUser}
})