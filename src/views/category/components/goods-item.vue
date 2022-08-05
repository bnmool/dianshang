<template>
  <RouterLink :to="`/product/${goods.id}`" class="goods-item">
    <img v-lazy="goods.picture" alt="" />
    <p class="name ellipsis">{{ goods.name }}</p>
    <p class="desc ellipsis">{{ goods.tag }}</p>
    <p class="price">&yen;{{ goods.price }}</p>
  </RouterLink>
</template>

<script>
export default {
  name: 'GoodsItem',
  props: {
    goods: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style scoped lang='less'>
.goods-item {
  display: block;
  width: 13.75rem;
  padding: 1.25rem 1.875rem;
  text-align: center;
  .hoverShadow();
  img {
    width: 10rem;
    height: 10rem;
  }
  p {
    color: #333;
    padding-top: .625rem;
  }
  .name {
    font-size: 1rem;
  }
  .desc {
    color: #999;
    height: 1.8125rem;
  }
  .price {
    color: @priceColor;
    font-size: 1.25rem;
  }
}
</style>
