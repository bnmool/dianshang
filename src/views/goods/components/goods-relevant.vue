<template>
  <div class="goods-relevant">
    <div class="header">
      <i class="icon" />
      <span class="title">{{ goodsId ? "同类商品推荐" : "猜你喜欢" }}</span>
    </div>
    <!-- 此处使用改造后的dianshang-carousel.vue -->
    <DianshangCarousel :sliders="sliders"></DianshangCarousel>
  </div>
</template>

<script>
import { ref } from 'vue';
import { findRelevantGoods } from '@/api/product';
export default {
  // 同类推荐，猜你喜欢
  name: 'GoodsRelevant',
  props: {
    goodsId: {
      type: String,
      default: '',
    },
  },
  setup(props) {
    // 最终需要的数据是 sliders 提供给轮播图使用
    // 数据结构：sliders = [[4个],[4个],[4个],[4个]]
    const sliders = ref([]);
    findRelevantGoods({ id: props.goodsId }).then((data) => {
      // data.result 商品列表，数据结构 [16个]
      // 将data.result数据赋值给sliders数据，保证数据结构正确
      const pageSize = 4;
      const pageCount = Math.ceil(data.result.length / pageSize);
      for (let i = 0; i < pageCount; i++) {
        sliders.value.push(data.result.slice(pageSize * i, pageSize * (i + 1)));
      }
    });
    return { sliders };
  },
};
</script>

<style scoped lang='less'>
.goods-relevant {
  background: #fff;
  min-height: 460px;
  margin-top: 20px;
  width: 77.5rem;
  .header {
    height: 80px;
    line-height: 80px;
    padding: 0 20px;
    .title {
      font-size: 20px;
      padding-left: 10px;
    }
    .icon {
      width: 16px;
      height: 16px;
      display: inline-block;
      border-top: 4px solid @blueColor;
      border-right: 4px solid @blueColor;
      box-sizing: border-box;
      position: relative;
      transform: rotate(45deg);
      &::before {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        left: 0;
        top: 2px;
        background: lighten(@blueColor, 40%);
      }
    }
  }
}

/deep/ .dianshang-carousel {
  height: 380px !important;
  .carousel {
    &-indicator {
      bottom: 30px !important;
      span {
        &.active {
          background: @blueColor !important;
        }
      }
    }
    &-btn {
      top: 110px !important;
      opacity: 1 !important;
      background: rgba(0, 0, 0, 0) !important;
      color: #ddd !important;
      i {
        font-size: 30px !important;
      }
    }
  }
}
</style>
