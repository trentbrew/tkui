<template>
  <div
    data-slot="code-editor"
    :class="codeEditorStyles({ class: props.class, variant: props.variant })"
  >
    <VueMonacoEditor
      v-model:value="modelValue"
      :language="language"
      :theme="editorTheme"
      :options="mergedOptions"
      :height="height"
      :width="width"
      @mount="handleMount"
      @change="handleChange"
    />
  </div>
</template>

<script lang="ts">
  import { tv } from "tailwind-variants";
  // Monaco types will be inferred from the vue-monaco-editor package
  import type { VariantProps } from "tailwind-variants";
  import type { HTMLAttributes } from "vue";

  export const codeEditorStyles = tv({
    base: "overflow-hidden rounded-lg border",
    variants: {
      variant: {
        default: "border-border",
        ghost: "border-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  });

  export type CodeEditorProps = {
    /**
     * The code content (v-model)
     */
    modelValue?: string;
    /**
     * Programming language for syntax highlighting
     * @default 'javascript'
     */
    language?: string;
    /**
     * Editor theme - 'vs' (light), 'vs-dark', or 'hc-black'
     * @default 'auto' (follows system theme)
     */
    theme?: "vs" | "vs-dark" | "hc-black" | "auto";
    /**
     * Editor height
     * @default '300px'
     */
    height?: string | number;
    /**
     * Editor width
     * @default '100%'
     */
    width?: string | number;
    /**
     * Make editor read-only
     * @default false
     */
    readonly?: boolean;
    /**
     * Show line numbers
     * @default true
     */
    lineNumbers?: boolean;
    /**
     * Show minimap
     * @default false
     */
    minimap?: boolean;
    /**
     * Word wrap mode
     * @default 'on'
     */
    wordWrap?: "on" | "off" | "wordWrapColumn" | "bounded";
    /**
     * Font size in pixels
     * @default 14
     */
    fontSize?: number;
    /**
     * Tab size
     * @default 2
     */
    tabSize?: number;
    /**
     * Additional Monaco editor options
     */
    options?: Record<string, any>;
    /**
     * Additional classes
     */
    class?: HTMLAttributes["class"];
    /**
     * Style variant
     */
    variant?: VariantProps<typeof codeEditorStyles>["variant"];
  };

  export type CodeEditorEmits = {
    "update:modelValue": [value: string];
    mount: [editor: any];
    change: [value: string];
  };
</script>

<script lang="ts" setup>
  import { VueMonacoEditor } from "@guolao/vue-monaco-editor";
  import { computed, onMounted, ref, watch } from "vue";

  const props = withDefaults(defineProps<CodeEditorProps>(), {
    modelValue: "",
    language: "javascript",
    theme: "auto",
    height: "300px",
    width: "100%",
    readonly: false,
    lineNumbers: true,
    minimap: false,
    wordWrap: "on",
    fontSize: 14,
    tabSize: 2,
  });

  const emit = defineEmits<CodeEditorEmits>();

  const modelValue = computed({
    get: () => props.modelValue,
    set: (value) => emit("update:modelValue", value),
  });

  // Detect system dark mode
  const isDark = ref(false);

  onMounted(() => {
    isDark.value = document.documentElement.classList.contains("dark");

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      isDark.value = document.documentElement.classList.contains("dark");
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
  });

  const editorTheme = computed(() => {
    if (props.theme === "auto") {
      return isDark.value ? "vs-dark" : "vs";
    }
    return props.theme;
  });

  const mergedOptions = computed(() => ({
    readOnly: props.readonly,
    lineNumbers: props.lineNumbers ? "on" : "off",
    minimap: { enabled: props.minimap },
    wordWrap: props.wordWrap,
    fontSize: props.fontSize,
    tabSize: props.tabSize,
    scrollBeyondLastLine: false,
    automaticLayout: true,
    padding: { top: 12, bottom: 12 },
    scrollbar: {
      verticalScrollbarSize: 8,
      horizontalScrollbarSize: 8,
    },
    ...props.options,
  }));

  function handleMount(editor: any) {
    emit("mount", editor);
  }

  function handleChange(value: string) {
    emit("change", value);
  }
</script>
