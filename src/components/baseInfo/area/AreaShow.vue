<template>
  <a-card :bordered="false" bodyStyle="padding:20px;">
    <a-card-grid v-for="(item) in areaData" :key="item.key" style="width: 20%;text-align:center;padding:0;">
      <a-popover placement="bottomLeft" arrow-point-at-center :mouseEnterDelay="0.7">
        <template #content>
          <a-button type="primary" ghost >重命名</a-button>
          <a-button danger style="margin:12px 5px 0 5px;width:74px">删除</a-button>
        </template>
        <template #title>
          <span>{{ item.title }}</span> - 更多
        </template>
        <a-button type="link" class="cardContent" @click="showAreaDetail(item)">{{ item.title }}</a-button>
      </a-popover>
    </a-card-grid>
  </a-card>
  <a-empty description="暂无区域属于该地点" :image="simpleImage" v-if="isEmpty"/>
</template>

<script>
import {ref,onUpdated} from 'vue'
import {Empty} from "ant-design-vue";

export default {
  name: "AreaTree",
  props:{
    areaData:Array
  },
  //抛出事件名。不然会报警告
  emits:['selectedArea'],
  setup(props,context) {
    let isEmpty = ref(false)
    function judgeIsEmpty(){
      if(typeof (props.areaData) === 'undefined'){
        isEmpty.value = true
      }
    }
    onUpdated(()=>{
      judgeIsEmpty()
    })
    //给父组件传入选择的信息
    function showAreaDetail(item){
      context.emit('selectedArea', {title: item.title,key:item.key})
    }
    return {
      isEmpty,
      showAreaDetail,
      simpleImage: Empty.PRESENTED_IMAGE_SIMPLE,
    }
  }
}
</script>

<style scoped>
.ant-collapse-panel {
  background-color: red;

}

.cardContent {
  height: 80px;
  width: 100%;
  color: rgba(0, 0, 0, 0.85);
  font-size: 22px;
  font-weight: bolder;
  font-family: "楷体", "楷体_GB2312";
}
</style>