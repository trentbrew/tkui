<script setup lang="ts">
import type { PropDoc } from '../../components/ComponentDocs.vue'

const skeletonSourceCode = `<template>
  <!-- Card skeleton -->
  <div class="flex flex-col space-y-3">
    <ui-skeleton class="h-[125px] w-[250px] rounded-xl" />
    <div class="space-y-2">
      <ui-skeleton class="h-4 w-[250px]" />
      <ui-skeleton class="h-4 w-[200px]" />
    </div>
  </div>
  
  <!-- Different shapes -->
  <ui-skeleton class="h-12 w-12 rounded-full" />
  <ui-skeleton class="h-4 w-full" />
  <ui-skeleton class="h-20 w-20 rounded-md" />
</template>`

const skeletonProps: PropDoc[] = [
  {
    name: 'class',
    type: 'string',
    description: 'CSS classes to define size, shape, and styling'
  }
]
</script>

<template>
  <component-section id="skeleton" title="Skeleton" description="Use to show a placeholder while content is loading."
    :source-code="skeletonSourceCode" :props-docs="skeletonProps">
    <div class="flex flex-col space-y-3">
      <ui-skeleton class="h-[125px] w-[250px] rounded-xl" />
      <div class="space-y-2">
        <ui-skeleton class="h-4 w-[250px]" />
        <ui-skeleton class="h-4 w-[200px]" />
      </div>
    </div>
  </component-section>
</template>
