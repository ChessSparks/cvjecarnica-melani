<template>
  <LoadingScreen :visible="isLoading" />
  <router-view v-if="!isLoading" />
</template>

<script>
import LoadingScreen from "./components/LoadingScreen.vue";

const FIRST_VISIT_KEY = "melani_has_visited";

export default {
  name: "App",
  components: {
    LoadingScreen,
  },
  data() {
    return {
      isLoading: !localStorage.getItem(FIRST_VISIT_KEY),
    };
  },
  mounted() {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (this.isLoading) {
      setTimeout(() => {
        this.isLoading = false;
        localStorage.setItem(FIRST_VISIT_KEY, "true");
      }, 1800);
    }
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: hidden;
}

nav {
  padding: 8px 16px;
}
</style>
