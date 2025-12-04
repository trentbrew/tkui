<script setup lang="ts">
import type { PropDoc } from '../../components/ComponentDocs.vue'

const separatorSourceCode = `<template>
  <!-- Horizontal separator -->
  <div>
    <p>Content above</p>
    <ui-separator class="my-4" />
    <p>Content below</p>
  </div>
  
  <!-- Vertical separator -->
  <div class="flex items-center gap-4">
    <p>Left content</p>
    <ui-separator orientation="vertical" class="h-8" />
    <p>Right content</p>
  </div>
</template>`

const separatorProps: PropDoc[] = [
  {
    name: 'orientation',
    type: "'horizontal' | 'vertical'",
    default: "'horizontal'",
    description: 'The orientation of the separator'
  },
  {
    name: 'decorative',
    type: 'boolean',
    default: 'true',
    description: 'Whether the separator is decorative (hidden from screen readers)'
  },
  {
    name: 'class',
    type: 'string',
    description: 'Additional CSS classes'
  }
]
</script>

<template>
  <component-section id="separator" title="Separator" description="Visually or semantically separates content."
    :source-code="separatorSourceCode" :props-docs="separatorProps">
    <div class="space-y-4">
      <div>
        <p class="text-sm">Horizontal separator</p>
        <ui-separator class="my-4" />
        <p class="text-sm">Content below</p>
      </div>
      <div class="flex items-center gap-4">
        <p class="text-sm">Vertical</p>
        <ui-separator orientation="vertical" class="h-8" />
        <p class="text-sm">Separator</p>
      </div>
    </div>
  </component-section>
</template>
