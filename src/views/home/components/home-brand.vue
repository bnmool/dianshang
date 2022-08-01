<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <template v-slot:right>
      <a
        @click="toggle(-1)"
        :class="{ disabled: index === 0 }"
        href="javascript:;"
        class="iconfont icon-angle-left prev"
      ></a>
      <a
        @click="toggle(1)"
        :class="{ disabled: index === 1 }"
        href="javascript:;"
        class="iconfont icon-angle-right next"
      ></a>
    </template>
    <div class="box" ref="target">
      <Transition name="fade">
        <ul
          v-if="brands.length"
          class="list"
          :style="{ transform: `translateX(${-index * 920}px)` }"
        >
          <li v-for="item in brands" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="" />
            </RouterLink>
          </li>
        </ul>
        <div v-else class="skeleton">
          <HomeSkeleton
            class="item"
            v-for="i in 7"
            :key="i"
            animated
            bg="#e4e4e4"
          ></HomeSkeleton>
        </div>
      </Transition>
    </div>
  </HomePanel>
</template>

<script>
import { ref } from 'vue';
import HomePanel from './home-panel';
import { findBrand } from '@/api/home';
import HomeSkeleton from './home-skeleton';
import { useLazyData } from '@/hooks';
export default {
  name: 'HomeBrand',
  components: { HomePanel, HomeSkeleton },
  setup() {
    // 获取数据 useLazyData 需要的是 API 函数，如果遇到要传参的情况，自己写函数再函数中调用 API
    const { target, result } = useLazyData(() => findBrand(10));
    const index = ref(0);
    const toggle = (step) => {
      const newIndex = index.value + step;
      if (newIndex < 0 || newIndex > 1) {
        return;
      }
      index.value = newIndex;
    };
    return { brands: result, target, toggle, index };
  },
};
</script>

<style scoped lang='less'>
.skeleton {
  overflow: hidden;
  width: 100%;
  display: flex;
  .item {
    width: 15rem;
    height: 19.0625rem;
    margin-right: 0.625rem;
  }
}
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 2rem;
  height: 2rem;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 0.3125rem;
  background: @blueColor;
  &::before {
    font-size: 0.75rem;
    position: relative;
    top: 0.125rem;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 21.5625rem;
  overflow: hidden;
  padding-bottom: 2.5rem;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s;
    justify-content: space-between;
    li {
      .hoverShadow();
      margin-right: 0.625rem;
      width: 15rem;
      img {
        width: 15rem;
        height: 19.0625rem;
      }
    }
  }
}
</style>
