/*
 * @Author: shiliangL
 * @Date: 2022-05-12 11:07:17
 * @LastEditTime: 2022-05-12 12:13:40
 * @LastEditors: Do not edit
 * @Description:
 */
import component from './index.vue'

component.install = function(Vue, opts) {
  Vue.component(component.name, component)
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(component)
}

export default component
