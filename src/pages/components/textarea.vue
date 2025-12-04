<script setup lang="ts">
import type { PropDoc } from '../../components/ComponentDocs.vue'

const textareaSourceCode = `<template>
  <ui-textarea placeholder="Type your message here..." :rows="4" />
  
  <!-- With v-model -->
  <ui-textarea v-model="message" placeholder="Enter text..." />
  
  <!-- Different sizes -->
  <ui-textarea :rows="2" placeholder="Small (2 rows)" />
  <ui-textarea :rows="6" placeholder="Large (6 rows)" />
  
  <!-- With maxlength -->
  <ui-textarea :maxlength="200" placeholder="Max 200 characters" />
  
  <!-- Disabled -->
  <ui-textarea :disabled="true" placeholder="Disabled" />
</template>`

const textareaProps: PropDoc[] = [
  {
    name: 'modelValue',
    type: 'string',
    default: '""',
    description: 'The value of the textarea (use with v-model)'
  },
  {
    name: 'placeholder',
    type: 'string',
    description: 'Placeholder text displayed when textarea is empty'
  },
  {
    name: 'rows',
    type: 'number',
    description: 'Number of visible text rows'
  },
  {
    name: 'disabled',
    type: 'boolean',
    default: 'false',
    description: 'Whether the textarea is disabled'
  },
  {
    name: 'required',
    type: 'boolean',
    default: 'false',
    description: 'Whether the textarea is required'
  },
  {
    name: 'autofocus',
    type: 'boolean',
    default: 'false',
    description: 'Whether to focus the textarea when mounted'
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
    description: 'The id attribute of the textarea'
  },
  {
    name: 'name',
    type: 'string',
    description: 'The name attribute of the textarea'
  }
]
</script>

<template>
  <component-section id="textarea" title="Textarea" description="Multi-line text input field."
    :source-code="textareaSourceCode" :props-docs="textareaProps">
    <ui-textarea placeholder="Type your message here..." :rows="4" />
  </component-section>
</template>
