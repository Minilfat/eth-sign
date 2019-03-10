import Vue from 'vue'
import VueMaterial from 'vue-material'
import VueClipboard from 'vue-clipboard2'
import 'vue-material/dist/vue-material.css'
import App from './App.vue'

Vue.use(VueMaterial);
Vue.use(VueClipboard);

new Vue({
  el: '#app',
  render: h => h(App)
})
