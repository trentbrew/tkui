<script setup lang="ts">
  import type { PropDoc } from "../../components/ComponentDocs.vue";

  const sourceCode = `<template>
  <!-- Basic tags input -->
  <ui-tags-input v-model="tags">
    <ui-tags-input-item v-for="tag in tags" :key="tag" :value="tag">
      <ui-tags-input-item-text />
      <ui-tags-input-item-delete />
    </ui-tags-input-item>
    <ui-tags-input-input placeholder="Add tag..." />
  </ui-tags-input>

  <!-- With clear all button -->
  <ui-tags-input v-model="tags">
    <ui-tags-input-item v-for="tag in tags" :key="tag" :value="tag">
      <ui-tags-input-item-text />
      <ui-tags-input-item-delete />
    </ui-tags-input-item>
    <ui-tags-input-input placeholder="Add tag..." />
    <ui-tags-input-clear />
  </ui-tags-input>

  <!-- With max tags -->
  <ui-tags-input v-model="tags" :max="5">
    <!-- ... -->
  </ui-tags-input>

  <!-- Disabled -->
  <ui-tags-input v-model="tags" :disabled="true">
    <!-- ... -->
  </ui-tags-input>
</template>

<script setup>
const tags = ref(['vue', 'typescript', 'tailwind'])
<\/script>`;

  const propsDocs: PropDoc[] = [
    {
      name: "modelValue",
      type: "string[]",
      description: "Array of tag values (supports v-model)",
    },
    {
      name: "max",
      type: "number",
      description: "Maximum number of tags allowed",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether the input is disabled",
    },
    {
      name: "delimiter",
      type: "string",
      default: "','",
      description: "Character that triggers tag creation",
    },
    {
      name: "duplicate",
      type: "boolean",
      default: "false",
      description: "Whether duplicate tags are allowed",
    },
    {
      name: "addOnPaste",
      type: "boolean",
      default: "false",
      description: "Whether to add tags when pasting",
    },
    {
      name: "class",
      type: "string",
      description: "Additional classes for the container",
    },
  ];

  const tags = ref(["vue", "typescript", "tailwind"]);
  const limitedTags = ref(["react", "next"]);
</script>

<template>
  <component-section
    id="tags-input"
    title="Tags Input"
    description="A multi-value input component for entering and managing tags or keywords."
    :source-code="sourceCode"
    :props-docs="propsDocs"
  >
    <div class="flex max-w-md flex-col gap-6">
      <!-- Basic -->
      <div class="space-y-2">
        <label class="text-sm font-medium">Technologies</label>
        <ui-tags-input v-model="tags">
          <ui-tags-input-item v-for="tag in tags" :key="tag" :value="tag">
            <ui-tags-input-item-text />
            <ui-tags-input-item-delete />
          </ui-tags-input-item>
          <ui-tags-input-input placeholder="Add technology..." />
        </ui-tags-input>
      </div>

      <!-- With max limit -->
      <div class="space-y-2">
        <label class="text-sm font-medium">Frameworks (max 3)</label>
        <ui-tags-input v-model="limitedTags" :max="3">
          <ui-tags-input-item v-for="tag in limitedTags" :key="tag" :value="tag">
            <ui-tags-input-item-text />
            <ui-tags-input-item-delete />
          </ui-tags-input-item>
          <ui-tags-input-input placeholder="Add framework..." />
          <ui-tags-input-clear v-if="limitedTags.length > 0" />
        </ui-tags-input>
        <p class="text-muted-foreground text-xs">{{ limitedTags.length }}/3 tags</p>
      </div>
    </div>

    <template #live>
      <div class="flex max-w-md flex-col gap-4">
        <ui-tags-input v-model="tags">
          <ui-tags-input-item v-for="tag in tags" :key="tag" :value="tag">
            <ui-tags-input-item-text />
            <ui-tags-input-item-delete />
          </ui-tags-input-item>
          <ui-tags-input-input placeholder="Type and press Enter..." />
          <ui-tags-input-clear v-if="tags.length > 0" />
        </ui-tags-input>
        <p class="text-muted-foreground text-sm">
          Current tags: <code>{{ JSON.stringify(tags) }}</code>
        </p>
      </div>
    </template>
  </component-section>
</template>
