<script setup lang="ts">
import type { PropDoc } from '../../components/ComponentDocs.vue'

const inputSourceCode = `<template>
  <ui-input placeholder="Default input" />
  <ui-input placeholder="With icon" icon="lucide:search" />
  <ui-input placeholder="Disabled" :disabled="true" />
  <ui-input placeholder="Error" aria-invalid="true" />
  
  <!-- With v-model -->
  <ui-input v-model="value" placeholder="Type something..." />
  
  <!-- Different types -->
  <ui-input type="email" placeholder="Email" />
  <ui-input type="password" placeholder="Password" />
  <ui-input type="number" placeholder="Number" />
  <ui-input type="search" placeholder="Search" />
</template>`

const inputProps: PropDoc[] = [
  {
    name: 'modelValue',
    type: 'any',
    default: '""',
    description: 'The value of the input (use with v-model)'
  },
  {
    name: 'type',
    type: "'text' | 'email' | 'password' | 'number' | 'search' | 'tel' | 'url' | 'date' | ...",
    default: "'text'",
    description: 'The HTML input type'
  },
  {
    name: 'placeholder',
    type: 'string',
    description: 'Placeholder text displayed when input is empty'
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the input is disabled'
  },
  {
    name: 'required',
    type: 'boolean',
    default: 'false',
    description: 'Whether the input is required'
  },
  {
    name: 'autofocus',
    type: 'boolean',
    default: 'false',
    description: 'Whether to focus the input when mounted'
  },
  {
    name: 'maxlength',
    type: 'number',
    description: 'Maximum number of characters allowed'
  },
  {
    name: 'pattern',
    type: 'string',
    description: 'RegExp pattern to validate input characters'
  },
  {
    name: 'id',
    type: 'string',
    description: 'The id attribute of the input'
  },
  {
    name: 'name',
    type: 'string',
    description: 'The name attribute of the input'
  }
]
</script>

<template>
  <component-section id="input" title="Input" description="Input field for text entry." :source-code="inputSourceCode"
    :props-docs="inputProps">
    <div class="grid gap-4 sm:grid-cols-2">
      <ui-input placeholder="Default input" />
      <ui-input placeholder="With icon" icon="lucide:search" />
      <ui-input placeholder="Disabled" :disabled="true" />
      <ui-input placeholder="Error" aria-invalid="true" />
    </div>
  </component-section>
</template>
