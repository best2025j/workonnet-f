<script setup lang="ts">
import { LineChart } from "vue-chart-3";
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

// Chart.
const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'April', 'May', 'Jun', 'Jul', 'Aug',  'Sept', 'Oct', 'Nov', 'Dec'],
    datasets: [
        {
            label: '',
            data: [35, 59, 80, 81, 56, 55, 30, 30, 12, 30, 19, 20],
            borderColor: 'rgba(206, 90, 235, 1)',
            borderWidth: 4.5,
            tension: 0.4,
            pointRadius: 8,
            pointBorderWidth: 2,
            fill: true,
            pointBorderColor: 'rgba(206, 90, 235, 1)',
            // backgroundColor: ['rgba(0, 174, 248, .2)'],
        }
    ],
};

const options = {
    scales: {
        x: {
            grid: {
                lineWidth: 0,
                color: "rgba(59, 56, 56, 1)",
                display: false
            },
            border: {
                dash: [8, 10],
                dashOffset: 4,
                color: "rgba(59, 56, 56, 1)",
                display: true,
            },
            ticks: {
                color: "rgba(133, 131, 131, 1)",
            },
        },
        y: {
            beginAtZero: true,
            title: {
                display: true,
                text: 'Money ($)',
                color: 'rgba(84, 81, 81, 1)',
                font: {
                    size: 10
                }
            },
            grid: {
                display: false,
            },
            position: 'left',
            ticks: {
                color: "rgba(206, 205, 205, 1)",
            },
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
    <div class="w-full whitespace-nowrap overflow-auto scrollbar-hide">
        <!-- chart -->
        <div class="h-[25rem] sm:w-full w-[100vw]">
            <LineChart :chartData="chartData" :options="options" class="h-full w-full" />
        </div>
    </div>
</template>