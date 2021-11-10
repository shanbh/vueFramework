<template>
  <div class="personal-setting">
    <div>
      <span>{{ userInfo.userName || '' }}</span> | <span>{{ userUnit.shortName || '' }}</span>
    </div>
    <a-badge dot>
      <a-icon title="消息" type="message" @click="handleMessage" />
    </a-badge>
    <a-dropdown placement="bottomRight">
      <a-icon title="设置" type="setting" />
      <template v-slot:overlay>
        <a-menu class="ant-pro-drop-down menu" :selected-keys="[]">
          <a-menu-item key="changPassword" @click="handlePassword">
            <a-icon type="edit" />
            修改密码
          </a-menu-item>
          <a-menu-item key="commonLanguage" @click="handleCommonLanguage">
            <a-icon type="appstore" />
            常用语管理
          </a-menu-item>
          <a-menu-item key="proxySet" @click="handleProxy">
            <a-icon type="setting" />
            代理设置
          </a-menu-item>
        </a-menu>
      </template>
    </a-dropdown>
    <a-icon title="帮助" type="question-circle" @click="handleHelp" />
    <a-icon title="注销" type="poweroff" @click="logout" />
  </div>
<!--  <div v-else>-->
<!--    <a-spin size="small" :style="{ marginLeft: 8, marginRight: 8 }" />-->
<!--  </div>-->

</template>

<script>
import api from '@/api/common'

export default {
  name: 'PersonalSetting',
  data () {
    return {
      labelCol: { span: 5 },
      wrapperCol: { span: 18 },
      passwordVisible: false,
      formData: {
        userLoginName: ''
      },
      showContent: false,
      showConfirm: false,
      selectedType: 0,
      showCommonLanguage: false,
      commonLanguageList: []
    }
  },
  props: {
    setting: {
      type: Object,
      default: () => {}
    }
  },
  components: {},
  created () {
  },
  mounted () {
    this.formData.userLoginName = this.userInfo.userName
  },
  computed: {},
  methods: {
    handleMessage () {

    },
    handlePassword () {
      this.passwordVisible = true
      this.formData.userLoginName = this.userInfo.userName
    },
    // 确认修改密码
    handleOkEditPassword () {
      if (this.formData.oldPassword) {
        if (this.formData.newPassword) {
          if (this.formData.confirmPassword) {
            if (this.formData.confirmPassword == this.formData.newPassword) {
              this.checkPassword(this.formData.newPassword)
            } else {
              this.$warning({ content: '两次密码不一致，请再次确认密码' })
            }
          } else {
            this.$warning({ content: '请确认新密码' })
          }
        } else {
          this.$warning({ content: '请确认新密码' })
        }
      } else {
        this.$warning({ content: '请确认新密码' })
      }
    },
    // 判断新旧密码是否一致
    handleNewPassword () {
      if (this.formData.newPassword == this.formData.oldPassword && this.formData.newPassword) {
        this.showContent = true
      } else {
        this.showContent = false
      }
      if (this.formData.newPassword != this.formData.confirmPassword && this.formData.confirmPassword) {
        this.showConfirm = true
      } else {
        this.showConfirm = false
      }
    },
    // 确认两次密码是否一致
    handleConfirm () {
      if (this.formData.newPassword != this.formData.confirmPassword) {
        this.showConfirm = true
      } else {
        this.showConfirm = false
      }
    },
    // 取消修改密码
    handleCancelEdit () {
      this.passwordVisible = false
      this.formData = {}
      this.showContent = false
      this.showConfirm = false
    },
    // 检查密码格式
    checkPassword (password) {
      if (password.length < 8) {
        this.$warning({ content: '新密码至少8位' })
        return
      }
      var ls = 0
      if (password.match(/([a-z])+/)) {
        ls++
      }
      if (password.match(/([0-9])+/)) {
        ls++
      }
      if (password.match(/([A-Z])+/)) {
        ls++
      }
      if (password.match(/[^a-zA-Z0-9]+/)) {
        ls++
      }
      if (ls < 3) {
        this.$warning({ content: '新密码：由(特殊字符(-!@#$%^&*)/大写字母/小写字母/数字)任意三者组成，至少8位' })
        return
      }
      this.doChange()
    },
    // 修改密码
    doChange () {
      const _params = this.selectedType == '0' ? 0 : 1
      api.changePassword({
        oldPwd: this.formData.oldPassword,
        newPwd: this.formData.newPassword,
        pwdType: _params
      }).then(data => {
        if (data == '修改成功!') {
          this.$success({ content: data })
          this.passwordVisible = false
        } else {
          this.$warning({ content: data })
        }
      })
    },
    handleCommonLanguage () {
      api.listPractice({
      }).then(resp => {
        this.commonLanguageList = resp.list
        this.showCommonLanguage = true
      })
    },
    handleProxy () {

    },
    handleHelp () {

    },
    logout () {
      window.location.href = this.setting.logConfig.logout
    }
  }
}
</script>

<style scoped lang="less">
.personal-setting{
  display: flex;
  color: white;
  align-items: center;
  font-size: 16px;
  i{
    margin-left: 5px;
    cursor: pointer;
  }
}
</style>
<style>
.showConfirm{
  margin-bottom: 0;
  line-height: 30px;
  color: red;
}
</style>
