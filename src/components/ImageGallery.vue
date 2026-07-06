<template>
  <div>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
    >
      <button
        v-for="(image, index) in images"
        :key="image.src"
        type="button"
        @click="open(index)"
        class="group relative aspect-[4/3] w-full overflow-hidden rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      >
        <img
          :src="image.src"
          :alt="image.alt || image.title || ''"
          loading="lazy"
          class="h-full w-full object-cover"
        />
      </button>
    </div>

    <transition name="lightbox-fade">
      <div
        v-if="isOpen"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        role="dialog"
        aria-modal="true"
        @click.self="close"
      >
        <button
          v-if="images.length > 1"
          type="button"
          class="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center text-4xl font-light text-white/80 transition-colors hover:text-white"
          aria-label="Prethodna slika"
          @click.stop="prev"
        >
          &#8249;
        </button>

        <div class="relative max-w-full max-h-full">
          <transition name="lightbox-slide" mode="out-in">
            <img
              :key="currentImage && currentImage.src"
              :src="currentImage && currentImage.src"
              :alt="
                (currentImage && (currentImage.alt || currentImage.title)) ||
                ''
              "
              class="rounded object-contain"
              style="max-width: calc(100vw - 4rem); max-height: calc(100vh - 4rem)"
            />
          </transition>
          <button
            type="button"
            class="absolute -top-3 -right-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-xl leading-none text-white transition-colors hover:bg-black/80 sm:-top-4 sm:-right-4"
            aria-label="Zatvori"
            @click="close"
          >
            &times;
          </button>
        </div>

        <button
          v-if="images.length > 1"
          type="button"
          class="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center text-4xl font-light text-white/80 transition-colors hover:text-white"
          aria-label="Sljedeća slika"
          @click.stop="next"
        >
          &#8250;
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "ImageGallery",
  props: {
    images: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      lightboxIndex: null,
    };
  },
  computed: {
    isOpen() {
      return this.lightboxIndex !== null;
    },
    currentImage() {
      return this.lightboxIndex !== null
        ? this.images[this.lightboxIndex]
        : null;
    },
  },
  mounted() {
    window.addEventListener("keydown", this.onKeydown);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.onKeydown);
    if (this.isOpen) {
      document.body.style.overflow = "";
    }
  },
  methods: {
    open(index) {
      this.lightboxIndex = index;
      document.body.style.overflow = "hidden";
    },
    close() {
      this.lightboxIndex = null;
      document.body.style.overflow = "";
    },
    next() {
      if (!this.isOpen) return;
      this.lightboxIndex = (this.lightboxIndex + 1) % this.images.length;
    },
    prev() {
      if (!this.isOpen) return;
      this.lightboxIndex =
        (this.lightboxIndex - 1 + this.images.length) % this.images.length;
    },
    onKeydown(event) {
      if (!this.isOpen) return;
      if (event.key === "Escape") this.close();
      if (event.key === "ArrowRight") this.next();
      if (event.key === "ArrowLeft") this.prev();
    },
  },
};
</script>

<style scoped>
.lightbox-fade-enter-active,
.lightbox-fade-leave-active {
  transition: opacity 0.25s ease;
}
.lightbox-fade-enter-from,
.lightbox-fade-leave-to {
  opacity: 0;
}

.lightbox-slide-enter-active,
.lightbox-slide-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.lightbox-slide-enter-from,
.lightbox-slide-leave-to {
  opacity: 0;
  transform: scale(0.97);
}
</style>
