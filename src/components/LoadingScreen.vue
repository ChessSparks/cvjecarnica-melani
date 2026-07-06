<template>
  <transition name="fade">
    <div
      v-if="visible"
      class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-cyan-500/60 backdrop-blur-md"
    >
      <img
        src="../assets/images/logo_melani.png"
        alt="Melani"
        class="h-24 w-24 mb-6 animate-pulse"
      />
      <div class="w-48 h-[3px] bg-white/30 rounded-full overflow-hidden">
        <div class="h-full w-full bg-white animate-loadingBar"></div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "LoadingScreen",
  props: {
    visible: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes loadingBar {
  0% {
    transform: translateX(-100%);
  }
  50% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}
.animate-loadingBar {
  animation: loadingBar 1.2s ease-in-out infinite;
}
</style>
