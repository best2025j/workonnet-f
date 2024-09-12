<script setup lang="ts">
import { LineChart } from 'vue-chart-3';
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

// Chart.
const chartData = {
      labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      datasets: [
        {
          label: '',
          data: [10, 30, 50, 18, 49, 38],
          backgroundColor: ['rgba(0, 174, 248, .2)'],
          borderColor: '#00AEF8',
          borderWidth: 2.5,
          fill: true,
          tension: 0.4,
          pointBorderColor: 'rgba(0, 173, 27, 0.2)',
          pointBorderWidth: 2,
          pointRadius: 8,
          indexAxis: 'x'
        },
      ],
};

const options =  {
        scales: {
            y: {
                beginAtZero: true,
                position: 'right',
                grid: {
                    lineWidth: 1,
                    color: '#DFE0EB'
                }

            },
            x: {
                grid: {
                    display: false
                }
            }
        },
        plugins: {
            tooltip: {
                backgroundColor: '#ffffff',
                titleColor: '#252733',
                bodyColor: '#252733'
            },
            legend: {
                 display: false
             }
        }
    }
</script>
<template>
 <!-- chart -->
        <div class="bg-white w-full px-6 py-6 border border-[#CDCDCD] rounded-[10px] space-y-[24px]">
          <!-- chart -->
          <div class="h-[26.7rem]">
                <LineChart :chartData="chartData" :options="options" class="h-full w-full" />
          </div>
        </div>
</template>