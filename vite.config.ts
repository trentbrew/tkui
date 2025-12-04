import path from "path";
import tailwindcss from "@tailwindcss/vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    tsconfigPaths(),
    AutoImport({
      imports: [
        "vue",
        "vue-router",
        "@vueuse/core",
        "pinia",
        {
          "tailwind-variants": ["tv", "VariantProps"],
          "vue-sonner": [["toast", "useSonner"]],
        },
      ],
      dts: "src/auto-imports.d.ts",
      dirs: ["src/composables", "src/utils", "src/stores"],
      vueTemplate: true,
    }),
    Components({
      dirs: ["src/components"],
      dts: "src/components.d.ts",
      extensions: ["vue"],
      deep: true,
      directoryAsNamespace: true,
      collapseSamePrefixes: true,
    }),
  ],
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "./src"),
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
