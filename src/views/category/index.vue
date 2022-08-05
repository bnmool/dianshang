<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <DianshangBread>
        <DianshangBreadItem to="/">首页</DianshangBreadItem>
        <Transition name="fade-right" mode="out-in">
          <DianshangBreadItem :key="topCategory.id">{{
            topCategory.name
          }}</DianshangBreadItem>
        </Transition>
      </DianshangBread>
      <!-- 轮播图 -->
      <DianshangCarousel :sliders="sliders"></DianshangCarousel>
      <!-- 所有二级分类 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="sub in topCategory.children" :key="sub.id">
            <RouterLink  :to="`/category/sub/${sub.id}`">
              <img :src="sub.picture" />
              <p>{{ sub.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <!-- 各个分类推荐商品 -->
      <div class="ref-goods" v-for="sub in subList" :key="sub.id">
        <div class="head">
          <h3>- {{ sub.name }} -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <DianshangMore :path="`/category/sub/${sub.id}`" />
        </div>
        <div class="body">
          <GoodsItem
            v-for="goods in sub.goods"
            :key="goods.id"
            :goods="goods"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { findBanner } from '@/api/home';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import { computed, ref, watch } from 'vue';
import { findTopCategory } from '@/api/category';
import GoodsItem from './components/goods-item';
export default {
  name: 'TopCategory',
  components: {
    GoodsItem,
  },
  setup() {
    // 轮播图
    const sliders = ref([]);
    findBanner().then((data) => {
      sliders.value = data.result;
    });
    // 面包屑+所有子分类 ====> vuex
    const store = useStore();
    const route = useRoute();
    const topCategory = computed(() => {
      // 当前顶级分类 === 根据路由上的ID去vuex中category模块的list中查找
      let cate = {};
      const item = store.state.category.list.find((item) => {
        return item.id === route.params.id;
      });
      // 数据赋值
      if (item) {
        cate = item;
      }
      return cate;
    });
    // 获取子类目下面商品
    const subList = ref([]);
    const getSubList = () => {
      findTopCategory(route.params.id).then((data) => {
        subList.value = data.result.children;
      });
    };
    watch(
      () => route.params.id,
      (newVal) => {
        // newVal && getSubList() 加上一个严谨判断，在顶级类名下才发请求
        if (newVal && `/category/${newVal}` === route.path) getSubList();
      },
      { immediate: true }
    );
    return { sliders, topCategory, subList };
  },
};
</script>
<style scoped lang="less">
.top-category {
  h3 {
    font-size: 1.75rem;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 6.25rem;
  }
  .sub-list {
    width: 77.5rem;
    margin-top: 1.25rem;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 2rem;
      flex-wrap: wrap;
      li {
        width: 10.5rem;
        height: 13rem;
        a {
          color: #333;
          text-align: center;
          display: block;
          font-size: 1rem;
          img {
            width: 6.25rem;
            height: 6.25rem;
          }
          p {
            line-height: 2.5rem;
          }
          &:hover {
            color: @blueColor;
          }
        }
      }
    }
  }
}
// 推荐商品
.ref-goods {
  background-color: #fff;
  margin-top: 1.25rem;
  position: relative;
  width: 77.5rem;
  .head {
    .dianshang-more {
      position: absolute;
      top: 1.25rem;
      right: 1.25rem;
    }
    .tag {
      text-align: center;
      color: #999;
      font-size: 20px;
      position: relative;
      top: -20px;
    }
  }
  .body {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 65px 30px;
  }
}
</style>
