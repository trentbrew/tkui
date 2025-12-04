<script setup lang="ts">
  import type { PropDoc } from "../../components/ComponentDocs.vue";

  const sourceCode = `<template>
  <!-- Basic stepper -->
  <ui-stepper v-model="currentStep">
    <ui-stepper-item v-for="step in steps" :key="step.step" :step="step.step">
      <ui-stepper-trigger>
        <ui-stepper-indicator />
        <div class="flex flex-col">
          <ui-stepper-title>{{ step.title }}</ui-stepper-title>
          <ui-stepper-description>{{ step.description }}</ui-stepper-description>
        </div>
      </ui-stepper-trigger>
      <ui-stepper-separator />
    </ui-stepper-item>
  </ui-stepper>

  <!-- Vertical orientation -->
  <ui-stepper v-model="currentStep" orientation="vertical">
    <!-- ... -->
  </ui-stepper>

  <!-- Linear (must complete in order) -->
  <ui-stepper v-model="currentStep" :linear="true">
    <!-- ... -->
  </ui-stepper>
</template>

<script setup>
const currentStep = ref(1)
const steps = [
  { step: 1, title: 'Account', description: 'Create your account' },
  { step: 2, title: 'Profile', description: 'Set up your profile' },
  { step: 3, title: 'Complete', description: 'Review and finish' },
]
<\/script>`;

  const propsDocs: PropDoc[] = [
    {
      name: "modelValue",
      type: "number",
      description: "The current active step (supports v-model)",
    },
    {
      name: "orientation",
      type: "'horizontal' | 'vertical'",
      default: "'horizontal'",
      description: "Layout direction of the stepper",
    },
    {
      name: "linear",
      type: "boolean",
      default: "false",
      description: "When true, steps must be completed in order",
    },
    {
      name: "class",
      type: "string",
      description: "Additional classes for the stepper container",
    },
  ];

  const currentStep = ref(2);

  const steps = [
    { step: 1, title: "Account", description: "Create your account" },
    { step: 2, title: "Profile", description: "Set up your profile" },
    { step: 3, title: "Preferences", description: "Configure settings" },
    { step: 4, title: "Complete", description: "Review and finish" },
  ];
</script>

<template>
  <component-section
    id="stepper"
    title="Stepper"
    description="A multi-step progress indicator for guiding users through a sequence of steps in a process."
    :source-code="sourceCode"
    :props-docs="propsDocs"
  >
    <div class="w-full">
      <ui-stepper v-model="currentStep" class="w-full">
        <ui-stepper-item v-for="step in steps" :key="step.step" :step="step.step" class="flex-1">
          <ui-stepper-trigger class="flex items-center gap-3">
            <ui-stepper-indicator />
            <div class="flex flex-col text-left">
              <ui-stepper-title>{{ step.title }}</ui-stepper-title>
              <ui-stepper-description class="hidden sm:block">
                {{ step.description }}
              </ui-stepper-description>
            </div>
          </ui-stepper-trigger>
          <ui-stepper-separator v-if="step.step < steps.length" />
        </ui-stepper-item>
      </ui-stepper>
    </div>

    <template #live>
      <div class="flex flex-col gap-4">
        <div class="rounded-lg border p-4">
          <p class="font-medium">Step {{ currentStep }}: {{ steps[currentStep - 1]?.title }}</p>
          <p class="text-muted-foreground mt-1 text-sm">
            {{ steps[currentStep - 1]?.description }}
          </p>
        </div>
        <div class="flex gap-2">
          <ui-button
            size="sm"
            variant="outline"
            :disabled="currentStep <= 1"
            @click="currentStep--"
          >
            Back
          </ui-button>
          <ui-button size="sm" :disabled="currentStep >= steps.length" @click="currentStep++">
            {{ currentStep === steps.length - 1 ? "Finish" : "Continue" }}
          </ui-button>
        </div>
      </div>
    </template>
  </component-section>
</template>
