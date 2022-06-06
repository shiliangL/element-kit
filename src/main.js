/*
 * @Author: shiliangL
 * @Date: 2022-05-06 14:33:04
 * @LastEditTime: 2022-06-06 17:03:39
 * @LastEditors: Do not edit
 * @Description:
 */
import Vue from 'vue'
import App from './AppMap.vue'
import './styles/index.scss'
import 'element-ui/lib/theme-chalk/index.css'

import kit from './packages'
import ElementUI from 'element-ui'
Vue.use(ElementUI, { size: 'small' })

Vue.use(kit, {
  date: '2022年5月6日'
})

Vue.config.productionTip = false

new Vue({
  render: (h) => h(App)
}).$mount('#app')
