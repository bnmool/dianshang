// 分类模块 api
// 定义分类相关需要的接口函数
import request from '@/utils/request'

/**
 * 获取首页头部分类数据
 */
/**
 * 获取所有的分类(顶级，二级，对应的商品)
 * @returns Promise
 */
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}
