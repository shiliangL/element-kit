/*
 * @Author: shiliangL
 * @Date: 2022-05-06 15:10:01
 * @LastEditTime: 2022-05-12 11:14:30
 * @LastEditors: Do not edit
 * @Description:
 */
import component from './index.vue'

component.install = function(Vue, opts) {
  const { DvaTableConfig } = opts
  Vue.prototype.$DVATABLECONFIG = DvaTableConfig || {}
  Vue.component(component.name, component)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(component)
}

export default component
