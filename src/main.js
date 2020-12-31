import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './utils/element'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false

// document.body.addEventListener('keydown', (e) => {
//   console.log(0)
// })

// document.body.addEventListener('click', () => {
//   console.log(1)
// })

// document.body.addEventListener('mousemove', () => {
//   console.log(2)
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
