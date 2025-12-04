<script setup lang="ts">
import type { PropDoc } from '../../components/ComponentDocs.vue'

const dialogSourceCode = `<template>
  <ui-dialog>
    <ui-dialog-trigger as-child>
      <ui-button>Open Dialog</ui-button>
    </ui-dialog-trigger>
    
    <ui-dialog-content>
      <ui-dialog-header>
        <ui-dialog-title>Dialog Title</ui-dialog-title>
        <ui-dialog-description>
          This is a dialog description.
        </ui-dialog-description>
      </ui-dialog-header>
      
      <div class="py-4">
        Dialog content goes here...
      </div>
      
      <ui-dialog-footer>
        <ui-button variant="outline">Cancel</ui-button>
        <ui-button>Confirm</ui-button>
      </ui-dialog-footer>
    </ui-dialog-content>
  </ui-dialog>
</template>`

const dialogProps: PropDoc[] = [
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
    name: 'modal',
    type: 'boolean',
    default: 'true',
    description: 'Whether the dialog is modal'
  }
]
</script>

<template>
  <component-section id="dialog" title="Dialog"
    description="A window overlaid on either the primary window or another dialog window."
    :source-code="dialogSourceCode" :props-docs="dialogProps">
    <ui-dialog>
      <ui-dialog-trigger as-child>
        <ui-button>Open Dialog</ui-button>
      </ui-dialog-trigger>
      <ui-dialog-content>
        <ui-dialog-header>
          <ui-dialog-title>Dialog Title</ui-dialog-title>
          <ui-dialog-description>
            This is a dialog description. You can put any content here.
          </ui-dialog-description>
        </ui-dialog-header>
        <div class="py-4">Dialog content goes here...</div>
        <ui-dialog-footer>
          <ui-button variant="outline">Cancel</ui-button>
          <ui-button>Confirm</ui-button>
        </ui-dialog-footer>
      </ui-dialog-content>
    </ui-dialog>
  </component-section>
</template>
