<template>
  <aside class="flex h-screen">
    <!-- Icon Rail -->
    <div class="bg-primary text-primary-foreground flex w-16 flex-col items-center border-r py-4">
      <!-- Logo -->
      <div class="mb-10">
        <RouterLink to="/components">
          <ui-avatar src="/icon.png" alt="Company Logo" class="size-8 rounded object-contain" />
        </RouterLink>
      </div>

      <!-- Main Nav Icons -->
      <nav class="flex flex-1 flex-col gap-2">
        <div v-for="(item, i) in mainNav" :key="i">
          <ui-tooltip>
            <ui-tooltip-trigger as-child>
              <ui-button
                :variant="item.active === activeSection?.active ? 'secondary' : 'ghost'"
                size="icon"
                @click="setActiveSection(item)"
              >
                <ui-icon :name="item.icon" class="size-[18px]" />
              </ui-button>
            </ui-tooltip-trigger>
            <ui-tooltip-content side="right">{{ item.title }}</ui-tooltip-content>
          </ui-tooltip>
        </div>
      </nav>

      <ui-divider class="my-2" />

      <!-- Settings Button -->
      <ui-tooltip>
        <ui-tooltip-trigger as-child>
          <ui-button variant="ghost" size="icon">
            <ui-icon name="lucide:settings" class="size-[18px]" />
          </ui-button>
        </ui-tooltip-trigger>
        <ui-tooltip-content side="right">Settings</ui-tooltip-content>
      </ui-tooltip>

      <!-- User Menu -->
      <ui-dropdown-menu>
        <ui-dropdown-menu-trigger>
          <ui-avatar :src="user.avatar" class="mt-4" />
        </ui-dropdown-menu-trigger>
        <ui-dropdown-menu-content side="right">
          <ui-dropdown-menu-label class="flex flex-col">
            <span>{{ user.username }}</span>
            <span class="text-muted-foreground text-sm font-normal">{{ user.email }}</span>
          </ui-dropdown-menu-label>
          <ui-dropdown-menu-separator />
          <ui-dropdown-menu-item title="View profile" icon="lucide:user" />
          <ui-dropdown-menu-item title="Edit profile" icon="lucide:pen" />
          <ui-dropdown-menu-item title="Change password" icon="lucide:lock" />
          <ui-dropdown-menu-item title="Delete account" icon="lucide:trash" />
          <ui-dropdown-menu-separator />
          <ui-dropdown-menu-item variant="destructive" title="Logout" icon="lucide:log-out" />
        </ui-dropdown-menu-content>
      </ui-dropdown-menu>
    </div>

    <!-- Section Sidebar -->
    <div v-if="activeSection" class="bg-background w-[280px] border-r">
      <ui-scroll-area class="h-full">
        <div class="flex h-screen flex-col p-4">
          <div class="mb-6">
            <div class="mb-2 flex items-center gap-2">
              <ui-icon :name="activeSection.icon" class="text-primary size-5" />
              <h2 class="font-semibold">{{ activeSection.title }}</h2>
            </div>
            <p class="text-muted-foreground text-sm">{{ activeSection.description }}</p>
          </div>

          <div class="mb-4">
            <ui-input v-model="search" placeholder="Search..." class="pl-9" />
          </div>

          <nav class="flex flex-1 flex-col gap-1">
            <div v-for="(item, i) in activeSection.items" :key="`${item.title}-${i}-${item.icon}`">
              <RouterLink :to="item.link">
                <ui-button size="sm" variant="ghost" class="w-full justify-start gap-3 px-2">
                  <ui-icon
                    v-if="item.icon"
                    :name="item.icon"
                    class="text-muted-foreground size-4"
                  />
                  <span>{{ item.title }}</span>
                  <span v-if="item.count" class="text-muted-foreground ml-auto text-xs">
                    {{ item.count }}
                  </span>
                </ui-button>
              </RouterLink>
            </div>
          </nav>

          <ui-button class="mt-auto w-full" size="sm">
            <ui-icon name="lucide:plus" class="size-4" />
            New {{ activeSection.title }}
          </ui-button>
        </div>
      </ui-scroll-area>
    </div>

    <!-- Main Content Slot -->
    <div class="flex-1">
      <slot />
    </div>
  </aside>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from "vue";

  // Types
  type NavItem = {
    title: string;
    icon: string;
    active: boolean;
    description: string;
    items: Array<{
      title: string;
      link: string;
      icon?: string;
      count?: number;
    }>;
  };

  const search = ref<string>("");
  const activeSection = ref<NavItem | null>(null);

  const user = {
    avatar: "https://randomuser.me/api/portraits/med/women/67.jpg",
    username: "Sarah Smith",
    email: "sarah.smith@example.com",
  };

  // Example nav config (can be provided via props in future)
  const mainNav: Array<NavItem> = [
    {
      title: "Projects",
      icon: "lucide:folder",
      active: false,
      description: "Manage your projects and workspaces",
      items: [
        { title: "All Projects", link: "/components", icon: "lucide:grid-3x3", count: 24 },
        { title: "Active", link: "/components", icon: "lucide:play", count: 8 },
        { title: "Archived", link: "/components", icon: "lucide:archive", count: 16 },
        {
          title: "Templates",
          link: "/components/toolkitui/templates",
          icon: "lucide:layout-template",
        },
      ],
    },
    {
      title: "Tasks",
      icon: "lucide:check-square",
      active: false,
      description: "View and manage your tasks",
      items: [
        { title: "My Tasks", link: "/components", icon: "lucide:user", count: 12 },
        { title: "Assigned to me", link: "/components", icon: "lucide:user-check", count: 8 },
        { title: "Completed", link: "/components", icon: "lucide:check-circle-2", count: 45 },
        { title: "Overdue", link: "/components", icon: "lucide:alert-circle", count: 3 },
      ],
    },
    {
      title: "Team",
      icon: "lucide:users",
      active: false,
      description: "Collaborate with your team members",
      items: [
        { title: "All Members", link: "/components", icon: "lucide:users", count: 32 },
        { title: "Departments", link: "/components", icon: "lucide:building-2" },
        { title: "Invitations", link: "/components", icon: "lucide:mail", count: 2 },
        { title: "Activity", link: "/components", icon: "lucide:activity" },
      ],
    },
    {
      title: "Messages",
      icon: "lucide:message-square",
      active: false,
      description: "Team communication and messages",
      items: [
        { title: "Inbox", link: "/components", icon: "lucide:inbox", count: 5 },
        { title: "Sent", link: "/components", icon: "lucide:send" },
        { title: "Drafts", link: "/components", icon: "lucide:file-edit", count: 2 },
        { title: "Archived", link: "/components", icon: "lucide:archive" },
      ],
    },
  ];

  const setActiveSection = (item: NavItem) => {
    mainNav.forEach((nav) => (nav.active = false));
    item.active = true;
    activeSection.value = item;
  };

  onMounted(() => {
    setActiveSection(mainNav[0]);
  });
</script>
