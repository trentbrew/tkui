<script lang="ts" setup>
  import type { Organization } from "./types";

  const props = defineProps<{
    organizations: Organization[];
    modelValue: Organization;
  }>();

  const emit = defineEmits<{
    "update:modelValue": [org: Organization];
  }>();

  function selectOrg(org: Organization) {
    emit("update:modelValue", org);
  }
</script>

<template>
  <ui-dropdown-menu>
    <ui-dropdown-menu-trigger as-child>
      <button
        class="mb-4 flex w-full items-center gap-3 rounded-md px-3 py-2 text-left transition-colors"
      >
        <ui-avatar
          :src="modelValue.logo"
          :fallback="modelValue.name.charAt(0)"
          class="size-8 rounded-md"
        />
        <div class="flex-1 truncate">
          <p class="text-sm font-medium">{{ modelValue.name }}</p>
          <p class="text-xs opacity-60">{{ modelValue.plan }}</p>
        </div>
        <ui-icon name="lucide:chevrons-up-down" class="size-4 opacity-60" />
      </button>
    </ui-dropdown-menu-trigger>
    <ui-dropdown-menu-content class="w-[228px]" align="start">
      <ui-dropdown-menu-label>Organizations</ui-dropdown-menu-label>
      <ui-dropdown-menu-separator />
      <ui-dropdown-menu-item
        v-for="org in organizations"
        :key="org.id"
        @click="selectOrg(org)"
        class="gap-3"
      >
        <ui-avatar :src="org.logo" :fallback="org.name.charAt(0)" class="size-6 rounded-md" />
        <span class="flex-1 truncate">{{ org.name }}</span>
        <ui-icon v-if="modelValue.id === org.id" name="lucide:check" class="text-primary size-4" />
      </ui-dropdown-menu-item>
      <ui-dropdown-menu-separator />
      <ui-dropdown-menu-item>
        <ui-icon name="lucide:plus" class="mr-2 size-4" />
        Add organization
      </ui-dropdown-menu-item>
    </ui-dropdown-menu-content>
  </ui-dropdown-menu>
</template>
