import type { ComputedRef } from "vue";

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

/**
 * Static navigation items for the Components section
 */
export const componentNavItems: NavItem[] = [
  // Actions
  { title: "Actions", isGroup: true, link: "" },
  { title: "Button", link: "/components/button", icon: "lucide:square" },
  { title: "Badge", link: "/components/badge", icon: "lucide:tag" },

  // Forms
  { title: "Forms", isGroup: true, link: "" },
  { title: "Input", link: "/components/input", icon: "lucide:text-cursor-input" },
  { title: "Code Editor", link: "/components/code-editor", icon: "lucide:code", isNew: true },
  { title: "Textarea", link: "/components/textarea", icon: "lucide:align-left" },
  { title: "Checkbox", link: "/components/checkbox", icon: "lucide:check-square" },
  { title: "Switch", link: "/components/switch", icon: "lucide:toggle-left" },
  { title: "Slider", link: "/components/slider", icon: "lucide:sliders-horizontal" },
  { title: "Tags Input", link: "/components/tags-input", icon: "lucide:tags", isNew: true },
  { title: "Rating", link: "/components/rating", icon: "lucide:star", isNew: true },
  { title: "Editable", link: "/components/editable", icon: "lucide:pencil", isNew: true },
  { title: "File Upload", link: "/components/file-upload", icon: "lucide:upload", isNew: true },

  // Layout
  { title: "Layout", isGroup: true, link: "" },
  { title: "Card", link: "/components/card", icon: "lucide:credit-card" },
  { title: "Dialog", link: "/components/dialog", icon: "lucide:square-stack" },
  { title: "Tabs", link: "/components/tabs", icon: "lucide:panel-top" },
  { title: "Accordion", link: "/components/accordion", icon: "lucide:chevrons-down-up" },
  { title: "Collapsible", link: "/components/collapsible", icon: "lucide:chevron-down" },
  { title: "Separator", link: "/components/separator", icon: "lucide:minus" },
  { title: "Divider", link: "/components/divider", icon: "lucide:grip-horizontal" },

  // Feedback
  { title: "Feedback", isGroup: true, link: "" },
  { title: "Alert", link: "/components/alert", icon: "lucide:alert-circle" },
  { title: "Empty", link: "/components/empty", icon: "lucide:inbox", isNew: true },
  { title: "Skeleton", link: "/components/skeleton", icon: "lucide:loader" },
  { title: "Progress", link: "/components/progress", icon: "lucide:loader-circle" },
  { title: "Loader", link: "/components/loader", icon: "lucide:refresh-cw", isNew: true },
  { title: "Tooltip", link: "/components/tooltip", icon: "lucide:message-square" },
  { title: "Popover", link: "/components/popover", icon: "lucide:message-circle" },

  // Data Display
  { title: "Data Display", isGroup: true, link: "" },
  { title: "Avatar", link: "/components/avatar", icon: "lucide:user-circle" },
  { title: "Stats", link: "/components/stats", icon: "lucide:bar-chart-2", isNew: true },
  { title: "Chip", link: "/components/chip", icon: "lucide:circle-dot", isNew: true },
  { title: "Table", link: "/components/table", icon: "lucide:table" },
  { title: "DataTable", link: "/components/datatable", icon: "lucide:table-2", isNew: true },
  { title: "Tree", link: "/components/tree", icon: "lucide:git-branch", isNew: true },
  { title: "Timeline", link: "/components/timeline", icon: "lucide:git-commit", isNew: true },
  { title: "Kbd", link: "/components/kbd", icon: "lucide:keyboard" },

  // Navigation
  { title: "Navigation", isGroup: true, link: "" },
  { title: "Breadcrumbs", link: "/components/breadcrumbs", icon: "lucide:chevrons-right" },
  { title: "Stepper", link: "/components/stepper", icon: "lucide:list-ordered", isNew: true },

  // Search
  { title: "Search", isGroup: true, link: "" },
  { title: "Command", link: "/components/command", icon: "lucide:command" },
  { title: "Autocomplete", link: "/components/autocomplete", icon: "lucide:sparkles" },

  // Charts
  { title: "Charts", isGroup: true, link: "" },
  { title: "Line Chart", link: "/components/line-chart", icon: "lucide:trending-up" },
  { title: "Bar Chart", link: "/components/bar-chart", icon: "lucide:bar-chart-3" },
  { title: "Area Chart", link: "/components/area-chart", icon: "lucide:area-chart" },
  { title: "Donut Chart", link: "/components/donut-chart", icon: "lucide:pie-chart" },
];

/**
 * Static navigation items for the Documentation section
 */
export const docsNavItems: NavItem[] = [
  { title: "Getting Started", link: "/docs/getting-started", icon: "lucide:rocket" },
  { title: "Installation", link: "/docs/installation", icon: "lucide:download" },
  { title: "Theming", link: "/docs/theming", icon: "lucide:palette" },
  { title: "Coming Soon", link: "/docs/coming-soon", icon: "lucide:clock" },
];

/**
 * Static navigation items for the Examples section
 */
export const examplesNavItems: NavItem[] = [
  // Nucor Portals
  { title: "Nucor Portals", isGroup: true, link: "" },
  {
    title: "Compliance Dashboard",
    link: "/examples/compliance-dashboard",
    icon: "lucide:shield-check",
    isNew: true,
  },
  { title: "Data Table", link: "/examples/data-table", icon: "lucide:table-2", isNew: true },

  // General
  { title: "General", isGroup: true, link: "" },
  { title: "Task Manager", link: "/examples/task-manager", icon: "lucide:check-square" },
  { title: "Calendar", link: "/examples/calendar", icon: "lucide:calendar" },
  { title: "Messages", link: "/examples/messages", icon: "lucide:message-square" },
  { title: "Chatbot", link: "/examples/chatbot", icon: "lucide:bot" },
  { title: "Feed", link: "/examples/feed", icon: "lucide:rss" },
  { title: "Settings", link: "/examples/settings", icon: "lucide:settings" },
];
