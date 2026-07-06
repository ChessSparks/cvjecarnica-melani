<template>
  <div class="min-h-screen">
    <NavbarComponent :isSectionVisible="isSectionVisible" />
    <div ref="section1">
      <HeroBanner
        :title="t('pogrebna_ponuda')"
        :description="t('funeral_services_description')"
        imageSrc="banner-ponuda-pogrebno.jpg"
        imageAlt="Pogrebne usluge - ponuda"
      />
    </div>
    <div class="bg-gray-800 text-white pt-8">
      <div class="container mx-auto px-4">
        <h1 class="text-2xl font-normal mb-[50px]">{{ t("categories") }}</h1>
        <div class="flex flex-wrap justify-center mb-8 gap-3 group/buttons">
          <button
            class="relative p-px overflow-hidden text-sm font-medium transition-all duration-500 rounded-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 hover:shadow-lg hover:shadow-blue-100"
            @click="resetingAllFilters"
          >
            <div
              class="relative text-blue-900 px-6 py-2.5 bg-white rounded-[15px] transition-all duration-300 group-hover/buttons:opacity-90 hover:bg-opacity-0 hover:text-white"
              :class="{
                'text-white bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-100 text-white':
                  Object.values(filteri).every((v) => !v),
              }"
            >
              {{ t("all") }}
            </div>
          </button>

          <button
            v-for="(filter, key) in {
              lijesovi: t('coffins_offer'),
              prijevoz_pokojnika: t('prijevoz_pokojnika'),
            }"
            :key="key"
            class="text-blue-900 text-blue-900 relative p-px overflow-hidden text-sm font-medium transition-all duration-500 rounded-2xl bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 hover:shadow-lg hover:shadow-blue-100"
            @click="filteringTheProducts(key)"
          >
            <div
              class="relative px-6 py-2.5 bg-white rounded-[15px] transition-all duration-300 group-hover/buttons:opacity-90 hover:bg-opacity-0 hover:text-white"
              :class="{
                'text-white bg-gradient-to-r from-cyan-500 to-blue-500 shadow-lg shadow-cyan-100 text-white':
                  filteri[key],
              }"
            >
              {{ filter }}
            </div>
          </button>
        </div>

        <div class="bg-white rounded-xl">
          <div
            v-if="filteri.lijesovi"
            :class="{ 'animate-fade-in': filteri.lijesovi }"
          >
            <ProductListComponent />
          </div>
          <div
            v-if="filteri.prijevoz_pokojnika"
            :class="{ 'animate-fade-in': filteri.prijevoz_pokojnika }"
            class="mb-[50px] mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 bg-white"
          >
            <ImageGallery :images="prijevoz" />
          </div>
        </div>
      </div>
    </div>

    <FooterComponent />
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";
import ProductListComponent from "@/components/ProductListComponent.vue";
import FooterComponent from "../components/FooterComponent.vue";
import NavbarComponent from "@/components/NavbarComponent.vue";
import HeroBanner from "@/components/HeroBanner.vue";
import ImageGallery from "@/components/ImageGallery.vue";
import { buildGalleryImages } from "@/utils/gallery";

export default {
  name: "PonudaPogrebno",
  components: {
    FooterComponent,
    ProductListComponent,
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

      formData: {
        name: "",
        email: "",
        phone: "",
        message: "",
      },
      lijesoviPonuda: [],
      urnePonuda: [],
      prijevoz: [],
      filteri: {
        lijesovi: true,
        pogrebna_oprema: true,
        prijevoz_pokojnika: true,
        kremiranje: true,
      },
    };
  },
  setup() {
    const { t } = useI18n();
    return { t };
  },
  mounted() {
    this.initIntersectionObserver();
    if (this.filter) {
      this.applyFilter(this.filter);
    }
  },
  created() {
    this.prijevoz = buildGalleryImages(
      require.context(
        "@/assets/ponuda_pogrebno/prijevoz_pokojnika",
        false,
        /\.(png|jpe?g|svg)$/
      )
    );

    const urnePonuda = require.context(
      "@/assets/ponuda_pogrebno/urne",
      false,
      /\.(png|jpe?g|svg)$/
    );
    this.urnePonuda = urnePonuda.keys().map((filename) => ({
      filename: filename.slice(2),
      title: filename.slice(2, -4),
      alt: filename.slice(2, -4),
    }));

    const rezanoCvijece = require.context(
      "@/assets/ponuda_cvijeca/rezano_cvijece",
      false,
      /\.(png|jpe?g|svg)$/
    );
    this.rezanoCvijece = rezanoCvijece.keys().map((filename) => ({
      filename: filename.slice(2),
      title: filename.slice(2, -4),
      alt: filename.slice(2, -4),
    }));

    const bozicCvijece = require.context(
      "@/assets/ponuda_cvijeca/bozic",
      false,
      /\.(png|jpe?g|svg)$/
    );
    this.bozicCvijece = bozicCvijece.keys().map((filename) => ({
      filename: filename.slice(2),
      title: filename.slice(2, -4),
      alt: filename.slice(2, -4),
    }));
  },
  beforeUnmount() {
    document.body.style.overflow = "";
  },
  watch: {
    "$route.query.filter": {
      handler(newFilter) {
        if (newFilter) {
          this.applyFilter(newFilter);
        } else {
          this.resetingAllFilters();
        }
      },
      immediate: true,
    },
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

    applyFilter(filterArgument) {
      Object.entries(this.filteri).forEach(([key]) => {
        this.filteri[key] = key === filterArgument;
      });
    },

    resetingAllFilters() {
      Object.entries(this.filteri).forEach(([key]) => {
        this.filteri[key] = true;
      });
    },

    filteringTheProducts(filterArgument) {
      Object.entries(this.filteri).forEach(([key]) => {
        this.filteri[key] = key === filterArgument;
      });
    },

    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
      document.body.style.overflow = this.isMobileMenuOpen ? "hidden" : "auto";
    },

    toggleSubmenuPonuda() {
      this.submenuPonuda = !this.submenuPonuda;
    },

    redirectToContact() {
      this.$router.push("/contact-melani");
    },
  },
};
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(100px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fadeIn 2s ease-out;
}
</style>
