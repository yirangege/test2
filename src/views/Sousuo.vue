<template>
  <wbhead></wbhead>
  <el-container>
    <el-main class="wb-main">
      <el-form
        :inline="true"
        :model="formInline"
        label-position="right"
        label-width="70px"
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
        <el-form-item label="回访状态" >
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
          --
          <el-date-picker
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
          <el-button type="primary" @click="getwangbaoList">查询</el-button>
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
        
        :highlight-current-row="true"
        :border="true"
        class="list"
        @expand-change="gethuifanglist"
      >
      
        <el-table-column type="expand" >
          <template v-slot="props">
            <div class="expand-form">
              <div class="expand-form-left">
                <table>
                  
                  <tbody class="trhideinfos">
                    <tr>
                      <td class="detail-label">来源页面:</td>
                      <td class="maxtdej1">{{ props.row.referrer }}</td>
                      <td class="detail-label">报名页面:</td>
                      <td class="maxtdej1">
                        <ul v-html="props.row.signup"></ul>
                      </td>
                    </tr>
                    <tr>
                      <td class="detail-label">ip地址:</td>
                      <td class="maxtdej1">{{ props.row.ip }}</td>
                      <td class="detail-label">是否推送信息池:</td>
                      <td class="maxtdej1">
                        <span v-if="props.row.xxc == 0">未推送</span>
                        <span v-else-if="props.row.xxc == 1">已推送</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="expand-form-right" v-if="Data.huifangdetail.length>0">
                <table>
                  <tr>
                    <td>序号</td>
                    <td>状态</td>
                    <td>渠道</td>
                    <td>咨询师</td>
                    <td>操作人</td>
                    <td>备注</td>
                    <td>时间</td>
                  </tr>
                  <tr v-for="(item, index) in Data.huifangdetail" :key="index">
                    <td>{{index+1}}</td>
                    <td>{{item.rv_title}}</td>
                    <td>{{item.fw_id}}</td>
                    <td>{{item.uid}}</td>
                    <td>{{item.caozuoren}}</td>
                    <td>{{item.content}}</td>
                    <td>{{item.created}}</td>
                  </tr>
                  
                </table>

              </div>
              <div class="expand-form-right" v-else-if="Data.huifangdetail.length==0">
                暂无回访数据
              </div>
            </div>

            
          </template>
        </el-table-column>
        <el-table-column
          label="序号"
          type="index"
          width="60"
          resizable
        ></el-table-column>
        <el-table-column label="姓名" prop="title" resizable>
          <template v-slot="name">
            <span @click="copyTel(name.row.title)">{{ name.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="电话" prop="tel" resizable>
          <template v-slot="tel">
            <span @click="copyTel(tel.row.tel)">{{ tel.row.tel }}</span>
          </template>
        </el-table-column>
        <el-table-column label="微信" prop="wechat" resizable>
        </el-table-column>
        <el-table-column label="QQ" prop="qq" resizable> </el-table-column>
        <el-table-column label="关键词/备注" prop="message" resizable>
        </el-table-column>
        <el-table-column
          label="报名时间"
          prop="created"
          min-width="120"
          resizable
        >
        </el-table-column>
        <el-table-column label="来源渠道" prop="fw_id" resizable>
        </el-table-column>
        <el-table-column label="回访状态" prop="rv_id" resizable width="100">
          <template v-slot="rv">
            <div
              :style="[`background:${rv.row.rv_color}`, 'color:#fff']"
              class="bg"
            >
              {{ rv.row.rv_title }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="咨询师" prop="uid" resizable width="90">
          <template v-slot="scope">
            <el-button
              type="success"
              size="mini"
              @click="renling(scope.row.id)"
              v-if="
                scope.row.uid == null ||
                scope.row.uid == '未认领' ||
                scope.row.uid == 0
              "
              >认 领</el-button
            >
            <span v-else-if="scope.row.uid != null">{{ scope.row.uid }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" min-width="90">
          <template #header> 操作 </template>
          <template v-slot="caozuo">
            <el-button
              size="mini"
              type="success"
              @click="openDia(caozuo.row.id)"
              icon="el-icon-edit-outline"
              ></el-button
            >
            <el-button
              size="mini"
              type="success"
              icon="el-icon-delete"
              @click="tryRecycleBin(caozuo.row.id)"
              v-if="userinfo.usergroup == 1"
              ></el-button
            >
            <el-button
              size="mini"
              type="success"
              icon="el-icon-tickets"
              @click="getyiliao(caozuo.row.id)"
              ></el-button
            >
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
              <el-input clearable v-model="Data.xinxi.wechat"></el-input>
            </el-form-item>
            <el-form-item label="QQ:">
              <el-input clearable v-model="Data.xinxi.qq"></el-input>
            </el-form-item>
          </el-form>
          <el-form label-width="80px" :inline="true">
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
          </el-form>
          <el-form label-width="80px">
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
            <el-form-item label="备注">
              <el-input type="textarea" v-model="Data.xinxi.message"></el-input>
            </el-form-item>
            <el-form-item label="快捷备注">
              <div class="btn-list">
                <el-button type="primary" @click="kuaijie('有效')"
                  >有效</el-button
                >
                <el-button type="primary" @click="kuaijie('未接')"
                  >未接</el-button
                >
                <el-button type="primary" @click="kuaijie('挂断')"
                  >挂断</el-button
                >
                <el-button type="primary" @click="kuaijie('空号')"
                  >空号</el-button
                >
                <el-button type="primary" @click="kuaijie('停机')"
                  >停机</el-button
                >
                <el-button type="primary" @click="kuaijie('关机')"
                  >关机</el-button
                >
                <el-button type="primary" @click="kuaijie('重复')"
                  >重复</el-button
                >
                <el-button
                  type="primary"
                  @click="kuaijie('更换咨询师')"
                  class="mt20"
                  >更换咨询师</el-button
                >
              </div>
            </el-form-item>
          </el-form>
          <div class="editbtn">
            <el-button @click="CloseDia">取 消</el-button>
            <el-button type="primary" @click="save">确 定</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div :class="['mask2', yiliaoShow ? 'active' : '']">
    <div class="dia-wrap">
      <div class="dia-dis">
        <div class="yl-cover">
          <div class="yl-list">
            <div class="yl-list-t">
              聊天记录
              <el-button
                type="primary"
                icon="el-icon-close"
                circle
                class="yl-close"
                @click="CloseYiliao"
              ></el-button>
            </div>

            <div class="yl-list-c">
              <div v-if="Data.yiliaoDetail.length == 0" class="noyl">
                无聊天记录
              </div>
              <div v-else-if="Data.yiliaoDetail != 0">
                <div v-for="(item, index) in Data.yiliaoDetail" :key="index">
                  <div class="yl-left" v-if="item.sender_type == 1">
                    <div class="yl-tx1">
                      <img src="https://img.lnomick.com/wangbao/tx2.png" />
                    </div>
                    <div class="yl-r">
                      <div class="yl-time">{{ item.create_time }}</div>
                      <div class="yl-message">{{ item.message }}</div>
                    </div>
                  </div>
                  <div class="yl-right" v-else-if="item.sender_type != 1">
                    <div class="yl-l">
                      <div class="yl-time">{{ item.create_time }}</div>
                      <div class="yl-message" v-html="item.message"></div>
                    </div>
                    <div class="yl-tx2">
                      <img src="https://img.lnomick.com/wangbao/tx2.png" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { defineComponent } from "@vue/composition-api";
import { reactive, onMounted, computed } from "vue";
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
        "ip",
        "tel",
        "wechat",
        "qq",
        "fw_id",
        "rv_id",
        "uid",
        "referrer",
        "signup",
        "created",
        "modified",
        "remark_num",
        "message",
        "rescon",
      ],
    });
    //展开行 展开发送请求获取回访详情 
    const gethuifanglist = (row,expandedRows)=>{
      if(expandedRows.length){
        //console.log("此时展开");
        if(row){
          //console.log(row.id)
          let d = {
        id: row.id, //编辑信息ID
      };
      request
        .request({
          method: "post",
          url: "/api/gethuifangdetail",
          data: qs.stringify(d),
        })
        .then(function (response) {
          if (response.data.code == "2000") {

            Data.huifangdetail = response.data.data
            console.log(Data.huifangdetail)
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
        }
        
      }
      else{
        //console.log("此时折叠");
      }
      
    }
    const copyTel = (content) => {
      //创建一个 Input标签

      let oInput = document.createElement("input");
      oInput.value = content;
      document.body.appendChild(oInput);
      oInput.select(); // 选择对象;

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
    const kuaijie = (text) => {
      if (Data.xinxi.message == "" || Data.xinxi.message == null) {
        Data.xinxi.message = text;
      } else {
        Data.xinxi.message = Data.xinxi.message.concat(text);
      }
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
      huifangdetail: [],
    });
    const selectData = reactive({
      title: "",
      tel: "",
      wechat: "",
      qq: "",
      starttime: "",
      endtime: "",
    });
    const clear = () => {
      selectData.title = "";
      selectData.tel = "";
      Data.huifang = "";
      Data.zixunshi = "";
      Data.qudao = "";
      selectData.wechat = "";
      selectData.qq = "";
      selectData.starttime = "";
      selectData.endtime = "";
    };
    var saveSelectData; //定义一个中间变量保存 更改数据前查询状态 更改数据后按此状态查询
    const openDia = (id) => {
      store.commit("setDialogFormVisible", true);

      //赋值查询状态变量
      saveSelectData = {
        pageSize: paginationData.pageSize, //每页数量
        pageNum: paginationData.currentPage, //第几页数据
        title: selectData.title,
        tel: selectData.tel,
        qq: selectData.qq,
        wechat: selectData.wechat,
        rv_id: Data.huifang,
        fw_id: Data.qudao,
        uid: Data.zixunshi,
        starttime: selectData.starttime,
        endtime: selectData.endtime,
      };

      Data.xinxiId = id;
      getxinxi();
    };
    const DiaShow = computed(() => store.state.dialogFormVisible);
    const yiliaoShow = computed(() => store.state.yiliaoShow);
    const CloseDia = () => {
      store.commit("setDialogFormVisible", false);
      //Data.optionhuifang = []
      //Data.huifang = "";
      //Data.optionqudao = []
      //Data.qudao = "";
      //Data.optionzixunshi = []
      // Data.zixunshi = "";
    };
    const CloseYiliao = () => {
      store.commit("setYiliaoShow", false);
      Data.yiliaoDetail = [];
    };
    const getCsv = () => {
      let d = {
        title: selectData.title,
        tel: selectData.tel,
        qq: selectData.qq,
        wechat: selectData.wechat,
        rv_id: Data.huifang,
        fw_id: Data.qudao,
        uid: Data.zixunshi,
        starttime: selectData.starttime,
        endtime: selectData.endtime,
      };

      request
        .request({
          method: "post",
          url: "/api/WbCsv",
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
                link.download = `非展示类${nowTime}.csv`;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                //clear();
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
    const renling = (id) => {
      let d = {
        id: id, //认领信息ID
        uid: sessionStorage.userId, //认领咨询师ID
      };
      request
        .request({
          method: "post",
          url: "/api/renling",
          data: qs.stringify(d),
        })
        .then(function (response) {
          if (response.data.code == "2000") {
            getwangbaoList();
            ElMessage({
              showClose: true,
              message: "认领成功",
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
    const getxinxi = () => {
      let d = {
        id: Data.xinxiId, //编辑信息ID
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
            Data.huifang = response.data.data.rv_id;
            Data.qudao = response.data.data.fw_id;
            if (response.data.data.uid == 0) {
              //有uid未0的情况
              Data.zixunshi = 16;
            } else {
              Data.zixunshi = response.data.data.uid;
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
    const save = () => {
      let d = {
        id: Data.xinxiId, //编辑信息ID
        editid: sessionStorage.userId, //操作者ID
        title: Data.xinxi.title,
        tel: Data.xinxi.tel,
        wechat: Data.xinxi.wechat,
        qq: Data.xinxi.qq,
        rv_id: Data.huifang,
        fw_id: Data.qudao,
        uid: Data.zixunshi,
        message: Data.xinxi.message,
      };

      request
        .request({
          method: "post",
          url: "/api/wangbaosave",
          data: qs.stringify(d),
        })
        .then(function (response) {
          if (response.data.code == "2000") {
            ElMessage({
              showClose: true,
              message: response.data.msg,
              type: "success",
            });
            CloseDia();
            saveendgetwangbaoList(saveSelectData);
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
    const getyiliao = (id) => {
      store.commit("setYiliaoShow", true);
      let d = {
        id: id, //编辑信息ID
      };
      request
        .request({
          method: "post",
          url: "/api/getyiliao",
          data: qs.stringify(d),
        })
        .then(function (response) {
          if (response.data.code == "2000") {
            Data.yiliaoDetail = response.data.data;
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
      getwangbaoList();
    };
    const handleCurrentChange = (val) => {
      paginationData.currentPage = val;
      getwangbaoList();
    };
    const getwangbaoList = () => {
      let h = {
        pageSize: paginationData.pageSize, //每页数量
        pageNum: paginationData.currentPage, //第几页数据
        title: selectData.title,
        tel: selectData.tel,
        qq: selectData.qq,
        wechat: selectData.wechat,
        rv_id: Data.huifang,
        fw_id: Data.qudao,
        uid: Data.zixunshi,
        starttime: selectData.starttime,
        endtime: selectData.endtime,
      };
      request
        .request({
          method: "post",
          url: "/api/selectWangbao",
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
    //编辑信息后按原条件重新查询
    const saveendgetwangbaoList = (dataH) => {
      request
        .request({
          method: "post",
          url: "/api/selectWangbao",
          data: qs.stringify(dataH),
        })
        .then(function (response) {
          if (response.data.code == "2000") {
            wangbaoData.DataList = response.data.data.data;
            paginationData.total = response.data.data.total;
            //还原查询状态
            paginationData.pageSize = saveSelectData.pageSize;
            selectData.title = saveSelectData.title;
            selectData.tel = saveSelectData.tel;
            selectData.qq = saveSelectData.qq;
            selectData.wechat = saveSelectData.wechat;
            Data.huifang = saveSelectData.rv_id;
            Data.qudao = saveSelectData.fw_id;
            Data.zixunshi = saveSelectData.uid;
            selectData.starttime = saveSelectData.starttime;
            selectData.endtime = saveSelectData.endtime;
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
    const tryRecycleBin = (id) => {
      ElMessageBox({
        title: "提示", //MessageBox 标题
        message: "是否确定删除当前项?", //MessageBox 消息正文内容
        confirmButtonText: "确定", //确定按钮的文本内容
        cancelButtonText: "取消", //取消按钮的文本内容
        showCancelButton: true, //是否显示取消按钮
        closeOnClickModal: false, //是否可通过点击遮罩关闭
        type: "warning", //消息类型，用于显示图标
      })
        .then(() => {
          RecycleBin(id);
        })
        .catch(() => {
          ElMessage.info("已取消删除!");
        });
    };

    const RecycleBin = (id) => {
      let d = {
        id: id, //添加到回收站信息ID
        deluid: sessionStorage.userId, //操作人ID
      };
      request
        .request({
          method: "post",
          url: "/api/RecycleBin",
          data: qs.stringify(d),
        })
        .then(function (response) {
          if (response.data.code == "2000") {
            getwangbaoList();
            ElMessage({
              showClose: true,
              message: "信息已加入回收站",
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
      getwangbaoList();
      gethuifang();
      getqudao();
      getzixunshi();
    });
    return {
      wangbaoData,
      getwangbaoList,
      handleSizeChange,
      handleCurrentChange,
      paginationData,
      renling,
      userinfo,
      openDia,
      Data,
      DiaShow,
      CloseDia,
      getxinxi,
      gethuifang,
      getqudao,
      save,
      getzixunshi,
      getyiliao,
      yiliaoShow,
      CloseYiliao,
      selectData,
      clear,
      getCsv,
      Csv,
      copyTel,
      RecycleBin,
      tryRecycleBin,
      kuaijie,
      saveendgetwangbaoList,
      gethuifanglist
    };
  },
});
</script>

<style scoped>
.list {
  width: 100%;

  margin-top: 1vw;
}
.el-main{ padding: 0 1vw !important;}
.el-form-item{ margin-bottom: 0 !important; margin-top: 1vw;}
.pagination {
  margin-top: 20px;
}
.wb-main ::v-deep .el-table td, .el-table th{ padding: 3px 0 !important; color: #000 !important;}
.expand-form{ width: 100%; display: flex; flex-direction: row; justify-content: space-between; align-items: center;}
.expand-form-left{ width: 55%; overflow: hidden;}
.expand-form-right{ width: 40%;}
.expand-form-right table{ width: 100%; padding: 10px; line-height: 1.5; border:1px solid #EBEEF5;}
.expand-form-right table td{ word-break: break-all; text-align: center;}
.expand-form-left table{ width: 100%; border-collapse: collapse; border-spacing: 0; border:1px solid #EBEEF5;}
.detail-label{ width: 120px; padding-left: 10px;}
.center{ text-align: center;}
.expand-form-left table ::v-deep td{ word-break: break-all; }
.maxtdej1{ padding: 10px; line-height: 1.5; }
.bg {
  width: 75px;
  height: 28px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  letter-spacing: 2px;
  border-radius: 3px;
  font-weight: bold;
}
.btn-list {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex-wrap: wrap;
}
.mask {
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
.mask.active {
  display: block;
}
.mask2 {
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
.mask2.active {
  display: block;
}

.expand-li {
  border: 1px solid #ebeef5;
  padding: 10px;
}
.dia-dis .yl-list {
  width: 100%;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  padding: 1.1vw;
  font-size: 18px;
  letter-spacing: 1px;
  transition: all 1s;
  position: relative;
}
.yl-list-t {
  width: 100%;
  height: 42px;
  background: #f8f8f8;
  border-bottom: 1px solid #eee;

  color: #333;
  font-size: 16px;
  padding-left: 20px;
  line-height: 42px;
  letter-spacing: 2px;
  font-weight: bold;
}
.yl-close {
  position: absolute;
  right: 10px;
  top: 10px;
}
.yl-list-c {
  width: 100%;
  height: 40vh;
  overflow-y: scroll;
  padding: 1vw;
  background: #fff;
}
.yl-left {
  width: 60%;
  margin-top: 0.52vw;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
}
.yl-tx1 {
  width: 36px;
  height: 37px;
  margin-right: 5px;
}
.yl-r .yl-time {
  text-align: left;
  font-size: 12px;
  color: #666;
}
.yl-r .yl-message {
  background: rgb(30, 149, 255);
  color: #fff;
  margin-top: 5px;
  padding: 0.52vw;
  border-radius: 0.52vw;
}
.yl-right {
  width: 60%;
  margin-left: 40%;
  margin-top: 0.52vw;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-end;
}
.yl-tx2 {
  width: 36px;
  height: 36px;
  margin-left: 5px;
}
.yl-l .yl-time {
  text-align: right;
  font-size: 12px;
  color: #666;
}
.yl-l .yl-message {
  background: #ffefe4;
  color: #333;
  margin-top: 5px;
  padding: 0.52vw;
  border-radius: 0.52vw;
  text-align: left;
}
.noyl {
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 2px;
}
.ml20 {
  margin-left: 20px;
}
.mt20 {
  margin-top: 20px;
  margin-left: 0;
}
</style>