<template>
  <a-row justify="center" flex="middle">
    <a-col :span="4" :xs="24" :sm="24" :md="6" :lg="6" :xl="5" :xxl="4">
      <HeaderLeft/>
    </a-col>
    <a-col :span="10" :xs="0" :sm="0" :md="18" :lg="18" :xl="9" :xxl="20" className="headerMenu">
      <HeaderMenu/>
      <HeaderUser/>
    </a-col>
  </a-row>
</template>

<script>
import HeaderLeft from "./HeaderLeft"
import HeaderMenu from "./HeaderMenu"
import HeaderUser from "./HeaderUser";

export default {
  name: "HeaderMain",
  components: {HeaderUser, HeaderMenu, HeaderLeft},
  setup() {


    return {}
  }
}
</script>

<style scoped>
.ant-row {
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: rgb(240, 240, 240);
  height: 64px;
}
.headerMenu{
  display: flex;
  align-items: center;
  margin-left: auto;
  height: 64px;
}
.HeaderUser{
  margin-top: -2px;
}
</style>