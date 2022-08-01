// 复用逻辑钩子
import { useIntersectionObserver } from '@vueuse/core';
import { ref } from 'vue';
/**
 * 数据懒加载函数
 * @param {Element} target - Dom对象
 * @param {Function} apiFn - API函数
 * @return
 */
export const useLazyData = (apiFn) => {
    const result = ref([]);
    const target = ref(null);
    // stop 停止观察
    const { stop } = useIntersectionObserver(
        // target 是观察的目标dom容器，必须是dom容器，而且是vue3.0方式绑定的dom对象
        target,
        ([{ isIntersecting }], observerElement) => {
            // isIntersecting 是否进入可视区
            if (isIntersecting) {
                stop();
                apiFn().then(data => {
                    result.value = data.result;
                })
            }
        },
        // 配置选项，相交的比例大于0就触发
        {
            threshold: 0
        }
    );
    return { result, target }
}
