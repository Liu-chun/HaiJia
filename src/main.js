import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'
import 'element-ui/lib/theme-chalk/index.css'
import ElementUI from 'element-ui'
import  qs from 'qs'
// process.env.Mock && require('./mock/index.js')
import './api/xhook'


import './assets/css/base.css'
import './assets/css/font-icon/iconfont.css'
// import "./validate/validate"
Vue.use(ElementUI)
Vue.config.productionTip = false

//配全局属性配置，在任意组件内可以使用this.$qs获取qs对象
Vue.prototype.$qs = qs
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')