<template>
  <a-config-provider :locale="zh_CN">
    <div id="app">
      <router-view/>
    </div>
  </a-config-provider>

</template>

<script>
  import zh_CN from 'ant-design-vue/lib/locale-provider/zh_CN'
  import moment from 'moment'
  import 'moment/locale/zh-cn'
  import { getCLS, getFID, getLCP, getFCP, getTTFB } from 'web-vitals'

  moment.locale('zh-cn')
  export default {
    data () {
      return {
        zh_CN
      }
    },
    mounted () {
      // console.log('CLS', getCLS())
      getCLS(this.logDelta)
      getFID(this.logDelta)
      getLCP(this.logDelta)
      getFCP(this.logDelta)
      getTTFB(this.logDelta)
      this.getFP()
    },
    methods: {
      logDelta ({ name, id, delta }) {
        console.log(`${name} matching ID ${id} changed by ${delta}`)
      },
      getFP () {
        new PerformanceObserver((entryList, observer) => {
          const entries = entryList.getEntries()
          for (let i = 0; i < entries.length; i++) {
            if (entries[i].name === 'first-paint') {
              console.log('FP', entries[i].startTime)
            }
          }
          // const lastEntry = entries[entries.length - 1]
        }).observe({ entryTypes: ['paint'] })
      }
    }
  }
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;

}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
