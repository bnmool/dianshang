<template>
  <div class="dianshang-infinite-loading" ref="target">
    <div class="loading" v-if="loading">
      <span class="img"></span>
      <span class="text">正在加载...</span>
    </div>
    <div class="none" v-if="finished">
      <span class="img"></span>
      <span class="text">亲，没有更多了</span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
// 用于无限家在数据/信息流
import { useIntersectionObserver } from '@vueuse/core';
export default {
  name: 'DianshangInfiniteLoading',
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    finished: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const target = ref(null);
    useIntersectionObserver(
      target,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          console.log('进入可视区了');
          if (!props.loading && !props.finished) {
            emit('infinite');
          }
        }
      },
      {
        threshold: 0,
      }
    );
    return { target };
  },
};
</script>

<style scoped lang='less'>
.dianshang-infinite-loading {
  .loading {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 12.5rem;
    .img {
      width: 3.125rem;
      height: 3.125rem;
      background: url(../../assets/images/load.gif) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 1rem;
    }
  }
  .none {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 12.5rem;
    .img {
      width: 12.5rem;
      height: 8.375rem;
      background: url(../../assets/images/none.png) no-repeat center / contain;
    }
    .text {
      color: #999;
      font-size: 1rem;
    }
  }
}
</style>
