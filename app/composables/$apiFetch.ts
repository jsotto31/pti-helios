
export default function $apiFetch(url: string, options: RequestInit = {}) {
    const config = useRuntimeConfig();
    return $fetch(config.public.apiUrl + '/api' + url, {
        method: "GET",
        credentials: 'include',
        headers: {
            "X-XSRF-TOKEN": useCookie('XSRF-TOKEN').value as string,
            "Accept": "application/json",
            ...(options.headers || {}),
        },
        ...options,
    });
}
