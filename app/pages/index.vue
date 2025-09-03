<template>
  <div>
    <v-container fluid class="pa-5">
      <v-row class="align-center justify-space-between">
        <v-col cols="12" md="6" class=" flex-column align-center">
          <h1 class="font-weight-bold mb-0">Dashboard</h1>
          <span class="text-subtitle-1 text-high-emphasis">Welcome to Helios HRIS</span>
        </v-col>

        <v-col cols="12" md="6" class="d-flex justify-end align-center text-medium-emphasis">
          <div class="d-flex flex-column align-end">
            <span class="font-weight-bold " style="font-size: 1.1rem;">
              {{ currentDate }}
            </span>
            <span class="font-weight-medium " style="font-size: 1.1rem;">
              {{ currentTime }}
            </span>
          </div>
        </v-col>
      </v-row>

      <v-divider class="my-4"></v-divider>
    </v-container>


    <div class="pa-5">
      <v-row>
        <v-col cols="3">
          <glassmorphism-card color="indigo-darken-2" class="rounded-lg pa-5 d-flex align-center" flat>
            <v-btn icon="mdi-account-group" rounded="lg" variant="tonal" color="indigo-lighten-4"></v-btn>
            <div class="ml-5">
              <h1>500</h1>
              <h3 class="font-weight-medium">Total Employees</h3>
            </div>
          </glassmorphism-card>
        </v-col>

        <v-col cols="3">
          <glassmorphism-card color="green-darken-2" class="rounded-lg pa-5 d-flex align-center" flat>
            <v-btn icon="mdi-account-plus" rounded="lg" variant="tonal" color="green-lighten-4"></v-btn>
            <div class="ml-5">
              <h1>35</h1>
              <h3 class="font-weight-medium">New Employees Per Month</h3>
            </div>
          </glassmorphism-card>
        </v-col>

        <v-col cols="3">
          <glassmorphism-card color="blue-darken-2" class="rounded-lg pa-5 d-flex align-center" flat>
            <v-btn icon="mdi-account-check" rounded="lg" variant="tonal" color="blue-lighten-4"></v-btn>
            <div class="ml-5">
              <h1>420</h1>
              <h3 class="font-weight-medium">Present Today</h3>
            </div>
          </glassmorphism-card>
        </v-col>

        <v-col cols="3">
          <glassmorphism-card color="orange-darken-2" class="rounded-lg pa-5 d-flex align-center" flat>
            <v-btn icon="mdi-account-clock" rounded="lg" variant="tonal" color="orange-lighten-4"></v-btn>
            <div class="ml-5">
              <h1>15</h1>
              <h3 class="font-weight-medium">On Leave</h3>
            </div>
          </glassmorphism-card>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8">
          <v-card class="rounded-lg pa-5 mb-5" flat>
            <div class="d-flex align-center mb-5">
              <h4 class="font-weight-medium">Attendance Per Month</h4>
              <v-spacer></v-spacer>
              <div class="w-25">
                <v-select :model-value="'Monthly'" density="comfortable" rounded="lg" variant="outlined" color="primary"
                  hide-details single-line></v-select>
              </div>
            </div>
            <charts-bar></charts-bar>
          </v-card>
          <attendance-cutoff-table class="mb-5"></attendance-cutoff-table>
          <birthday-celebrant-table></birthday-celebrant-table>
        </v-col>
        <v-col cols="4">
          <v-card class="rounded-lg pa-5 pt-0 mb-5" flat>
            <v-card-title class="text-subtitle-1 px-0 font-weight-bold d-flex align-center">
              Hired Employees (Monthly Trend)
              <v-spacer></v-spacer>
              <v-btn color="primary" rounded="lg" variant="text" icon="mdi-dots-horizontal"></v-btn>
            </v-card-title>
            <v-card flat color="primary" class="pa-8 rounded-lg">
              <v-sparkline :model-value="[5, 12, 38, 25, 130, 40, 50, 60]" auto-draw color="rgb(255,255,255)"
                height="50" padding="40" stroke-linecap="round" line-width="2" smooth></v-sparkline>
            </v-card>
          </v-card>
          <v-card class="rounded-lg pa-5 pt-3 mb-5" flat>
            <v-card-title class="text-subtitle-1 px-0 font-weight-bold d-flex align-center">
              Company Announcement
            </v-card-title>
            <announcement-card-dummy></announcement-card-dummy>
          </v-card>
        </v-col>
        <v-col></v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup lang="ts">
import GlassmorphismCard from '~/components/GlassmorphismCard.vue';
useHead({
  title: 'Dashboard'
})
const currentDate = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
});

const currentTime = ref(
  new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
);

let timer: number | undefined;

onMounted(() => {
  timer = window.setInterval(() => {
    currentTime.value = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
  }, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
definePageMeta({
  title: "dasboard",
  layout: 'authenticated',
  middleware: 'auth'
})
</script>
