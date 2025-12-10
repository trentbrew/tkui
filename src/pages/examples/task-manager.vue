<script setup lang="ts">
  import { onMounted } from "vue";

  import TaskKanban from "../../components/TaskKanban.vue";
  import { useTasks } from "../../composables/useTasks";

  const { tasks, loading, error, taskStats, loadTasks, updateTaskStatus } = useTasks();

  function handleTaskClick(task: any) {
    console.log("Task clicked:", task);
  }

  onMounted(() => {
    loadTasks();
  });
</script>

<template>
  <div class="flex h-full flex-1 flex-col px-6 py-8">
    <div class="mb-6">
      <h1 class="mb-2 text-3xl font-bold">Task Manager</h1>
      <p class="text-muted-foreground">A Kanban-style task management example.</p>
    </div>

    <div v-if="loading" class="flex flex-1 items-center justify-center">
      <ui-loader class="size-8" />
    </div>

    <div v-else-if="error" class="flex-1">
      <ui-alert variant="destructive">
        <ui-icon name="lucide:alert-circle" class="h-4 w-4" />
        <ui-alert-title>Error</ui-alert-title>
        <ui-alert-description>{{ error }}</ui-alert-description>
      </ui-alert>
    </div>

    <TaskKanban
      v-else
      class="min-h-0 flex-1"
      :tasks="tasks"
      :task-stats="taskStats"
      @task-click="handleTaskClick"
      @update-status="updateTaskStatus"
    />
  </div>
</template>
