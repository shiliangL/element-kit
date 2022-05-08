/*
 * @Author: shiliangL
 * @Date: 2022-05-06 14:33:04
 * @LastEditTime: 2022-05-08 09:09:46
 * @LastEditors: Do not edit
 * @Description:
 */
import Vue from 'vue'
import App from './App.vue'

import '../lib/style/index.css'
import kit from '../lib/index'

Vue.config.productionTip = false

Vue.use(kit, {
  date: '2022年5月6日',
  DvaTableConfig: {
    size: 'small',
    headerCellStyle: () => {
      return { background: '#EDF5FF' }
    }
  }
})

new Vue({
  render: (h) => h(App)
}).$mount('#app')
