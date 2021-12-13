<template>
  <div class="login">
    <div class="loginBox">
      <div class="loginTitle">沈阳欧米奇网报系统</div>
      <el-form  label-width="80px" :label-position="form.labelPosition">
        <el-form-item label="用户名:">
          <el-input v-model="form.username" clearable suffix-icon="el-icon-user-solid"></el-input>
        </el-form-item>
        <el-form-item label="密码:">
          <el-input v-model="form.password" clearable show-password suffix-icon="el-icon-lock"></el-input>
        </el-form-item>
      </el-form>
      <div class="loginButton"><el-button type="primary" @click="SubLogin" >登 录<i class="el-icon-mouse el-icon--right"></i></el-button></div>
      
    </div>
  </div>
</template>
<script>
import { defineComponent } from "@vue/composition-api";
import { reactive } from "vue";
import request from '@/utils/request.js'
import qs from 'qs'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router';
export default defineComponent({
  setup() {
    const router = useRouter();
    const login = () => {
      sessionStorage.setItem("islogin", "islogin");
      router.push("/Index");
    };
    const logout = () => {
      localStorage.removeItem("islogin");
    };
    const form = reactive({
        labelPosition: 'left',
        username: '',
        password: ''
    })
    const SubLogin = () => {
          let h = {
              username: form.username,//姓名
              password: form.password,//电话
          };
          if(form.username=='')
          {
              ElMessage({
                showClose: true,
                message: '用户名不能为空',
                type: 'error'
              });
              return false
          }
          if(form.password=='')
          {
              ElMessage({
                showClose: true,
                message: '密码不能为空',
                type: 'error'
              });
              return false
          }
          
          request.request({
              method:'post',
              url:'/api/Wblogin',
              data: qs.stringify(h)
          }).then(function (response) {
              if(response.data.code == '2000'){
                  ElMessage({
                    showClose: true,
                    message: '登陆成功',
                    type: 'success'
                  });
                  sessionStorage.setItem("userId", response.data.data.id);
                  sessionStorage.setItem("nickname", response.data.data.nickname);
                  sessionStorage.setItem("usergroup", response.data.data.user_group_id);
                  console.log(response.data.data)
                  login()
                  form.username = ''
                  form.password = ''
              }
              else{
                  ElMessage({
                    showClose: true,
                    message: response.data.msg,
                    type: 'error'
                  });
              }
          })
          .catch(function (error) {
              ElMessage({
                    showClose: true,
                    message: error,
                    type: 'error'
                  });
          });
    }
    return {
      login,
      logout,
      form,
      SubLogin
    };
  },
});
</script>
<style scoped>
.login {
  width: 100%;
  height: 100%;
  background: url(https://img.lnomick.com/wangbao/wangbao_bg.png) center center
    no-repeat;
  background-size: 100% 100%;
  position: relative;
  
}
.loginBox {
  width: 360px;
  background-color: #fff;
  border-radius: 10px;
  position: absolute;
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
  padding: 20px;
}
.loginTitle {
  width: 100%;
  font-size: 20px;
  color: #555;
  margin-bottom: 20px;
  letter-spacing: 1px;
  background: #f9f9f9;
  border-radius: 10px 10px 0 0;
  font-weight: bold;
}
.loginButton{ width: 100%; display: flex; flex-direction: row; justify-content: flex-end;}
</style>
