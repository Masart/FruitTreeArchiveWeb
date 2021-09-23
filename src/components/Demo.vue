<template>
  <h1>一个人的信息</h1>
  姓：<input type="text" v-model="person.firstName">
  <br>
  名：<input type="text" v-model="person.lastName">
  <br>
  <h2>年龄：{{age}}</h2><button @click="age++">点我年龄加 1</button>
  <br>
  <br>
  <span>全名：{{fullName}}</span>
  <br>
  修改全名：<input type="text" v-model="person.fullName">
</template>

<script>
import {reactive,computed,watch,ref,watchEffect} from 'vue'
import {
  EditOutlined
} from '@ant-design/icons-vue';

export default {
  name: "Demo",
  setup() {
    let age = ref(0)
    let person = reactive({
      firstName: '马',
      lastName: '哈哈',
    })
    // 计算属性（简写）：没有考虑计算属性被修改的情况
    let fullName = computed(()=>{
      return person.firstName + '-' + person.lastName
    })
    // 计算属性（完整写）：考虑计算属性读和写
    person.fullName = computed({
      get(){
        return person.firstName + '-' + person.lastName
      },
      set(value){
        const nameArr = value.split('-')
        person.firstName = nameArr[0]
        person.lastName = nameArr[1]
      }
    })


    // watch ref。如果ref是个对象，监视里面的值需要开启deep
    watch([age],(newValue,oldValue)=>{
      console.log('age变了',newValue,oldValue)
    },{immediate:true})


    // watch reactive无法正确获取oldValue
    watch(person,(newValue,oldValue)=>{
      console.log('person变化了',newValue,oldValue)
    })

    // watch reactive某个属性。默认开启deep
    // 若监视reactive中的某个属性的属性，需要开启deep
    watch(()=>person.lastName,(newValue,oldValue)=>{
      console.log('person的lastName变化了',newValue,oldValue)
    })

    watchEffect(()=>{
      const x1 = age.value
      console.log('watchEffect回调执行了')
    })



    return {
      person,fullName,age
    }
  }

}
</script>

<style scoped>

</style>