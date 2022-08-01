<template>
  <div class="home-skeleton">
    <div class="item" v-for="i in 4" :key="i" :style="{ backgroundColor: bg }">
      <DianshangSkeleton
        bg="#e4e4e4"
        width="19.125rem"
        height="19.125rem"
        animated
      />
      <DianshangSkeleton bg="#e4e4e4" width="10rem" height="1.5rem" animated />
      <DianshangSkeleton bg="#e4e4e4" width="7.5rem" height="1.5rem" animated />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeSkeleton',
  props: {
    bg: {
      type: String,
      default: '#fff',
    },
  },
};
</script>

<style scoped lang='less'>
.home-skeleton {
  height: 25.375rem;
  display: flex;
  justify-content: space-between;
  .item {
    margin: 0;
    width: 19.125rem;
    .dianshang-skeleton ~ .dianshang-skeleton {
      display: block;
      margin: 1rem auto 0;
    }
  }
}
</style>
