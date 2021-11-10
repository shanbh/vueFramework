<template>
  <div>
    <a-page-header
      style="border: 1px solid rgb(235, 237, 240)"
      title="Title"
      sub-title="This is a subtitle"
      @back="() => $router.go(-1)"
    />
  </div>
</template>

<script>
export default {
  name: 'Detail',
  data() {
    return {}
  },
  props: {},
  components: {},
  created() {
  },
  mounted() {
  },
  computed: {},
  methods: {},
  watch: {}
}
</script>

<style scoped lang="less">

</style>