import type { User } from "~/types";


export const useOptionStore = defineStore("options", function(){
    const employees : Ref<User[]> = ref([]);

    async function fetchData(url: string, refVar: Ref<any[]>){
        if(refVar.value.length > 0) return;
        const items = await $apiFetch(url);
        refVar.value = items as any[];
    }

    async function fetchEmployees(){
        await fetchData("/employees", employees);
    }

    return {employees, fetchEmployees}
})