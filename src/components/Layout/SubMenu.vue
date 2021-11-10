<template functional>
  <a-sub-menu :key="props.menuInfo.routerName" v-bind="$props" v-on="$listeners">
    <span slot="title">
      <span class="anticon">
        <i :class="props.menuInfo.icon" class="iconfont m-r-xs"></i>
      </span>
      <span>{{ props.menuInfo.name }}</span>
    </span>
    <template v-for="item in props.menuInfo.children">
      <a-menu-item v-if="!item.children" :key="item.routerName" >
        <span class="anticon">
          <i :class="item.icon" class="iconfont m-r-xs"></i>
        </span>
        <span>{{ item.name }}</span>
      </a-menu-item>
      <sub-menu v-else :key="item.key" :menu-info="item" />
    </template>
  </a-sub-menu>
</template>
<script>
  export default {
    props: {
      menuInfo: {
        type: Object,
        default: () => {}
      }
    }
  }
</script>
