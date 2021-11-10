<template>
  <div class="material-manage">
    <a-table
      bordered
      v-if="inRender"
      :expandIcon="expandIcon"
      :columns="columns"
      :rowKey="record => record.id"
      :data-source="materialTree"
      :default-expand-all-rows="true"
      :pagination="false">
      <!--expandIcon插槽不起作用-->
      <!--<a-icon slot="expandIcon" slot-scope="props" :type="[props.expanded ? 'down' :'up']" />-->
      <template slot="action" slot-scope="text, record">
        <div v-if="record.type === 'materialDirectory' && customHandle.materialDirectory && customHandle.materialDirectory.length">
          <upload :currentNode="record" @uploadSuccess="uploadSuccess"></upload>
        </div>
        <div v-if="record.type === 'materialFile' && customHandle.materialFile && customHandle.materialFile.length">
          <span v-for="auth in customHandle.materialFile" :key="Math.random()">
            <a-icon
              :type="auth.icon"
              :style="{ color: auth.color }"
              class="m-r-sm cursor-pointer"
              @click="handleClick(auth, record)">

            </a-icon>
          </span>
          <!--          <a-icon type="download" class="m-r-sm cursor-pointer text-green" @click="download(record)"/>-->
          <!--          <a-icon type="eye" class="m-r-sm cursor-pointer text-blue" @click="preview(record)"/>-->
          <!--          <a-icon type="delete" class="cursor-pointer text-red" @click="deleteFile(record)"/>-->

          <!--          <i class="icon iconfont icon-down1 m-r-sm cursor-pointer text-green" @click="download(record)"></i>-->
          <!--          <i class="icon iconfont icon-preview m-r-sm cursor-pointer text-blue" @click="preview(record)"></i>-->
          <!--          <i class="icon iconfont icon-delete1 m-r-sm cursor-pointer text-red" @click="deleteFile(record)"></i>-->

        </div>
      </template>

      <template slot="name" slot-scope="text,record">
        <i
          class="icon iconfont m-r-sm text-yellow"
          :class="[record.showOpenFolder ? 'icon-folder-open':'icon-folder']"
          v-if="record.type === 'materialDirectory'||record.type === 'materialCategory'"></i>
        <span>{{ record.name }}</span>
      </template>
    </a-table>
  </div>

</template>

<script>
  import Upload from '../Upload/Upload'
  import materialApi from '@/api/material'
  import api from '@/api/form'

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      scopedSlots: { customRender: 'name' }
    },
    {
      title: '上传时间',
      dataIndex: 'addDate',
      key: 'addDate',
      width: '18%',
      align: 'center'

    },
    {
      title: '大小',
      dataIndex: 'fileSize',
      key: 'fileSize',
      width: '10%',
      align: 'center'
    },
    {
      title: '操作',
      key: 'action',
      width: '20%',
      scopedSlots: { customRender: 'action' },
      align: 'center'
    }
  ]

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
    name: 'MaterialManage',
    data () {
      return {
        columns,
        inRender: false,
        materialTree: [],
        params: this.$route.params,
        showOpenFolder: false,
        customHandle: {},
        query: this._.cloneDeep(this.$route.query)
      }
    },
    props: {
      materialList: {
        type: Array,
        default: () => {
          return []
        }
      },
      tabParams: {
        type: Array,
        default: () => {
          return []
        }
      }
    },
    components: {
      Upload
    },
    created () {
    },
    mounted () {
      /* this.materialTree=this.tabParams */
      this.getProjectResourceList()
      this.initMaterialAuth()
    },
    computed: {},
    methods: {
      async getProjectResourceList () {
        const params = {
          projectId: this.params.projectId,
          listType: 'project',
          loadForm: false,
          loadReport: false,
          loadMaterial: true
        }
        this.projectResourceList = await api.getProjectResourceList(params)
        const materialResourceList = this.projectResourceList.filter(item => item.type === 'materialNode')
        this.materialTree = materialResourceList ? materialResourceList[0].children : []
      },

      download (file) {
        const params = {
          materialId: file.id,
          projectId: this.params.projectId
        }
        materialApi.downloadMaterial(params)
      },
      preview (file) {
        this.Event.$emit('addTabs', file)
      },

      deleteFile (file) {
        const _params = {
          projectId: this.params.projectId,
          materialId: file.id
        }
        materialApi.deleteMaterial(_params).then(resp => {
          this.getProjectResourceList()
          this.$success({
            content: '删除成功'
          })
        })
      },

      uploadSuccess (data) {
        this.getProjectResourceList()
        this.Event.$emit('_REFRESH_MATERIAL_TREE_', { projectId: this.params.projectId })
      },
      expandIcon (props) {
        if (props.record.type !== 'materialFile') {
          if (props.expanded) {
            props.record.showOpenFolder = true
            return <a-icon type="down" class="m-r-sm" style="color:#9C9C9C;" onClick={e => {
              props.record.showOpenFolder = !props.record.showOpenFolder
              props.onExpand(props.record, e)
            }}/>
          } else {
            props.record.showOpenFolder = false
            return <a-icon type="right" class="m-r-sm" style="color:#9C9C9C;" onClick={e => {
              props.record.showOpenFolder = !props.record.showOpenFolder
              props.onExpand(props.record, e)
            }}/>
          }
        } else {
          return <span class="m-r-sm"></span>
        }
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
      },
      handleClick (item, record) {
        switch (item.name) {
          case '下载': {
            this.download(record)
            break
          }
          case '预览': {
            this.Event.$emit('addTabs', record)
            break
          }
          case '删除': {
            break
          }
        }
      }
    },
    watch: {

      materialTree (val) {
        this.inRender = true
      }

      /* materialList(val){
         this.materialTree=this.materialList
       }, */

    }
  }
</script>

<style scoped lang="less">
  .material-manage {
    background: #fff;
    width: 100%;
    height: calc(100% - 41px);
    overflow: auto;
    /deep/ .ant-table-thead > tr > th {
      text-align: center;
    }

    /deep/  .ant-table-thead > tr > th,
    /deep/ .ant-table-tbody > tr > td{
      padding: 8px 12px;
    }

  }
</style>
