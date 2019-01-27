// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import vSelect from 'vue-select';
import App from './App';
import Header from './components/WebPage/common/Header';
import Footer from './components/WebPage/common/Footer';
import store from './store';
import router from './router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCoffee,
  faDesktop,
  faClock,
  faGlobe,
  faHome,
  faCog,
  faPen,
  faLightbulb,
  faConciergeBell,
  faMapMarker,
  faUser,
  faChalkboardTeacher,
  faAngleUp,
  faAngleDown,
  faInfoCircle,
  faNewspaper,
  faHandshake,
  faVectorSquare,
  faVideo,
  faImages,
  faEdit,
  faSitemap,
  faFile
  } from '@fortawesome/free-solid-svg-icons';
import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import Carousel3d from 'vue-carousel-3d';
import VueHtml2Canvas from 'vue-html2canvas';

Vue.use(BootstrapVue);
// Vue.use(VueHtml2Canvas);

library.add(faCoffee,
  faDesktop,
  faClock,
  faGlobe,
  faHome,
  faMapMarker,
  faChalkboardTeacher,
  faCog,
  faUser,
  faPen,
  faLightbulb,
  faAngleDown,
  faAngleUp,
  faConciergeBell,
  faInfoCircle,
  faNewspaper,
  faHandshake,
  faVectorSquare,
  faVideo,
  faImages,
  faEdit,
  faSitemap,
  faFile);

Vue.component('font-awesome-icon', FontAwesomeIcon);
Vue.component('v-select', vSelect);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>',
});

new Vue({
  el: '#header',
  store,
  router,
  components: { Header },
  template: '<Header/>',
});

new Vue({
  el: '#footer',
  store,
  router,
  components: { Footer },
  template: '<Footer/>',
});
