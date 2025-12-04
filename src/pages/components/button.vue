<script setup lang="ts">
  import type { PropDoc } from "../../components/ComponentDocs.vue";

  // Reactive state for interactive examples
  const menuOpen = ref(false);
  const plusOpen = ref(false);
  const counter = ref(256);
  const volume = ref(3);
  const { copied, copy } = useClipboard();
  const { open: openFileDialog, onChange } = useFileDialog({
    accept: "image/*",
    multiple: false,
    reset: true,
  });
  const previewUrl = ref<string | null>(null);
  const fileName = ref<string | null>(null);

  onChange(async (files) => {
    if (!files) return;
    const file = files[0];
    if (!file) return;
    fileName.value = file.name;
    const { execute } = useBase64(file);
    previewUrl.value = await execute();
  });

  const handleRemove = () => {
    previewUrl.value = null;
    fileName.value = null;
  };

  const VolumeIcon = computed(() =>
    volume.value === 0
      ? "lucide:volume-x"
      : volume.value < 3
        ? "lucide:volume"
        : volume.value < 5
          ? "lucide:volume-1"
          : "lucide:volume-2"
  );

  const buttonProps: PropDoc[] = [
    {
      name: "variant",
      type: "'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'",
      default: "'default'",
      description: "The visual style variant of the button",
    },
    {
      name: "size",
      type: "'xs' | 'sm' | 'default' | 'lg' | 'icon-xs' | 'icon-sm' | 'icon' | 'icon-lg'",
      default: "'default'",
      description: "The size of the button",
    },
    {
      name: "type",
      type: "'button' | 'submit' | 'reset'",
      default: "'button'",
      description: "The HTML button type attribute",
    },
    {
      name: "disabled",
      type: "boolean",
      default: "false",
      description: "Whether the button is disabled",
    },
    {
      name: "loading",
      type: "boolean",
      default: "false",
      description: "Whether the button is in a loading state",
    },
    {
      name: "icon",
      type: "string",
      description: "Icon name to display in the button",
    },
    {
      name: "iconPlacement",
      type: "'left' | 'right'",
      default: "'left'",
      description: "Position of the icon relative to the button text",
    },
    {
      name: "loadingIcon",
      type: "string",
      default: "'line-md:loading-loop'",
      description: "Icon to display when button is loading",
    },
    {
      name: "text",
      type: "string",
      description: "Text content of the button",
    },
    {
      name: "effect",
      type: "'expandIcon' | 'ringHover' | 'shine' | 'shineHover' | 'gooeyRight' | 'gooeyLeft' | 'underline' | 'hoverUnderline' | 'gradientSlideShow'",
      description: "Visual effect to apply to the button",
    },
    {
      name: "as",
      type: "string",
      description: 'The element to render the button as (e.g., "a", "router-link")',
    },
    {
      name: "to",
      type: "string | RouteLocationRaw",
      description: "Router link destination (when used as router-link)",
    },
  ];

  // Source code examples
  const defaultButtonCode = `<ui-button>Default</ui-button>`;
  const secondaryButtonCode = `<ui-button variant="secondary">Secondary</ui-button>`;
  const withIconCode = `<ui-button><ui-icon class="size-4" name="lucide:mail" /> Login with Email</ui-button>`;
  const loadingCode = `<ui-button loading>Please wait...</ui-button>`;
  const outlineCode = `<ui-button variant="outline">Outline</ui-button>`;
  const destructiveCode = `<ui-button variant="destructive">Destructive</ui-button>`;
  const ghostCode = `<ui-button variant="ghost"><ui-icon name="lucide:ghost" class="size-4" />Ghost</ui-button>`;
  const linkCode = `<ui-button variant="link">Visit Page</ui-button>`;
  const iconOnlyCode = `<ui-button size="icon" variant="outline">
  <ui-icon class="size-4" name="lucide:activity" />
</ui-button>`;

  const sizesCode = `<template>
  <div class="flex items-center justify-center gap-2">
    <ui-button v-for="s in sizes" :key="s" :size="s" variant="outline">Button</ui-button>
  </div>
</template>

<script setup>
const sizes = ["xs", "sm", "default", "lg"]
<\/script>`;

  const iconSizesCode = `<template>
  <div class="flex items-center justify-center gap-3">
    <ui-button v-for="s in sizes" :key="s" :size="s" variant="outline">
      <ui-icon name="lucide:activity" class="size-4" />
    </ui-button>
  </div>
</template>

<script setup>
const sizes = ["icon-xs", "icon-sm", "icon"]
<\/script>`;

  const expandIconRightCode = `<ui-button effect="expandIcon" icon-placement="right" icon="lucide:arrow-right">
  Right Icon
</ui-button>`;

  const expandIconLeftCode = `<ui-button effect="expandIcon" icon-placement="left" icon="lucide:arrow-left">
  Left Icon
</ui-button>`;

  const gooeyLeftCode = `<ui-button effect="gooeyLeft">Gooey Left</ui-button>`;
  const gooeyRightCode = `<ui-button effect="gooeyRight">Gooey Right</ui-button>`;
  const shineCode = `<ui-button effect="shine">Shining ✨</ui-button>`;
  const shineHoverCode = `<ui-button effect="shineHover">Shine on Hover</ui-button>`;
  const gradientFlowCode = `<ui-button effect="gradientSlideShow">Gradient Slideshow</ui-button>`;
  const ringHoverCode = `<ui-button effect="ringHover">Ring Hover</ui-button>`;
  const linkUnderlineCode = `<ui-button variant="link" effect="underline">Link Underline</ui-button>`;
  const linkHoverUnderlineCode = `<ui-button variant="link" effect="hoverUnderline">Link Hover Underline</ui-button>`;

  const animatedMenuCode = `<template>
  <ui-button
    class="group"
    variant="outline"
    size="icon"
    :aria-expanded="open"
    :aria-label="open ? 'Close menu' : 'Open menu'"
    @click="open = !open"
  >
    <svg
      class="pointer-events-none"
      :width="16"
      :height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M4 12L20 12"
        class="origin-center -translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
      />
      <path
        d="M4 12H20"
        class="origin-center transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
      />
      <path
        d="M4 12H20"
        class="origin-center translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
      />
    </svg>
  </ui-button>
</template>

<script setup>
const open = ref(false)
<\/script>`;

  const rotatePlusCode = `<template>
  <ui-button
    class="group rounded-full"
    variant="outline"
    size="icon"
    :aria-expanded="open"
    :aria-label="open ? 'Close menu' : 'Open menu'"
    @click="open = !open"
  >
    <ui-icon
      name="lucide:plus"
      class="size-4 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.68,-0.6,0.32,1.6)] group-aria-expanded:rotate-[135deg]"
    />
  </ui-button>
</template>

<script setup>
const open = ref(false)
<\/script>`;

  const counterCode = `<template>
  <div class="inline-flex -space-x-px rounded-lg shadow-xs shadow-black/5 rtl:space-x-reverse">
    <ui-button
      class="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
      variant="outline"
      size="icon"
      aria-label="Upvote"
      @click="counter++"
    >
      <ui-icon name="lucide:chevron-up" class="size-4" />
    </ui-button>
    <span class="flex items-center border border-input px-3 text-sm font-medium">{{ counter }}</span>
    <ui-button
      class="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
      variant="outline"
      size="icon"
      aria-label="Downvote"
      @click="counter--"
    >
      <ui-icon name="lucide:chevron-down" class="size-4" />
    </ui-button>
  </div>
</template>

<script setup>
const counter = ref(256)
<\/script>`;

  const volumeCode = `<template>
  <div class="inline-flex items-center" role="group" aria-labelledby="volume-control">
    <span id="volume-control" class="sr-only">Volume Control</span>
    <ui-button
      class="rounded-full"
      variant="outline"
      size="icon"
      aria-label="Decrease volume"
      :disabled="volume === 0"
      @click="volume--"
    >
      <ui-icon name="lucide:minus" class="size-4" />
    </ui-button>
    <div class="flex items-center px-3 text-sm font-medium tabular-nums" aria-live="polite">
      <ui-icon :name="VolumeIcon" class="size-4" />
      <span class="ms-2">{{ volume }}</span>
    </div>
    <ui-button
      class="rounded-full"
      variant="outline"
      size="icon"
      aria-label="Increase volume"
      :disabled="volume === 6"
      @click="volume++"
    >
      <ui-icon name="lucide:plus" class="size-4" />
    </ui-button>
  </div>
</template>

<script setup>
const volume = ref(3)
const VolumeIcon = computed(() =>
  volume.value === 0 ? 'lucide:volume-x'
    : volume.value < 3 ? 'lucide:volume'
    : volume.value < 5 ? 'lucide:volume-1'
    : 'lucide:volume-2'
)
<\/script>`;

  const copyButtonCode = `<template>
  <ui-tooltip>
    <ui-tooltip-trigger as-child>
      <ui-button
        variant="outline"
        size="icon"
        class="disabled:opacity-100"
        :aria-label="copied ? 'Copied' : 'Copy to clipboard'"
        :disabled="copied"
        @click="copy('string to copy')"
      >
        <ui-icon v-if="!copied" name="lucide:copy" class="size-4" />
        <ui-icon v-else name="lucide:check" class="size-4 text-emerald-500" />
      </ui-button>
    </ui-tooltip-trigger>
    <ui-tooltip-content align="center" class="px-2 py-1 text-xs">Click to copy</ui-tooltip-content>
  </ui-tooltip>
</template>

<script setup>
const { copied, copy } = useClipboard()
<\/script>`;

  const uploadButtonCode = `<template>
  <div class="inline-flex items-center gap-2 align-top">
    <div
      class="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-input"
    >
      <ui-icon v-if="!previewUrl" class="size-4 opacity-60" name="lucide:circle-user" />
      <img v-if="previewUrl" :src="previewUrl" alt="Preview" class="size-full object-cover" />
    </div>
    <ui-button @click="open()">
      {{ fileName ? 'Change image' : 'Upload image' }}
    </ui-button>
  </div>
  <div v-if="fileName" class="mt-2">
    <div class="inline-flex gap-2 text-xs">
      <p class="truncate text-muted-foreground">{{ fileName }}</p>
      <button class="font-medium text-red-500 hover:underline" @click="handleRemove">Remove</button>
    </div>
  </div>
</template>

<script setup>
const { open, onChange } = useFileDialog({ accept: 'image/*', multiple: false, reset: true })
const previewUrl = ref(null)
const fileName = ref(null)

onChange(async (files) => {
  if (!files) return
  const file = files[0]
  if (!file) return
  fileName.value = file.name
  const { execute } = useBase64(file)
  previewUrl.value = await execute()
})

const handleRemove = () => {
  previewUrl.value = null
  fileName.value = null
}
<\/script>`;

  const arrowsCode = `<template>
  <div class="inline-grid w-fit grid-cols-3 gap-1">
    <ui-button class="col-start-2" variant="outline" size="icon" aria-label="Pan camera up">
      <ui-icon name="lucide:chevron-up" class="size-4" />
    </ui-button>
    <ui-button class="col-start-1" variant="outline" size="icon" aria-label="Pan camera left">
      <ui-icon name="lucide:chevron-left" class="size-4" />
    </ui-button>
    <div class="flex items-center justify-center">
      <ui-icon name="lucide:circle" class="size-5 opacity-60" />
    </div>
    <ui-button variant="outline" size="icon" aria-label="Pan camera right">
      <ui-icon name="lucide:chevron-right" class="size-4" />
    </ui-button>
    <ui-button class="col-start-2" variant="outline" size="icon" aria-label="Pan camera down">
      <ui-icon name="lucide:chevron-down" class="size-4" />
    </ui-button>
  </div>
</template>`;
</script>

<template>
  <div class="space-y-12">
    <!-- Page Header -->
    <div class="space-y-4">
      <ui-heading :level="1">Button</ui-heading>
      <p class="text-muted-foreground text-lg">
        A button is a component that is used to trigger an action.
      </p>
    </div>

    <!-- ============================================ -->
    <!-- PLAIN BUTTONS SECTION -->
    <!-- ============================================ -->
    <div class="space-y-8">
      <ui-heading :level="2">Plain Buttons</ui-heading>
      <p class="text-muted-foreground">Here we have a few examples of the plain buttons.</p>

      <!-- Default Button -->
      <component-section
        id="button-default"
        title="Default Button"
        :source-code="defaultButtonCode"
        :props-docs="buttonProps"
      >
        <div class="text-center">
          <ui-button>Default</ui-button>
        </div>
      </component-section>

      <!-- Secondary Button -->
      <component-section
        id="button-secondary"
        title="Secondary Button"
        :source-code="secondaryButtonCode"
      >
        <div class="text-center">
          <ui-button variant="secondary">Secondary</ui-button>
        </div>
      </component-section>

      <!-- With Icon -->
      <component-section id="button-with-icon" title="With Icon" :source-code="withIconCode">
        <div class="text-center">
          <ui-button><ui-icon class="size-4" name="lucide:mail" /> Login with Email</ui-button>
        </div>
      </component-section>

      <!-- Loading -->
      <component-section id="button-loading" title="Loading" :source-code="loadingCode">
        <div class="text-center">
          <ui-button loading>Please wait...</ui-button>
        </div>
      </component-section>

      <!-- Outline -->
      <component-section id="button-outline" title="Outline" :source-code="outlineCode">
        <div class="text-center">
          <ui-button variant="outline">Outline</ui-button>
        </div>
      </component-section>

      <!-- Destructive -->
      <component-section id="button-destructive" title="Destructive" :source-code="destructiveCode">
        <div class="text-center">
          <ui-button variant="destructive">Destructive</ui-button>
        </div>
      </component-section>

      <!-- Ghost -->
      <component-section id="button-ghost" title="Ghost" :source-code="ghostCode">
        <div class="text-center">
          <ui-button variant="ghost"><ui-icon name="lucide:ghost" class="size-4" />Ghost</ui-button>
        </div>
      </component-section>

      <!-- Link -->
      <component-section id="button-link" title="Link" :source-code="linkCode">
        <div class="text-center">
          <ui-button variant="link">Visit Page</ui-button>
        </div>
      </component-section>

      <!-- Icon Only -->
      <component-section id="button-icon-only" title="Icon" :source-code="iconOnlyCode">
        <div class="text-center">
          <ui-button size="icon" variant="outline">
            <ui-icon class="size-4" name="lucide:activity" />
          </ui-button>
        </div>
      </component-section>
    </div>

    <!-- ============================================ -->
    <!-- SIZES SECTION -->
    <!-- ============================================ -->
    <div class="space-y-8">
      <ui-heading :level="2">Sizes</ui-heading>
      <p class="text-muted-foreground">
        Here are the different sizes that are available for the buttons.
      </p>

      <!-- Regular Button Sizes -->
      <component-section id="button-sizes" title="Regular Button Sizes" :source-code="sizesCode">
        <div class="flex items-center justify-center gap-2">
          <ui-button v-for="s in ['xs', 'sm', 'default', 'lg']" :key="s" :size="s" variant="outline"
            >Button</ui-button
          >
        </div>
      </component-section>

      <!-- Icon Button Sizes -->
      <component-section
        id="button-icon-sizes"
        title="Icon Button Sizes"
        :source-code="iconSizesCode"
      >
        <div class="flex items-center justify-center gap-3">
          <ui-button
            v-for="s in ['icon-xs', 'icon-sm', 'icon']"
            :key="s"
            :size="s"
            variant="outline"
          >
            <ui-icon name="lucide:activity" class="size-4" />
          </ui-button>
        </div>
      </component-section>
    </div>

    <!-- ============================================ -->
    <!-- ENHANCED BUTTONS SECTION -->
    <!-- ============================================ -->
    <div class="space-y-8">
      <ui-heading :level="2">Enhanced Buttons</ui-heading>
      <p class="text-muted-foreground">
        These are some buttons with special visual effects. Inspired by
        <a
          href="https://enhanced-button.vercel.app/"
          target="_blank"
          class="text-primary hover:underline"
          >Enhanced Buttons</a
        >.
      </p>

      <!-- Expand Icon - Right -->
      <component-section
        id="button-expand-icon-right"
        title="Expand Icon - Right"
        :source-code="expandIconRightCode"
      >
        <div class="text-center">
          <ui-button effect="expandIcon" icon-placement="right" icon="lucide:arrow-right"
            >Right Icon</ui-button
          >
        </div>
      </component-section>

      <!-- Expand Icon - Left -->
      <component-section
        id="button-expand-icon-left"
        title="Expand Icon - Left"
        :source-code="expandIconLeftCode"
      >
        <div class="text-center">
          <ui-button effect="expandIcon" icon-placement="left" icon="lucide:arrow-left"
            >Left Icon</ui-button
          >
        </div>
      </component-section>

      <!-- Gooey - Left -->
      <component-section id="button-gooey-left" title="Gooey - Left" :source-code="gooeyLeftCode">
        <div class="text-center">
          <ui-button effect="gooeyLeft">Gooey Left</ui-button>
        </div>
      </component-section>

      <!-- Gooey - Right -->
      <component-section
        id="button-gooey-right"
        title="Gooey - Right"
        :source-code="gooeyRightCode"
      >
        <div class="text-center">
          <ui-button effect="gooeyRight">Gooey Right</ui-button>
        </div>
      </component-section>

      <!-- Shine -->
      <component-section id="button-shine" title="Shine" :source-code="shineCode">
        <div class="text-center">
          <ui-button effect="shine">Shining ✨</ui-button>
        </div>
      </component-section>

      <!-- Shine on Hover -->
      <component-section
        id="button-shine-hover"
        title="Shine on Hover"
        :source-code="shineHoverCode"
      >
        <div class="text-center">
          <ui-button effect="shineHover">Shine on Hover</ui-button>
        </div>
      </component-section>

      <!-- Gradient Slideshow -->
      <component-section
        id="button-gradient-flow"
        title="Gradient Slideshow"
        :source-code="gradientFlowCode"
      >
        <div class="text-center">
          <ui-button effect="gradientSlideShow">Gradient Slideshow</ui-button>
        </div>
      </component-section>

      <!-- Ring Hover -->
      <component-section id="button-ring-hover" title="Ring Hover" :source-code="ringHoverCode">
        <div class="text-center">
          <ui-button effect="ringHover">Ring Hover</ui-button>
        </div>
      </component-section>

      <!-- Link Underline -->
      <component-section
        id="button-link-underline"
        title="Link Hover 1"
        :source-code="linkUnderlineCode"
      >
        <div class="text-center">
          <ui-button variant="link" effect="underline">Link Underline</ui-button>
        </div>
      </component-section>

      <!-- Link Hover Underline -->
      <component-section
        id="button-link-hover-underline"
        title="Link Hover 2"
        :source-code="linkHoverUnderlineCode"
      >
        <div class="text-center">
          <ui-button variant="link" effect="hoverUnderline">Link Hover Underline</ui-button>
        </div>
      </component-section>
    </div>

    <!-- ============================================ -->
    <!-- ORIGIN UI EXAMPLES SECTION -->
    <!-- ============================================ -->
    <div class="space-y-8">
      <ui-heading :level="2">Origin UI Examples</ui-heading>
      <p class="text-muted-foreground">
        These are some examples inspired by
        <a href="https://originui.com/buttons" target="_blank" class="text-primary hover:underline"
          >Origin UI</a
        >. Copy the code and adjust it for your own use.
      </p>

      <!-- Animated Close Button -->
      <component-section
        id="button-animated-menu"
        title="Animated Close Button"
        :source-code="animatedMenuCode"
      >
        <div class="text-center">
          <ui-button
            class="group"
            variant="outline"
            size="icon"
            :aria-expanded="menuOpen"
            :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
            @click="menuOpen = !menuOpen"
          >
            <svg
              class="pointer-events-none"
              :width="16"
              :height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path
                d="M4 12L20 12"
                class="origin-center -translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
              />
              <path
                d="M4 12H20"
                class="origin-center transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
              />
              <path
                d="M4 12H20"
                class="origin-center translate-y-[7px] transition-all duration-300 [transition-timing-function:cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
              />
            </svg>
          </ui-button>
        </div>
      </component-section>

      <!-- Animated Rotate Plus -->
      <component-section
        id="button-rotate-plus"
        title="Animated Rotate Plus"
        :source-code="rotatePlusCode"
      >
        <div class="text-center">
          <ui-button
            class="group rounded-full"
            variant="outline"
            size="icon"
            :aria-expanded="plusOpen"
            :aria-label="plusOpen ? 'Close menu' : 'Open menu'"
            @click="plusOpen = !plusOpen"
          >
            <ui-icon
              name="lucide:plus"
              class="size-4 transition-transform duration-500 [transition-timing-function:cubic-bezier(0.68,-0.6,0.32,1.6)] group-aria-expanded:rotate-[135deg]"
            />
          </ui-button>
        </div>
      </component-section>

      <!-- Group Outline Counter -->
      <component-section
        id="button-group-counter"
        title="Group Outline Counter"
        :source-code="counterCode"
      >
        <div class="text-center">
          <div
            class="inline-flex -space-x-px rounded-lg shadow-xs shadow-black/5 rtl:space-x-reverse"
          >
            <ui-button
              class="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
              variant="outline"
              size="icon"
              aria-label="Upvote"
              @click="counter++"
            >
              <ui-icon name="lucide:chevron-up" class="size-4" />
            </ui-button>
            <span class="border-input flex items-center border px-3 text-sm font-medium">{{
              counter
            }}</span>
            <ui-button
              class="rounded-none shadow-none first:rounded-s-lg last:rounded-e-lg focus-visible:z-10"
              variant="outline"
              size="icon"
              aria-label="Downvote"
              @click="counter--"
            >
              <ui-icon name="lucide:chevron-down" class="size-4" />
            </ui-button>
          </div>
        </div>
      </component-section>

      <!-- Volume Control -->
      <component-section id="button-volume" title="Volume Control" :source-code="volumeCode">
        <div class="text-center">
          <div class="inline-flex items-center" role="group" aria-labelledby="volume-control">
            <span id="volume-control" class="sr-only">Volume Control</span>
            <ui-button
              class="rounded-full"
              variant="outline"
              size="icon"
              aria-label="Decrease volume"
              :disabled="volume === 0"
              @click="volume--"
            >
              <ui-icon name="lucide:minus" class="size-4" />
            </ui-button>
            <div class="flex items-center px-3 text-sm font-medium tabular-nums" aria-live="polite">
              <ui-icon :name="VolumeIcon" class="size-4" />
              <span class="ms-2">{{ volume }}</span>
            </div>
            <ui-button
              class="rounded-full"
              variant="outline"
              size="icon"
              aria-label="Increase volume"
              :disabled="volume === 6"
              @click="volume++"
            >
              <ui-icon name="lucide:plus" class="size-4" />
            </ui-button>
          </div>
        </div>
      </component-section>

      <!-- Animated Copy -->
      <component-section
        id="button-animated-copy"
        title="Animated Copy"
        :source-code="copyButtonCode"
      >
        <div class="text-center">
          <ui-tooltip>
            <ui-tooltip-trigger as-child>
              <ui-button
                variant="outline"
                size="icon"
                class="disabled:opacity-100"
                :aria-label="copied ? 'Copied' : 'Copy to clipboard'"
                :disabled="copied"
                @click="copy('string to copy')"
              >
                <ui-icon v-if="!copied" name="lucide:copy" class="size-4" />
                <ui-icon v-else name="lucide:check" class="size-4 text-emerald-500" />
              </ui-button>
            </ui-tooltip-trigger>
            <ui-tooltip-content align="center" class="px-2 py-1 text-xs"
              >Click to copy</ui-tooltip-content
            >
          </ui-tooltip>
        </div>
      </component-section>

      <!-- Upload Button w/ Icon -->
      <component-section
        id="button-upload"
        title="Upload Button w/ Icon"
        :source-code="uploadButtonCode"
      >
        <div class="mx-auto text-center">
          <div class="inline-flex items-center gap-2 align-top">
            <div
              class="border-input relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-lg border"
            >
              <ui-icon v-if="!previewUrl" class="size-4 opacity-60" name="lucide:circle-user" />
              <img
                v-if="previewUrl"
                :src="previewUrl"
                alt="Preview of uploaded image"
                class="size-full object-cover"
              />
            </div>
            <ui-button @click="openFileDialog()">
              {{ fileName ? "Change image" : "Upload image" }}
            </ui-button>
          </div>
          <div v-if="fileName" class="mt-2">
            <div class="inline-flex gap-2 text-xs">
              <p class="text-muted-foreground truncate">{{ fileName }}</p>
              <button class="font-medium text-red-500 hover:underline" @click="handleRemove">
                Remove
              </button>
            </div>
          </div>
        </div>
      </component-section>

      <!-- Arrows -->
      <component-section id="button-arrows" title="Arrows" :source-code="arrowsCode">
        <div class="text-center">
          <div class="inline-grid w-fit grid-cols-3 gap-1">
            <ui-button class="col-start-2" variant="outline" size="icon" aria-label="Pan camera up">
              <ui-icon name="lucide:chevron-up" class="size-4" />
            </ui-button>
            <ui-button
              class="col-start-1"
              variant="outline"
              size="icon"
              aria-label="Pan camera left"
            >
              <ui-icon name="lucide:chevron-left" class="size-4" />
            </ui-button>
            <div class="flex items-center justify-center">
              <ui-icon name="lucide:circle" class="size-5 opacity-60" />
            </div>
            <ui-button variant="outline" size="icon" aria-label="Pan camera right">
              <ui-icon name="lucide:chevron-right" class="size-4" />
            </ui-button>
            <ui-button
              class="col-start-2"
              variant="outline"
              size="icon"
              aria-label="Pan camera down"
            >
              <ui-icon name="lucide:chevron-down" class="size-4" />
            </ui-button>
          </div>
        </div>
      </component-section>
    </div>
  </div>
</template>
