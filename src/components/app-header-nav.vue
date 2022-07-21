<template>
  <ul class="app-header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <li
      v-for="item in list"
      :key="item.id"
      @mousemove="show(item)"
      @mouseleave="hide(item)"
    >
      <RouterLink @click="hide(item)" :to="`/category/${item.id}`">{{
        item.name
      }}</RouterLink>
      <div class="layer" :class="{ open: item.open }">
        <ul>
          <li v-for="sub in item.children" :key="sub.id">
            <RouterLink @click="hide(item)" :to="`/category/sub/${sub.id}`">
              <img :src="sub.picture" alt="" />
              <p>{{ sub.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </li>
  </ul>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
export default {
  name: 'AppHeaderNav',
  setup() {
    const store = useStore();
    // 拿到 vuex 中的 分类数据
    const list = computed(() => {
      return store.state.category.list;
    });
    // 跳转的时候不会关闭二级类目，通过数据来控制
    // 1. vuex每个分类加上open数据
    // 2. vuex提供显示和隐藏函数，修改open数据
    // 3. 组件中使用vuex中的函数，使用时间来绑定，提供一个类名显示隐藏的类名
    const show = (item) => {
      store.commit('category/show', item.id);
    };
    const hide = (item) => {
      store.commit('category/hide', item.id);
    };
    return { list, show, hide };
  },
};
</script>

<style scoped lang='less'>
.app-header-nav {
  width: 51.25rem;
  display: flex;
  justify-content: space-around;
  padding-left: 2.5rem;
  position: relative;
  > li {
    margin-right: 2.5rem;
    width: 2.375rem;
    text-align: center;
    > a {
      font-size: 1rem;
      line-height: 2rem;
      height: 2rem;
      display: inline-block;
      color: #3c3c3c;
    }
    &:hover {
      > a {
        color: @blueColor;
      }
      // > .layer {
      //   height: 8.25rem;
      //   opacity: 1;
      // }
    }
  }
}
.layer {
  width: 77.5rem;
  background-color: #fff;
  position: absolute;
  left: -12.5rem;
  top: 3.5rem;
  height: 0;
  overflow: hidden;
  opacity: 0;
  box-shadow: 0 0 0.3125rem #ccc;
  transition: all 0.2s 0.1s;
  &.open {
    height: 8.25rem;
    opacity: 1;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    padding: 0 4.375rem;
    align-items: center;
    height: 8.25rem;
    li {
      width: 6.875rem;
      text-align: center;
      img {
        width: 3.75rem;
        height: 3.75rem;
      }
      p {
        padding-top: 0.625rem;
        color: #3c3c3c;
      }
      &:hover {
        p {
          color: @blueColor;
        }
      }
    }
  }
}
</style>
