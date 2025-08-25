<template>
    <v-menu :close-on-content-click="false">
        <template #activator="{ props }">
            <v-card v-bind="props" density="comfortable" color="primary" variant="tonal" flat class="d-flex pa-2 px-4 rounded-pill align-center">
                <v-avatar class="mr-2">
                    <v-img src="~/assets/profile.png"></v-img>
                </v-avatar>
                <div>
                    <h5>Joshua Sotto</h5>
                    <h5 class="font-weight-regular">Admin</h5>
                </div>
                <v-icon class="ml-3">mdi-cog-outline</v-icon>
            </v-card>
        </template>
        <v-card class="rounded-lg pa-4" width="330" elevation="5" >
            <h4 ><strong class="font-weight-medium">Good Morning</strong>, <span class="font-weight-regular">Joshua Sotto</span></h4>
            <small>Admin</small>
            <v-text-field rounded="lg" variant="outlined" hide-details density="comfortable" prepend-inner-icon="mdi-magnify" color="primary" class="my-3" label="search" single-line></v-text-field>
            <v-card flat class="rounded-lg px-4 pr-6" style="background-color: rgba(var(--v-theme-primary), .4);">
                <div class="d-flex align-center">
                    <h5 class="font-weight-medium text-subtitle-2">Allow Notification</h5>
                    <v-spacer></v-spacer>
                    <div><v-switch class="mt-4" v-model="notification" color="primary" density="compact" hide-detials></v-switch></div>
                </div>
            </v-card>
            <v-divider class="mt-3"></v-divider>
            <v-list nav class="px-0">
                <v-list-item class="rounded-lg text-subtitle-2" @click="" prepend-icon="mdi-cog-outline">Profile</v-list-item>
                <v-list-item class="rounded-lg text-subtitle-2" @click="" prepend-icon="mdi-lock">Change Password</v-list-item>
                <v-list-item class="rounded-lg text-subtitle-2" @click="" prepend-icon="mdi-logout">Logout</v-list-item>
            </v-list>
        </v-card>
    </v-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const notification = ref(false)
const feature = ref();
</script>

<style lang="scss" scoped></style>