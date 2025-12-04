<script setup lang="ts">
  import type { PropDoc } from "../../components/ComponentDocs.vue";

  const sliderValue = ref([50]);

  const sliderSourceCode = `<script setup>
const value = ref([50])
<\/script>

<template>
  <!-- Basic slider -->
  <ui-slider v-model="value" :max="100" :step="1" class="w-full" />

  <!-- With min and max -->
  <ui-slider v-model="value" :min="0" :max="100" :step="5" />

  <!-- Range slider (multiple values) -->
  <ui-slider v-model="rangeValue" :max="100" :step="1" />

  <!-- Disabled -->
  <ui-slider :model-value="[30]" :disabled="true" />
</template>`;

  const sliderProps: PropDoc[] = [
    {
      name: "modelValue",
      type: "number[]",
      description: "The controlled value of the slider (use with v-model)",
    },
    {
      name: "defaultValue",
      type: "number[]",
      description: "The default value (uncontrolled)",
    },
    {
      name: "min",
      type: "number",
      default: "0",
      description: "The minimum value",
    },
    {
      name: "max",
      type: "number",
      default: "100",
      description: "The maximum value",
    },
    {
      name: "step",
      type: "number",
      default: "1",
      description: "The step increment",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether the slider is disabled",
    },
    {
      name: "orientation",
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: "The orientation of the slider",
    },
    {
      name: "class",
      type: "string",
      description: "Additional CSS classes",
    },
  ];
</script>

<template>
  <component-section
    id="slider"
    title="Slider"
    description="An input where the user selects a value from within a given range."
    :source-code="sliderSourceCode"
    :props-docs="sliderProps"
  >
    <div class="space-y-4">
      <ui-slider v-model="sliderValue" :max="100" :step="1" class="w-full" />
      <p class="text-muted-foreground text-sm">Value: {{ sliderValue }}</p>
    </div>
  </component-section>
</template>
