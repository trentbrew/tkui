<script setup lang="ts">
  import { ref } from "vue";
  import type { PropDoc } from "../../components/ComponentDocs.vue";

  const sourceCode = `<template>
  <ui-code-editor
    v-model="code"
    language="typescript"
    height="300px"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const code = ref(\`function greet(name: string) {
  console.log(\\\`Hello, \\\${name}!\\\`)
}

greet('World')\`)
<\/script>`;

  const propsDocs: PropDoc[] = [
    {
      name: "modelValue",
      type: "string",
      description: "The code content (v-model)",
    },
    {
      name: "language",
      type: "string",
      default: "'javascript'",
      description:
        "Programming language for syntax highlighting (javascript, typescript, html, css, json, python, etc.)",
    },
    {
      name: "theme",
      type: "'vs' | 'vs-dark' | 'hc-black' | 'auto'",
      default: "'auto'",
      description: "Editor theme - auto follows system dark/light mode",
    },
    {
      name: "height",
      type: "string | number",
      default: "'300px'",
      description: "Editor height",
    },
    {
      name: "width",
      type: "string | number",
      default: "'100%'",
      description: "Editor width",
    },
    {
      name: "readonly",
      type: "boolean",
      default: "false",
      description: "Make editor read-only",
    },
    {
      name: "lineNumbers",
      type: "boolean",
      default: "true",
      description: "Show line numbers",
    },
    {
      name: "minimap",
      type: "boolean",
      default: "false",
      description: "Show minimap preview",
    },
    {
      name: "wordWrap",
      type: "'on' | 'off' | 'wordWrapColumn' | 'bounded'",
      default: "'on'",
      description: "Word wrap mode",
    },
    {
      name: "fontSize",
      type: "number",
      default: "14",
      description: "Font size in pixels",
    },
    {
      name: "tabSize",
      type: "number",
      default: "2",
      description: "Tab size (spaces)",
    },
    {
      name: "options",
      type: "object",
      description: "Additional Monaco editor options",
    },
  ];

  // Demo code samples
  const jsCode = ref(`// JavaScript Example
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const result = fibonacci(10);
console.log('Fibonacci(10):', result);`);

  const tsCode = ref(`// TypeScript Example
interface User {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

function greetUser(user: User): string {
  return \`Hello, \${user.name}! You are logged in as \${user.role}.\`;
}

const user: User = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  role: 'admin'
};

console.log(greetUser(user));`);

  const htmlCode = ref(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My App</title>
</head>
<body>
  <div id="app">
    <h1>Hello World</h1>
    <p>Welcome to my application.</p>
  </div>
</body>
</html>`);

  const cssCode = ref(`:root {
  --primary: #3b82f6;
  --background: #ffffff;
  --foreground: #0f172a;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.button {
  background-color: var(--primary);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;
  transition: opacity 0.2s;
}

.button:hover {
  opacity: 0.9;
}`);

  const jsonCode = ref(`{
  "name": "tkui-starter",
  "version": "1.0.0",
  "description": "A Vue 3 component library",
  "dependencies": {
    "vue": "^3.4.0",
    "tailwindcss": "^4.0.0",
    "@guolao/vue-monaco-editor": "^1.6.0"
  },
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}`);

  const pythonCode = ref(`# Python Example
from dataclasses import dataclass
from typing import List

@dataclass
class ComplianceReport:
    site_id: str
    score: float
    violations: List[str]

    def is_compliant(self) -> bool:
        return self.score >= 90 and len(self.violations) == 0

def generate_report(site_id: str) -> ComplianceReport:
    # Simulate compliance check
    return ComplianceReport(
        site_id=site_id,
        score=95.5,
        violations=[]
    )

report = generate_report("SITE-001")
print(f"Site {report.site_id}: {'Compliant' if report.is_compliant() else 'Non-Compliant'}")`);

  const sqlCode = ref(`-- Environmental Compliance Query
SELECT
    s.site_name,
    p.permit_number,
    p.permit_type,
    a.audit_date,
    a.compliance_score,
    CASE
        WHEN a.compliance_score >= 90 THEN 'Compliant'
        WHEN a.compliance_score >= 70 THEN 'Warning'
        ELSE 'Non-Compliant'
    END as status
FROM sites s
JOIN permits p ON s.site_id = p.site_id
LEFT JOIN audits a ON p.permit_id = a.permit_id
WHERE a.audit_date >= DATE_SUB(CURRENT_DATE, INTERVAL 1 YEAR)
ORDER BY a.compliance_score ASC;`);

  const selectedLanguage = ref("typescript");
  const languageOptions = [
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
    { value: "html", label: "HTML" },
    { value: "css", label: "CSS" },
    { value: "json", label: "JSON" },
    { value: "python", label: "Python" },
    { value: "sql", label: "SQL" },
  ];

  const codeByLanguage: Record<string, typeof jsCode> = {
    javascript: jsCode,
    typescript: tsCode,
    html: htmlCode,
    css: cssCode,
    json: jsonCode,
    python: pythonCode,
    sql: sqlCode,
  };
</script>

<template>
  <component-section
    id="code-editor"
    title="Code Editor"
    description="A Monaco-powered code editor with syntax highlighting, IntelliSense, and theme support. Perfect for code snippets, configuration editors, and developer tools."
    :source-code="sourceCode"
    :props-docs="propsDocs"
  >
    <div class="space-y-12">
      <!-- Basic -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Basic Editor</h3>
        <ui-code-editor v-model="tsCode" language="typescript" height="250px" />
      </div>

      <!-- Language Selector -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Multiple Languages</h3>
        <div class="mb-4 flex flex-wrap gap-2">
          <ui-button
            v-for="lang in languageOptions"
            :key="lang.value"
            :variant="selectedLanguage === lang.value ? 'default' : 'outline'"
            size="sm"
            @click="selectedLanguage = lang.value"
          >
            {{ lang.label }}
          </ui-button>
        </div>
        <ui-code-editor
          v-model="codeByLanguage[selectedLanguage].value"
          :language="selectedLanguage"
          height="300px"
        />
      </div>

      <!-- Read-only -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Read-only Mode</h3>
        <p class="text-muted-foreground mb-4 text-sm">
          Perfect for displaying code snippets without allowing edits.
        </p>
        <ui-code-editor v-model="jsonCode" language="json" height="200px" readonly />
      </div>

      <!-- With Minimap -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">With Minimap</h3>
        <ui-code-editor v-model="pythonCode" language="python" height="300px" minimap />
      </div>

      <!-- Custom Options -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">Custom Styling</h3>
        <div class="grid gap-4 md:grid-cols-2">
          <div>
            <p class="text-muted-foreground mb-2 text-sm">Large font, no line numbers</p>
            <ui-code-editor
              v-model="cssCode"
              language="css"
              height="200px"
              :font-size="16"
              :line-numbers="false"
            />
          </div>
          <div>
            <p class="text-muted-foreground mb-2 text-sm">Compact with 4-space tabs</p>
            <ui-code-editor
              v-model="htmlCode"
              language="html"
              height="200px"
              :font-size="12"
              :tab-size="4"
            />
          </div>
        </div>
      </div>

      <!-- SQL Example -->
      <div>
        <h3 class="mb-4 text-lg font-semibold">SQL Query Editor</h3>
        <p class="text-muted-foreground mb-4 text-sm">
          Useful for compliance reporting queries and data analysis.
        </p>
        <ui-card class="overflow-hidden">
          <ui-card-header class="flex-row items-center justify-between space-y-0 border-b py-2">
            <div class="flex items-center gap-2">
              <ui-icon name="lucide:database" class="text-muted-foreground size-4" />
              <span class="text-sm font-medium">Query Editor</span>
            </div>
            <div class="flex gap-2">
              <ui-button variant="outline" size="sm">
                <ui-icon name="lucide:play" class="mr-1.5 size-3.5" />
                Run
              </ui-button>
              <ui-button variant="outline" size="sm">
                <ui-icon name="lucide:save" class="mr-1.5 size-3.5" />
                Save
              </ui-button>
            </div>
          </ui-card-header>
          <ui-code-editor v-model="sqlCode" language="sql" height="250px" variant="ghost" />
        </ui-card>
      </div>
    </div>

    <template #live>
      <div class="flex flex-col gap-4">
        <h4 class="font-medium">Supported Languages</h4>
        <div class="text-muted-foreground grid grid-cols-2 gap-1 text-sm">
          <span>JavaScript</span>
          <span>TypeScript</span>
          <span>HTML</span>
          <span>CSS / SCSS</span>
          <span>JSON</span>
          <span>Python</span>
          <span>SQL</span>
          <span>Markdown</span>
          <span>YAML</span>
          <span>XML</span>
          <span>Shell / Bash</span>
          <span>+ many more</span>
        </div>
        <h4 class="mt-2 font-medium">Features</h4>
        <ul class="text-muted-foreground space-y-1 text-sm">
          <li>• Syntax highlighting</li>
          <li>• IntelliSense autocomplete</li>
          <li>• Auto dark/light theme</li>
          <li>• Find & replace</li>
          <li>• Code folding</li>
          <li>• Multi-cursor editing</li>
        </ul>
      </div>
    </template>
  </component-section>
</template>
