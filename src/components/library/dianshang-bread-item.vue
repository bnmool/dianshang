<template>
  <div class="dianshang-bread-item">
    <RouterLink v-if="to" :to="to"><slot /></RouterLink>
    <span v-else><slot /></span>
  </div>
</template>
<script>
export default {
  name: 'DianshangBreadItem',
  props: {
    to: {
      type: [String, Object]
    }
  }
}
</script>
