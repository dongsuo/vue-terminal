import Vue from 'vue';
import Router from 'vue-router';
import VueTerminalEmulator from '@/components/VueTerminalEmulator';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Terminal',
      component: VueTerminalEmulator
    }
  ]
});
