
<template>
  <div :class="['mask', DiaShow ? 'active' : '']">
    <div class="dia-wrap">
      <div class="dia-dis">
        <div class="dialog">
          <div class="dialog-head">编辑信息</div>
          <el-form label-width="80px" :inline="true" class="mt1w">
            <el-form-item label="姓名:">
              <el-input clearable v-model="Data.xinxi.title"></el-input>
            </el-form-item>
            <el-form-item label="电话:">
              <el-input clearable v-model="Data.xinxi.tel"></el-input>
            </el-form-item>
          </el-form>
          <el-form label-width="80px" :inline="true">
            <el-form-item label="微信:">
              <el-input clearable></el-input>
            </el-form-item>
            <el-form-item label="QQ:">
              <el-input clearable></el-input>
            </el-form-item>
          </el-form>
          <el-form label-width="80px" :inline="true">
            <el-form-item label="回访状态">
              <el-select placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="渠道标记">
              <el-select placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form label-width="80px">
            <el-form-item label="咨询师" v-if="Data.zixunshow == 1">
              <el-select placeholder="请选择">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea"></el-input>
            </el-form-item>
          </el-form>
          <div class="editbtn">
            <el-button @click="CloseDia">取 消</el-button>
            <el-button type="primary" @click="CloseDia">确 定</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from "@vue/composition-api";
import { computed, reactive, inject, onMounted } from "vue";
import { useStore } from "vuex";
//import request from "../utils/request.js";
//import qs from "qs";
//import { ElMessage } from "element-plus";
export default defineComponent({
  setup() {
    const store = useStore();
    const DiaShow = computed(() => store.state.dialogFormVisible);
    const CloseDia = () => {
      store.commit("setDialogFormVisible", false);
    };
    let xinxiId = inject("xinxiId");
    const Data = reactive({
      zixunshow: sessionStorage.usergroup,
      xinxiID: xinxiId,
      xinxi: [],
    });
    
    const getxinxi = ()=>{
      console.log(Data.xinxiId);
      let d = {
        id: Data.xinxiId//编辑信息ID
      };
      request
        .request({
          method: "post",
          url: "/api/getxinxi",
          data: qs.stringify(d),
        })
        .then(function (response) {
          if (response.data.code == "2000") {
            Data.xinxi = response.data.data;
            ElMessage({
                    showClose: true,
                    message: '认领成功',
                    type: 'success'
                  });
          } else {
            ElMessage({
              showClose: true,
              message: response.data.msg,
              type: "error",
            });
          }
        })
        .catch(function (error) {
          ElMessage({
            showClose: true,
            message: error,
            type: "error",
          });
        });
    };
    
    onMounted(() => {
      //getxinxi()
      console.log(Data.xinxiId);
    });
    return {
      DiaShow,
      CloseDia,
      Data,
      //getxinxi
    };
  },
});
</script>


<style>
.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  background: rgba(0, 0, 0, 0.4);
  z-index: 100;
  left: 0;
  top: 0;
  display: none;
}
.mask.active {
  display: block;
}
.dia-wrap {
  width: 750px;
  height: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.dia-dis {
  width: 100%;
  height: auto;
}

.dia-dis .dialog {
  width: 100%;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  padding: 1.1vw;
  font-size: 18px;
  letter-spacing: 1px;
}
.mt1w {
  margin-top: 1vw;
}
.editbtn {
  width: 20%;
  margin-left: 78%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
</style>
