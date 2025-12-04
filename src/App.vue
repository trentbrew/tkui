<template>
  <div>
    <router-view />
    <Toaster />
  </div>
</template>

<script setup lang="ts">
import { Toaster } from 'vue-sonner'
import { useTheme } from './composables/useTheme'
import { useBrandProfileStore } from './stores/brandProfile'

// Initialize theme system
useTheme()

// Initialize brand profile system
const brandProfileStore = useBrandProfileStore()
brandProfileStore.initialize()
</script>
