<script setup lang="ts">
import type { PropDoc } from '../../components/ComponentDocs.vue'

const cardSourceCode = `<template>
  <ui-card class="w-full max-w-md">
    <ui-card-header>
      <ui-card-title>Card Title</ui-card-title>
      <ui-card-description>Card description</ui-card-description>
    </ui-card-header>
    <ui-card-content>
      <p>Card content goes here.</p>
    </ui-card-content>
    <ui-card-footer class="flex gap-2">
      <ui-button variant="outline">Cancel</ui-button>
      <ui-button>Confirm</ui-button>
    </ui-card-footer>
  </ui-card>
</template>`

const cardProps: PropDoc[] = [
  {
    name: 'class',
    type: 'string',
    description: 'Additional CSS classes to apply to the card'
  }
]
</script>

<template>
  <component-section id="card" title="Card" description="Displays a card with header, content, and footer."
    :source-code="cardSourceCode" :props-docs="cardProps">
    <ui-card class="w-full max-w-md">
      <ui-card-header>
        <ui-card-title>Card Title</ui-card-title>
        <ui-card-description>Card description goes here</ui-card-description>
      </ui-card-header>
      <ui-card-content>
        <p>This is the card content area. You can put any content here.</p>
      </ui-card-content>
      <ui-card-footer class="flex gap-2">
        <ui-button variant="outline">Cancel</ui-button>
        <ui-button>Confirm</ui-button>
      </ui-card-footer>
    </ui-card>
  </component-section>
</template>
