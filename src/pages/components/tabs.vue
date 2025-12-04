<script setup lang="ts">
  import type { PropDoc } from "../../components/ComponentDocs.vue";

  const tabsProps: PropDoc[] = [
    {
      name: "defaultValue",
      type: "string",
      description: "The value of the tab that should be active by default",
    },
    {
      name: "modelValue",
      type: "string",
      description: "The controlled value of the active tab (use with v-model)",
    },
    {
      name: "orientation",
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: "The orientation of the tabs",
    },
    {
      name: "activationMode",
      type: "'automatic' | 'manual'",
      default: "'automatic'",
      description: "Whether tabs are activated automatically on focus or manually on click",
    },
    {
      name: "pill",
      type: "boolean",
      default: "true",
      description: "Whether to show the pill background on List and Trigger components",
    },
  ];

  const tabsWithIcons = [
    { title: "Overview", icon: "lucide:home", content: "This is the overview content." },
    {
      title: "Projects",
      badge: 3,
      icon: "lucide:panels-top-left",
      content: "These are the projects.",
    },
    { title: "Packages", icon: "lucide:box", badge: "New", content: "New packages available." },
  ];

  const tabsWithBadges = [
    { title: "Overview", icon: "lucide:home", badge: 3, content: "Overview content here." },
    {
      title: "Projects",
      icon: "lucide:panels-top-left",
      badge: 0,
      content: "Projects content here.",
    },
    { title: "Packages", icon: "lucide:box", badge: 7, content: "Packages content here." },
  ];

  const tabsExtended = [
    { title: "Overview", icon: "lucide:home", content: "Overview content." },
    { title: "Projects", icon: "lucide:panels-top-left", content: "Projects content." },
    { title: "Packages", icon: "lucide:box", content: "Packages content." },
    { title: "Team", icon: "lucide:users", content: "Team content." },
    { title: "Settings", icon: "lucide:settings", content: "Settings content." },
    { title: "Reports", icon: "lucide:chart-area", content: "Reports content." },
  ];

  const tabsIconBadge = [
    { title: "Overview", icon: "lucide:home", content: "Overview content." },
    { title: "Projects", icon: "lucide:panels-top-left", badge: 2, content: "Projects content." },
    { title: "Packages", icon: "lucide:box", content: "Packages content." },
  ];

  const basicCode = `<ui-tabs class="w-[400px]" default-value="account">
  <ui-tabs-list class="grid w-full grid-cols-2">
    <ui-tabs-trigger value="account">Account</ui-tabs-trigger>
    <ui-tabs-trigger value="password">Password</ui-tabs-trigger>
  </ui-tabs-list>
  <ui-tabs-content value="account">
    <ui-card title="Account" description="Make changes to your account here.">
      <template #content><!-- content --></template>
      <template #footer><ui-button>Save changes</ui-button></template>
    </ui-card>
  </ui-tabs-content>
  <ui-tabs-content value="password">
    <ui-card title="Password" description="Change your password here.">
      <template #content><!-- content --></template>
      <template #footer><ui-button>Save password</ui-button></template>
    </ui-card>
  </ui-tabs-content>
</ui-tabs>`;

  const indicatorCode = `<ui-tabs class="w-[400px]" default-value="account">
  <ui-tabs-list :pill="false" class="relative grid w-full grid-cols-2">
    <ui-tabs-trigger :pill="false" value="account">Account</ui-tabs-trigger>
    <ui-tabs-trigger :pill="false" value="password">Password</ui-tabs-trigger>
    <ui-tabs-indicator />
  </ui-tabs-list>
  <!-- Content same as basic example -->
</ui-tabs>`;

  const tabs1Code = `<ui-tabs default-value="tab-1">
  <ui-tabs-list>
    <ui-tabs-trigger v-for="t in 3" :value="\`tab-\${t}\`">Tab {{ t }}</ui-tabs-trigger>
  </ui-tabs-list>
  <ui-tabs-content v-for="t in 3" :value="\`tab-\${t}\`">Content {{ t }}</ui-tabs-content>
</ui-tabs>`;

  const tabs2Code = `<ui-tabs-list class="bg-transparent">
  <ui-tabs-trigger class="data-[state=active]:bg-muted data-[state=active]:shadow-none">...</ui-tabs-trigger>
</ui-tabs-list>`;

  const tabs3Code = `<ui-tabs-list class="bg-transparent">
  <ui-tabs-trigger class="rounded-full data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">...</ui-tabs-trigger>
</ui-tabs-list>`;

  const tabs4Code = `<ui-tabs-list :pill="false" class="relative bg-transparent">
  <ui-tabs-trigger :pill="false" class="rounded-none py-2 data-[state=active]:bg-transparent">...</ui-tabs-trigger>
  <ui-tabs-indicator />
</ui-tabs-list>`;

  const tabs5Code = `<ui-tabs-list :pill="false" class="relative bg-transparent">
  <ui-tabs-trigger :pill="false" class="hover:bg-accent data-[state=active]:bg-transparent">...</ui-tabs-trigger>
  <ui-tabs-indicator />
</ui-tabs-list>`;

  const tabs6Code = `<ui-tabs-list :pill="false" class="h-auto -space-x-px bg-background p-0 shadow-xs">
  <ui-tabs-trigger :pill="false" class="rounded-none border first:rounded-s last:rounded-e data-[state=active]:bg-muted">...</ui-tabs-trigger>
</ui-tabs-list>`;

  const tabs7Code = `<ui-tabs-list :pill="false" class="h-auto gap-0.5 bg-transparent before:absolute before:inset-x-0 before:bottom-0 before:h-px before:bg-border">
  <ui-tabs-trigger :pill="false" class="rounded-b-none border-x border-t bg-muted">...</ui-tabs-trigger>
</ui-tabs-list>`;

  const tabs8Code = `<ui-tabs-trigger class="flex items-center gap-2">
  <ui-icon :name="t.icon" class="size-4 opacity-60" />
  {{ t.title }}
  <ui-badge v-if="t.badge">{{ t.badge }}</ui-badge>
</ui-tabs-trigger>`;

  const verticalCode = `<ui-tabs default-value="Projects" orientation="vertical" class="flex-row">
  <ui-tabs-list class="flex-col">
    <ui-tabs-trigger v-for="t in tabs" :value="t.title">{{ t.title }}</ui-tabs-trigger>
  </ui-tabs-list>
  <div class="grow rounded-md border">
    <ui-tabs-content v-for="t in tabs" :value="t.title">{{ t.content }}</ui-tabs-content>
  </div>
</ui-tabs>`;

  const tooltipCode = `<ui-tooltip v-for="t in tabs">
  <ui-tooltip-trigger as-child>
    <ui-tabs-trigger :value="t.title">
      <ui-icon :name="t.icon" />
    </ui-tabs-trigger>
  </ui-tooltip-trigger>
  <ui-tooltip-content>{{ t.title }}</ui-tooltip-content>
</ui-tooltip>`;
</script>

<template>
  <div class="space-y-12">
    <!-- Page Header -->
    <div class="space-y-4">
      <ui-heading :level="1">Tabs</ui-heading>
      <p class="text-muted-foreground text-lg">
        A set of layered sections of content—known as tab panels—that are displayed one at a time.
      </p>
    </div>

    <!-- USAGE SECTION -->
    <div class="space-y-8">
      <ui-heading :level="2">Usage</ui-heading>

      <!-- Basic Example -->
      <component-section
        id="tabs-basic"
        title="Basic Example"
        :source-code="basicCode"
        :props-docs="tabsProps"
      >
        <div class="flex w-full justify-center">
          <ui-tabs class="w-[400px]" default-value="account">
            <ui-tabs-list class="grid w-full grid-cols-2">
              <ui-tabs-trigger value="account">Account</ui-tabs-trigger>
              <ui-tabs-trigger value="password">Password</ui-tabs-trigger>
            </ui-tabs-list>
            <ui-tabs-content value="account">
              <ui-card title="Account" description="Make changes to your account here.">
                <template #content>
                  <ui-card-content class="space-y-2">
                    <div class="space-y-1">
                      <ui-label for="name">Name</ui-label
                      ><ui-input id="name" model-value="Pedro Duarte" />
                    </div>
                    <div class="space-y-1">
                      <ui-label for="username">Username</ui-label
                      ><ui-input id="username" model-value="@peduarte" />
                    </div>
                  </ui-card-content>
                </template>
                <template #footer
                  ><ui-card-footer><ui-button>Save changes</ui-button></ui-card-footer></template
                >
              </ui-card>
            </ui-tabs-content>
            <ui-tabs-content value="password">
              <ui-card title="Password" description="Change your password here.">
                <template #content>
                  <ui-card-content class="space-y-2">
                    <div class="space-y-1">
                      <ui-label for="current">Current password</ui-label
                      ><ui-input id="current" type="password" />
                    </div>
                    <div class="space-y-1">
                      <ui-label for="new">New password</ui-label
                      ><ui-input id="new" type="password" />
                    </div>
                  </ui-card-content>
                </template>
                <template #footer
                  ><ui-card-footer><ui-button>Save password</ui-button></ui-card-footer></template
                >
              </ui-card>
            </ui-tabs-content>
          </ui-tabs>
        </div>
      </component-section>

      <!-- With Indicator -->
      <component-section
        id="tabs-indicator"
        title="With Indicator"
        description="Use :pill='false' on List and Trigger to enable the animated Indicator."
        :source-code="indicatorCode"
      >
        <div class="flex w-full justify-center">
          <ui-tabs class="w-[400px]" default-value="account">
            <ui-tabs-list :pill="false" class="relative grid w-full grid-cols-2">
              <ui-tabs-trigger :pill="false" value="account">Account</ui-tabs-trigger>
              <ui-tabs-trigger :pill="false" value="password">Password</ui-tabs-trigger>
              <ui-tabs-indicator />
            </ui-tabs-list>
            <ui-tabs-content value="account">
              <ui-card title="Account" description="Make changes to your account here.">
                <template #content
                  ><ui-card-content class="space-y-2"
                    ><p class="text-muted-foreground text-sm">
                      Account settings content goes here.
                    </p></ui-card-content
                  ></template
                >
              </ui-card>
            </ui-tabs-content>
            <ui-tabs-content value="password">
              <ui-card title="Password" description="Change your password here.">
                <template #content
                  ><ui-card-content class="space-y-2"
                    ><p class="text-muted-foreground text-sm">
                      Password settings content goes here.
                    </p></ui-card-content
                  ></template
                >
              </ui-card>
            </ui-tabs-content>
          </ui-tabs>
        </div>
      </component-section>
    </div>

    <!-- ORIGIN UI EXAMPLES -->
    <div class="space-y-8">
      <ui-heading :level="2">Origin UI Examples</ui-heading>
      <p class="text-muted-foreground">
        Examples inspired by
        <a href="https://originui.com/tabs" target="_blank" class="text-primary hover:underline"
          >Origin UI</a
        >.
      </p>

      <!-- 1: Default pill -->
      <component-section id="tabs-1" title="Default Pill" :source-code="tabs1Code">
        <ui-tabs default-value="tab-1">
          <div class="flex justify-center">
            <ui-tabs-list>
              <ui-tabs-trigger v-for="t in 3" :key="t" :value="`tab-${t}`"
                >Tab {{ t }}</ui-tabs-trigger
              >
            </ui-tabs-list>
          </div>
          <ui-tabs-content v-for="t in 3" :key="t" :value="`tab-${t}`"
            ><p class="text-muted-foreground p-4 text-center text-sm">
              Content for Tab {{ t }}
            </p></ui-tabs-content
          >
        </ui-tabs>
      </component-section>

      <!-- 2: Transparent bg, muted active -->
      <component-section id="tabs-2" title="Transparent Background" :source-code="tabs2Code">
        <ui-tabs default-value="tab-1">
          <div class="flex justify-center">
            <ui-tabs-list class="bg-transparent">
              <ui-tabs-trigger
                v-for="t in 3"
                :key="t"
                :value="`tab-${t}`"
                class="data-[state=active]:bg-muted data-[state=active]:shadow-none"
                >Tab {{ t }}</ui-tabs-trigger
              >
            </ui-tabs-list>
          </div>
          <ui-tabs-content v-for="t in 3" :key="t" :value="`tab-${t}`"
            ><p class="text-muted-foreground p-4 text-center text-sm">
              Content for Tab {{ t }}
            </p></ui-tabs-content
          >
        </ui-tabs>
      </component-section>

      <!-- 3: Rounded full primary -->
      <component-section id="tabs-3" title="Rounded Full Primary" :source-code="tabs3Code">
        <ui-tabs default-value="tab-1">
          <div class="flex justify-center">
            <ui-tabs-list class="bg-transparent">
              <ui-tabs-trigger
                v-for="t in 3"
                :key="t"
                :value="`tab-${t}`"
                class="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-full data-[state=active]:shadow-none"
                >Tab {{ t }}</ui-tabs-trigger
              >
            </ui-tabs-list>
          </div>
          <ui-tabs-content v-for="t in 3" :key="t" :value="`tab-${t}`"
            ><p class="text-muted-foreground p-4 text-center text-sm">
              Content for Tab {{ t }}
            </p></ui-tabs-content
          >
        </ui-tabs>
      </component-section>

      <!-- 4: Underline indicator -->
      <component-section id="tabs-4" title="Underline Indicator" :source-code="tabs4Code">
        <ui-tabs default-value="tab-1">
          <div class="flex justify-center">
            <ui-tabs-list :pill="false" class="relative bg-transparent">
              <ui-tabs-trigger
                v-for="t in 3"
                :key="t"
                :pill="false"
                :value="`tab-${t}`"
                class="relative rounded-none py-2 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >Tab {{ t }}</ui-tabs-trigger
              >
              <ui-tabs-indicator />
            </ui-tabs-list>
          </div>
          <ui-tabs-content v-for="t in 3" :key="t" :value="`tab-${t}`"
            ><p class="text-muted-foreground p-4 text-center text-sm">
              Content for Tab {{ t }}
            </p></ui-tabs-content
          >
        </ui-tabs>
      </component-section>

      <!-- 5: Underline with hover -->
      <component-section id="tabs-5" title="Underline with Hover" :source-code="tabs5Code">
        <ui-tabs default-value="tab-1">
          <div class="flex justify-center">
            <ui-tabs-list :pill="false" class="relative bg-transparent">
              <ui-tabs-trigger
                v-for="t in 3"
                :key="t"
                :pill="false"
                :value="`tab-${t}`"
                class="hover:bg-accent hover:text-foreground data-[state=active]:hover:bg-accent relative data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >Tab {{ t }}</ui-tabs-trigger
              >
              <ui-tabs-indicator />
            </ui-tabs-list>
          </div>
          <ui-tabs-content v-for="t in 3" :key="t" :value="`tab-${t}`"
            ><p class="text-muted-foreground p-4 text-center text-sm">
              Content for Tab {{ t }}
            </p></ui-tabs-content
          >
        </ui-tabs>
      </component-section>

      <!-- 6: Segmented control -->
      <component-section id="tabs-6" title="Segmented Control" :source-code="tabs6Code">
        <ui-tabs default-value="tab-1">
          <div class="flex justify-center">
            <ui-tabs-list
              :pill="false"
              class="bg-background relative h-auto -space-x-px p-0 shadow-xs shadow-black/5 rtl:space-x-reverse"
            >
              <ui-tabs-trigger
                v-for="t in 3"
                :key="t"
                :pill="false"
                :value="`tab-${t}`"
                class="data-[state=active]:bg-muted rounded-none border first:rounded-s last:rounded-e"
                >Tab {{ t }}</ui-tabs-trigger
              >
            </ui-tabs-list>
          </div>
          <ui-tabs-content v-for="t in 3" :key="t" :value="`tab-${t}`"
            ><p class="text-muted-foreground p-4 text-center text-sm">
              Content for Tab {{ t }}
            </p></ui-tabs-content
          >
        </ui-tabs>
      </component-section>

      <!-- 7: Browser tabs -->
      <component-section id="tabs-7" title="Browser Tabs" :source-code="tabs7Code">
        <ui-tabs default-value="tab-1" class="flex flex-col justify-center">
          <ui-tabs-list
            :pill="false"
            class="before:bg-border relative h-auto w-full gap-0.5 bg-transparent p-0 before:absolute before:inset-x-0 before:bottom-0 before:h-px"
          >
            <ui-tabs-trigger
              v-for="t in 3"
              :key="t"
              :pill="false"
              :value="`tab-${t}`"
              class="border-border bg-muted overflow-hidden rounded-b-none border-x border-t py-2 data-[state=active]:z-10 data-[state=active]:shadow-none"
              >Tab {{ t }}</ui-tabs-trigger
            >
          </ui-tabs-list>
          <ui-tabs-content v-for="t in 3" :key="t" :value="`tab-${t}`"
            ><p class="text-muted-foreground p-4 text-center text-sm">
              Content for Tab {{ t }}
            </p></ui-tabs-content
          >
        </ui-tabs>
      </component-section>

      <!-- 8: With icons and badges -->
      <component-section id="tabs-8" title="With Icons and Badges" :source-code="tabs8Code">
        <ui-tabs default-value="Projects">
          <div class="flex justify-center">
            <ui-tabs-list>
              <ui-tabs-trigger
                v-for="t in tabsWithIcons"
                :key="t.title"
                :value="t.title"
                class="flex items-center gap-2"
              >
                <ui-icon :name="t.icon" class="-ms-0.5 me-1.5 size-4 shrink-0 opacity-60" />
                {{ t.title }}
                <ui-badge v-if="t.badge" class="px-2">{{ t.badge }}</ui-badge>
              </ui-tabs-trigger>
            </ui-tabs-list>
          </div>
          <ui-tabs-content v-for="t in tabsWithIcons" :key="t.title" :value="t.title"
            ><p class="text-muted-foreground p-4 text-center text-sm">
              {{ t.content }}
            </p></ui-tabs-content
          >
        </ui-tabs>
      </component-section>

      <!-- 9: Rounded full with icons -->
      <component-section id="tabs-9" title="Rounded Full with Icons" :source-code="tabs3Code">
        <ui-tabs default-value="Projects">
          <div class="flex justify-center">
            <ui-tabs-list class="bg-transparent">
              <ui-tabs-trigger
                v-for="t in tabsWithIcons"
                :key="t.title"
                :value="t.title"
                class="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground flex items-center gap-2 rounded-full data-[state=active]:shadow-none"
              >
                <ui-icon :name="t.icon" class="-ms-0.5 me-1.5 size-4 shrink-0 opacity-60" />
                {{ t.title }}
              </ui-tabs-trigger>
            </ui-tabs-list>
          </div>
          <ui-tabs-content v-for="t in tabsWithIcons" :key="t.title" :value="t.title"
            ><p class="text-muted-foreground p-4 text-center text-sm">
              {{ t.content }}
            </p></ui-tabs-content
          >
        </ui-tabs>
      </component-section>

      <!-- 10: Segmented with icons -->
      <component-section id="tabs-10" title="Segmented with Icons" :source-code="tabs6Code">
        <ui-tabs default-value="Projects">
          <div class="relative mb-3 flex justify-center">
            <ui-tabs-list
              class="bg-background h-auto -space-x-px p-0 shadow-xs shadow-black/5 rtl:space-x-reverse"
            >
              <ui-tabs-trigger
                v-for="t in tabsWithIcons"
                :key="t.title"
                :value="t.title"
                class="border-border data-[state=active]:bg-muted relative flex items-center gap-2 overflow-hidden rounded-none border py-2 first:rounded-s last:rounded-e"
              >
                <ui-icon :name="t.icon" class="-ms-0.5 me-1.5 size-4 shrink-0 opacity-60" />
                {{ t.title }}
              </ui-tabs-trigger>
            </ui-tabs-list>
          </div>
          <ui-tabs-content v-for="t in tabsWithIcons" :key="t.title" :value="t.title"
            ><p class="text-muted-foreground p-4 text-center text-sm">
              {{ t.content }}
            </p></ui-tabs-content
          >
        </ui-tabs>
      </component-section>

      <!-- 11: Scrollable tabs -->
      <component-section id="tabs-11" title="Scrollable Tabs" :source-code="tabs4Code">
        <div class="flex justify-center">
          <ui-tabs default-value="Projects">
            <ui-scroll-area orientation="horizontal" class="w-full max-w-lg">
              <ui-tabs-list
                class="border-border text-foreground relative mb-3 h-auto gap-2 rounded-none border-b bg-transparent px-0 py-1"
              >
                <ui-tabs-trigger
                  v-for="t in tabsExtended"
                  :key="t.title"
                  :value="t.title"
                  class="hover:bg-accent hover:text-foreground data-[state=active]:hover:bg-accent relative data-[state=active]:bg-transparent data-[state=active]:shadow-none"
                >
                  <ui-icon :name="t.icon" class="-ms-0.5 me-1.5 size-4 shrink-0 opacity-60" />
                  {{ t.title }}
                </ui-tabs-trigger>
                <ui-tabs-indicator />
              </ui-tabs-list>
            </ui-scroll-area>
            <ui-tabs-content v-for="t in tabsExtended" :key="t.title" :value="t.title"
              ><p class="text-muted-foreground p-4 text-center text-sm">
                {{ t.content }}
              </p></ui-tabs-content
            >
          </ui-tabs>
        </div>
      </component-section>

      <!-- 12: Vertical with icons -->
      <component-section id="tabs-12" title="Vertical with Icons" :source-code="verticalCode">
        <div class="flex justify-center">
          <ui-tabs default-value="Projects" orientation="vertical" class="w-full max-w-lg flex-row">
            <ui-tabs-list class="flex-col">
              <ui-tabs-trigger
                v-for="t in tabsWithIcons"
                :key="t.title"
                :value="t.title"
                class="w-full"
              >
                <ui-icon :name="t.icon" class="-ms-0.5 me-1.5 size-4 shrink-0 opacity-60" />
                {{ t.title }}
              </ui-tabs-trigger>
            </ui-tabs-list>
            <div class="grow rounded-md border text-start">
              <ui-tabs-content v-for="t in tabsWithIcons" :key="t.title" :value="t.title"
                ><p class="text-muted-foreground px-4 py-3 text-xs">
                  {{ t.content }}
                </p></ui-tabs-content
              >
            </div>
          </ui-tabs>
        </div>
      </component-section>

      <!-- 13: Vertical with left indicator -->
      <component-section
        id="tabs-13"
        title="Vertical with Left Indicator"
        :source-code="verticalCode"
      >
        <div class="flex justify-center">
          <ui-tabs default-value="Projects" orientation="vertical" class="w-full max-w-lg flex-row">
            <ui-tabs-list
              :pill="false"
              class="relative flex-col rounded-none border-l bg-transparent p-0"
            >
              <ui-tabs-trigger
                v-for="t in tabsWithIcons"
                :key="t.title"
                :pill="false"
                :value="t.title"
                class="data-[state=active]:after:bg-primary relative w-full justify-start rounded-none after:absolute after:inset-y-0 after:start-0 after:w-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <ui-icon :name="t.icon" class="-ms-0.5 me-1.5 size-4 shrink-0 opacity-60" />
                {{ t.title }}
              </ui-tabs-trigger>
            </ui-tabs-list>
            <div class="grow rounded-md border text-start">
              <ui-tabs-content v-for="t in tabsWithIcons" :key="t.title" :value="t.title"
                ><p class="text-muted-foreground px-4 py-3 text-xs">
                  {{ t.content }}
                </p></ui-tabs-content
              >
            </div>
          </ui-tabs>
        </div>
      </component-section>

      <!-- 14: Vertical muted active -->
      <component-section id="tabs-14" title="Vertical Muted Active" :source-code="verticalCode">
        <div class="flex justify-center">
          <ui-tabs default-value="Projects" orientation="vertical" class="w-full max-w-lg flex-row">
            <ui-tabs-list :pill="false" class="flex-col gap-1 bg-transparent py-0">
              <ui-tabs-trigger
                v-for="t in tabsWithIcons"
                :key="t.title"
                :pill="false"
                :value="t.title"
                class="data-[state=active]:bg-muted w-full justify-start data-[state=active]:shadow-none"
              >
                <ui-icon :name="t.icon" class="-ms-0.5 me-1.5 size-4 shrink-0 opacity-60" />
                {{ t.title }}
              </ui-tabs-trigger>
            </ui-tabs-list>
            <div class="grow rounded-md border text-start">
              <ui-tabs-content v-for="t in tabsWithIcons" :key="t.title" :value="t.title"
                ><p class="text-muted-foreground px-4 py-3 text-xs">
                  {{ t.content }}
                </p></ui-tabs-content
              >
            </div>
          </ui-tabs>
        </div>
      </component-section>

      <!-- 15: Icon tabs with tooltips -->
      <component-section id="tabs-15" title="Icon Tabs with Tooltips" :source-code="tooltipCode">
        <div class="flex justify-center">
          <ui-tabs default-value="Projects">
            <div class="flex justify-center">
              <ui-tabs-list class="h-12 p-0.5">
                <ui-tooltip v-for="t in tabsIconBadge" :key="t.title">
                  <ui-tooltip-trigger as-child>
                    <span class="h-full">
                      <ui-tabs-trigger :value="t.title" class="h-full">
                        <ui-chip
                          v-if="t.badge"
                          class="bg-primary text-primary-foreground"
                          :text="t.badge?.toString()"
                          size="xl"
                        >
                          <ui-icon :name="t.icon" class="size-5 shrink-0" />
                        </ui-chip>
                        <ui-icon v-else :name="t.icon" class="size-5 shrink-0" />
                      </ui-tabs-trigger>
                    </span>
                  </ui-tooltip-trigger>
                  <ui-tooltip-content class="px-2 py-1 text-xs">{{ t.title }}</ui-tooltip-content>
                </ui-tooltip>
              </ui-tabs-list>
            </div>
            <ui-tabs-content v-for="t in tabsIconBadge" :key="t.title" :value="t.title"
              ><p class="text-muted-foreground mx-auto p-4 text-center text-sm text-pretty">
                {{ t.content }}
              </p></ui-tabs-content
            >
          </ui-tabs>
        </div>
      </component-section>

      <!-- 16: Vertical icon tabs with tooltips -->
      <component-section
        id="tabs-16"
        title="Vertical Icon Tabs with Tooltips"
        :source-code="tooltipCode"
      >
        <div class="mx-auto w-full max-w-lg">
          <ui-tabs default-value="Projects" orientation="vertical" class="w-full flex-row">
            <ui-tabs-list class="flex-col">
              <ui-tooltip v-for="t in tabsIconBadge" :key="t.title">
                <ui-tooltip-trigger as-child>
                  <span class="h-full">
                    <ui-tabs-trigger :value="t.title" class="py-3">
                      <ui-chip
                        v-if="t.badge"
                        class="bg-primary text-primary-foreground"
                        :text="t.badge?.toString()"
                        size="lg"
                      >
                        <ui-icon :name="t.icon" class="size-4 shrink-0" />
                      </ui-chip>
                      <ui-icon v-else :name="t.icon" class="size-4 shrink-0" />
                    </ui-tabs-trigger>
                  </span>
                </ui-tooltip-trigger>
                <ui-tooltip-content side="right" class="px-2 py-1 text-xs">{{
                  t.title
                }}</ui-tooltip-content>
              </ui-tooltip>
            </ui-tabs-list>
            <div class="grow rounded-md border text-start">
              <ui-tabs-content v-for="t in tabsIconBadge" :key="t.title" :value="t.title"
                ><p class="text-muted-foreground px-4 py-3 text-xs">
                  {{ t.content }}
                </p></ui-tabs-content
              >
            </div>
          </ui-tabs>
        </div>
      </component-section>

      <!-- 17: Stacked with badges -->
      <component-section id="tabs-17" title="Stacked with Badges" :source-code="tabs8Code">
        <div class="flex justify-center">
          <ui-tabs default-value="Projects">
            <ui-tabs-list class="mx-auto flex w-full max-w-xs bg-transparent">
              <ui-tabs-trigger
                v-for="t in tabsWithBadges"
                :key="t.title"
                :value="t.title"
                :pill="false"
                class="group data-[state=active]:bg-muted flex-1 flex-col p-3 text-xs data-[state=active]:shadow-none"
              >
                <ui-badge
                  class="mb-1.5 flex min-w-5 items-center justify-center px-1 transition-opacity group-data-[state=inactive]:opacity-50"
                  >{{ t.badge }}</ui-badge
                >
                {{ t.title }}
              </ui-tabs-trigger>
            </ui-tabs-list>
            <ui-tabs-content v-for="t in tabsWithBadges" :key="t.title" :value="t.title"
              ><p
                class="text-muted-foreground mx-auto max-w-sm p-4 text-center text-sm text-pretty"
              >
                {{ t.content }}
              </p></ui-tabs-content
            >
          </ui-tabs>
        </div>
      </component-section>

      <!-- 18: Stacked icons -->
      <component-section id="tabs-18" title="Stacked Icons" :source-code="tabs8Code">
        <div class="flex justify-center">
          <ui-tabs default-value="Projects" class="items-center">
            <ui-tabs-list
              class="border-border flex h-auto justify-center rounded-none border-b bg-transparent p-0"
            >
              <ui-tabs-trigger
                v-for="t in tabsWithIcons"
                :key="t.title"
                :value="t.title"
                class="data-[state=active]:after:bg-primary relative flex-col rounded-none px-4 py-2 text-xs after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <ui-icon :name="t.icon" class="mb-1.5 size-4 shrink-0 opacity-60" />
                {{ t.title }}
              </ui-tabs-trigger>
            </ui-tabs-list>
            <ui-tabs-content v-for="t in tabsWithIcons" :key="t.title" :value="t.title"
              ><p
                class="text-muted-foreground mx-auto max-w-sm p-4 text-center text-sm text-pretty"
              >
                {{ t.content }}
              </p></ui-tabs-content
            >
          </ui-tabs>
        </div>
      </component-section>
    </div>
  </div>
</template>
