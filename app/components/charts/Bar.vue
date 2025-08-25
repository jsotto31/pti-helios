<template>
  <div>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { useTheme } from "vuetify";

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  components: {
    Bar,
  },
  setup() {
    const theme = useTheme();

    // Colors for light & dark modes
    const colors = {
      light: {
        present: "#2C3E91",
        absent: "#6C5CE7",
        late: "#008080",
        leave: "#34495E",
        text: "#444",
        grid: "#E0E0E0",
      },
      dark: {
        present: "#5C7AEA",
        absent: "#A29BFE",
        late: "#20B2AA",
        leave: "#95A5A6",
        text: "#E0E0E0",
        grid: "#555",
      },
    };

    // Reactive theme getter
    const getColors = () => (theme.current.value.dark ? colors.dark : colors.light);

    const labels = ["April", "May", "June", "July", "August", "September", "October", "November"];

    const chartData = {
      labels,
      datasets: [
        {
          label: "Present",
          data: [120, 110, 125, 115, 130, 140, 135, 145],
          backgroundColor: getColors().present,
          borderRadius: 0,
          barThickness: 60,
        },
        {
          label: "Absent",
          data: [10, 15, 8, 12, 6, 9, 7, 11],
          backgroundColor: getColors().absent,
          borderRadius: 0,
          barThickness: 60,
        },
        {
          label: "Late",
          data: [5, 7, 6, 4, 10, 8, 6, 9],
          backgroundColor: getColors().late,
          borderRadius: 0,
          barThickness: 60,
        },
        {
          label: "Leave",
          data: [3, 2, 4, 6, 5, 3, 4, 6],
          backgroundColor: getColors().leave,
          borderRadius: 0,
          barThickness: 60,
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: "bottom",
          labels: {
            color: getColors().text,
            font: {
              size: 13,
            },
          },
        },
      },
      scales: {
        x: {
          stacked: true,
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 12,
            },
            color: getColors().text,
          },
          barPercentage: 0.6,
          categoryPercentage: 0.5,
        },
        y: {
          stacked: true,
          beginAtZero: true,
          ticks: {
            stepSize: 50,
            color: getColors().text,
          },
          grid: {
            color: getColors().grid,
          },
        },
      },
    };

    return { chartData, chartOptions };
  },
};
</script>

<style scoped>
div {
  height: 400px; /* control chart height */
}
</style>
