import VueTerminal from './VueTerminal.vue'

// 导出模块
export default VueTerminal

// global 情况下 自动安装
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.component('vue-terminal', VueTerminal)
}