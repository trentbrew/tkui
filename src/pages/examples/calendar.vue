<template>
  <div class="flex h-full flex-col">
    <!-- Header -->
    <div class="border-b p-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold">Calendar</h1>
          <p class="text-muted-foreground">Schedule and manage your events</p>
        </div>

        <ui-button @click="showNewEventDialog = true">
          <ui-icon name="lucide:plus" class="mr-2 size-4" />
          New Event
        </ui-button>
      </div>
    </div>

    <!-- Calendar Grid -->
    <div class="flex-1 p-6 rounded-lg flex flex-col mb-24">
      <!-- Day Headers -->
      <div class="mb-4 grid grid-cols-7 gap-1">
        <div
          v-for="day in weekDays"
          :key="day"
          class="text-muted-foreground py-2 text-center text-sm font-medium"
        >
          {{ day }}
        </div>
      </div>

      <!-- Calendar Days -->
      <div class="grid grid-cols-7 gap-1 flex-1">
        <div
          v-for="(day, index) in calendarDays"
          :key="index"
          class="bg-card hover:bg-muted/50 min-h-[120px] cursor-pointer rounded-lg border p-2 transition-colors"
          :class="{
            'opacity-40': !day.isCurrentMonth,
            'ring-primary ring-2': day.isToday,
          }"
          @click="selectDate(day)"
        >
          <div class="mb-1 flex items-center justify-between">
            <span class="text-sm font-medium" :class="{ 'text-primary': day.isToday }">
              {{ day.date }}
            </span>
          </div>
          <div class="space-y-1">
            <div
              v-for="event in getEventsForDay(day)"
              :key="event.id"
              class="truncate rounded px-1.5 py-0.5 text-xs"
              :class="getEventColorClass(event.color)"
              @click.stop="editEvent(event)"
            >
              {{ event.title }}
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- New Event Dialog -->
    <ui-dialog v-model:open="showNewEventDialog">
      <ui-dialog-content class="sm:max-w-[425px]">
        <ui-dialog-header>
          <ui-dialog-title>{{ editingEvent ? "Edit Event" : "New Event" }}</ui-dialog-title>
          <ui-dialog-description>
            {{ editingEvent ? "Update your event details." : "Add a new event to your calendar." }}
          </ui-dialog-description>
        </ui-dialog-header>
        <div class="grid gap-4 py-4">
          <div class="grid gap-2">
            <ui-label for="title">Title</ui-label>
            <ui-input id="title" v-model="newEvent.title" placeholder="Event title" />
          </div>
          <div class="grid gap-2">
            <ui-label for="date">Date</ui-label>
            <ui-input id="date" v-model="newEvent.date" type="date" />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div class="grid gap-2">
              <ui-label for="start">Start Time</ui-label>
              <ui-input id="start" v-model="newEvent.startTime" type="time" />
            </div>
            <div class="grid gap-2">
              <ui-label for="end">End Time</ui-label>
              <ui-input id="end" v-model="newEvent.endTime" type="time" />
            </div>
          </div>
          <div class="grid gap-2">
            <ui-label>Color</ui-label>
            <div class="flex gap-2">
              <button
                v-for="color in eventColors"
                :key="color"
                class="size-6 rounded-full ring-offset-2 transition-all"
                :class="[
                  getEventColorClass(color),
                  newEvent.color === color ? 'ring-2 ring-current' : '',
                ]"
                @click="newEvent.color = color"
              />
            </div>
          </div>
          <div class="grid gap-2">
            <ui-label for="description">Description</ui-label>
            <ui-textarea
              id="description"
              v-model="newEvent.description"
              placeholder="Event description"
              :rows="3"
            />
          </div>
        </div>
        <ui-dialog-footer>
          <ui-button variant="outline" @click="showNewEventDialog = false">Cancel</ui-button>
          <ui-button @click="saveEvent">{{ editingEvent ? "Update" : "Create" }}</ui-button>
        </ui-dialog-footer>
      </ui-dialog-content>
    </ui-dialog>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from "vue";

  interface CalendarEvent {
    id: string;
    title: string;
    date: string;
    startTime: string;
    endTime: string;
    color: string;
    description: string;
  }

  interface CalendarDay {
    date: number;
    fullDate: string;
    isCurrentMonth: boolean;
    isToday: boolean;
  }

  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const eventColors = ["blue", "green", "red", "yellow", "purple", "pink"];

  const currentDate = ref(new Date());
  const showNewEventDialog = ref(false);
  const editingEvent = ref<CalendarEvent | null>(null);

  const newEvent = ref({
    title: "",
    date: "",
    startTime: "09:00",
    endTime: "10:00",
    color: "blue",
    description: "",
  });

  const events = ref<CalendarEvent[]>([
    {
      id: "1",
      title: "Team Standup",
      date: formatDate(new Date()),
      startTime: "09:00",
      endTime: "09:30",
      color: "blue",
      description: "Daily team sync",
    },
    {
      id: "2",
      title: "Design Review",
      date: formatDate(new Date()),
      startTime: "14:00",
      endTime: "15:00",
      color: "purple",
      description: "Review new designs",
    },
    {
      id: "3",
      title: "Sprint Planning",
      date: formatDate(addDays(new Date(), 2)),
      startTime: "10:00",
      endTime: "12:00",
      color: "green",
      description: "Plan next sprint",
    },
  ]);

  const currentMonthYear = computed(() => {
    return currentDate.value.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  });

  const calendarDays = computed<CalendarDay[]>(() => {
    const year = currentDate.value.getFullYear();
    const month = currentDate.value.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startPadding = firstDay.getDay();
    const days: CalendarDay[] = [];
    const today = new Date();

    // Previous month padding
    const prevMonth = new Date(year, month, 0);
    for (let i = startPadding - 1; i >= 0; i--) {
      const date = prevMonth.getDate() - i;
      days.push({
        date,
        fullDate: formatDate(new Date(year, month - 1, date)),
        isCurrentMonth: false,
        isToday: false,
      });
    }

    // Current month
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const d = new Date(year, month, i);
      days.push({
        date: i,
        fullDate: formatDate(d),
        isCurrentMonth: true,
        isToday: isSameDay(d, today),
      });
    }

    // Next month padding
    const remaining = 42 - days.length;
    for (let i = 1; i <= remaining; i++) {
      days.push({
        date: i,
        fullDate: formatDate(new Date(year, month + 1, i)),
        isCurrentMonth: false,
        isToday: false,
      });
    }

    return days;
  });

  function formatDate(date: Date): string {
    return date.toISOString().split("T")[0];
  }

  function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  function isSameDay(d1: Date, d2: Date): boolean {
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  }

  function previousMonth() {
    currentDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() - 1,
      1
    );
  }

  function nextMonth() {
    currentDate.value = new Date(
      currentDate.value.getFullYear(),
      currentDate.value.getMonth() + 1,
      1
    );
  }

  function goToToday() {
    currentDate.value = new Date();
  }

  function getEventsForDay(day: CalendarDay): CalendarEvent[] {
    return events.value.filter((e) => e.date === day.fullDate);
  }

  function getEventColorClass(color: string): string {
    const colors: Record<string, string> = {
      blue: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      green: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      red: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
      yellow: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
      purple: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
      pink: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    };
    return colors[color] || colors.blue;
  }

  function selectDate(day: CalendarDay) {
    newEvent.value = {
      title: "",
      date: day.fullDate,
      startTime: "09:00",
      endTime: "10:00",
      color: "blue",
      description: "",
    };
    editingEvent.value = null;
    showNewEventDialog.value = true;
  }

  function editEvent(event: CalendarEvent) {
    editingEvent.value = event;
    newEvent.value = { ...event };
    showNewEventDialog.value = true;
  }

  function saveEvent() {
    if (!newEvent.value.title) return;

    if (editingEvent.value) {
      const index = events.value.findIndex((e) => e.id === editingEvent.value!.id);
      if (index !== -1) {
        events.value[index] = { ...newEvent.value, id: editingEvent.value.id };
      }
    } else {
      events.value.push({
        ...newEvent.value,
        id: Date.now().toString(),
      });
    }

    showNewEventDialog.value = false;
    editingEvent.value = null;
    newEvent.value = {
      title: "",
      date: "",
      startTime: "09:00",
      endTime: "10:00",
      color: "blue",
      description: "",
    };
  }
</script>
