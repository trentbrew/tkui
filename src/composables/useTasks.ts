export interface Task {
  id: string;
  type: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "done" | "blocked";
  priority: "low" | "medium" | "high";
  estimatedHours?: number;
  actualHours?: number;
  tags: string[];
  assignee?: string;
  externalId?: string;
  sourceUrl?: string;
  sourceSystem?: string;
  createdAt: string;
  updatedAt: string;
  identifier?: string;
}

export interface GraphData {
  "@context": string;
  "@graph": Array<{
    "@id": string;
    "@type": string;
    [key: string]: any;
  }>;
}

export const useTasks = () => {
  const tasks = ref<Task[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const loadTasks = async () => {
    loading.value = true;
    error.value = null;

    try {
      console.log("Fetching tasks from /graph.jsonld...");
      const response = await fetch("/graph.jsonld");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: GraphData = await response.json();
      console.log("Graph data loaded:", data["@graph"]?.length, "items");

      const taskItems = data["@graph"].filter((item) => item["@type"] === "Task");
      console.log("Found", taskItems.length, "tasks");

      tasks.value = taskItems.map((item) => ({
        id: item["@id"],
        type: item["@type"],
        title: item.title || "Untitled Task",
        description: item.description,
        status: item.status || "todo",
        priority: item.priority || "medium",
        estimatedHours: item.estimatedHours,
        actualHours: item.actualHours,
        tags: item.tags || [],
        assignee: item.assignee,
        externalId: item.externalId,
        sourceUrl: item.sourceUrl,
        sourceSystem: item.sourceSystem,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
        identifier: item.identifier,
      }));

      console.log("Tasks loaded successfully:", tasks.value.length);
    } catch (e) {
      error.value = e instanceof Error ? e.message : "Failed to load tasks";
      console.error("Error loading tasks:", e);
    } finally {
      loading.value = false;
    }
  };

  const getTasksByStatus = (status: Task["status"]) => {
    return computed(() => tasks.value.filter((task) => task.status === status));
  };

  const getTasksByPriority = (priority: Task["priority"]) => {
    return computed(() => tasks.value.filter((task) => task.priority === priority));
  };

  const updateTaskStatus = (taskId: string, newStatus: Task["status"]) => {
    const task = tasks.value.find((t) => t.id === taskId);
    if (task) {
      task.status = newStatus;
      task.updatedAt = new Date().toISOString();
    }
  };

  const taskStats = computed(() => {
    const stats = {
      total: tasks.value.length,
      todo: 0,
      inProgress: 0,
      done: 0,
      blocked: 0,
    };

    tasks.value.forEach((task) => {
      switch (task.status) {
        case "todo":
          stats.todo++;
          break;
        case "in-progress":
          stats.inProgress++;
          break;
        case "done":
          stats.done++;
          break;
        case "blocked":
          stats.blocked++;
          break;
      }
    });

    return stats;
  });

  return {
    tasks,
    loading,
    error,
    loadTasks,
    getTasksByStatus,
    getTasksByPriority,
    updateTaskStatus,
    taskStats,
  };
};
