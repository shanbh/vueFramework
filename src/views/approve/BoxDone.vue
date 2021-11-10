<template>
  <div style="padding: 50px">
    <a-button type="primary" @click="changeTabName">
      改变tabName
    </a-button>
  </div>
</template>

<script>
export default {
  name: 'BoxDone',
  data () {
    return {}
  },
  components: {},
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    changeTabName () {
      const id = Math.round(Math.random() * 1000)
      this.updateTabName(`测试${id}`)
    }
  }
}
</script>

<style scoped lang="less">

</style>
