<template>
  <div class="Dianshang-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <DianshangBread>
        <DianshangBreadItem to="/">首页</DianshangBreadItem>
        <DianshangBreadItem :to="`/category/${goods.categories[1].id}`">{{
          goods.categories[1].name
        }}</DianshangBreadItem>
        <DianshangBreadItem :to="`/category/sub/${goods.categories[0].id}`">{{
          goods.categories[0].name
        }}</DianshangBreadItem>
        <DianshangBreadItem>{{ goods.name }}</DianshangBreadItem>
      </DianshangBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="goods.mainPictures"></GoodsImage>
          <GoodsSales></GoodsSales>
        </div>
        <div class="spec">
          <GoodsName :goods="goods"></GoodsName>
          <GoodsSku :goods="goods" @change="changeSku"></GoodsSku>
          <!-- 数量选择组件 -->
          <dianshang-numbox
            label="数量"
            v-model="num"
            :max="goods.inventory"
          ></dianshang-numbox>
          <!-- 按钮组件 -->
          <DianshangButton
            @click="insertCart()"
            type="primary"
            style="margin-top: 20px"
            >加入购物车</DianshangButton
          >
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant :goodsId="goods.id"></GoodsRelevant>
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <GoodsTabs :goods="goods"></GoodsTabs>
          <!-- 注意事项 -->
          <GoodsWarn></GoodsWarn>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :goodsId="goods.id" type="1"></GoodsHot>
          <GoodsHot :goodsId="goods.id" type="2"></GoodsHot>
          <GoodsHot :goodsId="goods.id" type="3"></GoodsHot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GoodsRelevant from './components/goods-relevant';
import GoodsImage from './components/goods-image';
import GoodsSales from './components/goods-sales';
import GoodsName from './components/goods-name';
import GoodsSku from './components/goods-sku';
import GoodsTabs from './components/goods-tabs';
import GoodsHot from './components/goods-hot';
import GoodsWarn from './components/goods-warn';
import { nextTick, provide, ref, watch } from 'vue';
import { findGoods } from '@/api/product';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import Message from '@/components/library/Message';
// 获取商品详情
const useGoods = () => {
  const goods = ref(null);
  const route = useRoute();
  watch(
    () => {
      return route.params.id;
    },
    (newVal) => {
      if (newVal && `/product/${newVal}` === route.path) {
        findGoods(route.params.id).then((data) => {
          goods.value = null;
          nextTick(() => {
            goods.value = data.result;
          });
        });
      }
    },
    { immediate: true }
  );
  return goods;
};
export default {
  name: 'DianshangGoodsPage',
  components: {
    GoodsRelevant,
    GoodsImage,
    GoodsSales,
    GoodsName,
    GoodsSku,
    GoodsTabs,
    GoodsHot,
    GoodsWarn,
  },
  setup() {
    const goods = useGoods();
    const currSku = ref(null);
    const changeSku = (sku) => {
      // 修改商品的现价原价库存信息
      if (sku) {
        goods.value.price = sku.price;
        goods.value.oldPrice = sku.oldPrice;
        goods.value.inventory = sku.inventory;
      }
      // 记录选择后的sku，可能有数据，可能没有数据{}
      currSku.value = sku;
    };
    // 提供goods数据给后代组件使用
    provide('goods', goods);
    // 选择的数量
    const num = ref(1);
    const store = useStore();
    // 加入购物车
    const insertCart = () => {
      // 预定加入购物车字段必须和后端保持一致
      // id skuId name attrsText picture price nowPrice selected stock count isEffective
      if (currSku.value && currSku.value.skuId) {
        const { skuId, specsText: attrsText, inventory: stock } = currSku.value;
        const { id, name, price, mainPictures } = goods.value;
        store.dispatch('cart/insertCart', {
            skuId,
            attrsText,
            stock,
            id,
            name,
            price,
            nowPrice: price,
            picture: mainPictures[0],
            selected: true,
            isEffective: true,
            count: num.value,
          })
          .then(() => {
            Message({ type: 'success', text: '加入购物车成功' });
          });
      } else {
        Message({ text: '请选择完整规格' });
      }
    };
    return { goods, changeSku, num, insertCart };
  },
};
</script>

<style scoped lang='less'>
.Dianshang-goods-page {
  .container {
    .dianshang-bread {
      width: 36rem;
      margin-left: 21%;
    }
    .goods-info {
      width: 77.5rem;
      min-height: 37.5rem;
      background: #fff;
      display: flex;
      .media {
        width: 580px;
        height: 600px;
        .goods-sales {
          margin-left: 3.2rem;
        }
      }
      .spec {
        width: 30rem;
        flex: 1;
        padding: 30px 30px 30px 0;
        .dianshang-button {
          margin-left: 10px;
        }
      }
    }
    .goods-footer {
      width: 77.5rem;
      display: flex;
      margin-top: 1.25rem;
      .goods-article {
        width: 940px;
        margin-right: 20px;
      }
      .goods-aside {
        width: 280px;
        min-height: 1000px;
      }
    }
    .goods-tabs {
      min-height: 600px;
      background: #fff;
    }
    .goods-warn {
      min-height: 600px;
      background: #fff;
      margin-top: 20px;
    }
  }
}
</style>
