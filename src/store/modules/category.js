// 分类数据
import { topCategory } from '@/api/constants'
import { findAllCategory } from '@/api/category'
// 分类模块
export default {
    namespaced: true,
    state: () => {
        return {
            // 初始化分类数据集合
            list: topCategory.map(item => ({ name: item }))
        }
    },
    // 修改分类函数
    mutations: {
        // categoryList 是所有的分类集合
        setCategoryList(state, categoryList) {
            state.list = categoryList;
        },
        // 定义show和hide函数，控制当前分类的二级分类显示和隐藏
        show(state, id) {
            const currCategory = state.list.find(item => item.id === id)
            currCategory.open = true
        },
        hide(state, id) {
            const currCategory = state.list.find(item => item.id === id)
            currCategory.open = false
        }
    },
    // 获取分类函数
    actions: {
        async getList({ commit }) {
            // 获取分类数据
            const data = await findAllCategory();
            // 给一级分类加上一个控制二级分类显示隐藏的数据open
            data.result.forEach(item => {
                item.open = false
            })
            // 获取数据成功，提交mutations进行数据修改
            commit('setCategoryList', data.result)
        }
    }
};
