import Vue from 'vue'
import store from './store/store'
import App from './App'
import fly from './fly/fly'
import cookie from './components/saveCookie.js'
import imageUrl from './components/imageAdd'
// import Toast from 'vant'
Vue.config.productionTip = false
App.mpType = 'app'

Vue.prototype.$store = store
Vue.prototype.$url = imageUrl
Vue.prototype.fly=fly //将fly实例挂在vue原型上
Vue.prototype.$cookie=cookie
// Vue.use(Toast)
const app = new Vue(App)



app.$mount()
