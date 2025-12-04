<template>
    <div class="container max-w-7xl py-8 px-6 mx-auto">
        <h1 class="text-3xl font-bold mb-2">Documentation</h1>
        <p class="text-muted-foreground mb-8">
            Learn how to use Toolkit UI components and build beautiful interfaces.
        </p>

        <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <RouterLink to="/docs/getting-started">
                <ui-card class="hover:shadow-lg transition-shadow cursor-pointer">
                    <ui-card-header>
                        <ui-icon name="lucide:rocket" class="size-8 text-primary mb-2" />
                        <ui-card-title>Getting Started</ui-card-title>
                        <ui-card-description>Quick start guide to set up your project</ui-card-description>
                    </ui-card-header>
                </ui-card>
            </RouterLink>

            <RouterLink to="/docs/installation">
                <ui-card class="hover:shadow-lg transition-shadow cursor-pointer">
                    <ui-card-header>
                        <ui-icon name="lucide:download" class="size-8 text-primary mb-2" />
                        <ui-card-title>Installation</ui-card-title>
                        <ui-card-description>Install dependencies and configure your project</ui-card-description>
                    </ui-card-header>
                </ui-card>
            </RouterLink>

            <RouterLink to="/docs/theming">
                <ui-card class="hover:shadow-lg transition-shadow cursor-pointer">
                    <ui-card-header>
                        <ui-icon name="lucide:palette" class="size-8 text-primary mb-2" />
                        <ui-card-title>Theming</ui-card-title>
                        <ui-card-description>Customize colors, typography, and more</ui-card-description>
                    </ui-card-header>
                </ui-card>
            </RouterLink>
        </div>
    </div>
</template>
