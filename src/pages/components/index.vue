<script setup lang="ts">
  import { computed, ref } from "vue";

  const componentsList = [
    // Form Inputs
    { name: "Button", icon: "lucide:square", description: "Clickable button for actions." },
    { name: "Input", icon: "lucide:text-cursor-input", description: "Text input field." },
    {
      name: "Code Editor",
      icon: "lucide:code",
      description: "Monaco-powered code editor with syntax highlighting.",
      isNew: true,
    },
    { name: "Textarea", icon: "lucide:align-left", description: "Multi-line text input." },
    { name: "Checkbox", icon: "lucide:check-square", description: "Toggleable checkbox input." },
    { name: "Switch", icon: "lucide:toggle-left", description: "On/off switch control." },
    { name: "Slider", icon: "lucide:sliders-horizontal", description: "Range slider input." },
    {
      name: "Tags Input",
      icon: "lucide:tags",
      description: "Multi-value tag input field.",
      isNew: true,
    },
    {
      name: "Rating",
      icon: "lucide:star",
      description: "Star rating input and display.",
      isNew: true,
    },
    {
      name: "Editable",
      icon: "lucide:pencil",
      description: "Inline editable text field.",
      isNew: true,
    },
    {
      name: "Autocomplete",
      icon: "lucide:sparkles",
      description: "Typeahead input with suggestions.",
    },
    {
      name: "File Upload",
      icon: "lucide:upload",
      description: "Drag-and-drop file upload with previews.",
      isNew: true,
    },

    // Data Display
    { name: "Badge", icon: "lucide:tag", description: "Small label for status or metadata." },
    {
      name: "Chip",
      icon: "lucide:circle-dot",
      description: "Indicator badge for notifications.",
      isNew: true,
    },
    {
      name: "Stats",
      icon: "lucide:bar-chart-2",
      description: "Stat cards for KPIs and metrics.",
      isNew: true,
    },
    { name: "Avatar", icon: "lucide:user-circle", description: "User profile image or initials." },
    { name: "Card", icon: "lucide:credit-card", description: "Container for grouped content." },
    { name: "Table", icon: "lucide:table", description: "Tabular data display." },
    {
      name: "DataTable",
      icon: "lucide:table-2",
      description: "Advanced tables with sorting, filtering, and pagination.",
      isNew: true,
    },
    {
      name: "Tree",
      icon: "lucide:git-branch",
      description: "Hierarchical tree view.",
      isNew: true,
    },
    {
      name: "Timeline",
      icon: "lucide:git-commit",
      description: "Chronological event display.",
      isNew: true,
    },
    { name: "Kbd", icon: "lucide:keyboard", description: "Keyboard shortcut display." },

    // Feedback
    { name: "Alert", icon: "lucide:alert-circle", description: "Feedback message for status." },
    {
      name: "Empty",
      icon: "lucide:inbox",
      description: "Empty state placeholder with actions.",
      isNew: true,
    },
    { name: "Skeleton", icon: "lucide:loader", description: "Loading placeholder animation." },
    { name: "Progress", icon: "lucide:loader-circle", description: "Progress bar indicator." },
    {
      name: "Loader",
      icon: "lucide:refresh-cw",
      description: "Loading spinner indicator.",
      isNew: true,
    },
    { name: "Tooltip", icon: "lucide:message-square", description: "Hover or focus info bubble." },

    // Navigation
    { name: "Tabs", icon: "lucide:panel-top", description: "Tabbed navigation interface." },
    {
      name: "Accordion",
      icon: "lucide:chevrons-down-up",
      description: "Expandable/collapsible sections.",
    },
    {
      name: "Stepper",
      icon: "lucide:list-ordered",
      description: "Multi-step progress indicator.",
      isNew: true,
    },
    {
      name: "Breadcrumbs",
      icon: "lucide:chevrons-right",
      description: "Hierarchy navigation with truncation.",
    },
    { name: "Command", icon: "lucide:command", description: "Command palette and quick launcher." },

    // Overlays
    { name: "Dialog", icon: "lucide:square-stack", description: "Modal dialog overlay." },
    { name: "Popover", icon: "lucide:message-circle", description: "Floating content overlay." },

    // Layout
    { name: "Separator", icon: "lucide:minus", description: "Horizontal or vertical divider." },
    { name: "Divider", icon: "lucide:grip-horizontal", description: "Visual divider for content." },

    // Charts
    { name: "Line Chart", icon: "lucide:trending-up", description: "Line chart visualization." },
    { name: "Bar Chart", icon: "lucide:bar-chart-3", description: "Bar chart visualization." },
    { name: "Area Chart", icon: "lucide:area-chart", description: "Area chart visualization." },
    {
      name: "Donut Chart",
      icon: "lucide:pie-chart",
      description: "Donut/pie chart visualization.",
    },
  ];

  const searchQuery = ref("");
  const filteredComponents = computed(() => {
    if (!searchQuery.value) return componentsList;
    const q = searchQuery.value.toLowerCase();
    return componentsList.filter(
      (c) => c.name.toLowerCase().includes(q) || c.description.toLowerCase().includes(q)
    );
  });
</script>

<template>
  <div class="flex flex-col gap-6 p-6">
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold">Components</h2>
        <p class="text-muted-foreground mt-1 text-sm">
          Browse and explore UI components available in Toolkit UI
        </p>
      </div>
    </div>

    <div class="relative max-w-md">
      <ui-icon
        name="lucide:search"
        class="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
      />
      <ui-input v-model="searchQuery" placeholder="Search components..." class="pl-9" />
    </div>

    <div
      v-if="filteredComponents.length > 0"
      class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <router-link
        v-for="component in filteredComponents"
        :key="component.name"
        :to="`/components/${component.name.toLowerCase().replace(/\s+/g, '-')}`"
      >
        <ui-card
          class="hover:border-primary/50 h-full cursor-pointer transition-all hover:shadow-lg"
        >
          <ui-card-header>
            <ui-icon :name="component.icon" class="text-primary mb-2 size-8" />
            <ui-card-title class="flex items-center gap-2">
              {{ component.name }}
              <ui-badge v-if="component.isNew" variant="secondary" size="sm">New</ui-badge>
            </ui-card-title>
            <ui-card-description>{{ component.description }}</ui-card-description>
          </ui-card-header>
        </ui-card>
      </router-link>
    </div>

    <ui-empty v-else class="py-12">
      <template #icon>
        <ui-icon name="lucide:search-x" class="h-12 w-12" />
      </template>
      <template #title>No components found</template>
      <template #description> Try adjusting your search query </template>
    </ui-empty>
  </div>
</template>
