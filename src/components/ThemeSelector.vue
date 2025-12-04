<template>
  <ui-popover>
    <ui-popover-trigger as-child>
      <ui-button variant="outline" size="sm">
        <ui-icon name="lucide:palette" class="mr-2 h-4 w-4" />
        {{ currentPresetLabel }}
      </ui-button>
    </ui-popover-trigger>
    <ui-popover-content class="w-80">
      <div class="space-y-4">
        <div>
          <h4 class="font-medium leading-none mb-3">Select Theme</h4>
          <div class="grid grid-cols-2 gap-2">
            <button
              v-for="(preset, key) in presets"
              :key="key"
              @click="selectPreset(key)"
              class="group relative flex flex-col gap-2 rounded-md border-2 p-3 text-left transition-all hover:border-primary"
              :class="{
                'border-primary bg-accent': currentPreset === key,
                'border-border': currentPreset !== key,
              }"
            >
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium">{{ preset.label }}</span>
                <ui-icon
                  v-if="currentPreset === key"
                  name="lucide:check"
                  class="h-4 w-4 text-primary"
                />
              </div>
              <div class="flex gap-1">
                <div
                  v-for="colorKey in ['primary', 'secondary', 'accent']"
                  :key="colorKey"
                  class="h-4 w-full rounded"
                  :style="{
                    backgroundColor: preset.styles.light[colorKey as keyof typeof preset.styles.light] || '#888',
                  }"
                />
              </div>
            </button>
          </div>
        </div>

        <div class="border-t pt-4">
          <h4 class="font-medium leading-none mb-3">Theme Actions</h4>
          <div class="flex gap-2">
            <ui-button
              variant="outline"
              size="sm"
              @click="resetTheme"
              :disabled="!themeStore.hasUnsavedChanges()"
              class="flex-1"
            >
              <ui-icon name="lucide:rotate-ccw" class="mr-2 h-4 w-4" />
              Reset
            </ui-button>
          </div>
        </div>
      </div>
    </ui-popover-content>
  </ui-popover>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useThemeStore } from '../stores/theme';
import { themePresets } from '../config/theme';

const themeStore = useThemeStore();
const presets = themePresets;

const currentPreset = computed(() => themeStore.currentPreset || 'default');
const currentPresetLabel = computed(() => {
  if (!themeStore.currentPreset || themeStore.currentPreset === 'default') {
    return 'Default';
  }
  return presets[themeStore.currentPreset]?.label || 'Custom';
});

function selectPreset(presetKey: string) {
  themeStore.applyThemePreset(presetKey);
}

function resetTheme() {
  themeStore.resetToCurrentPreset();
}
</script>
