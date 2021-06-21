import Vue from 'vue'
import App from './App.vue'
import './views/time.less'


Vue.config.productionTip = false
// console.log(time);

new Vue({
  render: h => h(App)
}).$mount('#app')