<script>
import { h } from 'vue';
export default {
  name: 'DianshangBread',
  props: {
    parentName: {
      type: String,
      default: '',
    },
    parentPath: {
      type: String,
      default: '',
    },
  },
  render() {
    // 用法
    // 1. template 标签去除，单文件组件
    // 2. 返回值就是组件内容
    // 3. vue2.0 的h函数传参进来的，vue3.0 的h函数导入进来
    // 4. h 第一个参数 标签名字  第二个参数 标签属性对象  第三个参数 子节点
    // 需求
    // 1. 创建dianshang-bread父容器
    // 2. 获取默认插槽内容
    // 3. 去除dianshang-bread-item组件的i标签，因该由render函数来组织
    // 4. 遍历插槽中的item，得到一个动态创建的节点，最后一个item不加i标签
    // 5. 把动态创建的节点渲染再dianshang-bread标签中
    const items = this.$slots.default();
    const dymanicItems = [];
    items.forEach((item, i) => {
      // 对插槽节点进行判断（是DianshangBreadItem和Transition才进行组装）
      if (
        item.type.name === 'DianshangBreadItem' ||
        item.type.displayName === 'Transition'
      ) {
        dymanicItems.push(item);
        if (i < items.length - 1) {
          dymanicItems.push(h('i', { class: 'iconfont icon-angle-right' }));
        }
      }
    });
    return h('div', { class: 'dianshang-bread' }, dymanicItems);
  },
};
</script>

<style lang='less'>
.dianshang-bread {
  display: flex;
  margin: 0;
  width: 10rem;
  margin-left: 20.5%;
  padding: 1.5625rem 0.625rem;
  &-item {
    a {
      color: #333;
      transition: all 0.4s;
      margin: 0;
      &:hover {
        color: @blueColor;
      }
    }
  }
  i {
    font-size: 0.75rem;
    margin-left: 0.3125rem;
    margin-right: 0.3125rem;
    line-height: 1.375rem;
  }
}
</style>
