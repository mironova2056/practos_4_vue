<template>
  <div class="wrapper">
    <div class="cont">
      <the-header/>
      <main class="main">
        <router-view />
      </main>
    </div>
  </div>
</template>
<script>
import TheHeader from "@/components/TheHeader.vue";
export default {
  name: "App",
  components: {
    TheHeader,
  },
};
</script>