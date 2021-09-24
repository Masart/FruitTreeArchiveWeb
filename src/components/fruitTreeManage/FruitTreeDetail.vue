<template>
  <div class="treeDetailWrap">
    <span class="treeDetailLeft">
      <a-card v-if="isInfoOrEdit" title="果树详情" :bordered="false"
              headStyle="font-size:23px;border-bottom:0">
        <template #extra>
          <a-button type="primary" shape="round" @click="openTreeEditor" style="margin-right: 10px">
            编辑
          </a-button>
          <a-button type="primary" shape="round" danger @click="delTreeWarningModal">
            删除
          </a-button>
        </template>
        <a-descriptions bordered :column="4" layout="vertical">
          <a-descriptions-item label="果树编号" :span="2">{{ treeInfo.treeCode }}</a-descriptions-item>
          <a-descriptions-item label="创建者" :span="2">{{ treeInfo.userName }}</a-descriptions-item>
          <a-descriptions-item label="种植年份" :span="1">{{ treeInfo.treeYear }}</a-descriptions-item>
          <a-descriptions-item label="所属地区" :span="3">{{ treeInfo.treeAreaText }}</a-descriptions-item>
          <a-descriptions-item label="详细位置" :span="4">{{ treeInfo.areaDetail }}</a-descriptions-item>
          <a-descriptions-item label="所属品种" :span="3">{{ treeInfo.treeVarietyText }}</a-descriptions-item>
          <a-descriptions-item label="果树状态" :span="1">{{ treeStatus }}</a-descriptions-item>
          <a-descriptions-item label="备注" :span="4">{{ treeInfo.treeRemark }}</a-descriptions-item>
        </a-descriptions>
      </a-card>
      <EditFruitTree v-if="!isInfoOrEdit" @editVisible="getEditTreeVisible" :treeInfo="treeInfo" :editOrAdd="true"/>
    </span>
    <span>
      <a-card title="存档记录" :bordered="false"
              style="padding-left:5px;border-left: 1px dashed rgba(0,0,0,0.06);min-width: 450px"
              headStyle="font-size:23px;border-bottom:0"
              bodyStyle="padding:0;padding-top:25px">
        <template #extra>
          <a-button type="primary" class="addRootAreaBtn" shape="circle">
            <template #icon>
              <a-tooltip placement="right">
                <template #title>
                  <span>为当前果树添加一条档案</span>
                </template>
                <PlusOutlined/>
              </a-tooltip>
            </template>
          </a-button>
        </template>
        <a-timeline mode="alternate">
          <a-timeline-item color="#222222" v-for="(item) in archiveDateList">
            <template #dot>
              <ClockCircleOutlined style="font-size: 16px"/>
            </template>
            <a-button type="text" @click="toArchiveDetail(item.code)">{{ item.title }}</a-button>
          </a-timeline-item>
        </a-timeline>
        <a-pagination v-model:current="pageCurrent" :total="pageTotal"/>
      </a-card>
    </span>
  </div>
</template>

<script>
import Route from '../../router'
import {onMounted, ref, reactive, h, createVNode} from 'vue'
import {
  FileDoneOutlined, ClockCircleOutlined, PlusOutlined, ExclamationCircleOutlined,
} from '@ant-design/icons-vue';
import EditFruitTree from "@/components/fruitTreeManage/EditFruitTree";
import {Modal} from "ant-design-vue";

export default {
  name: "FruitTreeDetail",
  components: {EditFruitTree, FileDoneOutlined, ClockCircleOutlined, PlusOutlined,},
  setup() {
    let treeCode = ref('')
    let treeStatus = ref('正常')
    let pageCurrent = ref(1)
    let pageTotal = ref(1000)
    let isInfoOrEdit = ref(true) //true信息展示，false 编辑信息
    let archiveDateList = ref([
      {title: '2015-09-10', code: '10'},
      {title: '2015-09-09', code: '9'},
      {title: '2015-09-08', code: '8'},
      {title: '2015-09-07', code: '7'},
      {title: '2015-09-06', code: '6'},
      {title: '2015-09-05', code: '5'},
      {title: '2015-09-04', code: '4'},
      {title: '2015-09-03', code: '3'},
      {title: '2015-09-02', code: '2'},
      {title: '2015-09-01', code: '1'},
    ])
    let treeInfo = reactive({
      treeCode: '20207060748',
      treeYear: 1998,
      treeArea: 'lianchiqu',
      treeAreaText: '莲池区',
      areaDetail: '河北农业大学东校区，信息科学与技术学院实验楼，研究生实验室，李神之后，强哥之前。宿舍位于东校区10号楼',
      treeVariety: 'chpea',
      treeVarietyText: '桃絮',
      treeStatus: '1',
      treeRemark: '傻子一个',
      userName: '马总',
    })
    onMounted(() => {
      treeCode.value = Route.currentRoute.value.params.treeCode
      if (treeInfo.treeStatus === '0') {
        treeStatus.value = '死亡'
      } else if (treeInfo.treeStatus === '1') {
        treeStatus.value = '正常'
      }
    })

    //打开档案记录详情页
    function toArchiveDetail(archiveCode) {
      console.log(archiveCode)
    }

    //打开编辑果树页面
    function openTreeEditor() {
      isInfoOrEdit.value = false
    }

    //关闭editTree回调
    const getEditTreeVisible = (e) => {
      console.log('e', e)
      isInfoOrEdit.value = !e.editVisible
    }

    const delTreeWarningModal = () => {
      let delTreeTitle = '确认删除果树 ' + treeInfo.treeCode + ' ？'
      Modal.confirm({
        title: () => delTreeTitle,
        icon: () => createVNode(ExclamationCircleOutlined),
        content: () =>
            h('div', {}, [
              h('p', '在删除果树的同时，将会删除其全部存档记录！'),
              h('p', '是否删除？'),
            ]),
        cancelText: () => '取消',
        okText: () => '确认删除',
        onOk() {
          console.log('确认')
        },
        okButtonProps: {
          danger: true,
        },
        onCancel() {
          console.log('取消')
        },
      });
    };
    return {
      treeCode, archiveDateList, pageCurrent, pageTotal, isInfoOrEdit, treeInfo, treeStatus,
      toArchiveDetail, getEditTreeVisible, openTreeEditor, delTreeWarningModal
    }
  }
}
</script>

<style scoped>
.treeDetailWrap {
  display: flex;
  justify-content: center;
  margin-top: 30px;
}

.treeDetailLeft {
  width: 600px;
}

.archiveListTitle {
  font-size: 30px;
  margin-left: 60px;
}

.ant-pagination {
  text-align: center;
}
</style>