<template>
  <section :id="id" class="scroll-mt-20 space-y-4">
    <div class="space-y-2">
      <ui-heading size="h3">{{ title }}</ui-heading>
      <p v-if="description" class="text-muted-foreground text-sm">{{ description }}</p>
    </div>
    <div class="bg-muted/50 border-border relative rounded-lg border p-4 md:p-6">
      <div class="flex flex-col gap-4 md:flex-row md:gap-6">
        <div class="flex-1 min-w-0">
          <div class="bg-background/40 border-border rounded-lg border p-4 md:p-6"
            :class="{ 'grid gap-4': grid }">
            <slot />
          </div>
        </div>

        <div v-if="sourceCode" class="hidden md:block">
          <div class="relative h-full w-3 cursor-col-resize" @mousedown.prevent="startResize">
            <span class="bg-border absolute inset-y-0 left-1/2 w-px -translate-x-1/2"></span>
          </div>
        </div>

        <div v-if="sourceCode"
          class="w-full max-w-full md:min-w-[320px] md:max-w-[640px] md:pl-2 md:pt-0"
          :style="docsPaneStyle">
          <ComponentDocs :source-code="sourceCode" :description="description" :props="propsDocs">
            <template #live>
              <slot name="live" />
            </template>
          </ComponentDocs>
        </div>
      </div>
    </div>

    <ui-separator />
  </section>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref } from 'vue'
import ComponentDocs, { type PropDoc } from './ComponentDocs.vue'

defineProps<{
  id: string;
  title: string;
  description?: string;
  grid?: boolean;
  sourceCode?: string;
  propsDocs?: PropDoc[];
}>();

const minDocsWidth = 320
const maxDocsWidth = 640
const docsWidth = ref(420)
const isResizing = ref(false)
const dragStartX = ref(0)
const dragStartWidth = ref(docsWidth.value)

const docsPaneStyle = computed(() => ({
  width: `${docsWidth.value}px`,
}))

const clampWidth = (value: number) => Math.min(maxDocsWidth, Math.max(minDocsWidth, value))

const stopResize = () => {
  if (!isResizing.value) return
  isResizing.value = false
  window.removeEventListener('mousemove', handleResize)
  window.removeEventListener('mouseup', stopResize)
}

const handleResize = (event: MouseEvent) => {
  if (!isResizing.value) return
  docsWidth.value = clampWidth(dragStartWidth.value + (dragStartX.value - event.clientX))
}

const startResize = (event: MouseEvent) => {
  dragStartX.value = event.clientX
  dragStartWidth.value = docsWidth.value
  isResizing.value = true
  window.addEventListener('mousemove', handleResize)
  window.addEventListener('mouseup', stopResize)
}

onBeforeUnmount(() => {
  stopResize()
})
</script>
