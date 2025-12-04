<script setup lang="ts">
import type { PropDoc } from '../../components/ComponentDocs.vue'

const tooltipSourceCode = `<template>
  <ui-tooltip>
    <ui-tooltip-trigger as-child>
      <ui-button variant="outline">Hover me</ui-button>
    </ui-tooltip-trigger>
    <ui-tooltip-content>
      <p>This is a tooltip</p>
    </ui-tooltip-content>
  </ui-tooltip>
  
  <!-- With different sides -->
  <ui-tooltip>
    <ui-tooltip-trigger as-child>
      <ui-button>Top</ui-button>
    </ui-tooltip-trigger>
    <ui-tooltip-content side="top">
      Tooltip on top
    </ui-tooltip-content>
  </ui-tooltip>
</template>`

const tooltipProps: PropDoc[] = [
  {
    name: 'side',
    type: "'top' | 'right' | 'bottom' | 'left'",
    default: "'top'",
    description: 'The side of the trigger to show the tooltip'
  },
  {
    name: 'align',
    type: "'start' | 'center' | 'end'",
    default: "'center'",
    description: 'The alignment of the tooltip'
  },
  {
    name: 'delayDuration',
    type: 'number',
    default: '700',
    description: 'Delay in ms before showing tooltip'
  },
  {
    name: 'sideOffset',
    type: 'number',
    default: '4',
    description: 'Distance in pixels from the trigger'
  }
]
</script>

<template>
  <component-section id="tooltip" title="Tooltip"
    description="A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it."
    :source-code="tooltipSourceCode" :props-docs="tooltipProps">
    <ui-tooltip>
      <ui-tooltip-trigger as-child>
        <ui-button variant="outline">Hover me</ui-button>
      </ui-tooltip-trigger>
      <ui-tooltip-content>
        <p>This is a tooltip</p>
      </ui-tooltip-content>
    </ui-tooltip>
  </component-section>
</template>
