import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios'
import './assets/reset.css'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(ElementUI);


// 请求拦截器
axios.interceptors.request.use(
  config => {

    return config;
  },
  error => {

    return Promise.error(error);
  }
);
// 响应
axios.interceptors.response.use(
  response => {

    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {

      // store.state.Loading = false
      return Promise.resolve(response.data);
    } else {
      return Promise.reject(response);

    }
  },
  // 服务器状态码不是2开头的的情况
  // 这里可以跟你们的后台开发人员协商好统一的错误状态码
  // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
  // 下面列举几个常见的操作，其他需求可自行扩展
  error => {
    // if (error.response.status) {
    return Promise.reject(error);
    // }
  }
);
Vue.prototype.$axios = axios






Vue.config.productionTip = false;

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount("#app");
