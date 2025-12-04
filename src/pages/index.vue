<script lang="ts" setup>
  import { useDark, useToggle } from "@vueuse/core";

  const isDark = useDark();
  const toggleDark = useToggle(isDark);

  // Set default to light mode if not set
  onMounted(() => {
    if (isDark.value === undefined) {
      toggleDark(false);
    }
  });
</script>

<template>
  <ui-container class="flex min-h-dvh flex-col items-center justify-center">
    <div class="mx-auto max-w-md space-y-6 text-center">
      <counter />
      <ui-button as="router-link" to="/components" variant="outline" class="mt-4">
        View Components
      </ui-button>
    </div>
  </ui-container>
</template>
