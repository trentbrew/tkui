<template>
  <div class="flex h-[calc(100vh-4rem)] flex-col">
    <!-- Header -->
    <div class="border-b p-4">
      <div class="mx-auto flex max-w-3xl items-center justify-between">
        <div class="flex items-center gap-3">
          <div
            class="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-full"
          >
            <ui-icon name="lucide:bot" class="size-5" />
          </div>
          <div>
            <h1 class="font-semibold">AI Assistant</h1>
            <p class="text-muted-foreground text-sm">Powered by GPT-4</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <ui-button variant="ghost" size="icon" @click="clearChat">
            <ui-icon name="lucide:trash-2" class="size-4" />
          </ui-button>
          <ui-button variant="ghost" size="icon">
            <ui-icon name="lucide:settings" class="size-4" />
          </ui-button>
        </div>
      </div>
    </div>

    <!-- Chat Messages -->
    <ui-scroll-area class="flex-1">
      <div class="mx-auto max-w-3xl space-y-6 p-6">
        <!-- Welcome Message -->
        <div v-if="messages.length === 0" class="py-12 text-center">
          <div
            class="bg-primary/10 text-primary mx-auto mb-4 flex size-16 items-center justify-center rounded-full"
          >
            <ui-icon name="lucide:sparkles" class="size-8" />
          </div>
          <h2 class="mb-2 text-xl font-semibold">How can I help you today?</h2>
          <p class="text-muted-foreground mb-8">
            I'm an AI assistant ready to help with questions, writing, analysis, and more.
          </p>

          <!-- Suggestion Cards -->
          <div class="grid gap-3 sm:grid-cols-2">
            <button
              v-for="suggestion in suggestions"
              :key="suggestion.title"
              class="bg-muted/50 hover:bg-muted rounded-lg p-4 text-left transition-colors"
              @click="useSuggestion(suggestion.prompt)"
            >
              <ui-icon :name="suggestion.icon" class="text-primary mb-2 size-5" />
              <h3 class="font-medium">{{ suggestion.title }}</h3>
              <p class="text-muted-foreground text-sm">{{ suggestion.description }}</p>
            </button>
          </div>
        </div>

        <!-- Messages -->
        <div v-for="message in messages" :key="message.id" class="flex gap-4">
          <div
            class="flex size-8 shrink-0 items-center justify-center rounded-full"
            :class="message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'"
          >
            <ui-icon
              :name="message.role === 'user' ? 'lucide:user' : 'lucide:bot'"
              class="size-4"
            />
          </div>
          <div class="flex-1 space-y-2">
            <div class="flex items-center gap-2">
              <span class="font-medium">{{ message.role === "user" ? "You" : "Assistant" }}</span>
              <span class="text-muted-foreground text-xs">{{ message.time }}</span>
            </div>
            <div class="prose prose-sm dark:prose-invert max-w-none">
              <p class="whitespace-pre-wrap">{{ message.content }}</p>
            </div>
            <div v-if="message.role === 'assistant'" class="flex items-center gap-2">
              <ui-button variant="ghost" size="sm" class="h-7 px-2">
                <ui-icon name="lucide:copy" class="mr-1 size-3" />
                Copy
              </ui-button>
              <ui-button variant="ghost" size="sm" class="h-7 px-2">
                <ui-icon name="lucide:thumbs-up" class="mr-1 size-3" />
              </ui-button>
              <ui-button variant="ghost" size="sm" class="h-7 px-2">
                <ui-icon name="lucide:thumbs-down" class="mr-1 size-3" />
              </ui-button>
            </div>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div v-if="isTyping" class="flex gap-4">
          <div class="bg-muted flex size-8 items-center justify-center rounded-full">
            <ui-icon name="lucide:bot" class="size-4" />
          </div>
          <div class="flex items-center gap-1">
            <span
              class="bg-muted-foreground/50 size-2 animate-bounce rounded-full"
              style="animation-delay: 0ms"
            />
            <span
              class="bg-muted-foreground/50 size-2 animate-bounce rounded-full"
              style="animation-delay: 150ms"
            />
            <span
              class="bg-muted-foreground/50 size-2 animate-bounce rounded-full"
              style="animation-delay: 300ms"
            />
          </div>
        </div>
      </div>
    </ui-scroll-area>

    <!-- Input Area -->
    <div class="border-t p-4">
      <div class="mx-auto max-w-3xl">
        <div class="bg-muted/50 flex items-end gap-2 rounded-xl p-2">
          <ui-button variant="ghost" size="icon" class="shrink-0">
            <ui-icon name="lucide:paperclip" class="size-4" />
          </ui-button>
          <ui-textarea
            v-model="input"
            placeholder="Message AI Assistant..."
            class="max-h-[200px] min-h-[44px] flex-1 resize-none border-0 bg-transparent focus-visible:ring-0"
            :rows="1"
            @keydown.enter.exact.prevent="sendMessage"
          />
          <ui-button
            size="icon"
            class="shrink-0"
            :disabled="!input.trim() || isTyping"
            @click="sendMessage"
          >
            <ui-icon name="lucide:arrow-up" class="size-4" />
          </ui-button>
        </div>
        <p class="text-muted-foreground mt-2 text-center text-xs">
          AI can make mistakes. Consider checking important information.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    time: string;
  }

  const suggestions = [
    {
      icon: "lucide:pen-line",
      title: "Help me write",
      description: "Draft emails, essays, or creative content",
      prompt: "Help me write a professional email to request a meeting with a client.",
    },
    {
      icon: "lucide:code",
      title: "Write code",
      description: "Generate, debug, or explain code",
      prompt: "Write a TypeScript function that validates an email address.",
    },
    {
      icon: "lucide:lightbulb",
      title: "Brainstorm ideas",
      description: "Get creative suggestions and solutions",
      prompt: "Give me 5 creative ideas for a mobile app that helps people learn new skills.",
    },
    {
      icon: "lucide:book-open",
      title: "Explain concepts",
      description: "Learn about any topic in simple terms",
      prompt: "Explain how machine learning works in simple terms.",
    },
  ];

  const messages = ref<Message[]>([]);
  const input = ref("");
  const isTyping = ref(false);

  const aiResponses = [
    "That's a great question! Let me help you with that. Based on what you've described, I would suggest starting with a clear outline of your goals and then breaking them down into smaller, manageable tasks.",
    "I understand what you're looking for. Here's my recommendation: First, consider the main objectives you want to achieve. Then, identify the key steps needed to reach those objectives. Finally, prioritize these steps based on their importance and urgency.",
    "Interesting! Let me think about this... There are several approaches you could take here. The most effective one would depend on your specific situation and constraints. Would you like me to elaborate on any particular aspect?",
    "Great idea! I can definitely help with that. Here are some suggestions to get you started:\n\n1. Define your target audience\n2. Research existing solutions\n3. Create a minimum viable product\n4. Gather feedback and iterate\n\nWould you like more details on any of these steps?",
  ];

  function sendMessage() {
    if (!input.value.trim() || isTyping.value) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.value,
      time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
    };

    messages.value.push(userMessage);
    input.value = "";
    isTyping.value = true;

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: aiResponses[Math.floor(Math.random() * aiResponses.length)],
        time: new Date().toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" }),
      };
      messages.value.push(aiMessage);
      isTyping.value = false;
    }, 1500);
  }

  function useSuggestion(prompt: string) {
    input.value = prompt;
    sendMessage();
  }

  function clearChat() {
    messages.value = [];
  }
</script>
