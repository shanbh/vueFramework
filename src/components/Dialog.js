import Modal from 'ant-design-vue/es/modal'
import Button from 'ant-design-vue/es/button'
export default (Vue) => {
  function dialog () {
    const _vm = this
    const args = [...arguments][0]

    // 组件
    const component = args.content
    const componentRef = `_component${Math.round(Math.random() * 10000)}`
    const componentProps = {
      ref: componentRef,
      props: args.props || {},
      on: args.on || {},
      attrs: args.attrs || {}
    }

    // 删除组件参数
    delete args.content
    delete args.on
    delete args.props

    const modalProps = args
    if (!_vm || !_vm._isVue) {
      return
    }

    // 对话框Dom挂载点
    const dialogDiv = document.createElement('div')
    dialogDiv.setAttribute('type', 'dialog')
    document.body.appendChild(dialogDiv)

    // 方法处理，预留点击确定和取消按钮在子组件中做逻辑处理的接口
    const handle = function (checkFunction, afterHandel) {
      if (checkFunction instanceof Function) {
        const res = checkFunction()
        if (res instanceof Promise) {
          res.then(c => {
            c && afterHandel()
          })
        } else {
          res && afterHandel()
        }
      } else {
        // checkFunction && afterHandel()
        checkFunction || afterHandel()
      }
    }

    // 新建对话框实例
    const dialogInstance = new Vue({
      el: dialogDiv,
      parent: _vm,
      data () {
        return {
          visible: true,
          __props__: componentProps.props
        }
      },
      router: _vm.$router,
      store: _vm.$store,
      mounted () {
        this.$on('close', (v) => {
          this.handleClose()
        })
      },
      methods: {
        handleClose () {
          handle(this.$refs[componentRef].onCancel, () => {
            this.visible = false
            this.$refs[componentRef].$emit('close')
            dialogInstance.$destroy()
          })
        },
        handleOk () {
          handle(this.$refs[componentRef].onOK || this.$refs[componentRef].onOk, (res) => {
            // this.visible = false
            this.$refs[componentRef].$emit('ok', this)
          })
        },
        closeDialog () {
          this.visible = false
          dialogInstance.$destroy()
        },
        getDialogCtl () {
          return this.$refs[componentRef]
        },
        handleCustom (btnConfig) {
          handle(this.$refs[componentRef][btnConfig.cb], (res) => {
            this.$refs[componentRef].$emit(btnConfig.cb, this)
          })
        }
      },
      render: function (h) {
        const that = this
        // 对话框属性
        let dialogProps = {
          attrs: Object.assign({}, modalProps, { visible: this.visible }),
          on: Object.assign({}, {
            ok: () => that.handleOk(),
            cancel: () => that.handleClose()
          })
        }

        // 自定义按钮组
        if (modalProps.button && modalProps.button.length) {
          dialogProps = Object.assign({}, dialogProps, {
            scopedSlots: {
              footer: function (props) {
                return h('div', modalProps.button.map(item => {
                  return h(Button, {
                    attrs: { type: item.type ?? 'default' },
                    on: {
                      click: () => that.handleCustom(item)
                    }
                  }, item.name)
                }))
              }
            }
          })
        }
        // 内容属性
        const contentProps = Object.assign({}, componentProps)
        return h(Modal, dialogProps, [h(component, contentProps)])
      }
    })
  }

  Object.defineProperty(Vue.prototype, '$dialog', {
    get: () => {
      return function () {
        dialog.apply(this, arguments)
      }
    }
  })
}
