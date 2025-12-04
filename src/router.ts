import { type RouteRecordRaw } from "vue-router";

import AppLayout from "./layouts/AppLayout.vue";

// Docs pages
import DocsIndex from "./pages/docs/index.vue";
import DocsGettingStarted from "./pages/docs/getting-started.vue";
import DocsComingSoon from "./pages/docs/coming-soon.vue";

// Examples pages
import ExamplesIndex from "./pages/examples/index.vue";
import ExamplesTaskManager from "./pages/examples/task-manager.vue";

// Themes
import ThemesIndex from "./pages/themes.vue";

// Brand profiles (hidden)
// import BrandProfilesIndex from "./pages/brand-profiles/index.vue";

// Dynamic import for component pages (existing)
const componentPages = import.meta.glob("./pages/components/*.vue");

// Build component routes dynamically
const componentRoutes: RouteRecordRaw[] = [];
for (const path in componentPages) {
  const fileName = path.split("/").pop()?.replace(".vue", "");
  if (fileName === "index") continue;

  componentRoutes.push({
    path: `components/${fileName}`,
    name: `components-${fileName}`,
    component: componentPages[path],
  });
}

export const routes: RouteRecordRaw[] = [
  {
    path: "/",
    component: AppLayout,
    children: [
      // Default redirect to docs
      {
        path: "",
        redirect: "/docs",
      },

      // Docs section
      {
        path: "docs",
        name: "docs",
        component: DocsIndex,
      },
      {
        path: "docs/getting-started",
        name: "docs-getting-started",
        component: DocsGettingStarted,
      },
      {
        path: "docs/installation",
        name: "docs-installation",
        component: DocsGettingStarted, // Reuse for now
      },
      {
        path: "docs/theming",
        name: "docs-theming",
        component: DocsComingSoon,
      },
      {
        path: "docs/coming-soon",
        name: "docs-coming-soon",
        component: DocsComingSoon,
      },

      // Components section
      {
        path: "components",
        name: "components",
        component: () => import("./pages/components/index.vue"),
      },
      ...componentRoutes,

      // Examples section
      {
        path: "examples",
        name: "examples",
        component: ExamplesIndex,
      },
      {
        path: "examples/task-manager",
        name: "examples-task-manager",
        component: ExamplesTaskManager,
      },
      {
        path: "examples/calendar",
        name: "examples-calendar",
        component: () => import("./pages/examples/index.vue"), // Placeholder
      },
      {
        path: "examples/messages",
        name: "examples-messages",
        component: () => import("./pages/examples/index.vue"),
      },
      {
        path: "examples/chatbot",
        name: "examples-chatbot",
        component: () => import("./pages/examples/index.vue"),
      },
      {
        path: "examples/feed",
        name: "examples-feed",
        component: () => import("./pages/examples/index.vue"),
      },
      {
        path: "examples/settings",
        name: "examples-settings",
        component: () => import("./pages/examples/index.vue"),
      },

      // Themes section
      {
        path: "themes",
        name: "themes",
        component: ThemesIndex,
      },

      // Brand Profiles section (hidden)
      // {
      //   path: "brand-profiles",
      //   name: "brand-profiles",
      //   component: BrandProfilesIndex,
      // },
    ],
  },
];
