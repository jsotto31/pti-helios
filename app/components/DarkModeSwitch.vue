<template>
    <v-switch color="primary" :model-value="theme.current.value.dark" @click="toggleTheme"
         inset hide-details class="mr-5" density="compact">
        <template #prepend>
            <v-icon v-if="theme.current.value.dark">mdi-weather-night</v-icon>
            <v-icon v-else>mdi-white-balance-sunny</v-icon>
        </template>
    </v-switch>

</template>

<script setup>
import { useTheme } from 'vuetify'
const theme = useTheme()
const {toggleTheme} = useThemeToggle()
</script>
