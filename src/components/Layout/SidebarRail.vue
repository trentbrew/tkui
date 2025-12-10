<script lang="ts" setup>
  import type { NavSection } from "./types";

  defineProps<{
    sections: NavSection[];
    activeSection: NavSection | null;
    isDark: boolean;
  }>();

  const emit = defineEmits<{
    selectSection: [section: NavSection];
    toggleTheme: [];
  }>();
</script>

<template>
  <div class="bg-black/40 dark:bg-black/30 flex w-16 flex-col items-center rounded-0 pb-4 mr-1">
    <!-- Logo -->
    <div class="py-4">
      <RouterLink to="/">
        <img src="/logo.png" alt="Toolkit UI" class="size-8 rounded object-contain" />
      </RouterLink>
    </div>

    <!-- Main Nav Icons -->
    <nav class="flex flex-1 flex-col gap-2 text-white mr-1">
      <div v-for="(section, i) in sections" :key="i">
        <ui-tooltip>
          <ui-tooltip-trigger as-child>
            <ui-button
              :variant="activeSection?.id === section.id ? 'default' : 'ghost'"
              size="icon"
              class="!text-white"
              :class="
                activeSection?.id === section.id
                  ? 'bg-accent !text-black'
                  : 'bg-transparent hover:bg-transparent'
              "
              @click="emit('selectSection', section)"
            >
              <ui-icon :name="section.icon" class="size-[18px]" />
            </ui-button>
          </ui-tooltip-trigger>
          <ui-tooltip-content side="right">{{ section.title }}</ui-tooltip-content>
        </ui-tooltip>
      </div>
    </nav>

    <!-- Theme Toggle -->
    <ui-tooltip>
      <ui-tooltip-trigger as-child>
        <ui-button variant="ghost" size="icon" @click="emit('toggleTheme')" class="!text-white">
          <ui-icon :name="isDark ? 'lucide:sun' : 'lucide:moon'" class="size-[18px]" />
        </ui-button>
      </ui-tooltip-trigger>
      <ui-tooltip-content side="right">{{
        isDark ? "Light mode" : "Dark mode"
      }}</ui-tooltip-content>
    </ui-tooltip>

    <!-- Settings Button -->
    <ui-tooltip>
      <ui-tooltip-trigger as-child>
        <ui-button variant="ghost" size="icon" class="!text-white">
          <ui-icon name="lucide:settings" class="size-[18px]" />
        </ui-button>
      </ui-tooltip-trigger>
      <ui-tooltip-content side="right">Settings</ui-tooltip-content>
    </ui-tooltip>
  </div>
</template>
