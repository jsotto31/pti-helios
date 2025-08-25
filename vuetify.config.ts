

export default function vuetifyConfig() {
    return {
        vuetifyOptions: {
            theme: {
                defaultTheme: 'light',
                themes: {
                    light: {
                        colors: {
                            primary: '175.9 60.8% 19%', 
                            background: '#FDFCFD', 
                            surface: '#FFFFFF',
                            secondary: '#06B6D4',
                            success: '#10B981',
                            warning: '#F59E0B', 
                            error: '#EF4444', 
                            info: '#3B82F6', 
                            'on-background': '#1E1E1E',
                            'on-surface': '#1E1E1E',
                            border: '#E5E7EB', 
                            'navigation-bar': '#7C3AED', // Purple nav bar
                        },
                    },
                    dark: {
                        colors: {
                            primary: '#A78BFA', // Softer pastel purple
                            background: '#0F172A', // Deep slate navy
                            surface: '#1E293B', // Slightly lighter slate for surfaces
                            secondary: '#67E8F9', // Pastel cyan
                            success: '#34D399', // Pastel green
                            warning: '#FBBF24', // Pastel amber
                            error: '#F87171', // Pastel red
                            info: '#60A5FA', // Pastel blue
                            'on-background': '#F1F5F9', // Very light gray text
                            'on-surface': '#F1F5F9',
                            border: '#334155', // Soft dark border
                            'navigation-bar': '#1E293B', // Matches dark surface
                        },
                    },
                },
            },
        },
    }
}