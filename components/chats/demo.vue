<script>
import { ref } from "vue";

const chats = ref([
  {
    name: "Chat with GT",
    messages: [
      { text: "Hey GT!", from: "user" },
      { text: "Hello! How are you?", from: "GT" },
    ],
  },
  {
    name: "Chat with Destiny",
    messages: [
      { text: "Hi Destiny!", from: "user" },
      { text: "Hi! What’s up?", from: "Destiny" },
    ],
  },
  {
    name: "Chat with Austin",
    messages: [
      { text: "Hey Austin!", from: "user" },
      { text: "Hey! Long time no see.", from: "Austin" },
    ],
  },
]);

const selectedChat = ref(chats.value[0]); // Default selection
const newMessage = ref("");

const selectChat = (chat) => {
  selectedChat.value = chat;
};

const sendMessage = () => {
  if (newMessage.value.trim()) {
    selectedChat.value.messages.push({
      text: newMessage.value,
      from: "user",
    });
    newMessage.value = "";
  }
};
</script>

<template>
  <div class="flex h-screen">
    <!-- Side Navigation -->
    <nav class="w-1/4 bg-gray-200 text-white p-4">
      <ul>
        <li
          v-for="(chat, index) in chats"
          :key="index"
          @click="selectChat(chat)"
          :class="[
            'cursor-pointer p-2 rounded',
            selectedChat === chat ? 'bg-gray-600' : '',
          ]"
        >
          {{ chat.name }}
        </li>
      </ul>
    </nav>

    <!-- Chat Home -->
    <div class="flex-grow flex flex-col">
      <div class="flex-grow p-4 bg-gray-100 overflow-y-auto">
        <div v-if="selectedChat">
          <h2 class="text-lg font-black mb-4">{{ selectedChat.name }}</h2>
          <div
            v-for="(message, index) in selectedChat.messages"
            :key="index"
            class="mb-2"
          >
            <div
              :class="[
                'p-2 rounded',
                message.from === 'user'
                  ? 'bg-blue-500 text-white self-end'
                  : 'bg-gray-300',
              ]"
            >
              {{ message.text }}
            </div>
          </div>
        </div>
        <div v-else class="text-center text-gray-500">
          Select a chat to start messaging
        </div>
      </div>

      <!-- Message Input -->
      <div class="p-4 bg-white border-t border-gray-300 flex">
        <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          type="text"
          class="flex-grow p-2 border border-gray-300 rounded"
          placeholder="Type a message..."
        />
        <button
          @click="sendMessage"
          class="ml-2 p-2 bg-blue-500 text-white rounded"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<style>
/* Add any custom styles here */
</style>
