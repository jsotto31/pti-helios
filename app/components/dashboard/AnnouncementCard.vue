<!-- components/AnnouncementCard.vue -->
<template>
  <v-card
    class="rounded-lg pa-4 mb-4"
    :color="color"
    variant="flat"
  >
    <v-card-title class="text-h6 font-weight-bold">
      <v-icon class="mr-2" size="20">mdi-bullhorn</v-icon>
      {{ title }}
    </v-card-title>

    <v-card-text class="text-body-2">
      {{ message }}
    </v-card-text>

    <v-card-actions>
      <v-btn v-if="actionText" variant="text" @click="$emit('action')">
        {{ actionText }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    default: "Announcement",
  },
  message: {
    type: String,
    default: "This is an important announcement.",
  },
  color: {
    type: String,
    default: "primary", // can be "primary", "error", "success", etc.
  },
  actionText: {
    type: String,
    default: "",
  },
})
</script>
