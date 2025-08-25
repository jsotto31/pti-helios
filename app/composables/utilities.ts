import { onBeforeUnmount } from 'vue';
import { useTheme } from 'vuetify'


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


export function useThemeToggle() {
  const theme = useTheme()

  // Load saved theme from localStorage on init
  if (process.client) {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      theme.global.name.value = savedTheme
    }
  }

  function toggleTheme() {
    theme.global.name.value =
      theme.global.current.value.dark ? 'light' : 'dark'

    // Save theme to localStorage
    if (process.client) {
      localStorage.setItem('theme', theme.global.name.value)
    }
  }

  return { toggleTheme }
}