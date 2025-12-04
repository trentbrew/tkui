<script setup lang="ts">
import { ref, computed } from "vue";
import BrandProfileEditor from "./BrandProfileEditor.vue";
import { useBrandProfile } from "../composables/useBrandProfile";
import { useThemes } from "../composables/useThemes";
import { downloadProfile, uploadProfile } from "../utils/brandProfile";
import type { BrandProfile } from "../types/theme";
import { brandThemePresets } from "../config/brandThemePresets";

const { profiles, activeProfile, isEditing, applyBrandProfile, createProfile, deleteProfile, duplicateProfile, startEditing, stopEditing, importProfile } =
    useBrandProfile();

const { getThemeById, currentMode } = useThemes();

const isCreateDialogOpen = ref(false);
const isDeleteDialogOpen = ref(false);
const profileToDelete = ref<string | null>(null);

const newProfileName = ref("");
const newProfileDescription = ref("");
const newProfileAuthor = ref("");
const selectedPreset = ref("");

const searchQuery = ref("");

const filteredProfiles = computed(() => {
    if (!searchQuery.value) return profiles.value;
    const query = searchQuery.value.toLowerCase();
    return profiles.value.filter(
        (p) =>
            p.name.toLowerCase().includes(query) ||
            p.description?.toLowerCase().includes(query) ||
            p.metadata?.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
});

const presetOptions = computed(() => {
    return Object.entries(brandThemePresets).map(([key, preset]) => ({
        key,
        label: preset.label || key,
        swatches: ["primary", "secondary", "accent", "background"].map((colorKey) => {
            const light = preset.styles.light[colorKey as keyof typeof preset.styles.light];
            const darkFallback = preset.styles.dark[colorKey as keyof typeof preset.styles.dark];
            return (light || darkFallback || "#666") as string;
        }),
    }));
});

function handleCreateProfile() {
    if (!newProfileName.value.trim()) return;

    const profile = createProfile(newProfileName.value, {
        description: newProfileDescription.value,
        author: newProfileAuthor.value,
        presetKey: selectedPreset.value || undefined,
    });

    // Apply the newly created profile immediately
    if (profile) {
        applyBrandProfile(profile.id);
    }

    // Reset form
    newProfileName.value = "";
    newProfileDescription.value = "";
    newProfileAuthor.value = "";
    selectedPreset.value = "";
    isCreateDialogOpen.value = false;
}

function handleDeleteProfile(id: string) {
    profileToDelete.value = id;
    isDeleteDialogOpen.value = true;
}

function confirmDelete() {
    if (profileToDelete.value) {
        deleteProfile(profileToDelete.value);
        profileToDelete.value = null;
    }
    isDeleteDialogOpen.value = false;
}

function handleDuplicate(id: string) {
    duplicateProfile(id);
}

function handleExport(profile: BrandProfile) {
    downloadProfile(profile);
}

async function handleImport() {
    const profile = await uploadProfile();
    if (profile) {
        const imported = importProfile(JSON.stringify(profile));
        if (imported) {
            applyBrandProfile(imported.id);
        }
    }
}

function handleEdit(id: string) {
    startEditing(id);
}

function getColorPreview(profile: BrandProfile): string[] {
    const mode = currentMode.value;

    // If profile has a themeId, use that theme's colors with any overrides
    if (profile.themeId) {
        const theme = getThemeById(profile.themeId);
        if (theme) {
            const baseStyles = theme.styles[mode];
            const overrides = profile.themeOverrides?.[mode] || {};
            return [
                overrides.primary || baseStyles.primary,
                overrides.secondary || baseStyles.secondary,
                overrides.accent || baseStyles.accent,
                overrides.background || baseStyles.background,
            ];
        }
    }

    // Fall back to deprecated embedded theme if present
    if (profile.theme) {
        return [
            profile.theme[mode].primary,
            profile.theme[mode].secondary,
            profile.theme[mode].accent,
            profile.theme[mode].background,
        ];
    }

    // Default fallback colors
    return ["#6366f1", "#8b5cf6", "#ec4899", "#ffffff"];
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
                <h2 class="text-2xl font-bold">Brand Profiles</h2>
                <p class="text-sm text-muted-foreground mt-1">
                    Manage your custom brand themes and design systems
                </p>
            </div>
            <div class="flex gap-2">
                <ui-button variant="outline" @click="handleImport">
                    <ui-icon name="lucide:upload" class="mr-2 h-4 w-4" />
                    Import
                </ui-button>
                <ui-button @click="isCreateDialogOpen = true">
                    <ui-icon name="lucide:plus" class="mr-2 h-4 w-4" />
                    New Profile
                </ui-button>
            </div>
        </div>

        <!-- Search -->
        <div class="relative">
            <ui-icon name="lucide:search"
                class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <ui-input v-model="searchQuery" placeholder="Search profiles..." class="pl-9" />
        </div>

        <!-- Profiles Grid -->
        <div v-if="filteredProfiles.length > 0" class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <ui-card v-for="profile in filteredProfiles" :key="profile.id" :class="{
                'ring-2 ring-primary': activeProfile?.id === profile.id,
            }" class="relative overflow-hidden transition-all hover:shadow-lg">
                <!-- Color Preview Bar -->
                <div class="flex h-3">
                    <div v-for="(color, index) in getColorPreview(profile)" :key="index"
                        :style="{ backgroundColor: color }" class="flex-1" />
                </div>

                <ui-card-header>
                    <div class="flex items-start justify-between">
                        <div class="flex-1">
                            <ui-card-title class="text-lg">{{ profile.name }}</ui-card-title>
                            <ui-card-description v-if="profile.description" class="mt-1">
                                {{ profile.description }}
                            </ui-card-description>
                        </div>
                        <ui-badge v-if="activeProfile?.id === profile.id" variant="default">
                            Active
                        </ui-badge>
                    </div>
                </ui-card-header>

                <ui-card-content>
                    <div class="flex flex-wrap gap-2 mb-4">
                        <ui-chip v-if="profile.author" size="sm" variant="outline">
                            <ui-icon name="lucide:user" class="mr-1 h-3 w-3" />
                            {{ profile.author }}
                        </ui-chip>
                        <ui-chip v-for="tag in profile.metadata?.tags" :key="tag" size="sm" variant="secondary">
                            {{ tag }}
                        </ui-chip>
                    </div>

                    <div class="text-xs text-muted-foreground">
                        Updated {{ formatDate(profile.updatedAt) }}
                    </div>
                </ui-card-content>

                <ui-card-footer class="flex gap-2">
                    <ui-button v-if="activeProfile?.id !== profile.id" variant="default" size="sm" class="flex-1"
                        @click="applyBrandProfile(profile.id)">
                        Apply
                    </ui-button>
                    <ui-button v-else variant="outline" size="sm" class="flex-1" disabled>
                        <ui-icon name="lucide:check" class="mr-2 h-4 w-4" />
                        Applied
                    </ui-button>

                    <ui-dropdown-menu>
                        <ui-dropdown-menu-trigger as-child>
                            <ui-button variant="outline" size="sm">
                                <ui-icon name="lucide:more-horizontal" class="h-4 w-4" />
                            </ui-button>
                        </ui-dropdown-menu-trigger>
                        <ui-dropdown-menu-content align="end">
                            <ui-dropdown-menu-item @click="handleEdit(profile.id)">
                                <ui-icon name="lucide:edit" class="mr-2 h-4 w-4" />
                                Edit
                            </ui-dropdown-menu-item>
                            <ui-dropdown-menu-item @click="handleDuplicate(profile.id)">
                                <ui-icon name="lucide:copy" class="mr-2 h-4 w-4" />
                                Duplicate
                            </ui-dropdown-menu-item>
                            <ui-dropdown-menu-item @click="handleExport(profile)">
                                <ui-icon name="lucide:download" class="mr-2 h-4 w-4" />
                                Export
                            </ui-dropdown-menu-item>
                            <ui-dropdown-menu-separator />
                            <ui-dropdown-menu-item @click="handleDeleteProfile(profile.id)"
                                class="text-destructive focus:text-destructive">
                                <ui-icon name="lucide:trash-2" class="mr-2 h-4 w-4" />
                                Delete
                            </ui-dropdown-menu-item>
                        </ui-dropdown-menu-content>
                    </ui-dropdown-menu>
                </ui-card-footer>
            </ui-card>
        </div>

        <!-- Empty State -->
        <ui-empty v-else-if="profiles.length === 0" class="py-12">
            <template #icon>
                <ui-icon name="lucide:palette" class="h-12 w-12" />
            </template>
            <template #title>No brand profiles yet</template>
            <template #description>
                Create your first brand profile to get started with custom theming
            </template>
            <template #action>
                <ui-button @click="isCreateDialogOpen = true">
                    <ui-icon name="lucide:plus" class="mr-2 h-4 w-4" />
                    Create Profile
                </ui-button>
            </template>
        </ui-empty>

        <!-- No Search Results -->
        <ui-empty v-else class="py-12">
            <template #icon>
                <ui-icon name="lucide:search-x" class="h-12 w-12" />
            </template>
            <template #title>No profiles found</template>
            <template #description>
                Try adjusting your search query
            </template>
        </ui-empty>

        <!-- Create Dialog -->
        <ui-dialog v-model:open="isCreateDialogOpen">
            <ui-dialog-content>
                <ui-dialog-header>
                    <ui-dialog-title>Create Brand Profile</ui-dialog-title>
                    <ui-dialog-description>
                        Create a new brand profile to customize your design system
                    </ui-dialog-description>
                </ui-dialog-header>

                <div class="space-y-4 py-4">
                    <div class="space-y-2">
                        <ui-label for="name">Name *</ui-label>
                        <ui-input id="name" v-model="newProfileName" placeholder="My Brand"
                            @keydown.enter="handleCreateProfile" />
                    </div>

                    <div class="space-y-2">
                        <ui-label for="description">Description</ui-label>
                        <ui-textarea id="description" v-model="newProfileDescription"
                            placeholder="A brief description of this brand profile" :rows="3" />
                    </div>

                    <div class="space-y-2">
                        <ui-label for="author">Author</ui-label>
                        <ui-input id="author" v-model="newProfileAuthor" placeholder="Your name or organization" />
                    </div>

                    <div class="space-y-2">
                        <div class="flex items-center justify-between gap-2">
                            <ui-label>Start from preset</ui-label>
                            <ui-button v-if="selectedPreset" variant="ghost" size="xs" @click="selectedPreset = ''">
                                Clear
                            </ui-button>
                        </div>
                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-60 overflow-y-auto pr-1">
                            <button v-for="preset in presetOptions" :key="preset.key" type="button"
                                @click="selectedPreset = preset.key"
                                class="group flex flex-col rounded-md border p-3 text-left transition-all hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                                :class="selectedPreset === preset.key ? 'border-primary bg-accent/40' : 'border-border'">
                                <div class="flex items-center justify-between">
                                    <span class="text-sm font-medium">{{ preset.label }}</span>
                                    <ui-icon v-if="selectedPreset === preset.key" name="lucide:check"
                                        class="h-4 w-4 text-primary" />
                                </div>
                                <div class="mt-2 flex gap-1">
                                    <span v-for="(swatch, idx) in preset.swatches" :key="idx" class="h-6 flex-1 rounded"
                                        :style="{ backgroundColor: swatch }" />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                <ui-dialog-footer>
                    <ui-button variant="outline" @click="isCreateDialogOpen = false">
                        Cancel
                    </ui-button>
                    <ui-button @click="handleCreateProfile" :disabled="!newProfileName.trim()">
                        Create Profile
                    </ui-button>
                </ui-dialog-footer>
            </ui-dialog-content>
        </ui-dialog>

        <!-- Delete Confirmation Dialog -->
        <ui-alert-dialog v-model:open="isDeleteDialogOpen">
            <ui-alert-dialog-content>
                <ui-alert-dialog-header>
                    <ui-alert-dialog-title>Delete Brand Profile?</ui-alert-dialog-title>
                    <ui-alert-dialog-description>
                        This action cannot be undone. This will permanently delete the brand profile
                        and all its configurations.
                    </ui-alert-dialog-description>
                </ui-alert-dialog-header>
                <ui-alert-dialog-footer>
                    <ui-alert-dialog-cancel>Cancel</ui-alert-dialog-cancel>
                    <ui-alert-dialog-action @click="confirmDelete"
                        class="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                        Delete
                    </ui-alert-dialog-action>
                </ui-alert-dialog-footer>
            </ui-alert-dialog-content>
        </ui-alert-dialog>

        <!-- Edit Dialog -->
        <ui-dialog v-model:open="isEditing">
            <ui-dialog-content
                class="!max-w-screen-2xl w-[95vw] lg:w-[1100px] h-[85vh] max-h-[85vh] flex flex-col !p-0 !gap-0 !overflow-hidden">
                <BrandProfileEditor @close="stopEditing" />
            </ui-dialog-content>
        </ui-dialog>
    </div>
</template>
