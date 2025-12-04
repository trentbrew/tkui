<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import type { PropDoc } from '../../components/ComponentDocs.vue'

type Option = { label: string; value: string; icon?: string }
type Car = { name: string; value: string }
type Person = { id: number; name: string }
type User = { id: number; name: string; email: string; role: string; disabled?: boolean }

// Basic
const fruits: Option[] = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Cherry", value: "cherry" },
  { label: "Dragonfruit", value: "dragonfruit" },
  { label: "Mango", value: "mango" },
  { label: "Watermelon", value: "watermelon" },
]
const fruitValue = ref<string | null>(null)
const fruitLabel = computed(() => fruits.find((f) => f.value === fruitValue.value)?.label ?? "Select a fruit")

// Objects
const cars: Car[] = [
  { name: "Audi", value: "audi" },
  { name: "BMW", value: "bmw" },
  { name: "Chevrolet", value: "chevrolet" },
  { name: "Dodge", value: "dodge" },
  { name: "Ford", value: "ford" },
  { name: "Lexus", value: "lexus" },
]
const carValue = ref<Car | null>(cars[2])
const carLabel = computed(() => carValue.value?.name ?? "Select a car")
const displayCar = (car?: Car | null) => car?.name ?? ""

// Multiple
const people: Person[] = [
  { id: 1, name: "Durward Reynolds" },
  { id: 2, name: "Kenton Towne" },
  { id: 3, name: "Therese Wunsch" },
  { id: 4, name: "Benedict Kessler" },
  { id: 5, name: "Katelyn Rohan" },
]
const peopleValue = ref<Person[]>([people[0], people[1]])
const displayPeople = (list?: Person[] | null) => {
  if (!list?.length) return ""
  if (list.length === 1) return list[0].name
  return list.map((p) => p.name).join(", ")
}
const peopleLabel = computed(() => displayPeople(peopleValue.value) || "Select people")

// Async search
const allUsers: User[] = [
  { id: 1, name: "Ava Rogers", email: "ava.rogers@example.com", role: "Designer" },
  { id: 2, name: "Liam Patel", email: "liam.patel@example.com", role: "Engineer" },
  { id: 3, name: "Mia Chen", email: "mia.chen@example.com", role: "Product" },
  { id: 4, name: "Noah Smith", email: "noah.smith@example.com", role: "Support", disabled: true },
  { id: 5, name: "Olivia Garcia", email: "olivia.garcia@example.com", role: "Marketing" },
  { id: 6, name: "Ethan Lee", email: "ethan.lee@example.com", role: "Engineer" },
]
const asyncQuery = ref("")
const asyncResults = ref<User[]>([])
const asyncSelected = ref<User | null>(null)
const asyncLoading = ref(false)
const asyncLabel = computed(() => asyncSelected.value?.name ?? "Search to select a user")
const displayUser = (user?: User | null) => user?.name ?? ""

let asyncTimer: ReturnType<typeof setTimeout> | undefined
watch(asyncQuery, (query) => {
  if (asyncTimer) clearTimeout(asyncTimer)
  if (!query) {
    asyncResults.value = []
    asyncLoading.value = false
    return
  }

  asyncLoading.value = true
  asyncTimer = setTimeout(() => {
    const term = query.toLowerCase().trim()
    asyncResults.value = allUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.role.toLowerCase().includes(term)
    )
    asyncLoading.value = false
  }, 350)
})

const autocompleteSourceCode = `<template>
  <ui-autocomplete v-model="value">
    <ui-autocomplete-anchor>
      <ui-autocomplete-input placeholder="Select an item" />
      <ui-autocomplete-trigger>
        <ui-icon name="lucide:chevron-down" class="size-4 text-muted-foreground" />
      </ui-autocomplete-trigger>
    </ui-autocomplete-anchor>

    <ui-autocomplete-content>
      <ui-autocomplete-empty class="p-4 text-center text-sm font-medium text-muted-foreground">
        No match found
      </ui-autocomplete-empty>
      <ui-autocomplete-group>
        <ui-autocomplete-label>Options</ui-autocomplete-label>
        <ui-autocomplete-item value="one" icon="lucide:check">Option One</ui-autocomplete-item>
        <ui-autocomplete-item value="two" icon="lucide:check">Option Two</ui-autocomplete-item>
      </ui-autocomplete-group>
    </ui-autocomplete-content>
  </ui-autocomplete>
</template>`

const autocompleteProps: PropDoc[] = [
  { name: 'modelValue', type: 'string | object | any[]', description: 'Selected option value (use v-model)' },
  { name: 'multiple', type: 'boolean', default: 'false', description: 'Allow selecting multiple values' },
  { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the combobox' },
  { name: 'class', type: 'string', description: 'Additional classes for the root' },
]
</script>

<template>
  <component-section id="autocomplete" title="Autocomplete"
    description="Choose from a list of suggested values with full keyboard support."
    :source-code="autocompleteSourceCode" :props-docs="autocompleteProps">
    <div class="space-y-6">
      <!-- Basic -->
      <ui-card>
        <ui-card-header>
          <ui-card-title>Basic</ui-card-title>
          <ui-card-description>Select from a flat list with built-in filtering.</ui-card-description>
        </ui-card-header>
        <ui-card-content>
          <div class="mx-auto max-w-sm">
            <ui-autocomplete v-model="fruitValue">
              <ui-autocomplete-anchor>
                <ui-autocomplete-input placeholder="Select a fruit" />
                <ui-autocomplete-trigger>
                  <ui-icon name="lucide:chevron-down" class="size-4 text-muted-foreground" />
                </ui-autocomplete-trigger>
              </ui-autocomplete-anchor>

              <ui-autocomplete-content>
                <ui-autocomplete-empty
                  class="flex items-center justify-center p-4 text-center text-sm font-medium text-pretty">
                  No match found
                </ui-autocomplete-empty>
                <ui-autocomplete-group>
                  <ui-autocomplete-label>Fruits</ui-autocomplete-label>
                  <ui-autocomplete-item v-for="fruit in fruits" :key="fruit.value" :value="fruit.value"
                    :icon="fruit.icon">
                    {{ fruit.label }}
                  </ui-autocomplete-item>
                </ui-autocomplete-group>
              </ui-autocomplete-content>
            </ui-autocomplete>
          </div>
        </ui-card-content>
      </ui-card>

      <!-- Objects -->
      <ui-card>
        <ui-card-header>
          <ui-card-title>Objects</ui-card-title>
          <ui-card-description>Bind complex objects and control how they render.</ui-card-description>
        </ui-card-header>
        <ui-card-content>
          <div class="mx-auto max-w-sm">
            <ui-autocomplete v-model="carValue">
              <ui-autocomplete-anchor>
                <ui-autocomplete-input :display-value="displayCar" placeholder="Select a car..." />
                <ui-autocomplete-trigger>
                  <ui-icon name="lucide:chevron-down" class="size-4 text-muted-foreground" />
                </ui-autocomplete-trigger>
              </ui-autocomplete-anchor>

              <ui-autocomplete-content>
                <ui-autocomplete-empty
                  class="flex items-center justify-center p-4 text-center text-sm font-medium text-pretty" />
                <ui-autocomplete-group>
                  <ui-autocomplete-label>Cars</ui-autocomplete-label>
                  <ui-autocomplete-item v-for="car in cars" :key="car.value" :value="car" icon="lucide:check">
                    {{ car.name }}
                  </ui-autocomplete-item>
                </ui-autocomplete-group>
              </ui-autocomplete-content>
            </ui-autocomplete>
          </div>
        </ui-card-content>
      </ui-card>

      <!-- Multiple -->
      <ui-card>
        <ui-card-header>
          <ui-card-title>Multiple</ui-card-title>
          <ui-card-description>Select more than one option and display a combined label.</ui-card-description>
        </ui-card-header>
        <ui-card-content>
          <div class="mx-auto max-w-sm">
            <ui-autocomplete v-model="peopleValue" multiple>
              <ui-autocomplete-anchor>
                <ui-autocomplete-input :display-value="displayPeople" placeholder="Select people..." />
                <ui-autocomplete-trigger>
                  <ui-icon name="lucide:chevron-down" class="size-4 text-muted-foreground" />
                </ui-autocomplete-trigger>
              </ui-autocomplete-anchor>

              <ui-autocomplete-content>
                <ui-autocomplete-empty
                  class="flex items-center justify-center p-4 text-center text-sm font-medium text-pretty" />
                <ui-autocomplete-group>
                  <ui-autocomplete-label>People</ui-autocomplete-label>
                  <ui-autocomplete-item v-for="person in people" :key="person.id" :value="person" icon="lucide:check">
                    {{ person.name }}
                  </ui-autocomplete-item>
                </ui-autocomplete-group>
              </ui-autocomplete-content>
            </ui-autocomplete>
          </div>
        </ui-card-content>
      </ui-card>

      <!-- Async -->
      <ui-card>
        <ui-card-header>
          <ui-card-title>Async</ui-card-title>
          <ui-card-description>Simulate remote search with a loading indicator. Use '@' to trigger
            search.</ui-card-description>
        </ui-card-header>
        <ui-card-content>
          <div class="mx-auto max-w-sm">
            <ui-autocomplete v-model="asyncSelected">
              <ui-autocomplete-anchor>
                <ui-autocomplete-input v-model="asyncQuery" :display-value="displayUser"
                  placeholder="Search for a user..." />
                <ui-autocomplete-trigger :disabled="asyncLoading">
                  <ui-icon v-if="!asyncLoading" name="lucide:chevron-down" class="size-4 text-muted-foreground" />
                  <ui-icon v-else name="lucide:loader-2" class="size-4 animate-spin text-muted-foreground" />
                </ui-autocomplete-trigger>
              </ui-autocomplete-anchor>

              <ui-autocomplete-content>
                <ui-autocomplete-empty v-if="!asyncResults.length"
                  class="flex items-center justify-center p-4 text-center text-sm font-medium text-pretty">
                  <p v-if="asyncQuery && asyncLoading">Searching users…</p>
                  <p v-else>Please enter a name to search</p>
                </ui-autocomplete-empty>
                <ui-autocomplete-group v-else>
                  <ui-autocomplete-label>Results</ui-autocomplete-label>
                  <ui-autocomplete-item v-for="user in asyncResults" :key="user.id" :value="user" icon="lucide:check"
                    :disabled="user.disabled">
                    <div class="flex items-center gap-3">
                      <div class="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium">
                        {{ user.name.charAt(0) }}
                      </div>
                      <div class="flex flex-col">
                        <span :class="[user.disabled ? 'line-through text-muted-foreground' : '']">
                          {{ user.name }}
                        </span>
                        <span class="text-muted-foreground text-xs">{{ user.email }}</span>
                      </div>
                    </div>
                  </ui-autocomplete-item>
                </ui-autocomplete-group>
              </ui-autocomplete-content>
            </ui-autocomplete>
          </div>
        </ui-card-content>
      </ui-card>
    </div>

    <template #live>
      <div class="grid gap-2 text-sm">
        <div class="flex items-center gap-2">
          <ui-badge variant="outline">Basic</ui-badge>
          <span>{{ fruitLabel }}</span>
        </div>
        <div class="flex items-center gap-2">
          <ui-badge variant="outline">Objects</ui-badge>
          <span>{{ carLabel }}</span>
        </div>
        <div class="flex items-center gap-2">
          <ui-badge variant="outline">Multiple</ui-badge>
          <span>{{ peopleLabel }}</span>
        </div>
        <div class="flex items-center gap-2">
          <ui-badge variant="outline">Async</ui-badge>
          <span>{{ asyncLabel }}</span>
        </div>
      </div>
    </template>
  </component-section>
</template>
