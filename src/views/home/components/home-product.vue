<template>
  <div class="home-product" ref="target">
    <HomePanel :title="cate.name" v-for="cate in list" :key="cate.id">
      <template v-slot:right>
        <div class="sub">
          <RouterLink
            v-for="sub in cate.children"
            :key="sub.id"
            :to="`/category/sub/${sub.id}`"
            >{{ sub.name }}</RouterLink
          >
        </div>
        <DianshangMore :path="`/category/${cate.id}`"></DianshangMore>
      </template>
      <div class="box">
        <RouterLink class="cover" :to="`/category/${cate.id}`">
          <img v-lazy="cate.picture" alt="" />
          <strong class="label">
            <span>{{ cate.name }}馆</span>
            <span>{{ cate.saleInfo }}</span>
          </strong>
        </RouterLink>
        <ul class="goods-list">
          <li v-for="item in cate.goods" :key="item.id">
            <HomeGoods :goods="item" />
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from './home-panel';
import HomeGoods from './home-goods';
import { useLazyData } from '@/hooks';
import { findGoods } from '@/api/home';
export default {
  name: 'HomeProduct',
  components: { HomePanel, HomeGoods },
  setup() {
    const { target, result } = useLazyData(findGoods);
    return { target, list: result };
  },
};
</script>

<style scoped lang='less'>
.home-product {
  background: #fff;
  padding-bottom: 3rem;
  .sub {
    margin-bottom: .125rem;
    display: flex;
    justify-content: space-between;
    a {
      color: @textColor;
      text-align: center;
      padding: .125rem .75rem;
      font-size: 1rem;
      border-radius: .25rem;
      &:hover {
        background: @blueColor;
        color: #fff;
      }
      &:last-child {
        margin-right: 5rem;
      }
    }
  }
  .box {
    display: flex;
    .cover {
      width: 15rem;
      margin-right: .625rem;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .label {
        width: 11.75rem;
        height: 4.125rem;
        display: flex;
        font-size: 1.125rem;
        color: #fff;
        line-height: 4.125rem;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        span {
          text-align: center;
          &:first-child {
            width: 4.75rem;
            background: rgba(0, 0, 0, 0.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
    .goods-list {
      width: 61.875rem;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 15rem;
        height: 18.75rem;
        margin-left: .625rem;
        margin-bottom: .625rem;
        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }
        &:nth-child(4n) {
          margin-left: 0;
        }
      }
    }
  }
}
</style>
