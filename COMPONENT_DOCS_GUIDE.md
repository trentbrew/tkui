# Component Documentation Guide

This guide explains how to add comprehensive documentation (source code + props) to component pages.

## Overview

Each component page now shows:

- **Persistent Preview**: Live preview pinned on the left
- **Docs Tab**: Short usage notes pulled from the section description
- **State Tab**: Optional real-time/stateful demo; shows an empty state if omitted
- **Code Tab**: Source code examples with copy functionality
- **Props Tab**: Detailed props documentation in a table format
- **Resizable Docs Pane**: Drag the divider to adjust the tabs pane width

## How to Add Documentation

### 1. Import the PropDoc Type

```typescript
import type { PropDoc } from "../../components/ComponentDocs.vue";
```

### 2. Define Source Code

Create a template string with usage examples:

```typescript
const componentSourceCode = `<template>
  <ui-component>Example</ui-component>
  <ui-component variant="secondary">Secondary</ui-component>
</template>`;
```

### 3. Define Props Documentation

Create an array of prop documentation objects:

```typescript
const componentProps: PropDoc[] = [
  {
    name: "variant",
    type: "'default' | 'secondary'",
    default: "'default'",
    description: "The visual style variant",
  },
  {
    name: "size",
    type: "'sm' | 'md' | 'lg'",
    default: "'md'",
    description: "The size of the component",
  },
  // ... more props
];
```

### 4. Pass to ComponentSection

Add the `source-code` and `props-docs` props:

```vue
<component-section
  id="component-name"
  title="Component Name"
  description="Component description"
  :source-code="componentSourceCode"
  :props-docs="componentProps"
>
  <!-- Your component examples -->
  <template #live>
    <!-- Optional: add a live/interactive demo for the State tab -->
  </template>
</component-section>
```

## PropDoc Interface

```typescript
interface PropDoc {
  name: string; // Prop name
  type: string; // Type definition (can be union types)
  default?: string; // Default value (optional)
  description: string; // Description of what the prop does
}
```

## Complete Example

See `/src/pages/components/button.vue` or `/src/pages/components/badge.vue` for complete examples.

```vue
<script setup lang="ts">
  import type { PropDoc } from "../../components/ComponentDocs.vue";

  const buttonSourceCode = `<template>
  <ui-button>Click me</ui-button>
  <ui-button variant="outline">Outline</ui-button>
</template>`;

  const buttonProps: PropDoc[] = [
    {
      name: "variant",
      type: "'default' | 'outline' | 'ghost'",
      default: "'default'",
      description: "Button style variant",
    },
  ];
</script>

<template>
  <component-section
    id="button"
    title="Button"
    description="A clickable button component"
    :source-code="buttonSourceCode"
    :props-docs="buttonProps"
  >
    <ui-button>Click me</ui-button>
  </component-section>
</template>
```

## Tips

1. **Extract from Source**: Look at the actual component file in `/src/components/Ui/` to find all available props
2. **Union Types**: Use single quotes for string literal types: `"'default' | 'secondary'"`
3. **Optional Props**: Omit the `default` field if there's no default value
4. **Complex Types**: For complex types, simplify or use descriptive strings
5. **Keep Examples Simple**: Show the most common use cases in the source code

## Components to Document

Here's a checklist of components that need documentation:

### Form Inputs

- [x] Button
- [x] Input
- [x] Textarea
- [x] Checkbox
- [x] Switch
- [x] Slider
- [x] Tags Input
- [x] Rating
- [x] Editable
- [x] Autocomplete

### Data Display

- [x] Badge
- [x] Chip
- [x] Avatar
- [x] Card
- [x] Table
- [x] Tree
- [x] Timeline
- [x] Kbd

### Feedback

- [x] Alert
- [x] Skeleton
- [x] Progress
- [x] Loader
- [x] Tooltip

### Navigation

- [x] Tabs
- [x] Accordion
- [x] Stepper
- [x] Breadcrumbs
- [x] Command
- [x] Collapsible

### Overlays

- [x] Dialog
- [x] Popover

### Layout

- [x] Separator
- [x] Divider

### Charts

- [x] Line Chart
- [x] Area Chart
- [x] Bar Chart
- [x] Donut Chart

### Examples

- [ ] Task Management

## Next Steps

1. Pick a component from the list above
2. Open its source file in `/src/components/Ui/`
3. Identify all props from the component definition
4. Create the documentation following this guide
5. Test the component page to ensure documentation displays correctly
