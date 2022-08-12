<template>
  <div class="home-category" @mouseleave="categoryId = null">
    <ul class="menu">
      <li
        :class="{ active: categoryId && categoryId === item.id }"
        v-for="item in menuList"
        :key="item.id"
        @mouseenter="categoryId = item.id"
      >
        <RouterLink :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
        <template v-if="item.children">
          <div class="menu-children">
            <RouterLink
              v-for="sub in item.children"
              :key="sub.id"
              :to="`/category/sub/${sub.id}`"
            >
              {{ sub.name }}
            </RouterLink>
          </div>
        </template>
        <!-- 骨架 -->
        <template v-else>
          <DianshangSkeleton
            height="1.125rem"
            width="3.75rem"
            bg="rgba(255,255,255,0.2)"
            style="margin-right: 5px"
          ></DianshangSkeleton>
          <DianshangSkeleton
            height="1.125rem"
            width="3.125rem"
            bg="rgba(255,255,255,0.2)"
          ></DianshangSkeleton>
        </template>
      </li>
    </ul>
    <!-- 弹层 -->
    <div class="layer">
      <h4>
        {{ currCategory && currCategory.id === "brand" ? "品牌" : "分类" }}推荐
        <small>根据您的购买或浏览记录推荐</small>
      </h4>
      <!-- 商品 -->
      <ul v-if="currCategory && currCategory.goods">
        <li v-for="item in currCategory.goods" :key="item.id">
          <RouterLink :to="`/product/${item.id}`">
            <img :src="item.picture" alt="" />
            <div class="info">
              <p class="name ellipsis-2">{{ item.name }}</p>
              <p class="desc ellipsis">{{ item.desc }}</p>
              <p class="price"><i>¥</i>{{ item.price }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <!-- 品牌 -->
      <ul v-if="currCategory && currCategory.brands">
        <li class="brand" v-for="brand in currCategory.brands" :key="brand.id">
          <RouterLink to="/">
            <img :src="brand.picture" alt="" />
            <div class="info">
              <p class="name ellipsis-2">{{ brand.name }}</p>
              <p class="desc ellipsis">{{ brand.desc }}</p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { reactive, computed, ref } from 'vue';
import { findBrand } from '@/api/home';
export default {
  name: 'HomeCategory',
  setup() {
    // 1. 获取vuex的一级分类，并且只需要两个二级分类
    const store = useStore();
    // 2. 需要在组件内部，定义一个品牌数据
    const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [{ id: 'brand-chilren', name: '品牌推荐' }],
      // 品牌列表
      brands: [],
    });
    // 3. 根据vuex的分类数据和组件中定义品牌数据，得到左侧分类完整数据(9分类+1品牌)数组
    const menuList = computed(() => {
      const list = store.state.category.list.map((item) => {
        return {
          id: item.id,
          name: item.name,
          // 防止初始化没有children的时候调用slice函数报错
          children: item.children && item.children.slice(0, 2),
          goods: item.goods,
        };
      });
      list.push(brand);
      return list;
    });
    // 得到弹出层的推荐商品数据
    const categoryId = ref(null);
    const currCategory = computed(() => {
      return menuList.value.find((item) => item.id === categoryId.value);
    });
    // 获取品牌数据，setup 不要使用 async await
    findBrand().then((data) => {
      brand.brands = data.result;
    });
    return { menuList, categoryId, currCategory };
  },
};
</script>

<style scoped lang='less'>
.home-category {
  height: 32rem;
  background: rgba(0, 0, 0, 0.8);
  z-index: 99;
  position: absolute;
  .menu {
    padding: 1rem 0;
    li {
      width: 100%;
      padding-left: 2.8rem;
      height: 3rem;
      line-height: 3rem;
      position: relative;
      &:hover {
        background: @blueColor;
      }
      > a {
        color: #fff;
        &:first-child {
          font-size: 1.2rem;
        }
      }
      .menu-children {
        position: absolute;
        top: 0;
        left: 5.4rem;
        a {
          font-size: 1rem;
          color: #fff;
          display: inline-block;
          margin-left: 0.9rem;
          line-height: 3.4rem;
        }
      }
      .skeleton {
        top: 0;
      }
    }
    // 左侧分类没加载出来时的动画
    .dianshang-skeleton {
      margin-top:-6.15rem;
      left: 3.5rem;
      animation: fade 1s linear infinite alternate;
    }
    @keyframes fade {
      from {
        opacity: 0.2;
      }
      to {
        opacity: 1;
      }
    }
  }
  // 弹出层样式
  .layer {
    width: 72rem;
    height: 32rem;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 20rem;
    top: 0;
    display: none;
    padding: 0 0.9375rem;
    h4 {
      font-size: 1.25rem;
      font-weight: normal;
      line-height: 5rem;
      small {
        font-size: 1rem;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 19.375rem;
        height: 7.5rem;
        margin: 0 0.9375rem 0.9375rem 0;
        border: 0.0625rem solid #eee;
        border-radius: 0.25rem;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 0.625rem;
          &:hover {
            background: @transparentBlueColor;
          }
          img {
            width: 5.9375rem;
            height: 5.9375rem;
          }
          .info {
            padding-left: 0.625rem;
            line-height: 1.5rem;
            width: 11.875rem;
            .name {
              font-size: 1rem;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 1.375rem;
              color: @priceColor;
              i {
                font-size: 1rem;
              }
            }
          }
        }
      }
      // 品牌的样式
      li.brand {
        height: 11.25rem;
        a {
          align-items: flex-start;
          img {
            width: 7.5rem;
            height: 10rem;
          }
          .info {
            p {
              margin-top: 0.5rem;
            }
            .place {
              color: #999;
            }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>
