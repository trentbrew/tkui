<script setup lang="ts">
  import type { PropDoc } from "../../components/ComponentDocs.vue";

  const sourceCode = `<template>
  <!-- Basic editable text -->
  <ui-editable v-model="text" placeholder="Click to edit...">
    <ui-editable-preview />
    <ui-editable-input />
  </ui-editable>

  <!-- With submit/cancel buttons -->
  <ui-editable v-model="text" :submit-mode="'both'">
    <ui-editable-preview />
    <ui-editable-input />
    <div class="flex gap-2 mt-2">
      <ui-editable-submit>
        <ui-button size="sm">Save</ui-button>
      </ui-editable-submit>
      <ui-editable-cancel>
        <ui-button size="sm" variant="outline">Cancel</ui-button>
      </ui-editable-cancel>
    </div>
  </ui-editable>

  <!-- Textarea mode -->
  <ui-editable v-model="text">
    <ui-editable-preview />
    <ui-editable-area />
  </ui-editable>

  <!-- With edit trigger button -->
  <ui-editable v-model="text" :auto-edit="false">
    <div class="flex items-center gap-2">
      <ui-editable-preview />
      <ui-editable-edit>
        <ui-button size="icon-sm" variant="ghost">
          <ui-icon name="lucide:pencil" />
        </ui-button>
      </ui-editable-edit>
    </div>
    <ui-editable-input />
  </ui-editable>
</template>

<script setup>
const text = ref('Click to edit this text')
<\/script>`;

  const propsDocs: PropDoc[] = [
    {
      name: "modelValue",
      type: "string",
      description: "The editable text value (supports v-model)",
    },
    {
      name: "defaultValue",
      type: "string",
      description: "Initial value when uncontrolled",
    },
    {
      name: "placeholder",
      type: "string",
      description: "Placeholder text when empty",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether editing is disabled",
    },
    {
      name: "readOnly",
      type: "boolean",
      default: "false",
      description: "Whether the field is read-only",
    },
    {
      name: "submitMode",
      type: "'blur' | 'enter' | 'both' | 'none'",
      default: "'blur'",
      description: "How changes are submitted",
    },
    {
      name: "activationMode",
      type: "'focus' | 'dblclick' | 'none'",
      default: "'focus'",
      description: "How edit mode is activated",
    },
    {
      name: "selectOnFocus",
      type: "boolean",
      default: "false",
      description: "Whether to select all text on focus",
    },
    {
      name: "autoResize",
      type: "boolean",
      default: "false",
      description: "Whether the input auto-resizes",
    },
  ];

  const basicText = ref("Click to edit this text");
  const titleText = ref("Project Title");
  const descriptionText = ref(
    "This is a longer description that can be edited. Click to modify the content."
  );
</script>

<template>
  <component-section
    id="editable"
    title="Editable"
    description="An inline editable text component that allows users to edit text content directly without navigating to a separate form."
    :source-code="sourceCode"
    :props-docs="propsDocs"
  >
    <div class="flex max-w-md flex-col gap-6">
      <!-- Basic -->
      <div class="space-y-2">
        <label class="text-sm font-medium">Basic Editable</label>
        <ui-editable v-model="basicText" class="w-full">
          <ui-editable-preview class="hover:bg-muted cursor-text rounded px-2 py-1" />
          <ui-editable-input class="rounded border px-2 py-1" />
        </ui-editable>
      </div>

      <!-- Title style -->
      <div class="space-y-2">
        <label class="text-sm font-medium">Editable Title</label>
        <ui-editable v-model="titleText" class="w-full">
          <ui-editable-preview
            class="hover:bg-muted cursor-text rounded px-2 py-1 text-xl font-bold"
          />
          <ui-editable-input class="w-full rounded border px-2 py-1 text-xl font-bold" />
        </ui-editable>
      </div>

      <!-- With textarea -->
      <div class="space-y-2">
        <label class="text-sm font-medium">Editable Description</label>
        <ui-editable v-model="descriptionText" class="w-full">
          <ui-editable-preview
            class="text-muted-foreground hover:bg-muted min-h-[60px] cursor-text rounded px-2 py-1 text-sm"
          />
          <ui-editable-area class="min-h-[60px] w-full rounded border px-2 py-1 text-sm" />
        </ui-editable>
      </div>
    </div>

    <template #live>
      <div class="flex max-w-md flex-col gap-4">
        <div class="space-y-2 rounded-lg border p-4">
          <ui-editable v-model="titleText">
            <ui-editable-preview
              class="hover:bg-muted cursor-text rounded px-1 text-lg font-semibold"
            />
            <ui-editable-input class="w-full rounded border px-1 text-lg font-semibold" />
          </ui-editable>
          <ui-editable v-model="descriptionText">
            <ui-editable-preview
              class="text-muted-foreground hover:bg-muted cursor-text rounded px-1 text-sm"
            />
            <ui-editable-area class="min-h-[40px] w-full rounded border px-1 text-sm" />
          </ui-editable>
        </div>
        <p class="text-muted-foreground text-xs">Click any text above to edit it</p>
      </div>
    </template>
  </component-section>
</template>
