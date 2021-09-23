<template>
  <h1>我是Student组件</h1>
  <h2>姓名：{{ person.name }}</h2>
  <h2>年龄：{{ person.age }}</h2>
  <h3>学校：{{ person.info.school }}</h3>
  <h3>专业：{{ person.info.professional }}</h3>
  <button @click="sayHello">说话</button>
  <br>
  <br>
  <button @click="changeInfo">修改信息</button>
  <h3>{{ person.hobby }}</h3>
</template>

<script>
import {ref, reactive} from 'vue'

export default {
  name: "Student",
  // props: ['msg', 'school'],
  // 绑定自定义事件
  emits: [],
  // setup在beforeCreate生命周期前执行，this为undefined
  // setup收到两个参数：
  //      1. props
  //      2. context
  setup() {
    let person = reactive({
      //ref: reference引用
      name: '娜娜',
      age: 18,
      //响应式的对象
      info: {
        school: '河北农业大学',
        professional: '网络工程'
      },
      hobby: ['唱歌', '画画']
    })


    function sayHello() {
      alert(`我叫${person.name}，我${person.age}岁了，你好啊~！`)
      console.log(person.info.school)
    }

    function changeInfo() {
      person.age = 24
      person.info.school = '河北农业大学西校区'
      person.hobby[0] = '学习'
    }

    return {
      sayHello,
      changeInfo,
      person
    }
  }
}
</script>

<style scoped>

</style>