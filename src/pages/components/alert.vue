<script setup lang="ts">
import type { PropDoc } from '../../components/ComponentDocs.vue'

const alertSourceCode = `<template>
  <!-- Default Alert -->
  <ui-alert>
    <div class="flex items-center gap-2">
      <ui-icon name="lucide:info" />
      <ui-alert-title>Info</ui-alert-title>
    </div>
    <ui-alert-description>
      This is an informational alert.
    </ui-alert-description>
  </ui-alert>
  
  <!-- Destructive Alert -->
  <ui-alert variant="destructive">
    <div class="flex items-center gap-2">
      <ui-icon name="lucide:alert-triangle" />
      <ui-alert-title>Error</ui-alert-title>
    </div>
    <ui-alert-description>
      This is an error alert.
    </ui-alert-description>
  </ui-alert>
</template>`

const alertProps: PropDoc[] = [
  {
    name: 'variant',
    type: "'default' | 'destructive'",
    default: "'default'",
    description: 'The visual style variant of the alert'
  },
  {
    name: 'class',
    type: 'string',
    description: 'Additional CSS classes to apply'
  }
]
</script>

<template>
  <component-section id="alert" title="Alert" description="Displays a callout for user attention."
    :source-code="alertSourceCode" :props-docs="alertProps">
    <div class="space-y-4">
      <ui-alert>
        <div class="flex items-center gap-2">
          <ui-icon name="lucide:info" />
          <ui-alert-title>Default Alert</ui-alert-title>
        </div>
        <ui-alert-description>This is a default alert message.</ui-alert-description>
      </ui-alert>
      <ui-alert variant="destructive">
        <div class="flex items-center gap-2">
          <ui-icon name="lucide:alert-triangle" />
          <ui-alert-title>Destructive Alert</ui-alert-title>
        </div>
        <ui-alert-description>This is a destructive alert message.</ui-alert-description>
      </ui-alert>
    </div>
  </component-section>
</template>
