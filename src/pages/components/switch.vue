<script setup lang="ts">
import type { PropDoc } from '../../components/ComponentDocs.vue'

const switchSourceCode = `<template>
  <div class="flex items-center gap-2">
    <ui-switch id="notifications" />
    <ui-label for="notifications">Enable notifications</ui-label>
  </div>
  
  <!-- With v-model -->
  <ui-switch v-model:checked="isEnabled" id="feature" />
  
  <!-- Enabled by default -->
  <ui-switch :default-checked="true" id="default-on" />
  
  <!-- Disabled -->
  <ui-switch :disabled="true" id="disabled" />
  
  <!-- Disabled and checked -->
  <ui-switch :disabled="true" :checked="true" id="disabled-on" />
</template>`

const switchProps: PropDoc[] = [
  {
    name: 'checked',
    type: 'boolean',
    default: 'false',
    description: 'The checked state of the switch'
  },
  {
    name: 'defaultChecked',
    type: 'boolean',
    default: 'false',
    description: 'The default checked state (uncontrolled)'
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the switch is disabled'
  },
  {
    name: 'required',
    type: 'boolean',
    default: 'false',
    description: 'Whether the switch is required'
  },
  {
    name: 'name',
    type: 'string',
    description: 'The name attribute of the switch input'
  },
  {
    name: 'value',
    type: 'string',
    description: 'The value attribute of the switch input'
  },
  {
    name: 'id',
    type: 'string',
    description: 'The id attribute of the switch'
  }
]
</script>

<template>
  <component-section id="switch" title="Switch"
    description="A control that allows the user to toggle between on and off." :source-code="switchSourceCode"
    :props-docs="switchProps">
    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-2">
        <ui-switch id="s1" />
        <ui-label for="s1">Enable notifications</ui-label>
      </div>
      <div class="flex items-center gap-2">
        <ui-switch id="s2" :default-checked="true" />
        <ui-label for="s2">Enabled by default</ui-label>
      </div>
    </div>
  </component-section>
</template>
