/*
 * @Author: shiliangL
 * @Date: 2022-05-06 14:37:27
 * @LastEditTime: 2022-05-08 08:56:23
 * @LastEditors: Do not edit
 * @Description:
 */

const { version } = require('../../package.json')
import DvaTable from './dvaTable'
import DvaDialog from './dvaDialog'
// const packageList = {}
// // eslint-disable-next-line no-useless-escape
// const files = require.context('./', true, /\index.vue$/)
// const requireAll = requireContext => requireContext.keys().map(requireContext)
// for (const item of requireAll(files)) {
//   item.name = item.default.name
//   packageList[item.default.name] = item.default
// }

// 组件
const components = [DvaTable]

// eslint-disable-next-line no-unused-vars
const install = function(Vue, opts = {}) {
  // 使用弹窗插件
  const { router, store, DvaTableConfig } = opts
  Vue.prototype.$DVATABLECONFIG = DvaTableConfig || {}
  Vue.prototype.$DvaDialog = DvaDialog({ router, store })
  // 注册组件
  components.forEach((component) => {
    Vue.component(component.name, component)
  })
  // 其他配置
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  version,
  install
}
