<script>
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();
AOS.refresh();

if (process.client) {
  import("aos").then((AOS) => {
    AOS.init();
  });
}
</script>
<template>
  <!-- <NuxtRouteAnnouncer /> -->
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
