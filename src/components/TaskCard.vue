<template>
  <ui-card
    class="group cursor-move p-3 transition-all hover:shadow-md"
    draggable="true"
    @dragstart="$emit('dragstart')"
    @click="$emit('click')"
  >
    <div class="space-y-2">
      <!-- Header -->
      <div class="flex items-start justify-between gap-2">
        <h4 class="line-clamp-2 text-sm font-medium">{{ task.title }}</h4>
        <ui-badge :variant="priorityVariant" class="shrink-0">
          {{ task.priority }}
        </ui-badge>
      </div>

      <!-- Description -->
      <p v-if="task.description" class="text-muted-foreground line-clamp-2 text-xs">
        {{ task.description }}
      </p>

      <!-- Footer -->
      <div class="flex items-center justify-between gap-2">
        <div class="flex items-center gap-2">
          <!-- Estimated Hours -->
          <div
            v-if="task.estimatedHours"
            class="text-muted-foreground flex items-center gap-1 text-xs"
          >
            <ui-icon name="lucide:clock" class="size-3" />
            <span>{{ task.estimatedHours }}h</span>
          </div>

          <!-- Tags -->
          <div v-if="task.tags.length > 0" class="flex items-center gap-1">
            <ui-badge
              v-for="tag in task.tags.slice(0, 2)"
              :key="tag"
              variant="outline"
              class="text-xs"
            >
              {{ tag }}
            </ui-badge>
            <span v-if="task.tags.length > 2" class="text-muted-foreground text-xs">
              +{{ task.tags.length - 2 }}
            </span>
          </div>
        </div>

        <!-- External Link -->
        <ui-button
          v-if="task.sourceUrl"
          variant="ghost"
          size="icon-sm"
          as="a"
          :href="task.sourceUrl"
          target="_blank"
          @click.stop
        >
          <ui-icon name="lucide:external-link" class="size-3" />
        </ui-button>
      </div>

      <!-- Assignee -->
      <div v-if="task.assignee" class="border-t pt-2">
        <div class="text-muted-foreground flex items-center gap-2 text-xs">
          <ui-icon name="lucide:user" class="size-3" />
          <span class="truncate">{{ formatAssignee(task.assignee) }}</span>
        </div>
      </div>
    </div>
  </ui-card>
</template>

<script setup lang="ts">
  import type { Task } from "~/composables/useTasks";

  const props = defineProps<{
    task: Task;
  }>();

  defineEmits<{
    (e: "dragstart" | "click"): void;
  }>();

  const priorityVariant = computed(() => {
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
    // Extract name from person:identifier format
    const match = assignee.match(/person:(.+)/);
    if (match?.[1]) {
      return match[1]
        .split(/[-_]/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    return assignee;
  };
</script>
