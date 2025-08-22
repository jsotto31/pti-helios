// C:\Users\rysch\pti-helios-1\vuetify.config.ts

export default function vuetifyConfig() {
    return {
        vuetifyOptions: {
            theme: {
                defaultTheme: 'light',
                themes: {
                    light: {
                        colors: {
                            primary: '#010101ff',       // Vivid indigo, elegant & futuristic
                            secondary: '#06B6D4',     // Bright cyan accent
                            background: '#F9FAFB',    // Clean very light gray
                            surface: '#FFFFFF',        // Pure white for cards/dialogs
                            success: '#22C55E',       // Vivid green for success
                            warning: '#F59E0B',       // Bright amber
                            error: '#EF4444',         // Coral red
                            info: '#3B82F6',          // Vivid blue
                            'on-background': '#111827', // Dark text
                            'on-surface': '#111827',
                            border: '#E5E7EB',        // Neutral border
                            'navigation-bar': '#4F46E5', // Primary for nav
                        },
                        variables: {
                            'body-font-family': 'Inter, sans-serif',
                            'border-radius-root': '8px',
                            'button-height': '44px',
                            'button-border-radius': '12px',
                            'button-font-weight': '500',
                            'button-text-transform': 'none',
                            'card-border-radius': '16px',
                            'card-elevation': '4',
                            'card-text-padding': '24px',
                            'dialog-border-radius': '16px',
                            'dialog-elevation': '24px',
                            'field-border-radius': '12px',
                            'input-density-comfortable': 0,
                            'table-border-radius': '12px',
                            'table-density-comfortable': 0,
                            'alert-border-radius': '12px',
                            'alert-density-comfortable': 0,
                            'snackbar-border-radius': '12px',
                            'snackbar-elevation': 6,
                            'menu-content-border-radius': '12px',
                            'menu-elevation': 4,
                            'tooltip-background-color': '#111827',
                            'tooltip-border-radius': '6px',
                        },
                    },
                    dark: {
                        colors: {
                            primary: '#010101ff',       // Softer vivid indigo
                            secondary: '#22D3EE',     // Bright cyan accent
                            background: '#0F172A',    // Deep minimal navy
                            surface: '#1E293B',       // Slightly lighter surface
                            success: '#4ADE80',       // Vivid green
                            warning: '#FACC15',       // Bright amber
                            error: '#F87171',         // Coral red
                            info: '#60A5FA',          // Vivid blue
                            'on-background': '#F9FAFB', // Light text
                            'on-surface': '#F9FAFB',
                            border: '#334155',         // Subtle dark border
                            'navigation-bar': '#1E293B', // Matches surface
                        },
                        variables: {
                            'border-radius-root': '8px',
                            'button-height': '44px',
                            'button-border-radius': '12px',
                            'button-font-weight': '500',
                            'button-text-transform': 'none',
                            'card-border-radius': '16px',
                            'card-elevation': '4',
                            'card-text-padding': '24px',
                            'dialog-border-radius': '16px',
                            'dialog-elevation': '24px',
                            'field-border-radius': '12px',
                            'input-density-comfortable': 0,
                            'table-border-radius': '12px',
                            'table-density-comfortable': 0,
                            'alert-border-radius': '12px',
                            'alert-density-comfortable': 0,
                            'snackbar-border-radius': '12px',
                            'snackbar-elevation': 6,
                            'menu-content-border-radius': '12px',
                            'menu-elevation': 4,
                            'tooltip-background-color': '#1E293B',
                            'tooltip-border-radius': '6px',
                        },
                    },
                },
            },
        },
    }
}
