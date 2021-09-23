<template>
  <p class="footer">
    <CopyrightOutlined style="font-size: 12px"/>
    Hebei Agriculture University
  </p>
  <!-- target="_blank"打开新页面-->
  <p class="footer"><a href="http://www.hebau.edu.cn/" target="_blank" class="footer-a">河北农业大学</a></p>
  <p class="footer">邮编：071001</p>
</template>

<script>
import {
  CopyrightOutlined
} from '@ant-design/icons-vue';

export default {
  name: "Footer",
  components: {CopyrightOutlined}
}
</script>

<style scoped>
.footer {
  display: inline;
  color: #bbbbbb;
  margin-right: 20px;
  font-family: "Microsoft YaHei";
}

.footer-a {
  color: #bbbbbb;
  font-family: "Microsoft YaHei";
}

.footer-a:hover {
  color: #222222;

}
</style>