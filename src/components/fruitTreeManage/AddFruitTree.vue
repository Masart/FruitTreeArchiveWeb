<template>
  <a-card :bordered="false" bodyStyle="padding: 24px 25vw">
    <EditFruitTree :treeInfo="{}" :editOrAdd="false"/>
  </a-card>
</template>

<script>
import EditFruitTree from "@/components/fruitTreeManage/EditFruitTree";
export default {
  name: "AddFruitTree",
  components: {EditFruitTree}
}
</script>

<style scoped>

</style>