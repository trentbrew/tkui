<template>
  <div class="p-6">
    <h1 class="mb-2 text-3xl font-bold">Examples</h1>
    <p class="text-muted-foreground mb-8">
      Full-page templates and application examples built with Toolkit UI.
    </p>

    <!-- Nucor Portals Section -->
    <h2 class="mb-4 flex items-center gap-2 text-lg font-semibold">
      <ui-icon name="lucide:building-2" class="size-5" />
      Nucor Portals
    </h2>
    <div class="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <RouterLink to="/examples/compliance-dashboard">
        <ui-card class="border-primary/20 h-full cursor-pointer transition-shadow hover:shadow-lg">
          <ui-card-header>
            <div class="mb-2 flex items-center gap-2">
              <ui-icon name="lucide:shield-check" class="text-primary size-8" />
              <ui-badge variant="secondary" class="text-xs">New</ui-badge>
            </div>
            <ui-card-title>Compliance Dashboard</ui-card-title>
            <ui-card-description
              >Environmental & safety compliance overview with metrics, tasks, and audit
              tracking</ui-card-description
            >
          </ui-card-header>
        </ui-card>
      </RouterLink>

      <RouterLink to="/examples/data-table">
        <ui-card class="border-primary/20 h-full cursor-pointer transition-shadow hover:shadow-lg">
          <ui-card-header>
            <div class="mb-2 flex items-center gap-2">
              <ui-icon name="lucide:table-2" class="text-primary size-8" />
              <ui-badge variant="secondary" class="text-xs">New</ui-badge>
            </div>
            <ui-card-title>Data Table</ui-card-title>
            <ui-card-description
              >Advanced data table with filtering, sorting, pagination, and bulk
              actions</ui-card-description
            >
          </ui-card-header>
        </ui-card>
      </RouterLink>
    </div>

    <!-- General Examples Section -->
    <h2 class="mb-4 flex items-center gap-2 text-lg font-semibold">
      <ui-icon name="lucide:layout-grid" class="size-5" />
      General
    </h2>
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <RouterLink to="/examples/task-manager">
        <ui-card class="h-full cursor-pointer transition-shadow hover:shadow-lg">
          <ui-card-header>
            <ui-icon name="lucide:check-square" class="text-primary mb-2 size-8" />
            <ui-card-title>Task Manager</ui-card-title>
            <ui-card-description>Kanban-style task management app</ui-card-description>
          </ui-card-header>
        </ui-card>
      </RouterLink>

      <RouterLink to="/examples/calendar">
        <ui-card class="cursor-pointer transition-shadow hover:shadow-lg">
          <ui-card-header>
            <ui-icon name="lucide:calendar" class="text-primary mb-2 size-8" />
            <ui-card-title>Calendar</ui-card-title>
            <ui-card-description>Event scheduling and calendar view</ui-card-description>
          </ui-card-header>
        </ui-card>
      </RouterLink>

      <RouterLink to="/examples/messages">
        <ui-card class="cursor-pointer transition-shadow hover:shadow-lg">
          <ui-card-header>
            <ui-icon name="lucide:message-square" class="text-primary mb-2 size-8" />
            <ui-card-title>Messages</ui-card-title>
            <ui-card-description>Chat and messaging interface</ui-card-description>
          </ui-card-header>
        </ui-card>
      </RouterLink>

      <RouterLink to="/examples/chatbot">
        <ui-card class="cursor-pointer transition-shadow hover:shadow-lg">
          <ui-card-header>
            <ui-icon name="lucide:bot" class="text-primary mb-2 size-8" />
            <ui-card-title>Chatbot</ui-card-title>
            <ui-card-description>AI assistant interface</ui-card-description>
          </ui-card-header>
        </ui-card>
      </RouterLink>

      <RouterLink to="/examples/feed">
        <ui-card class="cursor-pointer transition-shadow hover:shadow-lg">
          <ui-card-header>
            <ui-icon name="lucide:rss" class="text-primary mb-2 size-8" />
            <ui-card-title>Feed</ui-card-title>
            <ui-card-description>Social media style feed</ui-card-description>
          </ui-card-header>
        </ui-card>
      </RouterLink>

      <RouterLink to="/examples/settings">
        <ui-card class="cursor-pointer transition-shadow hover:shadow-lg">
          <ui-card-header>
            <ui-icon name="lucide:settings" class="text-primary mb-2 size-8" />
            <ui-card-title>Settings</ui-card-title>
            <ui-card-description>Application settings page</ui-card-description>
          </ui-card-header>
        </ui-card>
      </RouterLink>
    </div>
  </div>
</template>
