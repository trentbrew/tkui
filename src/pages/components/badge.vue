<script setup lang="ts">
import type { PropDoc } from '../../components/ComponentDocs.vue'

const badgeSourceCode = `<template>
  <ui-badge>Default</ui-badge>
  <ui-badge variant="secondary">Secondary</ui-badge>
  <ui-badge variant="destructive">Destructive</ui-badge>
  <ui-badge variant="outline">Outline</ui-badge>
  <ui-badge variant="success">Success</ui-badge>
  <ui-badge variant="warning">Warning</ui-badge>
  <ui-badge variant="info">Info</ui-badge>
  <ui-badge variant="error">Error</ui-badge>
  
  <!-- Sizes -->
  <ui-badge size="sm">Small</ui-badge>
  <ui-badge size="md">Medium</ui-badge>
  <ui-badge size="lg">Large</ui-badge>
</template>`

const badgeProps: PropDoc[] = [
  {
    name: 'variant',
    type: "'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info' | 'ghost' | 'error'",
    default: "'default'",
    description: 'The visual style variant of the badge'
  },
  {
    name: 'size',
    type: "'sm' | 'md' | 'lg'",
    default: "'sm'",
    description: 'The size of the badge'
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the badge is disabled'
  },
  {
    name: 'href',
    type: 'string',
    description: 'URL to navigate to (renders as anchor tag)'
  },
  {
    name: 'to',
    type: 'string | RouteLocationRaw',
    description: 'Router link destination (renders as router-link)'
  },
  {
    name: 'tag',
    type: 'string',
    description: 'The element to render the badge as'
  },
  {
    name: 'onClick',
    type: '() => void',
    description: 'Click handler function (renders as button when provided)'
  }
]
</script>

<template>
  <component-section id="badge" title="Badge" description="Displays a badge or a component that looks like a badge."
    :source-code="badgeSourceCode" :props-docs="badgeProps">
    <div class="flex flex-wrap gap-2">
      <ui-badge>Default</ui-badge>
      <ui-badge variant="secondary">Secondary</ui-badge>
      <ui-badge variant="destructive">Destructive</ui-badge>
      <ui-badge variant="outline">Outline</ui-badge>
      <ui-badge variant="success">Success</ui-badge>
      <ui-badge variant="warning">Warning</ui-badge>
      <ui-badge variant="info">Info</ui-badge>
      <ui-badge variant="error">Error</ui-badge>
    </div>
  </component-section>
</template>
