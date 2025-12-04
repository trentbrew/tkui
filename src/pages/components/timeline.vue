<script setup lang="ts">
  import type { PropDoc } from "../../components/ComponentDocs.vue";

  const sourceCode = `<template>
  <!-- Basic vertical timeline -->
  <ui-timeline v-model="activeStep">
    <ui-timeline-item v-for="item in items" :key="item.step" :step="item.step">
      <ui-timeline-header>
        <ui-timeline-indicator />
        <ui-timeline-separator />
      </ui-timeline-header>
      <ui-timeline-content>
        <ui-timeline-title>{{ item.title }}</ui-timeline-title>
        <ui-timeline-date>{{ item.date }}</ui-timeline-date>
        <p>{{ item.description }}</p>
      </ui-timeline-content>
    </ui-timeline-item>
  </ui-timeline>

  <!-- Horizontal timeline -->
  <ui-timeline orientation="horizontal">
    <ui-timeline-item v-for="item in items" :key="item.step" :step="item.step">
      <!-- ... -->
    </ui-timeline-item>
  </ui-timeline>
</template>

<script setup>
const activeStep = ref(2)
const items = [
  { step: 1, title: 'Order Placed', date: 'Jan 1', description: 'Your order was received' },
  { step: 2, title: 'Processing', date: 'Jan 2', description: 'Order is being prepared' },
  { step: 3, title: 'Shipped', date: 'Jan 3', description: 'Package is on the way' },
]
<\/script>`;

  const propsDocs: PropDoc[] = [
    {
      name: "modelValue",
      type: "number",
      default: "1",
      description: "The currently active step (supports v-model)",
    },
    {
      name: "orientation",
      type: "'horizontal' | 'vertical'",
      default: "'vertical'",
      description: "Layout direction of the timeline",
    },
    {
      name: "class",
      type: "string",
      description: "Additional classes for the timeline container",
    },
  ];

  const activeStep = ref(2);

  const timelineItems = [
    {
      step: 1,
      title: "Order Placed",
      date: "January 15, 2024",
      description: "Your order #12345 has been confirmed and is being processed.",
    },
    {
      step: 2,
      title: "Payment Confirmed",
      date: "January 15, 2024",
      description: "Payment of $299.00 has been successfully processed.",
    },
    {
      step: 3,
      title: "Shipped",
      date: "January 17, 2024",
      description: "Your package has been handed to the carrier for delivery.",
    },
    {
      step: 4,
      title: "Delivered",
      date: "Pending",
      description: "Estimated delivery: January 20-22, 2024",
    },
  ];
</script>

<template>
  <component-section
    id="timeline"
    title="Timeline"
    description="A vertical or horizontal timeline component for displaying chronological events or multi-step processes."
    :source-code="sourceCode"
    :props-docs="propsDocs"
  >
    <ui-timeline v-model="activeStep" class="max-w-md">
      <ui-timeline-item v-for="item in timelineItems" :key="item.step" :step="item.step">
        <ui-timeline-header>
          <ui-timeline-indicator />
          <ui-timeline-separator />
        </ui-timeline-header>
        <ui-timeline-content>
          <ui-timeline-title>{{ item.title }}</ui-timeline-title>
          <ui-timeline-date>{{ item.date }}</ui-timeline-date>
          <p class="text-muted-foreground mt-1 text-sm">{{ item.description }}</p>
        </ui-timeline-content>
      </ui-timeline-item>
    </ui-timeline>

    <template #live>
      <div class="flex flex-col gap-4">
        <p class="text-muted-foreground text-sm">Active step: {{ activeStep }}</p>
        <div class="flex gap-2">
          <ui-button size="sm" variant="outline" :disabled="activeStep <= 1" @click="activeStep--">
            Previous
          </ui-button>
          <ui-button size="sm" :disabled="activeStep >= timelineItems.length" @click="activeStep++">
            Next
          </ui-button>
        </div>
      </div>
    </template>
  </component-section>
</template>
