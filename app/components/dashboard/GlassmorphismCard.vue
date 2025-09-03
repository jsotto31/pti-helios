<template>
  <v-card :color="color" class="custom-card">
    <!-- Decorative circles -->
    <div class="circle circle1"></div>
    <div class="circle circle2"></div>

    <!-- Slot for flexible content -->
    <slot />
  </v-card>
</template>

<script setup>
defineProps({
  color: {
    type: String,
    default: "primary" // fallback to primary if no color is passed
  }
})
</script>

<style scoped>
.custom-card {
  position: relative;
  overflow: hidden;
  padding: 20px;
  color: rgb(var(--v-theme-on-surface)); /* readable text */
}

/* Circle Base */
.circle {
  position: absolute;
  border-radius: 50%;
  background: rgb(var(--v-theme-on-surface)); /* contrast against card color */
  opacity: 0.08; /* subtle transparency */
  pointer-events: none;
}

/* Circle Variants */
.circle1 {
  top: 10px;
  right: 10px;
  width: 80px;
  height: 80px;
}

.circle2 {
  top: -20px;
  right: -20px;
  width: 120px;
  height: 120px;
}
</style>
