<template>
  <div class="home-new">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right><DianshangMore path="/"></DianshangMore>
      </template>
      <div style="position: relative" ref="target">
        <Transition name="fade">
          <ul v-if="goods.length" class="goods-list">
            <li v-for="item in goods" :key="item.id">
              <RouterLink :to="`/product/${item.id}`">
                <img :src="item.picture" alt="" />
                <p class="name">{{ item.name }}</p>
                <p class="price">&yen;{{ item.price }}</p>
              </RouterLink>
            </li>
          </ul>
          <HomeSkeleton bg="#e4e4e4" v-else></HomeSkeleton>
        </Transition>
      </div>
    </HomePanel>
  </div>
</template>
<script>
import HomePanel from './home-panel';
import { findNew } from '@/api/home';
import HomeSkeleton from './home-skeleton';
import { useLazyData } from '@/hooks';
export default {
  name: 'HomeNew',
  components: { HomePanel, HomeSkeleton },
  setup() {
    const { target, result } = useLazyData(findNew);
    return { target, goods: result };
  },
};
</script>
<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 25.375rem;
  li {
    width: 19.125rem;
    height: 25.375rem;
    background: #f0f9f4;
    margin: 0;
    .hoverShadow();
    img {
      width: 19.125rem;
      height: 19.125rem;
    }
    p {
      font-size: 1.375rem;
      padding: 0.75rem 1.875rem 0 1.875rem;
      text-align: center;
      color: @textColor;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
