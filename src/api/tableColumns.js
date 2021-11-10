
const columns = {
  archiveLib: [
    {
      title: '档案编号',
      name: 'DABH',
      dataIndex: 'DABH',
      width: '9%'
    },
    {
      title: '档案名称',
      name: 'DAMC',
      dataIndex: 'DAMC',
      ellipsis: true
    },
    {
      title: '档案类型',
      name: 'DALX',
      dataIndex: 'DALX'
    },
    {
      title: '业务类型',
      name: 'YWLX',
      dataIndex: 'YWLX'
    },
    {
      title: '提交科室',
      name: 'TJKS',
      dataIndex: 'TJKS'
    },
    {
      title: '保管期限',
      name: 'BGQX',
      dataIndex: 'BGQX',
      ellipsis: true,
      width: '9%'
    },
    {
      title: '案卷数量',
      name: 'AJSL',
      dataIndex: 'AJSL',
      width: '9%'
    },
    {
      title: '著录人',
      name: 'ZLR',
      dataIndex: 'ZLR'
    },
    {
      title: '著录时间',
      name: 'ZLSJ',
      dataIndex: 'ZLSJ',
      customRender: (text, record, index) => {
        return text && text.split(' ')[0]
      },
      width: '10%'
    },
    {
      title: '归档时间',
      name: 'GDSJ',
      dataIndex: 'GDSJ',
      customRender: (text, record, index) => {
        return text && text.split(' ')[0]
      },
      width: '10%'
    }
  ],
  borrowApproval: [
    {
      title: '流水号',
      name: 'LSH',
      dataIndex: 'LSH',
      width: 150
    },
    {
      title: '档案名称',
      name: 'DAMC',
      dataIndex: 'DAMC'
    },
    {
      title: '申请类型',
      name: 'SQLX',
      dataIndex: 'SQLX',
      width: '8%'
    },
    {
      title: '借阅类型',
      name: 'JYLX',
      dataIndex: 'JYLX',
      width: '7%'

    },
    {
      title: '借阅人',
      name: 'JYR',
      dataIndex: 'JYR',
      width: '9%'

    },
    {
      title: '所属部门',
      name: 'SSBM',
      dataIndex: 'SSBM',
      width: '8%'

    },
    {
      title: '联系电话',
      name: 'LXDH',
      dataIndex: 'LXDH',
      width: '11%'
    },
    {
      title: '当前环节',
      name: 'DQHJ',
      dataIndex: 'DQHJ',
      width: '7%'

    },
    {
      title: '借阅日期',
      name: 'JYRQ',
      dataIndex: 'JYRQ',
      width: '8%'

    },
    {
      title: '预计归还日期',
      name: 'YJGHRQ',
      dataIndex: 'YJGHRQ',
      width: '9%'
    }
  ],
  libraryArchive: [
    {
      title: '档案编号',
      name: 'DABH',
      dataIndex: 'DABH',
      width: '12%'
    },
    {
      title: '档案名称',
      name: 'DAMC',
      dataIndex: 'DAMC',
      ellipsis: true
    },
    {
      title: '档案类型',
      name: 'DALX',
      dataIndex: 'DALX',
      width: '15%'
    },
    // {
    //   title: '业务类型',
    //   name:"YWLX",
    //   dataIndex: 'YWLX',
    // },
    {
      title: '提交科室',
      name: 'TJKS',
      dataIndex: 'TJKS',
      width: '13%'
    },
    {
      title: '保管期限',
      name: 'BGQX',
      dataIndex: 'BGQX',
      width: '9%'
    },
    {
      title: '案卷数量',
      name: 'AJSL',
      dataIndex: 'AJSL',
      width: '9%'
    },
    {
      title: '著录人',
      name: 'ZLR',
      dataIndex: 'ZLR',
      width: '10%'
    },
    {
      title: '著录时间',
      name: 'ZLSJ',
      dataIndex: 'ZLSJ',
      customRender: (text, record, index) => {
        return text && text.split(' ')[0]
      },
      width: '12%'
    }
    // {
    //   title: '环节',
    //   name:"STATUS",
    //   dataIndex: 'STATUS',
    //   width: 70
    // },
  ],
  myBorrow: [
    {
      title: '收藏',
      name: 'ICON',
      dataIndex: 'ICON',
      scopedSlots: { customRender: 'like' },
      width: '6%'
    },
    {
      title: '流水号',
      name: 'LSH',
      dataIndex: 'LSH',
      width: '11%'
    },
    {
      title: '档案名称',
      name: 'DAMC',
      dataIndex: 'DAMC',
      width: '11%'

    },
    // {
    //   title: '文件数量',
    //   name:"WJSL",
    //   dataIndex: 'WJSL',
    //   width: 90
    // },
    {
      title: '借阅类型',
      name: 'JYLX',
      dataIndex: 'JYLX',
      width: '7%'
    },
    {
      title: '当前环节',
      name: 'DQHJ',
      dataIndex: 'DQHJ',
      width: '7%'
    },
    {
      title: '审核结果',
      name: 'SHJG',
      dataIndex: 'SHJG',
      width: '6%'
    },
    {
      title: '借阅日期',
      name: 'JYRQ',
      dataIndex: 'JYRQ',
      width: '8%'
    },
    {
      title: '预计归还日期',
      name: 'YJGHRQ',
      dataIndex: 'YJGHRQ',
      width: '9%'
    },
    {
      title: '是否已归还',
      name: 'SFYGH',
      dataIndex: 'SFYGH',
      width: '7%'
    },
    {
      title: '借阅次数',
      name: 'BORROWINGNUM',
      dataIndex: 'BORROWINGNUM',
      width: '7%'
    },
    {
      title: '实际归还日期',
      name: 'SJGHRQ',
      dataIndex: 'SJGHRQ',
      width: '9%'
    },
    {
      title: '剩余时间',
      name: 'SYSJ',
      dataIndex: 'SYSJ',
      scopedSlots: { customRender: 'timeRemain' },
      width: '9%'
    },
    {
      title: '创建人',
      name: 'CREATEUSERNAME',
      dataIndex: 'CREATEUSERNAME',
      width: '7%'
    },
    {
      title: '操作',
      name: '',
      dataIndex: '',
      scopedSlots: { customRender: 'cancelBorrow' },
      width: '7%'
    }
  ],
  archiveUseborrowRecord: [
    {
      title: '收藏',
      name: 'ICON',
      dataIndex: 'ICON',
      scopedSlots: { customRender: 'like' },
      width: '5%'
    },
    {
      title: '流水号',
      name: 'LSH',
      dataIndex: 'LSH',
      width: '11%'
    },
    {
      title: '档案名称',
      name: 'DAMC',
      dataIndex: 'DAMC'
    },
    // {
    //   title: '文件数量',
    //   name:"WJSL",
    //   dataIndex: 'WJSL',
    //   width: 90
    // },
    {
      title: '借阅类型',
      name: 'JYLX',
      dataIndex: 'JYLX',
      width: '7%'
    },
    {
      title: '当前环节',
      name: 'DQHJ',
      dataIndex: 'DQHJ',
      width: '7%'
    },
    {
      title: '审核结果',
      name: 'SHJG',
      dataIndex: 'SHJG',
      width: '7%'
    },
    {
      title: '借阅日期',
      name: 'JYRQ',
      dataIndex: 'JYRQ',
      width: '8%'
    },
    {
      title: '预计归还日期',
      name: 'YJGHRQ',
      dataIndex: 'YJGHRQ',
      width: '9%'
    },
    {
      title: '是否已归还',
      name: 'SFYGH',
      dataIndex: 'SFYGH',
      width: '8%'
    },
    {
      title: '实际归还日期',
      name: 'SJGHRQ',
      dataIndex: 'SJGHRQ',
      width: '9%'
    },
    {
      title: '剩余时间',
      name: 'SYSJ',
      dataIndex: 'SYSJ',
      scopedSlots: { customRender: 'timeRemain' },
      width: '8%'
    },
    {
      title: '创建人',
      name: 'CREATEUSERNAME',
      dataIndex: 'CREATEUSERNAME',
      width: '8%'
    }
  ],

  myCollection: [
    {
      title: '',
      name: 'ICON',
      dataIndex: 'ICON',
      scopedSlots: { customRender: 'like' },
      width: '4%'
    },
    {
      title: '档案编号',
      name: 'DABH',
      dataIndex: 'DABH',
      width: '10%'
    },
    {
      title: '档案名称',
      name: 'DAMC',
      dataIndex: 'DAMC',
      ellipsis: true
    },
    {
      title: '档案类型',
      name: 'DALX',
      dataIndex: 'DALX'
    },
    {
      title: '业务类型',
      name: 'YWLX',
      dataIndex: 'YWLX',
      width: '20%'
    },
    {
      title: '归档时间',
      name: 'GDSJ',
      dataIndex: 'GDSJ'
    }
  ],
  borrowRecord: [
      {
        title: '流水号',
        name: 'LSH',
        dataIndex: 'LSH'
      },
      {
        title: '档案名称',
        name: 'DAMC',
        dataIndex: 'DAMC'
      },
      {
        title: '借阅类型',
        name: 'JYLX',
        dataIndex: 'JYLX',
        width: 90
      },
      {
        title: '借阅人',
        name: 'JYR',
        dataIndex: 'JYR',
        width: 90
      },
      {
        title: '所在部门',
        name: 'SZBM',
        dataIndex: 'SZBM',
        width: 90
      },
      {
        title: '联系电话',
        name: 'LXDH',
        dataIndex: 'LXDH'
      },
      {
        title: '当前环节',
        name: 'DQHJ',
        dataIndex: 'DQHJ',
        width: 90
      },
      {
        title: '审核结果',
        name: 'SHJG',
        dataIndex: 'SHJG',
        width: 90

      },
      {
        title: '借阅日期',
        name: 'JYRQ',
        dataIndex: 'JYRQ'
      },
      {
        title: '预计归还日期',
        name: 'YJGHRQ',
        dataIndex: 'YJGHRQ',
        width: 80
      },
      {
        title: '是否已归还',
        name: 'SFYGH',
        dataIndex: 'SFYGH',
        width: 80
      },
      {
        title: '剩余时间',
        name: 'SYSJ',
        dataIndex: 'SYSJ',
        width: 90

      },
      {
        title: '续借次数',
        name: 'XJCS',
        dataIndex: 'XJCS',
        width: 90
      },
      {
        title: '续借时长',
        name: 'XJSC',
        dataIndex: 'XJSC',
        width: 90
      }

  ],
  reserveManage: [
    // {
    //   title: '',
    //   name: "ICON",
    //   dataIndex: 'ICON',
    //   width: 50,
    //   scopedSlots: { customRender: 'status' },
    // },
    {
      title: '档案编号',
      name: 'DABH',
      dataIndex: 'DABH',
      width: '12%'
    },

    {
      title: '档案名称',
      name: 'DAMC',
      dataIndex: 'DAMC',
      ellipsis: true
    },
    {
      title: '档案类型',
      name: 'DALX',
      dataIndex: 'DALX'
    },

    {
      title: '提交科室',
      name: 'TJKS',
      dataIndex: 'TJKS',
      width: '10%'
    },
    {
      title: '保管期限',
      name: 'BGQX',
      dataIndex: 'BGQX',
      width: '9%'
    },
    {
      title: '案卷数量',
      name: 'AJSL',
      dataIndex: 'AJSL',
      width: '9%'
    },
    {
      title: '库位',
      name: 'DAKWID',
      dataIndex: 'DAKWID',
      width: '8%'
    },
    {
      title: '登记人',
      name: 'ZLR',
      dataIndex: 'ZLR',
      width: '10%'
    },
    {
      title: '登记时间',
      name: 'ZLSJ',
      dataIndex: 'ZLSJ',
      customRender: (text, record, index) => {
        return text && text.split(' ')[0]
      },
      width: '10%'
    }

  ],
  recycleBin: [
    {
      title: '档案编号',
      name: 'DABH',
      dataIndex: 'DABH',
      width: '12%'
    },
    {
      title: '档案名称',
      name: 'DAMC',
      dataIndex: 'DAMC'
    },
    {
      title: '档案类型',
      name: 'DALX',
      dataIndex: 'DALX'
    },
    // {
    //   title: '大小',
    //   name:"DX",
    //   dataIndex: 'DX',
    //   width: 80
    // },
    {
      title: '删除操作人',
      name: 'SCCZR',
      dataIndex: 'SCCZR',
      width: 110
    },
    {
      title: '删除日期',
      name: 'SCRQ',
      dataIndex: 'SCRQ',
      width: '12%'
    },
    {
      title: '操作',
      name: 'CZ',
      dataIndex: 'CZ',
      scopedSlots: { customRender: 'action' },
      width: 130
    }
  ],
  archiveRecord: [
    {
      title: '档案编号',
      name: 'DABH',
      dataIndex: 'DABH',
      width: '12%'
    },
    {
      title: '档案名称',
      name: 'DAMC',
      dataIndex: 'DAMC',
      ellipsis: true
    },
    {
      title: '档案类型',
      name: 'DALX',
      dataIndex: 'DALX'
    },
    // {
    //   title: '业务类型',
    //   name:"YWLX",
    //   dataIndex: 'YWLX',
    // },
    {
      title: '提交科室',
      name: 'TJKS',
      dataIndex: 'TJKS'
    },
    {
      title: '保管期限',
      name: 'BGQX',
      dataIndex: 'BGQX',
      ellipsis: true,
      width: 100
    },
    {
      title: '案卷数量',
      name: 'AJSL',
      dataIndex: 'AJSL',
      width: '9%'
    },
    {
      title: '著录人',
      name: 'ZLR',
      dataIndex: 'ZLR',
      width: '10%'
    },
    {
      title: '著录时间',
      name: 'ZLSJ',
      dataIndex: 'ZLSJ',
      customRender: (text, record, index) => {
        return text && text.split(' ')[0]
      }
    },
    {
      title: '归档时间',
      name: 'GDSJ',
      dataIndex: 'GDSJ',
      customRender: (text, record, index) => {
        return text && text.split(' ')[0]
      }
    },
    {
      title: '操作',
      name: 'dailyRecord',
      scopedSlots: { customRender: 'dailyRecord' },
      width: 70
    }
  ],
  electronRecord: [
    {
      title: '档案编号',
      name: 'DABH',
      dataIndex: 'DABH'
    },
    {
      title: '档案名称',
      name: 'DAMC',
      dataIndex: 'DAMC',
      ellipsis: true
    },
    {
      title: '档案类型',
      name: 'DALX',
      dataIndex: 'DALX'
    },
    // {
    //   title: '业务类型',
    //   name:"YWLX",
    //   dataIndex: 'YWLX',
    // },
    {
      title: '提交科室',
      name: 'TJKS',
      dataIndex: 'TJKS'
    },
    {
      title: '保管期限',
      name: 'BGQX',
      dataIndex: 'BGQX',
      ellipsis: true,
      width: 100
    },
    {
      title: '案卷数量',
      name: 'AJSL',
      dataIndex: 'AJSL',
      width: 90
    },
    {
      title: '著录人',
      name: 'ZLR',
      dataIndex: 'ZLR'
    },
    {
      title: '著录时间',
      name: 'ZLSJ',
      dataIndex: 'ZLSJ',
      customRender: (text, record, index) => {
        return text && text.split(' ')[0]
      }
    },
    {
      title: '归档时间',
      name: 'GDSJ',
      dataIndex: 'GDSJ',
      customRender: (text, record, index) => {
        return text && text.split(' ')[0]
      }
    }
  ],

  archiveQuery: [
    {
      title: '收藏',
      name: 'ICON',
      dataIndex: 'ICON',
      scopedSlots: { customRender: 'like' },
      width: '7%'
    },
    {
      title: '档案编号',
      name: 'DABH',
      dataIndex: 'DABH',
      width: '13%'
    },
    {
      title: '档案名称',
      name: 'DAMC',
      dataIndex: 'DAMC',
      ellipsis: true,
      width: '23%'
    },
    {
      title: '档案类型',
      name: 'DALX',
      dataIndex: 'DALX',
      width: '28%'
    },
    {
      title: '业务类型',
      name: 'YWLX',
      dataIndex: 'YWLX',
      width: '28%'
    },
    {
      title: '归档时间',
      name: 'GDSJ',
      dataIndex: 'GDSJ',
      width: '12%',
      customRender: (text, record, index) => {
        return text && text.split(' ')[0]
      }
    }
  ],
  normalJournalCol: [
    {
      title: '人员',
      name: 'USERNAME',
      dataIndex: 'USERNAME'
    },
    // {
    //   title: "环节",
    //   name: "ACTIVITYNAME",
    //   dataIndex: "ACTIVITYNAME",
    //   width:95

    // },
    {
      title: '操作',
      name: 'OPERATE',
      dataIndex: 'OPERATE',
      width: 95
    },
    {
      title: '操作时间',
      name: 'OPERATETIME',
      dataIndex: 'OPERATETIME'
    },
    {
      title: '操作内容',
      name: 'CONTENT',
      dataIndex: 'CONTENT',
      width: 250
    }],
    borrowLogForArchiveCol: [
      {
        title: '流水号',
        name: 'LSH',
        dataIndex: 'LSH'
      },
      {
        title: '借阅类型',
        name: 'JYLX',
        dataIndex: 'JYLX',
        ellipsis: true
      },
      {
        title: '借阅人',
        name: 'JYR',
        dataIndex: 'JYR'
      },
      {
        title: '联系电话',
        name: 'LXDH',
        dataIndex: 'LXDH'
      },
      {
        title: '是否已归还',
        name: 'SFYGH',
        dataIndex: 'SFYGH'
      }
    ],
    renewalRecord: [
      {
        title: '登记日期',
        name: 'DJRQ',
        dataIndex: 'DJRQ'
      },
      {
        title: '登记人',
        name: 'DJR',
        dataIndex: 'DJR'
      },
      {
        title: '续借人',
        name: 'XJR',
        dataIndex: 'XJR'
      },
      {
        title: '原预计归还日期',
        name: 'YYJGHRQ',
        dataIndex: 'YYJGHRQ'
      },
      {
        title: '现预计归还日期',
        name: 'XYJGHRQ',
        dataIndex: 'XYJGHRQ'
      },
      {
        title: '续借时长',
        name: 'XJSC',
        dataIndex: 'XJSC'
      }
    ],
    returnRecord: [
      {
        title: '登记日期',
        name: 'DJRQ',
        dataIndex: 'DJRQ'
      },
      {
        title: '登记人',
        name: 'DJR',
        dataIndex: 'DJR'
      },
      {
        title: '归还人',
        name: 'GHR',
        dataIndex: 'GHR'
      },
      {
        title: '归还时间',
        name: 'GHRQ',
        dataIndex: 'GHRQ'
      },
      {
        title: '有无异常',
        name: 'DAYWYC',
        dataIndex: 'DAYWYC',
        customRender: (text, record, index) => {
          return text == 0 ? '无' : '有'
        }
      },
      {
        title: '异常描述',
        name: 'DAYCMS',
        dataIndex: 'DAYCMS'
      }
    ],
  myDownloadCol: [
    {
      title: '档案编号',
      name: 'DABH',
      dataIndex: 'DABH',
      width: '10%'
    },
    {
      title: '档案名称',
      name: 'DAMC',
      dataIndex: 'DAMC',
      ellipsis: true
    },
    {
      title: '文件名称',
      name: 'WJMC',
      dataIndex: 'WJMC'
    },
    {
      title: '文件大小',
      name: 'WJDX',
      dataIndex: 'WJDX',
      width: '9%'
    },
    {
      title: '下载时间',
      name: 'XZSJ',
      dataIndex: 'XZSJ',
      width: '15%'
    },
    {
      title: '操作',
      name: 'CZ',
      dataIndex: 'CZ',
      scopedSlots: { customRender: 'handle' },
      width: '6%'
    }
  ],
  userColumn: [
    {
      title: '档案编号',
      name: 'DABH',
      dataIndex: 'DABH'
    },
    {
      title: '档案名称',
      name: 'DAMC',
      dataIndex: 'DAMC',
      ellipsis: true
    },
    {
      title: '档案类型',
      name: 'DALX',
      dataIndex: 'DALX',
      width: 250
    },
    {
      title: '归档时间',
      name: 'GDSJ',
      dataIndex: 'GDSJ'
    },
    {
      title: '阅读时间',
      name: 'YDSJ',
      dataIndex: 'YDSJ'
    }
  ],
  managerColumn: [
    {
      title: '流水号',
      name: 'LSH',
      dataIndex: 'LSH'
    },
    {
      title: '档案名称',
      name: 'DAMC',
      dataIndex: 'DAMC'
    },
    {
      title: '文件数量',
      name: 'WJSL',
      dataIndex: 'WJSL'
    },
    {
      title: '申请类型',
      name: 'SQLX',
      dataIndex: 'SQLX'
    },
    {
      title: '借阅类型',
      name: 'JYLX',
      dataIndex: 'JYLX'
    },
    {
      title: '借阅人',
      name: 'JYR',
      dataIndex: 'JYR'
    },
    {
      title: '所属部门',
      name: 'SSBM',
      dataIndex: 'SSBM'
    },
    {
      title: '联系电话',
      name: 'LXDH',
      dataIndex: 'LXDH'
    },
    {
      title: '当前环节',
      name: 'DQHJ',
      dataIndex: 'DQHJ'
    },
    {
      title: '借阅日期',
      name: 'JYRQ',
      dataIndex: 'JYRQ'
    },
    {
      title: '预计归还日期',
      name: 'YJGHRQ',
      dataIndex: 'YJGHRQ'
    }
  ],
  collectionStatistics: [
    {
      title: '档案编号',
      name: 'DABH',
      dataIndex: 'DABH',
      width: '12%'
    },
    {
      title: '档案名称',
      name: 'DAMC',
      dataIndex: 'DAMC',
      ellipsis: true
    },
    {
      title: '档案类型',
      name: 'DALX',
      dataIndex: 'DALX',
      width: '12%'

    },
    {
      title: '业务类型',
      name: 'YWLX',
      dataIndex: 'YWLX'
    },
    {
      title: '提交科室',
      name: 'TJKS',
      dataIndex: 'TJKS',
      width: '9%'

    },
    {
      title: '档案密级',
      name: 'DAMJ',
      dataIndex: 'DAMJ',
      ellipsis: true,
      width: 100
    },
    {
      title: '保管期限',
      name: 'BGQX',
      dataIndex: 'BGQX',
      width: '10%'
    },
    {
      title: '案卷数量',
      name: 'AJSL',
      dataIndex: 'AJSL',
      width: '9%'
    },
    {
      title: '归档时间',
      name: 'GDSJ',
      dataIndex: 'GDSJ',
      width: '9%',
      customRender: (text, record, index) => {
        return text && text.split(' ')[0]
      }
    }
  ],
  archiveStatistics: [
    {
      title: '案卷编号',
      name: 'AJBH',
      dataIndex: 'AJBH',
      width: '12%'
    },
    {
      title: '案卷名称',
      name: 'AJMC',
      dataIndex: 'AJMC',
      ellipsis: true
    },
    {
      title: '所属档案名称',
      name: 'DAMC',
      dataIndex: 'DAMC',
      width: '10%'
    },
    {
      title: '所属档案类型',
      name: 'DALX',
      dataIndex: 'DALX'
    },
    {
      title: '所属业务类型',
      name: 'YWLX',
      dataIndex: 'YWLX'
    },
    {
      title: '所属档案提交科室',
      name: 'TJKS',
      dataIndex: 'TJKS',
      width: '11%'
    },
    {
      title: '所属档案密级',
      name: 'DAMJ',
      dataIndex: 'DAMJ',
      width: '10%'
    },
    {
      title: '所属档案保管期限',
      name: 'BGQX',
      dataIndex: 'BGQX',
      width: '11%'
    },
    {
      title: '所属档案归档时间',
      name: 'GDSJ',
      dataIndex: 'GDSJ',
      customRender: (text, record, index) => {
        return text && text.split(' ')[0]
      }
    }
  ],
  borrowStatistics: [
    {
      title: '流水号',
      name: 'LSH',
      dataIndex: 'LSH',
      width: 150
    },
    {
      title: '档案名称',
      name: 'DAMC',
      dataIndex: 'DAMC'
    },
    {
      title: '档案类型',
      name: 'DALX',
      dataIndex: 'DALX'
    },
    {
      title: '借阅类型',
      name: 'JYLX',
      dataIndex: 'JYLX',
      width: '7%'

    },
    {
      title: '借阅人',
      name: 'JYR',
      dataIndex: 'JYR',
      width: '9%'

    },
    {
      title: '所在部门',
      name: 'SZBM',
      dataIndex: 'SZBM',
      width: '8%'

    },
    {
      title: '借阅日期',
      name: 'JYRQ',
      dataIndex: 'JYRQ',
      width: '8%'
    },
    {
      title: '借阅时长',
      name: 'JYSC',
      dataIndex: 'JYSC',
      width: '9%'
    },
    {
      title: '是否归还',
      name: 'SFGH',
      dataIndex: 'SFGH',
      width: '9%'
    }
  ]
}

export function getColumns (columnsName) {
  return columns[columnsName]
}
