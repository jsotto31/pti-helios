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

export function useGreetings(): string {
  const hours = new Date().getHours();

  if (hours < 12) {
    return "Good morning";
  } else if (hours < 18) {
    return "Good afternoon";
  } else {
    return "Good evening";
  }
}

export function useThemeToggle() {
  const theme = useTheme()

  // Load saved theme from localStorage on init
  if (typeof window !== 'undefined') {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      theme.change(savedTheme) // ✅ new API
    }
  }

  function toggleTheme() {
    const isDark = theme.global.current.value.dark
    const newTheme = isDark ? 'light' : 'dark'

    theme.change(newTheme) // ✅ switch theme

    // Save theme to localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', newTheme)
    }
  }

  return { toggleTheme }
}
