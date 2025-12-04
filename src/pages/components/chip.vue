<script setup lang="ts">
  import type { PropDoc } from "../../components/ComponentDocs.vue";

  const sourceCode = `<template>
  <!-- Basic chip on avatar -->
  <ui-chip>
    <ui-avatar src="https://i.pravatar.cc/100" />
  </ui-chip>

  <!-- With text content -->
  <ui-chip text="3" size="lg" color="bg-destructive">
    <ui-avatar src="https://i.pravatar.cc/100" />
  </ui-chip>

  <!-- Different positions -->
  <ui-chip position="top-left" color="bg-green-500">
    <ui-avatar src="https://i.pravatar.cc/100" />
  </ui-chip>

  <ui-chip position="bottom-right" color="bg-blue-500">
    <ui-avatar src="https://i.pravatar.cc/100" />
  </ui-chip>

  <!-- Inset positioning -->
  <ui-chip :inset="true" color="bg-yellow-500">
    <ui-avatar src="https://i.pravatar.cc/100" />
  </ui-chip>

  <!-- Controllable visibility -->
  <ui-chip v-model:show="showChip">
    <ui-avatar src="https://i.pravatar.cc/100" />
  </ui-chip>
</template>`;

  const propsDocs: PropDoc[] = [
    {
      name: "text",
      type: "string",
      description: "Text to display inside the chip (can be overridden by content slot)",
    },
    {
      name: "color",
      type: "string",
      default: "'bg-primary'",
      description: "Background color class for the chip",
    },
    {
      name: "size",
      type: "'3xs' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'",
      default: "'sm'",
      description: "Size of the chip indicator",
    },
    {
      name: "position",
      type: "'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'",
      default: "'top-right'",
      description: "Position of the chip relative to its container",
    },
    {
      name: "inset",
      type: "boolean",
      default: "false",
      description: "Whether the chip should be positioned inside the container bounds",
    },
    {
      name: "show",
      type: "boolean",
      default: "true",
      description: "Controls visibility of the chip (supports v-model)",
    },
  ];

  const showChip = ref(true);
</script>

<template>
  <component-section
    id="chip"
    title="Chip"
    description="A small indicator badge that can be positioned on any element, commonly used for notification counts or status indicators."
    :source-code="sourceCode"
    :props-docs="propsDocs"
  >
    <div class="flex flex-wrap items-center gap-6">
      <!-- Basic -->
      <ui-chip>
        <ui-avatar src="https://i.pravatar.cc/100?img=1" />
      </ui-chip>

      <!-- With text -->
      <ui-chip text="3" size="lg" color="bg-destructive">
        <ui-avatar src="https://i.pravatar.cc/100?img=2" />
      </ui-chip>

      <!-- Different positions -->
      <ui-chip position="top-left" color="bg-green-500">
        <ui-avatar src="https://i.pravatar.cc/100?img=3" />
      </ui-chip>

      <ui-chip position="bottom-right" color="bg-blue-500">
        <ui-avatar src="https://i.pravatar.cc/100?img=4" />
      </ui-chip>

      <!-- Inset -->
      <ui-chip :inset="true" color="bg-yellow-500">
        <ui-avatar src="https://i.pravatar.cc/100?img=5" />
      </ui-chip>
    </div>

    <template #live>
      <div class="flex flex-col gap-4">
        <div class="flex items-center gap-4">
          <ui-chip v-model:show="showChip" text="!" size="lg" color="bg-destructive">
            <ui-avatar src="https://i.pravatar.cc/100?img=6" />
          </ui-chip>
          <ui-button size="sm" variant="outline" @click="showChip = !showChip">
            {{ showChip ? "Hide" : "Show" }} Chip
          </ui-button>
        </div>
      </div>
    </template>
  </component-section>
</template>
