<script setup lang="ts">
  import type { PropDoc } from "../../components/ComponentDocs.vue";

  const sourceCode = `<template>
  <!-- Basic rating display -->
  <ui-rating v-model="rating" />

  <!-- With numeric value shown -->
  <ui-rating v-model="rating" :show-value="true" />

  <!-- Editable rating -->
  <ui-rating v-model="rating" :editable="true" />

  <!-- Different sizes -->
  <ui-rating v-model="rating" size="sm" />
  <ui-rating v-model="rating" size="md" />
  <ui-rating v-model="rating" size="lg" />

  <!-- Custom max rating -->
  <ui-rating v-model="rating" :max-rating="10" />

  <!-- Custom icon -->
  <ui-rating v-model="rating" icon="lucide:heart" />

  <!-- Partial ratings (e.g., 3.5 stars) -->
  <ui-rating :model-value="3.5" />
</template>`;

  const propsDocs: PropDoc[] = [
    {
      name: "modelValue",
      type: "number",
      default: "0",
      description: "The current rating value (supports v-model)",
    },
    {
      name: "maxRating",
      type: "number",
      default: "5",
      description: "Maximum rating value (number of stars to display)",
    },
    {
      name: "size",
      type: "'sm' | 'md' | 'lg'",
      default: "'md'",
      description: "Size of the rating stars",
    },
    {
      name: "showValue",
      type: "boolean",
      default: "false",
      description: "Whether to display the numeric rating value",
    },
    {
      name: "editable",
      type: "boolean",
      default: "false",
      description: "Whether the rating can be changed by clicking",
    },
    {
      name: "icon",
      type: "string",
      default: "'lucide:star'",
      description: "Icon to use for the rating indicators",
    },
    {
      name: "emptyIconClassName",
      type: "string",
      description: "Additional classes for empty star icons",
    },
    {
      name: "filledIconClassName",
      type: "string",
      description: "Additional classes for filled star icons",
    },
    {
      name: "valueClassName",
      type: "string",
      description: "Additional classes for the numeric value display",
    },
  ];

  const rating = ref(3);
  const editableRating = ref(2);
</script>

<template>
  <component-section
    id="rating"
    title="Rating"
    description="A star rating component that supports display-only and interactive modes, with partial star support."
    :source-code="sourceCode"
    :props-docs="propsDocs"
  >
    <div class="flex flex-col gap-4">
      <!-- Basic -->
      <div class="flex items-center gap-4">
        <span class="text-muted-foreground w-24 text-sm">Basic:</span>
        <ui-rating :model-value="3" />
      </div>

      <!-- With value -->
      <div class="flex items-center gap-4">
        <span class="text-muted-foreground w-24 text-sm">With value:</span>
        <ui-rating :model-value="4.5" :show-value="true" />
      </div>

      <!-- Sizes -->
      <div class="flex items-center gap-4">
        <span class="text-muted-foreground w-24 text-sm">Sizes:</span>
        <ui-rating :model-value="3" size="sm" />
        <ui-rating :model-value="3" size="md" />
        <ui-rating :model-value="3" size="lg" />
      </div>

      <!-- Custom icon -->
      <div class="flex items-center gap-4">
        <span class="text-muted-foreground w-24 text-sm">Hearts:</span>
        <ui-rating :model-value="4" icon="lucide:heart" />
      </div>

      <!-- Partial -->
      <div class="flex items-center gap-4">
        <span class="text-muted-foreground w-24 text-sm">Partial:</span>
        <ui-rating :model-value="3.7" :show-value="true" />
      </div>
    </div>

    <template #live>
      <div class="flex flex-col gap-4">
        <p class="text-muted-foreground text-sm">Click to rate:</p>
        <ui-rating v-model="editableRating" :editable="true" :show-value="true" size="lg" />
        <p class="text-sm">
          Current rating: <strong>{{ editableRating }}</strong>
        </p>
      </div>
    </template>
  </component-section>
</template>
