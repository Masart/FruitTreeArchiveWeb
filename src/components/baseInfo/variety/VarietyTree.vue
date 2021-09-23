<template>
  <a-empty :image="emptyImg" v-if="isEmpty" description="没有更多了"/>
  <a-tabs v-model:activeKey="activeKey" v-if="!isEmpty"
          @prevClick="callback"
          @nextClick="callback">
    <template #tabBarExtraContent>
      <a-button type="link" v-if="activeKey" @click="tabRenameVariety">重命名</a-button>
      <a-button type="link" v-if="activeKey" @click="tabAddVariety" style="color: #52c41a">添加</a-button>
      <a-button type="link" danger v-if="activeKey" @click="delVarietyWarningModal">删除</a-button>
    </template>
    <a-tab-pane v-for="(item) in varietyDetail" :key="item.varietyCode" :tab="item.varietyName">
      <VarietyTree :varietyDetail="item.children"/>
    </a-tab-pane>
  </a-tabs>
  <a-modal v-model:visible="addVarietyModalVisible" :title="modalTitle" @ok="submitAddVariety">
    <template #footer>
      <a-button key="back" @click="closeAddVarietyModal">取消</a-button>
      <a-button key="submit" type="primary" @click="submitAddVariety">添加</a-button>
    </template>
    <a-input
        v-model:value="varietyName4add"
        placeholder="为子品种添加名称"
    />
  </a-modal>
  <a-modal v-model:visible="renameVarietyModalVisible" title="重命名" @ok="submitAddVariety">
    <template #footer>
      <a-button key="back" @click="closeRenameVarietyModal">取消</a-button>
      <a-button key="submit" type="primary" @click="submitRenameVariety">重命名</a-button>
    </template>
    <a-input
        v-model:value="varietyName4rename"
        placeholder="新名称"
    />
  </a-modal>
</template>

<script>
import {Empty, Modal} from 'ant-design-vue';
import {ref, onBeforeMount, h,createVNode} from "vue"
import {
  ExclamationCircleOutlined
} from '@ant-design/icons-vue';

export default {
  name: "VarietyTree",
  props: {varietyDetail: Object,},
  setup(props) {
    let isEmpty = ref(true)
    let activeKey = ref('')
    let modalTitle = ref('添加品种')
    let addVarietyModalVisible = ref(false)
    let renameVarietyModalVisible = ref(false)
    let delVarietyModalVisible = ref(false)
    let varietyName4add = ref('')
    let varietyName4rename = ref('')
    let delVarietyContent = ref('确认删除')
    const callback = (val) => {
      console.log(val);
    };
    onBeforeMount(() => {
      judgeIsEmpty()
    })

    function getVarietyNameByCode(varietyCode) {
      for (let i = 0; i < props.varietyDetail.length; i++) {
        if (props.varietyDetail[i].varietyCode === varietyCode) {
          return props.varietyDetail[i].varietyName
        }
      }
    }

    function judgeIsEmpty() {
      if (typeof (props.varietyDetail) === 'undefined') {
        isEmpty.value = true
      } else {
        if (props.varietyDetail.length === 0) {
          isEmpty.value = true
        } else {
          isEmpty.value = false
        }
      }
    }

    //tab右上角添加品种
    function tabAddVariety() {
      let _varietyName = getVarietyNameByCode(activeKey.value)
      modalTitle.value = '为 ' + _varietyName + ' 添加子品种'
      addVarietyModalVisible.value = true
    }

    //tab右上角删除品种
    function tabDelVariety() {
      let _varietyName = getVarietyNameByCode(activeKey.value)
      delVarietyContent.value = '确认删除 ' + _varietyName + '？'
      delVarietyModalVisible.value = true
    }

    //tab右上角重命名品种
    function tabRenameVariety() {
      renameVarietyModalVisible.value = true
      varietyName4rename.value = getVarietyNameByCode(activeKey.value)
    }

    //重命名品种提交
    function submitRenameVariety() {
      renameVarietyModalVisible.value = false
      console.log(varietyName4rename.value)

    }

    function closeRenameVarietyModal() {
      renameVarietyModalVisible.value = false
      varietyName4rename.value = ''

    }

    //添加品种对话框提交
    function submitAddVariety() {
      addVarietyModalVisible.value = false
      console.log(varietyName4add.value)

    }

    //关闭添加品种对话框
    function closeAddVarietyModal() {
      addVarietyModalVisible.value = false
      console.log(varietyName4add.value)
      varietyName4add.value = ''

    }


    //删除品种对话框提交
    function submitDelVariety() {
      delVarietyModalVisible.value = false
      console.log(activeKey.value)

    }

    //关闭删除品种对话框
    function closeDelVarietyModal() {
      delVarietyModalVisible.value = false
      console.log(activeKey.value)

    }


    const delVarietyWarningModal = () => {
      let _varietyName = getVarietyNameByCode(activeKey.value)
      delVarietyContent.value = '确认删除 ' + _varietyName + ' ？'
      Modal.confirm({
        title: () => delVarietyContent.value,
        icon: () => createVNode(ExclamationCircleOutlined),
        content: () =>
            h('div', {}, [
              h('p', '这将删除该品种及其子品种信息！'),
              h('p', '因此，我们强烈建议您选择重命名品种！'),
              h('p', '若您确定要删除该品种：'),
              h('p', '已被注册为该品种的果树将自动更正为其上级品种。'),
              h('p', '若该品种已为根品种，则会自动更正为“果树”品种。'),
            ]),
        cancelText: () => '取消',
        okText: () => '确认删除',
        width:500,
        onOk() {
          console.log('确认')
        },
        okButtonProps:{
          danger:true,
        },
        onCancel() {
          console.log('取消')
        },
      });
    };
    return {
      emptyImg: Empty.PRESENTED_IMAGE_SIMPLE,
      isEmpty, activeKey, modalTitle, addVarietyModalVisible, varietyName4add, renameVarietyModalVisible,
      varietyName4rename, delVarietyContent, delVarietyModalVisible,
      callback, tabAddVariety, tabDelVariety, tabRenameVariety, submitAddVariety,
      closeAddVarietyModal, submitRenameVariety, closeRenameVarietyModal, submitDelVariety,
      closeDelVarietyModal, delVarietyWarningModal,
    }
  }
}
</script>

<style scoped>

</style>