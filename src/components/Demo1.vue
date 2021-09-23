<template>
  <h2>当前求和为: {{sum}}</h2>
  <button @click="sum++">点我+1</button>
  <hr>
  <h2>当前点击时鼠标的坐标为：x:{{point.x}}, y:{{point.y}}</h2>
  <h3>{{x}}</h3>
</template>

<script>
import {ref,toRef,toRefs,reactive,onBeforeMount,onMounted,onBeforeUpdate,onUpdated,onBeforeUnmount,onUnmounted} from 'vue'
//shallowRef 只考虑reactive第一层数据的响应式

export default {
  name: "Demo1",

  setup() {
    console.log('---setup---')

    let sum = ref(0)
    let point = reactive({
      x:0,
      y:0
    })

    function savePoint(event){
      point.x = event.pageX
      point.y = event.pageY
    }

    //通过组合API使用钩子
    /*
    * beforeCreate  ===>  setup()
    * created       ===>  setup()
    * beforeMount   ===>  onBeforeMount()
    * mounted       ===>  onMounted()
    * beforeUpdate  ===>  onBeforeUpdate()
    * update        ===>  onUpdate()
    * beforeUnmount ===>  onBeforeUnmount()
    * unmounted     ===>  onUnmounted()
    */
    onBeforeMount(()=>{
      console.log('---onBeforeMount---')
    })
    onMounted(()=>{
      console.log('---onMounted---')
      window.addEventListener('click',savePoint)
    })
    onBeforeUpdate(()=>{
      console.log('---onBeforeUpdate---')
    })
    onUpdated(()=>{
      console.log('---onUpdated---')
    })
    onBeforeUnmount(()=>{
      console.log('---onBeforeUnmount---')
      window.removeEventListener('click',savePoint )
    })
    onUnmounted(()=>{
      console.log('---onUnmounted---')
    })
    return {
      sum,point,...toRefs(point)
      // ,x:toRef(point,'x')
    }
  },

  //配置项形式：
  // beforeCreate(){
  //   console.log('---beforeCreate---')
  // },
  // created() {
  //   console.log('---created---')
  // },
  // beforeMount() {
  //   console.log('---beforeMount---')
  // },
  // mounted() {
  //   console.log('---mounted---')
  // },
  // beforeUpdate() {
  //   console.log('---beforeUpdate---')
  // },
  // beforeUnmount() {
  //   console.log('---beforeUnmount---')
  // },
  // unmounted() {
  //   console.log('---unmounted---')
  // }

}
</script>

<style scoped>

</style>