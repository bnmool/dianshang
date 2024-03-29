<template>
  <div class="sub-category">
    <div class="container">
      <!-- 面包屑 -->
      <SubBread></SubBread>
      <!-- 筛选区 -->
      <SubFilter @filter-change="filterChange"></SubFilter>
      <!-- 结果区域 -->
      <div class="goods-list">
        <!-- 排序 -->
        <SubSort @sort-change="sortChange"></SubSort>
        <!-- 列表 -->
        <ul>
          <li v-for="goods in goodsList" :key="goods.id">
            <GoodsItem :goods="goods"></GoodsItem>
          </li>
        </ul>
        <!-- 无限加载组件 -->
        <DianshangInfiniteLoading
          :loading="loading"
          :finished="finished"
          @infinite="getData"
        ></DianshangInfiniteLoading>
      </div>
    </div>
  </div>
</template>
<script>
import SubBread from './components/sub-bread';
import SubFilter from './components/sub-filter';
import SubSort from './components/sub-sort';
import GoodsItem from './components/goods-item';
import { findSubCategoryGoods } from '@/api/category';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
export default {
  name: 'SubCategory',
  components: { SubBread, SubFilter, SubSort, GoodsItem },
  setup() {
    // 1. 基础布局
    // 2. 无限加载组件
    // 3. 动态加载数据且渲染
    // 4. 任何筛选条件变化需要更新列表
    const route = useRoute();
    // 加载中
    const loading = ref(false);
    // 是否加载完毕
    const finished = ref(false);
    // 商品列表数据
    const goodsList = ref([]);
    // 查询参数
    let reqParams = {
      page: 1,
      pageSize: 20,
    };
    // 获取数据
    const getData = () => {
      loading.value = true;
      // 设置二级分类的ID
      reqParams.categoryId = route.params.id;
      findSubCategoryGoods(reqParams).then(({ result }) => {
        // 获取数据成功
        if (result.items.length) {
          // 有数据就追加数据
          goodsList.value.push(...result.items);
          // 把page改成下一页页码
          reqParams.page++;
        } else {
          // 没有数据，代表加载完成
          finished.value = true;
        }
        loading.value = false;
      });
    };
    watch(
      () => route.params.id,
      (newVal) => {
        if (newVal && `/category/sub/${newVal}` === route.path) {
          finished.value = false;
          goodsList.value = []; // 导致列表空的，加载更多组件顶上来，进入可视区，区加载数据
          reqParams = {
            page: 1,
            pageSize: 20,
          };
        }
      }
    );
    // 1. 更改排序组件的筛选数据，重新请求
    const sortChange = (sortParams) => {
      finished.value = false;
      // 合并请求参数，保留之前参数
      reqParams = { ...reqParams, ...sortParams };
      reqParams.page = 1;
      goodsList.value = [];
    };
    // 2. 更改筛选组件的筛选数据，重新请求
    const filterChange = (filterParams) => {
      finished.value = false;
      // 合并请求参数，保留之前参数
      reqParams = { ...reqParams, ...filterParams };
      reqParams.page = 1;
      goodsList.value = [];
    };
    return { loading, finished, getData, goodsList, sortChange, filterChange };
  },
};
</script>
<style scoped lang="less">
.goods-list {
  width: 77.5rem;
  background: #fff;
  padding: 0 1.5625rem;
  margin-top: 1.5625rem;
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 0.3125rem;
    li {
      margin-right: 1.25rem;
      margin-bottom: 1.25rem;
      &:nth-child(5n) {
        margin-right: 0;
      }
    }
  }
}
</style>
