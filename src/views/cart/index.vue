<template>
  <div class="dianshang-cart-page">
    <div class="container">
      <DianshangBread>
        <DianshangBreadItem to="/">首页</DianshangBreadItem>
        <DianshangBreadItem>购物车</DianshangBreadItem>
      </DianshangBread>
      <div class="cart">
        <table>
          <thead>
            <tr>
              <th width="120">
                <DianshangCheckbox
                  @change="checkAll"
                  :modelValue="$store.getters['cart/isCheckAll']"
                  >全选</DianshangCheckbox
                >
              </th>
              <th width="400">商品信息</th>
              <th width="220">单价</th>
              <th width="180">数量</th>
              <th width="180">小计</th>
              <th width="140">操作</th>
            </tr>
          </thead>
          <!-- 有效商品 -->
          <tbody>
            <tr v-if="$store.getters['cart/validList'].length === 0">
              <td colspan="6">
                <CartNone></CartNone>
              </td>
            </tr>
            <tr
              v-else
              v-for="goods in $store.getters['cart/validList']"
              :key="goods.skuId"
            >
              <td>
                <dianshangCheckbox
                  @change="
                    ($event) => {
                      return checkOne(goods.skuId, $event);
                    }
                  "
                  :modelValue="goods.selected"
                />
              </td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${goods.id}`"
                    ><img :src="goods.picture" alt=""
                  /></RouterLink>
                  <div>
                    <p class="name ellipsis">
                      {{ goods.name }}
                    </p>
                    <!-- 选择规格组件 -->
                    <CartSku
                      :skuId="goods.skuId"
                      :attrsText="goods.attrsText"
                      @change="
                        ($event) => {
                          return updateCartSku(goods.skuId, $event);
                        }
                      "
                    ></CartSku>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ goods.nowPrice }}</p>
              </td>
              <td class="tc">
                <DianshangNumbox
                  @change="
                    ($event) => {
                      return updateCount(goods.skuId, $event);
                    }
                  "
                  :max="goods.stock"
                  :modelValue="goods.count"
                ></DianshangNumbox>
              </td>
              <td class="tc">
                <p>
                  &yen;{{
                    (
                      (Math.round(goods.nowPrice * 100) * goods.count) /
                      100
                    ).toFixed(2)
                  }}
                </p>
              </td>
              <td class="tc">
                <p>
                  <a
                    @click="deleteCart(goods.skuId)"
                    class="green"
                    href="javascript:;"
                    >删除</a
                  >
                </p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
          <!-- 无效商品 -->
          <tbody v-if="$store.getters['cart/invalidList'].length">
            <tr>
              <td colspan="6"><h3 class="tit">失效商品</h3></td>
            </tr>
            <tr
              v-for="goods in $store.getters['cart/invalidList']"
              :key="goods.skuId"
            >
              <td><DianshangCheckbox style="color: #eee" /></td>
              <td>
                <div class="goods">
                  <RouterLink :to="`/product/${goods.id}`">
                    <img :src="goods.picture" alt="" />
                  </RouterLink>
                  <div>
                    <p class="name ellipsis">{{ goods.name }}</p>
                    <p class="attr">{{ goods.attrsText }}</p>
                  </div>
                </div>
              </td>
              <td class="tc">
                <p>&yen;{{ goods.nowPrice }}</p>
              </td>
              <td class="tc">
                <DianshangNumbox :moduleValue="goods.count"></DianshangNumbox>
              </td>
              <td class="tc">
                <p>
                  &yen;{{
                    (
                      (Math.round(goods.nowPrice * 100) * goods.count) /
                      100
                    ).toFixed(2)
                  }}
                </p>
              </td>
              <td class="tc">
                <p>
                  <a
                    @click="deleteCart(goods.skuId)"
                    class="green"
                    href="javascript:;"
                    >删除</a
                  >
                </p>
                <p><a href="javascript:;">找相似</a></p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- 操作栏 -->
      <div class="action">
        <div class="batch">
          <dianshangCheckbox
            @change="checkAll"
            :modelValue="$store.getters['cart/isCheckAll']"
            >全选</dianshangCheckbox
          >
          <a @click="batchDeleteCart()" href="javascript:;">删除选中商品</a>
          <a href="javascript:;">移入收藏夹</a>
          <a @click="batchDeleteCart(true)" href="javascript:;">清空失效商品</a>
        </div>
        <div class="total">
          共 {{ $store.getters["cart/validTotal"] }} 件商品，已选择
          {{ $store.getters["cart/selectedTotal"] }} 件，商品合计：
          <span class="red">¥{{ $store.getters["cart/selectedAmount"] }}</span>
          <DianshangButton @click="checkOut" type="primary"
            >下单结算</DianshangButton
          >
        </div>
      </div>
      <!-- 猜你喜欢 -->
      <GoodsRelevant />
    </div>
  </div>
</template>
<script>
import GoodsRelevant from '@/views/goods/components/goods-relevant';
import Message from '@/components/library/Message';
import CartNone from '@/views/cart/components/cart-none';
import CartSku from './components/cart-sku';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import Confirm from '@/components/library/Confirm';
import DianshangNumbox from '@/components/library/dianshang-numbox.vue';
export default {
  name: 'DianshangCartPage',
  components: { GoodsRelevant, CartNone, DianshangNumbox, CartSku },
  setup() {
    const store = useStore();
    // 单选
    const checkOne = (skuId, selected) => {
      store.dispatch('cart/updateCart', { skuId, selected });
    };
    // 全选
    const checkAll = (selected) => {
      store.dispatch('cart/checkAllCart', selected);
    };
    // 删除
    const deleteCart = (skuId) => {
      Confirm({ text: '亲，您是否确认删除商品' })
        .then(() => {
          store.dispatch('cart/deleteCart', skuId).then(() => {
            Message({ type: 'success', text: '删除成功' });
          });
        })
        .catch((e) => {});
    };
    // 批量删除选中商品,也支持清空无效商品
    const batchDeleteCart = (isClear) => {
      Confirm({ text: `亲，您是否确认删除${isClear ? '失效' : '选中'}的商品` })
        .then(() => {
          store.dispatch('cart/batchDeleteCart', isClear).then(() => {
            Message({ type: 'success', text: '删除成功' });
          });
        })
        .catch((e) => {});
    };
    // 修改数量
    const updateCount = (skuId, count) => {
      store.dispatch('cart/updateCart', { skuId, count });
    };
    // 修改规格
    const updateCartSku = (oldSkuId, newSku) => {
      store.dispatch('cart/updateCartSku', { oldSkuId, newSku });
    };
    // 结算
    const router = useRouter();
    const checkOut = () => {
      // 1. 判断是否选中商品，且提示
      if (store.getters['cart/selectedList'].length === 0) {
        return Message({ text: '至少选中一件商品' });
      }
      // 如果登录直接跳转
      if (store.state.user.profile.token) {
        return router.push('/member/checkout');
      }
      // 2. 弹出确认框，提示：下单结算需要登录
      // 未登录弹出确认框
      // 3. 使用导航守卫，遇见需要登录的路由跳转，拦截到登录页面
      Confirm({ text: '下单结算需要登录，确认现在去登录吗？' })
        .then(() => {
          router.push('/member/checkout');
        })
        .catch((e) => {});
    };
    return {
      checkOne,
      checkAll,
      deleteCart,
      batchDeleteCart,
      updateCount,
      updateCartSku,
      checkOut,
    };
  },
};
</script>
<style scoped lang="less">
.tc {
  text-align: center;
  .dianshang-numbox {
    margin: 0 auto;
    width: 120px;
  }
}
.red {
  color: @priceColor;
}
.green {
  color: @blueColor;
}
.f16 {
  font-size: 16px;
}
.goods {
  display: flex;
  align-items: center;
  img {
    width: 100px;
    height: 100px;
  }
  > div {
    width: 280px;
    font-size: 16px;
    padding-left: 10px;
    .attr {
      font-size: 14px;
      color: #999;
    }
  }
}
.action {
  a {
    color: @textColor;
    padding: 2px 5px;
    &:hover {
      color: #fff;
      background-color: @priceColor;
    }
  }
  display: flex;
  background: #fff;
  margin-top: 20px;
  height: 80px;
  align-items: center;
  font-size: 16px;
  justify-content: space-between;
  .dianshang-checkbox {
    color: #999;
  }
  .batch {
    margin-left: 30px;
    a {
      margin-left: 20px;
      display: inline-block;
    }
  }
  .red {
    font-size: 18px;
    margin-right: 20px;
    font-weight: bold;
  }
}
.tit {
  color: #666;
  font-size: 16px;
  font-weight: normal;
  line-height: 50px;
}
.dianshang-cart-page {
  width: 77.5rem;
  .cart {
    background: #fff;
    color: #666;
    table {
      border-spacing: 0;
      border-collapse: collapse;
      line-height: 24px;
      th,
      td {
        p {
          a {
            color: @textColor;
            display: inline-block;
            padding: 2px 5px;
            &:hover {
              color: #fff;
              background-color: @priceColor;
            }
          }
        }
        padding: 10px;
        border-bottom: 1px solid #f5f5f5;
        &:first-child {
          text-align: left;
          padding-left: 30px;
          color: #999;
        }
      }
      th {
        font-size: 16px;
        font-weight: normal;
        line-height: 50px;
      }
    }
  }
}
</style>
