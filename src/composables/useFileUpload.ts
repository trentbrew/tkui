import { useDropZone, useFileDialog } from "@vueuse/core";
import { computed, ref, watch } from "vue";
import type { Ref } from "vue";

export interface FileUploadOptions {
  /**
   * Accepted file types (e.g., "image/*", "application/pdf")
   */
  accept?: string;
  /**
   * Allow multiple file selection
   */
  multiple?: boolean;
  /**
   * Maximum file size in bytes
   */
  maxSize?: number;
  /**
   * Maximum number of files allowed
   */
  maxFiles?: number;
  /**
   * Initial files to populate the uploader
   */
  initialFiles?: InitialFile[];
}

export interface InitialFile {
  name: string;
  size: number;
  type: string;
  url: string;
  id: string;
}

export interface UploadedFile {
  id: string;
  file: File | { name: string; size: number; type: string; url?: string };
  preview: string;
}

/**
 * Format bytes to human-readable string
 */
export function formatBytes(bytes: number, decimals = 2): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

/**
 * Composable for handling file uploads with drag-and-drop support
 */
export function useFileUpload(options: FileUploadOptions = {}) {
  const {
    accept = "*",
    multiple = false,
    maxSize = 10 * 1024 * 1024, // 10MB default
    maxFiles = 10,
    initialFiles = [],
  } = options;

  const files: Ref<UploadedFile[]> = ref([]);
  const errors: Ref<string[]> = ref([]);
  const dropzoneRef = ref<HTMLElement | null>(null);
  const inputRef = ref<HTMLInputElement | null>(null);

  // Initialize with initial files
  if (initialFiles.length > 0) {
    files.value = initialFiles.map((f) => ({
      id: f.id,
      file: { name: f.name, size: f.size, type: f.type, url: f.url },
      preview: f.url,
    }));
  }

  const validateFile = (file: File): string | null => {
    // Check file size
    if (file.size > maxSize) {
      return `File "${file.name}" exceeds maximum size of ${formatBytes(maxSize)}`;
    }

    // Check file type if accept is specified
    if (accept !== "*") {
      const acceptedTypes = accept.split(",").map((t) => t.trim());
      const fileType = file.type;
      const fileExtension = "." + file.name.split(".").pop()?.toLowerCase();

      const isAccepted = acceptedTypes.some((type) => {
        if (type.startsWith(".")) {
          return fileExtension === type.toLowerCase();
        }
        if (type.endsWith("/*")) {
          return fileType.startsWith(type.replace("/*", "/"));
        }
        return fileType === type;
      });

      if (!isAccepted) {
        return `File "${file.name}" is not an accepted file type`;
      }
    }

    return null;
  };

  const addFiles = (newFiles: FileList | File[] | null) => {
    if (!newFiles) return;

    errors.value = [];
    const fileArray = Array.from(newFiles);

    // Check max files limit
    if (!multiple && files.value.length >= 1) {
      errors.value.push("Only one file is allowed. Remove the current file first.");
      return;
    }

    if (files.value.length + fileArray.length > maxFiles) {
      errors.value.push(`Maximum ${maxFiles} files allowed`);
      return;
    }

    for (const file of fileArray) {
      const error = validateFile(file);
      if (error) {
        errors.value.push(error);
        continue;
      }

      const id = `${file.name}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      const preview = file.type.startsWith("image/") ? URL.createObjectURL(file) : "";

      files.value.push({
        id,
        file,
        preview,
      });

      // Stop after one file if not multiple
      if (!multiple) break;
    }
  };

  const removeFile = (id: string) => {
    const index = files.value.findIndex((f) => f.id === id);
    if (index !== -1) {
      const file = files.value[index];
      // Revoke object URL if it was created
      if (file.preview && file.file instanceof File) {
        URL.revokeObjectURL(file.preview);
      }
      files.value.splice(index, 1);
    }
    errors.value = [];
  };

  const clearFiles = () => {
    // Revoke all object URLs
    files.value.forEach((file) => {
      if (file.preview && file.file instanceof File) {
        URL.revokeObjectURL(file.preview);
      }
    });
    files.value = [];
    errors.value = [];
  };

  const openFileDialog = () => {
    inputRef.value?.click();
  };

  // Setup dropzone
  const { isOverDropZone } = useDropZone(dropzoneRef, {
    onDrop: (droppedFiles) => {
      addFiles(droppedFiles);
    },
    dataTypes: accept === "*" ? undefined : accept.split(",").map((t) => t.trim()),
  });

  // Watch for dropzone state to add data attribute
  watch(isOverDropZone, (isDragging) => {
    if (dropzoneRef.value) {
      dropzoneRef.value.dataset.dragging = isDragging ? "true" : "false";
    }
  });

  // Setup file input
  watch(inputRef, (input) => {
    if (input) {
      input.accept = accept;
      input.multiple = multiple;
      input.addEventListener("change", (e) => {
        const target = e.target as HTMLInputElement;
        addFiles(target.files);
        // Reset input value to allow selecting the same file again
        target.value = "";
      });
    }
  });

  return {
    files,
    errors,
    dropzoneRef,
    inputRef,
    isOverDropZone,
    addFiles,
    removeFile,
    clearFiles,
    openFileDialog,
    formatBytes,
  };
}

export default useFileUpload;
