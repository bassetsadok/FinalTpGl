import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import cors from 'cors'
window.axios = require('axios')
new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
