<template>
  <v-card class="rounded-lg pa-5" flat>
    <v-card-title class="text-subtitle-1 mb-2 font-weight-medium">
      Attendance Cutoff (August 16 - August 31, 2025)
    </v-card-title>

    <v-card-text>
      <v-table>
        <thead>
          <tr>
            <th class="text-left">Employee</th>
            <th class="text-left">Total Days</th>
            <th class="text-left">Present</th>
            <th class="text-left">Absent</th>
            <th class="text-left">Late</th>
            <th class="text-left">Leave</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, index) in attendance" :key="index">
            <td>{{ row.employee }}</td>
            <td>{{ row.totalDays }}</td>
            <td>{{ row.present }}</td>
            <td>{{ row.absent }}</td>
            <td>{{ row.late }}</td>
            <td>{{ row.leave }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-card-text>
  </v-card>
</template>

<script setup>
const attendance = [
  { employee: "John Doe", totalDays: 10, present: 8, absent: 1, late: 1, leave: 0 },
  { employee: "Jane Smith", totalDays: 10, present: 9, absent: 0, late: 0, leave: 1 },
  { employee: "Michael Reyes", totalDays: 10, present: 7, absent: 2, late: 1, leave: 0 },
  { employee: "Sophia Cruz", totalDays: 10, present: 8, absent: 1, late: 0, leave: 1 },
  { employee: "David Tan", totalDays: 10, present: 10, absent: 0, late: 0, leave: 0 },
]
</script>
