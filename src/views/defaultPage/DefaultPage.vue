<template>
  <a-card :bordered="false">
    <a-result status="error" :title="title" :sub-title="description">
      <template #extra>
        <a-button type="primary" @click="reLogin">重新登录</a-button>
      </template>
      <div class="desc">
        <div style="font-size: 16px; color: rgba(0, 0, 0, 0.85); font-weight: 500; margin-bottom: 16px">
          授权方式如下：
        </div>
        <div style="margin-bottom: 16px">
          <a-icon type="check-circle" style="margin-right: 5px;color: #1890ff"/>
          <!--          <a-icon type="close-circle-o" style="color: #f5222d; margin-right: 8px"/>-->
          请您联系系统管理员为您进行赋权
          <!--          <a style="margin-left: 16px">立即解冻 <a-icon type="right" /></a>-->
        </div>
        <!--        <div>-->
        <!--          <a-icon type="close-circle-o" style="color: #f5222d; margin-right: 8px"/>-->
        <!--          您的账户还不具备申请资格-->
        <!--          <a style="margin-left: 16px">立即升级 <a-icon type="right" /></a>-->
        <!--        </div>-->
      </div>
    </a-result>
  </a-card>
</template>

<script>
  import defaultSettings from '@/config/defaultSettings'
  export default {
    name: 'DefaultPage',
    data () {
      return {
        title: '无权限访问',
        description: '请核对权限后，再重新访问。'
      }
    },
    components: {},
    created () {
    },
    mounted () {
    },
    computed: {},
    methods: {
      reLogin () {
        window.location.href = defaultSettings.logConfig.logout
      }
    }
  }
</script>

<style scoped lang="less">

</style>
