<script lang="ts" setup>
  import { computed, onMounted, ref, watch } from "vue";
  import { useRoute, useRouter } from "vue-router";

  import { useBrandProfile } from "../composables/useBrandProfile";
  import { useThemes } from "../composables/useThemes";
  import { componentNavItems, docsNavItems, examplesNavItems } from "../utils/sidebar.nav";

  // Types
  export interface NavItem {
    title: string;
    link: string;
    icon?: string;
    count?: number;
    isGroup?: boolean;
    isNew?: boolean;
  }

  export interface NavSection {
    id: string;
    title: string;
    icon: string;
    description: string;
    basePath: string;
    items: NavItem[];
    actionLabel?: string;
    onAction?: () => void;
  }

  const route = useRoute();
  const router = useRouter();
  const { profiles, createProfile } = useBrandProfile();
  const { presetThemes, customThemes, pinnedThemes } = useThemes();

  // Organization type and data
  interface Organization {
    id: string;
    name: string;
    logo?: string;
    plan: string;
  }

  const organizations = ref<Organization[]>([
    { id: "1", name: "Nucor Corporation", logo: "", plan: "Enterprise" },
    { id: "2", name: "Acme Steel", logo: "", plan: "Pro" },
    { id: "3", name: "Midwest Manufacturing", logo: "", plan: "Team" },
  ]);

  const selectedOrg = ref<Organization>(organizations.value[0]);

  const search = ref("");
  const activeSection = ref<NavSection | null>(null);
  const isDark = ref(document.documentElement.classList.contains("dark"));

  function toggleTheme() {
    isDark.value = !isDark.value;
    document.documentElement.classList.toggle("dark", isDark.value);
    localStorage.setItem("theme-mode", isDark.value ? "dark" : "light");
  }

  // Build nav sections
  const navSections = computed<NavSection[]>(() => [
    {
      id: "organizations",
      title: "Organizations",
      icon: "lucide:grip",
      description: "Manage your organizations",
      basePath: "/organizations",
      items: [],
    },
    {
      id: "docs",
      title: "Documentation",
      icon: "lucide:book-open",
      description: "Guides and references",
      basePath: "/docs",
      items: docsNavItems,
    },
    {
      id: "components",
      title: "Components",
      icon: "lucide:component",
      description: "UI component library",
      basePath: "/components",
      items: componentNavItems,
    },
    {
      id: "examples",
      title: "Examples",
      icon: "lucide:layout-template",
      description: "Full-page templates",
      basePath: "/examples",
      items: examplesNavItems,
    },
    {
      id: "themes",
      title: "Themes",
      icon: "lucide:sun-moon",
      description: "Color schemes & styles",
      basePath: "/themes",
      actionLabel: "New Theme",
      onAction: () => {
        router.push("/themes?create=true");
      },
      items: [
        { title: "Pinned", isGroup: true, link: "" },
        ...pinnedThemes.value.slice(0, 5).map((t) => ({
          title: t.name,
          link: "/themes",
          icon: "lucide:star",
          isGroup: false,
        })),
        { title: "Custom", isGroup: true, link: "" },
        ...customThemes.value.slice(0, 5).map((t) => ({
          title: t.name,
          link: "/themes",
          icon: "lucide:paintbrush",
          isGroup: false,
        })),
        { title: "Presets", isGroup: true, link: "" },
        ...presetThemes.value.slice(0, 8).map((t) => ({
          title: t.name,
          link: "/themes",
          icon: "lucide:palette",
          isGroup: false,
        })),
      ].filter((item) => item.isGroup || item.title), // Filter empty groups
    },
  ]);

  const filteredItems = computed(() => {
    if (!activeSection.value) return [];
    const items = activeSection.value.items;
    if (!search.value) return items;
    const q = search.value.toLowerCase();
    return items.filter((item) => item.isGroup || item.title.toLowerCase().includes(q));
  });

  function setActiveSection(section: NavSection) {
    activeSection.value = section;
    // Navigate to section's base path if not already there
    if (!route.path.startsWith(section.basePath)) {
      router.push(section.basePath);
    }
  }

  // Sync active section with route
  function syncSectionFromRoute() {
    const path = route.path;
    const matched = navSections.value.find((s) => path.startsWith(s.basePath));
    if (matched && matched.id !== activeSection.value?.id) {
      activeSection.value = matched;
    }
  }

  watch(() => route.path, syncSectionFromRoute);

  onMounted(() => {
    // Restore theme preference
    const stored = localStorage.getItem("theme-mode");
    if (stored) {
      isDark.value = stored === "dark";
      document.documentElement.classList.toggle("dark", isDark.value);
    }
    // Set initial section from route or default to docs
    syncSectionFromRoute();
    if (!activeSection.value) {
      setActiveSection(navSections.value[0]);
    }
  });
</script>

<template>
  <aside class="flex h-screen">
    <!-- Icon Rail -->
    <div
      class="bg-sidebar-primary text-sidebar-primary-foreground flex w-16 flex-col items-center py-4"
    >
      <!-- Logo -->
      <!-- <div class="mb-4">
        <RouterLink to="/">
          <img src="/toolkit.png" alt="Toolkit UI" class="size-8 rounded object-contain" />
        </RouterLink>
      </div> -->

      <!-- Main Nav Icons -->
      <nav class="flex flex-1 flex-col gap-2">
        <div v-for="(section, i) in navSections" :key="i">
          <ui-tooltip>
            <ui-tooltip-trigger as-child>
              <ui-button
                :variant="activeSection?.id === section.id ? 'secondary' : 'ghost'"
                size="icon"
                @click="setActiveSection(section)"
              >
                <ui-icon :name="section.icon" class="size-[18px]" />
              </ui-button>
            </ui-tooltip-trigger>
            <ui-tooltip-content side="right">{{ section.title }}</ui-tooltip-content>
          </ui-tooltip>
        </div>
      </nav>

      <!-- Theme Toggle -->
      <ui-tooltip>
        <ui-tooltip-trigger as-child>
          <ui-button variant="ghost" size="icon" @click="toggleTheme">
            <ui-icon :name="isDark ? 'lucide:sun' : 'lucide:moon'" class="size-[18px]" />
          </ui-button>
        </ui-tooltip-trigger>
        <ui-tooltip-content side="right">{{
          isDark ? "Light mode" : "Dark mode"
        }}</ui-tooltip-content>
      </ui-tooltip>

      <!-- Settings Button -->
      <ui-tooltip>
        <ui-tooltip-trigger as-child>
          <ui-button variant="ghost" size="icon">
            <ui-icon name="lucide:settings" class="size-[18px]" />
          </ui-button>
        </ui-tooltip-trigger>
        <ui-tooltip-content side="right">Settings</ui-tooltip-content>
      </ui-tooltip>
    </div>

    <!-- Section Sidebar -->
    <div
      v-if="activeSection && route.path !== '/themes'"
      class="bg-sidebar-primary/80 text-sidebar-primary-foreground border-sidebar-primary/50 w-[260px] border-r"
    >
      <ui-scroll-area class="h-full">
        <div class="flex h-screen flex-col p-4">
          <!-- Org Switcher -->
          <ui-dropdown-menu>
            <ui-dropdown-menu-trigger as-child>
              <button
                class="mb-4 flex w-full items-center gap-3 rounded-md bg-white/10 px-3 py-2 text-left transition-colors hover:bg-white/20"
              >
                <ui-avatar
                  :src="selectedOrg.logo"
                  :fallback="selectedOrg.name.charAt(0)"
                  class="size-8 rounded-md"
                />
                <div class="flex-1 truncate">
                  <p class="text-sm font-medium">{{ selectedOrg.name }}</p>
                  <p class="text-xs opacity-60">{{ selectedOrg.plan }}</p>
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
                @click="selectedOrg = org"
                class="gap-3"
              >
                <ui-avatar
                  :src="org.logo"
                  :fallback="org.name.charAt(0)"
                  class="size-6 rounded-md"
                />
                <span class="flex-1 truncate">{{ org.name }}</span>
                <ui-icon
                  v-if="selectedOrg.id === org.id"
                  name="lucide:check"
                  class="text-primary size-4"
                />
              </ui-dropdown-menu-item>
              <ui-dropdown-menu-separator />
              <ui-dropdown-menu-item>
                <ui-icon name="lucide:plus" class="mr-2 size-4" />
                Add organization
              </ui-dropdown-menu-item>
            </ui-dropdown-menu-content>
          </ui-dropdown-menu>

          <div class="mb-4">
            <ui-input
              v-model="search"
              placeholder="Search..."
              class="border-white/20 bg-white/10 pl-3 text-inherit placeholder:text-white/60 focus:border-white/40"
            />
          </div>

          <nav class="flex flex-1 flex-col gap-1 overflow-y-auto">
            <template v-for="(item, i) in filteredItems" :key="`${item.title}-${i}`">
              <!-- Group header -->
              <div
                v-if="item.isGroup"
                class="mt-3 mb-1 px-2 text-xs font-medium tracking-wider uppercase opacity-60"
              >
                {{ item.title }}
              </div>
              <!-- Nav item -->
              <RouterLink v-else :to="item.link" custom v-slot="{ isActive, navigate }">
                <ui-button
                  size="sm"
                  :variant="isActive ? 'secondary' : 'ghost'"
                  class="w-full justify-start gap-3 px-2"
                  @click="navigate"
                >
                  <ui-icon v-if="item.icon" :name="item.icon" class="size-4 opacity-70" />
                  <span>{{ item.title }}</span>
                  <ui-badge
                    v-if="item.isNew"
                    class="ml-auto border-0 bg-white/20 !px-2 py-0 text-[10px] text-white"
                    >New</ui-badge
                  >
                  <span v-else-if="item.count" class="ml-auto text-xs opacity-60">
                    {{ item.count }}
                  </span>
                </ui-button>
              </RouterLink>
            </template>
          </nav>

          <!-- Section Action Button -->
          <ui-button
            v-if="activeSection.actionLabel"
            class="mt-4 w-full"
            size="sm"
            @click="activeSection.onAction?.()"
          >
            <ui-icon name="lucide:plus" class="mr-2 size-4" />
            {{ activeSection.actionLabel }}
          </ui-button>
        </div>
      </ui-scroll-area>
    </div>

    <!-- Main Content -->
    <div class="bg-background flex-1 overflow-y-auto p-6">
      <RouterView />
    </div>
  </aside>
</template>
