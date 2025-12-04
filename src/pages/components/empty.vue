<script setup lang="ts">
  import type { PropDoc } from "../../components/ComponentDocs.vue";

  const sourceCode = `<template>
  <ui-empty>
    <ui-empty-header>
      <ui-empty-media variant="icon">
        <ui-icon name="lucide:folder-code" />
      </ui-empty-media>
      <ui-empty-title>No Projects Yet</ui-empty-title>
      <ui-empty-description>
        You haven't created any projects yet. Get started by creating your first project.
      </ui-empty-description>
    </ui-empty-header>
    <ui-empty-content>
      <div class="flex gap-2">
        <ui-button>Create Project</ui-button>
        <ui-button variant="outline">Import Project</ui-button>
      </div>
    </ui-empty-content>
  </ui-empty>
</template>`;

  const propsDocs: PropDoc[] = [
    {
      name: "class",
      type: "string",
      description: "Additional classes to apply to the empty state container",
    },
    {
      name: "as",
      type: "string",
      default: "'div'",
      description: "The element type to render as",
    },
  ];

  const mediaPropsDocs: PropDoc[] = [
    {
      name: "variant",
      type: "'default' | 'icon'",
      default: "'default'",
      description:
        "The variant of the media container. 'icon' adds a muted background with rounded corners.",
    },
    {
      name: "class",
      type: "string",
      description: "Additional classes to apply to the media container",
    },
  ];
</script>

<template>
  <component-section
    id="empty"
    title="Empty"
    description="A component used to display a message when there is no data to show."
    :source-code="sourceCode"
    :props-docs="propsDocs"
  >
    <div class="space-y-12">
      <!-- Basic -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Basic</h3>
        <div class="flex items-center justify-center rounded-lg border p-8">
          <ui-empty>
            <ui-empty-header>
              <ui-empty-media variant="icon">
                <ui-icon name="lucide:folder-code" />
              </ui-empty-media>
              <ui-empty-title>No Projects Yet</ui-empty-title>
              <ui-empty-description>
                You haven't created any projects yet. Get started by creating your first project.
              </ui-empty-description>
            </ui-empty-header>
            <ui-empty-content>
              <div class="flex gap-2">
                <ui-button>Create Project</ui-button>
                <ui-button variant="outline">Import Project</ui-button>
              </div>
            </ui-empty-content>
            <ui-button variant="link" size="sm" class="text-muted-foreground">
              Learn More
              <ui-icon name="lucide:arrow-up-right" class="ml-1 size-3" />
            </ui-button>
          </ui-empty>
        </div>
      </div>

      <!-- Outline -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Outline</h3>
        <div class="flex items-center justify-center rounded-lg border p-8">
          <ui-empty class="border border-dashed">
            <ui-empty-header>
              <ui-empty-media variant="icon">
                <ui-icon name="lucide:cloud" />
              </ui-empty-media>
              <ui-empty-title>Cloud Storage Empty</ui-empty-title>
              <ui-empty-description>
                Upload files to your cloud storage to access them anywhere.
              </ui-empty-description>
            </ui-empty-header>
            <ui-empty-content>
              <ui-button variant="outline" size="sm">Upload Files</ui-button>
            </ui-empty-content>
          </ui-empty>
        </div>
      </div>

      <!-- Background -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Background</h3>
        <div class="flex items-center justify-center rounded-lg border p-8">
          <ui-empty class="from-muted/50 to-background h-full bg-gradient-to-b from-30%">
            <ui-empty-header>
              <ui-empty-media variant="icon">
                <ui-icon name="lucide:bell" />
              </ui-empty-media>
              <ui-empty-title>No Notifications</ui-empty-title>
              <ui-empty-description>
                You're all caught up. New notifications will appear here.
              </ui-empty-description>
            </ui-empty-header>
            <ui-empty-content>
              <ui-button variant="outline" size="sm">
                <ui-icon name="lucide:refresh-ccw" class="mr-1 size-3" />
                Refresh
              </ui-button>
            </ui-empty-content>
          </ui-empty>
        </div>
      </div>

      <!-- Avatar -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Avatar</h3>
        <div class="flex items-center justify-center rounded-lg border p-8">
          <ui-empty>
            <ui-empty-header>
              <ui-empty-media variant="default">
                <ui-avatar class="size-12 grayscale">
                  <ui-avatar-image src="https://github.com/BayBreezy.png" />
                  <ui-avatar-fallback>BB</ui-avatar-fallback>
                </ui-avatar>
              </ui-empty-media>
              <ui-empty-title>User Offline</ui-empty-title>
              <ui-empty-description>
                This user is currently offline. You can leave a message to notify them or try again
                later.
              </ui-empty-description>
            </ui-empty-header>
            <ui-empty-content>
              <ui-button size="sm">Leave Message</ui-button>
            </ui-empty-content>
          </ui-empty>
        </div>
      </div>

      <!-- Avatar Group -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Avatar Group</h3>
        <div class="flex items-center justify-center rounded-lg border p-8">
          <ui-empty>
            <ui-empty-header>
              <ui-empty-media>
                <div
                  class="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:size-12 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale"
                >
                  <ui-avatar>
                    <ui-avatar-image src="https://github.com/shadcn.png" alt="@shadcn" />
                    <ui-avatar-fallback>CN</ui-avatar-fallback>
                  </ui-avatar>
                  <ui-avatar>
                    <ui-avatar-image src="https://github.com/baybreezy.png" alt="@baybreezy" />
                    <ui-avatar-fallback>BB</ui-avatar-fallback>
                  </ui-avatar>
                  <ui-avatar>
                    <ui-avatar-image src="https://github.com/mirari.png" alt="@mirari" />
                    <ui-avatar-fallback>MI</ui-avatar-fallback>
                  </ui-avatar>
                </div>
              </ui-empty-media>
              <ui-empty-title>No Team Members</ui-empty-title>
              <ui-empty-description>
                Invite your team to collaborate on this project.
              </ui-empty-description>
            </ui-empty-header>
            <ui-empty-content>
              <ui-button size="sm">
                <ui-icon name="lucide:plus" class="mr-1 size-3" />
                Invite Members
              </ui-button>
            </ui-empty-content>
          </ui-empty>
        </div>
      </div>

      <!-- Input Group -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Input Group</h3>
        <div class="flex items-center justify-center rounded-lg border p-8">
          <ui-empty>
            <ui-empty-header>
              <ui-empty-title>404 - Not Found</ui-empty-title>
              <ui-empty-description>
                The page you're looking for doesn't exist. Try searching for what you need below.
              </ui-empty-description>
            </ui-empty-header>
            <ui-empty-content>
              <div class="relative w-full max-w-sm">
                <ui-icon
                  name="lucide:search"
                  class="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2"
                />
                <ui-input placeholder="Try searching for pages..." class="pr-10 pl-9" />
                <ui-kbd class="absolute top-1/2 right-2 -translate-y-1/2">/</ui-kbd>
              </div>
              <ui-empty-description>
                Need help? <a href="#" class="underline underline-offset-4">Contact support</a>
              </ui-empty-description>
            </ui-empty-content>
          </ui-empty>
        </div>
      </div>
    </div>

    <template #live>
      <div class="flex flex-col gap-4">
        <h4 class="font-medium">Sub-components</h4>
        <ul class="text-muted-foreground space-y-1 text-sm">
          <li><code class="text-foreground">ui-empty</code> - Root container</li>
          <li>
            <code class="text-foreground">ui-empty-header</code> - Groups media, title, and
            description
          </li>
          <li><code class="text-foreground">ui-empty-media</code> - Icon or avatar container</li>
          <li><code class="text-foreground">ui-empty-title</code> - Main heading</li>
          <li><code class="text-foreground">ui-empty-description</code> - Supporting text</li>
          <li><code class="text-foreground">ui-empty-content</code> - Action buttons or inputs</li>
        </ul>
      </div>
    </template>
  </component-section>
</template>
