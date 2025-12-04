<template>
    <div class="p-6">
        <h1 class="text-3xl font-bold mb-2">Examples</h1>
        <p class="text-muted-foreground mb-8">
            Full-page templates and application examples built with Toolkit UI.
        </p>

        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <RouterLink to="/examples/task-manager">
                <ui-card class="hover:shadow-lg transition-shadow cursor-pointer">
                    <ui-card-header>
                        <ui-icon name="lucide:check-square" class="size-8 text-primary mb-2" />
                        <ui-card-title>Task Manager</ui-card-title>
                        <ui-card-description>Kanban-style task management app</ui-card-description>
                    </ui-card-header>
                </ui-card>
            </RouterLink>

            <RouterLink to="/examples/calendar">
                <ui-card class="hover:shadow-lg transition-shadow cursor-pointer">
                    <ui-card-header>
                        <ui-icon name="lucide:calendar" class="size-8 text-primary mb-2" />
                        <ui-card-title>Calendar</ui-card-title>
                        <ui-card-description>Event scheduling and calendar view</ui-card-description>
                    </ui-card-header>
                </ui-card>
            </RouterLink>

            <RouterLink to="/examples/messages">
                <ui-card class="hover:shadow-lg transition-shadow cursor-pointer">
                    <ui-card-header>
                        <ui-icon name="lucide:message-square" class="size-8 text-primary mb-2" />
                        <ui-card-title>Messages</ui-card-title>
                        <ui-card-description>Chat and messaging interface</ui-card-description>
                    </ui-card-header>
                </ui-card>
            </RouterLink>

            <RouterLink to="/examples/chatbot">
                <ui-card class="hover:shadow-lg transition-shadow cursor-pointer">
                    <ui-card-header>
                        <ui-icon name="lucide:bot" class="size-8 text-primary mb-2" />
                        <ui-card-title>Chatbot</ui-card-title>
                        <ui-card-description>AI assistant interface</ui-card-description>
                    </ui-card-header>
                </ui-card>
            </RouterLink>

            <RouterLink to="/examples/feed">
                <ui-card class="hover:shadow-lg transition-shadow cursor-pointer">
                    <ui-card-header>
                        <ui-icon name="lucide:rss" class="size-8 text-primary mb-2" />
                        <ui-card-title>Feed</ui-card-title>
                        <ui-card-description>Social media style feed</ui-card-description>
                    </ui-card-header>
                </ui-card>
            </RouterLink>

            <RouterLink to="/examples/settings">
                <ui-card class="hover:shadow-lg transition-shadow cursor-pointer">
                    <ui-card-header>
                        <ui-icon name="lucide:settings" class="size-8 text-primary mb-2" />
                        <ui-card-title>Settings</ui-card-title>
                        <ui-card-description>Application settings page</ui-card-description>
                    </ui-card-header>
                </ui-card>
            </RouterLink>
        </div>
    </div>
</template>
