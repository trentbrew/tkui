<script setup lang="ts">
import { useTheme } from "~/composables/useTheme";
import { useBreadcrumbs } from "~/composables/useBreadcrumbs";
import ThemeSelector from "~/components/ThemeSelector.vue";

const { theme, toggleTheme } = useTheme();
const route = useRoute();
const { breadcrumbs } = useBreadcrumbs();

const isDark = computed(() => theme.value === "dark");

const activeComponent = computed(() => {
  return route.path.split("/").pop();
});

const categories = [
  {
    id: "actions",
    label: "Actions",
    icon: "lucide:mouse-pointer-click",
    components: [
      { id: "button", name: "Button" },
      { id: "badge", name: "Badge" },
    ],
  },
  {
    id: "forms",
    label: "Forms",
    icon: "lucide:file-input",
    components: [
      { id: "input", name: "Input" },
      { id: "textarea", name: "Textarea" },
      { id: "checkbox", name: "Checkbox" },
      { id: "switch", name: "Switch" },
      { id: "slider", name: "Slider" },
    ],
  },
  {
    id: "layout",
    label: "Layout",
    icon: "lucide:layout-grid",
    components: [
      { id: "card", name: "Card" },
      { id: "separator", name: "Separator" },
      { id: "divider", name: "Divider" },
    ],
  },
  {
    id: "feedback",
    label: "Feedback",
    icon: "lucide:bell",
    components: [
      { id: "alert", name: "Alert" },
      { id: "skeleton", name: "Skeleton" },
      { id: "progress", name: "Progress" },
    ],
  },
  {
    id: "display",
    label: "Data Display",
    icon: "lucide:database",
    components: [
      { id: "avatar", name: "Avatar" },
      { id: "tooltip", name: "Tooltip" },
      { id: "kbd", name: "Keyboard" },
      { id: "table", name: "Table" },
    ],
  },
  {
    id: "overlays",
    label: "Overlays",
    icon: "lucide:layers",
    components: [
      { id: "dialog", name: "Dialog" },
      { id: "popover", name: "Popover" },
    ],
  },
  {
    id: "navigation",
    label: "Navigation",
    icon: "lucide:navigation",
    components: [
      { id: "tabs", name: "Tabs" },
      { id: "accordion", name: "Accordion" },
      { id: "collapsible", name: "Collapsible" },
      { id: "breadcrumbs", name: "Breadcrumbs" },
    ],
  },
  {
    id: "search",
    label: "Search",
    icon: "lucide:search",
    components: [
      { id: "command", name: "Command" },
      { id: "autocomplete", name: "Autocomplete" },
    ],
  },
  {
    id: "charts",
    label: "Charts",
    icon: "lucide:bar-chart-3",
    components: [
      { id: "line-chart", name: "Line Chart" },
      { id: "area-chart", name: "Area Chart" },
      { id: "bar-chart", name: "Bar Chart" },
      { id: "donut-chart", name: "Donut Chart" },
    ],
  },
  {
    id: "tasks",
    label: "Task Management",
    icon: "lucide:list-todo",
    components: [{ id: "task-management", name: "Task Management" }],
  },
];
</script>

<template>
  <ui-sidebar-provider>
    <ui-sidebar collapsible="icon">
      <ui-sidebar-header>
        <ui-sidebar-menu>
          <ui-sidebar-menu-item>
            <ui-sidebar-menu-button as-child>
              <router-link to="/">
                <ui-icon name="lucide:home" />
                <span>Home</span>
              </router-link>
            </ui-sidebar-menu-button>
          </ui-sidebar-menu-item>
          <ui-sidebar-menu-item>
            <ui-sidebar-menu-button as-child>
              <router-link to="/components/toolkitui/brand-profiles">
                <ui-icon name="lucide:palette" />
                <span>Brand Profiles</span>
              </router-link>
            </ui-sidebar-menu-button>
          </ui-sidebar-menu-item>
        </ui-sidebar-menu>
      </ui-sidebar-header>

      <ui-sidebar-content>
        <ui-sidebar-group>
          <ui-sidebar-group-label>Toolkit UI</ui-sidebar-group-label>
          <ui-sidebar-group-content>
            <ui-sidebar-menu>
              <ui-sidebar-menu-item>
                <ui-sidebar-menu-button as-child :is-active="route.path.startsWith('/components/toolkitui/components')">
                  <router-link to="/components/toolkitui/components">
                    <ui-icon name="lucide:blocks" />
                    <span>UI Components</span>
                  </router-link>
                </ui-sidebar-menu-button>
              </ui-sidebar-menu-item>
              <ui-sidebar-menu-item>
                <ui-sidebar-menu-button as-child
                  :is-active="route.path.startsWith('/components/toolkitui/brand-profiles')">
                  <router-link to="/components/toolkitui/brand-profiles">
                    <ui-icon name="lucide:palette" />
                    <span>Brand Profiles</span>
                  </router-link>
                </ui-sidebar-menu-button>
              </ui-sidebar-menu-item>
              <ui-sidebar-menu-item>
                <ui-sidebar-menu-button as-child :is-active="route.path.startsWith('/components/toolkitui/templates')">
                  <router-link to="/components/toolkitui/templates">
                    <ui-icon name="lucide:layout-grid" />
                    <span>Templates</span>
                  </router-link>
                </ui-sidebar-menu-button>
              </ui-sidebar-menu-item>
              <ui-sidebar-menu-item>
                <ui-sidebar-menu-button as-child :is-active="route.path.startsWith('/components/toolkitui/docs')">
                  <router-link to="/components/toolkitui/docs">
                    <ui-icon name="lucide:book-open" />
                    <span>Docs</span>
                  </router-link>
                </ui-sidebar-menu-button>
              </ui-sidebar-menu-item>
            </ui-sidebar-menu>
          </ui-sidebar-group-content>
        </ui-sidebar-group>
        <ui-sidebar-group>
          <ui-sidebar-group-label>Components</ui-sidebar-group-label>
          <ui-sidebar-group-content>
            <ui-sidebar-menu>
              <ui-collapsible v-for="category in categories" :key="category.id" :default-open="true"
                class="group/collapsible">
                <ui-sidebar-menu-item>
                  <ui-collapsible-trigger as-child>
                    <ui-sidebar-menu-button>
                      <ui-icon :name="category.icon" />
                      <span>{{ category.label }}</span>
                      <ui-icon name="lucide:chevron-right"
                        class="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                    </ui-sidebar-menu-button>
                  </ui-collapsible-trigger>
                  <ui-collapsible-content>
                    <ui-sidebar-menu-sub>
                      <ui-sidebar-menu-sub-item v-for="component in category.components" :key="component.id">
                        <ui-sidebar-menu-sub-button as-child :is-active="activeComponent === component.id">
                          <router-link :to="`/components/${component.id}`">
                            {{ component.name }}
                          </router-link>
                        </ui-sidebar-menu-sub-button>
                      </ui-sidebar-menu-sub-item>
                    </ui-sidebar-menu-sub>
                  </ui-collapsible-content>
                </ui-sidebar-menu-item>
              </ui-collapsible>
            </ui-sidebar-menu>
          </ui-sidebar-group-content>
        </ui-sidebar-group>
      </ui-sidebar-content>
    </ui-sidebar>

    <ui-sidebar-inset>
      <ui-navbar sticky>
        <div class="flex h-14 w-full items-center gap-4 px-6">
          <ui-sidebar-trigger />
          <div class="flex-1">
            <ui-breadcrumbs :items="breadcrumbs" />
          </div>
          <ThemeSelector />
          <ui-button variant="ghost" size="icon-sm" :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="toggleTheme()">
            <ui-icon :name="isDark ? 'lucide:moon' : 'lucide:sun'" />
          </ui-button>
        </div>
      </ui-navbar>

      <main class="flex-1 overflow-y-auto p-6 bg-red-500">
        <div class="mx-auto max-w-6xl space-y-16 p-4">
          <router-view />
        </div>
      </main>
    </ui-sidebar-inset>
  </ui-sidebar-provider>
</template>
