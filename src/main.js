/*
 * @Author: shiliangL
 * @Date: 2022-05-06 14:33:04
 * @LastEditTime: 2022-05-13 15:05:04
 * @LastEditors: Do not edit
 * @Description:
 */
import Vue from 'vue'
import App from './App.vue'
import './styles/index.scss'

import kit from './packages'

console.log(kit, '=kit=')
Vue.config.productionTip = false

Vue.use(kit, {
  date: '2022年5月6日'
})

new Vue({
  render: (h) => h(App)
}).$mount('#app')
