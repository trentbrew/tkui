<script setup lang="ts">
import type { PropDoc } from '../../components/ComponentDocs.vue'

const collapsibleSourceCode = `<template>
  <ui-collapsible class="w-full max-w-md space-y-2">
    <div class="flex items-center justify-between space-x-4 rounded-md bg-muted px-4 py-2">
      <h4 class="text-sm font-semibold">
        @peduarte starred 3 repositories
      </h4>
      <ui-collapsible-trigger as-child>
        <ui-button variant="ghost" size="icon-sm">
          <ui-icon name="lucide:chevron-down" />
        </ui-button>
      </ui-collapsible-trigger>
    </div>
    
    <ui-collapsible-content class="space-y-2">
      <div class="rounded-md bg-muted px-4 py-3 text-sm">
        @radix-ui/primitives
      </div>
      <div class="rounded-md bg-muted px-4 py-3 text-sm">
        @radix-ui/colors
      </div>
      <div class="rounded-md bg-muted px-4 py-3 text-sm">
        @stitches/react
      </div>
    </ui-collapsible-content>
  </ui-collapsible>
</template>`

const collapsibleProps: PropDoc[] = [
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
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the collapsible is disabled'
  },
  {
    name: 'class',
    type: 'string',
    description: 'Additional CSS classes'
  }
]
</script>

<template>
  <component-section id="collapsible" title="Collapsible"
    description="An interactive component which expands/collapses a panel." :source-code="collapsibleSourceCode"
    :props-docs="collapsibleProps">
    <ui-collapsible class="w-full max-w-md space-y-2">
      <div class="bg-muted flex items-center justify-between space-x-4 rounded-md px-4 py-2">
        <h4 class="text-sm font-semibold">@peduarte starred 3 repositories</h4>
        <ui-collapsible-trigger as-child>
          <ui-button variant="ghost" size="icon-sm">
            <ui-icon name="lucide:chevron-down" />
          </ui-button>
        </ui-collapsible-trigger>
      </div>
      <ui-collapsible-content class="space-y-2">
        <div class="bg-muted rounded-md px-4 py-3 text-sm">@radix-ui/primitives</div>
        <div class="bg-muted rounded-md px-4 py-3 text-sm">@radix-ui/colors</div>
        <div class="bg-muted rounded-md px-4 py-3 text-sm">@stitches/react</div>
      </ui-collapsible-content>
    </ui-collapsible>
  </component-section>
</template>
