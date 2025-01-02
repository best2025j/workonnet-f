<template>
    <main class="pt-16  pl-16 bg-white pb-20 overflow-x-hidden sm:pl-3 md:pl-10"">
        <section class="flex flex-col items-start justify-start">
            <h2 class="font-text font-semibold text-[24px] pb-2">Plan & Pricing</h2>
            <p class="font-light text-sm pb-2">Let’s find the top job that we have.</p>
            <p class="font-light text-sm pb-2">Simple Pricing No Hidden Fees. Advanced Features for you.</p>

            <div class="grid grid-cols-3 gap-2 place-items-center mt-14 md:mb-32 md:gap-5 md:grid-cols-2 lg:grid-cols-3  sm:grid-cols-1">
                <div class="flex flex-col items-start justify-start px-3 sm:-ml-10 sm:mb-5">
                    <div class="flex items-center justify-between mb-4 w-[25rem] sm:w-[20rem] ">
                        <img src="/assets/images/Logo2.png" alt="" loading="lazy">
                        <button class="bg-[#D1EFFF] rounded-[10px] text-[#006EFF] font-light tetx-xs -mt-10 px-4 py-2 ">Custom</button>
                    </div>
                    <h2 class="font-semibold ">Free Plan</h2>
                    <p class="font-light mt-1 text-xs mb-5">These are the benefits under free plan</p>
                    <h2 class="font-semibold text-[24px] mb-5">₦0.00<span class="font-light text-sm">/month</span></h2>
                    <button 
                    @click="buttonActive()"
                    class="bg-[#FFFBEC] text-primary-1 border-[#FE8900]  border-2 border-solid rounded-8 px-40 sm:px-[8rem] md:px-32 py-3 text-xs font-bold transition duration-300">
  Get Started
                </button>
                 <div class="flex items-center justify-center gap-4 mb-3 mt-5">
                        <img src="/assets/images/Vector.png" alt="" class="w-7">
                        <p class="text-xs font-light">1 Job Posting</p>
                    </div>
                    <div class="flex items-center justify-center gap-4 mb-3">
                        <img src="/assets/images/Vector.png" alt="" class="w-7">
                        <p class="text-xs font-light">5-star candidates</p>
                    </div>
                    <div class="flex items-center justify-center gap-4 mb-3">
                        <img src="/assets/images/Vector.png" alt="" class="w-7">
                        <p class="text-xs font-light">Company's page branding</p>
                    </div>
                   
                   
                    
                </div>

                <div class="flex flex-col items-start justify-start -mt-[0.2rem] pl-3 sm:-ml-5 ">
                       <img src="/assets/images/Logo2.png" alt="" class="mb-5" loading="lazy">
                        
                    <h2 class="font-semibold ">Basic Plan</h2>
                    <p class="font-light mt-1 text-xs mb-5">Best for small teams(Below 50 staffs)</p>
                    <h2 class="font-semibold text-[24px] mb-5">₦50,000<span class="font-light text-sm">/month</span></h2>
                    <button 
                    @click="buttonActive()"
                    class="bg-[#FFFBEC] text-primary-1 border-[#FE8900] border-2 border-solid rounded-8 px-40 sm:px-[8rem] md:px-32 py-3 text-xs font-bold transition duration-300">
Get Started
                </button>
                    <div class="flex items-center justify-center gap-4 mb-3 mt-5">
                        <img src="/assets/images/Vector.png" alt="" class="w-7">
                        <p class="text-xs font-light">2 Jobs Postings</p>
                    </div>
                    <div class="flex items-center justify-center gap-4 mb-3">
                        <img src="/assets/images/Vector.png" alt="" class="w-7">
                        <p class="text-xs font-light">Unlimited Star Candidates</p>
                    </div>
                    <div class="flex items-center justify-center gap-4 mb-3">
                        <img src="/assets/images/Vector.png" alt="" class="w-7">
                        <p class="text-xs font-light">Company's page branding</p>
                    </div>
                </div>

                <div class="flex flex-col items-start justify-start mx-16 md:mx-5 sm:mx-10 px-3 mt-[4.5rem]  ">
                   
                    <div class="flex items-center justify-between mb-4 w-[25rem] sm:w-[21.5rem] ">
                        <img src="/assets/images/Logo2.png" alt="" loading="lazy">
                        <button class="bg-[#D1EFFF] rounded-[10px] text-[#006EFF] font-light tetx-xs -mt-10 px-4 py-2 flex items-center justify-center gap-3">
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.3203 7.93593L13.7969 11.0109L14.8524 15.5891C14.9082 15.8284 14.8923 16.0789 14.8065 16.3092C14.7208 16.5395 14.5691 16.7395 14.3703 16.884C14.1716 17.0286 13.9346 17.1113 13.6891 17.122C13.4436 17.1326 13.2004 17.0706 12.9899 16.9437L8.99689 14.5219L5.01252 16.9437C4.80202 17.0706 4.55881 17.1326 4.31328 17.122C4.06775 17.1113 3.83079 17.0286 3.63204 16.884C3.4333 16.7395 3.28157 16.5395 3.19584 16.3092C3.1101 16.0789 3.09416 15.8284 3.15002 15.5891L4.20392 11.0156L0.679705 7.93593C0.493305 7.77517 0.358519 7.56295 0.292249 7.32589C0.225978 7.08883 0.231173 6.83748 0.307183 6.60336C0.383193 6.36924 0.526633 6.16278 0.719516 6.00985C0.912399 5.85693 1.14614 5.76436 1.39142 5.74375L6.03674 5.3414L7.85002 1.0164C7.94471 0.789462 8.10443 0.595612 8.30907 0.45926C8.51371 0.322909 8.75411 0.250153 9.00002 0.250153C9.24592 0.250153 9.48633 0.322909 9.69097 0.45926C9.8956 0.595612 10.0553 0.789462 10.15 1.0164L11.9688 5.3414L16.6125 5.74375C16.8578 5.76436 17.0915 5.85693 17.2844 6.00985C17.4773 6.16278 17.6207 6.36924 17.6968 6.60336C17.7728 6.83748 17.778 7.08883 17.7117 7.32589C17.6454 7.56295 17.5106 7.77517 17.3242 7.93593H17.3203Z" fill="#DED700"/>
</svg>
    
                            Recommeded
                        </button>
                    </div>
                    <h2 class="font-semibold ">Silver Plan</h2>
                    <p class="font-light mt-1 text-xs mb-5">Best for medium-sized teams (200+ staff)</p>
                    <h2 class="font-semibold text-[24px] mb-5">₦70,000.00<span class="font-light text-sm">/month</span></h2>
                    <button 
                    @click="buttonActive()"
                    class=" bg-[#FFFBEC] text-primary-1 border-[#FE8900] border-2 border-solid rounded-8 px-40 sm:px-[8rem] md:px-32 py-3 text-xs font-bold transition duration-300">
  Get Started
                </button>
                    <div class="flex items-center justify-center gap-4 mb-3 mt-5">
                        <img src="/assets/images/Vector.png" alt="" class="w-7">
                        <p class="text-xs font-light">5 Jobs Posting</p>
                    </div>
                    <div class="flex items-center justify-center gap-4 mb-3">
                        <img src="/assets/images/Vector.png" alt="" class="w-7">
                        <p class="text-xs font-light">Unlimited Star Candidates</p>
                    </div>
                    <div class="flex items-center justify-center gap-4 mb-3">
                        <img src="/assets/images/Vector.png" alt="" class="w-7">
                        <p class="text-xs font-light">Company's Page Branding</p>
                    </div>
                    <div class="flex items-center justify-center gap-4 mb-3">
                        <img src="/assets/images/Vector.png" alt="" class="w-7">
                        <p class="text-xs font-light">Employer Data Analytics</p>
                    </div>
                    <div class="flex items-center justify-center gap-4 mb-3">
                        <img src="/assets/images/Vector.png" alt="" class="w-7">
                        <p class="text-xs font-light">Assessment & Screening</p>
                    </div>
                   
                   
                    
                </div>

                <div class="flex flex-col items-start justify-start -ml-2 md:ml-5  mx-16 md:mx-2 sm:-ml-0 sm:mx-5 px-3 mt-12 ">
                   
                       <img src="/assets/images/Logo2.png" alt="" class="mb-5" loading="lazy">
                   <h2 class="font-semibold ">Enterprise Plan</h2>
                   <p class="font-light mt-1 text-xs mb-5">Best for large sized teams (500+ staffs)</p>
                   <h2 class="font-semibold text-[24px] mb-5">₦100,000.00<span class="font-light text-sm">/month</span></h2>
                   <button 
                    @click="buttonActive()"
                    class="bg-[#FFFBEC] text-primary-1 border-[#FE8900] border-2 border-solid rounded-8 px-40 sm:px-[8rem] md:px-32 py-3 text-xs font-bold transition duration-300">
  Get Started
                </button>
                 <div class="flex items-center justify-center gap-4 mb-3 mt-5">
                       <img src="/assets/images/Vector.png" alt="" class="w-7">
                       <p class="text-xs font-light">10 Jobs Posting</p>
                   </div>
                   <div class="flex items-center justify-center gap-4 mb-3">
                       <img src="/assets/images/Vector.png" alt="" class="w-7">
                       <p class="text-xs font-light">Unlimited Star Candidates</p>
                   </div>
                   <div class="flex items-center justify-center gap-4 mb-3">
                       <img src="/assets/images/Vector.png" alt="" class="w-7">
                       <p class="text-xs font-light">Company's Page Branding</p>
                   </div>
                   <div class="flex items-center justify-center gap-4 mb-3">
                       <img src="/assets/images/Vector.png" alt="" class="w-7">
                       <p class="text-xs font-light">Employer Data Analytics</p>
                   </div>
                   <div class="flex items-center justify-center gap-4 mb-3">
                       <img src="/assets/images/Vector.png" alt="" class="w-7">
                       <p class="text-xs font-light">Assessment & Screening</p>
                   </div>
                  
                  
                   
               </div>

               

            </div>
      
        </section>
    </main>
    <div>
      <LandingPageFooter />
    </div>
</template>

<script setup>
import { ref } from 'vue';
import {  useRouter } from 'vue-router';

//enables user to know which plan they paid for
//const isActive = ref(null);
const route = useRouter()
function buttonActive(){
    route.push('/auth/signup/recruiter')

const redirectUrl = '/pricing/recruiter'; 

    sessionStorage.setItem('redirectUrl', redirectUrl);
   // isActive.value = isActive.value === buttonId ? null : buttonId;

}


</script>

<style  scoped>
body{
    background: white;
}
</style>