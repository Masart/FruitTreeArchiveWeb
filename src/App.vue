<template>
  <a-layout>
    <a-layout-header><HeaderMain/></a-layout-header>
    <a-layout-content><router-view></router-view></a-layout-content>
    <!--  <router-view></router-view>-->
    <a-layout-footer><Footer/></a-layout-footer>
  </a-layout>
</template>

<script>
import {useRouter} from 'vue-router'
import HeaderMain from "./components/header/HeaderMain";
import Footer from "./components/footer/Footer";

export default {

  name: "App",
  components: {HeaderMain, Footer},
}
</script>

<style scoped>
.ant-layout-header {
  background-color: white;
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: rgb(240, 240, 240);
  line-height: 64px;
  position: fixed;
  z-index: 1;
  width: 100%;
}

.ant-layout-content {
  height: 190vh;
  margin-top: 64px;
  background-color: white;
  padding: 40px;
  align-items: center;
}

.ant-layout-footer {
  display: block;
  text-align: center;
  width: 100%;
  position: fixed;
  z-index: 200;
  bottom: 0;
  left: 0;
  height: 22px;
  padding: 0;
  overflow: hidden;
  margin: 0;
  line-height: 22px;
  background: #fff;
}
</style>