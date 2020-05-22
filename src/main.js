import Vue from 'vue'
import store from './store'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// Importing the global css file
import "@/assets/css/style.css"

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
