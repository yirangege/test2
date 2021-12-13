<template>
    

<el-menu
  :default-active="Data.menuActive"
  class="el-menu"
  mode="horizontal"
  @select="handleSelect"
  background-color="#545c64"
  text-color="#fff"
  active-text-color="#ffd04b">
  <el-menu-item index="/Index"><router-link to="/">非展示类</router-link></el-menu-item>
  <el-menu-item index="/zhanshi"><router-link to="/zhanshi">展示类</router-link></el-menu-item>
  <el-menu-item index="/RecycleBin"><router-link to="/RecycleBin">回收站</router-link></el-menu-item>
  <el-menu-item index="4" v-if="Data.usergroup==1">来源渠道管理</el-menu-item>
  <el-menu-item index="5" v-if="Data.usergroup==1">回访状态管理</el-menu-item>
  <el-menu-item index="6" v-if="Data.usergroup==1">咨询师管理</el-menu-item>
  <el-menu-item index="/Shuju" v-if="Data.usergroup==1"><router-link to="/Shuju">数据统计</router-link></el-menu-item>
  <div class="menu-btn">
    <el-button type="success" @click="openDia">修改密码</el-button>
    <el-button type="info" @click="SubLogOut">退出系统</el-button>
  </div>
  
</el-menu>
<div :class="['mask3', DiaShow ? 'active' : '']">
    <div class="dia-wrap">
      <div class="dia-dis">
        <div class="dialog">
          <div class="dialog-head">修改密码</div>
          <el-form label-width="80px" :inline="true" class="mt1w">
            <el-form-item label="新密码:">
              <el-input v-model="Data.password" clearable show-password suffix-icon="el-icon-lock"></el-input>
            </el-form-item>
            <el-form-item label="确认密码:">
              <el-input  v-model="Data.password2" clearable show-password suffix-icon="el-icon-lock"></el-input>
            </el-form-item>
          </el-form>
          
          <div class="editbtn">
            <el-button @click="CloseDia">取 消</el-button>
            <el-button type="primary" @click="changePassWord">确 定</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from '@vue/composition-api'
import { reactive, onMounted, computed } from 'vue'
import { useStore } from "vuex";
import { useRouter } from 'vue-router';
import { ElMessage } from 'element-plus'
import request from '@/utils/request.js'
import qs from 'qs'
export default defineComponent({
    setup() {
        const router = useRouter();
        const store = useStore();
        const Data = reactive({
            usergroup: sessionStorage.usergroup,
            menuActive: 1,
            userId: sessionStorage.userId,
            password: '',
            password2: ''
        })
        const SubLogOut = () => {
          sessionStorage.removeItem("islogin");
          sessionStorage.removeItem("nickname");
          sessionStorage.removeItem("usergroup");
          router.push("/Login");
        };
        const changePassWord = () => {
          let h = {
              id: Data.userId,
              password: Data.password,
              password2: Data.password2,
          };
          if(Data.password==''||Data.password2=='')
          {
              ElMessage({
                showClose: true,
                message: '密码不能为空',
                type: 'error'
              });
              return false
          }
          if(Data.password!=Data.password2)
          {
              ElMessage({
                showClose: true,
                message: '两次密码输入不一致',
                type: 'error'
              });
              return false
          }
          if(Data.password.length<6||Data.password2.length<6)
          {
              ElMessage({
                showClose: true,
                message: '密码最短6位',
                type: 'error'
              });
              return false
          }
          
          request.request({
              method:'post',
              url:'/api/changePassWord',
              data: qs.stringify(h)
          }).then(function (response) {
              if(response.data.code == '2000'){
                  ElMessage({
                    showClose: true,
                    message: '修改成功请重新登录',
                    type: 'success'
                  });
                  Data.userId = ''
                  CloseDia()
                  SubLogOut()
                  
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
        const DiaShow = computed(() => store.state.passwordShow);
        const openDia = () => {
          store.commit("setPasswordShow", true);
        };
        const CloseDia = () => {
          store.commit("setPasswordShow", false);
          //Data.optionhuifang = []
          Data.password = "";
          //Data.optionqudao = []
          Data.passwor2 = "";
        };
        
        onMounted(() => {
          //console.log(router.currentRoute.value.path);
          Data.menuActive = router.currentRoute.value.path
        })
        return{
            Data,
            SubLogOut,
            openDia,
            CloseDia,
            DiaShow,
            changePassWord
        }
    },
})
</script>

<style scoped>
.el-menu{ position: relative; padding-left: 20px;}
.menu-btn{ width: 200px; height: 100%; display: flex; flex-direction: row; justify-content: space-between; align-items: center; position: absolute; top: 0; right: 5%;}
.mask3 {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  left: 0;
  top: 0;
  display: none;
  transition: all 1s;
}
.mask3.active {
  display: block;
}

</style>