import { onBeforeUnmount } from 'vue';


export default function(routeName: string) {
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
