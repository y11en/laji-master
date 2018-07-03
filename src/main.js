// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import filter from './filter'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
import 'element-ui/lib/theme-chalk/index.css'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import echarts from 'echarts/dist/echarts.min.js'
Vue.use(echarts)

import VueClipboards from 'vue-clipboards'
Vue.use(VueClipboards)

Vue.use(require('./api/common.js'))

import Zepto from 'zepto'
import fileUpload from 'vue-upload-component'
import 'cropperjs/dist/cropper.min.css'
Vue.component('file-upload', fileUpload)
Vue.use(fileUpload)
Vue.prototype.$http = Zepto
Vue.use(VueQuillEditor)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  filter,
  store,
  components: { App },
  template: '<App/>'
})
