<template>
  <a-card :bordered="false" bodyStyle="padding: 24px 10vw">
    <a-page-header
        :title="'为 '+treeCode+' 添加一条记录'"
        @back="backToTreeDetail"
    />
    <EditArchive :archiveCode="''" :archiveInfo="{}" :editOrAdd="false" :treeCode="treeCode"/>
  </a-card>
</template>

<script>
import EditArchive from "@/components/archiveManage/EditArchive";
import {ref, reactive, onMounted} from 'vue'
import Route from "../../router";

export default {
  name: "AddArchive",
  components: {EditArchive},
  setup() {
    let treeCode = ref('')
    onMounted(()=>{
      treeCode.value = Route.currentRoute.value.query.tree
    })
    function backToTreeDetail(){
      Route.push('/fruitTree/treeDetail/' + treeCode.value)
    }
    return {
      treeCode,
      backToTreeDetail,
    }
  }
}
</script>

<style scoped>

</style>