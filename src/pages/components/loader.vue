<script setup lang="ts">
  import type { PropDoc } from "../../components/ComponentDocs.vue";

  const sourceCode = `<template>
  <!-- Basic inline loader -->
  <ui-loader />

  <!-- With text -->
  <ui-loader text="Loading..." />

  <!-- Custom icon -->
  <ui-loader icon="svg-spinners:ring-resize" />

  <!-- Full page loader -->
  <ui-loader v-model="isLoading" :full-page="true" text="Please wait..." />

  <!-- Without scroll lock -->
  <ui-loader v-model="isLoading" :full-page="true" :lock-scroll="false" />

  <!-- Disable escape to close -->
  <ui-loader v-model="isLoading" :full-page="true" :close-on-escape="false" />
</template>

<script setup>
const isLoading = ref(false)
<\/script>`;

  const propsDocs: PropDoc[] = [
    {
      name: "modelValue",
      type: "boolean",
      default: "true",
      description: "Controls visibility of the loader (supports v-model)",
    },
    {
      name: "icon",
      type: "string",
      default: "'svg-spinners:bars-rotate-fade'",
      description: "Icon to display as the loading indicator",
    },
    {
      name: "text",
      type: "string",
      description: "Text to display below the loading icon",
    },
    {
      name: "fullPage",
      type: "boolean",
      default: "false",
      description: "Whether the loader covers the entire page with a backdrop",
    },
    {
      name: "lockScroll",
      type: "boolean",
      default: "true",
      description: "Whether to prevent body scrolling when loader is visible",
    },
    {
      name: "closeOnEscape",
      type: "boolean",
      default: "true",
      description: "Whether pressing Escape closes the full-page loader",
    },
    {
      name: "class",
      type: "string",
      description: "Additional classes for the loader icon",
    },
    {
      name: "backdropClass",
      type: "string",
      description: "Additional classes for the backdrop element",
    },
    {
      name: "role",
      type: "string",
      default: "'progressbar'",
      description: "ARIA role for accessibility",
    },
  ];

  const showFullPage = ref(false);

  function triggerFullPage() {
    showFullPage.value = true;
    setTimeout(() => {
      showFullPage.value = false;
    }, 2000);
  }
</script>

<template>
  <component-section
    id="loader"
    title="Loader"
    description="A loading indicator component that can be used inline or as a full-page overlay with backdrop blur."
    :source-code="sourceCode"
    :props-docs="propsDocs"
  >
    <div class="flex flex-col gap-6">
      <!-- Inline loaders -->
      <div class="flex items-center gap-8">
        <div class="flex flex-col items-center gap-2">
          <ui-loader />
          <span class="text-muted-foreground text-xs">Default</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <ui-loader icon="svg-spinners:ring-resize" />
          <span class="text-muted-foreground text-xs">Ring</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <ui-loader icon="svg-spinners:pulse-3" />
          <span class="text-muted-foreground text-xs">Pulse</span>
        </div>
        <div class="flex flex-col items-center gap-2">
          <ui-loader icon="svg-spinners:bouncing-ball" />
          <span class="text-muted-foreground text-xs">Bounce</span>
        </div>
      </div>

      <!-- With text -->
      <div class="flex items-center gap-4">
        <ui-loader text="Loading data..." />
      </div>
    </div>

    <template #live>
      <div class="flex flex-col gap-4">
        <ui-button @click="triggerFullPage"> Show Full Page Loader (2s) </ui-button>
        <p class="text-muted-foreground text-sm">Press <ui-kbd>Esc</ui-kbd> to close early</p>
      </div>
      <ui-loader v-model="showFullPage" :full-page="true" text="Loading..." />
    </template>
  </component-section>
</template>
