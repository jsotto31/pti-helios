<template>
    <v-app>
        <v-navigation-drawer width="310">
            <div class="pa-2 pb-4">
                <v-card @click="" class="border pa-4 rounded-lg d-flex align-center" flat>
                    <v-avatar size="30" class="rounded-0 mr-2">
                        <v-img src="~/assets/logo.png"></v-img>
                    </v-avatar>
                    <h3 class="title font-weight-bold mx-2" style="font-weight: 800;">Helios</h3>
                    <v-spacer></v-spacer>
                    <v-icon size="small">mdi-unfold-more-horizontal</v-icon>
                </v-card>
            </div>
            <v-divider></v-divider>
            <v-list class="pa-2">
                <template v-for="(item, i) in menuItems" :key="'menu-' + i">
                    <v-list-item v-if="item.type === 'item'" :key="'item-' + i" :title="item.title"
                        :prepend-icon="item.icon" :to="item.link" density="comfortable"
                        class="mb-1 rounded"></v-list-item>
                    <v-list-group v-else :key="'group-' + i">
                        <template v-slot:activator="{ props }">
                            <v-list-item v-bind="props" :title  ="item.title" :prepend-icon="item.icon"
                                density="comfortable" class="mb-1 rounded"></v-list-item>
                        </template>
                        <v-list-item v-for="(child, j) in item.children" :key="'child-' + i + '-' + j"
                            :title="child.title" :prepend-icon="child.icon"
                            v-bind="child.link == '/' ? {} : { to: child.link }" density="comfortable"
                            class="mb-1 rounded"></v-list-item>
                    </v-list-group>
                </template>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar class="border-b px-5" flat>
            <div class="w-33 px-5">
                <v-text-field color="primary" variant="outlined" single-line hide-details density="compact"
                    label="Search modules..."></v-text-field>
            </div>
            <v-spacer></v-spacer>
            <v-btn icon="mdi-information-outline" class="mr-2"></v-btn>
            <v-btn icon="mdi-bell" class="mr-2"></v-btn>
            <authenticated-layout-profile-dropdown></authenticated-layout-profile-dropdown>
        </v-app-bar>
        <v-main>
            <div class="py-5 px-5">
                <slot></slot>
            </div>
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
const { menuItems } = storeToRefs(useRouteStore()) 
</script>