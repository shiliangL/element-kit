import component from './index.vue';

component.install = function (Vue, opts) {
  const { DvaTableConfig } = opts;
  Vue.prototype.$DVATABLECONFIG = DvaTableConfig || {};
  Vue.component(component.name, component);
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(component);
}

export default component;
