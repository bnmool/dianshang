<template>
  <div class="cart-sku" ref="target">
    <div class="attrs" @click="toggle">
      <span class="ellipsis">{{ attrsText }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="visible">
      <div v-if="loading" class="loading"></div>
      <GoodsSku
        v-else
        @change="changeSku"
        :skuId="skuId"
        :goods="goods"
      ></GoodsSku>
      <DianshangButton
        @click="submit"
        v-if="!loading"
        type="primary"
        size="mini"
        style="margin-left: 60px"
        >确认</DianshangButton
      >
    </div>
  </div>
</template>
<script>
import { onClickOutside } from '@vueuse/core';
import GoodsSku from '@/views/goods/components/goods-sku';
import { ref } from 'vue';
import { getGoodsSku } from '@/api/cart';
export default {
  name: 'CartSku',
  props: {
    attrsText: {
      type: String,
      default: '',
    },
    skuId: {
      type: String,
      default: '',
    },
  },
  components: { GoodsSku },
  setup(props, { emit }) {
    const visible = ref(false);
    const goods = ref(null);
    const loading = ref(false);
    // 打开
    const open = () => {
      visible.value = true;
      loading.value = true;
      // 获取商品数据（specs,skus）
      getGoodsSku(props.skuId).then((data) => {
        goods.value = data.result;
        loading.value = false;
      });
    };
    // 关闭
    const close = () => {
      visible.value = false;
    };
    // 切换
    const toggle = () => {
      visible.value ? close() : open();
    };
    // 点击其他地方关闭
    const target = ref(null);
    onClickOutside(target, () => {
      close();
    });
    // 监听 sku 改变,记录 sku 信息
    const currSku = ref(null);
    const changeSku = (sku) => {
      currSku.value = sku;
    };
    // 点击确认获取更改后的 sku 信息
    // 点击确认的时候，更改后的sku信息提交给父组件（购物车组件）
    const submit = () => {
      // 当你currSku有值，且skuId和默认的skuId不同
      if (
        currSku.value &&
        currSku.value.skuId &&
        currSku.value.skuId !== props.skuId
      ) {
        emit('change', currSku.value);
        close();
      }
    };
    return { visible, toggle, target, goods, loading, changeSku, submit };
  },
};
</script>
<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display: inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @blueColor;
    box-shadow: 2px 2px 4px lighten(@blueColor, 50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1px solid @blueColor;
      border-top: 1px solid @blueColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(0.8, 1) rotate(45deg);
    }
    .loading {
      height: 224px;
      background: url(../../../assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
