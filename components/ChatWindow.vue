<script lang="ts">
import { ref } from "vue";
import { useRoute } from "vue-router";
import Message from "@/components/Message.vue";

const route = useRoute();
const userName = ref("John Doe"); // Default name, replace with dynamic data

// Sample messages
const messages = ref([
  { id: 1, text: "Hello, how are you?", sender: "John Doe" },
  { id: 2, text: "I'm good, thanks! How about you?", sender: "You" },
  {
    id: 3,
    text: "I'm doing well, just working on a project.",
    sender: "John Doe",
  },
]);

// For handling new messages
const newMessage = ref("");

const sendMessage = () => {
  if (newMessage.value.trim()) {
    messages.value.push({
      id: Date.now(),
      text: newMessage.value,
      sender: "You",
    });
    newMessage.value = ""; // Clear input after sending the message
  }
};
</script>

<template>
  <div class="h-full flex flex-col w-full">
    <!-- Chat Header -->
    <header
      class="bg-primary-1 text-black-900 p-4 flex items-center justify-between"
    >
      <div>
        <h2 class="text-lg font-semibold">Chat with {{ userName }}</h2>
      </div>
      <h2 class="text-lg font-semibold">Chat with {{ userName }}</h2>
    </header>

    <!-- Chat Messages -->
    <main class="flex-grow p-4 overflow-y-auto bg-gray-100">
      <Message
        v-for="message in messages"
        :key="message.id"
        :message="message"
        :isSentByCurrentUser="message.sender === 'You'"
      />
    </main>

    <!-- Chat Input -->
    <footer class="bg-gray-800 p-4">
      <input
        v-model="newMessage"
        @keyup.enter="sendMessage"
        class="w-full p-2 bg-gray-900 text-white rounded"
        placeholder="Type a message"
      />
    </footer>
  </div>
</template>


