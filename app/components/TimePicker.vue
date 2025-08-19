<template>
    <v-text-field color="primary" :model-value="displayTime" label="12:00 AM" single-line variant="outlined" density="compact"
        prepend-inner-icon="mdi-clock-time-four-outline" readonly>
        <v-menu v-model="showDialog" :close-on-content-click="false" activator="parent" min-width="0">
            <v-time-picker color="primary"  format="ampm" v-model="time"></v-time-picker>
        </v-menu>
    </v-text-field>
</template>

<script setup>
const showDialog = ref(false)
const time = defineModel()
const displayTime = computed(() => useFormatTo12Hour(time.value))
</script>
