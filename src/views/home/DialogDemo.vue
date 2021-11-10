<template>
  <div class="holiday-schedule-ctl">
    <a-button type="primary" @click="openDialog">
      Primary
    </a-button>
  </div>
</template>

<script>
export default {
  name: 'DialogDemo',
  data () {
    return {
      form: this.projectInfo,
      rules: {
        name: [
          {
            required: true,
            message: "节假日名称必填！",
            trigger: "blur",
          }
        ]
      }
    }
  },
  props: {
    projectInfo: {
      type: Object,
      default:() => {}
    }
  },
  components: {},
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    onOk () {
      console.log('onOk')
      return true
    },
    openDialog () {
      this.$emit('ok')
    },
    test() {
      console.log('test')
      return true
    },
    onChange() {

    }
  },
  watch: {}
}
</script>

<style scoped lang="less">

</style>
