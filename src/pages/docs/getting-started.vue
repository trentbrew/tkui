<template>
    <div class="container max-w-7xl py-8 px-6 mx-auto">
        <h1 class="text-3xl font-bold mb-2">Getting Started</h1>
        <p class="text-muted-foreground mb-8">
            Get up and running with Toolkit UI in minutes.
        </p>

        <div class="prose dark:prose-invert">
            <h2>Prerequisites</h2>
            <ul>
                <li>Node.js 18+</li>
                <li>pnpm (recommended) or npm</li>
                <li>Vue 3 project</li>
            </ul>

            <h2>Installation</h2>
            <pre class="bg-muted p-4 rounded-lg overflow-x-auto"><code>pnpm add @toolkit/ui</code></pre>

            <h2>Basic Usage</h2>
            <pre class="bg-muted p-4 rounded-lg overflow-x-auto"><code>&lt;script setup&gt;
import { UiButton } from '@toolkit/ui'
&lt;/script&gt;

&lt;template&gt;
  &lt;UiButton&gt;Click me&lt;/UiButton&gt;
&lt;/template&gt;</code></pre>

            <h2>Next Steps</h2>
            <p>Explore the component library or check out the example templates.</p>
        </div>
    </div>
</template>
