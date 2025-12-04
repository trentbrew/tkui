<script setup lang="ts">
import type { PropDoc } from '../../components/ComponentDocs.vue'

const kbdSourceCode = `<template>
  <!-- Single key -->
  <ui-kbd>⌘</ui-kbd>
  <ui-kbd>K</ui-kbd>
  
  <!-- Key combinations -->
  <div class="flex gap-1">
    <ui-kbd>Ctrl</ui-kbd>
    <span>+</span>
    <ui-kbd>C</ui-kbd>
  </div>
  
  <!-- Common shortcuts -->
  <div class="flex gap-1">
    <ui-kbd>⌘</ui-kbd>
    <ui-kbd>Shift</ui-kbd>
    <ui-kbd>P</ui-kbd>
  </div>
  
  <!-- Different keys -->
  <ui-kbd>Enter</ui-kbd>
  <ui-kbd>Esc</ui-kbd>
  <ui-kbd>Tab</ui-kbd>
  <ui-kbd>Space</ui-kbd>
</template>`

const kbdProps: PropDoc[] = [
  {
    name: 'class',
    type: 'string',
    description: 'Additional CSS classes'
  }
]
</script>

<template>
  <component-section id="kbd" title="Keyboard" description="Represents keyboard input or hotkeys."
    :source-code="kbdSourceCode" :props-docs="kbdProps">
    <div class="flex gap-2">
      <ui-kbd>⌘</ui-kbd>
      <ui-kbd>K</ui-kbd>
    </div>
  </component-section>
</template>
