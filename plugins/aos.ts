// plugins/aos.client.js
import AOS from "aos";
import "aos/dist/aos.css";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:mounted", () => {
    AOS.init({
      duration: 1000, // Customize AOS options as needed
      easing: "ease-in-out",
    });
  });
});
