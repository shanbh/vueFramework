<template>
  <div class="dist-panel">
    <component :is="component" :params="pageParams" :tab-params="tabParams" :key="key"></component>
  </div>
</template>

<script>
  export default {
    name: 'DistTabsPanel',
    data () {
      return {
        key: Math.round(Math.random() * 1000)
      }
    },
    props: {
      pageParams: {
        type: Object,
        default: () => {
          return {}
        }
      },
      tabType: {
        type: String,
        default: 'form'
      },
      tabComponents: {
        type: Array,
        default: () => {
          return []
        }
      },
      tabParams: {
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
    },
    computed: {
      component () {
        return this.tabComponents.find(item => item.type === this.tabType).component
      }
    },
    methods: {}
  }
</script>

<style scoped lang="less">
  .dist-panel{
    height: 100%;
  }

</style>
