<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
        <h3>
          {{ title }}<small>{{ subTitle }}</small>
        </h3>
        <slot name="right" />
      </div>
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePanel',
  props: {
    title: {
      type: String,
      default: '',
    },
    subTitle: {
      type: String,
      default: '',
    },
  },
};
</script>

<style scoped lang='less'>
.home-panel {
  background-color: #fff;
  .container {
    width: 90rem;
  }
  .head {
    padding: 2.5rem 0;
    display: flex;
    align-items: flex-end;
    h3 {
      flex: 1;
      font-size: 2rem;
      font-weight: normal;
      margin-left: 0.375rem;
      height: 2.1875rem;
      line-height: 2.1875rem;
      small {
        font-size: 1rem;
        color: #999;
        margin-left: 1.25rem;
      }
    }
  }
}
</style>
