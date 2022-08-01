<template>
  <div class="goods-item">
    <RouterLink :to="`/product/${goods.id}`" class="image">
      <img v-lazy="goods.picture" />
    </RouterLink>
    <p class="name ellipsis-2">{{ goods.name }}</p>
    <p class="desc ellipsis">{{ goods.desc }}</p>
    <p class="price">&yen;{{ goods.price }}</p>
    <div class="extra">
      <RouterLink to="/">
        <span>找相似</span>
        <span>发现现多宝贝 &gt;</span>
      </RouterLink>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeGoods',
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
  width: 15rem;
  height: 18.75rem;
  padding: .625rem 1.875rem;
  position: relative;
  overflow: hidden;
  border: .0625rem solid transparent;
  transition: all 0.5s;
  .image {
    display: block;
    width: 10rem;
    height: 10rem;
    margin: 0 auto;
    img {
      width: 100%;
      height: 100%;
    }
  }
  p {
    margin-top: .375rem;
    font-size: 1rem;
    &.name {
      height: 2.75rem;
    }
    &.desc {
      color: #666;
      height: 1.375rem;
    }
    &.price {
      margin-top: .625rem;
      font-size: 1.25rem;
      color: @priceColor;
    }
  }
  .extra {
    position: absolute;
    left: 0;
    bottom: 0;
    height: 86px;
    width: 100%;
    background: @blueColor;
    text-align: center;
    transform: translate3d(0, 100%, 0);
    transition: all 0.5s;
    span {
      display: block;
      color: #fff;
      width: 7.5rem;
      margin: 0 auto;
      line-height: 1.875rem;
      &:first-child {
        font-size: 1.125rem;
        border-bottom: .0625rem solid #fff;
        line-height: 2.5rem;
        margin-top: .3125rem;
      }
    }
  }
  &:hover {
    border-color: @blueColor;
    .extra {
      transform: none;
    }
  }
}
</style>
