<template>
    <v-app>
        <v-navigation-drawer :rail="rail" :expand-on-hover="rail" width="310" class="border-0">
            <v-layout>
                <v-app-bar flat>
                    <div :class="rail ? '' : 'pa-5 pl-2'">
                        <v-card @click=""
                            :class="rail ? 'rounded-lg pa-2 ml-2 d-flex align-center bg-transparent' : 'pa-4 rounded-lg d-flex align-center bg-transparent'"
                            flat>
                            <v-avatar size="30" class="rounded-0 mr-2">
                                <v-img :src="theme.current.value.dark ? '/atom_white.png' : '/atom.png'"></v-img>
                            </v-avatar>
                            <h3 class="title mx-2">Solution.</h3>
                            <v-spacer></v-spacer>
                        </v-card>
                    </div>
                </v-app-bar>
                <v-main class="scroll-hover h-screen">
                    <v-list class="pa-2">
                        <template v-for="(item, i) in menuItems" :key="'menu-' + i">
                            <v-list-item color="primary" v-if="item.type === 'item'" :key="'item-' + i"
                                :title="item.title" :prepend-icon="item.icon" :to="item.link" density="default"
                                :class="rail ? 'mb-2 rounded pa-2 rounded-lg' : 'mb-2 rounded pa-4 rounded-lg'"></v-list-item>
                            <v-list-group v-else :key="'group-' + i">
                                <template v-slot:activator="{ props }">
                                    <v-list-item color="primary" v-bind="props" :title="item.title"
                                        :prepend-icon="item.icon" density="default"
                                        :class="rail ? 'mb-1 rounded-lg pa-2' : 'mb-1 rounded-lg pa-4'"></v-list-item>
                                </template>
                                <v-list-item color="primary" v-for="(child, j) in item.children"
                                    :key="'child-' + i + '-' + j" :title="child.title" prepend-icon="mdi-file"
                                    v-bind="child.link == '/' ? {} : { to: child.link }" density="default"
                                    :class="rail ? 'mb-1 rounded-lg pa-2' : 'mb-1 rounded-lg pa-4'"></v-list-item>
                            </v-list-group>
                        </template>
                    </v-list>
                </v-main>
            </v-layout>
        </v-navigation-drawer>
        <v-app-bar class="d-flex px-3 pr-4" height="80" flat>
            <v-btn @click="rail = !rail" icon="mdi-menu" color="primary" rounded="lg" density="comfortable"
                variant="tonal"></v-btn>
            <div class="w-25 px-5">
                <v-text-field prepend-inner-icon="mdi-magnify" color="primary" density="comfortable" variant="outlined"
                    rounded="lg" single-line hide-details label="Search...">
                    <template #append-inner>
                        <v-btn variant="tonal" rounded icon="mdi-tune-vertical" density="comfortable" size="small"
                            color="primary"></v-btn>
                    </template>
                </v-text-field>
            </div>
            <v-spacer></v-spacer>
            <dark-mode-switch></dark-mode-switch>
            <v-btn variant="tonal" rounded="lg" color="primary" size="small" icon="mdi-information-outline"
                class="mr-3"></v-btn>
            <v-btn variant="tonal" rounded="lg" color="purple" size="small" icon="mdi-bell-outline"
                class="mr-8"></v-btn>
            <authenticated-layout-profile-dropdown></authenticated-layout-profile-dropdown>
        </v-app-bar>
        <v-main class="bg-surface">
            <v-container class="h-100 w-100 bg-surface pa-0 pr-3">
                <v-card class="h-100 w-100 pa-3 rounded-xl" style="background-color: rgba(0,0,0, .05);" flat>
                    <slot></slot>
                </v-card>
            </v-container>
            <v-footer height="60" class="bg-surface text-center d-flex flex-column justify-center">
                <span class="text-body-2">
                    © {{ new Date().getFullYear() }} <strong>Solution</strong>. All rights reserved.
                </span>
            </v-footer>

        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'
const theme = useTheme()
const { menuItems } = storeToRefs(useRouteStore())
const rail = ref(false)
</script>


<style>
.scroll-hover {
    overflow-y: auto;
    margin-right: 1px;
    scrollbar-width: 5px;
}

.scroll-hover::-webkit-scrollbar {
    width: 7px;
    background: transparent;
}

.scroll-hover::-webkit-scrollbar-thumb {
    background: transparent;
}

.scroll-hover:hover .scroll-hover::-webkit-scrollbar-thumb {
    background: transparent;
}

.scroll-hover:hover::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.264);
    border-radius: 4px;
}
</style>