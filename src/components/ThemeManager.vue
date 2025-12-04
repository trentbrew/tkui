<script setup lang="ts">
  import { computed, ref } from "vue";
  import type { Theme } from "../types/theme";

  import { useThemes } from "../composables/useThemes";

  const {
    allThemes,
    presetThemes,
    customThemes,
    activeTheme,
    pinnedThemes,
    currentMode,
    applyTheme,
    createTheme,
    deleteTheme,
    duplicateTheme,
    togglePinned,
    isPinned,
    downloadTheme,
    uploadTheme,
    getThemeSwatches,
    toggleMode,
  } = useThemes();

  // State
  const searchQuery = ref("");
  const isCreateDialogOpen = ref(false);
  const isDeleteDialogOpen = ref(false);
  const themeToDelete = ref<string | null>(null);
  const activeTab = ref<"all" | "presets" | "custom" | "pinned">("all");

  // New theme form
  const newThemeName = ref("");
  const newThemeDescription = ref("");
  const selectedBasePreset = ref("");

  // Filtered themes based on search and tab
  const filteredThemes = computed(() => {
    let themes: Theme[] = [];

    switch (activeTab.value) {
      case "presets":
        themes = presetThemes.value;
        break;
      case "custom":
        themes = customThemes.value;
        break;
      case "pinned":
        themes = pinnedThemes.value;
        break;
      default:
        themes = allThemes.value;
    }

    if (!searchQuery.value) return themes;

    const query = searchQuery.value.toLowerCase();
    return themes.filter(
      (t) =>
        t.name.toLowerCase().includes(query) ||
        t.description?.toLowerCase().includes(query) ||
        t.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  });

  // Preset options for the create dialog
  const presetOptions = computed(() => {
    return presetThemes.value.map((t) => ({
      key: t.presetKey!,
      label: t.name,
      swatches: getThemeSwatches(t),
    }));
  });

  // Handlers
  function handleCreateTheme() {
    if (!newThemeName.value.trim()) return;

    const theme = createTheme({
      name: newThemeName.value,
      description: newThemeDescription.value,
      basePresetKey: selectedBasePreset.value || undefined,
    });

    // Apply the newly created theme
    applyTheme(theme.id);

    // Reset form
    newThemeName.value = "";
    newThemeDescription.value = "";
    selectedBasePreset.value = "";
    isCreateDialogOpen.value = false;
  }

  function handleDeleteTheme(id: string) {
    themeToDelete.value = id;
    isDeleteDialogOpen.value = true;
  }

  function confirmDelete() {
    if (themeToDelete.value) {
      deleteTheme(themeToDelete.value);
      themeToDelete.value = null;
    }
    isDeleteDialogOpen.value = false;
  }

  function handleDuplicate(id: string) {
    const theme = duplicateTheme(id);
    if (theme) {
      applyTheme(theme.id);
    }
  }

  function handleExport(id: string) {
    downloadTheme(id);
  }

  async function handleImport() {
    const theme = await uploadTheme();
    if (theme) {
      applyTheme(theme.id);
    }
  }

  function getColorPreview(theme: Theme): string[] {
    return getThemeSwatches(theme, currentMode.value);
  }

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }
</script>

<template>
  <div class="flex flex-col gap-6">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold">Themes</h2>
        <p class="text-muted-foreground mt-1 text-sm">
          Browse and apply color schemes to your interface
        </p>
      </div>
      <div class="flex gap-2">
        <ui-button variant="outline" @click="handleImport">
          <ui-icon name="lucide:upload" class="mr-2 h-4 w-4" />
          Import
        </ui-button>
        <ui-button @click="isCreateDialogOpen = true">
          <ui-icon name="lucide:plus" class="mr-2 h-4 w-4" />
          New Theme
        </ui-button>
      </div>
    </div>

    <!-- Tabs & Search -->
    <div class="flex flex-col gap-4 sm:flex-row">
      <ui-tabs v-model="activeTab" class="w-full sm:w-auto">
        <ui-tabs-list>
          <ui-tabs-trigger value="all">All</ui-tabs-trigger>
          <ui-tabs-trigger value="presets">Presets</ui-tabs-trigger>
          <ui-tabs-trigger value="custom">Custom</ui-tabs-trigger>
          <ui-tabs-trigger value="pinned">
            <ui-icon name="lucide:star" class="mr-1 h-3 w-3" />
            Pinned
          </ui-tabs-trigger>
        </ui-tabs-list>
      </ui-tabs>

      <!-- Global Mode Toggle -->
      <ui-button variant="outline" size="sm" @click="toggleMode()" class="gap-2">
        <ui-icon :name="currentMode === 'dark' ? 'lucide:sun' : 'lucide:moon'" class="h-4 w-4" />
        {{ currentMode === "dark" ? "Light" : "Dark" }}
      </ui-button>

      <div class="relative flex-1">
        <ui-icon
          name="lucide:search"
          class="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2"
        />
        <ui-input v-model="searchQuery" placeholder="Search themes..." class="pl-9" />
      </div>
    </div>

    <!-- Themes Grid -->
    <div
      v-if="filteredThemes.length > 0"
      class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      <ui-card
        v-for="theme in filteredThemes"
        :key="theme.id"
        :class="{
          'ring-primary ring-2': activeTheme?.id === theme.id,
        }"
        class="group relative cursor-pointer overflow-hidden transition-all hover:shadow-lg"
        @click="applyTheme(theme.id)"
      >
        <!-- Color Preview Bar -->
        <div class="flex h-4 translate-y-4">
          <div
            v-for="(color, index) in getColorPreview(theme)"
            :key="index"
            :style="{ backgroundColor: color }"
            class="flex-1 transition-all"
          />
        </div>

        <!-- Mode Toggle -->
        <button
          @click.stop="toggleMode()"
          class="bg-background/80 hover:bg-background absolute top-2 left-2 rounded-full p-1.5 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
          :title="currentMode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <ui-icon
            :name="currentMode === 'dark' ? 'lucide:sun' : 'lucide:moon'"
            class="text-muted-foreground h-4 w-4"
          />
        </button>

        <!-- Pin Button -->
        <button
          @click.stop="togglePinned(theme.id)"
          class="bg-background/80 hover:bg-background absolute top-2 right-2 rounded-full p-1.5 opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100"
          :class="{ 'opacity-100': isPinned(theme.id) }"
        >
          <ui-icon
            :name="isPinned(theme.id) ? 'lucide:star' : 'lucide:star'"
            class="h-4 w-4"
            :class="
              isPinned(theme.id) ? 'fill-yellow-500 text-yellow-500' : 'text-muted-foreground'
            "
          />
        </button>

        <ui-card-header class="pb-0">
          <div class="flex items-start justify-start">
            <div class="flex-1">
              <ui-card-title class="flex items-center gap-2 text-lg">
                {{ theme.name }}
                <ui-badge v-if="activeTheme?.id === theme.id" variant="default" class="text-xs">
                  Active
                </ui-badge>
              </ui-card-title>
            </div>
          </div>
        </ui-card-header>

        <!-- <ui-card-content class="pt-0 opacity-75 text-xs">
                    <p>Description here</p>
                </ui-card-content> -->

        <ui-card-footer class="flex gap-2 pt-0">
          <ui-button
            v-if="activeTheme?.id !== theme.id"
            variant="secondary"
            size="sm"
            class="flex-1"
            @click.stop="applyTheme(theme.id)"
          >
            Apply
          </ui-button>
          <ui-button v-else variant="outline" size="sm" class="flex-1" disabled>
            <ui-icon name="lucide:check" class="mr-1 h-3 w-3" />
            Applied
          </ui-button>

          <ui-dropdown-menu>
            <ui-dropdown-menu-trigger as-child>
              <ui-button variant="outline" size="sm" @click.stop>
                <ui-icon name="lucide:more-horizontal" class="h-4 w-4" />
              </ui-button>
            </ui-dropdown-menu-trigger>
            <ui-dropdown-menu-content align="end">
              <ui-dropdown-menu-item @click="handleDuplicate(theme.id)">
                <ui-icon name="lucide:copy" class="mr-2 h-4 w-4" />
                Duplicate
              </ui-dropdown-menu-item>
              <ui-dropdown-menu-item @click="handleExport(theme.id)">
                <ui-icon name="lucide:download" class="mr-2 h-4 w-4" />
                Export
              </ui-dropdown-menu-item>
              <ui-dropdown-menu-item @click.stop="togglePinned(theme.id)">
                <ui-icon
                  :name="isPinned(theme.id) ? 'lucide:star-off' : 'lucide:star'"
                  class="mr-2 h-4 w-4"
                />
                {{ isPinned(theme.id) ? "Unpin" : "Pin to favorites" }}
              </ui-dropdown-menu-item>
              <template v-if="theme.source === 'custom'">
                <ui-dropdown-menu-separator />
                <ui-dropdown-menu-item
                  @click="handleDeleteTheme(theme.id)"
                  class="text-destructive focus:text-destructive"
                >
                  <ui-icon name="lucide:trash-2" class="mr-2 h-4 w-4" />
                  Delete
                </ui-dropdown-menu-item>
              </template>
            </ui-dropdown-menu-content>
          </ui-dropdown-menu>
        </ui-card-footer>
      </ui-card>
    </div>

    <!-- Empty States -->
    <ui-empty v-else-if="activeTab === 'custom' && customThemes.length === 0" class="py-12">
      <template #icon>
        <ui-icon name="lucide:paintbrush" class="h-12 w-12" />
      </template>
      <template #title>No custom themes yet</template>
      <template #description>
        Create your first custom theme or duplicate a preset to customize it
      </template>
      <template #action>
        <ui-button @click="isCreateDialogOpen = true">
          <ui-icon name="lucide:plus" class="mr-2 h-4 w-4" />
          Create Theme
        </ui-button>
      </template>
    </ui-empty>

    <ui-empty v-else-if="activeTab === 'pinned' && pinnedThemes.length === 0" class="py-12">
      <template #icon>
        <ui-icon name="lucide:star" class="h-12 w-12" />
      </template>
      <template #title>No pinned themes</template>
      <template #description> Pin your favorite themes for quick access </template>
    </ui-empty>

    <ui-empty v-else class="py-12">
      <template #icon>
        <ui-icon name="lucide:search-x" class="h-12 w-12" />
      </template>
      <template #title>No themes found</template>
      <template #description> Try adjusting your search query </template>
    </ui-empty>

    <!-- Create Dialog -->
    <ui-dialog v-model:open="isCreateDialogOpen">
      <ui-dialog-content>
        <ui-dialog-header>
          <ui-dialog-title>Create Custom Theme</ui-dialog-title>
          <ui-dialog-description>
            Create a new theme to customize your color scheme
          </ui-dialog-description>
        </ui-dialog-header>

        <div class="space-y-4 py-4">
          <div class="space-y-2">
            <ui-label for="theme-name">Name *</ui-label>
            <ui-input
              id="theme-name"
              v-model="newThemeName"
              placeholder="My Custom Theme"
              @keydown.enter="handleCreateTheme"
            />
          </div>

          <div class="space-y-2">
            <ui-label for="theme-description">Description</ui-label>
            <ui-textarea
              id="theme-description"
              v-model="newThemeDescription"
              placeholder="A brief description of this theme"
              :rows="2"
            />
          </div>

          <div class="space-y-2">
            <div class="flex items-center justify-between gap-2">
              <ui-label>Start from preset</ui-label>
              <ui-button
                v-if="selectedBasePreset"
                variant="ghost"
                size="xs"
                @click="selectedBasePreset = ''"
              >
                Clear
              </ui-button>
            </div>
            <div class="grid max-h-48 grid-cols-2 gap-2 overflow-y-auto pr-1">
              <button
                v-for="preset in presetOptions"
                :key="preset.key"
                type="button"
                @click="selectedBasePreset = preset.key"
                class="group hover:border-primary focus-visible:ring-primary/50 flex flex-col rounded-md border p-2 text-left transition-all focus-visible:ring-2 focus-visible:outline-none"
                :class="
                  selectedBasePreset === preset.key
                    ? 'border-primary bg-accent/40'
                    : 'border-border'
                "
              >
                <div class="flex items-center justify-between">
                  <span class="truncate text-xs font-medium">{{ preset.label }}</span>
                  <ui-icon
                    v-if="selectedBasePreset === preset.key"
                    name="lucide:check"
                    class="text-primary h-3 w-3 flex-shrink-0"
                  />
                </div>
                <div class="mt-1.5 flex gap-0.5">
                  <span
                    v-for="(swatch, idx) in preset.swatches"
                    :key="idx"
                    class="h-4 flex-1 rounded-sm first:rounded-l last:rounded-r"
                    :style="{ backgroundColor: swatch }"
                  />
                </div>
              </button>
            </div>
          </div>
        </div>

        <ui-dialog-footer>
          <ui-button variant="outline" @click="isCreateDialogOpen = false"> Cancel </ui-button>
          <ui-button @click="handleCreateTheme" :disabled="!newThemeName.trim()">
            Create Theme
          </ui-button>
        </ui-dialog-footer>
      </ui-dialog-content>
    </ui-dialog>

    <!-- Delete Confirmation Dialog -->
    <ui-alert-dialog v-model:open="isDeleteDialogOpen">
      <ui-alert-dialog-content>
        <ui-alert-dialog-header>
          <ui-alert-dialog-title>Delete Theme?</ui-alert-dialog-title>
          <ui-alert-dialog-description>
            This action cannot be undone. This will permanently delete this custom theme.
          </ui-alert-dialog-description>
        </ui-alert-dialog-header>
        <ui-alert-dialog-footer>
          <ui-alert-dialog-cancel>Cancel</ui-alert-dialog-cancel>
          <ui-alert-dialog-action
            @click="confirmDelete"
            class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Delete
          </ui-alert-dialog-action>
        </ui-alert-dialog-footer>
      </ui-alert-dialog-content>
    </ui-alert-dialog>
  </div>
</template>
