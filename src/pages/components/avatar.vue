<script setup lang="ts">
import type { PropDoc } from '../../components/ComponentDocs.vue'

const avatarSourceCode = `<template>
  <!-- With image -->
  <ui-avatar 
    src="https://github.com/shadcn.png" 
    alt="Avatar" 
    fallback="CN" 
  />
  
  <!-- Fallback only -->
  <ui-avatar fallback="AB" />
  
  <!-- Different sizes -->
  <ui-avatar src="..." fallback="SM" class="h-8 w-8" />
  <ui-avatar src="..." fallback="MD" class="h-10 w-10" />
  <ui-avatar src="..." fallback="LG" class="h-12 w-12" />
</template>`

const avatarProps: PropDoc[] = [
  {
    name: 'src',
    type: 'string',
    description: 'The image source URL'
  },
  {
    name: 'alt',
    type: 'string',
    description: 'Alternative text for the image'
  },
  {
    name: 'fallback',
    type: 'string',
    description: 'Text to display when image fails to load'
  },
  {
    name: 'class',
    type: 'string',
    description: 'Additional CSS classes (use for sizing)'
  }
]
</script>

<template>
  <component-section id="avatar" title="Avatar"
    description="An image element with a fallback for representing the user." :source-code="avatarSourceCode"
    :props-docs="avatarProps">
    <div class="flex gap-2">
      <ui-avatar src="https://github.com/shadcn.png" alt="Avatar" fallback="CN" />
      <ui-avatar fallback="AB" />
    </div>
  </component-section>
</template>
