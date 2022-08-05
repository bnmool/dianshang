<template>
  <div class="dianshang-carousel" @mouseenter="stop()" @mouseleave="start()">
    <ul class="carousel-body">
      <li
        class="carousel-item"
        v-for="(item, i) in sliders"
        :key="i"
        :class="{ fade: index === i }"
      >
        <RouterLink v-if="item.imgUrl" to="/">
          <img :src="item.imgUrl" />
        </RouterLink>
        <!-- 商品列表 item=[goods1,goods2,。。。]-->
        <div v-else class="slider">
          <RouterLink
            v-for="goods in item"
            :key="goods.id"
            :to="`/product/${goods.id}`"
          >
            <img :src="goods.picture" alt="" />
            <p class="name ellipsis">{{ goods.name }}</p>
            <p class="price">&yen;{{ goods.price }}</p>
          </RouterLink>
        </div>
      </li>
    </ul>
    <!-- 上一张 -->
    <a @click="toggle(-1)" href="javascript:;" class="carousel-btn prev"
      ><i class="iconfont icon-angle-left"></i
    ></a>
    <!-- 下一张 -->
    <a @click="toggle(1)" href="javascript:;" class="carousel-btn next"
      ><i class="iconfont icon-angle-right"></i
    ></a>
    <!-- 指示器 -->
    <div class="carousel-indicator">
      <!-- active 激活点 -->
      <span
        @click="index = i"
        v-for="(item, i) in sliders"
        :key="i"
        :class="{ active: index === i }"
      ></span>
    </div>
  </div>
</template>

<script>
import { ref, watch, onUnmounted } from 'vue';
export default {
  name: 'DianshangCarousel',
  props: {
    // 轮播图数据
    sliders: {
      type: Array,
      default: () => [],
    },
    // 是否自动轮播
    autoPlay: {
      type: Boolean,
      default: false,
    },
    // 间隔时长
    duration: {
      type: Number,
      default: 3000,
    },
  },
  setup(props) {
    // 控制显示图片的索引
    const index = ref(0);
    // 自动播放
    let timer = null;
    const autoPlayFunction = () => {
      clearInterval(timer);
      timer = setInterval(() => {
        index.value++;
        if (index.value >= props.sliders.length) {
          index.value = 0;
        }
      }, props.duration);
    };
    // 监听轮播，有数据开始自动播放，才调用自动播放函数
    watch(
      () => props.sliders,
      (newVal) => {
        if (newVal.length && props.autoPlay) {
          autoPlayFunction();
        }
      },
      { immediate: true }
    );
    // 鼠标进入停止，移出开启自动，前提条件：autoPlay为true
    const stop = () => {
      if (timer) {
        clearInterval(timer);
      }
    };
    const start = () => {
      if (props.sliders.length && props.autoPlay) {
        autoPlayFunction();
      }
    };
    // 3. 点击点点可以切换，上一张下一张
    const toggle = (step) => {
      // 将要改变的索引
      const newIndex = index.value + step;
      // 超出的情况，太大了
      if (newIndex > props.sliders.length - 1) {
        index.value = 0;
        return;
      }
      // 超出的情况，太小了
      if (newIndex < 0) {
        index.value = props.sliders.length - 1;
        return;
      }
      // 正常
      index.value = newIndex;
    };
    // 4. 组件卸载，清除定时器
    onUnmounted(() => {
      clearInterval(timer);
    });

    return { index, stop, start, toggle };
  },
};
</script>
<style scoped lang="less">
.dianshang-carousel {
  width: 77.5rem;
  height: 32rem;
  min-width: 18.75rem;
  min-height: 9.375rem;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      > a {
        height: 100%;
      }
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 1.25rem;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 0.75rem;
        height: 0.75rem;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 0.75rem;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 2.75rem;
      height: 2.75rem;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 14.25rem;
      z-index: 2;
      text-align: center;
      line-height: 2.75rem;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 1.25rem;
      }
      &.next {
        right: 1.25rem;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
