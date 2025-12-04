<template>
  <component-section
    id="bar-chart"
    title="Bar Chart"
    description="A bar chart presents categorical data with rectangular bars with heights or lengths proportional to the values."
  >
    <ui-card class="p-6">
      <ui-apex-chart
        :height="300"
        type="bar"
        :series="barChartData.series"
        :options="barChartData.options"
      />
    </ui-card>
  </component-section>
</template>

<script setup lang="ts">
  const barChartData = {
    series: [
      {
        name: "Products Sold",
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
    ],
    options: {
      chart: {
        type: "bar" as const,
        toolbar: { show: true },
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
        },
      },
      xaxis: {
        categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
      },
    },
  };
</script>
