<template>
    <v-menu>
        <template #activator="{ props }">
            <v-card v-bind="props" flat class="d-flex pa-2 rounded-lg align-center">
                <v-avatar class="mr-2">
                    <v-img src="~/assets/profile.png"></v-img>
                </v-avatar>
                <div>
                    <h5>Joshua Sotto</h5>
                    <h5 class="font-weight-regular">Admin</h5>
                </div>
                <v-icon class="ml-3">mdi-chevron-down</v-icon>
            </v-card>
        </template>
        <v-card class="rounded-lg pa-2">
            <v-list>
                <v-list-item class="rounded-lg pa-4" @click="" prepend-icon="mdi-account-outline">Profile</v-list-item>
                <v-list-item class="rounded-lg pa-4" @click="" prepend-icon="mdi-lock">Change Password</v-list-item>
                <v-list-item class="rounded-lg pa-4" @click="" prepend-icon="mdi-logout">Logout</v-list-item>
            </v-list>
        </v-card>
    </v-menu>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const feature = ref();
</script>

<style lang="scss" scoped></style>