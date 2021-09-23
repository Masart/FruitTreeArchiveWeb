<template>
  <h1>这里是果树详情页面{{treeCode}}</h1>
</template>

<script>
import Route from '../../router'
import {onMounted,ref} from 'vue'

export default {
  name: "FruitTreeDetail",
  setup() {
    let treeCode = ref('')
    onMounted(()=>{
      treeCode.value = Route.currentRoute.value.params.treeCode
    })

    return {
      treeCode,
    }
  }
}
</script>

<style scoped>

</style>