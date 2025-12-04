<template>
  <component-section
    id="line-chart"
    title="Line Chart"
    description="A line chart is used to display information as a series of data points connected by straight line segments."
  >
    <ui-card class="p-6">
      <ui-apex-chart
        :height="300"
        type="line"
        :series="lineChartData.series"
        :options="lineChartData.options"
      />
    </ui-card>
  </component-section>
</template>

<script setup lang="ts">
  const lineChartData = {
    series: [
      {
        name: "Sales",
        data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
      },
      {
        name: "Revenue",
        data: [23, 35, 30, 42, 39, 52, 65, 83, 110],
      },
    ],
    options: {
      chart: {
        type: "line" as const,
        toolbar: { show: true },
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      },
      legend: {
        show: true,
        position: "top" as const,
      },
      stroke: {
        width: 2,
      },
    },
  };
</script>
