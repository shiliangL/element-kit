/*
 * @Author: shiliangL
 * @Date: 2022-05-06 14:33:04
 * @LastEditTime: 2022-05-09 12:34:22
 * @LastEditors: Do not edit
 * @Description: 
 */
import Vue from 'vue'
import App from './App.vue'

import kit from './packages';
import InstantSearch from 'vue-instantsearch';

Vue.config.productionTip = false

Vue.use(InstantSearch);

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
