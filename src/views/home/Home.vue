<template>
  <div class="display-flex h-full">
    <a-table :columns="columns" :data-source="data">
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
      <span slot="tags" slot-scope="tags">
        <a-tag
          v-for="tag in tags"
          :key="tag"
          :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'"
        >
          {{ tag.toUpperCase() }}
        </a-tag>
      </span>
      <span slot="action" slot-scope="text, record">
        <a>Invite 一 {{ record.name }}</a>
        <a-divider type="vertical" />
        <a>Delete</a>
        <a-divider type="vertical" />
        <a class="ant-dropdown-link"> More actions <a-icon type="down" /> </a>
      </span>
    </a-table>
  </div>
</template>

<script>
import DialogDemo from '@v/home/DialogDemo'
const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' }
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address'
  },
  {
    title: 'Tags',
    key: 'tags',
    dataIndex: 'tags',
    scopedSlots: { customRender: 'tags' }
  },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer']
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser']
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    tags: ['cool', 'teacher']
  }
]
const tab = [
  {
    name: '页面1',
    key: '1',
    children: [
      {
        name: '子页面1',
        key: '1-1',
        routerName: 'page'
      },
      {
        name: '子页面2',
        key: '1-2',
        routerName: 'page1'
      }
    ]
  },
  {
    name: '页面2',
    key: '2',
    children: [
      {
        name: '子页面2-1',
        key: '2-1',
        routerName: 'page'
      },
      {
        name: '子页面2-2',
        key: '2-2',
        routerName: 'page'
      }
    ]
  }
]
export default {
  name: 'Home',
  data () {
    return {
      dateList: [],
      data,
      visible: false,
      projectInfo: {},
      tab,
      columns
    }
  },
  components: {
    DialogDemo
  },
  created () {
  },
  mounted () {
  },
  computed: {},
  methods: {
    handleSideMenuClick ({ item, key, pathKey }) {
      const sideMenu = this.getSideMenuByKey(this.tab, key)
      console.log(sideMenu)
    },
    /**
     * 通过key获取所点击的目录详情
     * @param key
     */
    getSideMenuByKey (menus, key) {
      for (const item of menus) {
        if (item.key === key) {
          return item
        }
        if (item.children) {
          return this.getSideMenuByKey(item.children, key)
        }
      }
    },
    goto () {
      this.$router.push({ name: 'detail' })
    }
  },
  watch: {
    '$route' (to, from) {
        // console.log(to)
    }
  }
}
</script>

<style scoped lang="less">
.home{
  display: flex;
  &-left{
    width: 160px;
  }
}

</style>
