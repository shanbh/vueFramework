<template>
  <div class="cross-ui">
    <iframe :src="url" :id="id" ></iframe>
  </div>
</template>

<script>
  import { getForm, getFormData, onMessage, getMisFormData } from './CrossUi.api'
  export default {
    name: 'CrossUi',
    data () {
      return {
        id: Math.round(Math.random() * 1000),
        url: '',
        iframeCtrl: '',
        formData: '',
        baseUrl: process.env.VUE_APP_BASE_URL
      }
    },
    props: {
      formParams: {
        type: Object,
        default: () => {
          return {}
        }
      },
      params: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    components: {},
    created () {
    },
    mounted () {
      this.renderIframe()
      this.initBus()
    },
    computed: {},
    methods: {
      renderIframe () {
        onMessage('childStatus', (data) => {
          const ifr = document.getElementById(this.id)
          this.iframeCtrl = ifr.contentWindow
          this.renderForm()
        })

        const taskId = this.formParams.taskId ? this.formParams.taskId : 0
        this.url = 'plugins/crossUi/formruntime/crossUi.html?projectId=' + this.formParams.projectId +
          '&serverDaprest=' + this.baseUrl + '&businessformid=' + this.formParams.businessFormId + '&formid=' + this.formParams.id +
          '&revisionid=' + this.formParams.revisionId + '&taskId=' + taskId + '&openMode=' + this.formParams.openMode || ''
        if (this.formParams.formType && this.formParams.formType === 'mis') {
          this.url += '&formType=MIS'
        }
      },
      renderForm: function () {
        onMessage('htmlformloaded', () => {
          this.getData()
        })
        getForm({ formId: this.formParams.formDTO.id, formRevisionId: this.formParams.revisionId }).then(resp => {
          const code = 'var formloaded=false;' + resp + "xui.UI.RichEditor.Ext = xui.UI.RichEditor.Ext||{};xui.UI.RichEditor.Ext.rstyle = {backgroundColor:'#dfdfdf'};xui.launch('App', function(){xui('loading').remove();formloaded=true;parent.postMessage('{\"type\":\"htmlformloaded\"}', \"*\");},'cn','vista');"
            const script = this.iframeCtrl.document.createElement('script')
          script.type = 'text/javascript'
          script.appendChild(this.iframeCtrl.document.createTextNode(code))
          this.iframeCtrl.document.getElementById('form-script').appendChild(script)
        })
      },
      getData () {
        if (this.formParams.formData) {
          this.iframeCtrl.formMgr.setData(this.formParams.formData)
        } else {
          if (this.formParams.formType && this.formParams.formType === 'mis') {
            // const _params = {
            //   dataModelName:'项目管理',
            //   keyData:JSON.stringify({
            //       [config.projectBasePackageName]: {
            //         "ID": this.formParams.misId
            //       }
            //     }
            //   ),
            //   formType:this.formParams.formType
            // }
            // getMisFormData( _params ).then( resp => {
            //   this.iframeCtrl.formMgr.setData(resp)
            // })
          } else {
            getFormData({ projectId: this.formParams.projectId }).then(resp => {
              this.iframeCtrl.formMgr.setData(resp)
              this.Event.$emit('INIT_FORM_SUCCESS', { projectId: this.formParams.projectId })
            })
          }
        }
      },
      getFormData () {
        this.formData = this.iframeCtrl.formMgr.getData()
        const params = {
          projectId: this.formParams.projectId,
          businessFormId: this.formParams.businessFormId,
          formData: this.formData
        }
        this.Event.$emit('GET_FORM_DATA_SUCCESS', params)
      },
      /**
       * 更新表单数据
       *
       */
      updateFormData () {
        this.iframeCtrl.formMgr.setData(this.formData)
      },

      /**
       * 重新刷新表单数据
       */
      refreshFormData () {
        getFormData({ projectId: this.formParams.projectId }).then(resp => {
          this.iframeCtrl.formMgr.setData(resp)
        })
      },
      initBus () {
        const _this = this
        this.Event.$on('GET_FORM_DATA', (data) => {
          if (data.projectId == _this.formParams.projectId && _this.formParams.businessFormId == data.businessFormId) {
            _this.getFormData()
          }
        })

        this.Event.$on('UPDATE_FORM_DATA', data => {
          if (data.projectId == _this.formParams.projectId &&
            _this.formParams.businessFormId === data.businessFormId) {
            _this.formData = data.formData
            _this.updateFormData()
          }
        })

        this.Event.$on('refreshFormData', data => {
          if (data.projectId === _this.formParams.projectId &&
            _this.formParams.businessFormId === data.businessFormId) {
            _this.refreshFormData()
          }
        })
        // 保存意见
        this.Event.$on('_SAVE_OPINION_', data => {
          if (data.projectId == _this.formParams.projectId) {
            _this.iframeCtrl._util.saveOpinion()
          }
        })
      }
    }
  }
</script>

<style scoped lang="less">
  .cross-ui{
    width: 100%;
    height: 100%;
    iframe{
      width: 100%;
      height: 100%;
      border: none;
    }
  }
</style>
