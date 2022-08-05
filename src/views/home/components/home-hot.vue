<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
    <template #right>
      <!-- <DianshangBread>
        <DianshangBreadItem to="/">首页</DianshangBreadItem>
        <DianshangBreadItem to="/category/1005000">电器</DianshangBreadItem>
        <DianshangBreadItem >空调</DianshangBreadItem>
      </DianshangBread> -->
      <DianshangMore path="/"></DianshangMore
    ></template>
    <div style="position: relative" ref="target">
      <Transition name="fade">
        <ul v-if="goods.length" class="goods-list">
          <li v-for="item in goods" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="" />
              <p class="name">{{ item.title }}</p>
              <p class="desc">{{ item.alt }}</p>
            </RouterLink>
          </li>
        </ul>
        <HomeSkeleton bg="#e4e4e4" v-else></HomeSkeleton>
      </Transition>
    </div>
  </HomePanel>
</template>

<script>
import HomePanel from './home-panel';
import { findHot } from '@/api/home';
import HomeSkeleton from './home-skeleton';
import { useLazyData } from '@/hooks';
export default {
  name: 'HomeHot',
  components: { HomePanel, HomeSkeleton },
  setup() {
    const { target, result } = useLazyData(findHot);
    return { goods: result, target };
  },
};
</script>

<style scoped lang='less'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 26.625rem;
  li {
    width: 19.125rem;
    height: 25.375rem;
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
    }
    .desc {
      color: #999;
      font-size: 1.125rem;
    }
  }
}
</style>
