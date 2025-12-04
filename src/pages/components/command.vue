<script setup lang="ts">
import { ref } from 'vue'
import type { PropDoc } from '../../components/ComponentDocs.vue'

const open = ref(false)
const lastAction = ref('Open the command palette to run an action.')

const selectAction = (label: string) => {
  lastAction.value = label
  open.value = false
}

const commandSourceCode = `<template>
  <ui-button @click="open = true">Open Command Palette</ui-button>

  <ui-command-dialog v-model:open="open" title="Command Palette">
    <ui-command-input placeholder="Type a command..." />
    <ui-command-list>
      <ui-command-empty>No results found.</ui-command-empty>

      <ui-command-group heading="Navigation">
        <ui-command-item value="dashboard" icon="lucide:layout-dashboard">Dashboard</ui-command-item>
        <ui-command-item value="projects" icon="lucide:folder">Projects</ui-command-item>
      </ui-command-group>

      <ui-command-separator />

      <ui-command-group heading="Actions">
        <ui-command-item value="create" icon="lucide:plus">Create item</ui-command-item>
        <ui-command-item value="invite" icon="lucide:user-plus">Invite teammate</ui-command-item>
      </ui-command-group>
    </ui-command-list>
  </ui-command-dialog>
</template>`

const commandProps: PropDoc[] = [
  { name: 'open', type: 'boolean', description: 'Controls dialog open state (use v-model:open)' },
  { name: 'title', type: 'string', default: '"Command Palette"', description: 'Dialog title text' },
  { name: 'description', type: 'string', default: '"Search for a command to run..."', description: 'Dialog description text' },
  { name: 'showCloseButton', type: 'boolean', default: 'true', description: 'Hide or show the close button in the dialog' },
  { name: 'class', type: 'string', description: 'Additional classes for the dialog' },
]
</script>

<template>
  <component-section id="command" title="Command" description="A command palette for quick actions and navigation."
    :source-code="commandSourceCode" :props-docs="commandProps">
    <div class="flex flex-wrap items-center gap-3">
      <ui-button @click="open = true">
        <ui-icon name="lucide:command" class="mr-2" />
        Open Command Palette
      </ui-button>
      <p class="text-sm text-muted-foreground">Search, filter, and run commands instantly.</p>
    </div>

    <ui-command-dialog v-model:open="open" title="Command Palette" description="Search across actions and pages.">
      <ui-command-input placeholder="Type a command or search..." />
      <ui-command-list>
        <ui-command-empty>No results found.</ui-command-empty>

        <ui-command-group heading="Navigation">
          <ui-command-item value="dashboard" icon="lucide:layout-dashboard" @select="selectAction('Go to Dashboard')">
            Dashboard
            <template #shortcut>
              <ui-command-shortcut shortcut="G D" />
            </template>
          </ui-command-item>
          <ui-command-item value="projects" icon="lucide:folder" @select="selectAction('Open Projects')">
            Projects
            <template #shortcut>
              <ui-command-shortcut shortcut="G P" />
            </template>
          </ui-command-item>
          <ui-command-item value="settings" icon="lucide:settings" @select="selectAction('Open Settings')">
            Settings
            <template #shortcut>
              <ui-command-shortcut shortcut="G S" />
            </template>
          </ui-command-item>
        </ui-command-group>

        <ui-command-separator />

        <ui-command-group heading="Actions">
          <ui-command-item value="create" icon="lucide:plus" @select="selectAction('Create item')">
            Create item
          </ui-command-item>
          <ui-command-item value="invite" icon="lucide:user-plus" @select="selectAction('Invite teammate')">
            Invite teammate
          </ui-command-item>
          <ui-command-item value="theme" icon="lucide:palette" @select="selectAction('Toggle theme')">
            Toggle theme
          </ui-command-item>
        </ui-command-group>
      </ui-command-list>
    </ui-command-dialog>

    <template #live>
      <div class="flex items-center gap-2">
        <ui-badge variant="outline">
          <ui-icon name="lucide:bolt" class="mr-1 h-3 w-3" />
          Last action
        </ui-badge>
        <span class="text-sm">{{ lastAction }}</span>
      </div>
    </template>
  </component-section>
</template>
