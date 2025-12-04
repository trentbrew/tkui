<template>
  <component-section
    id="area-chart"
    title="Area Chart"
    description="Area charts are used to represent quantitative data visually, showing the magnitude of change over time."
  >
    <ui-card class="p-6">
      <ui-apex-chart
        :height="300"
        type="area"
        :series="areaChartData.series"
        :options="areaChartData.options"
      />
    </ui-card>
  </component-section>
</template>

<script setup lang="ts">
  const areaChartData = {
    series: [
      {
        name: "Visitors",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
      {
        name: "Page Views",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
    ],
    options: {
      chart: {
        type: "area" as const,
        toolbar: { show: true },
      },
      xaxis: {
        categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      },
      legend: {
        show: true,
        position: "top" as const,
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.3,
        },
      },
    },
  };
</script>
