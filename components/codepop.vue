<script setup>
import { defineProps, defineEmits } from "vue";
import { useRouter } from "vue-router";
import succesicon from "@/assets/images/Vector.png";

const props = defineProps({
  isVisible: Boolean,
});
const emit = defineEmits(["update:isVisible"]);
const router = useRouter();
const closePopup = () => {
  emit("update:isVisible", false);
};
const goToDashboard = () => {
  router.push("/");
};
</script>
<template>
  <section>
    <div
      v-if="isVisible"
      class="fixed top-0 left-0 w-full h-full flex items-center justify-center backdrop-brightness-75 backdrop-blur-sm"
      @click="closePopup"
    >
      <div
        class="bg-white rounded-lg relative max-w-[400px] w-full text-center"
        @click.stop
      >
        <button
          class="absolute top-3 right-5 text-4xl font-thin text-[#57575B] bg-transparent border-none cursor-pointer"
          @click="closePopup"
        >
          &times;
        </button>
        <h2 class="mt-5 font-black text-[16px] mb-10">Success</h2>
        <img
          :src="succesicon"
          alt="Success Icon"
          class="relative mb-10 mt-10 w-24 mx-auto"
        />
        <p class="font-thin text-sm">Code activated successfully.</p>
        <button
          class="text-white bg-[#FE8900] w-32 h-8 text-[12px] mb-5 rounded-md cursor-pointer mt-5"
          @click="goToDashboard"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
