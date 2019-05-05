// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'onsenui/css/onsenui.css'
import 'onsenui/css/onsen-css-components.css'

import firebase from 'firebase/app'
import Vue from 'vue'
import VueOnsen from 'vue-onsenui'
import store from './store'
import App from './App'
import Paginate from 'vuejs-paginate'
import Vuetify from 'vuetify'
import VueChatScroll from 'vue-chat-scroll'
Vue.config.productionTip = false
Vue.use(VueChatScroll)
Vue.use(VueOnsen)
Vue.use(Paginate)
Vue.use(Vuetify)
document.body.setAttribute('data-app', true)
// Initialize Firebase
var config = {
  apiKey: `${process.env.API_KEY}`,
  authDomain: `${process.env.AUTH_DOMAIN}`,
  databaseURL: `${process.env.DATABASE_URL}`,
  projectId: `${process.env.PROJECT_ID}`,
  storageBucket: `${process.env.STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.MESSAGING_SENDER_ID}`
}
firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  template: '<App/>',
  components: { App }
})
