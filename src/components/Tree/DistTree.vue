<template>
  <a-tree
    v-if="renderTree"
    v-model="checkedKeys"
    :checkable="checkable"
    :default-expanded-keys="defaultExpandedKeys"
    :auto-expand-parent="autoExpandParent"
    :selected-keys="selectedKeys"
    :tree-data="treeData"
    :replace-fields="replaceFields"
    default-expand-all
    @expand="onExpand"
    @load="onLoad"
  >

    <template slot="custom" slot-scope="item">
      <div
        class="node-title text_ellipsis"
        @click="selectNode(item)"
        style="display: inline-block;"
        :title="item[replaceFields.title]">
        <i
          slot="icon"
          class="icon iconfont text-yellow"
          :class="[item.isOpen?'icon-folder-open':'icon-folder']"
          v-if="item.type==='materialDirectory'||item.type==='materialCategory'"></i>
        {{ item[replaceFields.title] }}
      </div>
      <span class="custom-handle" v-if="item.type === 'materialDirectory' && customHandle.materialDirectory && customHandle.materialDirectory.length">
        <upload :currentNode="item" @uploadSuccess="uploadSuccess"></upload>
      </span>
      <span class="custom-handle" v-if="item.type === 'materialFile' && customHandle.materialFile && customHandle.materialFile.length">
        <span v-for="auth in customHandle.materialFile" :key="Math.random()">
          <a-icon
            :title="auth.name"
            :type="auth.icon"
            :style="{ color: auth.color }"
            class="m-r-xxs cursor-pointer"
            @click="materialHandle(auth, item)">

          </a-icon>
        </span>
      </span>
    </template>
  </a-tree>
</template>

<script>
import Upload from '@c/Upload/Upload'
const customHandle = {
  materialDirectory: [
    {
      name: '上传',
      icon: 'upload',
      cb: 'upload'
    }
  ],
  materialFile: [
    {
      name: '下载',
      icon: 'download',
      cb: 'download',
      color: '#6DD400'
    },
    {
      name: '预览',
      icon: 'eye',
      cb: 'preView',
      color: '#3387EA'
    },
    {
      name: '删除',
      icon: 'delete',
      cb: 'remove',
      color: 'red'
    }
  ]
}
export default {
  name: 'DistTree',
  data () {
    return {
      renderTree: false,
      expandedKeys: [],
      autoExpandParent: false,
      checkedKeys: [],
      selectedKeys: [],
      defaultExpandedKeys: [],
      query: this._.cloneDeep(this.$route.query),
      customHandle: {}
    }
  },
  props: {
    treeId: {
      type: String,
      default: () => {
        return 'distTree_' + Date.parse(new Date())
      }
    },
    checkable: {
      type: Boolean,
      default: () => false
    },
    replaceFields: {
      type: Object,
      default: () => {
        return {
          children: 'children',
          title: 'title',
          key: 'key'
        }
      }
    },
    treeData: {
      type: Array,
      default: () => {
        return []
      }
    },
    defaultExpandAll: {
      type: Boolean,
      default: () => false
    },
    select: {
      type: Function,
      default: () => {
        return () => {}
      }
    },
    load: {
      type: Function,
      default: () => {
        return () => {}
      }
    },
    check: {
      type: Function,
      default: () => {
        return () => {}
      }
    }
  },
  components: { Upload },
  created () {
  },
  mounted () {
    this.initMaterialAuth()
  },
  computed: {},
  methods: {
    onExpand (expandedKeys, expanded) {
      // console.log('onExpand', expandedKeys)
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
      this.checkNodeIsOpen(this.treeData, expanded.node.eventKey, expanded.expanded)
    },
    onCheck (checkedKeys) {
      // console.log('onCheck', checkedKeys)
      this.checkedKeys = checkedKeys
    },
    onSelect (selectedKeys, info) {
      // console.log('onSelect', info)
      this.selectedKeys = selectedKeys
      this.$emit('input', selectedKeys)
      this.$emit('select', selectedKeys)
      if (typeof this.select === 'function') {
        this.select(selectedKeys)
      }
    },
    onLoad () {
      this.$emit('load')
    },
    initExpandKeys (treeData, parentKey) {
      treeData.forEach(item => {
        item.parentKey = parentKey
        item.scopedSlots = { title: 'custom' }
        item.isOpen = true
        if (item.open && item.open === true) {
          this.defaultExpandedKeys.push(item[this.replaceFields.key])
        }
        if (item.children) {
          this.initExpandKeys(item.children, item[this.replaceFields.key])
        }
      })
    },
    checkNodeIsOpen (treeData, nodeKey, expanded) {
      treeData.forEach(item => {
        if (item[this.replaceFields.key] == nodeKey) {
          item.isOpen = expanded
        }
        if (item.children) {
          this.checkNodeIsOpen(item.children, nodeKey, expanded)
        }
      })
    },
    materialHandle (handle, node) {
      const data = {
        handle: handle.cb,
        file: node,
        treeId: this.treeId
      }
      this.Event.$emit('materialHandle', data)
    },
    uploadSuccess (data) {
      // 刷新右侧材料树
      data.treeId = this.treeId
      this.Event.$emit('FORMRIGHT_MATERIAL_REFRESH', data)
    },
    selectNode (item) {
      console.log('selectNode', item)
    },
    initMaterialAuth () {
      switch (this.query.materialAuth) {
        case 'edit': {
          this.customHandle = customHandle
          break
        }
        case 'readonly': {
          this.customHandle = {
            materialFile: [
              {
                name: '下载',
                icon: 'download',
                cb: 'download',
                color: '#6DD400'
              },
              {
                name: '预览',
                icon: 'eye',
                cb: 'preView',
                color: '#3387EA'
              }
            ]
          }
        }
      }
    }
  },
  watch: {
    checkedKeys (val) {
      console.log('onCheck', val)
    },
    treeData (val) {
      if (val.length > 0) {
        this.renderTree = true
        this.initExpandKeys(this.treeData, null)
      }
    }
  }
}
</script>

<style scoped lang="less">
/deep/ .ant-tree-treenode-switcher-open{
  position: relative;
}
/deep/ .ant-tree-treenode-switcher-close{
  position: relative;
}
/deep/ .ant-tree-node-content-wrapper:hover{
  background-color: white !important;
}
.custom-handle {
position: absolute;
  right: -20px;
}
.text_ellipsis{
  width:150px;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap;
}
  .ml5{
    margin-left: 5px;
  }

</style>
