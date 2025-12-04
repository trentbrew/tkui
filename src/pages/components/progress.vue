<script setup lang="ts">
import type { PropDoc } from '../../components/ComponentDocs.vue'

const progressSourceCode = `<template>
  <!-- Different progress values -->
  <ui-progress :model-value="25" class="w-full" />
  <ui-progress :model-value="50" class="w-full" />
  <ui-progress :model-value="75" class="w-full" />
  <ui-progress :model-value="100" class="w-full" />
  
  <!-- With reactive value -->
  <ui-progress v-model="progressValue" class="w-full" />
</template>`

const progressProps: PropDoc[] = [
  {
    name: 'modelValue',
    type: 'number',
    description: 'The progress value (0-100)'
  },
  {
    name: 'max',
    type: 'number',
    default: '100',
    description: 'The maximum value'
  },
  {
    name: 'class',
    type: 'string',
    description: 'Additional CSS classes to apply'
  }
]
</script>

<template>
  <component-section id="progress" title="Progress"
    description="Displays an indicator showing the completion progress of a task." :source-code="progressSourceCode"
    :props-docs="progressProps">
    <div class="space-y-4">
      <ui-progress :model-value="25" class="w-full" />
      <ui-progress :model-value="50" class="w-full" />
      <ui-progress :model-value="75" class="w-full" />
    </div>
  </component-section>
</template>
