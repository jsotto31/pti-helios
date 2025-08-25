

export default function vuetifyConfig() {
    return {
        vuetifyOptions: {
            theme: {
                defaultTheme: 'light',
                themes: {
                    light: {
                        colors: {
                            primary: '#528BFF', // Atom One Light blue
                            background: '#FAFAFA', // Soft white background
                            surface: '#FFFFFF', // Card/modals pure white
                            secondary: '#E06C75', // Coral red accent
                            success: '#50A14F', // Green highlight
                            warning: '#C18401', // Golden brown
                            error: '#E45649', // Bright red
                            info: '#0184BC', // Teal blue
                            'on-background': '#383A42', // Dark gray text
                            'on-surface': '#383A42',
                            border: '#E5E7EB', // Subtle neutral border
                            'navigation-bar': '#528BFF', // Accent blue nav bar
                        },
                    },
                    dark: {
                        colors: {
                            primary: '#528BFF', // Atom One Dark blue
                            background: '#282C34', // Classic Atom dark background
                            surface: '#21252B', // Slightly darker surface
                            secondary: '#E06C75', // Coral red accent
                            success: '#98C379', // Muted green
                            warning: '#E5C07B', // Soft golden
                            error: '#E06C75', // Coral red
                            info: '#61AFEF', // Bright cyan-blue
                            'on-background': '#ABB2BF', // Soft gray text
                            'on-surface': '#ABB2BF',
                            border: '#3E4451', // Subtle border
                            'navigation-bar': '#21252B', // Matches dark surface
                        },
                    },
                }

            },
        },
    }
}