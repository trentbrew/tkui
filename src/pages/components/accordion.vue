<script setup lang="ts">
import type { PropDoc } from '../../components/ComponentDocs.vue'

const accordionSourceCode = `<template>
  <!-- Single accordion (only one item open at a time) -->
  <ui-accordion type="single" collapsible class="w-full max-w-md">
    <ui-accordion-item value="item-1">
      <ui-accordion-trigger>Is it accessible?</ui-accordion-trigger>
      <ui-accordion-content>
        Yes. It adheres to the WAI-ARIA design pattern.
      </ui-accordion-content>
    </ui-accordion-item>
    
    <ui-accordion-item value="item-2">
      <ui-accordion-trigger>Is it styled?</ui-accordion-trigger>
      <ui-accordion-content>
        Yes. It comes with default styles.
      </ui-accordion-content>
    </ui-accordion-item>
  </ui-accordion>
  
  <!-- Multiple accordion (multiple items can be open) -->
  <ui-accordion type="multiple" class="w-full max-w-md">
    <ui-accordion-item value="item-1">
      <ui-accordion-trigger>Question 1</ui-accordion-trigger>
      <ui-accordion-content>Answer 1</ui-accordion-content>
    </ui-accordion-item>
  </ui-accordion>
</template>`

const accordionProps: PropDoc[] = [
  {
    name: 'type',
    type: "'single' | 'multiple'",
    description: 'Whether single or multiple items can be open at once'
  },
  {
    name: 'collapsible',
    type: 'boolean',
    default: 'false',
    description: 'When type is "single", allows closing the open item'
  },
  {
    name: 'defaultValue',
    type: 'string | string[]',
    description: 'The value(s) of the item(s) to expand by default'
  },
  {
    name: 'modelValue',
    type: 'string | string[]',
    description: 'Controlled value (use with v-model)'
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the accordion is disabled'
  },
  {
    name: 'class',
    type: 'string',
    description: 'Additional CSS classes'
  }
]
</script>

<template>
  <component-section id="accordion" title="Accordion"
    description="A vertically stacked set of interactive headings that each reveal a section of content."
    :source-code="accordionSourceCode" :props-docs="accordionProps">
    <ui-accordion type="single" collapsible class="w-full max-w-md">
      <ui-accordion-item value="item-1">
        <ui-accordion-trigger>Is it accessible?</ui-accordion-trigger>
        <ui-accordion-content>
          Yes. It adheres to the WAI-ARIA design pattern.
        </ui-accordion-content>
      </ui-accordion-item>
      <ui-accordion-item value="item-2">
        <ui-accordion-trigger>Is it styled?</ui-accordion-trigger>
        <ui-accordion-content>
          Yes. It comes with default styles that matches the other components.
        </ui-accordion-content>
      </ui-accordion-item>
      <ui-accordion-item value="item-3">
        <ui-accordion-trigger>Is it animated?</ui-accordion-trigger>
        <ui-accordion-content>
          Yes. It's animated by default, but you can disable it.
        </ui-accordion-content>
      </ui-accordion-item>
    </ui-accordion>
  </component-section>
</template>
