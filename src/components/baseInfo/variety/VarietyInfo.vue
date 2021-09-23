<template>

  <div style="padding: 3vh 10vw;">
    <a-page-header
        style="border: 1px solid rgb(235, 237, 240);padding-bottom: 10px"
        title="品种信息总览"
        sub-title="管理您的果树品种"
    >
      <template #extra>
        <a-button type="primary" shape="round" @click="addRootVariety">添加根品种</a-button>
      </template>
      <template #footer>
        <VarietyTree :varietyDetail="varietyList"/>
      </template>
    </a-page-header>
    <a-modal v-model:visible="addRootVarietyModalVisible" title="添加品种" @ok="submitAddRootVariety" >
      <template #footer>
        <a-button key="back" @click="closeRootVarietyModal">取消</a-button>
        <a-button key="submit" type="primary" @click="submitAddRootVariety">添加</a-button>
      </template>
      <a-input
          v-model:value="rootVarietyName"
          placeholder="品种名称"
      />
    </a-modal>
  </div>
</template>

<script>
import {ref} from "vue"
import VarietyTree from "@/components/baseInfo/variety/VarietyTree";

export default {
  name: "VarietyInfo",
  components: {VarietyTree},
  setup() {
    let varietyList = ref([
      {
        varietyName: '苹果',
        varietyCode: 'apple',
        children: [{varietyName: '红富士', varietyCode: 'hongfushi',}, {varietyName: '晚熟富士', varietyCode: 'wanshu',}]
      },
      {
        varietyName: '梨',
        varietyCode: 'pear',
        children: [
          {varietyName: '红香酥', varietyCode: 'hongxiangsu',},
          {varietyName: '秋月', varietyCode: 'qiuyue'},
          {
            varietyName: '新梨', varietyCode: 'xinli', children: [
              {varietyName: '新梨1号', varietyCode: 'xinli1',},
              {varietyName: '新梨7号', varietyCode: 'xinli7'},]
          },
        ]
      },
    ])
    // let varietyList = ref([])
    let addRootVarietyModalVisible = ref(false)
    let rootVarietyName = ref('')
    //添加根品种
    function addRootVariety(){
      addRootVarietyModalVisible.value = true
    }
    //提交添加
    function submitAddRootVariety(){
      addRootVarietyModalVisible.value = false


    }
    //关闭添加根品种对话框
    function closeRootVarietyModal(){
      addRootVarietyModalVisible.value = false

    }
    return {
      varietyList,addRootVarietyModalVisible,rootVarietyName,
      closeRootVarietyModal,addRootVariety,submitAddRootVariety
    }
  }
}
</script>

<style scoped>

</style>