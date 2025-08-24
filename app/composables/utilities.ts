import { onBeforeUnmount } from 'vue';


export function useEscape(routeName: string) {
    const router = useRouter();
    
    const handleKeydown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
            router.push({name: routeName})
        }
    };

    window.addEventListener("keydown", handleKeydown);

    onBeforeUnmount(() => {
        window.removeEventListener('keydown', handleKeydown);
    });
}

export function generateRandomKey(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
}
