import type { UseFetchOptions } from "#app";

export default function(url: string, options: UseFetchOptions<string, any> = {}) {
    const config = useRuntimeConfig();
    return useFetch(config.public.apiUrl + '/api' + url, {
        method: 'get',
        credentials: 'include',
        headers: {
            "X-XSRF-TOKEN": useCookie('XSRF-TOKEN').value as string,
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        immediate: false,
        cache: 'default',
        watch: false,
        ...options,
    })
}