<script setup lang="ts">
  import type { PropDoc } from "../../components/ComponentDocs.vue";

  const sourceCode = `<template>
  <!-- Style One: Icon with dropdown -->
  <ui-card>
    <ui-card-header class="flex-row items-center justify-between pb-2">
      <div class="flex items-center gap-3">
        <div class="flex size-10 items-center justify-center rounded-lg bg-primary/10">
          <ui-icon name="lucide:dollar-sign" class="size-5 text-primary" />
        </div>
        <ui-card-title class="text-sm font-medium">Total Revenue</ui-card-title>
      </div>
    </ui-card-header>
    <ui-card-content>
      <p class="text-3xl font-bold">$45,231.89</p>
      <p class="text-xs text-muted-foreground">
        <span class="text-green-500">+20.1%</span> from last month
      </p>
    </ui-card-content>
  </ui-card>
</template>`;

  const propsDocs: PropDoc[] = [
    {
      name: "title",
      type: "string",
      description: "The label for the stat card",
    },
    {
      name: "value",
      type: "string | number",
      description: "The main value to display",
    },
    {
      name: "change",
      type: "number",
      description: "Percentage change from previous period",
    },
    {
      name: "icon",
      type: "string",
      description: "Icon name for the stat card",
    },
    {
      name: "trend",
      type: "'up' | 'down' | 'neutral'",
      description: "Direction of the trend indicator",
    },
  ];

  // Sample data for stats
  const stats = {
    revenue: { value: "$45,231.89", change: 20.1, label: "Total Revenue" },
    users: { value: "2,350", change: 180.1, label: "Active Users" },
    orders: { value: "12,234", change: -4.5, label: "Total Orders" },
    conversion: { value: "3.2%", change: 12.5, label: "Conversion Rate" },
    emissions: { value: "1,234 tCO₂e", change: -15.2, label: "Carbon Emissions" },
    compliance: { value: "94%", change: 2.3, label: "Compliance Score" },
    incidents: { value: "3", change: -40, label: "Open Incidents" },
    audits: { value: "12", change: 0, label: "Pending Audits" },
  };
</script>

<template>
  <component-section
    id="stats"
    title="Stats"
    description="Stat cards for displaying key metrics and KPIs in dashboards. Perfect for environmental compliance tracking, analytics, and reporting."
    :source-code="sourceCode"
    :props-docs="propsDocs"
  >
    <div class="space-y-12">
      <!-- Style One: Icon with Dropdown -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Style One - Icon with Actions</h3>
        <div class="grid gap-4 sm:grid-cols-2">
          <ui-card>
            <ui-card-header class="flex-row items-center justify-between space-y-0 pb-2">
              <div class="flex items-center gap-3">
                <div class="bg-primary/10 flex size-10 items-center justify-center rounded-lg">
                  <ui-icon name="lucide:dollar-sign" class="text-primary size-5" />
                </div>
                <ui-card-title class="text-sm font-medium">Total Revenue</ui-card-title>
              </div>
              <ui-dropdown-menu>
                <ui-dropdown-menu-trigger as-child>
                  <ui-button variant="ghost" size="icon" class="size-8">
                    <ui-icon name="lucide:more-horizontal" class="size-4" />
                  </ui-button>
                </ui-dropdown-menu-trigger>
                <ui-dropdown-menu-content align="end">
                  <ui-dropdown-menu-item>View Details</ui-dropdown-menu-item>
                  <ui-dropdown-menu-item>Export</ui-dropdown-menu-item>
                </ui-dropdown-menu-content>
              </ui-dropdown-menu>
            </ui-card-header>
            <ui-card-content>
              <p class="text-3xl font-bold">$45,231.89</p>
              <p class="text-muted-foreground text-xs">
                <span class="text-green-500">+20.1%</span> from last month
              </p>
            </ui-card-content>
          </ui-card>

          <ui-card>
            <ui-card-header class="flex-row items-center justify-between space-y-0 pb-2">
              <div class="flex items-center gap-3">
                <div class="flex size-10 items-center justify-center rounded-lg bg-blue-500/10">
                  <ui-icon name="lucide:users" class="size-5 text-blue-500" />
                </div>
                <ui-card-title class="text-sm font-medium">Active Users</ui-card-title>
              </div>
              <ui-badge variant="secondary" class="text-green-600">
                <ui-icon name="lucide:trending-up" class="mr-1 size-3" />
                +12%
              </ui-badge>
            </ui-card-header>
            <ui-card-content>
              <p class="text-3xl font-bold">2,350</p>
              <p class="text-muted-foreground text-xs">+180 new this week</p>
            </ui-card-content>
          </ui-card>
        </div>
      </div>

      <!-- Style Two: Icon Right Aligned -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Style Two - Icon Right Aligned</h3>
        <div class="grid gap-4 sm:grid-cols-2">
          <ui-card>
            <ui-card-header class="flex-row items-start justify-between space-y-0 pb-2">
              <div>
                <ui-card-description>Total Orders</ui-card-description>
                <ui-card-title class="text-3xl font-bold">12,234</ui-card-title>
              </div>
              <div class="flex size-12 items-center justify-center rounded-full bg-orange-500/10">
                <ui-icon name="lucide:shopping-cart" class="size-6 text-orange-500" />
              </div>
            </ui-card-header>
            <ui-card-content class="pt-0">
              <p class="text-muted-foreground text-sm">
                <span class="text-red-500">-4.5%</span> from last month
              </p>
            </ui-card-content>
          </ui-card>

          <ui-card>
            <ui-card-header class="flex-row items-start justify-between space-y-0 pb-2">
              <div>
                <ui-card-description>Conversion Rate</ui-card-description>
                <ui-card-title class="text-3xl font-bold">3.2%</ui-card-title>
              </div>
              <div class="flex size-12 items-center justify-center rounded-full bg-green-500/10">
                <ui-icon name="lucide:percent" class="size-6 text-green-500" />
              </div>
            </ui-card-header>
            <ui-card-content class="pt-0">
              <p class="text-muted-foreground text-sm">
                <span class="text-green-500">+12.5%</span> from last month
              </p>
            </ui-card-content>
          </ui-card>
        </div>
      </div>

      <!-- Style Three: With Progress Bar -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Style Three - With Progress Bar</h3>
        <div class="grid gap-4 sm:grid-cols-2">
          <ui-card>
            <ui-card-header class="pb-2">
              <div class="flex items-center justify-between">
                <ui-card-title class="text-sm font-medium">Storage Used</ui-card-title>
                <ui-badge variant="secondary">75%</ui-badge>
              </div>
            </ui-card-header>
            <ui-card-content class="space-y-3">
              <p class="text-2xl font-bold">75 GB / 100 GB</p>
              <ui-progress :model-value="75" class="h-2" />
              <p class="text-muted-foreground text-xs">25 GB remaining</p>
            </ui-card-content>
          </ui-card>

          <ui-card>
            <ui-card-header class="pb-2">
              <div class="flex items-center justify-between">
                <ui-card-title class="text-sm font-medium">Compliance Score</ui-card-title>
                <ui-badge variant="default" class="bg-green-500">94%</ui-badge>
              </div>
            </ui-card-header>
            <ui-card-content class="space-y-3">
              <p class="text-2xl font-bold">47 / 50 Requirements</p>
              <ui-progress :model-value="94" class="h-2" />
              <p class="text-muted-foreground text-xs">3 items need attention</p>
            </ui-card-content>
          </ui-card>
        </div>
      </div>

      <!-- Style Four: Left Accent Color -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Style Four - Left Accent Color</h3>
        <div class="grid gap-4 sm:grid-cols-2">
          <ui-card class="border-l-4 border-l-green-500">
            <ui-card-header class="pb-2">
              <ui-card-description>Carbon Emissions</ui-card-description>
            </ui-card-header>
            <ui-card-content>
              <div class="flex items-baseline gap-2">
                <p class="text-3xl font-bold">1,234</p>
                <span class="text-muted-foreground text-sm">tCO₂e</span>
              </div>
              <ui-badge variant="outline" class="mt-2 border-green-500 text-green-600">
                <ui-icon name="lucide:trending-down" class="mr-1 size-3" />
                -15.2% YoY
              </ui-badge>
            </ui-card-content>
          </ui-card>

          <ui-card class="border-l-4 border-l-red-500">
            <ui-card-header class="pb-2">
              <ui-card-description>Open Incidents</ui-card-description>
            </ui-card-header>
            <ui-card-content>
              <div class="flex items-baseline gap-2">
                <p class="text-3xl font-bold">3</p>
                <span class="text-muted-foreground text-sm">active</span>
              </div>
              <ui-badge variant="outline" class="mt-2 border-red-500 text-red-600">
                <ui-icon name="lucide:alert-triangle" class="mr-1 size-3" />
                1 critical
              </ui-badge>
            </ui-card-content>
          </ui-card>
        </div>
      </div>

      <!-- Style Five: Minimal with Action -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Style Five - Minimal with Action</h3>
        <div class="grid gap-4 sm:grid-cols-2">
          <ui-card>
            <ui-card-header class="flex-row items-center justify-between space-y-0">
              <div>
                <ui-card-description>Pending Audits</ui-card-description>
                <ui-card-title class="text-2xl font-bold">12</ui-card-title>
              </div>
              <ui-button size="sm">View All</ui-button>
            </ui-card-header>
          </ui-card>

          <ui-card>
            <ui-card-header class="flex-row items-center justify-between space-y-0">
              <div>
                <ui-card-description>Documents Due</ui-card-description>
                <ui-card-title class="text-2xl font-bold">5</ui-card-title>
              </div>
              <ui-button size="sm" variant="outline">Upload</ui-button>
            </ui-card-header>
          </ui-card>
        </div>
      </div>

      <!-- Style Six: With Separator -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Style Six - With Separator</h3>
        <ui-card>
          <ui-card-content class="p-0">
            <div class="grid divide-y sm:grid-cols-3 sm:divide-x sm:divide-y-0">
              <div class="flex items-center gap-4 p-6">
                <div class="bg-primary/10 flex size-12 items-center justify-center rounded-lg">
                  <ui-icon name="lucide:leaf" class="text-primary size-6" />
                </div>
                <div>
                  <p class="text-muted-foreground text-sm">Energy Saved</p>
                  <p class="text-2xl font-bold">2.4 MWh</p>
                </div>
              </div>
              <div class="flex items-center gap-4 p-6">
                <div class="flex size-12 items-center justify-center rounded-lg bg-blue-500/10">
                  <ui-icon name="lucide:droplets" class="size-6 text-blue-500" />
                </div>
                <div>
                  <p class="text-muted-foreground text-sm">Water Recycled</p>
                  <p class="text-2xl font-bold">15,000 L</p>
                </div>
              </div>
              <div class="flex items-center gap-4 p-6">
                <div class="flex size-12 items-center justify-center rounded-lg bg-green-500/10">
                  <ui-icon name="lucide:recycle" class="size-6 text-green-500" />
                </div>
                <div>
                  <p class="text-muted-foreground text-sm">Waste Diverted</p>
                  <p class="text-2xl font-bold">89%</p>
                </div>
              </div>
            </div>
          </ui-card-content>
        </ui-card>
      </div>

      <!-- Style Seven: Compact Grid -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Style Seven - Compact Grid</h3>
        <div class="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <ui-card>
            <ui-card-content class="p-4">
              <p class="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                Sites
              </p>
              <p class="mt-1 text-2xl font-bold">24</p>
              <p class="text-muted-foreground mt-1 text-xs">Active locations</p>
            </ui-card-content>
          </ui-card>
          <ui-card>
            <ui-card-content class="p-4">
              <p class="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                Permits
              </p>
              <p class="mt-1 text-2xl font-bold">156</p>
              <p class="text-muted-foreground mt-1 text-xs">Valid permits</p>
            </ui-card-content>
          </ui-card>
          <ui-card>
            <ui-card-content class="p-4">
              <p class="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                Reports
              </p>
              <p class="mt-1 text-2xl font-bold">89</p>
              <p class="text-muted-foreground mt-1 text-xs">This quarter</p>
            </ui-card-content>
          </ui-card>
          <ui-card>
            <ui-card-content class="p-4">
              <p class="text-muted-foreground text-xs font-medium tracking-wider uppercase">
                Tasks
              </p>
              <p class="mt-1 text-2xl font-bold">12</p>
              <p class="text-muted-foreground mt-1 text-xs">Due this week</p>
            </ui-card-content>
          </ui-card>
        </div>
      </div>

      <!-- Style Eight: With Sparkline Area -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Style Eight - With Trend Indicator</h3>
        <div class="grid gap-4 sm:grid-cols-2">
          <ui-card>
            <ui-card-header class="pb-2">
              <ui-card-description>Monthly Emissions</ui-card-description>
            </ui-card-header>
            <ui-card-content>
              <div class="flex items-end justify-between">
                <div>
                  <p class="text-3xl font-bold">847</p>
                  <p class="text-muted-foreground text-sm">tCO₂e this month</p>
                </div>
                <div class="flex h-12 items-end gap-1">
                  <div class="w-2 rounded-t bg-green-200" style="height: 60%"></div>
                  <div class="w-2 rounded-t bg-green-300" style="height: 45%"></div>
                  <div class="w-2 rounded-t bg-green-400" style="height: 70%"></div>
                  <div class="w-2 rounded-t bg-green-500" style="height: 55%"></div>
                  <div class="w-2 rounded-t bg-green-600" style="height: 40%"></div>
                  <div class="bg-primary w-2 rounded-t" style="height: 35%"></div>
                </div>
              </div>
            </ui-card-content>
          </ui-card>

          <ui-card>
            <ui-card-header class="pb-2">
              <ui-card-description>Compliance Trend</ui-card-description>
            </ui-card-header>
            <ui-card-content>
              <div class="flex items-end justify-between">
                <div>
                  <p class="text-3xl font-bold">98.2%</p>
                  <p class="text-muted-foreground text-sm">Average score</p>
                </div>
                <div class="flex h-12 items-end gap-1">
                  <div class="w-2 rounded-t bg-blue-300" style="height: 70%"></div>
                  <div class="w-2 rounded-t bg-blue-400" style="height: 75%"></div>
                  <div class="w-2 rounded-t bg-blue-500" style="height: 80%"></div>
                  <div class="w-2 rounded-t bg-blue-600" style="height: 85%"></div>
                  <div class="w-2 rounded-t bg-blue-700" style="height: 90%"></div>
                  <div class="bg-primary w-2 rounded-t" style="height: 98%"></div>
                </div>
              </div>
            </ui-card-content>
          </ui-card>
        </div>
      </div>

      <!-- Style Nine: With Avatar and Chip -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Style Nine - With Avatar & Status</h3>
        <ui-card class="overflow-hidden">
          <ui-card-header class="flex-row items-center gap-4 space-y-0">
            <ui-chip color="bg-green-500">
              <ui-avatar class="size-14">
                <ui-avatar-image src="https://i.pravatar.cc/100?img=12" />
                <ui-avatar-fallback>JD</ui-avatar-fallback>
              </ui-avatar>
            </ui-chip>
            <div class="min-w-0 flex-1">
              <ui-card-title class="truncate">Environmental Manager</ui-card-title>
              <ui-card-description class="flex items-center gap-1.5">
                <span class="truncate">John Doe</span>
                <span class="text-muted-foreground/50">•</span>
                <span class="flex items-center gap-1 text-green-600">
                  <span class="size-1.5 animate-pulse rounded-full bg-green-500"></span>
                  Active
                </span>
              </ui-card-description>
            </div>
            <ui-button variant="outline" size="sm" class="shrink-0">
              <ui-icon name="lucide:mail" class="mr-1.5 size-3.5" />
              Contact
            </ui-button>
          </ui-card-header>
          <ui-separator />
          <ui-card-content class="p-0">
            <div class="grid grid-cols-3 divide-x">
              <div class="p-4 text-center">
                <p class="text-2xl font-bold tabular-nums">24</p>
                <p class="text-muted-foreground text-xs">Sites Managed</p>
              </div>
              <div class="p-4 text-center">
                <p class="text-2xl font-bold tabular-nums">156</p>
                <p class="text-muted-foreground text-xs">Reports Filed</p>
              </div>
              <div class="p-4 text-center">
                <p class="text-primary text-2xl font-bold tabular-nums">98%</p>
                <p class="text-muted-foreground text-xs">Compliance</p>
              </div>
            </div>
          </ui-card-content>
        </ui-card>
      </div>

      <!-- Style Ten: Circular Progress -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Style Ten - With Circular Indicator</h3>
        <div class="grid gap-4 sm:grid-cols-2">
          <ui-card>
            <ui-card-content class="flex items-center gap-6 p-6">
              <div class="relative flex size-20 items-center justify-center">
                <svg class="size-20 -rotate-90" viewBox="0 0 36 36">
                  <path
                    class="stroke-muted"
                    stroke-width="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    class="stroke-green-500"
                    stroke-width="3"
                    stroke-linecap="round"
                    fill="none"
                    stroke-dasharray="85, 100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span class="absolute text-lg font-bold">85%</span>
              </div>
              <div>
                <p class="font-semibold">Sustainability Goals</p>
                <p class="text-muted-foreground text-sm">17 of 20 targets met</p>
                <ui-progress :model-value="85" class="mt-2 h-1.5 w-32" />
              </div>
            </ui-card-content>
          </ui-card>

          <ui-card>
            <ui-card-content class="flex items-center gap-6 p-6">
              <div class="relative flex size-20 items-center justify-center">
                <svg class="size-20 -rotate-90" viewBox="0 0 36 36">
                  <path
                    class="stroke-muted"
                    stroke-width="3"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    class="stroke-primary"
                    stroke-width="3"
                    stroke-linecap="round"
                    fill="none"
                    stroke-dasharray="72, 100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <span class="absolute text-lg font-bold">72%</span>
              </div>
              <div>
                <p class="font-semibold">Audit Completion</p>
                <p class="text-muted-foreground text-sm">18 of 25 audits complete</p>
                <ui-progress :model-value="72" class="mt-2 h-1.5 w-32" />
              </div>
            </ui-card-content>
          </ui-card>
        </div>
      </div>
    </div>

    <template #live>
      <div class="flex flex-col gap-4">
        <h4 class="font-medium">Environmental Compliance Use Cases</h4>
        <ul class="text-muted-foreground space-y-2 text-sm">
          <li>
            <strong class="text-foreground">Emissions Tracking</strong> - Monitor CO₂, methane, and
            other GHG emissions
          </li>
          <li>
            <strong class="text-foreground">Compliance Scores</strong> - Track regulatory compliance
            percentages
          </li>
          <li>
            <strong class="text-foreground">Incident Management</strong> - Display open/closed
            environmental incidents
          </li>
          <li>
            <strong class="text-foreground">Audit Status</strong> - Show pending and completed
            audits
          </li>
          <li>
            <strong class="text-foreground">Resource Usage</strong> - Water, energy, and waste
            metrics
          </li>
          <li>
            <strong class="text-foreground">Permit Tracking</strong> - Active permits and renewal
            dates
          </li>
        </ul>
      </div>
    </template>
  </component-section>
</template>
