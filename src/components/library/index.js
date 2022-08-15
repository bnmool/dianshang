// vue2.0插件写法要素：导出一个对象，有install函数，默认传入了Vue构造函数，Vue基础之上扩展
// vue3.0插件写法要素：导出一个对象，有install函数，默认传入了app应用实例，app基础之上扩展

// import DianshangSkeleton from './dianshang-skeleton';
// import DianshangCarousel from './dianshang-carousel';
// import DianshangMore from './dianshang-more';
// import DianshangBread from "./dianshang-bread"
// import DianshangBreadItem from "./dianshang-bread-item";
import DefaultImg from '@/assets/images/200.png';
import Message from './Message';
const importFn = require.context('./', false, /\.vue$/)
export default {
  install(app) {
    // 在app上进行扩展，app提供 component directive 函数
    // 如果要挂载原型 app.config.globalProperties 方式
    // 首页左侧分类未加载完毕时动画
    // app.component(DianshangSkeleton.name, DianshangSkeleton);
    // app.component(DianshangCarousel.name, DianshangCarousel);
    // app.component(DianshangMore.name, DianshangMore);
    // app.component(DianshangBread.name, DianshangBread);
    // app.component(DianshangBreadItem.name, DianshangBreadItem);
    importFn.keys().forEach(key => {
      // 导入组件
      const component = importFn(key).default
      // 注册组件
      app.component(component.name, component);
    })
    // 自定义指令
    defineDirective(app);
    // 如果你想挂载全局的属性，能够通过组件实例调用的属性 this.$message
    // 原型函数
    app.config.globalProperties.$message = Message;
  }
}

// 定义指令
const defineDirective = (app) => {
  // 1. 图片懒加载指令 v-lazy
  // 原理：先存储图片地址不能在src上，当图片进入可视区，将你存储图片地址设置给图片元素即可。
  app.directive('lazy', {
    // vue2.0 监听使用指令的DOM是否创建好，钩子函数：inserted
    // vue3.0 的指令拥有的钩子函数和组件的一样，使用指令的DOM是否创建好，钩子函数：mounted
    mounted(el, binding) {
      // 2. 创建一个观察对象，来观察当前使用指令的元素
      const observe = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 停止观察
          observe.unobserve(el)
          // 3. 把指令的值设置给el的src属性 binding.value就是指令的值
          // 4. 处理图片加载失败 error 图片加载失败的事件 load 图片加载成功
          el.onerror = () => {
            // 加载失败，设置默认图
            el.src = DefaultImg
          }
          el.src = binding.value
        }
      }, {
        threshold: 0
      })
      // 开启观察
      observe.observe(el)
    }
  })
}
