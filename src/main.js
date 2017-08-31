/**
 * @Author: Dingjia
 * @Date:   2017-08-30T22:19:31+08:00
 * @Last modified by:   Dingjia
 * @Last modified time: 2017-08-30T23:28:38+08:00
 */

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VResource from 'vue-resource'
import router from './router'
Vue.config.productionTip = false
Vue.use(VResource)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
