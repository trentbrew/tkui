<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useBrandProfile } from "../composables/useBrandProfile";
import { useThemes } from "../composables/useThemes";
import type { BrandProfile, ThemeStyleProps } from "../types/theme";
import { colorFormatter } from "../utils/theme";

const emit = defineEmits<{
    close: []
}>()

const { editingProfile, updateProfile, stopEditing } = useBrandProfile();
const { allThemes, getThemeById, getThemeSwatches } = useThemes();

const activeTab = ref("theme");
const activeMode = ref<"light" | "dark">("light");

// Local editing state
const localProfile = ref<BrandProfile | null>(null);

// Initialize local state from editing profile
watch(
    editingProfile,
    (profile) => {
        if (profile) {
            localProfile.value = JSON.parse(JSON.stringify(profile));
        }
    },
    { immediate: true }
);

// Get the selected theme (either by themeId or embedded theme)
const selectedTheme = computed(() => {
    if (!localProfile.value) return null;
    if (localProfile.value.themeId) {
        return getThemeById(localProfile.value.themeId);
    }
    return null;
});

// Current theme styles (from theme reference or embedded)
const currentTheme = computed(() => {
    if (!localProfile.value) return null;

    // If we have a theme reference, use it
    if (selectedTheme.value) {
        // Merge with any overrides
        const baseStyles = selectedTheme.value.styles[activeMode.value];
        const overrides = localProfile.value.themeOverrides?.[activeMode.value];
        if (overrides) {
            return { ...baseStyles, ...overrides };
        }
        return baseStyles;
    }

    // Fallback to embedded theme (legacy)
    return localProfile.value.theme?.[activeMode.value] || null;
});

// Preset options for theme selection
const themeOptions = computed(() => {
    return allThemes.value.map((t) => ({
        id: t.id,
        name: t.name,
        source: t.source,
        swatches: getThemeSwatches(t),
    }));
});

// Color groups for organization
const colorGroups = [
    {
        title: "Primary Colors",
        colors: ["background", "foreground", "primary", "primary-foreground"],
    },
    {
        title: "Secondary & Accent",
        colors: ["secondary", "secondary-foreground", "accent", "accent-foreground"],
    },
    {
        title: "UI Components",
        colors: ["card", "card-foreground", "popover", "popover-foreground"],
    },
    {
        title: "States",
        colors: ["muted", "muted-foreground", "destructive", "destructive-foreground"],
    },
    {
        title: "Borders & Inputs",
        colors: ["border", "input", "ring"],
    },
];

function selectTheme(themeId: string) {
    if (!localProfile.value) return;
    localProfile.value.themeId = themeId;
    // Clear legacy embedded theme when selecting a theme reference
    localProfile.value.theme = undefined;
    // Clear overrides when switching themes
    localProfile.value.themeOverrides = undefined;
}

function updateColorOverride(key: keyof ThemeStyleProps, value: string) {
    if (!localProfile.value) return;

    // Initialize overrides if needed
    if (!localProfile.value.themeOverrides) {
        localProfile.value.themeOverrides = {};
    }

    if (!localProfile.value.themeOverrides[activeMode.value]) {
        localProfile.value.themeOverrides[activeMode.value] = {};
    }

    localProfile.value.themeOverrides[activeMode.value]![key] = value;
}

function clearOverride(key: keyof ThemeStyleProps) {
    if (!localProfile.value?.themeOverrides?.[activeMode.value]) return;
    delete localProfile.value.themeOverrides[activeMode.value]![key];
}

function hasOverride(key: string): boolean {
    return !!localProfile.value?.themeOverrides?.[activeMode.value]?.[key as keyof ThemeStyleProps];
}

function handleSave() {
    if (!localProfile.value) return;
    updateProfile(localProfile.value.id, localProfile.value);
    handleClose();
}

function handleClose() {
    stopEditing();
    emit('close');
}

function getColorValue(key: string): string {
    if (!currentTheme.value) return "";
    return currentTheme.value[key as keyof ThemeStyleProps] || "";
}

function copyToOtherMode() {
    if (!localProfile.value?.themeOverrides) return;
    const sourceMode = activeMode.value;
    const targetMode = sourceMode === "light" ? "dark" : "light";
    localProfile.value.themeOverrides[targetMode] = JSON.parse(
        JSON.stringify(localProfile.value.themeOverrides[sourceMode] || {})
    );
}
</script>

<template>
    <div v-if="localProfile" class="flex flex-col h-full overflow-hidden">
        <!-- Header -->
        <div
            class="shrink-0 border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-6 py-4">
            <div class="flex items-center justify-between">
                <div class="flex items-center gap-4">
                    <ui-button variant="ghost" size="sm" @click="handleClose">
                        <ui-icon name="lucide:arrow-left" class="h-4 w-4 mr-2" />
                        Back
                    </ui-button>
                    <div>
                        <h1 class="text-lg font-semibold">{{ localProfile.name }}</h1>
                        <p class="text-xs text-muted-foreground">Brand Profile Editor</p>
                    </div>
                </div>
                <div class="flex items-center gap-2">
                    <ui-button variant="outline" size="sm" @click="handleClose">Cancel</ui-button>
                    <ui-button size="sm" @click="handleSave">
                        <ui-icon name="lucide:save" class="mr-2 h-4 w-4" />
                        Save
                    </ui-button>
                </div>
            </div>
        </div>

        <!-- Content -->
        <div class="flex flex-1 min-h-0 overflow-hidden">
            <!-- Editor Panel -->
            <div class="flex-1 overflow-y-auto min-w-0">
                <div class="p-6">
                    <!-- Tabs -->
                    <ui-tabs v-model="activeTab" class="space-y-6">
                        <ui-tabs-list class="flex flex-wrap gap-1">
                            <ui-tabs-trigger value="theme">Theme</ui-tabs-trigger>
                            <ui-tabs-trigger value="colors">Color Overrides</ui-tabs-trigger>
                            <ui-tabs-trigger value="typography">Typography</ui-tabs-trigger>
                            <ui-tabs-trigger value="logos">Logos</ui-tabs-trigger>
                            <ui-tabs-trigger value="animations">Animations</ui-tabs-trigger>
                            <ui-tabs-trigger value="metadata">Metadata</ui-tabs-trigger>
                        </ui-tabs-list>

                        <!-- Theme Selection Tab -->
                        <ui-tabs-content value="theme" class="space-y-6">
                            <div>
                                <h3 class="text-lg font-medium">Base Theme</h3>
                                <p class="text-sm text-muted-foreground">
                                    Select a theme as the foundation for this brand profile
                                </p>
                            </div>

                            <!-- Currently selected theme -->
                            <div v-if="selectedTheme" class="p-4 border rounded-lg bg-accent/20">
                                <div class="flex items-center justify-between">
                                    <div class="flex items-center gap-3">
                                        <div class="flex h-8 rounded overflow-hidden">
                                            <div v-for="(color, idx) in getThemeSwatches(selectedTheme)" :key="idx"
                                                class="w-6 h-8" :style="{ backgroundColor: color }" />
                                        </div>
                                        <div>
                                            <p class="font-medium">{{ selectedTheme.name }}</p>
                                            <p class="text-xs text-muted-foreground capitalize">
                                                {{ selectedTheme.source }} theme
                                            </p>
                                        </div>
                                    </div>
                                    <ui-badge variant="outline">Selected</ui-badge>
                                </div>
                            </div>

                            <!-- Theme grid -->
                            <div
                                class="grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 max-h-80 overflow-y-auto pr-1">
                                <button v-for="theme in themeOptions" :key="theme.id" type="button"
                                    @click="selectTheme(theme.id)"
                                    class="group flex flex-col rounded-lg border p-3 text-left transition-all hover:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                                    :class="localProfile?.themeId === theme.id ? 'border-primary bg-accent/40 ring-2 ring-primary/20' : 'border-border'">
                                    <div class="flex h-8 w-full rounded overflow-hidden mb-2">
                                        <div v-for="(color, idx) in theme.swatches" :key="idx" class="flex-1"
                                            :style="{ backgroundColor: color }" />
                                    </div>
                                    <div class="flex items-center justify-between gap-1">
                                        <span class="text-sm font-medium truncate">{{ theme.name }}</span>
                                        <ui-icon v-if="localProfile?.themeId === theme.id" name="lucide:check"
                                            class="h-4 w-4 text-primary flex-shrink-0" />
                                    </div>
                                    <span class="text-xs text-muted-foreground capitalize">{{ theme.source }}</span>
                                </button>
                            </div>

                            <ui-alert>
                                <ui-icon name="lucide:info" class="h-4 w-4" />
                                <ui-alert-title>Theme vs Brand Profile</ui-alert-title>
                                <ui-alert-description>
                                    A theme provides the base colors and styles. Your brand profile can override
                                    specific colors while inheriting the rest from the theme. This allows you to
                                    switch themes while keeping your customizations.
                                </ui-alert-description>
                            </ui-alert>
                        </ui-tabs-content>

                        <!-- Colors Tab -->
                        <ui-tabs-content value="colors" class="space-y-6">
                            <!-- Mode Toggle -->
                            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <h3 class="text-lg font-medium">Color Overrides</h3>
                                    <p class="text-sm text-muted-foreground">
                                        Override specific colors from the base theme for {{ activeMode }} mode
                                    </p>
                                </div>
                                <div class="flex items-center gap-2 flex-wrap">
                                    <ui-button variant="outline" size="sm" @click="copyToOtherMode">
                                        <ui-icon name="lucide:copy" class="mr-2 h-4 w-4" />
                                        Copy to {{ activeMode === "light" ? "Dark" : "Light" }}
                                    </ui-button>
                                    <ui-toggle v-model:pressed="activeMode" class="gap-2">
                                        <ui-icon :name="activeMode === 'light' ? 'lucide:sun' : 'lucide:moon'"
                                            class="h-4 w-4" />
                                        {{ activeMode === "light" ? "Light" : "Dark" }}
                                    </ui-toggle>
                                </div>
                            </div>

                            <!-- No theme selected warning -->
                            <ui-alert v-if="!selectedTheme" variant="warning">
                                <ui-icon name="lucide:alert-triangle" class="h-4 w-4" />
                                <ui-alert-title>No base theme selected</ui-alert-title>
                                <ui-alert-description>
                                    Select a base theme in the "Theme" tab first, then come back here to customize
                                    specific colors.
                                </ui-alert-description>
                            </ui-alert>

                            <!-- Color Groups -->
                            <template v-else>
                                <div v-for="group in colorGroups" :key="group.title" class="space-y-3">
                                    <h4 class="text-sm font-medium text-muted-foreground">
                                        {{ group.title }}
                                    </h4>
                                    <div class="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
                                        <div v-for="colorKey in group.colors" :key="colorKey" class="space-y-2">
                                            <div class="flex items-center justify-between">
                                                <ui-label :for="colorKey" class="capitalize">
                                                    {{ colorKey.replace(/-/g, " ") }}
                                                </ui-label>
                                                <button v-if="hasOverride(colorKey)"
                                                    @click="clearOverride(colorKey as any)"
                                                    class="text-xs text-muted-foreground hover:text-foreground">
                                                    Reset
                                                </button>
                                                <span v-else class="text-xs text-muted-foreground">Base</span>
                                            </div>
                                            <div class="flex gap-2">
                                                <input :id="colorKey" type="color"
                                                    :value="colorFormatter(getColorValue(colorKey), 'hex')"
                                                    @input="(e: any) => updateColorOverride(colorKey as any, (e.target as HTMLInputElement).value)"
                                                    class="h-10 w-14 cursor-pointer rounded border"
                                                    :class="{ 'ring-2 ring-primary': hasOverride(colorKey) }" />
                                                <ui-input :value="getColorValue(colorKey)"
                                                    @input="(e: any) => updateColorOverride(colorKey as any, (e.target as HTMLInputElement).value)"
                                                    placeholder="hsl(...) or #hex" class="flex-1"
                                                    :class="{ 'border-primary': hasOverride(colorKey) }" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </ui-tabs-content>

                        <!-- Typography Tab -->
                        <ui-tabs-content value="typography" class="space-y-6">
                            <div>
                                <h3 class="text-lg font-medium">Typography</h3>
                                <p class="text-sm text-muted-foreground">
                                    Configure font families and scales
                                </p>
                            </div>

                            <div class="space-y-4">
                                <div class="space-y-2">
                                    <ui-label for="font-sans">Sans-serif Font</ui-label>
                                    <ui-input id="font-sans" v-model="localProfile.typography.fontFamily.sans"
                                        placeholder="ui-sans-serif, system-ui, sans-serif" />
                                </div>

                                <div class="space-y-2">
                                    <ui-label for="font-serif">Serif Font</ui-label>
                                    <ui-input id="font-serif" v-model="localProfile.typography.fontFamily.serif"
                                        placeholder="ui-serif, Georgia, serif" />
                                </div>

                                <div class="space-y-2">
                                    <ui-label for="font-mono">Monospace Font</ui-label>
                                    <ui-input id="font-mono" v-model="localProfile.typography.fontFamily.mono"
                                        placeholder="ui-monospace, Menlo, monospace" />
                                </div>

                                <div class="space-y-2">
                                    <ui-label for="font-display">Display Font (Optional)</ui-label>
                                    <ui-input id="font-display" v-model="localProfile.typography.fontFamily.display"
                                        placeholder="Display font for headings" />
                                </div>
                            </div>
                        </ui-tabs-content>

                        <!-- Logos Tab -->
                        <ui-tabs-content value="logos" class="space-y-6">
                            <div>
                                <h3 class="text-lg font-medium">Brand Assets</h3>
                                <p class="text-sm text-muted-foreground">
                                    Upload your logos and brand assets
                                </p>
                            </div>

                            <ui-alert>
                                <ui-icon name="lucide:info" class="h-4 w-4" />
                                <ui-alert-title>Coming Soon</ui-alert-title>
                                <ui-alert-description>
                                    Logo upload functionality will be available in the next update.
                                    You can manually set URLs in the metadata for now.
                                </ui-alert-description>
                            </ui-alert>
                        </ui-tabs-content>

                        <!-- Animations Tab -->
                        <ui-tabs-content value="animations" class="space-y-6">
                            <div>
                                <h3 class="text-lg font-medium">Animation Tokens</h3>
                                <p class="text-sm text-muted-foreground">
                                    Configure animation durations and easing functions
                                </p>
                            </div>

                            <div class="space-y-4">
                                <h4 class="text-sm font-medium">Durations</h4>
                                <div class="grid gap-4 sm:grid-cols-2">
                                    <div v-for="(value, key) in localProfile.animations.duration" :key="key"
                                        class="space-y-2">
                                        <ui-label :for="`duration-${key}`" class="capitalize">
                                            {{ key }}
                                        </ui-label>
                                        <ui-input :id="`duration-${key}`"
                                            v-model="localProfile.animations.duration[key]" placeholder="300ms" />
                                    </div>
                                </div>
                            </div>

                            <div class="space-y-4">
                                <h4 class="text-sm font-medium">Easing Functions</h4>
                                <div class="grid gap-4 sm:grid-cols-2">
                                    <div v-for="(value, key) in localProfile.animations.easing" :key="key"
                                        class="space-y-2">
                                        <ui-label :for="`easing-${key}`" class="capitalize">
                                            {{ key.replace(/([A-Z])/g, " $1").trim() }}
                                        </ui-label>
                                        <ui-input :id="`easing-${key}`" v-model="localProfile.animations.easing[key]"
                                            placeholder="cubic-bezier(...)" />
                                    </div>
                                </div>
                            </div>
                        </ui-tabs-content>

                        <!-- Metadata Tab -->
                        <ui-tabs-content value="metadata" class="space-y-6">
                            <div>
                                <h3 class="text-lg font-medium">Profile Information</h3>
                                <p class="text-sm text-muted-foreground">
                                    Additional details about this brand profile
                                </p>
                            </div>

                            <div class="space-y-4">
                                <div class="space-y-2">
                                    <ui-label for="profile-name">Profile Name</ui-label>
                                    <ui-input id="profile-name" v-model="localProfile.name" placeholder="My Brand" />
                                </div>

                                <div class="space-y-2">
                                    <ui-label for="profile-description">Description</ui-label>
                                    <ui-textarea id="profile-description" v-model="localProfile.description"
                                        placeholder="A brief description of this brand" :rows="3" />
                                </div>

                                <div class="space-y-2">
                                    <ui-label for="profile-author">Author</ui-label>
                                    <ui-input id="profile-author" v-model="localProfile.author"
                                        placeholder="Your name or organization" />
                                </div>

                                <div class="space-y-2">
                                    <ui-label for="profile-version">Version</ui-label>
                                    <ui-input id="profile-version" v-model="localProfile.version" placeholder="1.0.0" />
                                </div>

                                <div v-if="localProfile?.metadata" class="space-y-2">
                                    <ui-label for="profile-tags">Tags (comma-separated)</ui-label>
                                    <ui-input id="profile-tags" :value="localProfile.metadata.tags?.join(', ')" @input="(e: any) => {
                                        if (localProfile?.metadata) {
                                            localProfile.metadata.tags = (e.target as HTMLInputElement).value.split(',').map(t => t.trim()).filter(Boolean);
                                        }
                                    }" placeholder="modern, minimal, tech" />
                                </div>
                            </div>
                        </ui-tabs-content>
                    </ui-tabs>
                </div>
            </div>

            <!-- Live Preview Panel -->
            <div class="hidden lg:block w-72 xl:w-80 shrink-0 border-l bg-muted/30 overflow-y-auto">
                <div class="p-4 space-y-4">
                    <div>
                        <h3 class="text-lg font-medium">Live Preview</h3>
                        <p class="text-sm text-muted-foreground">
                            See your changes in real-time
                        </p>
                    </div>

                    <!-- Preview Cards -->
                    <div class="space-y-4">
                        <ui-card>
                            <ui-card-header>
                                <ui-card-title>Card Title</ui-card-title>
                                <ui-card-description>Card description goes here</ui-card-description>
                            </ui-card-header>
                            <ui-card-content>
                                <p class="text-sm">This is some card content with primary text.</p>
                            </ui-card-content>
                            <ui-card-footer class="gap-2">
                                <ui-button size="sm">Primary</ui-button>
                                <ui-button variant="secondary" size="sm">Secondary</ui-button>
                            </ui-card-footer>
                        </ui-card>

                        <div class="flex gap-2">
                            <ui-button>Default</ui-button>
                            <ui-button variant="outline">Outline</ui-button>
                            <ui-button variant="destructive">Destructive</ui-button>
                        </div>

                        <ui-alert>
                            <ui-icon name="lucide:info" class="h-4 w-4" />
                            <ui-alert-title>Information</ui-alert-title>
                            <ui-alert-description>
                                This is an alert component preview.
                            </ui-alert-description>
                        </ui-alert>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
