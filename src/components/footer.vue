<template>
  <el-footer>
    <div id="footer">
      <p>亲爱的<span>{{Data.nickname}}</span>同学，欢迎登录沈阳欧米奇网报管理系统，祝你工作愉快，业绩满满！</p>
      <p>Copyright©Omick All rights reserved. 版权所有：沈阳欧米奇西点西餐学院 备案号 辽ICP备14018524号-1.</p>
    </div>
  </el-footer>
</template>
<script>
import { defineComponent } from "@vue/composition-api";
import { reactive } from "vue";

export default defineComponent({
  setup() {
      const Data = reactive({
          nickname: sessionStorage.nickname
      })
      return{
          Data
      }
  },
});
</script>

<style scoped>
#footer {
  width: 100%;
  height: 50px;
  line-height: 30px;
  color: #777;
  text-align: center;
  font-size: 14px;
  border-top: 1px solid #ccc;
  padding: 20px 0px;
  background: #fff;
  z-index: 9;
}
#footer span{ padding: 0 10px; color: #FF5722; font-weight: bold; letter-spacing: 1px;}
</style>