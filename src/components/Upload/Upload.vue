<template>
  <div>
    <a-upload
      name="file"
      :multiple="true"
      :custom-request="customRequest"
      action=""
      :show-upload-list="false"
      @change="handleChange"
    >
      <a-icon type="upload" class="cursor-pointer text-green" @click="uploadClick()" />
<!--      <i class="icon iconfont icon-upload cursor-pointer text-green" @click="uploadClick()" ></i>-->
    </a-upload>

    <!--进度条-->
    <div v-if="dialogVisible">
      <a-modal
        title="正在上传"
        :visible="dialogVisible"
        :footer="null"
        :mask="false"

      >

        <div v-for="file in fileList" style="margin-bottom: 10px">
          <span style="font-size: 12px">{{ file.name }}</span>
          <a-progress :percent="file.progress" status="active" :strokeColor="processColor"/>
        </div>

      </a-modal>
    </div>
  </div>
</template>

<script>
import { upload } from '@/api/material'
export default {
  name: 'Upload',
  data () {
    return {
      idLoading: false,
      params: this.$route.params,
      dialogVisible: false,
      fileList: [],
      processColor: '#1bab7d'
    }
  },
  props: {
    currentNode: {
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
  computed: {},
  methods: {
    handleChange (info) {
      console.log(info)
      if (info.file.status !== 'uploading') {
      //  console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        this.$emit('uploadSuccess', info.file)
        this.$message.success(`${info.file.name} 上传成功`)
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} 上传失败`)
      }
    },
    customRequest (context) {
      this.dialogVisible = true
      this.fileList.push(context.file)
      const _data = new FormData()
      _data.append('file', context.file)
      const params = {
        projectId: this.params.projectId,
        directoryInstId: this.currentNode.id
      }
      upload(params, _data, progress => {
        // 进度条
        this.showProgress(context.file, progress)
      }).then(resp => {
        context.onSuccess(resp, context.file)
        this.dialogVisible = false
        this.fileList = []
      })
    },
    uploadClick (row) {

    },
    showProgress (file, progress) {
      this.$forceUpdate()
      this.$set(this.fileList.filter(_file => _file.uid === file.uid)[0], 'progress', progress)
    }
  },
  watch: {}
}
</script>

<style scoped lang="less">

</style>
