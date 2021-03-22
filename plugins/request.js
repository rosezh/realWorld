/**
 * 基于 axios 封装的请求模块
 */

import axios from 'axios'
// 创建请求对象
export const request = axios.create({
  baseURL:'https://conduit.productionready.io/'
})

// 通过插件机制获取到上下文对象
// 插件导出函数必须作为default成员
export default ({store})=>{
  // console.log(store)
  request.interceptors.request.use(function(congfig){
    // 解构用户信息
    const { user } = store.state

    if(user && user.token){
      congfig.headers.Authorization = `Token ${user.token}`
    }
    // 返回config请求配置对象
    return congfig
  },function(err){
    return Promise.reject(err)
  })
}