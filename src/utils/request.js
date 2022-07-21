import axios from 'axios';
import store from '@/store';
// 导入路由
import router from '@/router';
// 定义基础请求地址
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/';
// 1. 创建 axios 实例
const instance = axios.create({
    // axios 配置 baseURL timeout
    baseURL,
    timeout: 5000
});
// 2. 请求拦截器 + token
instance.interceptors.request.use(
    (config) => {
        // 获取信息对象
        // const { profile } = store.state.user;
        const profile = store.state.user.profile;
        // 判断是否有 token
        if (profile.token) {
            // 如果本地有 token 就在头部携带
            config.headers.Authorization = `Beare ${profile.token}`;
        }
        return config;
    },
    (err) => {
        return Promise.reject(err);
    });
// 3. 响应拦截器
instance.interceptors.response.use(
    (res) => {
        // 1.取出 data 数据，将来调用接口的时候直接拿到的就是后台数据
        return res.data;
    },
    (err) => {
        // 2. 401 登录无效
        if (err.response && err.response.status === 401) {
            // 2.1 清空无效用户信息
            store.commit('user/setUser', {})
            // 2.2 跳转到登录页码 跳转需要传参 (当前路由地址) 给登录页码
            // 2.2.1 当前路由地址譬如: `/user?a=10&&b=20`
            // 2.2.2 组件里头: $.route.fullPath 是当前路由地址
            // router.currentRoute = $.route
            // 2.2.3 模块里面 router.currentRoute.value.fullPath 就是当前路由地址
            // 3. encodeURIComponent 转换 uri 编码，防止地址解析出错
            const dsFullPath = encodeURIComponent(router.currentRoute.value.fullPath);
            // 跳转页面
            router.push('/login?redirectUrl=' + dsFullPath);
        };
        return Promise.reject(err);
    })

// 4. 导出一个函数，调用当前 axiso 实例发送请求，返回值 promise
const request = (url, method, submitData) => {
    // 发送请求
    // 请求地址，请求方式，提交的数据
    return instance({
        url,
        method,
        // 如果是 get 请求使用 params 传递 submitData
        // 如果是 psot 请求使用 data 传递 submitData
        // 防止出现大小写的问题，统一转换成小写

        [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
    });
}
export default request;
