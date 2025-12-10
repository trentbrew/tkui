<script lang="ts" setup>
  import { computed, onMounted, ref, watch } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import type { NavSection, Organization } from "../components/Layout/types";

  import { OrgSwitcher, SidebarNav, SidebarRail } from "../components/Layout";
  import { componentNavItems, docsNavItems, examplesNavItems } from "../utils/sidebar.nav";

  const route = useRoute();
  const router = useRouter();

  const organizations = ref<Organization[]>([
    { id: "1", name: "Nucor Corporation", logo: "", plan: "Enterprise" },
    { id: "2", name: "Acme Steel", logo: "", plan: "Pro" },
    { id: "3", name: "Midwest Manufacturing", logo: "", plan: "Team" },
  ]);

  const selectedOrg = ref<Organization>(organizations.value[0]);
  const search = ref("");
  const activeSection = ref<NavSection | null>(null);
  const isDark = ref(document.documentElement.classList.contains("dark"));

  // Generate breadcrumbs from route
  const breadcrumbs = computed(() => {
    const crumbs: Array<{ label: string; link: string; icon?: string }> = [
      { label: "Home", link: "/", icon: "lucide:home" },
    ];

    const pathSegments = route.path.split("/").filter(Boolean);
    let currentPath = "";

    for (const segment of pathSegments) {
      currentPath += `/${segment}`;
      const label = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      crumbs.push({ label, link: currentPath });
    }

    return crumbs;
  });

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
  <aside class="bg-primary dark:bg-primary/50 flex h-screen">
    <div class="p-0 flex h-screen w-full">
      <!-- Icon Rail -->
      <SidebarRail
        :sections="navSections"
        :active-section="activeSection"
        :is-dark="isDark"
        @select-section="setActiveSection"
        @toggle-theme="toggleTheme"
      />

      <!-- Section Sidebar -->
      <div v-if="activeSection && route.path !== '/themes'" class="w-[320px] text-white">
        <SidebarNav
          :section="activeSection"
          :items="filteredItems"
          :search="search"
          @update:search="search = $event"
          @action="activeSection.onAction?.()"
        >
          <template #header>
            <OrgSwitcher v-model="selectedOrg" :organizations="organizations" />
          </template>
        </SidebarNav>
      </div>

      <!-- Main Content -->
      <div class="flex-1 p-3 overflow-y-auto">
        <div class="bg-background flex-1 overflow-y-auto rounded-lg h-full">
          <ui-breadcrumbs
            v-if="breadcrumbs.length > 1"
            :items="breadcrumbs"
            class="py-6 pb-7 mt-1 px-6 sticky top-0 bg-background backdrop-blur-2xl z-50"
          />
          <div class="px-6 pb-0 h-full">
            <RouterView />
          </div>
        </div>
      </div>
    </div>
  </aside>
</template>
