<template>
  <div class="flex h-full flex-col gap-4">
    <ui-tabs default-value="docs" class="w-full">
      <ui-tabs-list :class="['grid w-full', hasLiveSlot ? 'grid-cols-4' : 'grid-cols-3']">
        <ui-tabs-trigger value="docs">
          <ui-icon name="lucide:book-open" class="mr-2" />
          Docs
        </ui-tabs-trigger>
        <ui-tabs-trigger v-if="hasLiveSlot" value="live">
          <ui-icon name="lucide:bolt" class="mr-2" />
          State
        </ui-tabs-trigger>
        <ui-tabs-trigger value="code">
          <ui-icon name="lucide:code" class="mr-2" />
          Code
        </ui-tabs-trigger>
        <ui-tabs-trigger value="props">
          <ui-icon name="lucide:list" class="mr-2" />
          Props
        </ui-tabs-trigger>
      </ui-tabs-list>

      <!-- Docs Tab -->
      <ui-tabs-content value="docs" class="mt-4">
        <div class="bg-muted/50 border-border rounded-lg border p-6">
          <p v-if="description" class="text-sm leading-relaxed">{{ description }}</p>
          <div v-else class="flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <ui-icon name="lucide:info" class="size-5" />
            <span>No additional docs provided.</span>
          </div>
        </div>
      </ui-tabs-content>

      <!-- Live Tab -->
      <ui-tabs-content v-if="hasLiveSlot" value="live" class="mt-4">
        <div class="bg-muted/50 border-border rounded-lg border p-6">
          <slot name="live" />
        </div>
      </ui-tabs-content>

      <!-- Code Tab -->
      <ui-tabs-content value="code" class="mt-4">
        <div class="relative">
          <ui-button variant="ghost" size="icon-sm" class="absolute right-2 top-2 z-10" @click="copyCode"
            :title="copied ? 'Copied!' : 'Copy code'">
            <ui-icon :name="copied ? 'lucide:check' : 'lucide:copy'" />
          </ui-button>
          <pre
            class="bg-muted border-border overflow-x-auto rounded-lg border p-4"><code class="text-sm">{{ sourceCode }}</code></pre>
        </div>
      </ui-tabs-content>

      <!-- Props Tab -->
      <ui-tabs-content value="props" class="mt-4">
        <div v-if="props && props.length > 0" class="overflow-hidden rounded-lg border">
          <ui-table>
            <ui-table-header>
              <ui-table-row>
                <ui-table-head class="w-[200px]">Prop</ui-table-head>
                <ui-table-head class="w-[150px]">Type</ui-table-head>
                <ui-table-head class="w-[150px]">Default</ui-table-head>
                <ui-table-head>Description</ui-table-head>
              </ui-table-row>
            </ui-table-header>
            <ui-table-body>
              <ui-table-row v-for="prop in props" :key="prop.name">
                <ui-table-cell class="font-mono text-sm">{{ prop.name }}</ui-table-cell>
                <ui-table-cell>
                  <ui-badge variant="outline" class="font-mono text-xs">{{ prop.type }}</ui-badge>
                </ui-table-cell>
                <ui-table-cell>
                  <code v-if="prop.default" class="text-muted-foreground text-xs">{{ prop.default }}</code>
                  <span v-else class="text-muted-foreground text-xs">-</span>
                </ui-table-cell>
                <ui-table-cell class="text-sm">{{ prop.description }}</ui-table-cell>
              </ui-table-row>
            </ui-table-body>
          </ui-table>
        </div>
        <div v-else class="bg-muted/50 border-border rounded-lg border p-8 text-center">
          <ui-icon name="lucide:info" class="text-muted-foreground mx-auto mb-2 size-8" />
          <p class="text-muted-foreground text-sm">No props documentation available</p>
        </div>
      </ui-tabs-content>
    </ui-tabs>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'

export interface PropDoc {
  name: string
  type: string
  default?: string
  description: string
}

const props = defineProps<{
  sourceCode: string
  description?: string
  props?: PropDoc[]
}>()

const copied = ref(false)
const slots = useSlots()
const hasLiveSlot = computed(() => Boolean(slots.live))

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.sourceCode)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch (err) {
    console.error('Failed to copy code:', err)
  }
}
</script>
