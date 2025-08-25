<template>
  <v-card class="rounded-lg pa-5" flat>
    <v-card-title class="text-subtitle-1 px-0 mb-2 font-weight-bold">
      🎂 Employee Birthday Celebrants
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="celebrants"
      class=""
      density="comfortable"
    >
      <template #item.avatar="{ item }">
        <v-avatar size="40">
          <v-img :src="item.avatar" alt="employee" />
        </v-avatar>
      </template>

      <template #item.date="{ item }">
        <v-chip color="pink" text-color="white" variant="flat">
          {{ new Date(item.date).toLocaleDateString("en-US", { month: "long", day: "numeric" }) }}
        </v-chip>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
const headers = [
  { title: "Avatar", key: "avatar", sortable: false },
  { title: "Employee Name", key: "name" },
  { title: "Position", key: "position" },
  { title: "Department", key: "department" },
  { title: "Birthday", key: "date" },
]

const celebrants = [
  {
    avatar: "https://randomuser.me/api/portraits/men/1.jpg",
    name: "John Doe",
    position: "Software Engineer",
    department: "IT",
    date: "2025-08-28",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/2.jpg",
    name: "Maria Santos",
    position: "HR Specialist",
    department: "Human Resources",
    date: "2025-09-01",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/3.jpg",
    name: "Carlos Reyes",
    position: "Accountant",
    department: "Finance",
    date: "2025-09-05",
  },
  {
    avatar: "https://randomuser.me/api/portraits/women/4.jpg",
    name: "Angela Cruz",
    position: "Marketing Officer",
    department: "Marketing",
    date: "2025-09-07",
  },
  {
    avatar: "https://randomuser.me/api/portraits/men/5.jpg",
    name: "David Lim",
    position: "Operations Manager",
    department: "Operations",
    date: "2025-09-10",
  },
]
</script>
