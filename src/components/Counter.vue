<template>
  <ui-card class="relative w-full">
    <ui-card-header class="text-center">
      <ui-card-title>Counter</ui-card-title>
      <ui-card-description> A simple counter component w/ Pinia </ui-card-description>
    </ui-card-header>
    <ui-card-content class="flex items-center justify-center gap-5 pt-5">
      <ui-button
        size="icon"
        variant="outline"
        class="rounded-full"
        @click="counterStore.decrement()"
      >
        <Icon name="lucide:minus" />
        <span class="sr-only">Decrement Button</span>
      </ui-button>
      <h1 class="text-center text-4xl font-extrabold">{{ counterStore.counter }}</h1>
      <ui-button
        size="icon"
        variant="outline"
        class="rounded-full"
        @click="counterStore.increment()"
      >
        <Icon name="lucide:plus" />
        <span class="sr-only">Increment Button</span>
      </ui-button>
    </ui-card-content>
    <div class="absolute top-4 right-4">
      <ui-button size="icon-sm" variant="outline" @click="toggleDark()">
        <icon :name="isDark ? 'lucide:moon' : 'lucide:sun'" />
      </ui-button>
    </div>
  </ui-card>
</template>

<script lang="ts" setup>
  import { useDark, useToggle } from "@vueuse/core";

  const counterStore = useCounterStore();
  const isDark = useDark();
  const toggleDark = useToggle(isDark);
</script>
