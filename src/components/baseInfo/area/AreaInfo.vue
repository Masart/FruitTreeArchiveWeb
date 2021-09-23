<template>
  <div class="areaHeader">
    <a-input-search
        v-model:value="searchInput"
        placeholder="输入地区名开始搜索"
        @search="searchArea"
    />
    <a-button type="primary" class="addRootAreaBtn" shape="circle">
      <template #icon>
        <a-tooltip placement="right" >
          <template #title>
            <span>在当前地点中添加子地点</span>
          </template>
          <PlusOutlined/>
        </a-tooltip>
      </template>
    </a-button>
  </div>
  <a-breadcrumb>
    <a-breadcrumb-item v-for="(item) in breadcrumbList" :key="item.key">
      <a @click="openArea(item.areaCode)">
      {{ item.areaName }}
      </a>
    </a-breadcrumb-item>
  </a-breadcrumb>
  <AreaShow @selectedArea="getSelectedArea" :areaData="areaData"></AreaShow>
</template>

<script>
import AreaShow from "./AreaShow";
import {ref} from "vue"
import {
  PlusOutlined
} from '@ant-design/icons-vue';

export default {
  name: "Area",
  components: {AreaShow, PlusOutlined},
  setup() {
    let breadcrumbList = ref([{areaName:'全部地点',areaCode:'total'}])
    let searchInput = ref('')
    const areaData = ref([
      {
        title: '河北', key: '0', children: [
          {
            title: '保定', key: '00', children: [
              {title: '莲池区', key: '000'},
              {title: '竞秀区', key: '001'},
              {title: '满城区', key: '002'},
            ]
          },
          {title: '唐山', key: '01'},
          {title: '石家庄', key: '02'},
          {title: '衡水', key: '03'},
        ]
      },
      {title: '北京', key: '1'},
      {title: '天津', key: '2'},
      {title: '上海', key: '4'},
      {title: '浙江', key: '5'},
      {title: '山东', key: '6'},
    ]);
    //根据面包屑打开
    function openArea(areaCode){
      console.log(areaCode)
    }
    //搜索框回调
    function searchArea(value,event){
      console.log(value,event)
    }
    //添加面包屑
    function addBreadcrumbList(areaName) {
      breadcrumbList.value.push(areaName)
    }

    const getSelectedArea = (e) => {
      let t_key = e.key
      let t_title = e.title
      let areaDataValue = areaData.value
      for (let i = 0; i < areaDataValue.length; i++) {
        if ((t_key === areaDataValue[i].key) && (t_title === areaDataValue[i].title)) {
          areaData.value = areaDataValue[i].children
          addBreadcrumbList({areaName:t_title,areaCode:e.key})
        }
      }
    }
    return {
      breadcrumbList, areaData,searchInput,
       getSelectedArea,openArea,searchArea,
    }
  }
}
</script>

<style scoped>
.areaHeader {
  display: inline-block;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 30px;
  padding-left: 20px;
  padding-right: 30px;
}

.ant-input-search {
  width: 480px;
}

.addRootAreaBtn {
  float: right;
}

.ant-breadcrumb {
  margin-left: 20px;
}
</style>