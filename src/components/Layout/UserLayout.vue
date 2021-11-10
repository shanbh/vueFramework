<template>
  <a-layout class="h-full" >
    <a-layout-header>Header</a-layout-header>
    <a-layout>
      <a-layout-content>
        <router-view :key="$route.fullPath"></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>

export default {
  name: 'UserLayout',
  data () {
    return {}
  },
  props: {},
  components: {},
  created () {},
  mounted () {},
  computed: {},
  methods: {},
  watch: {}
}
</script>

<style scoped lang="less">

</style>
