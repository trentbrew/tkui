<script setup lang="ts">
  import type { PropDoc } from "../../components/ComponentDocs.vue";

  import { UiTree, UiTreeFile, UiTreeFolder } from "../../components/Ui/Tree";

  const sourceCode = `<template>
  <ui-tree :initial-expanded-items="['src', 'components']">
    <ui-tree-folder id="src" name="src">
      <ui-tree-folder id="components" name="components">
        <ui-tree-file id="button" name="Button.vue" />
        <ui-tree-file id="input" name="Input.vue" />
        <ui-tree-file id="card" name="Card.vue" />
      </ui-tree-folder>
      <ui-tree-folder id="pages" name="pages">
        <ui-tree-file id="index" name="index.vue" />
        <ui-tree-file id="about" name="about.vue" />
      </ui-tree-folder>
      <ui-tree-file id="app" name="App.vue" />
      <ui-tree-file id="main" name="main.ts" />
    </ui-tree-folder>
    <ui-tree-file id="package" name="package.json" />
    <ui-tree-file id="readme" name="README.md" />
  </ui-tree>
</template>`;

  const propsDocs: PropDoc[] = [
    {
      name: "initialSelectedId",
      type: "string",
      description: "ID of the initially selected item",
    },
    {
      name: "initialExpandedItems",
      type: "string[]",
      description: "Array of folder IDs to expand initially",
    },
    {
      name: "indicator",
      type: "boolean",
      default: "true",
      description: "Whether to show the tree line indicator",
    },
    {
      name: "openIcon",
      type: "string",
      default: "'lucide:folder-open'",
      description: "Icon for expanded folders",
    },
    {
      name: "closeIcon",
      type: "string",
      default: "'lucide:folder'",
      description: "Icon for collapsed folders",
    },
    {
      name: "fileIcon",
      type: "string",
      default: "'lucide:file'",
      description: "Icon for files",
    },
    {
      name: "direction",
      type: "'ltr' | 'rtl'",
      default: "'ltr'",
      description: "Text direction for RTL support",
    },
  ];
</script>

<template>
  <component-section
    id="tree"
    title="Tree"
    description="A hierarchical tree view component for displaying nested data structures like file systems or organizational charts."
    :source-code="sourceCode"
    :props-docs="propsDocs"
  >
    <div class="max-w-sm rounded-lg border p-4">
      <UiTree :initial-expanded-items="['src', 'components']">
        <UiTreeFolder id="src" name="src">
          <UiTreeFolder id="components" name="components">
            <UiTreeFile id="button" name="Button.vue" />
            <UiTreeFile id="input" name="Input.vue" />
            <UiTreeFile id="card" name="Card.vue" />
          </UiTreeFolder>
          <UiTreeFolder id="pages" name="pages">
            <UiTreeFile id="index" name="index.vue" />
            <UiTreeFile id="about" name="about.vue" />
          </UiTreeFolder>
          <UiTreeFile id="app" name="App.vue" />
          <UiTreeFile id="main" name="main.ts" />
        </UiTreeFolder>
        <UiTreeFile id="package" name="package.json" />
        <UiTreeFile id="readme" name="README.md" />
      </UiTree>
    </div>

    <template #live>
      <div class="flex flex-col gap-4">
        <p class="text-muted-foreground text-sm">
          Click folders to expand/collapse, files to select
        </p>
        <div class="max-w-sm rounded-lg border p-4">
          <UiTree
            :initial-expanded-items="['docs']"
            open-icon="lucide:chevron-down"
            close-icon="lucide:chevron-right"
            file-icon="lucide:file-text"
          >
            <UiTreeFolder id="docs" name="Documents">
              <UiTreeFile id="report" name="Report.pdf" />
              <UiTreeFile id="notes" name="Notes.md" />
            </UiTreeFolder>
            <UiTreeFolder id="images" name="Images">
              <UiTreeFile id="photo" name="Photo.jpg" />
            </UiTreeFolder>
          </UiTree>
        </div>
      </div>
    </template>
  </component-section>
</template>
