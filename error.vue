<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router'

const props = defineProps({
    error: <any>Object
})

const isLoading = ref(true);
const is404Error = ref(false)

// const error = useError();

// const handleError = () => {
//    clearError({
//     redirect: '/',
//   });
// };

if(props.error.statusCode !== 404){
    // log error :TODO::
    setTimeout(() => {
        useRouter().replace(`/error-500?message=${props.error.message}`)
    }, 100)
}

setTimeout(() => {
    is404Error.value = true;
isLoading.value = false;
}, 200)
</script>
<template>
    <div v-if="!isLoading" class="bg-black-100 w-screen h-screen">
        <div class="flex flex-col md:flex-row items-center px-6 md:pl-36 pt-6 md:pt-24 md:pr-0">
            <!--  -->
            <div class="space-y-6">
               

                <div class="space-y-14">
                    <h2 class="text-cyan text-6xl md:text-[5rem] text-orbitron-font font-[900]">404 Page Not Found</h2>
                    <p class="text-grey-50 text-lg md:text-xl font-normal">Sorry, The Page you are looking for doesn’t exist
                        or <br class="hidden md:block"> it
                        has
                        been moved.
                    </p>
                    <p class="text-grey-50 text-lg font-normal italic">
                        <b class="text-cyan">Requested resource</b> : {{ error.url }}
                    </p>
                </div>

                <div>
                    <button :btn-text="'Go to Home Page'" class="!px-22">
                       
                    </button>
                </div>
            </div>
            <!--  -->
        </div>

    </div>
</template>