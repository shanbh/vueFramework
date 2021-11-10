<template>
  <div class="basic-form">
    <cross-ui :form-params="tabParams" :params="params" :key="key"></cross-ui>
  </div>
</template>

<script>
  import CrossUi from '../CrossUi/CrossUi'
  export default {
    name: 'BasicForm',
    data () {
      return {
        key: Math.round(Math.random() * 1000)
      }
    },
    props: {
      params: {
        type: Object,
        default: () => {
          return {}
        }
      },
      tabParams: {
        type: Object,
        default: () => {
          return {}
        }
      }
    },
    components: {
      CrossUi
    },
    created () {
    },
    mounted () {

    },
    computed: {},
    methods: {}
  }
</script>

<style scoped lang="less">
  .basic-form{
    height: 100%;
  }

</style>
