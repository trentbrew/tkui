<script setup lang="ts">
import { ref, computed } from 'vue'
import type { PropDoc } from '../../components/ComponentDocs.vue'

const breadcrumbItems = ref([
  { label: "Home", link: "/" },
  { label: "Projects", link: "/projects" },
  { label: "Toolkit UI", link: "/projects/toolkit" },
  { label: "Components", link: "/components" },
  { label: "Breadcrumbs", link: "/components/breadcrumbs" },
])

const currentCrumb = ref(breadcrumbItems.value[breadcrumbItems.value.length - 1]?.label ?? "")
const activePath = computed(() => breadcrumbItems.value.map((item) => item.label).join(" / "))

const handleSelect = (label: string) => {
  currentCrumb.value = label
}

const breadcrumbSourceCode = `<template>
  <ui-breadcrumbs :items="items" separator="lucide:more-horizontal" />
</template>

<script setup lang="ts">
const items = [
  { label: "Home", link: "/" },
  { label: "Projects", link: "/projects" },
  { label: "Toolkit UI", link: "/projects/toolkit" },
  { label: "Components", link: "/components" },
  { label: "Breadcrumbs", link: "/components/breadcrumbs" },
]
<\/script>`

const breadcrumbProps: PropDoc[] = [
  { name: 'items', type: 'BreadcrumbItem[]', description: 'Breadcrumb trail items to render' },
  { name: 'separator', type: 'string', default: "'lucide:chevron-right'", description: 'Icon name for the separator' },
  { name: 'class', type: 'string', description: 'Additional classes for the nav wrapper' }
]
</script>

<template>
  <component-section id="breadcrumbs" title="Breadcrumbs"
    description="Show hierarchical navigation with an optional dropdown separator."
    :source-code="breadcrumbSourceCode" :props-docs="breadcrumbProps">
    <ui-breadcrumbs
      :items="breadcrumbItems.map((item) => ({ ...item, click: () => handleSelect(item.label) }))"
      separator="lucide:more-horizontal"
    />

    <template #live>
      <div class="flex flex-col gap-2 text-sm">
        <div class="flex items-center gap-2">
          <ui-badge variant="outline">Active</ui-badge>
          <span class="font-medium">{{ currentCrumb }}</span>
        </div>
        <p class="text-muted-foreground truncate">Path: {{ activePath }}</p>
      </div>
    </template>
  </component-section>
</template>
