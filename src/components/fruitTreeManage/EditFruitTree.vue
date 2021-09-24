<template>
  <a-card :title="editOrAdd?'果树详情':'创建果树'" :bordered="false"
          headStyle="font-size:23px;border-bottom:0">
    <template #extra>
      <a-button type="primary" shape="round" style="margin-right: 15px" @click="submitTreeForm">
        {{ editOrAdd ? '修改' : '新建' }}
      </a-button>
      <a-button shape="round" @click="closeFruitTreeEditor" v-if="editOrAdd">
        返回
      </a-button>
    </template>
    <a-form :model="editFruitFormData">
      <a-descriptions bordered :column="4" layout="vertical" v-if="editOrAdd">
        <a-descriptions-item label="果树编号" :span="2">
          <a-form-item>
            <a-input v-model:value="editFruitFormData.treeCode"/>
          </a-form-item>
        </a-descriptions-item>
        <a-descriptions-item label="创建者" :span="2">{{ editFruitFormData.userName }}</a-descriptions-item>
        <a-descriptions-item label="种植年份" :span="1">
          <a-form-item>
            <a-input-number id="inputNumber" v-model:value="editFruitFormData.treeYear" :min="1900" :max="toyear"/>
          </a-form-item>
        </a-descriptions-item>
        <a-descriptions-item label="所属地区" :span="3">
          <a-form-item>
            <a-tree-select
                v-model:value="editFruitFormData.treeArea"
                style="width: 100%"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                :tree-data="areaTreeData"
                placeholder="选择地区"
            />
          </a-form-item>
        </a-descriptions-item>
        <a-descriptions-item label="详细位置" :span="4">
          <a-form-item>
            <a-textarea
                v-model:value="editFruitFormData.areaDetail"
                placeholder=""
                :auto-size="{ minRows: 2, maxRows: 2 }"
            />
          </a-form-item>
        </a-descriptions-item>
        <a-descriptions-item label="所属品种" :span="3">
          <a-form-item>
            <a-tree-select
                v-model:value="editFruitFormData.treeVariety"
                style="width: 100%"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                :tree-data="varietyTreeData"
                placeholder="选择品种"
            />
          </a-form-item>
        </a-descriptions-item>
        <a-descriptions-item label="果树状态" :span="1">
          <a-form-item>
            <a-radio-group name="radioGroup" v-model:value="editFruitFormData.treeStatus">
              <a-radio value="1">正常</a-radio>
              <a-radio value="0">死亡</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-descriptions-item>
        <a-descriptions-item label="备注">
          <a-form-item>
            <a-textarea
                v-model:value="editFruitFormData.treeRemark"
                placeholder=""
                :auto-size="{ minRows: 2, maxRows: 3 }"
            />
          </a-form-item>
        </a-descriptions-item>
      </a-descriptions>
      <a-descriptions bordered :column="4" layout="vertical" v-if="!editOrAdd">
        <a-descriptions-item label="果树编号" :span="3">
          <a-form-item>
            <a-input v-model:value="editFruitFormData.treeCode"/>
          </a-form-item>
        </a-descriptions-item>
        <a-descriptions-item label="种植年份" :span="1">
          <a-form-item>
            <a-input-number id="inputNumber" v-model:value="editFruitFormData.treeYear" :min="1900" :max="toyear"/>
          </a-form-item>
        </a-descriptions-item>
        <a-descriptions-item label="所属地区" :span="2">
          <a-form-item>
            <a-tree-select
                v-model:value="editFruitFormData.treeArea"
                style="width: 100%"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                :tree-data="areaTreeData"
                placeholder="选择地区"
            />
          </a-form-item>
        </a-descriptions-item>
        <a-descriptions-item label="所属品种" :span="2">
          <a-form-item>
            <a-tree-select
                v-model:value="editFruitFormData.treeVariety"
                style="width: 100%"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                :tree-data="varietyTreeData"
                placeholder="选择品种"
            />
          </a-form-item>
        </a-descriptions-item>
        <a-descriptions-item label="详细位置" :span="4">
          <a-form-item>
            <a-textarea
                v-model:value="editFruitFormData.areaDetail"
                placeholder=""
                :auto-size="{ minRows: 2, maxRows: 2 }"
            />
          </a-form-item>
        </a-descriptions-item>
        <a-descriptions-item label="备注">
          <a-form-item>
            <a-textarea
                v-model:value="editFruitFormData.treeRemark"
                placeholder=""
                :auto-size="{ minRows: 2, maxRows: 3 }"
            />
          </a-form-item>
        </a-descriptions-item>
      </a-descriptions>
    </a-form>
  </a-card>
</template>

<script>
import {reactive, onMounted,} from 'vue'
import moment from 'moment'

export default {
  name: "EditFruitTree",
  emits: ['editVisible'],
  props: {
    treeInfo: Object,
    editOrAdd: Boolean,//true 编辑; false 添加
  },
  setup(props, context) {
    let editFruitFormData = reactive({
      treeCode: '',
      treeYear: '',
      treeArea: '',
      areaDetail: '',
      treeVariety: '',
      treeStatus: '',
      treeRemark: '',
      userName: '',
    })
    const toyear = parseInt(moment().format("YYYY"))
    const varietyTreeData = [
      {
        title: '梨',
        value: 'pear',
        key: 'pear',
        children: [
          {
            title: '秋月',
            value: 'qiuyue',
            key: 'qiuyue',
          },
          {
            title: '红香酥',
            value: 'hongxiangsu',
            key: 'hongxiangsu',
          },
        ],
      },
      {
        title: '苹果',
        value: 'apple',
        key: 'apple',
        children: [
          {
            title: '红富士',
            value: 'redfushi',
            key: 'redfushi',
          }
        ]
      },
      {
        title: '桃',
        value: 'peach',
        key: 'peach',
        children: [
          {
            title: '桃絮',
            value: 'chpea',
            key: 'chpea',
          }
        ]
      },
    ]
    const areaTreeData = [
      {
        title: '河北',
        value: 'hebei',
        key: 'hebei',
        children: [
          {
            title: '保定',
            value: 'baoding',
            key: 'baoding',
            children: [
              {
                title: '莲池区',
                value: 'lianchiqu',
                key: 'lianchiqu'
              },
              {
                title: '顺平',
                value: 'shunping',
                key: 'shunping'
              }
            ]
          },
          {
            title: '邢台',
            value: 'xingtai',
            key: 'xingtai',
            children: [
              {
                title: '威县',
                value: 'weixian',
                key: 'weixian',
              }
            ]
          },
        ],
      },
      {
        title: '山东',
        value: 'shandong',
        key: 'shandong',
        children: [
          {
            title: '烟台',
            value: 'yantai',
            key: 'yantai',
          }
        ]
      },
      {
        title: '山西',
        value: 'shanxi',
        key: 'shanxi',
        children: [
          {
            title: '太原',
            value: 'taiyuan',
            key: 'taiyuan',
          }
        ]
      },
    ]
    onMounted(() => {
      if (props) {
        editFruitFormData.treeCode = props.treeInfo.treeCode
        editFruitFormData.treeYear = props.treeInfo.treeYear
        editFruitFormData.treeArea = props.treeInfo.treeArea
        editFruitFormData.areaDetail = props.treeInfo.areaDetail
        editFruitFormData.treeVariety = props.treeInfo.treeVariety
        editFruitFormData.treeStatus = props.treeInfo.treeStatus
        editFruitFormData.treeRemark = props.treeInfo.treeRemark
        editFruitFormData.userName = props.treeInfo.userName
      }
    })

    //提交修改表单
    function submitTreeForm() {
      if (props.editOrAdd) {
        console.log('这里是编辑', editFruitFormData)
        closeFruitTreeEditor()
      } else {
        console.log('这里是新建')
        console.log(editFruitFormData.treeCode,
            editFruitFormData.treeYear,
            editFruitFormData.treeArea,
            editFruitFormData.areaDetail,
            editFruitFormData.treeVariety,
            editFruitFormData.treeRemark,
        )
      }
    }

    //关闭编辑面板
    function closeFruitTreeEditor() {
      isEditFruitTree(false)
    }

    //给父组件传递打开还是关闭的信息
    function isEditFruitTree(visible) {
      context.emit('editVisible', {editVisible: visible})
      console.log('isEditFruitTree', visible)
    }

    return {
      editFruitFormData, varietyTreeData, areaTreeData, toyear,
      submitTreeForm, closeFruitTreeEditor,
    }
  }
}
</script>

<style scoped>
.ant-form-item {
  margin-bottom: 0;
}
</style>