<template>
  <div class="mx-auto max-w-2xl py-6">
    <!-- Create Post -->
    <ui-card class="mb-6">
      <ui-card-content class="pt-6">
        <div class="flex gap-4">
          <ui-avatar
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Me"
            fallback="ME"
            class="size-10"
          />
          <div class="flex-1">
            <ui-textarea
              v-model="newPost"
              placeholder="What's on your mind?"
              class="mb-3 min-h-[80px] resize-none"
            />
            <div class="flex items-center justify-between">
              <div class="flex gap-2">
                <ui-button variant="ghost" size="sm">
                  <ui-icon name="lucide:image" class="mr-2 size-4" />
                  Photo
                </ui-button>
                <ui-button variant="ghost" size="sm">
                  <ui-icon name="lucide:video" class="mr-2 size-4" />
                  Video
                </ui-button>
                <ui-button variant="ghost" size="sm">
                  <ui-icon name="lucide:smile" class="mr-2 size-4" />
                  Emoji
                </ui-button>
              </div>
              <ui-button :disabled="!newPost.trim()" @click="createPost"> Post </ui-button>
            </div>
          </div>
        </div>
      </ui-card-content>
    </ui-card>

    <!-- Feed Posts -->
    <div class="space-y-6">
      <ui-card v-for="post in posts" :key="post.id">
        <ui-card-header>
          <div class="flex items-start justify-between">
            <div class="flex items-center gap-3">
              <ui-avatar
                :src="post.author.avatar"
                :fallback="post.author.name.charAt(0)"
                class="size-10"
              />
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-semibold">{{ post.author.name }}</span>
                  <span v-if="post.author.verified" class="text-primary">
                    <ui-icon name="lucide:badge-check" class="size-4" />
                  </span>
                </div>
                <p class="text-muted-foreground text-sm">
                  {{ post.author.handle }} · {{ post.time }}
                </p>
              </div>
            </div>
            <ui-dropdown-menu>
              <ui-dropdown-menu-trigger as-child>
                <ui-button variant="ghost" size="icon" class="size-8">
                  <ui-icon name="lucide:more-horizontal" class="size-4" />
                </ui-button>
              </ui-dropdown-menu-trigger>
              <ui-dropdown-menu-content align="end">
                <ui-dropdown-menu-item>
                  <ui-icon name="lucide:bookmark" class="mr-2 size-4" />
                  Save post
                </ui-dropdown-menu-item>
                <ui-dropdown-menu-item>
                  <ui-icon name="lucide:link" class="mr-2 size-4" />
                  Copy link
                </ui-dropdown-menu-item>
                <ui-dropdown-menu-separator />
                <ui-dropdown-menu-item class="text-destructive">
                  <ui-icon name="lucide:flag" class="mr-2 size-4" />
                  Report
                </ui-dropdown-menu-item>
              </ui-dropdown-menu-content>
            </ui-dropdown-menu>
          </div>
        </ui-card-header>
        <ui-card-content>
          <p class="mb-4 whitespace-pre-wrap">{{ post.content }}</p>
          <img
            v-if="post.image"
            :src="post.image"
            :alt="post.content"
            class="mb-4 w-full rounded-lg object-cover"
          />
          <div class="text-muted-foreground flex items-center gap-6 text-sm">
            <button
              class="flex items-center gap-2 transition-colors hover:text-red-500"
              :class="{ 'text-red-500': post.liked }"
              @click="toggleLike(post)"
            >
              <ui-icon
                :name="post.liked ? 'lucide:heart' : 'lucide:heart'"
                class="size-4"
                :class="{ 'fill-current': post.liked }"
              />
              {{ post.likes }}
            </button>
            <button
              class="flex items-center gap-2 transition-colors hover:text-blue-500"
              @click="toggleComments(post)"
            >
              <ui-icon name="lucide:message-circle" class="size-4" />
              {{ post.comments.length }}
            </button>
            <button class="flex items-center gap-2 transition-colors hover:text-green-500">
              <ui-icon name="lucide:repeat-2" class="size-4" />
              {{ post.reposts }}
            </button>
            <button class="flex items-center gap-2 transition-colors hover:text-blue-500">
              <ui-icon name="lucide:share" class="size-4" />
            </button>
          </div>
        </ui-card-content>

        <!-- Comments Section -->
        <div v-if="post.showComments" class="border-t">
          <div class="space-y-4 p-4">
            <div v-for="comment in post.comments" :key="comment.id" class="flex gap-3">
              <ui-avatar
                :src="comment.author.avatar"
                :fallback="comment.author.name.charAt(0)"
                class="size-8"
              />
              <div class="flex-1">
                <div class="bg-muted rounded-lg p-3">
                  <span class="font-medium">{{ comment.author.name }}</span>
                  <p class="text-sm">{{ comment.content }}</p>
                </div>
                <div class="text-muted-foreground mt-1 flex gap-4 text-xs">
                  <button class="hover:underline">Like</button>
                  <button class="hover:underline">Reply</button>
                  <span>{{ comment.time }}</span>
                </div>
              </div>
            </div>

            <!-- Add Comment -->
            <div class="flex gap-3">
              <ui-avatar
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Me"
                fallback="ME"
                class="size-8"
              />
              <ui-input
                v-model="post.newComment"
                placeholder="Write a comment..."
                class="flex-1"
                @keyup.enter="addComment(post)"
              />
            </div>
          </div>
        </div>
      </ui-card>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";

  interface Author {
    name: string;
    handle: string;
    avatar: string;
    verified: boolean;
  }

  interface Comment {
    id: string;
    author: Author;
    content: string;
    time: string;
  }

  interface Post {
    id: string;
    author: Author;
    content: string;
    image?: string;
    time: string;
    likes: number;
    liked: boolean;
    reposts: number;
    comments: Comment[];
    showComments: boolean;
    newComment: string;
  }

  const newPost = ref("");

  const posts = ref<Post[]>([
    {
      id: "1",
      author: {
        name: "Sarah Johnson",
        handle: "@sarahj",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        verified: true,
      },
      content:
        "Just shipped a major update to our design system! 🎉\n\nNew components include:\n• Enhanced data tables\n• Improved form validation\n• Dark mode refinements\n\nCheck it out and let me know what you think!",
      time: "2h",
      likes: 142,
      liked: false,
      reposts: 23,
      comments: [
        {
          id: "c1",
          author: {
            name: "Alex Chen",
            handle: "@alexc",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
            verified: false,
          },
          content: "This looks amazing! Great work on the dark mode.",
          time: "1h",
        },
      ],
      showComments: false,
      newComment: "",
    },
    {
      id: "2",
      author: {
        name: "Design Weekly",
        handle: "@designweekly",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Design",
        verified: true,
      },
      content:
        "The future of UI design is here. Component-driven development is changing how we build products.\n\nWhat are your thoughts on this approach?",
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=400&fit=crop",
      time: "4h",
      likes: 89,
      liked: true,
      reposts: 12,
      comments: [],
      showComments: false,
      newComment: "",
    },
    {
      id: "3",
      author: {
        name: "Michael Park",
        handle: "@mpark",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
        verified: false,
      },
      content:
        "Pro tip: Use CSS custom properties for your design tokens. Makes theming so much easier! 💡",
      time: "6h",
      likes: 56,
      liked: false,
      reposts: 8,
      comments: [
        {
          id: "c2",
          author: {
            name: "Emma Wilson",
            handle: "@emmaw",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
            verified: false,
          },
          content:
            "Totally agree! We switched to this approach last year and it's been a game changer.",
          time: "5h",
        },
        {
          id: "c3",
          author: {
            name: "David Lee",
            handle: "@davidl",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
            verified: false,
          },
          content: "Any resources you'd recommend for getting started?",
          time: "4h",
        },
      ],
      showComments: false,
      newComment: "",
    },
    {
      id: "4",
      author: {
        name: "Tech Insights",
        handle: "@techinsights",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Tech",
        verified: true,
      },
      content:
        "🚀 Breaking: Vue 4 roadmap announced!\n\nKey highlights:\n• Improved reactivity system\n• Better TypeScript integration\n• Smaller bundle sizes\n\nExciting times ahead for Vue developers!",
      time: "8h",
      likes: 324,
      liked: false,
      reposts: 87,
      comments: [
        {
          id: "c4",
          author: {
            name: "Sarah Johnson",
            handle: "@sarahj",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            verified: true,
          },
          content: "Can't wait to try out the new features!",
          time: "7h",
        },
      ],
      showComments: false,
      newComment: "",
    },
    {
      id: "5",
      author: {
        name: "Jessica Taylor",
        handle: "@jesstaylor",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
        verified: false,
      },
      content:
        "Just completed my first open source contribution! 🎊\n\nIt was nerve-wracking but the community was so welcoming. If you're thinking about contributing, just go for it!",
      time: "10h",
      likes: 203,
      liked: true,
      reposts: 45,
      comments: [
        {
          id: "c5",
          author: {
            name: "Michael Park",
            handle: "@mpark",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Michael",
            verified: false,
          },
          content: "Congratulations! What project did you contribute to?",
          time: "9h",
        },
        {
          id: "c6",
          author: {
            name: "Jessica Taylor",
            handle: "@jesstaylor",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jessica",
            verified: false,
          },
          content: "Thanks! It was a documentation fix for a popular UI library.",
          time: "9h",
        },
      ],
      showComments: false,
      newComment: "",
    },
    {
      id: "6",
      author: {
        name: "Code Academy",
        handle: "@codeacademy",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Academy",
        verified: true,
      },
      content:
        "Poll: What's your preferred state management solution in 2024?\n\n🔵 Pinia\n🟢 Vuex\n🟡 Composables only\n🔴 Other\n\nDrop your answer below! 👇",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop",
      time: "12h",
      likes: 178,
      liked: false,
      reposts: 32,
      comments: [
        {
          id: "c7",
          author: {
            name: "Alex Chen",
            handle: "@alexc",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
            verified: false,
          },
          content: "Pinia all the way! The devtools integration is fantastic.",
          time: "11h",
        },
        {
          id: "c8",
          author: {
            name: "Emma Wilson",
            handle: "@emmaw",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
            verified: false,
          },
          content: "Composables for smaller projects, Pinia for larger ones.",
          time: "10h",
        },
      ],
      showComments: false,
      newComment: "",
    },
    {
      id: "7",
      author: {
        name: "Ryan Cooper",
        handle: "@ryancooper",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ryan",
        verified: false,
      },
      content:
        "Hot take: Writing tests isn't about finding bugs, it's about designing better APIs. 🧪\n\nIf your code is hard to test, it's probably hard to use.",
      time: "1d",
      likes: 267,
      liked: false,
      reposts: 54,
      comments: [],
      showComments: false,
      newComment: "",
    },
  ]);

  function createPost() {
    if (!newPost.value.trim()) return;

    posts.value.unshift({
      id: Date.now().toString(),
      author: {
        name: "You",
        handle: "@me",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Me",
        verified: false,
      },
      content: newPost.value,
      time: "Just now",
      likes: 0,
      liked: false,
      reposts: 0,
      comments: [],
      showComments: false,
      newComment: "",
    });

    newPost.value = "";
  }

  function toggleLike(post: Post) {
    post.liked = !post.liked;
    post.likes += post.liked ? 1 : -1;
  }

  function toggleComments(post: Post) {
    post.showComments = !post.showComments;
  }

  function addComment(post: Post) {
    if (!post.newComment.trim()) return;

    post.comments.push({
      id: Date.now().toString(),
      author: {
        name: "You",
        handle: "@me",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Me",
        verified: false,
      },
      content: post.newComment,
      time: "Just now",
    });

    post.newComment = "";
  }
</script>
