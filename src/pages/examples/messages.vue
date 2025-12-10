<template>
  <div class="flex h-[calc(100vh-3rem)]">
    <!-- Conversations List -->
    <div class="flex w-80 flex-col border-r">
      <div class="border-b p-4">
        <div class="mb-4 flex items-center justify-between">
          <h2 class="text-lg font-semibold">Messages</h2>
          <ui-button variant="ghost" size="icon">
            <ui-icon name="lucide:edit" class="size-4" />
          </ui-button>
        </div>
        <ui-input placeholder="Search conversations..." class="w-full">
          <template #prefix>
            <ui-icon name="lucide:search" class="text-muted-foreground size-4" />
          </template>
        </ui-input>
      </div>

      <ui-scroll-area class="flex-1">
        <div class="p-2">
          <button
            v-for="conversation in conversations"
            :key="conversation.id"
            class="hover:bg-muted w-full rounded-lg p-3 text-left transition-colors"
            :class="{ 'bg-muted': selectedConversation?.id === conversation.id }"
            @click="selectConversation(conversation)"
          >
            <div class="flex items-start gap-3">
              <ui-avatar
                :src="conversation.avatar"
                :fallback="conversation.name.charAt(0)"
                class="size-10"
              />
              <div class="min-w-0 flex-1">
                <div class="flex items-center justify-between">
                  <span class="truncate font-medium">{{ conversation.name }}</span>
                  <span class="text-muted-foreground text-xs">{{ conversation.time }}</span>
                </div>
                <p class="text-muted-foreground truncate text-sm">{{ conversation.lastMessage }}</p>
              </div>
              <div
                v-if="conversation.unread"
                class="bg-primary text-primary-foreground flex size-5 items-center justify-center rounded-full text-xs"
              >
                {{ conversation.unread }}
              </div>
            </div>
          </button>
        </div>
      </ui-scroll-area>
    </div>

    <!-- Chat Area -->
    <div class="flex flex-1 flex-col">
      <template v-if="selectedConversation">
        <!-- Chat Header -->
        <div class="flex items-center justify-between border-b p-4">
          <div class="flex items-center gap-3">
            <ui-avatar
              :src="selectedConversation.avatar"
              :fallback="selectedConversation.name.charAt(0)"
              class="size-10"
            />
            <div>
              <h3 class="font-semibold">{{ selectedConversation.name }}</h3>
              <p class="text-muted-foreground text-sm">
                {{ selectedConversation.online ? "Online" : "Offline" }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <ui-button variant="ghost" size="icon">
              <ui-icon name="lucide:phone" class="size-4" />
            </ui-button>
            <ui-button variant="ghost" size="icon">
              <ui-icon name="lucide:video" class="size-4" />
            </ui-button>
            <ui-button variant="ghost" size="icon">
              <ui-icon name="lucide:more-vertical" class="size-4" />
            </ui-button>
          </div>
        </div>

        <!-- Messages -->
        <ui-scroll-area class="flex-1 p-4">
          <div class="space-y-4">
            <div
              v-for="message in messages"
              :key="message.id"
              class="flex"
              :class="{ 'justify-end': message.isMe }"
            >
              <div
                class="max-w-[70%] rounded-2xl px-4 py-2"
                :class="
                  message.isMe
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-muted rounded-bl-md'
                "
              >
                <p class="text-sm">{{ message.text }}</p>
                <span
                  class="mt-1 block text-xs"
                  :class="message.isMe ? 'text-primary-foreground/70' : 'text-muted-foreground'"
                >
                  {{ message.time }}
                </span>
              </div>
            </div>
          </div>
        </ui-scroll-area>

        <!-- Message Input -->
        <div class="border-t p-4">
          <div class="flex items-center gap-2">
            <ui-button variant="ghost" size="icon">
              <ui-icon name="lucide:paperclip" class="size-4" />
            </ui-button>
            <ui-input
              v-model="newMessage"
              placeholder="Type a message..."
              class="flex-1"
              @keyup.enter="sendMessage"
            />
            <ui-button variant="ghost" size="icon">
              <ui-icon name="lucide:smile" class="size-4" />
            </ui-button>
            <ui-button size="icon" @click="sendMessage" :disabled="!newMessage.trim()">
              <ui-icon name="lucide:send" class="size-4" />
            </ui-button>
          </div>
        </div>
      </template>

      <!-- Empty State -->
      <template v-else>
        <div class="flex flex-1 items-center justify-center">
          <ui-empty
            icon="lucide:message-square"
            title="No conversation selected"
            description="Select a conversation from the list to start messaging"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  interface Conversation {
    id: string;
    name: string;
    avatar: string;
    lastMessage: string;
    time: string;
    unread: number;
    online: boolean;
  }

  interface Message {
    id: string;
    text: string;
    time: string;
    isMe: boolean;
  }

  const conversations = ref<Conversation[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
      lastMessage: "That sounds great! Let me know when you're free.",
      time: "2m",
      unread: 2,
      online: true,
    },
    {
      id: "2",
      name: "Design Team",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Design",
      lastMessage: "Alex: The new mockups are ready for review",
      time: "15m",
      unread: 0,
      online: true,
    },
    {
      id: "3",
      name: "Michael Chen",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
      lastMessage: "Thanks for the help yesterday!",
      time: "1h",
      unread: 0,
      online: false,
    },
    {
      id: "4",
      name: "Emily Davis",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emily",
      lastMessage: "Can we schedule a call for tomorrow?",
      time: "3h",
      unread: 1,
      online: true,
    },
    {
      id: "5",
      name: "Engineering",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Engineering",
      lastMessage: "Build completed successfully",
      time: "5h",
      unread: 0,
      online: false,
    },
  ]);

  const selectedConversation = ref<Conversation | null>(conversations.value[0]);
  const newMessage = ref("");

  const messages = ref<Message[]>([
    {
      id: "1",
      text: "Hey! How's the project going?",
      time: "10:30 AM",
      isMe: false,
    },
    {
      id: "2",
      text: "It's going well! Just finished the main features.",
      time: "10:32 AM",
      isMe: true,
    },
    {
      id: "3",
      text: "That's awesome! Can you show me a demo later?",
      time: "10:33 AM",
      isMe: false,
    },
    {
      id: "4",
      text: "Sure! I'm free after 2pm today.",
      time: "10:35 AM",
      isMe: true,
    },
    {
      id: "5",
      text: "That sounds great! Let me know when you're free.",
      time: "10:36 AM",
      isMe: false,
    },
  ]);

  function selectConversation(conversation: Conversation) {
    selectedConversation.value = conversation;
    conversation.unread = 0;
  }

  function sendMessage() {
    if (!newMessage.value.trim()) return;

    messages.value.push({
      id: Date.now().toString(),
      text: newMessage.value,
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      isMe: true,
    });

    newMessage.value = "";
  }
</script>
