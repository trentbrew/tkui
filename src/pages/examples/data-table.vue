<template>
  <div class="space-y-6 p-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-bold">Permits</h1>
        <p class="text-muted-foreground">Manage environmental permits across facilities</p>
      </div>
      <ui-button>
        <ui-icon name="lucide:plus" class="mr-2 size-4" />
        Add Permit
      </ui-button>
    </div>

    <!-- Filters & Search -->
    <ui-card>
      <ui-card-content class="pt-6">
        <div class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div class="flex flex-1 items-center gap-3">
            <div class="relative max-w-sm flex-1">
              <ui-icon
                name="lucide:search"
                class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
              />
              <ui-input v-model="searchQuery" placeholder="Search permits..." class="pl-9" />
            </div>
            <ui-select v-model="filterFacility" class="w-[180px]">
              <ui-select-trigger>
                <ui-select-value placeholder="All Facilities" />
              </ui-select-trigger>
              <ui-select-content>
                <ui-select-item value="all">All Facilities</ui-select-item>
                <ui-select-item v-for="facility in facilities" :key="facility" :value="facility">
                  {{ facility }}
                </ui-select-item>
              </ui-select-content>
            </ui-select>
            <ui-select v-model="filterStatus" class="w-[150px]">
              <ui-select-trigger>
                <ui-select-value placeholder="All Status" />
              </ui-select-trigger>
              <ui-select-content>
                <ui-select-item value="all">All Status</ui-select-item>
                <ui-select-item value="active">Active</ui-select-item>
                <ui-select-item value="expiring">Expiring Soon</ui-select-item>
                <ui-select-item value="expired">Expired</ui-select-item>
                <ui-select-item value="pending">Pending</ui-select-item>
              </ui-select-content>
            </ui-select>
            <ui-select v-model="filterType" class="w-[150px]">
              <ui-select-trigger>
                <ui-select-value placeholder="All Types" />
              </ui-select-trigger>
              <ui-select-content>
                <ui-select-item value="all">All Types</ui-select-item>
                <ui-select-item value="air">Air</ui-select-item>
                <ui-select-item value="water">Water</ui-select-item>
                <ui-select-item value="waste">Waste</ui-select-item>
                <ui-select-item value="stormwater">Stormwater</ui-select-item>
              </ui-select-content>
            </ui-select>
          </div>
          <div class="flex items-center gap-2">
            <ui-button variant="outline" size="icon">
              <ui-icon name="lucide:download" class="size-4" />
            </ui-button>
            <ui-button variant="outline" size="icon">
              <ui-icon name="lucide:settings-2" class="size-4" />
            </ui-button>
          </div>
        </div>

        <!-- Active Filters -->
        <div v-if="hasActiveFilters" class="mt-4 flex items-center gap-2 border-t pt-4">
          <span class="text-muted-foreground text-sm">Active filters:</span>
          <ui-badge v-if="filterFacility !== 'all'" variant="secondary" class="gap-1">
            {{ filterFacility }}
            <button @click="filterFacility = 'all'" class="hover:text-foreground ml-1">
              <ui-icon name="lucide:x" class="size-3" />
            </button>
          </ui-badge>
          <ui-badge v-if="filterStatus !== 'all'" variant="secondary" class="gap-1">
            {{ filterStatus }}
            <button @click="filterStatus = 'all'" class="hover:text-foreground ml-1">
              <ui-icon name="lucide:x" class="size-3" />
            </button>
          </ui-badge>
          <ui-badge v-if="filterType !== 'all'" variant="secondary" class="gap-1">
            {{ filterType }}
            <button @click="filterType = 'all'" class="hover:text-foreground ml-1">
              <ui-icon name="lucide:x" class="size-3" />
            </button>
          </ui-badge>
          <ui-button variant="ghost" size="sm" @click="clearFilters"> Clear all </ui-button>
        </div>
      </ui-card-content>
    </ui-card>

    <!-- Data Table -->
    <ui-card>
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-muted/50 border-b">
              <th class="h-12 px-4 text-left align-middle">
                <ui-checkbox
                  :checked="isAllSelected"
                  :indeterminate="isIndeterminate"
                  @update:checked="toggleSelectAll"
                />
              </th>
              <th
                v-for="column in columns"
                :key="column.key"
                class="text-muted-foreground hover:text-foreground h-12 cursor-pointer px-4 text-left align-middle font-medium transition-colors"
                @click="toggleSort(column.key)"
              >
                <div class="flex items-center gap-2">
                  {{ column.label }}
                  <ui-icon
                    v-if="sortKey === column.key"
                    :name="sortOrder === 'asc' ? 'lucide:arrow-up' : 'lucide:arrow-down'"
                    class="size-3"
                  />
                </div>
              </th>
              <th class="text-muted-foreground h-12 px-4 text-right align-middle font-medium">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="permit in paginatedPermits"
              :key="permit.id"
              class="hover:bg-muted/50 border-b transition-colors"
              :class="{ 'bg-muted/30': selectedIds.has(permit.id) }"
            >
              <td class="p-4 align-middle">
                <ui-checkbox
                  :checked="selectedIds.has(permit.id)"
                  @update:checked="toggleSelect(permit.id)"
                />
              </td>
              <td class="p-4 align-middle">
                <div class="flex items-center gap-3">
                  <div
                    class="flex size-9 items-center justify-center rounded-lg"
                    :class="getTypeClass(permit.type)"
                  >
                    <ui-icon :name="getTypeIcon(permit.type)" class="size-4" />
                  </div>
                  <div>
                    <div class="font-medium">{{ permit.number }}</div>
                    <div class="text-muted-foreground text-sm">{{ permit.name }}</div>
                  </div>
                </div>
              </td>
              <td class="p-4 align-middle">
                <ui-badge variant="outline">{{ permit.type }}</ui-badge>
              </td>
              <td class="p-4 align-middle">{{ permit.facility }}</td>
              <td class="p-4 align-middle">
                <ui-badge :variant="getStatusVariant(permit.status)">
                  {{ permit.status }}
                </ui-badge>
              </td>
              <td class="p-4 align-middle">{{ formatDate(permit.issueDate) }}</td>
              <td class="p-4 align-middle">
                <span :class="getExpirationClass(permit.expirationDate)">
                  {{ formatDate(permit.expirationDate) }}
                </span>
              </td>
              <td class="p-4 text-right align-middle">
                <ui-dropdown-menu>
                  <ui-dropdown-menu-trigger as-child>
                    <ui-button variant="ghost" size="icon" class="size-8">
                      <ui-icon name="lucide:more-horizontal" class="size-4" />
                    </ui-button>
                  </ui-dropdown-menu-trigger>
                  <ui-dropdown-menu-content align="end">
                    <ui-dropdown-menu-item>
                      <ui-icon name="lucide:eye" class="mr-2 size-4" />
                      View Details
                    </ui-dropdown-menu-item>
                    <ui-dropdown-menu-item>
                      <ui-icon name="lucide:file-text" class="mr-2 size-4" />
                      View Document
                    </ui-dropdown-menu-item>
                    <ui-dropdown-menu-item>
                      <ui-icon name="lucide:edit" class="mr-2 size-4" />
                      Edit
                    </ui-dropdown-menu-item>
                    <ui-dropdown-menu-separator />
                    <ui-dropdown-menu-item>
                      <ui-icon name="lucide:copy" class="mr-2 size-4" />
                      Duplicate
                    </ui-dropdown-menu-item>
                    <ui-dropdown-menu-item>
                      <ui-icon name="lucide:archive" class="mr-2 size-4" />
                      Archive
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

      <!-- Pagination -->
      <div class="flex items-center justify-between border-t px-4 py-4">
        <div class="text-muted-foreground text-sm">
          <span v-if="selectedIds.size > 0">
            {{ selectedIds.size }} of {{ filteredPermits.length }} row(s) selected.
          </span>
          <span v-else>
            Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ filteredPermits.length }} results
          </span>
        </div>
        <div class="flex items-center gap-6">
          <div class="flex items-center gap-2">
            <span class="text-muted-foreground text-sm">Rows per page</span>
            <ui-select v-model="pageSize" class="w-[70px]">
              <ui-select-trigger>
                <ui-select-value />
              </ui-select-trigger>
              <ui-select-content>
                <ui-select-item value="10">10</ui-select-item>
                <ui-select-item value="20">20</ui-select-item>
                <ui-select-item value="50">50</ui-select-item>
                <ui-select-item value="100">100</ui-select-item>
              </ui-select-content>
            </ui-select>
          </div>
          <div class="flex items-center gap-2">
            <span class="text-muted-foreground text-sm">
              Page {{ currentPage }} of {{ totalPages }}
            </span>
            <div class="flex items-center gap-1">
              <ui-button
                variant="outline"
                size="icon"
                class="size-8"
                :disabled="currentPage === 1"
                @click="currentPage = 1"
              >
                <ui-icon name="lucide:chevrons-left" class="size-4" />
              </ui-button>
              <ui-button
                variant="outline"
                size="icon"
                class="size-8"
                :disabled="currentPage === 1"
                @click="currentPage--"
              >
                <ui-icon name="lucide:chevron-left" class="size-4" />
              </ui-button>
              <ui-button
                variant="outline"
                size="icon"
                class="size-8"
                :disabled="currentPage === totalPages"
                @click="currentPage++"
              >
                <ui-icon name="lucide:chevron-right" class="size-4" />
              </ui-button>
              <ui-button
                variant="outline"
                size="icon"
                class="size-8"
                :disabled="currentPage === totalPages"
                @click="currentPage = totalPages"
              >
                <ui-icon name="lucide:chevrons-right" class="size-4" />
              </ui-button>
            </div>
          </div>
        </div>
      </div>
    </ui-card>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from "vue";

  interface Permit {
    id: string;
    number: string;
    name: string;
    type: "Air" | "Water" | "Waste" | "Stormwater";
    facility: string;
    status: "Active" | "Expiring Soon" | "Expired" | "Pending";
    issueDate: string;
    expirationDate: string;
  }

  const searchQuery = ref("");
  const filterFacility = ref("all");
  const filterStatus = ref("all");
  const filterType = ref("all");
  const sortKey = ref("number");
  const sortOrder = ref<"asc" | "desc">("asc");
  const currentPage = ref(1);
  const pageSize = ref("10");
  const selectedIds = ref(new Set<string>());

  const facilities = [
    "Texas Steel Mill",
    "Indiana Bar Mill",
    "Arkansas Sheet Mill",
    "Utah Plate Mill",
  ];

  const columns = [
    { key: "number", label: "Permit" },
    { key: "type", label: "Type" },
    { key: "facility", label: "Facility" },
    { key: "status", label: "Status" },
    { key: "issueDate", label: "Issue Date" },
    { key: "expirationDate", label: "Expiration" },
  ];

  const permits = ref<Permit[]>([
    {
      id: "1",
      number: "AIR-2024-001",
      name: "Title V Operating Permit",
      type: "Air",
      facility: "Texas Steel Mill",
      status: "Active",
      issueDate: "2024-01-15",
      expirationDate: "2029-01-14",
    },
    {
      id: "2",
      number: "AIR-2024-002",
      name: "NESHAP Subpart ZZZZ",
      type: "Air",
      facility: "Texas Steel Mill",
      status: "Active",
      issueDate: "2024-03-01",
      expirationDate: "2029-02-28",
    },
    {
      id: "3",
      number: "WTR-2023-015",
      name: "NPDES Discharge Permit",
      type: "Water",
      facility: "Indiana Bar Mill",
      status: "Expiring Soon",
      issueDate: "2018-06-01",
      expirationDate: "2024-05-31",
    },
    {
      id: "4",
      number: "WST-2022-008",
      name: "RCRA Part B Permit",
      type: "Waste",
      facility: "Arkansas Sheet Mill",
      status: "Active",
      issueDate: "2022-09-15",
      expirationDate: "2032-09-14",
    },
    {
      id: "5",
      number: "STW-2024-003",
      name: "Industrial Stormwater",
      type: "Stormwater",
      facility: "Utah Plate Mill",
      status: "Pending",
      issueDate: "2024-04-01",
      expirationDate: "2029-03-31",
    },
    {
      id: "6",
      number: "AIR-2021-045",
      name: "PSD Construction Permit",
      type: "Air",
      facility: "Indiana Bar Mill",
      status: "Active",
      issueDate: "2021-11-20",
      expirationDate: "2026-11-19",
    },
    {
      id: "7",
      number: "WTR-2020-022",
      name: "Pretreatment Permit",
      type: "Water",
      facility: "Texas Steel Mill",
      status: "Expired",
      issueDate: "2015-08-01",
      expirationDate: "2020-07-31",
    },
    {
      id: "8",
      number: "WST-2023-011",
      name: "Used Oil Handler",
      type: "Waste",
      facility: "Utah Plate Mill",
      status: "Active",
      issueDate: "2023-02-15",
      expirationDate: "2028-02-14",
    },
    {
      id: "9",
      number: "AIR-2023-067",
      name: "Minor Source Permit",
      type: "Air",
      facility: "Arkansas Sheet Mill",
      status: "Active",
      issueDate: "2023-07-01",
      expirationDate: "2028-06-30",
    },
    {
      id: "10",
      number: "STW-2022-009",
      name: "Construction Stormwater",
      type: "Stormwater",
      facility: "Indiana Bar Mill",
      status: "Expiring Soon",
      issueDate: "2022-03-15",
      expirationDate: "2024-03-14",
    },
    {
      id: "11",
      number: "WTR-2024-004",
      name: "Cooling Water Intake",
      type: "Water",
      facility: "Texas Steel Mill",
      status: "Pending",
      issueDate: "2024-05-01",
      expirationDate: "2029-04-30",
    },
    {
      id: "12",
      number: "AIR-2022-033",
      name: "Acid Rain Permit",
      type: "Air",
      facility: "Utah Plate Mill",
      status: "Active",
      issueDate: "2022-01-01",
      expirationDate: "2027-12-31",
    },
  ]);

  const hasActiveFilters = computed(() => {
    return (
      filterFacility.value !== "all" || filterStatus.value !== "all" || filterType.value !== "all"
    );
  });

  const filteredPermits = computed(() => {
    let result = [...permits.value];

    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(
        (p) =>
          p.number.toLowerCase().includes(query) ||
          p.name.toLowerCase().includes(query) ||
          p.facility.toLowerCase().includes(query)
      );
    }

    if (filterFacility.value !== "all") {
      result = result.filter((p) => p.facility === filterFacility.value);
    }

    if (filterStatus.value !== "all") {
      const statusMap: Record<string, string> = {
        active: "Active",
        expiring: "Expiring Soon",
        expired: "Expired",
        pending: "Pending",
      };
      result = result.filter((p) => p.status === statusMap[filterStatus.value]);
    }

    if (filterType.value !== "all") {
      const typeMap: Record<string, string> = {
        air: "Air",
        water: "Water",
        waste: "Waste",
        stormwater: "Stormwater",
      };
      result = result.filter((p) => p.type === typeMap[filterType.value]);
    }

    // Sort
    result.sort((a, b) => {
      const aVal = a[sortKey.value as keyof Permit];
      const bVal = b[sortKey.value as keyof Permit];
      const comparison = String(aVal).localeCompare(String(bVal));
      return sortOrder.value === "asc" ? comparison : -comparison;
    });

    return result;
  });

  const totalPages = computed(() =>
    Math.ceil(filteredPermits.value.length / Number(pageSize.value))
  );
  const startIndex = computed(() => (currentPage.value - 1) * Number(pageSize.value));
  const endIndex = computed(() =>
    Math.min(startIndex.value + Number(pageSize.value), filteredPermits.value.length)
  );
  const paginatedPermits = computed(() =>
    filteredPermits.value.slice(startIndex.value, endIndex.value)
  );

  const isAllSelected = computed(() => {
    return (
      paginatedPermits.value.length > 0 &&
      paginatedPermits.value.every((p) => selectedIds.value.has(p.id))
    );
  });

  const isIndeterminate = computed(() => {
    const selected = paginatedPermits.value.filter((p) => selectedIds.value.has(p.id)).length;
    return selected > 0 && selected < paginatedPermits.value.length;
  });

  function toggleSort(key: string) {
    if (sortKey.value === key) {
      sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";
    } else {
      sortKey.value = key;
      sortOrder.value = "asc";
    }
  }

  function toggleSelect(id: string) {
    if (selectedIds.value.has(id)) {
      selectedIds.value.delete(id);
    } else {
      selectedIds.value.add(id);
    }
    selectedIds.value = new Set(selectedIds.value);
  }

  function toggleSelectAll(checked: boolean) {
    if (checked) {
      paginatedPermits.value.forEach((p) => selectedIds.value.add(p.id));
    } else {
      paginatedPermits.value.forEach((p) => selectedIds.value.delete(p.id));
    }
    selectedIds.value = new Set(selectedIds.value);
  }

  function clearFilters() {
    filterFacility.value = "all";
    filterStatus.value = "all";
    filterType.value = "all";
    searchQuery.value = "";
  }

  function formatDate(date: string): string {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  function getTypeIcon(type: string): string {
    const icons: Record<string, string> = {
      Air: "lucide:wind",
      Water: "lucide:droplets",
      Waste: "lucide:trash-2",
      Stormwater: "lucide:cloud-rain",
    };
    return icons[type] || "lucide:file";
  }

  function getTypeClass(type: string): string {
    const classes: Record<string, string> = {
      Air: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      Water: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
      Waste: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
      Stormwater: "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400",
    };
    return classes[type] || "bg-gray-100 text-gray-700";
  }

  function getStatusVariant(status: string): "default" | "secondary" | "destructive" | "outline" {
    const variants: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
      Active: "default",
      "Expiring Soon": "secondary",
      Expired: "destructive",
      Pending: "outline",
    };
    return variants[status] || "outline";
  }

  function getExpirationClass(date: string): string {
    const expDate = new Date(date);
    const now = new Date();
    const daysUntil = Math.ceil((expDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntil < 0) return "text-red-500 font-medium";
    if (daysUntil < 90) return "text-amber-500 font-medium";
    return "";
  }
</script>
