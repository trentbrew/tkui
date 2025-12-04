<script setup lang="ts">
import type { PropDoc } from '../../components/ComponentDocs.vue'

const dividerSourceCode = `<template>
  <!-- Simple divider -->
  <ui-divider />
  
  <!-- Divider with label -->
  <ui-divider label="Or continue with" />
  
  <!-- Divider with custom label -->
  <ui-divider label="Section Break" />
</template>`

const dividerProps: PropDoc[] = [
  {
    name: 'label',
    type: 'string',
    description: 'Optional text label to display in the center of the divider'
  },
  {
    name: 'class',
    type: 'string',
    description: 'Additional CSS classes'
  }
]
</script>

<template>
  <component-section id="divider" title="Divider" description="A styled divider component."
    :source-code="dividerSourceCode" :props-docs="dividerProps">
    <div class="space-y-4">
      <ui-divider />
      <ui-divider label="Or continue with" />
    </div>
  </component-section>
</template>
