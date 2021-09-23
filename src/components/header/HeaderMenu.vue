<template>
  <a-menu v-model:selectedKeys="current" mode="horizontal">
    <a-menu-item key="homePage" @click="routeTo('/home')">
      首页
    </a-menu-item>
    <a-menu-item key="fruitTree" @click="routeTo('/fruitTree')">
      果树管理
    </a-menu-item>
    <a-sub-menu>
      <template #title>基本信息</template>
      <a-menu-item key="variety" @click="routeTo('/baseInfo/variety')">
        品种分类
      </a-menu-item>
      <a-menu-item key="area" @click="routeTo('/baseInfo/area')">
        地区管理
      </a-menu-item>
    </a-sub-menu>
    <a-menu-item key="antdvue">
      <a href="https://2x.antdv.com/components/overview-cn/" target="_blank" rel="noopener noreferrer">
        帮助
      </a>
    </a-menu-item>
  </a-menu>
</template>

<script>
import {ref, onMounted} from 'vue'
import Route from '../../router'

export default {
  name: "HeaderMenu",
  setup() {
    let current = ref(['homePage'])
    function routeTo(path) {
      Route.push(path)
    }
    const menu2route = {
      home: 'homePage',
      fruitTree: 'fruitTree',
      areaInfo: 'area',
      varietyInfo: 'variety',
    }
    onMounted(() => {
      setTimeout(function (){
        current.value = [menu2route[Route.currentRoute.value.name]]
      },100)
    })


    return {
      current, routeTo
    }
  }
}
</script>

<style scoped>
.ant-menu {
  font-size: 17px;
  margin-right: 32px;
}

</style>