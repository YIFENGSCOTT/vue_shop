import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'


Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// import createPersistedState from 'vuex-persistedstate'
// export default new Vuex.Store({
//     state:{},
//     getters:{},
//     actions:{},
//     mutations:{},
//     modules:{},
//     plugins: [createPersistedState(
//       this.tableDataBegin
//     )]  //加上这个就可以了 //里面设置需要缓存的内容
// })
