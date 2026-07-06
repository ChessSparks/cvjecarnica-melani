<template>
  <div class="min-h-screen">
    <NavbarComponent :isSectionVisible="isSectionVisible" />
    <div ref="section1">
      <HeroBanner
        :title="t('prijevoz_pokojnika')"
        :description="t('phone_numbers')"
        imageSrc="prijevoz-pogrebno.jpg"
        :imageAlt="t('prijevoz_pokojnika')"
      />
    </div>
    <div
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center my-[50px] lg:my-[100px]"
    >
      <div>
        <h2 class="text-4xl font-bold text-gray-800 mb-4">
          {{ t("prijevoz_pokojnika") }}
        </h2>
        <p class="text-lg text-gray-600 mb-6">
          {{ t("transport_service_intro") }}
        </p>
        <p class="text-lg text-gray-600 mb-6">
          {{ t("transport_service_details") }}
        </p>
        <p class="text-lg text-gray-600 mb-6">
          {{ t("transport_service_formalities") }}
        </p>
        <div class="flex space-x-4">
          <a
            href="/postupak-kod-smrti"
            class="px-6 py-3 bg-primary text-whitesmoke rounded-lg"
          >
            {{ t("death_case_procedure") }}
          </a>
          <a
            href="tel:+385 92 199 2352"
            class="px-6 py-3 border border-primary text-primary rounded-lg hover:bg-primary-100 flex items-center"
          >
            {{ t("call_now") }}
          </a>
        </div>
      </div>
      <div>
        <div
          class="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg"
        >
          <img
            src="../assets/images/kombi-za-prijevoz.jpg"
            alt="Vehicle used for transporting the deceased"
            class="w-full h-full object-cover"
          />
        </div>
        <p class="text-sm text-gray-500 mt-4">
          Naš moderno opremljen prijevoz osigurava dostojanstven transport
          pokojnika.
        </p>
      </div>
    </div>
    <div
      class="mb-[50px] mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 bg-white"
    >
      <ImageGallery :images="prijevoz" />
    </div>

    <FooterComponent />
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";
import FooterComponent from "../components/FooterComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import HeroBanner from "@/components/HeroBanner.vue";
import ImageGallery from "@/components/ImageGallery.vue";
import { buildGalleryImages } from "@/utils/gallery";

export default {
  name: "PonudaPogrebno",
  components: {
    FooterComponent,
    NavbarComponent,
    HeroBanner,
    ImageGallery,
  },
  props: {
    filter: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      isSectionVisible: true,
      prijevoz: [],
    };
  },
  setup() {
    const { t } = useI18n();
    return { t };
  },
  beforeUnmount() {
    document.body.style.overflow = "";
  },
  created() {
    this.prijevoz = buildGalleryImages(
      require.context(
        "@/assets/ponuda_pogrebno/prijevoz_pokojnika",
        false,
        /\.(png|jpe?g|svg)$/
      )
    );
  },
  mounted() {
    this.initIntersectionObserver();
  },
  methods: {
    initIntersectionObserver() {
      const section = this.$refs.section1;

      if (!section) {
        console.error("Section1 not found");
        return;
      }

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          this.isSectionVisible = entry.isIntersecting;
        });
      });

      observer.observe(section);
    },
  },
};
</script>
