<template>
  <ul class="app-header-nav">
    <li class="home"><RouterLink to="/">首页</RouterLink></li>
    <li>
      <a href="#">美食</a>
      <div class="layer">
        <ul>
          <li v-for="i in 10" :key="i">
            <a href="#">
              <img
                src="http://zhoushugang.gitee.io/erabbit-client-pc-static/uploads/img/category%20(4).png"
                alt=""
              />
              <p>果干</p>
            </a>
          </li>
        </ul>
      </div>
    </li>
    <li><a href="#">餐厨</a></li>
    <li><a href="#">艺术</a></li>
    <li><a href="#">电器</a></li>
    <li><a href="#">居家</a></li>
    <li><a href="#">洗护</a></li>
    <li><a href="#">孕婴</a></li>
    <li><a href="#">服装</a></li>
    <li><a href="#">杂货</a></li>
  </ul>
</template>

<script>
export default {
  name: 'AppHeaderNav',
};
</script>

<style scoped lang='less'>
.app-header-nav {
  width: 51.25rem;
  display: flex;
  justify-content: space-around;
  padding-left: 2.5rem;
  > li {
    margin-right: 2.5rem;
    width: 2.375rem;
    text-align: center;
    position: relative;
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
      > .layer {
        height: 8.25rem;
        opacity: 1;
      }
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
