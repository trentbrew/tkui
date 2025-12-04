<template>
  <div>
    <component-section
      id="task-management"
      title="Task Management"
      description="Comprehensive task tracking with kanban board and calendar views powered by JSON-LD data."
    >
      <ui-card class="p-6">
        <div class="mb-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <ui-icon name="lucide:list-todo" class="size-5" />
            <h3 class="font-semibold">{{ tasks.length }} Tasks</h3>
          </div>
          <ui-tabs v-model="taskView" class="w-auto">
            <ui-tabs-list>
              <ui-tabs-trigger value="kanban">
                <ui-icon name="lucide:kanban-square" class="mr-2 size-4" />
                Kanban
              </ui-tabs-trigger>
              <ui-tabs-trigger value="calendar">
                <ui-icon name="lucide:calendar" class="mr-2 size-4" />
                Calendar
              </ui-tabs-trigger>
            </ui-tabs-list>
          </ui-tabs>
        </div>

        <div v-if="loading" class="flex h-[600px] items-center justify-center">
          <ui-icon name="svg-spinners:180-ring-with-bg" class="size-8" />
        </div>
        <div v-else-if="error" class="flex h-[400px] items-center justify-center">
          <div class="text-center">
            <ui-icon name="lucide:alert-circle" class="text-destructive mx-auto size-12" />
            <p class="text-muted-foreground mt-2">{{ error }}</p>
          </div>
        </div>
        <div v-else>
          <!-- Kanban View -->
          <div v-show="taskView === 'kanban'">
            <task-kanban
              :tasks="tasks"
              :task-stats="taskStats"
              @update-status="updateTaskStatus"
              @task-click="openTaskDetail"
            />
          </div>

          <!-- Calendar View -->
          <div v-show="taskView === 'calendar'" class="h-[700px]">
            <FullCalendar v-if="calendarReady" :options="calendarOptions" class="h-full" />
            <div v-else class="flex h-full items-center justify-center">
              <ui-icon name="svg-spinners:180-ring-with-bg" class="size-8" />
            </div>
          </div>
        </div>
      </ui-card>
    </component-section>

    <!-- Task Detail Modal -->
    <task-detail-modal v-model:open="taskDetailOpen" :task="selectedTask" />
  </div>
</template>

<script setup lang="ts">
  import type { Task } from "@/composables/useTasks";

  const calendarReady = ref(false);

  // Task Management
  const { tasks, loading, error, loadTasks, updateTaskStatus, taskStats } = useTasks();
  const taskView = ref("kanban");
  const selectedTask = ref<Task | null>(null);
  const taskDetailOpen = ref(false);

  const openTaskDetail = (task: Task) => {
    selectedTask.value = task;
    taskDetailOpen.value = true;
  };

  // Calendar configuration
  const FullCalendar = defineAsyncComponent(() => import("@fullcalendar/vue3"));
  const calendarOptions = ref({
    plugins: [],
    initialView: "dayGridMonth",
    height: "100%",
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek",
    },
    events: [
      {
        title: "Team Meeting",
        start: new Date(new Date().setHours(10, 0, 0)),
        end: new Date(new Date().setHours(11, 0, 0)),
        color: "#3b82f6",
      },
      {
        title: "Project Deadline",
        start: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 3),
        allDay: true,
        color: "#ef4444",
      },
      {
        title: "Conference",
        start: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7),
        end: new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 9),
        color: "#10b981",
      },
    ],
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
  });

  onMounted(async () => {
    // Load tasks from graph.jsonld
    await loadTasks();

    // Load calendar plugins
    const [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin] = await Promise.all([
      import("@fullcalendar/daygrid"),
      import("@fullcalendar/timegrid"),
      import("@fullcalendar/list"),
      import("@fullcalendar/interaction"),
    ]);

    calendarOptions.value.plugins = [
      dayGridPlugin.default,
      timeGridPlugin.default,
      listPlugin.default,
      interactionPlugin.default,
    ];

    calendarReady.value = true;
  });

  // Convert tasks to calendar events
  watch(tasks, () => {
    const taskEvents = tasks.value.map((task) => {
      const statusColors = {
        todo: "#94a3b8",
        "in-progress": "#3b82f6",
        done: "#10b981",
        blocked: "#ef4444",
      };

      return {
        title: task.title,
        start: new Date(task.createdAt),
        end: task.updatedAt ? new Date(task.updatedAt) : new Date(task.createdAt),
        color: statusColors[task.status],
        extendedProps: {
          task,
        },
      };
    });

    calendarOptions.value.events = taskEvents;
  });
</script>
