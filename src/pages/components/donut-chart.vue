<template>
  <component-section
    id="donut-chart"
    title="Donut Chart"
    description="A donut chart is a variant of a pie chart, with a blank center allowing for additional information."
  >
    <ui-card class="flex items-center justify-center p-6">
      <ui-apex-chart
        :height="350"
        :width="300"
        type="donut"
        :series="donutChartData.series"
        :options="donutChartData.options"
      />
    </ui-card>
  </component-section>
</template>

<script setup lang="ts">
  const donutChartData = {
    series: [44, 55, 13, 33],
    options: {
      chart: {
        type: "donut" as const,
      },
      labels: ["Desktop", "Mobile", "Tablet", "Other"],
      legend: {
        show: true,
        position: "bottom" as const,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "65%",
          },
        },
      },
    },
  };
</script>
