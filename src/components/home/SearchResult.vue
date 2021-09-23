<template>
  <div class="searchResult">
    <p class="resultCount">找到共 {{ searchResult.length }} 个结果</p>
    <div v-for="(item) in searchResult" style="width: 40vw;">
      <a @click="openResult(item.treeCode)">
        <span class="itemHead">{{ item.treeName }}</span>
      </a>
      <span class="itemVariety">{{ item.treeVariety }}</span>
      <div class="itemContent">
        <span class="itemYear">{{ item.treeYear }}年生</span>
        <span class="itemRemark">{{ item.treeRemark }}</span>
      </div>
      <div>
        <span class="itemArea">来自：{{ item.treeArea }}</span>
      </div>
      <a-divider dashed class="itemDivider"/>
    </div>
  </div>


</template>

<script>
import Route from '../../router'
import {ref,watch,onMounted} from 'vue'

export default {
  name: "SearchResult",
  props:{
    searchKey:Object
  },
  setup(props) {
    const searchResult = [
      {
        treeCode: "qiuyue1",
        treeName: "秋月1",
        treeYear: "2014",
        treeArea: "河北 - 邢台 - 威县",
        treeVariety: "梨 / 秋月",
        treeRemark: "生长较好，果大水多",
      },
      {
        treeCode: "hongxiangsu1",
        treeName: "红香酥1",
        treeYear: "2016",
        treeArea: "河北 - 邢台 - 威县",
        treeVariety: "梨 / 红香酥",
        treeRemark: "授粉树，没套袋",
      },
      {
        treeCode: "hongfushi1",
        treeName: "红富士1",
        treeYear: "2015",
        treeArea: "河北 - 保定 - 顺平",
        treeVariety: "苹果 / 晚熟富士",
        treeRemark: "还没见过啥样的，不知道好不好吃",
      },
      {
        treeCode: "taoxu",
        treeName: "桃絮",
        treeYear: "1998",
        treeArea: "河北 - 石家庄 - 正定",
        treeVariety: "桃",
        treeRemark: "干啥啥不行，干饭第一名！",
      },

    ]

    function openResult(treeCode) {
      Route.push('/fruitTree/treeDetail/'+treeCode)
    }
    onMounted(()=>{
      console.log('ms',props.searchKey)
    })
    watch(props.searchKey,(newValue,oldValue)=>{
      console.log('ms',newValue)
    })
    return {
      searchResult,
      openResult,
    }
  }
}
</script>

<style scoped>
.resultCount {
  font-size: 13px;
  line-height: 41px;
  color: #989898;
}

.searchResult {
  display: block;
  padding: 0 200px;
  justify-content: center; /*水平方向的居中*/
}

.itemHead {
  padding: 0;
  font-size: 20px;
  font-weight: 550;
  color: #1382e8;
}

.itemHead:hover {
  color: #1890ff
}

.itemYear {
  color: #919191;
  font-size: 15px;
  margin-right: 8px;
  line-height: 23px;
}

.itemRemark {
  padding: 0;
  font-size: 15px;
  color: #221221;
  line-height: 23px;
}

.itemVariety {
  margin-left: 20px;
}

.itemContent {
  margin-top: 8px;
}

.itemDivider {
  margin: 11px 0;
  height: 2px;
}
</style>