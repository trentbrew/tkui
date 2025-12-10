<template>
  <div class="space-y-6 p-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Compliance Dashboard</h1>
        <p class="text-muted-foreground">Environmental & Safety compliance overview</p>
      </div>
      <div class="flex items-center gap-3">
        <ui-select v-model="selectedFacility" class="w-[200px]">
          <ui-select-trigger>
            <ui-select-value placeholder="Select facility" />
          </ui-select-trigger>
          <ui-select-content>
            <ui-select-item value="all">All Facilities</ui-select-item>
            <ui-select-item v-for="facility in facilities" :key="facility.id" :value="facility.id">
              {{ facility.name }}
            </ui-select-item>
          </ui-select-content>
        </ui-select>
        <ui-button variant="outline">
          <ui-icon name="lucide:download" class="mr-2 size-4" />
          Export
        </ui-button>
        <ui-button>
          <ui-icon name="lucide:refresh-cw" class="mr-2 size-4" />
          Sync
        </ui-button>
      </div>
    </div>

    <!-- Compliance Score Cards -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <ui-card v-for="metric in complianceMetrics" :key="metric.label">
        <ui-card-header class="flex flex-row items-center justify-between pb-2">
          <ui-card-title class="text-muted-foreground text-sm font-medium">
            {{ metric.label }}
          </ui-card-title>
          <ui-icon :name="metric.icon" class="text-muted-foreground size-4" />
        </ui-card-header>
        <ui-card-content>
          <div class="text-2xl font-bold">{{ metric.value }}</div>
          <div class="mt-1 flex items-center text-xs">
            <ui-icon
              :name="metric.trend > 0 ? 'lucide:trending-up' : 'lucide:trending-down'"
              class="mr-1 size-3"
              :class="metric.trend > 0 ? 'text-green-500' : 'text-red-500'"
            />
            <span :class="metric.trend > 0 ? 'text-green-500' : 'text-red-500'">
              {{ Math.abs(metric.trend) }}%
            </span>
            <span class="text-muted-foreground ml-1">from last month</span>
          </div>
        </ui-card-content>
      </ui-card>
    </div>

    <!-- Main Content Grid -->
    <div class="grid gap-6 lg:grid-cols-3">
      <!-- Task Overview -->
      <ui-card class="lg:col-span-2">
        <ui-card-header>
          <div class="flex items-center justify-between">
            <ui-card-title>Task Overview</ui-card-title>
            <ui-tabs v-model="taskView" class="w-auto">
              <ui-tabs-list class="h-8">
                <ui-tabs-trigger value="environmental" class="px-3 text-xs"
                  >Environmental</ui-tabs-trigger
                >
                <ui-tabs-trigger value="safety" class="px-3 text-xs">Safety</ui-tabs-trigger>
              </ui-tabs-list>
            </ui-tabs>
          </div>
        </ui-card-header>
        <ui-card-content>
          <div class="space-y-4">
            <div v-for="category in taskCategories" :key="category.name" class="space-y-2">
              <div class="flex items-center justify-between text-sm">
                <div class="flex items-center gap-2">
                  <div class="size-3 rounded-full" :class="category.color" />
                  <span class="font-medium">{{ category.name }}</span>
                </div>
                <span class="text-muted-foreground">{{ category.count }} tasks</span>
              </div>
              <ui-progress :model-value="category.progress" class="h-2" />
            </div>
          </div>

          <!-- Task Status Summary -->
          <div class="mt-6 grid grid-cols-4 gap-4 border-t pt-4">
            <div v-for="status in taskStatuses" :key="status.label" class="text-center">
              <div class="text-2xl font-bold" :class="status.color">{{ status.count }}</div>
              <div class="text-muted-foreground text-xs">{{ status.label }}</div>
            </div>
          </div>
        </ui-card-content>
      </ui-card>

      <!-- Suggested Tasks -->
      <ui-card>
        <ui-card-header>
          <div class="flex items-center justify-between">
            <ui-card-title>Suggested Tasks</ui-card-title>
            <ui-badge variant="secondary">{{ suggestedTasks.length }}</ui-badge>
          </div>
          <ui-card-description>From Applicability Tool</ui-card-description>
        </ui-card-header>
        <ui-card-content class="space-y-3">
          <div
            v-for="task in suggestedTasks.slice(0, 5)"
            :key="task.id"
            class="bg-muted/30 hover:bg-muted/50 flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-colors"
          >
            <div class="mt-0.5">
              <ui-icon
                :name="
                  task.type === 'compliance' ? 'lucide:alert-triangle' : 'lucide:clipboard-list'
                "
                class="size-4"
                :class="task.type === 'compliance' ? 'text-amber-500' : 'text-blue-500'"
              />
            </div>
            <div class="min-w-0 flex-1">
              <p class="truncate text-sm font-medium">{{ task.title }}</p>
              <p class="text-muted-foreground text-xs">{{ task.program }}</p>
            </div>
            <ui-button variant="ghost" size="icon" class="size-7 shrink-0">
              <ui-icon name="lucide:plus" class="size-3" />
            </ui-button>
          </div>
          <ui-button variant="outline" class="w-full" size="sm">
            View All Suggested Tasks
            <ui-icon name="lucide:arrow-right" class="ml-2 size-3" />
          </ui-button>
        </ui-card-content>
      </ui-card>
    </div>

    <!-- Bottom Row -->
    <div class="grid gap-6 lg:grid-cols-2">
      <!-- Upcoming Deadlines -->
      <ui-card>
        <ui-card-header>
          <ui-card-title>Upcoming Deadlines</ui-card-title>
          <ui-card-description>Tasks due in the next 30 days</ui-card-description>
        </ui-card-header>
        <ui-card-content>
          <div class="space-y-4">
            <div
              v-for="deadline in upcomingDeadlines"
              :key="deadline.id"
              class="flex items-center gap-4"
            >
              <div
                class="flex size-10 items-center justify-center rounded-lg"
                :class="getDeadlineClass(deadline.daysUntil)"
              >
                <span class="text-sm font-bold">{{ deadline.daysUntil }}</span>
              </div>
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-medium">{{ deadline.title }}</p>
                <p class="text-muted-foreground text-xs">
                  {{ deadline.facility }} · {{ deadline.program }}
                </p>
              </div>
              <ui-badge :variant="getDeadlineBadgeVariant(deadline.daysUntil)">
                {{ deadline.daysUntil === 0 ? "Today" : `${deadline.daysUntil}d` }}
              </ui-badge>
            </div>
          </div>
        </ui-card-content>
      </ui-card>

      <!-- Recent Activity -->
      <ui-card>
        <ui-card-header>
          <ui-card-title>Recent Activity</ui-card-title>
          <ui-card-description>Latest compliance actions</ui-card-description>
        </ui-card-header>
        <ui-card-content>
          <div class="space-y-4">
            <div v-for="activity in recentActivity" :key="activity.id" class="flex gap-4">
              <div class="relative">
                <ui-avatar
                  :src="activity.user.avatar"
                  :fallback="activity.user.initials"
                  class="size-8"
                />
                <div
                  class="absolute -right-1 -bottom-1 flex size-4 items-center justify-center rounded-full"
                  :class="getActivityIconBg(activity.action)"
                >
                  <ui-icon :name="getActivityIcon(activity.action)" class="size-2.5 text-white" />
                </div>
              </div>
              <div class="min-w-0 flex-1">
                <p class="text-sm">
                  <span class="font-medium">{{ activity.user.name }}</span>
                  <span class="text-muted-foreground"> {{ activity.action }} </span>
                  <span class="font-medium">{{ activity.target }}</span>
                </p>
                <p class="text-muted-foreground text-xs">{{ activity.time }}</p>
              </div>
            </div>
          </div>
        </ui-card-content>
      </ui-card>
    </div>

    <!-- Audit Status -->
    <ui-card>
      <ui-card-header>
        <div class="flex items-center justify-between">
          <div>
            <ui-card-title>Audit Status</ui-card-title>
            <ui-card-description>FES and Vendor audit tracking</ui-card-description>
          </div>
          <ui-button variant="outline" size="sm">
            <ui-icon name="lucide:external-link" class="mr-2 size-3" />
            Open FES Portal
          </ui-button>
        </div>
      </ui-card-header>
      <ui-card-content>
        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div v-for="audit in auditStatus" :key="audit.id" class="space-y-3 rounded-lg border p-4">
            <div class="flex items-center justify-between">
              <span class="text-sm font-medium">{{ audit.name }}</span>
              <ui-badge :variant="getAuditBadgeVariant(audit.stage)">{{ audit.stage }}</ui-badge>
            </div>
            <div class="space-y-1">
              <div class="flex justify-between text-xs">
                <span class="text-muted-foreground">Progress</span>
                <span>{{ audit.progress }}%</span>
              </div>
              <ui-progress :model-value="audit.progress" class="h-1.5" />
            </div>
            <div class="flex items-center gap-4 text-xs">
              <div class="flex items-center gap-1">
                <div class="size-2 rounded-full bg-red-500" />
                <span>{{ audit.findings.red }} Red</span>
              </div>
              <div class="flex items-center gap-1">
                <div class="size-2 rounded-full bg-yellow-500" />
                <span>{{ audit.findings.yellow }} Yellow</span>
              </div>
            </div>
          </div>
        </div>
      </ui-card-content>
    </ui-card>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  const selectedFacility = ref("all");
  const taskView = ref("environmental");

  const facilities = [
    { id: "texas_steel", name: "Texas Steel Mill" },
    { id: "indiana_bar", name: "Indiana Bar Mill" },
    { id: "arkansas_sheet", name: "Arkansas Sheet Mill" },
    { id: "utah_plate", name: "Utah Plate Mill" },
  ];

  const complianceMetrics = [
    { label: "Compliance Score", value: "94.2%", icon: "lucide:shield-check", trend: 2.4 },
    { label: "Open Tasks", value: "47", icon: "lucide:clipboard-list", trend: -8 },
    { label: "Overdue Items", value: "3", icon: "lucide:alert-circle", trend: -25 },
    { label: "Pending Reviews", value: "12", icon: "lucide:clock", trend: 5 },
  ];

  const taskCategories = [
    { name: "Air Quality", count: 18, progress: 72, color: "bg-blue-500" },
    { name: "Water Discharge", count: 12, progress: 85, color: "bg-cyan-500" },
    { name: "Waste Management", count: 8, progress: 90, color: "bg-green-500" },
    { name: "Emergency Planning", count: 9, progress: 65, color: "bg-amber-500" },
  ];

  const taskStatuses = [
    { label: "Completed", count: 124, color: "text-green-500" },
    { label: "In Progress", count: 32, color: "text-blue-500" },
    { label: "Pending", count: 15, color: "text-amber-500" },
    { label: "Overdue", count: 3, color: "text-red-500" },
  ];

  const suggestedTasks = [
    {
      id: "1",
      title: "NESHAP Subpart ZZZZ - Biennial Tuneup",
      program: "RICE Engines",
      type: "standard",
    },
    {
      id: "2",
      title: "Missing Initial Notification",
      program: "Steel Pickling - CCC",
      type: "compliance",
    },
    {
      id: "3",
      title: "NSPS Subpart IIII - Annual Inventory",
      program: "Compression ICE",
      type: "standard",
    },
    { id: "4", title: "Opacity Monitoring Gap", program: "NSPS Subpart AAa", type: "compliance" },
    { id: "5", title: "TRI Form R Preparation", program: "EPCRA Section 313", type: "standard" },
  ];

  const upcomingDeadlines = [
    {
      id: "1",
      title: "Quarterly Air Emissions Report",
      facility: "Texas Steel",
      program: "Title V",
      daysUntil: 3,
    },
    {
      id: "2",
      title: "Annual Compliance Certification",
      facility: "Indiana Bar",
      program: "NESHAP",
      daysUntil: 7,
    },
    {
      id: "3",
      title: "Stormwater Inspection",
      facility: "Arkansas Sheet",
      program: "NPDES",
      daysUntil: 12,
    },
    {
      id: "4",
      title: "Hazardous Waste Manifest",
      facility: "Utah Plate",
      program: "RCRA",
      daysUntil: 18,
    },
  ];

  const recentActivity = [
    {
      id: "1",
      user: {
        name: "Sarah Chen",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        initials: "SC",
      },
      action: "completed",
      target: "Monthly Air Monitoring",
      time: "2 hours ago",
    },
    {
      id: "2",
      user: {
        name: "Mike Johnson",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike",
        initials: "MJ",
      },
      action: "resolved",
      target: "Compliance Issue #234",
      time: "4 hours ago",
    },
    {
      id: "3",
      user: {
        name: "Emily Davis",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
        initials: "ED",
      },
      action: "scheduled",
      target: "Quarterly Inspection",
      time: "6 hours ago",
    },
    {
      id: "4",
      user: {
        name: "Alex Park",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
        initials: "AP",
      },
      action: "uploaded",
      target: "Permit Amendment",
      time: "Yesterday",
    },
  ];

  const auditStatus = [
    {
      id: "1",
      name: "FES Annual Audit",
      stage: "Findings",
      progress: 65,
      findings: { red: 2, yellow: 5 },
    },
    {
      id: "2",
      name: "Vendor Audit - ABC Corp",
      stage: "Review",
      progress: 40,
      findings: { red: 0, yellow: 3 },
    },
    {
      id: "3",
      name: "Q4 Safety Audit",
      stage: "Planning",
      progress: 15,
      findings: { red: 0, yellow: 0 },
    },
    {
      id: "4",
      name: "ISO 14001 Recert",
      stage: "Complete",
      progress: 100,
      findings: { red: 1, yellow: 2 },
    },
  ];

  function getDeadlineClass(days: number): string {
    if (days <= 3) return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    if (days <= 7) return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
    return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
  }

  function getDeadlineBadgeVariant(days: number): "destructive" | "secondary" | "outline" {
    if (days <= 3) return "destructive";
    if (days <= 7) return "secondary";
    return "outline";
  }

  function getActivityIcon(action: string): string {
    const icons: Record<string, string> = {
      completed: "lucide:check",
      resolved: "lucide:check-circle",
      scheduled: "lucide:calendar",
      uploaded: "lucide:upload",
    };
    return icons[action] || "lucide:activity";
  }

  function getActivityIconBg(action: string): string {
    const colors: Record<string, string> = {
      completed: "bg-green-500",
      resolved: "bg-blue-500",
      scheduled: "bg-purple-500",
      uploaded: "bg-amber-500",
    };
    return colors[action] || "bg-gray-500";
  }

  function getAuditBadgeVariant(
    stage: string
  ): "default" | "secondary" | "outline" | "destructive" {
    const variants: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
      Planning: "outline",
      Review: "secondary",
      Findings: "destructive",
      Complete: "default",
    };
    return variants[stage] || "outline";
  }
</script>
