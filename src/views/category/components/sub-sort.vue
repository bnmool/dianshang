<template>
  <div class="sub-sort">
    <div class="sort">
      <a
        :class="{ active: sortParams.sortField === null }"
        @click="changeSort(null)"
        href="javascript:;"
        >默认排序</a
      >
      <a
        :class="{ active: sortParams.sortField === 'publishTime' }"
        @click="changeSort('publishTime')"
        href="javascript:;"
        >最新商品</a
      >
      <a
        :class="{ active: sortParams.sortField === 'orderNum' }"
        @click="changeSort('orderNum')"
        href="javascript:;"
        >最高人气</a
      >
      <a
        :class="{ active: sortParams.sortField === 'evaluateNum' }"
        @click="changeSort('evaluateNum')"
        href="javascript:;"
        >评论最多</a
      >
      <a @click="changeSort('price')" href="javascript:;">
        价格排序
        <i
          class="arrow up"
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod === 'asc',
          }"
        />
        <i
          class="arrow down"
          :class="{
            active:
              sortParams.sortField === 'price' &&
              sortParams.sortMethod === 'desc',
          }"
        />
      </a>
    </div>
    <div class="check">
      <DianshangCheckbox @change="changeCheck" v-model="sortParams.inventory"
        >仅显示有货商品</DianshangCheckbox
      >
      <DianshangCheckbox @change="changeCheck" v-model="sortParams.onlyDiscount"
        >仅显示特惠商品</DianshangCheckbox
      >
    </div>
  </div>
</template>
<script>
import { reactive } from 'vue';
export default {
  name: 'SubSort',
  setup(props, { emit }) {
    // 实现交互（实现交换的数据和后台保持一致）
    // 1. 明确交互数据
    const sortParams = reactive({
      inventory: false,
      onlyDiscount: false,
      sortField: null, // publishTime,orderNum,price,evaluateNum
      sortMethod: null, // asc为正序，desc为倒序，默认为desc
    });
    // 2. 提供模板使用
    // 3. 需要绑定按钮的点击事件修改排序字段和排序方式
    const changeSort = (sortField) => {
      if (sortField === 'price') {
        sortParams.sortField = sortField;
        if (sortParams.sortMethod === null) {
          sortParams.sortMethod = 'desc';
        } else {
          sortParams.sortMethod =
            sortParams.sortMethod === 'desc' ? 'asc' : 'desc';
        }
      } else {
        // 如果已经选项阻止运行
        if (sortParams.sortField === sortField) {
          return;
        }
        sortParams.sortField = sortField;
        sortParams.sortMethod = null;
      }
      // 触发 sort-change 事件
      emit('sort-change', sortParams);
    };
    const changeCheck = () => {
      // 触发 sort-change 事件
      emit('sort-change', sortParams);
    };
    return { sortParams, changeSort, changeCheck };
  },
};
</script>
<style scoped lang='less'>
.sub-sort {
  height: 5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .sort {
    display: flex;
    margin: 0;
    a {
      height: 1.875rem;
      line-height: 1.75rem;
      border: 0.0625rem solid #e4e4e4;
      padding: 0 1.25rem;
      margin-right: 1.25rem;
      color: #999;
      border-radius: 0.125rem;
      position: relative;
      transition: all 0.3s;
      &.active {
        background: @blueColor;
        border-color: @blueColor;
        color: #fff;
      }
      .arrow {
        position: absolute;
        border: 5px solid transparent;
        right: 8px;
        &.up {
          top: 0.1875rem;
          border-bottom-color: #bbb;
          &.active {
            border-bottom-color: @blueColor;
          }
        }
        &.down {
          top: 0.9375rem;
          border-top-color: #bbb;
          &.active {
            border-top-color: @blueColor;
          }
        }
      }
    }
  }
  .check {
    margin-left: 14rem;
    .dianshang-checkbox {
      margin-left: 1.25rem;
      color: #999;
    }
  }
}
</style>
