<script lang="ts" setup>
  import type { NavItem, NavSection } from "./types";

  defineProps<{
    section: NavSection;
    items: NavItem[];
    search: string;
  }>();

  const emit = defineEmits<{
    "update:search": [value: string];
    action: [];
  }>();
</script>

<template>
  <ui-scroll-area class="h-full">
    <div class="flex h-screen flex-col p-4">
      <slot name="header" />

      <div class="mb-4">
        <ui-input
          :model-value="search"
          placeholder="Search..."
          class="border-white/20 bg-white/10 pl-3 text-inherit placeholder:text-white/60 focus:border-white/40"
          @update:model-value="emit('update:search', $event as string)"
        />
      </div>

      <nav class="flex flex-1 flex-col gap-1 overflow-y-auto">
        <template v-for="(item, i) in items" :key="`${item.title}-${i}`">
          <!-- Group header -->
          <div
            v-if="item.isGroup"
            class="mt-3 mb-1 px-2 text-xs font-medium tracking-wider uppercase opacity-60"
          >
            {{ item.title }}
          </div>
          <!-- Nav item -->
          <RouterLink v-else :to="item.link" custom v-slot="{ isActive, navigate }">
            <ui-button
              size="sm"
              :variant="isActive ? 'secondary' : 'ghost'"
              class="w-full justify-start gap-3 px-2"
              @click="navigate"
            >
              <ui-icon v-if="item.icon" :name="item.icon" class="size-4 opacity-70" />
              <span>{{ item.title }}</span>
              <ui-badge
                v-if="item.isNew"
                class="ml-auto border-0 bg-white/20 !px-2 py-0 text-[10px] text-white"
                >New</ui-badge
              >
              <span v-else-if="item.count" class="ml-auto text-xs opacity-60">
                {{ item.count }}
              </span>
            </ui-button>
          </RouterLink>
        </template>
      </nav>

      <!-- Section Action Button -->
      <ui-button v-if="section.actionLabel" class="mt-4 w-full" size="sm" @click="emit('action')">
        <ui-icon name="lucide:plus" class="mr-2 size-4" />
        {{ section.actionLabel }}
      </ui-button>
    </div>
  </ui-scroll-area>
</template>
