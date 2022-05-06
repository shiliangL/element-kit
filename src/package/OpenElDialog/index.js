/*
 * @Author: shiliangL
 * @Date: 2022-05-06 14:06:11
 * @LastEditTime: 2022-05-06 15:49:55
 * @LastEditors: Do not edit
 * @Description: 快速打开弹窗插件
 */
import Vue from 'vue';
import { Dialog } from 'element-ui';
import merge from 'element-ui/src/utils/merge';
const ModalConstructor = Vue.extend(Dialog);

// 配置常用默认设置
const defaults = {
  appendToBody: true,
  destroyOnClose: true,
  closeOnClickModal: false,
  closeOnPressEscape: false,
};

let instance;

const OpenElDialog = function ({ store, router, opt = {} }) {
  return function ({ content, methods, modalProps, props }) {
    if (Vue.prototype.$isServer) return;
    const modalOptions = merge({}, defaults, modalProps, opt);
    const dom = document.createElement('div');
    document.body.appendChild(dom);
    instance = new ModalConstructor({
      el: dom,
      store,
      router,
      data() {
        return {
          showModal: true,
        };
      },
      components: {
        Dialog: Dialog,
        Plugin: content,
      },
      render(createElement) {
        const { $DVADIALOGCONFIG } = this;
        const Plugin = this.showModal
          ? () =>
              createElement('Plugin', {
                props: {
                  ...props,
                },
                on: {
                  close: (e) => this.close(e),
                  ...methods,
                },
              })
          : null;
        return createElement('Dialog', {
          props: {
            visible: this.showModal,
            ...$DVADIALOGCONFIG,
            ...modalOptions,
          },
          on: {
            close: () => {
              this.close();
            },
            closed: () => {
              this.closedFn();
            },
          },
          scopedSlots: {
            default: Plugin,
          },
        });
      },
      methods: {
        close() {
          this.showModal = false;
        },
        closedFn() {
          // console.log('关闭动画结束时的回调')
          setTimeout(() => {
            document.body.removeChild(this.$el);
            this.$destroy();
          }, 400);
        },
      },
    });
    instance.$el.style.padding = '18px';
    return instance;
  };
};

export default OpenElDialog;
