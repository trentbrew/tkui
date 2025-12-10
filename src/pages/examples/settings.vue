<template>
  <div class="mx-auto max-w-4xl px-6 py-6">
    <div class="mb-8">
      <h1 class="text-2xl font-bold">Settings</h1>
      <p class="text-muted-foreground">Manage your account settings and preferences.</p>
    </div>

    <ui-tabs default-value="profile" class="space-y-6">
      <ui-tabs-list>
        <ui-tabs-trigger value="profile">Profile</ui-tabs-trigger>
        <ui-tabs-trigger value="account">Account</ui-tabs-trigger>
        <ui-tabs-trigger value="appearance">Appearance</ui-tabs-trigger>
        <ui-tabs-trigger value="notifications">Notifications</ui-tabs-trigger>
      </ui-tabs-list>

      <!-- Profile Tab -->
      <ui-tabs-content value="profile" class="space-y-6">
        <ui-card>
          <ui-card-header>
            <ui-card-title>Profile Information</ui-card-title>
            <ui-card-description
              >Update your profile details and public information.</ui-card-description
            >
          </ui-card-header>
          <ui-card-content class="space-y-6">
            <div class="flex items-center gap-6">
              <ui-avatar
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Me"
                fallback="ME"
                class="size-20"
              />
              <div class="space-y-2">
                <ui-button variant="outline" size="sm">
                  <ui-icon name="lucide:upload" class="mr-2 size-4" />
                  Upload Photo
                </ui-button>
                <p class="text-muted-foreground text-xs">JPG, PNG or GIF. Max 2MB.</p>
              </div>
            </div>

            <div class="grid gap-4 sm:grid-cols-2">
              <div class="space-y-2">
                <ui-label for="firstName">First Name</ui-label>
                <ui-input id="firstName" v-model="profile.firstName" />
              </div>
              <div class="space-y-2">
                <ui-label for="lastName">Last Name</ui-label>
                <ui-input id="lastName" v-model="profile.lastName" />
              </div>
            </div>

            <div class="space-y-2">
              <ui-label for="email">Email</ui-label>
              <ui-input id="email" v-model="profile.email" type="email" />
            </div>

            <div class="space-y-2">
              <ui-label for="bio">Bio</ui-label>
              <ui-textarea
                id="bio"
                v-model="profile.bio"
                placeholder="Tell us about yourself"
                :rows="3"
              />
            </div>

            <div class="space-y-2">
              <ui-label for="website">Website</ui-label>
              <ui-input id="website" v-model="profile.website" placeholder="https://" />
            </div>
          </ui-card-content>
          <ui-card-footer>
            <ui-button>Save Changes</ui-button>
          </ui-card-footer>
        </ui-card>
      </ui-tabs-content>

      <!-- Account Tab -->
      <ui-tabs-content value="account" class="space-y-6">
        <ui-card>
          <ui-card-header>
            <ui-card-title>Password</ui-card-title>
            <ui-card-description
              >Change your password to keep your account secure.</ui-card-description
            >
          </ui-card-header>
          <ui-card-content class="space-y-4">
            <div class="space-y-2">
              <ui-label for="currentPassword">Current Password</ui-label>
              <ui-input id="currentPassword" type="password" />
            </div>
            <div class="space-y-2">
              <ui-label for="newPassword">New Password</ui-label>
              <ui-input id="newPassword" type="password" />
            </div>
            <div class="space-y-2">
              <ui-label for="confirmPassword">Confirm Password</ui-label>
              <ui-input id="confirmPassword" type="password" />
            </div>
          </ui-card-content>
          <ui-card-footer>
            <ui-button>Update Password</ui-button>
          </ui-card-footer>
        </ui-card>

        <ui-card>
          <ui-card-header>
            <ui-card-title>Two-Factor Authentication</ui-card-title>
            <ui-card-description
              >Add an extra layer of security to your account.</ui-card-description
            >
          </ui-card-header>
          <ui-card-content>
            <div class="flex items-center justify-between">
              <div class="space-y-1">
                <p class="font-medium">Authenticator App</p>
                <p class="text-muted-foreground text-sm">
                  Use an authenticator app to generate codes.
                </p>
              </div>
              <ui-switch v-model:checked="account.twoFactor" />
            </div>
          </ui-card-content>
        </ui-card>

        <ui-card class="border-destructive">
          <ui-card-header>
            <ui-card-title class="text-destructive">Danger Zone</ui-card-title>
            <ui-card-description>Irreversible and destructive actions.</ui-card-description>
          </ui-card-header>
          <ui-card-content class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="space-y-1">
                <p class="font-medium">Delete Account</p>
                <p class="text-muted-foreground text-sm">
                  Permanently delete your account and all data.
                </p>
              </div>
              <ui-button variant="destructive">Delete Account</ui-button>
            </div>
          </ui-card-content>
        </ui-card>
      </ui-tabs-content>

      <!-- Appearance Tab -->
      <ui-tabs-content value="appearance" class="space-y-6">
        <ui-card>
          <ui-card-header>
            <ui-card-title>Theme</ui-card-title>
            <ui-card-description>Customize the appearance of the application.</ui-card-description>
          </ui-card-header>
          <ui-card-content class="space-y-6">
            <div class="space-y-3">
              <ui-label>Color Mode</ui-label>
              <div class="grid grid-cols-3 gap-4">
                <button
                  v-for="mode in colorModes"
                  :key="mode.value"
                  class="hover:bg-muted rounded-lg border p-4 text-center transition-colors"
                  :class="{
                    'border-primary ring-primary ring-1': appearance.colorMode === mode.value,
                  }"
                  @click="appearance.colorMode = mode.value"
                >
                  <ui-icon :name="mode.icon" class="mx-auto mb-2 size-6" />
                  <span class="text-sm font-medium">{{ mode.label }}</span>
                </button>
              </div>
            </div>

            <ui-separator />

            <div class="space-y-3">
              <ui-label>Accent Color</ui-label>
              <div class="flex gap-3">
                <button
                  v-for="color in accentColors"
                  :key="color.value"
                  class="size-8 rounded-full ring-offset-2 transition-all"
                  :class="[
                    color.class,
                    appearance.accentColor === color.value ? 'ring-2 ring-current' : '',
                  ]"
                  @click="appearance.accentColor = color.value"
                />
              </div>
            </div>

            <ui-separator />

            <div class="flex items-center justify-between">
              <div class="space-y-1">
                <p class="font-medium">Reduce Motion</p>
                <p class="text-muted-foreground text-sm">Minimize animations throughout the app.</p>
              </div>
              <ui-switch v-model:checked="appearance.reduceMotion" />
            </div>
          </ui-card-content>
        </ui-card>
      </ui-tabs-content>

      <!-- Notifications Tab -->
      <ui-tabs-content value="notifications" class="space-y-6">
        <ui-card>
          <ui-card-header>
            <ui-card-title>Email Notifications</ui-card-title>
            <ui-card-description>Choose what emails you want to receive.</ui-card-description>
          </ui-card-header>
          <ui-card-content class="space-y-4">
            <div
              v-for="item in emailNotifications"
              :key="item.id"
              class="flex items-center justify-between"
            >
              <div class="space-y-1">
                <p class="font-medium">{{ item.title }}</p>
                <p class="text-muted-foreground text-sm">{{ item.description }}</p>
              </div>
              <ui-switch v-model:checked="item.enabled" />
            </div>
          </ui-card-content>
        </ui-card>

        <ui-card>
          <ui-card-header>
            <ui-card-title>Push Notifications</ui-card-title>
            <ui-card-description>Configure push notification preferences.</ui-card-description>
          </ui-card-header>
          <ui-card-content class="space-y-4">
            <div
              v-for="item in pushNotifications"
              :key="item.id"
              class="flex items-center justify-between"
            >
              <div class="space-y-1">
                <p class="font-medium">{{ item.title }}</p>
                <p class="text-muted-foreground text-sm">{{ item.description }}</p>
              </div>
              <ui-switch v-model:checked="item.enabled" />
            </div>
          </ui-card-content>
        </ui-card>
      </ui-tabs-content>
    </ui-tabs>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  const profile = ref({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    bio: "Software developer passionate about building great user experiences.",
    website: "https://johndoe.dev",
  });

  const account = ref({
    twoFactor: false,
  });

  const appearance = ref({
    colorMode: "system",
    accentColor: "blue",
    reduceMotion: false,
  });

  const colorModes = [
    { value: "light", label: "Light", icon: "lucide:sun" },
    { value: "dark", label: "Dark", icon: "lucide:moon" },
    { value: "system", label: "System", icon: "lucide:monitor" },
  ];

  const accentColors = [
    { value: "blue", class: "bg-blue-500" },
    { value: "green", class: "bg-green-500" },
    { value: "purple", class: "bg-purple-500" },
    { value: "red", class: "bg-red-500" },
    { value: "orange", class: "bg-orange-500" },
    { value: "pink", class: "bg-pink-500" },
  ];

  const emailNotifications = ref([
    {
      id: "marketing",
      title: "Marketing emails",
      description: "Receive emails about new products, features, and more.",
      enabled: true,
    },
    {
      id: "security",
      title: "Security alerts",
      description: "Receive alerts about your account security.",
      enabled: true,
    },
    {
      id: "updates",
      title: "Product updates",
      description: "Receive emails about product updates and changes.",
      enabled: false,
    },
  ]);

  const pushNotifications = ref([
    {
      id: "messages",
      title: "Direct messages",
      description: "Receive notifications for new messages.",
      enabled: true,
    },
    {
      id: "mentions",
      title: "Mentions",
      description: "Receive notifications when someone mentions you.",
      enabled: true,
    },
    {
      id: "reminders",
      title: "Reminders",
      description: "Receive reminder notifications.",
      enabled: false,
    },
  ]);
</script>
