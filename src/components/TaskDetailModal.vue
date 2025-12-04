<template>
  <ui-dialog v-model:open="isOpen">
    <ui-dialog-content class="max-w-2xl">
      <ui-dialog-header>
        <ui-dialog-title>{{ task.title }}</ui-dialog-title>
        <ui-dialog-description v-if="task.identifier || task.externalId">
          {{ task.identifier || task.externalId }}
        </ui-dialog-description>
      </ui-dialog-header>

      <div class="space-y-4">
        <!-- Status and Priority -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-muted-foreground mb-1 block text-sm">Status</label>
            <ui-badge :variant="statusVariant" class="capitalize">
              {{ task.status.replace("-", " ") }}
            </ui-badge>
          </div>
          <div>
            <label class="text-muted-foreground mb-1 block text-sm">Priority</label>
            <ui-badge :variant="priorityVariant" class="capitalize">
              {{ task.priority }}
            </ui-badge>
          </div>
        </div>

        <!-- Description -->
        <div v-if="task.description">
          <label class="text-muted-foreground mb-1 block text-sm">Description</label>
          <p class="text-sm">{{ task.description }}</p>
        </div>

        <!-- Time Tracking -->
        <div class="grid grid-cols-2 gap-4">
          <div v-if="task.estimatedHours">
            <label class="text-muted-foreground mb-1 block text-sm">Estimated Hours</label>
            <div class="flex items-center gap-2">
              <ui-icon name="lucide:clock" class="text-muted-foreground size-4" />
              <span class="text-sm font-medium">{{ task.estimatedHours }}h</span>
            </div>
          </div>
          <div v-if="task.actualHours">
            <label class="text-muted-foreground mb-1 block text-sm">Actual Hours</label>
            <div class="flex items-center gap-2">
              <ui-icon name="lucide:check-circle-2" class="text-muted-foreground size-4" />
              <span class="text-sm font-medium">{{ task.actualHours }}h</span>
            </div>
          </div>
        </div>

        <!-- Assignee -->
        <div v-if="task.assignee">
          <label class="text-muted-foreground mb-1 block text-sm">Assignee</label>
          <div class="flex items-center gap-2">
            <ui-icon name="lucide:user" class="text-muted-foreground size-4" />
            <span class="text-sm font-medium">{{ formatAssignee(task.assignee) }}</span>
          </div>
        </div>

        <!-- Tags -->
        <div v-if="task.tags.length > 0">
          <label class="text-muted-foreground mb-1 block text-sm">Tags</label>
          <div class="flex flex-wrap gap-2">
            <ui-badge v-for="tag in task.tags" :key="tag" variant="outline">
              {{ tag }}
            </ui-badge>
          </div>
        </div>

        <!-- Dates -->
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="text-muted-foreground mb-1 block text-sm">Created</label>
            <p class="text-sm">{{ formatDate(task.createdAt) }}</p>
          </div>
          <div>
            <label class="text-muted-foreground mb-1 block text-sm">Updated</label>
            <p class="text-sm">{{ formatDate(task.updatedAt) }}</p>
          </div>
        </div>

        <!-- Source System -->
        <div v-if="task.sourceSystem" class="border-t pt-4">
          <label class="text-muted-foreground mb-2 block text-sm">Source</label>
          <div class="flex items-center gap-2">
            <ui-badge variant="secondary">{{ task.sourceSystem }}</ui-badge>
            <ui-button
              v-if="task.sourceUrl"
              variant="outline"
              size="sm"
              as="a"
              :href="task.sourceUrl"
              target="_blank"
            >
              <ui-icon name="lucide:external-link" class="mr-2 size-3" />
              View Source
            </ui-button>
          </div>
        </div>
      </div>

      <ui-dialog-footer>
        <ui-button variant="outline" @click="isOpen = false"> Close </ui-button>
      </ui-dialog-footer>
    </ui-dialog-content>
  </ui-dialog>
</template>

<script setup lang="ts">
  import type { Task } from "~/composables/useTasks";

  const props = defineProps<{
    task: Task | null;
    open: boolean;
  }>();

  const emit = defineEmits<{
    (e: "update:open", value: boolean): void;
  }>();

  const isOpen = computed({
    get: () => props.open && props.task !== null,
    set: (value) => emit("update:open", value),
  });

  const statusVariant = computed(() => {
    if (!props.task) return "default";
    switch (props.task.status) {
      case "done":
        return "success";
      case "in-progress":
        return "info";
      case "blocked":
        return "destructive";
      default:
        return "default";
    }
  });

  const priorityVariant = computed(() => {
    if (!props.task) return "default";
    switch (props.task.priority) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "outline";
    }
  });

  const formatAssignee = (assignee: string) => {
    const match = assignee.match(/person:(.+)/);
    if (match?.[1]) {
      return match[1]
        .split(/[-_]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    return assignee;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
</script>
