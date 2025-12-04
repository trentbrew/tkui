<script setup lang="ts">
import type { PropDoc } from '../../components/ComponentDocs.vue'

const checkboxSourceCode = `<template>
  <div class="flex items-center gap-2">
    <ui-checkbox id="terms" />
    <ui-label for="terms">Accept terms and conditions</ui-label>
  </div>
  
  <!-- With v-model -->
  <ui-checkbox v-model:checked="isChecked" id="newsletter" />
  
  <!-- Checked by default -->
  <ui-checkbox :checked="true" id="default-checked" />
  
  <!-- Disabled -->
  <ui-checkbox :disabled="true" id="disabled" />
  
  <!-- Disabled and checked -->
  <ui-checkbox :disabled="true" :checked="true" id="disabled-checked" />
</template>`

const checkboxProps: PropDoc[] = [
  {
    name: 'checked',
    type: 'boolean | "indeterminate"',
    default: 'false',
    description: 'The checked state of the checkbox'
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
    description: 'Whether the checkbox is disabled'
  },
  {
    name: 'required',
    type: 'boolean',
    default: 'false',
    description: 'Whether the checkbox is required'
  },
  {
    name: 'name',
    type: 'string',
    description: 'The name attribute of the checkbox input'
  },
  {
    name: 'value',
    type: 'string',
    description: 'The value attribute of the checkbox input'
  },
  {
    name: 'id',
    type: 'string',
    description: 'The id attribute of the checkbox'
  }
]
</script>

<template>
  <component-section id="checkbox" title="Checkbox"
    description="A control that allows the user to toggle between checked and not checked."
    :source-code="checkboxSourceCode" :props-docs="checkboxProps">
    <div class="flex flex-col gap-3">
      <div class="flex items-center gap-2">
        <ui-checkbox id="c1" />
        <ui-label for="c1">Accept terms and conditions</ui-label>
      </div>
      <div class="flex items-center gap-2">
        <ui-checkbox id="c2" :checked="true" />
        <ui-label for="c2">Checked by default</ui-label>
      </div>
      <div class="flex items-center gap-2">
        <ui-checkbox id="c3" :disabled="true" />
        <ui-label for="c3">Disabled</ui-label>
      </div>
    </div>
  </component-section>
</template>
