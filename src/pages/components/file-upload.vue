<script setup lang="ts">
  import type { PropDoc } from "../../components/ComponentDocs.vue";

  import { formatBytes, useFileUpload } from "../../composables/useFileUpload";

  // Avatar Upload Demo
  const {
    files: avatarFiles,
    inputRef: avatarInputRef,
    openFileDialog: openAvatarDialog,
    removeFile: removeAvatarFile,
  } = useFileUpload({
    multiple: false,
    accept: "image/*",
  });
  const avatarFile = computed(() => avatarFiles.value[0] || null);
  const avatarPreview = computed(() => avatarFile.value?.preview || null);

  // Single Image Demo
  const maxSizeMB = 5;
  const {
    files: singleImageFiles,
    errors: singleImageErrors,
    dropzoneRef: singleImageDropzone,
    inputRef: singleImageInput,
    openFileDialog: openSingleImageDialog,
    removeFile: removeSingleImage,
  } = useFileUpload({
    accept: "image/*",
    maxSize: maxSizeMB * 1024 * 1024,
  });
  const singleImage = computed(() => singleImageFiles.value[0] || null);

  // Multiple Images Demo
  const {
    files: multiImageFiles,
    errors: multiImageErrors,
    dropzoneRef: multiImageDropzone,
    inputRef: multiImageInput,
    openFileDialog: openMultiImageDialog,
    removeFile: removeMultiImage,
    clearFiles: clearMultiImages,
  } = useFileUpload({
    accept: "image/*",
    multiple: true,
    maxFiles: 6,
    maxSize: 5 * 1024 * 1024,
  });

  // Multiple Files Demo
  const {
    files: multiFiles,
    errors: multiFileErrors,
    dropzoneRef: multiFileDropzone,
    inputRef: multiFileInput,
    openFileDialog: openMultiFileDialog,
    removeFile: removeMultiFile,
    clearFiles: clearMultiFiles,
  } = useFileUpload({
    multiple: true,
    maxFiles: 10,
    maxSize: 100 * 1024 * 1024,
  });

  const getFileIcon = (file: { file: File | { type: string; name: string } }) => {
    const fileType = file.file instanceof File ? file.file.type : file.file.type;
    const fileName = file.file instanceof File ? file.file.name : file.file.name;

    if (fileType.includes("pdf") || fileName.endsWith(".pdf")) return "lucide:file-text";
    if (fileType.includes("zip") || fileName.endsWith(".zip")) return "lucide:file-archive";
    if (fileType.includes("excel") || fileName.endsWith(".xlsx")) return "lucide:file-spreadsheet";
    if (fileType.includes("video/")) return "lucide:video";
    if (fileType.includes("audio/")) return "lucide:headphones";
    if (fileType.startsWith("image/")) return "lucide:image";
    return "lucide:file";
  };

  const sourceCode = `<template>
  <!-- Avatar Upload -->
  <div class="flex flex-col items-center gap-2">
    <div class="relative inline-flex">
      <div
        ref="dropzoneRef"
        class="relative flex size-24 items-center justify-center overflow-hidden rounded-full border border-dashed"
        @click="openFileDialog"
      >
        <input ref="inputRef" hidden />
        <img v-if="currentFile" :src="currentFile.preview" class="size-full object-cover" />
        <ui-icon v-else name="lucide:user" class="size-6 opacity-60" />
      </div>
      <ui-button v-if="currentFile" size="icon" class="absolute -top-1 -right-1 size-6 rounded-full" @click="removeFile(currentFile.id)">
        <ui-icon name="lucide:x" class="size-3.5" />
      </ui-button>
    </div>
  </div>

  <!-- Single Image Uploader -->
  <div
    ref="dropzoneRef"
    class="flex min-h-52 flex-col items-center justify-center rounded-xl border border-dashed p-4"
    @click="openFileDialog"
  >
    <input ref="inputRef" hidden />
    <div v-if="currentFile" class="absolute inset-0">
      <img :src="currentFile.preview" class="size-full object-cover" />
    </div>
    <div v-else class="flex flex-col items-center text-center">
      <ui-icon name="lucide:image-up" class="size-8 mb-2 opacity-60" />
      <p>Drop your image here or click to browse</p>
    </div>
  </div>

  <!-- Multiple Files Uploader -->
  <div ref="dropzoneRef" class="rounded-xl border border-dashed p-4">
    <input ref="inputRef" hidden />
    <div v-if="files.length > 0" class="space-y-2">
      <div v-for="file in files" :key="file.id" class="flex items-center gap-3 rounded-lg border p-2">
        <ui-icon :name="getFileIcon(file)" class="size-4" />
        <span>{{ file.file.name }}</span>
        <ui-button size="icon" variant="ghost" @click="removeFile(file.id)">
          <ui-icon name="lucide:x" />
        </ui-button>
      </div>
    </div>
    <div v-else class="flex flex-col items-center text-center">
      <ui-icon name="lucide:file-up" class="size-8 mb-2 opacity-60" />
      <p>Drop files here or click to browse</p>
    </div>
  </div>
</template>

<script setup>
import { useFileUpload, formatBytes } from '@/composables/useFileUpload'

const { files, dropzoneRef, inputRef, openFileDialog, removeFile, clearFiles, errors } = useFileUpload({
  accept: 'image/*',
  multiple: true,
  maxSize: 5 * 1024 * 1024, // 5MB
  maxFiles: 6,
})
<\/script>`;

  const propsDocs: PropDoc[] = [
    {
      name: "accept",
      type: "string",
      default: "'*'",
      description: "Accepted file types (e.g., 'image/*', 'application/pdf')",
    },
    {
      name: "multiple",
      type: "boolean",
      default: "false",
      description: "Allow multiple file selection",
    },
    {
      name: "maxSize",
      type: "number",
      default: "10485760",
      description: "Maximum file size in bytes (default 10MB)",
    },
    {
      name: "maxFiles",
      type: "number",
      default: "10",
      description: "Maximum number of files allowed when multiple is true",
    },
    {
      name: "initialFiles",
      type: "InitialFile[]",
      description: "Initial files to populate the uploader",
    },
  ];

  const returnsDocs: PropDoc[] = [
    {
      name: "files",
      type: "Ref<UploadedFile[]>",
      description: "Reactive array of uploaded files",
    },
    {
      name: "errors",
      type: "Ref<string[]>",
      description: "Reactive array of error messages",
    },
    {
      name: "dropzoneRef",
      type: "Ref<HTMLElement | null>",
      description: "Template ref for the dropzone element",
    },
    {
      name: "inputRef",
      type: "Ref<HTMLInputElement | null>",
      description: "Template ref for the hidden file input",
    },
    {
      name: "openFileDialog",
      type: "() => void",
      description: "Function to programmatically open the file dialog",
    },
    {
      name: "removeFile",
      type: "(id: string) => void",
      description: "Function to remove a file by its ID",
    },
    {
      name: "clearFiles",
      type: "() => void",
      description: "Function to remove all files",
    },
    {
      name: "isOverDropZone",
      type: "Ref<boolean>",
      description: "Whether a file is being dragged over the dropzone",
    },
  ];
</script>

<template>
  <div class="flex flex-col gap-8 p-6">
    <div>
      <h1 class="text-3xl font-bold">File Upload</h1>
      <p class="text-muted-foreground mt-2">
        Components and composables for handling file uploads with drag-and-drop support.
      </p>
    </div>

    <component-section
      id="file-upload"
      title="File Upload"
      description="A composable-based file upload system with drag-and-drop, validation, and preview support."
      :source-code="sourceCode"
      :props-docs="propsDocs"
    >
      <div class="space-y-12">
        <!-- Avatar Upload -->
        <div>
          <h3 class="mb-4 text-lg font-semibold">Avatar Upload</h3>
          <div class="flex flex-col items-center gap-2">
            <div class="relative inline-flex">
              <div
                class="border-input hover:bg-accent/50 relative flex size-24 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed transition-colors"
                @click="openAvatarDialog"
              >
                <input ref="avatarInputRef" hidden type="file" accept="image/*" />
                <img
                  v-if="avatarPreview"
                  :src="avatarPreview"
                  :alt="avatarFile?.file.name"
                  class="size-full object-cover"
                />
                <ui-icon v-else name="lucide:user" class="size-8 opacity-60" />
              </div>
              <ui-button
                v-if="avatarFile"
                size="icon"
                class="border-background absolute -top-1 -right-1 size-6 rounded-full border-2"
                @click.stop="removeAvatarFile(avatarFile.id)"
              >
                <ui-icon name="lucide:x" class="size-3.5" />
              </ui-button>
            </div>
            <p class="text-sm font-medium">Upload Avatar</p>
            <p class="text-muted-foreground text-xs">Click or drag to upload</p>
          </div>
        </div>

        <!-- Single Image Uploader -->
        <div>
          <h3 class="mb-4 text-lg font-semibold">Single Image Uploader</h3>
          <div class="mx-auto max-w-md">
            <div class="relative">
              <div
                ref="singleImageDropzone"
                class="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 relative flex min-h-52 cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl border-2 border-dashed p-4 transition-colors"
                @click="openSingleImageDialog"
              >
                <input ref="singleImageInput" hidden type="file" accept="image/*" />
                <div v-if="singleImage" class="absolute inset-0">
                  <img
                    :src="singleImage.preview"
                    :alt="singleImage.file.name"
                    class="size-full object-cover"
                  />
                </div>
                <div v-else class="flex flex-col items-center justify-center text-center">
                  <div
                    class="bg-background mb-2 flex size-11 items-center justify-center rounded-full border"
                  >
                    <ui-icon name="lucide:image-up" class="size-4 opacity-60" />
                  </div>
                  <p class="mb-1.5 text-sm font-medium">Drop your image here or click to browse</p>
                  <p class="text-muted-foreground text-xs">Max size: {{ maxSizeMB }}MB</p>
                </div>
              </div>
              <div v-if="singleImage" class="absolute top-3 right-3">
                <button
                  type="button"
                  class="flex size-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
                  @click.stop="removeSingleImage(singleImage.id)"
                >
                  <ui-icon name="lucide:x" class="size-4" />
                </button>
              </div>
            </div>
            <div
              v-if="singleImageErrors.length > 0"
              class="text-destructive mt-2 flex items-center gap-1 text-xs"
            >
              <ui-icon name="lucide:circle-alert" class="size-3" />
              <span>{{ singleImageErrors[0] }}</span>
            </div>
          </div>
        </div>

        <!-- Multiple Images Grid -->
        <div>
          <h3 class="mb-4 text-lg font-semibold">Multiple Image Uploader</h3>
          <div class="mx-auto max-w-lg">
            <div
              ref="multiImageDropzone"
              :data-files="multiImageFiles.length > 0 || undefined"
              class="border-input data-[dragging=true]:bg-accent/50 relative flex min-h-52 flex-col items-center overflow-hidden rounded-xl border-2 border-dashed p-4 transition-colors not-data-files:justify-center"
            >
              <input ref="multiImageInput" hidden type="file" accept="image/*" multiple />
              <div v-if="multiImageFiles.length > 0" class="flex w-full flex-col gap-3">
                <div class="flex items-center justify-between gap-2">
                  <h4 class="text-sm font-medium">Uploaded Files ({{ multiImageFiles.length }})</h4>
                  <div class="flex gap-2">
                    <ui-button variant="outline" size="sm" @click="openMultiImageDialog">
                      <ui-icon name="lucide:upload" class="-ms-0.5 size-3.5 opacity-60" />
                      Add more
                    </ui-button>
                    <ui-button variant="outline" size="sm" @click="clearMultiImages">
                      <ui-icon name="lucide:trash-2" class="-ms-0.5 size-3.5 opacity-60" />
                      Clear
                    </ui-button>
                  </div>
                </div>
                <div class="grid grid-cols-2 gap-4 md:grid-cols-3">
                  <div
                    v-for="file in multiImageFiles"
                    :key="file.id"
                    class="bg-accent relative aspect-square rounded-md"
                  >
                    <img
                      :src="file.preview"
                      :alt="file.file.name"
                      class="size-full rounded-[inherit] object-cover"
                    />
                    <ui-button
                      size="icon"
                      class="border-background absolute -top-2 -right-2 size-6 rounded-full border-2"
                      @click="removeMultiImage(file.id)"
                    >
                      <ui-icon name="lucide:x" class="size-3.5" />
                    </ui-button>
                  </div>
                </div>
              </div>
              <div
                v-else
                class="flex cursor-pointer flex-col items-center justify-center text-center"
                @click="openMultiImageDialog"
              >
                <div
                  class="bg-background mb-2 flex size-11 items-center justify-center rounded-full border"
                >
                  <ui-icon name="lucide:image" class="size-4 opacity-60" />
                </div>
                <p class="mb-1.5 text-sm font-medium">Drop your images here</p>
                <p class="text-muted-foreground text-xs">PNG, JPG or GIF (max. 5MB)</p>
                <ui-button variant="outline" class="mt-4" @click.stop="openMultiImageDialog">
                  <ui-icon name="lucide:upload" class="-ms-1 size-4 opacity-60" />
                  Select images
                </ui-button>
              </div>
            </div>
            <div
              v-if="multiImageErrors.length > 0"
              class="text-destructive mt-2 flex items-center gap-1 text-xs"
            >
              <ui-icon name="lucide:circle-alert" class="size-3" />
              <span>{{ multiImageErrors[0] }}</span>
            </div>
          </div>
        </div>

        <!-- Multiple Files List -->
        <div>
          <h3 class="mb-4 text-lg font-semibold">Multiple File Uploader</h3>
          <div class="mx-auto max-w-md space-y-2">
            <div
              ref="multiFileDropzone"
              class="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 flex min-h-40 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-4 transition-colors"
              @click="openMultiFileDialog"
            >
              <input ref="multiFileInput" hidden type="file" multiple />
              <div class="flex flex-col items-center justify-center text-center">
                <div
                  class="bg-background mb-2 flex size-11 items-center justify-center rounded-full border"
                >
                  <ui-icon name="lucide:file-up" class="size-4 opacity-60" />
                </div>
                <p class="mb-1.5 text-sm font-medium">Upload files</p>
                <p class="text-muted-foreground text-xs">Drag & drop or click to browse</p>
              </div>
            </div>

            <div
              v-if="multiFileErrors.length > 0"
              class="text-destructive flex items-center gap-1 text-xs"
            >
              <ui-icon name="lucide:circle-alert" class="size-3" />
              <span>{{ multiFileErrors[0] }}</span>
            </div>

            <div v-if="multiFiles.length > 0" class="space-y-2">
              <div
                v-for="file in multiFiles"
                :key="file.id"
                class="bg-background flex items-center justify-between gap-2 rounded-lg border p-2 pe-3"
              >
                <div class="flex items-center gap-3 overflow-hidden">
                  <div class="flex size-10 shrink-0 items-center justify-center rounded border">
                    <ui-icon :name="getFileIcon(file)" class="size-4 opacity-60" />
                  </div>
                  <div class="flex min-w-0 flex-col gap-0.5">
                    <p class="truncate text-sm font-medium">{{ file.file.name }}</p>
                    <p class="text-muted-foreground text-xs">
                      {{ formatBytes(file.file.size) }}
                    </p>
                  </div>
                </div>
                <ui-button
                  size="icon"
                  variant="ghost"
                  class="text-muted-foreground/80 hover:text-foreground size-8"
                  @click="removeMultiFile(file.id)"
                >
                  <ui-icon name="lucide:x" class="size-4" />
                </ui-button>
              </div>

              <ui-button
                v-if="multiFiles.length > 1"
                size="sm"
                variant="outline"
                @click="clearMultiFiles"
              >
                Remove all files
              </ui-button>
            </div>
          </div>
        </div>
      </div>
    </component-section>

    <!-- Returns Documentation -->
    <div class="rounded-lg border p-6">
      <h3 class="mb-4 text-lg font-semibold">Composable Returns</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b">
              <th class="py-2 text-left font-medium">Name</th>
              <th class="py-2 text-left font-medium">Type</th>
              <th class="py-2 text-left font-medium">Description</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prop in returnsDocs" :key="prop.name" class="border-b last:border-0">
              <td class="py-2 font-mono text-xs">{{ prop.name }}</td>
              <td class="text-muted-foreground py-2 font-mono text-xs">{{ prop.type }}</td>
              <td class="text-muted-foreground py-2">{{ prop.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
