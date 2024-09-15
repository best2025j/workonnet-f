<script>
import Footer from "~/components/landing-page/layout/Footer.vue";
import Navbar from "~/components/landing-page/layout/Navbar.vue";

export default {
  components: {
    Navbar,
    Footer,
  },
};
</script>

<template>
  <div>
    <Navbar />
    <slot />
    <Footer />
  </div>
</template>
