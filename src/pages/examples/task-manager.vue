<template>
    <div class="container max-w-7xl py-8 px-6 mx-auto">
        <div class="mb-6">
            <h1 class="text-3xl font-bold mb-2">Task Manager</h1>
            <p class="text-muted-foreground">
                A Kanban-style task management example.
            </p>
        </div>

        <div v-if="loading" class="flex items-center justify-center py-12">
            <ui-loader class="size-8" />
        </div>

        <div v-else-if="error" class="py-12">
            <ui-alert variant="destructive">
                <ui-icon name="lucide:alert-circle" class="h-4 w-4" />
                <ui-alert-title>Error</ui-alert-title>
                <ui-alert-description>{{ error }}</ui-alert-description>
            </ui-alert>
        </div>

        <TaskKanban v-else :tasks="tasks" :task-stats="taskStats" @task-click="handleTaskClick"
            @update-status="updateTaskStatus" />
    </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import TaskKanban from '../../components/TaskKanban.vue'
import { useTasks } from '../../composables/useTasks'

const { tasks, loading, error, taskStats, loadTasks, updateTaskStatus } = useTasks()

function handleTaskClick(task: any) {
    console.log('Task clicked:', task)
}

onMounted(() => {
    loadTasks()
})
</script>
