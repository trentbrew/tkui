<script setup lang="ts">
  import { computed, ref } from "vue";
  import type { PropDoc } from "../../components/ComponentDocs.vue";

  const sourceCode = `<template>
  <ui-card class="overflow-hidden">
    <ui-card-header class="flex-row items-center justify-between space-y-0 border-b">
      <div class="flex items-center gap-2">
        <ui-input placeholder="Search..." class="w-64" v-model="search" />
      </div>
      <div class="flex items-center gap-2">
        <ui-button variant="outline" size="sm">Export</ui-button>
        <ui-button size="sm">Add User</ui-button>
      </div>
    </ui-card-header>
    <div class="overflow-auto">
      <table class="w-full">
        <thead class="border-b bg-muted/50">
          <tr>
            <th v-for="col in columns" :key="col.key" class="px-4 py-3 text-left text-sm font-medium">
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y">
          <tr v-for="row in filteredData" :key="row.id" class="hover:bg-muted/50">
            <td v-for="col in columns" :key="col.key" class="px-4 py-3 text-sm">
              {{ row[col.key] }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ui-card-footer class="flex items-center justify-between border-t">
      <p class="text-sm text-muted-foreground">Showing 1-10 of 100</p>
      <div class="flex gap-1">
        <ui-button variant="outline" size="sm">Previous</ui-button>
        <ui-button variant="outline" size="sm">Next</ui-button>
      </div>
    </ui-card-footer>
  </ui-card>
</template>`;

  const propsDocs: PropDoc[] = [
    {
      name: "data",
      type: "array",
      description: "Array of data objects to display in the table",
    },
    {
      name: "columns",
      type: "ConfigColumns[]",
      description: "Column configuration with title, data key, and render options",
    },
    {
      name: "options",
      type: "Config",
      description: "DataTables.net configuration options",
    },
    {
      name: "dom",
      type: "string",
      description: "Layout configuration string for table elements",
    },
    {
      name: "select",
      type: "boolean | object",
      description: "Enable row selection with style options",
    },
    {
      name: "responsive",
      type: "boolean",
      description: "Enable responsive table behavior",
    },
    {
      name: "buttons",
      type: "array",
      description: "Export and action buttons configuration",
    },
  ];

  // Sample data for demos
  const sampleUsers = ref([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      location: "New York",
      status: "Active",
      balance: 1234.56,
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      location: "Los Angeles",
      status: "Active",
      balance: 2345.67,
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      location: "Chicago",
      status: "Inactive",
      balance: 345.89,
    },
    {
      id: 4,
      name: "Alice Brown",
      email: "alice@example.com",
      location: "Houston",
      status: "Active",
      balance: 4567.12,
    },
    {
      id: 5,
      name: "Charlie Wilson",
      email: "charlie@example.com",
      location: "Phoenix",
      status: "Inactive",
      balance: 678.34,
    },
  ]);

  const search = ref("");
  const sortKey = ref("name");
  const sortOrder = ref<"asc" | "desc">("asc");

  const filteredUsers = computed(() => {
    let result = [...sampleUsers.value];
    if (search.value) {
      const s = search.value.toLowerCase();
      result = result.filter(
        (u) =>
          u.name.toLowerCase().includes(s) ||
          u.email.toLowerCase().includes(s) ||
          u.location.toLowerCase().includes(s)
      );
    }
    result.sort((a, b) => {
      const aVal = a[sortKey.value as keyof typeof a];
      const bVal = b[sortKey.value as keyof typeof b];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortOrder.value === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortOrder.value === "asc"
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });
    return result;
  });

  const toggleSort = (key: string) => {
    if (sortKey.value === key) {
      sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
    } else {
      sortKey.value = key;
      sortOrder.value = "asc";
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
  };

  // Row selection
  const selectedRows = ref<number[]>([]);
  const toggleRowSelection = (id: number) => {
    const idx = selectedRows.value.indexOf(id);
    if (idx > -1) {
      selectedRows.value.splice(idx, 1);
    } else {
      selectedRows.value.push(id);
    }
  };
  const toggleAllRows = () => {
    if (selectedRows.value.length === filteredUsers.value.length) {
      selectedRows.value = [];
    } else {
      selectedRows.value = filteredUsers.value.map((u) => u.id);
    }
  };
  const isAllSelected = computed(
    () => selectedRows.value.length === filteredUsers.value.length && filteredUsers.value.length > 0
  );

  // Compliance data
  const complianceData = ref([
    {
      id: 1,
      site: "Plant A",
      permit: "EPA-2024-001",
      type: "Air Quality",
      status: "Compliant",
      lastAudit: "2024-01-15",
      nextDue: "2024-07-15",
      score: 98,
    },
    {
      id: 2,
      site: "Plant B",
      permit: "EPA-2024-002",
      type: "Water Discharge",
      status: "Warning",
      lastAudit: "2024-02-20",
      nextDue: "2024-08-20",
      score: 85,
    },
    {
      id: 3,
      site: "Warehouse C",
      permit: "EPA-2024-003",
      type: "Waste Management",
      status: "Compliant",
      lastAudit: "2024-03-10",
      nextDue: "2024-09-10",
      score: 95,
    },
    {
      id: 4,
      site: "Facility D",
      permit: "EPA-2024-004",
      type: "Hazardous Materials",
      status: "Non-Compliant",
      lastAudit: "2024-01-05",
      nextDue: "2024-04-05",
      score: 72,
    },
    {
      id: 5,
      site: "Office E",
      permit: "EPA-2024-005",
      type: "Energy Efficiency",
      status: "Compliant",
      lastAudit: "2024-04-01",
      nextDue: "2024-10-01",
      score: 92,
    },
  ]);
</script>

<template>
  <component-section
    id="datatable"
    title="DataTable"
    description="Advanced data tables with sorting, filtering, pagination, row selection, and export capabilities. Essential for environmental compliance tracking and reporting."
    :source-code="sourceCode"
    :props-docs="propsDocs"
  >
    <div class="space-y-12">
      <!-- Basic Table -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Basic Table</h3>
        <ui-card class="overflow-hidden">
          <div class="overflow-auto">
            <table class="w-full">
              <thead class="bg-muted/50 border-b">
                <tr>
                  <th class="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                    Name
                  </th>
                  <th class="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                    Email
                  </th>
                  <th class="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                    Location
                  </th>
                  <th class="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                    Status
                  </th>
                  <th class="text-muted-foreground px-4 py-3 text-right text-sm font-medium">
                    Balance
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y">
                <tr v-for="user in sampleUsers" :key="user.id" class="hover:bg-muted/50">
                  <td class="px-4 py-3 text-sm font-medium">{{ user.name }}</td>
                  <td class="text-muted-foreground px-4 py-3 text-sm">{{ user.email }}</td>
                  <td class="px-4 py-3 text-sm">{{ user.location }}</td>
                  <td class="px-4 py-3 text-sm">
                    <ui-badge :variant="user.status === 'Active' ? 'default' : 'outline'">
                      {{ user.status }}
                    </ui-badge>
                  </td>
                  <td class="px-4 py-3 text-right text-sm tabular-nums">
                    {{ formatCurrency(user.balance) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="text-muted-foreground flex items-center justify-between border-t px-4 py-3">
            <p class="text-sm">Total</p>
            <p class="text-foreground text-sm font-medium tabular-nums">
              {{ formatCurrency(sampleUsers.reduce((acc, u) => acc + u.balance, 0)) }}
            </p>
          </div>
        </ui-card>
      </div>

      <!-- With Search & Sort -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Search & Sort</h3>
        <ui-card class="overflow-hidden">
          <ui-card-header class="flex-row items-center justify-between space-y-0 border-b py-3">
            <div class="relative w-64">
              <ui-icon
                name="lucide:search"
                class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
              />
              <ui-input v-model="search" placeholder="Search users..." class="pl-9" />
            </div>
            <p class="text-muted-foreground text-sm">
              {{ filteredUsers.length }} of {{ sampleUsers.length }} users
            </p>
          </ui-card-header>
          <div class="overflow-auto">
            <table class="w-full">
              <thead class="bg-muted/50 border-b">
                <tr>
                  <th
                    class="cursor-pointer px-4 py-3 text-left text-sm font-medium"
                    @click="toggleSort('name')"
                  >
                    <div class="flex items-center gap-1">
                      Name
                      <ui-icon
                        :name="
                          sortKey === 'name'
                            ? sortOrder === 'asc'
                              ? 'lucide:chevron-up'
                              : 'lucide:chevron-down'
                            : 'lucide:chevrons-up-down'
                        "
                        class="text-muted-foreground size-4"
                      />
                    </div>
                  </th>
                  <th
                    class="cursor-pointer px-4 py-3 text-left text-sm font-medium"
                    @click="toggleSort('email')"
                  >
                    <div class="flex items-center gap-1">
                      Email
                      <ui-icon
                        :name="
                          sortKey === 'email'
                            ? sortOrder === 'asc'
                              ? 'lucide:chevron-up'
                              : 'lucide:chevron-down'
                            : 'lucide:chevrons-up-down'
                        "
                        class="text-muted-foreground size-4"
                      />
                    </div>
                  </th>
                  <th
                    class="cursor-pointer px-4 py-3 text-left text-sm font-medium"
                    @click="toggleSort('location')"
                  >
                    <div class="flex items-center gap-1">
                      Location
                      <ui-icon
                        :name="
                          sortKey === 'location'
                            ? sortOrder === 'asc'
                              ? 'lucide:chevron-up'
                              : 'lucide:chevron-down'
                            : 'lucide:chevrons-up-down'
                        "
                        class="text-muted-foreground size-4"
                      />
                    </div>
                  </th>
                  <th class="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th
                    class="cursor-pointer px-4 py-3 text-right text-sm font-medium"
                    @click="toggleSort('balance')"
                  >
                    <div class="flex items-center justify-end gap-1">
                      Balance
                      <ui-icon
                        :name="
                          sortKey === 'balance'
                            ? sortOrder === 'asc'
                              ? 'lucide:chevron-up'
                              : 'lucide:chevron-down'
                            : 'lucide:chevrons-up-down'
                        "
                        class="text-muted-foreground size-4"
                      />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody class="divide-y">
                <tr v-for="user in filteredUsers" :key="user.id" class="hover:bg-muted/50">
                  <td class="px-4 py-3 text-sm font-medium">{{ user.name }}</td>
                  <td class="text-muted-foreground px-4 py-3 text-sm">{{ user.email }}</td>
                  <td class="px-4 py-3 text-sm">{{ user.location }}</td>
                  <td class="px-4 py-3 text-sm">
                    <ui-badge :variant="user.status === 'Active' ? 'default' : 'outline'">
                      {{ user.status }}
                    </ui-badge>
                  </td>
                  <td class="px-4 py-3 text-right text-sm tabular-nums">
                    {{ formatCurrency(user.balance) }}
                  </td>
                </tr>
                <tr v-if="filteredUsers.length === 0">
                  <td colspan="5" class="px-4 py-8 text-center">
                    <ui-empty class="border-0">
                      <ui-empty-header>
                        <ui-empty-media variant="icon">
                          <ui-icon name="lucide:search-x" />
                        </ui-empty-media>
                        <ui-empty-title>No results found</ui-empty-title>
                        <ui-empty-description>
                          Try adjusting your search to find what you're looking for.
                        </ui-empty-description>
                      </ui-empty-header>
                    </ui-empty>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ui-card>
      </div>

      <!-- Row Selection -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Row Selection</h3>
        <ui-card class="overflow-hidden">
          <ui-card-header
            v-if="selectedRows.length > 0"
            class="flex-row items-center justify-between space-y-0 border-b bg-blue-50 py-3 dark:bg-blue-950/30"
          >
            <p class="text-sm font-medium">{{ selectedRows.length }} row(s) selected</p>
            <div class="flex gap-2">
              <ui-button variant="outline" size="sm" @click="selectedRows = []">
                Clear Selection
              </ui-button>
              <ui-button variant="destructive" size="sm">
                <ui-icon name="lucide:trash-2" class="mr-1.5 size-3.5" />
                Delete Selected
              </ui-button>
            </div>
          </ui-card-header>
          <div class="overflow-auto">
            <table class="w-full">
              <thead class="bg-muted/50 border-b">
                <tr>
                  <th class="w-12 px-4 py-3">
                    <ui-checkbox :checked="isAllSelected" @update:checked="toggleAllRows" />
                  </th>
                  <th class="px-4 py-3 text-left text-sm font-medium">Name</th>
                  <th class="px-4 py-3 text-left text-sm font-medium">Email</th>
                  <th class="px-4 py-3 text-left text-sm font-medium">Location</th>
                  <th class="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th class="px-4 py-3 text-right text-sm font-medium">Balance</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                <tr
                  v-for="user in sampleUsers"
                  :key="user.id"
                  class="hover:bg-muted/50"
                  :class="{ 'bg-blue-50 dark:bg-blue-950/20': selectedRows.includes(user.id) }"
                >
                  <td class="px-4 py-3">
                    <ui-checkbox
                      :checked="selectedRows.includes(user.id)"
                      @update:checked="toggleRowSelection(user.id)"
                    />
                  </td>
                  <td class="px-4 py-3 text-sm font-medium">{{ user.name }}</td>
                  <td class="text-muted-foreground px-4 py-3 text-sm">{{ user.email }}</td>
                  <td class="px-4 py-3 text-sm">{{ user.location }}</td>
                  <td class="px-4 py-3 text-sm">
                    <ui-badge :variant="user.status === 'Active' ? 'default' : 'outline'">
                      {{ user.status }}
                    </ui-badge>
                  </td>
                  <td class="px-4 py-3 text-right text-sm tabular-nums">
                    {{ formatCurrency(user.balance) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ui-card>
      </div>

      <!-- With Avatar -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">With Avatar</h3>
        <ui-card class="overflow-hidden">
          <div class="overflow-auto">
            <table class="w-full">
              <thead class="bg-muted/50 border-b">
                <tr>
                  <th class="px-4 py-3 text-left text-sm font-medium">User</th>
                  <th class="px-4 py-3 text-left text-sm font-medium">Location</th>
                  <th class="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th class="px-4 py-3 text-right text-sm font-medium">Balance</th>
                  <th class="w-12 px-4 py-3"></th>
                </tr>
              </thead>
              <tbody class="divide-y">
                <tr v-for="(user, idx) in sampleUsers" :key="user.id" class="hover:bg-muted/50">
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-3">
                      <ui-avatar class="size-9">
                        <ui-avatar-image :src="`https://i.pravatar.cc/100?img=${idx + 10}`" />
                        <ui-avatar-fallback>{{ user.name.charAt(0) }}</ui-avatar-fallback>
                      </ui-avatar>
                      <div>
                        <p class="text-sm font-medium">{{ user.name }}</p>
                        <p class="text-muted-foreground text-xs">{{ user.email }}</p>
                      </div>
                    </div>
                  </td>
                  <td class="px-4 py-3 text-sm">{{ user.location }}</td>
                  <td class="px-4 py-3 text-sm">
                    <ui-badge :variant="user.status === 'Active' ? 'default' : 'outline'">
                      {{ user.status }}
                    </ui-badge>
                  </td>
                  <td class="px-4 py-3 text-right text-sm tabular-nums">
                    {{ formatCurrency(user.balance) }}
                  </td>
                  <td class="px-4 py-3">
                    <ui-dropdown-menu>
                      <ui-dropdown-menu-trigger as-child>
                        <ui-button variant="ghost" size="icon" class="size-8">
                          <ui-icon name="lucide:more-horizontal" class="size-4" />
                        </ui-button>
                      </ui-dropdown-menu-trigger>
                      <ui-dropdown-menu-content align="end">
                        <ui-dropdown-menu-item>
                          <ui-icon name="lucide:eye" class="mr-2 size-4" />
                          View
                        </ui-dropdown-menu-item>
                        <ui-dropdown-menu-item>
                          <ui-icon name="lucide:pencil" class="mr-2 size-4" />
                          Edit
                        </ui-dropdown-menu-item>
                        <ui-dropdown-menu-separator />
                        <ui-dropdown-menu-item class="text-destructive">
                          <ui-icon name="lucide:trash-2" class="mr-2 size-4" />
                          Delete
                        </ui-dropdown-menu-item>
                      </ui-dropdown-menu-content>
                    </ui-dropdown-menu>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ui-card>
      </div>

      <!-- Striped -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Striped Rows</h3>
        <ui-card class="overflow-hidden">
          <div class="overflow-auto">
            <table class="w-full">
              <thead class="bg-muted/50 border-b">
                <tr>
                  <th class="px-4 py-3 text-left text-sm font-medium">Name</th>
                  <th class="px-4 py-3 text-left text-sm font-medium">Email</th>
                  <th class="px-4 py-3 text-left text-sm font-medium">Location</th>
                  <th class="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th class="px-4 py-3 text-right text-sm font-medium">Balance</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="user in sampleUsers"
                  :key="user.id"
                  class="odd:bg-muted/30 hover:bg-muted/50"
                >
                  <td class="px-4 py-3 text-sm font-medium">{{ user.name }}</td>
                  <td class="text-muted-foreground px-4 py-3 text-sm">{{ user.email }}</td>
                  <td class="px-4 py-3 text-sm">{{ user.location }}</td>
                  <td class="px-4 py-3 text-sm">
                    <ui-badge :variant="user.status === 'Active' ? 'default' : 'outline'">
                      {{ user.status }}
                    </ui-badge>
                  </td>
                  <td class="px-4 py-3 text-right text-sm tabular-nums">
                    {{ formatCurrency(user.balance) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ui-card>
      </div>

      <!-- Environmental Compliance Table -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Environmental Compliance Tracking</h3>
        <ui-card class="overflow-hidden">
          <ui-card-header class="flex-row items-center justify-between space-y-0 border-b py-3">
            <div>
              <ui-card-title class="text-base">Permit Compliance Status</ui-card-title>
              <ui-card-description
                >Track environmental permits across all sites</ui-card-description
              >
            </div>
            <div class="flex gap-2">
              <ui-button variant="outline" size="sm">
                <ui-icon name="lucide:download" class="mr-1.5 size-3.5" />
                Export
              </ui-button>
              <ui-button size="sm">
                <ui-icon name="lucide:plus" class="mr-1.5 size-3.5" />
                Add Permit
              </ui-button>
            </div>
          </ui-card-header>
          <div class="overflow-auto">
            <table class="w-full">
              <thead class="bg-muted/50 border-b">
                <tr>
                  <th class="px-4 py-3 text-left text-sm font-medium">Site</th>
                  <th class="px-4 py-3 text-left text-sm font-medium">Permit #</th>
                  <th class="px-4 py-3 text-left text-sm font-medium">Type</th>
                  <th class="px-4 py-3 text-left text-sm font-medium">Status</th>
                  <th class="px-4 py-3 text-left text-sm font-medium">Last Audit</th>
                  <th class="px-4 py-3 text-left text-sm font-medium">Next Due</th>
                  <th class="px-4 py-3 text-left text-sm font-medium">Score</th>
                  <th class="w-12 px-4 py-3"></th>
                </tr>
              </thead>
              <tbody class="divide-y">
                <tr v-for="item in complianceData" :key="item.id" class="hover:bg-muted/50">
                  <td class="px-4 py-3 text-sm font-medium">{{ item.site }}</td>
                  <td class="text-muted-foreground px-4 py-3 font-mono text-sm">
                    {{ item.permit }}
                  </td>
                  <td class="px-4 py-3 text-sm">{{ item.type }}</td>
                  <td class="px-4 py-3 text-sm">
                    <ui-badge
                      :variant="
                        item.status === 'Compliant'
                          ? 'default'
                          : item.status === 'Warning'
                            ? 'secondary'
                            : 'destructive'
                      "
                      :class="{
                        'bg-green-500': item.status === 'Compliant',
                        'bg-yellow-500': item.status === 'Warning',
                      }"
                    >
                      {{ item.status }}
                    </ui-badge>
                  </td>
                  <td class="px-4 py-3 text-sm">{{ item.lastAudit }}</td>
                  <td class="px-4 py-3 text-sm">
                    <span
                      :class="{
                        'font-medium text-red-500': new Date(item.nextDue) < new Date('2024-05-01'),
                      }"
                    >
                      {{ item.nextDue }}
                    </span>
                  </td>
                  <td class="px-4 py-3">
                    <div class="flex items-center gap-2">
                      <ui-progress :model-value="item.score" class="h-2 w-16" />
                      <span
                        class="text-sm font-medium tabular-nums"
                        :class="{
                          'text-green-600': item.score >= 90,
                          'text-yellow-600': item.score >= 80 && item.score < 90,
                          'text-red-600': item.score < 80,
                        }"
                      >
                        {{ item.score }}%
                      </span>
                    </div>
                  </td>
                  <td class="px-4 py-3">
                    <ui-button variant="ghost" size="sm">View</ui-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <ui-card-footer class="flex items-center justify-between border-t py-3">
            <p class="text-muted-foreground text-sm">Showing {{ complianceData.length }} permits</p>
            <div class="flex items-center gap-2">
              <ui-button variant="outline" size="sm" disabled>
                <ui-icon name="lucide:chevron-left" class="size-4" />
              </ui-button>
              <ui-button variant="outline" size="sm" class="bg-primary/10">1</ui-button>
              <ui-button variant="outline" size="sm">2</ui-button>
              <ui-button variant="outline" size="sm">3</ui-button>
              <ui-button variant="outline" size="sm">
                <ui-icon name="lucide:chevron-right" class="size-4" />
              </ui-button>
            </div>
          </ui-card-footer>
        </ui-card>
      </div>

      <!-- Dense Table -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Dense / Compact</h3>
        <ui-card class="overflow-hidden">
          <div class="overflow-auto">
            <table class="w-full">
              <thead class="bg-muted/50 border-b">
                <tr>
                  <th class="px-3 py-2 text-left text-xs font-medium">Name</th>
                  <th class="px-3 py-2 text-left text-xs font-medium">Email</th>
                  <th class="px-3 py-2 text-left text-xs font-medium">Location</th>
                  <th class="px-3 py-2 text-left text-xs font-medium">Status</th>
                  <th class="px-3 py-2 text-right text-xs font-medium">Balance</th>
                </tr>
              </thead>
              <tbody class="divide-y">
                <tr v-for="user in sampleUsers" :key="user.id" class="hover:bg-muted/50">
                  <td class="px-3 py-2 text-xs font-medium">{{ user.name }}</td>
                  <td class="text-muted-foreground px-3 py-2 text-xs">{{ user.email }}</td>
                  <td class="px-3 py-2 text-xs">{{ user.location }}</td>
                  <td class="px-3 py-2 text-xs">
                    <span
                      class="inline-flex items-center rounded-full px-1.5 py-0.5 text-xs font-medium"
                      :class="{
                        'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400':
                          user.status === 'Active',
                        'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400':
                          user.status === 'Inactive',
                      }"
                    >
                      {{ user.status }}
                    </span>
                  </td>
                  <td class="px-3 py-2 text-right text-xs tabular-nums">
                    {{ formatCurrency(user.balance) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </ui-card>
      </div>
    </div>

    <template #live>
      <div class="flex flex-col gap-4">
        <h4 class="font-medium">DataTable Features</h4>
        <ul class="text-muted-foreground space-y-2 text-sm">
          <li><strong class="text-foreground">Sorting</strong> - Click column headers to sort</li>
          <li><strong class="text-foreground">Filtering</strong> - Search across all columns</li>
          <li>
            <strong class="text-foreground">Row Selection</strong> - Multi-select with checkboxes
          </li>
          <li><strong class="text-foreground">Pagination</strong> - Navigate large datasets</li>
          <li><strong class="text-foreground">Export</strong> - CSV, Excel, PDF, Print</li>
          <li><strong class="text-foreground">Custom Cells</strong> - Avatars, badges, actions</li>
        </ul>
        <p class="text-muted-foreground mt-2 text-xs">
          For full DataTables.net integration with jQuery, see the
          <a href="https://datatables.net" class="text-primary underline">official docs</a>.
        </p>
      </div>
    </template>
  </component-section>
</template>
