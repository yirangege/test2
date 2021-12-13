<template>
  <wbhead></wbhead>
  <el-container>
    <el-main>
      <div class="menu-btn">
    <el-button type="info" ><router-link to="/RecycleBin">非展示类</router-link></el-button>
    <el-button type="info" disabled="true">展示类</el-button>
  </div>
      <el-form
        :inline="true"
        :model="formInline"
        label-position="right"
        label-width="75px"
        class="demo-form-inline"
      >
        <el-form-item label="姓名:">
          <el-input v-model="selectData.title" placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item label="电话:">
          <el-input v-model="selectData.tel" placeholder="电话"></el-input>
        </el-form-item>
        <el-form-item label="微信:">
          <el-input v-model="selectData.wechat" placeholder="微信"></el-input>
        </el-form-item>
        <el-form-item label="QQ:">
          <el-input v-model="selectData.qq" placeholder="QQ"></el-input>
        </el-form-item>
        <el-form-item label="回访状态">
          <el-select placeholder="请选择" v-model="Data.huifang">
            <el-option
              v-for="item in Data.optionhuifang"
              :key="item.value"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="来源渠道">
          <el-select placeholder="请选择" v-model="Data.qudao">
            <el-option
              v-for="item in Data.optionqudao"
              :key="item.value"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="咨询师">
          <el-select placeholder="请选择" v-model="Data.zixunshi">
            <el-option
              v-for="item in Data.optionzixunshi"
              :key="item.value"
              :label="item.nickname"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="查询时间">
          <el-date-picker
            v-model="selectData.starttime"
            type="datetime"
            placeholder="起始时间"
            align="right"
            :shortcuts="shortcuts"
          >
          </el-date-picker>
          -<el-date-picker
            v-model="selectData.endtime"
            type="datetime"
            placeholder="结束时间"
            align="right"
            :shortcuts="shortcuts"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item class="ml20">
          <el-button type="success" @click="clear">重置</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getRecycleBin">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="info" @click="getCsv" v-if="userinfo.usergroup == 1"
            >导出</el-button
          >
        </el-form-item>
      </el-form>
      <el-table
        :data="wangbaoData.DataList"
        style="width: 100%"
        height="500"
        :highlight-current-row="true"
        :border="true"
        class="list"
      >
        
        <el-table-column
          label="序号"
          type="index"
          width="50"
          resizable
        ></el-table-column>
        <el-table-column label="姓名" prop="title" width="100" resizable>
        </el-table-column>
        <el-table-column label="电话" prop="tel" resizable>
          <template v-slot="tel">
            <span @click="copyTel(tel.row.tel)">{{ tel.row.tel }}</span>
          </template>
        </el-table-column>
        
        <el-table-column label="备注" prop="remarks" resizable>
        </el-table-column>
        <el-table-column
          label="报名时间"
          prop="created"
          min-width="170"
          resizable
        >
        </el-table-column>
        <el-table-column
          label="删除时间"
          prop="deltime"
          min-width="170"
          resizable
        >
        </el-table-column>
        
        
        <el-table-column label="咨询师" prop="uid" resizable>
        </el-table-column>
        <el-table-column label="删除人" prop="deluid" resizable>
        </el-table-column>
        
        <el-table-column align="center" min-width="180">
          <template #header> 操作 </template>
          <template v-slot="caozuo">
            <el-button
              size="mini"
              type="success"
              icon="el-icon-refresh"
              @click="tryRecycleBinBack(caozuo.row.id)"
            >恢复</el-button>
            
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        v-model:currentPage="paginationData.currentPage"
        background
        :page-sizes="paginationData.pageSizes"
        :page-size="paginationData.pageSize"
        layout="sizes, prev, pager, next"
        :total="paginationData.total"
        class="pagination"
      >
      </el-pagination>
    </el-main>
  </el-container>
  <wbfoot></wbfoot>
</template>
<script>
import { defineComponent } from "@vue/composition-api";
import { reactive, onMounted } from "vue";
import request from "@/utils/request.js";
import qs from "qs";
import { ElMessage, ElMessageBox } from "element-plus";
import { useStore } from "vuex";
import json2csv from "json2csv";
import Wbhead from "../components/header.vue";
import Wbfoot from "../components/footer.vue";
export default defineComponent({
  components: {
    Wbfoot,
    Wbhead,
  },
  setup() {
    const store = useStore();
    const userinfo = reactive({
      nickname: sessionStorage.nickname,
      usergroup: sessionStorage.usergroup,
      userId: sessionStorage.userId,
    });
    const Csv = reactive({
      fields: [
        "id",
        "title",
        "tel",
        "uid",
        "remarks",
        "created",
        "deltime",
        "deluid",
      ],
    });
    const copyTel = (content) => {
      //创建一个 Input标签
      console.log("1");
      let oInput = document.createElement("input");
      oInput.value = content;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;
      console.log(oInput.value);
      // 执行浏览器复制命令
      /// 复制命令会将当前选中的内容复制到剪切板中
      /// 如这里构建的 Input标签
      document.execCommand("Copy");
      ElMessage({
        showClose: true,
        message: "复制成功",
        type: "success",
      });
      ///复制成功后再将构造的标签 移除
      oInput.remove();
    };

    const Data = reactive({
      xinxiId: "",
      xinxi: [],
      optionhuifang: [],
      huifang: "",
      optionqudao: [],
      qudao: "",
      optionzixunshi: [],
      zixunshi: "",
      yiliaoDetail: [],
    });
    const selectData = reactive({
      name: "",
      tel: "",
      wechat: "",
      qq: "",
      starttime: "",
      endtime: "",
    });
    const clear = () => {
      selectData.name = "";
      selectData.tel = "";
      Data.huifang = "";
      Data.zixunshi = "";
      Data.qudao = "";
      selectData.wechat = "";
      selectData.qq = "";
      selectData.starttime = "";
      selectData.endtime = "";
    };
    const openDia = (id) => {
      store.commit("setDialogFormVisible", true);
      Data.xinxiId = id;
      
    };
    
    const CloseDia = () => {
      store.commit("setDialogFormVisible", false);
      //Data.optionhuifang = []
      Data.huifang = "";
      //Data.optionqudao = []
      Data.qudao = "";
      //Data.optionzixunshi = []
      Data.zixunshi = "";
    };
    
    const getCsv = () => {
      let d = {
        title: selectData.title,
        tel: selectData.tel,
        uid: Data.zixunshi,
        starttime: selectData.starttime,
        endtime: selectData.endtime,
      };

      request
        .request({
          method: "post",
          url: "/api/RecycleBinCsvZs",
          data: qs.stringify(d),
        })
        .then(function (response) {
          if (response.data.code == "2000") {
            try {
              const result = json2csv.parse(response.data.data, {
                fields: Csv.fields,
              });
              // 判断浏览器类型
              if (
                (navigator.userAgent.indexOf("compatible") > -1 &&
                  navigator.userAgent.indexOf("MSIE") > -1) ||
                navigator.userAgent.indexOf("Edge") > -1
              ) {
                //IE10或Edge浏览器
                var BOM = "\uFEFF";
                var csvData = new Blob([BOM + result], { type: "text/csv" });
                navigator.msSaveBlob(csvData, `test.csv`);
              } else {
                //非IE浏览器
                var myDate = new Date();
                var nowTime = myDate.toLocaleString(); //获取当前时间
                var csvContent = "data:text/csv;charset=utf-8,\uFEFF" + result;
                //使用a标签的download属性实现下载功能
                var link = document.createElement("a");
                link.href = encodeURI(csvContent);
                link.download = `展示类回收站${nowTime}.csv`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                clear();
              }
            } catch (err) {
              alert(err);
            }
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
    
    
    const gethuifang = () => {
      request
        .request({
          method: "post",
          url: "/api/gethuifang",
        })
        .then(function (response) {
          if (response.data.code == "2000") {
            Data.optionhuifang = response.data.data;
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
    const getqudao = () => {
      request
        .request({
          method: "post",
          url: "/api/getqudao",
        })
        .then(function (response) {
          if (response.data.code == "2000") {
            Data.optionqudao = response.data.data;
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
    const getzixunshi = () => {
      request
        .request({
          method: "post",
          url: "/api/getzixunshi",
        })
        .then(function (response) {
          if (response.data.code == "2000") {
            Data.optionzixunshi = response.data.data;
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
    

    
    const wangbaoData = reactive({
      DataList: [],
    });
    const paginationData = reactive({
      currentPage: 1, //第几页数据
      pageSizes: [30, 50, 100, 500],
      pageSize: 30, //每页多少条数据
      total: 30,
    });
    const handleSizeChange = (val) => {
      paginationData.pageSize = val;
      getRecycleBin();
    };
    const handleCurrentChange = (val) => {
      paginationData.currentPage = val;
      getRecycleBin();
    };
    const getRecycleBin = () => {
      let h = {
        pageSize: paginationData.pageSize, //每页数量
        pageNum: paginationData.currentPage, //第几页数据
        title: selectData.title,
        tel: selectData.tel,
        uid: Data.zixunshi,
        starttime: selectData.starttime,
        endtime: selectData.endtime,
      };
      request
        .request({
          method: "post",
          url: "/api/getRecycleBinZs",
          data: qs.stringify(h),
        })
        .then(function (response) {
          if (response.data.code == "2000") {
            wangbaoData.DataList = response.data.data.data;
            paginationData.total = response.data.data.total;
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
    
    const tryRecycleBinBack = (id) => {
      ElMessageBox({
        title: "提示", //MessageBox 标题
        message: "是否确定恢复当前信息?", //MessageBox 消息正文内容
        confirmButtonText: "确定", //确定按钮的文本内容
        cancelButtonText: "取消", //取消按钮的文本内容
        showCancelButton: true, //是否显示取消按钮
        closeOnClickModal: false, //是否可通过点击遮罩关闭
        type: "warning", //消息类型，用于显示图标
      })
        .then(() => {
          RecycleBinBack(id)
        })
        .catch(() => {
          ElMessage.info("已取消删除!");
        });
    };

    const RecycleBinBack = (id) => {
      let d = {
        id: id, //添加到回收站信息ID
        deluid: sessionStorage.userId, //操作人ID
      };
      request
        .request({
          method: "post",
          url: "/api/RecycleBinBackZs",
          data: qs.stringify(d),
        })
        .then(function (response) {
          if (response.data.code == "2000") {
            getRecycleBin();
            ElMessage({
              showClose: true,
              message: "信息恢复成功",
              type: "success",
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
      getRecycleBin();
      
    });
    return {
      wangbaoData,
      getRecycleBin,
      handleSizeChange,
      handleCurrentChange,
      paginationData,
      userinfo,
      openDia,
      Data,
      CloseDia,
      gethuifang,
      getqudao,
      getzixunshi,
      selectData,
      clear,
      getCsv,
      Csv,
      copyTel,
      RecycleBinBack,
      tryRecycleBinBack
    };
  },
});
</script>

<style scoped>
.list {
  width: 100%;
  height: 600px;
}
.bg {
  width: 80px;
  height: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  letter-spacing: 2px;
  border-radius: 3px;
  font-weight: bold;
}
.pagination {
  margin-top: 20px;
}


.menu-btn{ margin-bottom: 1vw;}
.menu-btn a{ color: #fff;}
.noyl {
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 2px;
}
.ml20 {
  margin-left: 20px;
}
</style>