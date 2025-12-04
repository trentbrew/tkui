<template>
  <!-- Kanban Board Container -->
  <div class="flex items-start gap-4 overflow-x-auto pb-4">
    <!-- To Do Column -->
    <div class="w-full max-w-[400px] min-w-[300px] shrink-0 space-y-4">
      <!-- Header / Stats Card -->
      <ui-card class="p-4">
        <div class="flex items-center gap-3">
          <div class="bg-muted flex size-10 items-center justify-center rounded-lg">
            <ui-icon name="lucide:circle-dashed" class="text-muted-foreground size-5" />
          </div>
          <div>
            <p class="text-muted-foreground text-xs">To Do</p>
            <p class="text-2xl font-bold">{{ taskStats.todo }}</p>
          </div>
        </div>
      </ui-card>

      <!-- Task List -->
      <div
        class="bg-muted/50 min-h-[150px] space-y-2 rounded-lg border-2 border-dashed p-3"
        :class="{ 'ring-primary ring-2': dragOverColumn === 'todo' }"
        @dragover.prevent="dragOverColumn = 'todo'"
        @dragleave="dragOverColumn = null"
        @drop="handleDrop('todo')"
      >
        <task-card
          v-for="task in todoTasks"
          :key="task.id"
          :task="task"
          @dragstart="handleDragStart(task)"
          @click="$emit('task-click', task)"
        />
        <p v-if="todoTasks.length === 0" class="text-muted-foreground py-8 text-center text-sm">
          No tasks
        </p>
      </div>
    </div>

    <!-- In Progress Column -->
    <div class="w-full max-w-[400px] min-w-[300px] shrink-0 space-y-4">
      <ui-card class="p-4">
        <div class="flex items-center gap-3">
          <div
            class="flex size-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/30"
          >
            <ui-icon name="lucide:loader-2" class="size-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p class="text-muted-foreground text-xs">In Progress</p>
            <p class="text-2xl font-bold">{{ taskStats.inProgress }}</p>
          </div>
        </div>
      </ui-card>

      <div
        class="bg-muted/50 min-h-[150px] space-y-2 rounded-lg border-2 border-dashed p-3"
        :class="{ 'ring-primary ring-2': dragOverColumn === 'in-progress' }"
        @dragover.prevent="dragOverColumn = 'in-progress'"
        @dragleave="dragOverColumn = null"
        @drop="handleDrop('in-progress')"
      >
        <task-card
          v-for="task in inProgressTasks"
          :key="task.id"
          :task="task"
          @dragstart="handleDragStart(task)"
          @click="$emit('task-click', task)"
        />
        <p
          v-if="inProgressTasks.length === 0"
          class="text-muted-foreground py-8 text-center text-sm"
        >
          No tasks
        </p>
      </div>
    </div>

    <!-- Done Column -->
    <div class="w-full max-w-[400px] min-w-[300px] shrink-0 space-y-4">
      <ui-card class="p-4">
        <div class="flex items-center gap-3">
          <div
            class="flex size-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/30"
          >
            <ui-icon
              name="lucide:check-circle-2"
              class="size-5 text-green-600 dark:text-green-400"
            />
          </div>
          <div>
            <p class="text-muted-foreground text-xs">Done</p>
            <p class="text-2xl font-bold">{{ taskStats.done }}</p>
          </div>
        </div>
      </ui-card>

      <div
        class="bg-muted/50 min-h-[150px] space-y-2 rounded-lg border-2 border-dashed p-3"
        :class="{ 'ring-primary ring-2': dragOverColumn === 'done' }"
        @dragover.prevent="dragOverColumn = 'done'"
        @dragleave="dragOverColumn = null"
        @drop="handleDrop('done')"
      >
        <task-card
          v-for="task in doneTasks"
          :key="task.id"
          :task="task"
          @dragstart="handleDragStart(task)"
          @click="$emit('task-click', task)"
        />
        <p v-if="doneTasks.length === 0" class="text-muted-foreground py-8 text-center text-sm">
          No tasks
        </p>
      </div>
    </div>

    <!-- Blocked Column -->
    <div class="w-full max-w-[400px] min-w-[300px] shrink-0 space-y-4">
      <ui-card class="p-4">
        <div class="flex items-center gap-3">
          <div
            class="flex size-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/30"
          >
            <ui-icon name="lucide:circle-slash-2" class="size-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <p class="text-muted-foreground text-xs">Blocked</p>
            <p class="text-2xl font-bold">{{ taskStats.blocked }}</p>
          </div>
        </div>
      </ui-card>

      <div
        class="bg-muted/50 min-h-[150px] space-y-2 rounded-lg border-2 border-dashed p-3"
        :class="{ 'ring-primary ring-2': dragOverColumn === 'blocked' }"
        @dragover.prevent="dragOverColumn = 'blocked'"
        @dragleave="dragOverColumn = null"
        @drop="handleDrop('blocked')"
      >
        <task-card
          v-for="task in blockedTasks"
          :key="task.id"
          :task="task"
          @dragstart="handleDragStart(task)"
          @click="$emit('task-click', task)"
        />
        <p v-if="blockedTasks.length === 0" class="text-muted-foreground py-8 text-center text-sm">
          No tasks
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import type { Task } from "@/composables/useTasks";

  const props = defineProps<{
    tasks: Task[];
    taskStats: {
      total: number;
      todo: number;
      inProgress: number;
      done: number;
      blocked: number;
    };
  }>();

  const emit = defineEmits<{
    (e: "update-status", taskId: string, status: Task["status"]): void;
    (e: "task-click", task: Task): void;
  }>();

  const draggedTask = ref<Task | null>(null);
  const dragOverColumn = ref<Task["status"] | null>(null);

  const todoTasks = computed(() => props.tasks?.filter((t) => t.status === "todo") ?? []);
  const inProgressTasks = computed(
    () => props.tasks?.filter((t) => t.status === "in-progress") ?? []
  );
  const doneTasks = computed(() => props.tasks?.filter((t) => t.status === "done") ?? []);
  const blockedTasks = computed(() => props.tasks?.filter((t) => t.status === "blocked") ?? []);

  const handleDragStart = (task: Task) => {
    draggedTask.value = task;
  };

  const handleDrop = (status: Task["status"]) => {
    if (draggedTask.value && draggedTask.value.status !== status) {
      emit("update-status", draggedTask.value.id, status);
    }
    draggedTask.value = null;
    dragOverColumn.value = null;
  };
</script>
