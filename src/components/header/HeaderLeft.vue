<template>
  <a className="left-a">
    <img height="32" :src='FruitTreeImgPath'>
    Fruit Tree Archives
  </a>
</template>

<script>
export default {
  name: "HeaderLeft",
  setup() {
    let FruitTreeImgPath = 'FruitTree.svg'
    let FruitTreeWordPath = 'logo-word.png'
    return {
      FruitTreeImgPath,FruitTreeWordPath
    }
  }
}
</script>

<style scoped>
.left-a {
  padding-left: 40px;
  overflow: hidden;
  height: 64px;
  line-height: 64px;
  color:rgba(0,0,0,.85);
  font-size: 20px;
}
.span{
  font-size: 20px;
  line-height: 32px;
}
.img{
  height: 32px;
  margin-right: 16px;
}
</style>