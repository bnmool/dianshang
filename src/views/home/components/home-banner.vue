<template>
  <div class="home-banner">
    <DianshangCarousel auto-play :sliders="sliders"></DianshangCarousel>
  </div>
</template>
<script>
import { findBanner } from '@/api/home';
import { ref } from 'vue';
export default {
  name: 'HomeBanner',
  setup() {
    const sliders = ref([]);
    findBanner().then((data) => {
      sliders.value = data.result;
    });
    return { sliders };
  },
};
</script>
<style scoped lang="less">
.home-banner {
  width: 77.5rem;
  height: 32rem;
  position: relative;
  top: 0;
  z-index: 98;
  left: 3.8%;
  .dianshang-carousel {
    ::v-deep .carousel-btn.prev {
      left: 16.875rem;
    }
    ::v-deep .carousel-indicator {
      padding-left: 15.625rem;
    }
  }
}
</style>
