<script setup lang="ts">
import type { PropDoc } from '../../components/ComponentDocs.vue'

const popoverSourceCode = `<template>
  <ui-popover>
    <ui-popover-trigger as-child>
      <ui-button variant="outline">Open Popover</ui-button>
    </ui-popover-trigger>
    
    <ui-popover-content class="w-80">
      <div class="space-y-2">
        <h4 class="font-medium">Popover Title</h4>
        <p class="text-sm text-muted-foreground">
          This is a popover content area.
        </p>
      </div>
    </ui-popover-content>
  </ui-popover>
  
  <!-- With different sides -->
  <ui-popover>
    <ui-popover-trigger as-child>
      <ui-button>Bottom</ui-button>
    </ui-popover-trigger>
    <ui-popover-content side="bottom">
      Content on bottom
    </ui-popover-content>
  </ui-popover>
</template>`

const popoverProps: PropDoc[] = [
  {
    name: 'open',
    type: 'boolean',
    description: 'The controlled open state (use with v-model:open)'
  },
  {
    name: 'defaultOpen',
    type: 'boolean',
    default: 'false',
    description: 'The default open state (uncontrolled)'
  },
  {
    name: 'side',
    type: "'top' | 'right' | 'bottom' | 'left'",
    default: "'bottom'",
    description: 'The side of the trigger to show the popover'
  },
  {
    name: 'align',
    type: "'start' | 'center' | 'end'",
    default: "'center'",
    description: 'The alignment of the popover'
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
  <component-section id="popover" title="Popover"
    description="Displays rich content in a portal, triggered by a button." :source-code="popoverSourceCode"
    :props-docs="popoverProps">
    <ui-popover>
      <ui-popover-trigger as-child>
        <ui-button variant="outline">Open Popover</ui-button>
      </ui-popover-trigger>
      <ui-popover-content class="w-80">
        <div class="space-y-2">
          <h4 class="font-medium">Popover Title</h4>
          <p class="text-muted-foreground text-sm">This is a popover content area.</p>
        </div>
      </ui-popover-content>
    </ui-popover>
  </component-section>
</template>
