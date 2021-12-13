<template>
  <wbhead></wbhead>
  <div class="left">
    <el-collapse v-model="activeNames" @change="getxiaofei">
      <el-collapse-item title="消费明细" name="1">
        <el-form
          ref="form"
          :model="formInline"
          :inline="true"
          label-position="right"
          label-width="130px"
          class="xiaofei"
        >
          <el-form-item label="头条搜索消费1:">
            <el-input v-model="xiaofei.ttss1"></el-input>
          </el-form-item>
          <el-form-item label="头条搜索消费2:">
            <el-input v-model="xiaofei.ttss2"></el-input>
          </el-form-item>
          <el-form-item label="头条搜索消费3:">
            <el-input v-model="xiaofei.ttss3"></el-input>
          </el-form-item>
          <el-form-item label="展示消费1:">
            <el-input v-model="xiaofei.zsl1"></el-input>
          </el-form-item>
          <el-form-item label="展示消费2:">
            <el-input v-model="xiaofei.zsl2"></el-input>
          </el-form-item>
          <el-form-item label="展示消费3:">
            <el-input v-model="xiaofei.zsl3"></el-input>
          </el-form-item>

          <el-form-item label="百度移动消费1:">
            <el-input v-model="xiaofei.ssbaiduyd1"></el-input>
          </el-form-item>
          <el-form-item label="百度移动消费2:">
            <el-input v-model="xiaofei.ssbaiduyd2"></el-input>
          </el-form-item>
          <el-form-item label="百度移动消费3:">
            <el-input v-model="xiaofei.ssbaiduyd3"></el-input>
          </el-form-item>
          <el-form-item label="百度移动消费4:">
            <el-input v-model="xiaofei.ssbaiduyd4"></el-input>
          </el-form-item>

          <el-form-item label="搜狗移动消费:">
            <el-input v-model="xiaofei.sougouyd"></el-input>
          </el-form-item>
          <el-form-item label="搜狗PC消费:">
            <el-input v-model="xiaofei.sougoupc"></el-input>
          </el-form-item>
          <el-form-item label="神马移动消费:">
            <el-input v-model="xiaofei.smyd"></el-input>
          </el-form-item>
          <el-form-item label="360 PC消费:">
            <el-input v-model="xiaofei.ss360pc"></el-input>
          </el-form-item>
          <el-form-item label="百度PC消费:">
            <el-input v-model="xiaofei.ssbaidupc"></el-input>
          </el-form-item>
          <el-button @click="savexiaofei" type="info">保存消费</el-button>

          <el-form-item label="当日总消费:"
            >{{ xiaofei.ZongXiaoFei.toFixed(2) }}
          </el-form-item>
          <el-form-item label="PC搜索消费:">
            {{ xiaofei.PcSsXiaoFei.toFixed(2) }}
          </el-form-item>
          <el-form-item label="移动搜索消费:"
            >{{ xiaofei.YdSsXiaoFei.toFixed(2) }}
          </el-form-item>
          <el-form-item label="展示类消费:"
            >{{ xiaofei.ZsXiaoFei.toFixed(2) }}
          </el-form-item>
        </el-form>
      </el-collapse-item>
    </el-collapse>
    <div class="line"></div>
    <el-form
      ref="form"
      :model="formInline"
      :inline="true"
      label-position="right"
      label-width="130px"
      class="xinxi"
    >
      <el-form-item label="总信息:">
        <el-input v-model="Data.xinxi_total"></el-input>
      </el-form-item>
      <el-form-item label="电话信息:">
        <el-input v-model="Data.telXinxi"></el-input>
      </el-form-item>
      <el-form-item label="微信信息:">
        <el-input v-model="Data.weixinXinxi"></el-input>
      </el-form-item>
      <el-form-item label="搜索总信息:">
        <el-input v-model="Data.sszongXinxi"></el-input>
      </el-form-item>

      <el-form-item label="搜索电话信息:">
        <el-input v-model="Data.sstelXinxi"></el-input>
      </el-form-item>

      <el-form-item label="搜索微信信息:">
        <el-input v-model="Data.sswechatXinxi"></el-input>
      </el-form-item>
      <el-form-item label="搜索PC电话信息:">
        <el-input v-model="Data.pcsstelXinxi"></el-input>
      </el-form-item>
      <el-form-item label="搜索移动电话信息:">
        <el-input v-model="Data.ydsstelXinxi"></el-input>
      </el-form-item>
      <el-form-item label="自媒体信息:">
        <el-input v-model="Data.zimeitiXinxi"></el-input>
      </el-form-item>
      <el-form-item label="展示类信息:">
        <el-input v-model="Data.zhanshileiXinxi"></el-input>
      </el-form-item>
    </el-form>
    <el-form
      ref="form"
      :model="formInline"
      :inline="true"
      label-position="right"
      label-width="130px"
      class="jieru"
    >
      <el-form-item label="易聊总接入量:">
        <el-input v-model="Data.zongjieru"></el-input>
      </el-form-item>
      <el-form-item label="易聊总信息:">
        <el-input v-model="Data.swtXinxi"></el-input>
      </el-form-item>
      <el-form-item label="网报总信息:">
        <el-input v-model="Data.wbXinxi"></el-input>
      </el-form-item>
      <el-form-item label="搜索网报信息:">
        <el-input v-model="Data.wbssXinxi"></el-input>
      </el-form-item>
      <el-form-item label="展示网报信息:">
        <el-input v-model="Data.wbzsXinxi"></el-input>
      </el-form-item>
      <el-button @click="go" type="info">生成报表</el-button>
      
    </el-form>
  </div>
  <div class="right">
    <div class="table">
      <div class="table-title">
        <div class="table-item">周期</div>
        <div class="table-item">总电话有效信息</div>
        <div class="table-item">搜索电话有效信息</div>
        <div class="table-item">微信信息</div>
        <div class="table-item">展示类</div>
        <div class="table-item">自媒体</div>
      </div>
      <div class="table-title">
        <div class="table-item">今年本月</div>
        <div class="table-item">{{ Data.month_telxinxi }}</div>
        <div class="table-item">{{ Data.month_sstel }}</div>
        <div class="table-item">{{ Data.month_wechat }}</div>
        <div class="table-item">{{ Data.month_zhanshilei_total }}</div>
        <div class="table-item">{{ Data.month_zimeiti_total }}</div>
      </div>
      <div class="table-title">
        <div class="table-item">去年本月</div>
        <div class="table-item">{{ Data.lastmonth_telxinxi }}</div>
        <div class="table-item">{{ Data.lastmonth_month_sstel }}</div>
        <div class="table-item">{{ Data.lastmonth_wechat }}</div>
        <div class="table-item">{{ Data.lastmonth_zhanshilei_total }}</div>
        <div class="table-item">{{ Data.lastmonth_zimeiti_total }}</div>
      </div>
      <div class="table-title">
        <div class="table-item">今年</div>
        <div class="table-item">{{ Data.year_telxinxi }}</div>
        <div class="table-item">{{ Data.year_sstel }}</div>
        <div class="table-item">{{ Data.year_wechat }}</div>
        <div class="table-item">{{ Data.year_zhanshilei_total }}</div>
        <div class="table-item">{{ Data.year_zimeiti_total }}</div>
      </div>
      <div class="table-title">
        <div class="table-item">去年</div>
        <div class="table-item">{{ Data.lastyear_telxinxi }}</div>
        <div class="table-item">{{ Data.lastyear_year_sstel }}</div>
        <div class="table-item">{{ Data.lastyear_wechat }}</div>
        <div class="table-item">{{ Data.lastyear_zhanshilei_total }}</div>
        <div class="table-item">{{ Data.lastyear_zimeiti_total }}</div>
      </div>
      <div class="table-title">
        <div class="table-item">农历月</div>
        <div class="table-item">{{ Data.nl_telxinxi }}</div>
        <div class="table-item">{{ Data.nl_sstel }}</div>
        <div class="table-item">{{ Data.nl_wechat }}</div>
        <div class="table-item">{{ Data.nl_zhanshilei_total }}</div>
        <div class="table-item">{{ Data.nl_zimeiti_total }}</div>
      </div>
      <div class="table-title">
        <div class="table-item">去年农历月</div>
        <div class="table-item">{{ Data.lastyearnl_telxinxi }}</div>
        <div class="table-item">{{ Data.lastyearnl_year_sstel }}</div>
        <div class="table-item">{{ Data.lastyearnl_wechat }}</div>
        <div class="table-item">{{ Data.lastyearnl_zhanshilei_total }}</div>
        <div class="table-item">{{ Data.lastyearnl_zimeiti_total }}</div>
      </div>
    </div>
    <div class="">
      {{ Data.xinxi_time }}日总消费{{
        xiaofei.ZongXiaoFei.toFixed(2)
      }}元，PC搜索消费{{ xiaofei.PcSsXiaoFei.toFixed(2) }}元，移动搜索消费{{
        xiaofei.YdSsXiaoFei.toFixed(2)
      }}元，展示类消费{{ xiaofei.ZsXiaoFei.toFixed(2) }}元。总信息{{
        Data.xinxi_total
      }}条（微信{{ Data.weixinXinxi }}条），电话有效信息量{{
        Data.telXinxi
      }}条，搜索总信息{{ Data.sszongXinxi }}（微信{{
        Data.sswechatXinxi
      }}条），搜索电话有效信息{{ Data.sstelXinxi }}（pc端{{
        Data.pcsstelXinxi
      }}条、移动{{ Data.ydsstelXinxi }}条），展示{{
        Data.zhanshileiXinxi
      }}条，自媒体{{ Data.zimeitiXinxi }}条。商务通总接入量{{
        Data.zongjieru
      }}条，商务通总有效信息{{ Data.swtXinxi }}条。网报总有效信息{{
        Data.wbXinxi
      }}条，搜索网报{{ Data.wbssXinxi }}条，展示网报{{
        Data.wbzsXinxi
      }}条。本月总信息{{ Data.month_xinxi_total }}条（微信{{
        Data.month_wechat
      }}条），电话有效信息{{ Data.month_telxinxi }}条，其中搜索{{
        Data.month_sstel
      }}条，展示广告{{ Data.month_zhanshilei_total }}条，自媒体{{
        Data.month_zimeiti_total
      }}条。<br />
      同比去年（阳历）：总电话有效信息<span
        v-if="Cha.lastmonth_telxinxi_cha >= 0"
        >上升</span
      ><span v-else>下降</span
      >{{ Math.abs(Cha.lastmonth_telxinxi_cha) }}条，其中搜索电话有效信息<span
        v-if="Cha.lastmonth_month_sstel_cha >= 0"
        >上升</span
      ><span v-else>下降</span
      >{{ Math.abs(Cha.lastmonth_month_sstel_cha) }}条（微信信息<span
        v-if="Cha.lastmonth_wechat_cha >= 0"
        >上升</span
      ><span v-else>下降</span
      >{{ Math.abs(Cha.lastmonth_wechat_cha) }}条），展示<span
        v-if="Cha.lastmonth_zhanshilei_total_cha >= 0"
        >上升</span
      ><span v-else>下降</span
      >{{ Math.abs(Cha.lastmonth_zhanshilei_total_cha) }}条，免费渠道<span
        v-if="Cha.lastmonth_zimeiti_total_cha >= 0"
        >上升</span
      ><span v-else>下降</span
      >{{ Math.abs(Cha.lastmonth_zimeiti_total_cha) }}条。 <br />
      同比去年（阴历）：总电话有效信息<span
        v-if="Cha.lastyearnl_telxinxi_cha >= 0"
        >上升</span
      ><span v-else>下降</span
      >{{ Math.abs(Cha.lastyearnl_telxinxi_cha) }}条，其中搜索电话有效信息<span
        v-if="Cha.lastyearnl_sstel_cha >= 0"
        >上升</span
      ><span v-else>下降</span
      >{{ Math.abs(Cha.lastyearnl_sstel_cha) }}条（微信信息<span
        v-if="Cha.lastyearnl_wechat_cha >= 0"
        >上升</span
      ><span v-else>下降</span
      >{{ Math.abs(Cha.lastyearnl_wechat_cha) }}条），展示<span
        v-if="Cha.lastyearnl_zhanshilei_total_cha >= 0"
        >上升</span
      ><span v-else>下降</span
      >{{ Math.abs(Cha.lastyearnl_zhanshilei_total_cha) }}条，免费渠道<span
        v-if="Cha.lastyearnl_zimeiti_total_cha >= 0"
        >上升</span
      ><span v-else>下降</span
      >{{ Math.abs(Cha.lastyearnl_zimeiti_total_cha) }}条。<br />
      同比去年（全年）：总电话有效信息<span
        v-if="Cha.lastyear_telxinxi_cha >= 0"
        >上升</span
      ><span v-else>下降</span
      >{{ Math.abs(Cha.lastyear_telxinxi_cha) }}条，其中搜索电话有效信息<span
        v-if="Cha.lastyear_sstel_cha >= 0"
        >上升</span
      ><span v-else>下降</span
      >{{ Math.abs(Cha.lastyear_sstel_cha) }}条（微信信息<span
        v-if="Cha.lastyear_wechat_cha >= 0"
        >上升</span
      ><span v-else>下降</span
      >{{ Math.abs(Cha.lastyear_wechat_cha) }}条），展示<span
        v-if="Cha.lastyear_zhanshilei_total_cha >= 0"
        >上升</span
      ><span v-else>下降</span
      >{{ Math.abs(Cha.lastyear_zhanshilei_total_cha) }}条，免费渠道<span
        v-if="Cha.lastyear_zimeiti_total_cha >= 0"
        >上升</span
      ><span v-else>下降</span
      >{{ Math.abs(Cha.lastyear_zimeiti_total_cha) }}条。
    </div>
  </div>
  <wbfoot></wbfoot>
</template>
<script>
import { defineComponent } from "@vue/composition-api";
import { reactive, onMounted, watch } from "vue";
import request from "@/utils/request.js";
import qs from "qs";
import { ElMessage } from "element-plus";
//import { useStore } from "vuex";
import json2csv from "json2csv";
import Wbhead from "../components/header.vue";
import Wbfoot from "../components/footer.vue";
export default defineComponent({
  components: {
    Wbfoot,
    Wbhead,
  },
  setup() {
    //const store = useStore();
    const userinfo = reactive({
      nickname: sessionStorage.nickname,
      usergroup: sessionStorage.usergroup,
      userId: sessionStorage.userId,
    });
    const Data = reactive({
      xinxi_total: 0, //总信息
      telXinxi: 0, //电话有效信息
      sszongXinxi: 0, //搜索总有效信息
      sstelXinxi: 0, //搜索电话有效信息
      sswechatXinxi: 0, //搜索微信信息
      pcsstelXinxi: 0, //搜索PC电话信息
      ydsstelXinxi: 0, //移动搜索电话信息
      zimeitiXinxi: 0, //自媒体信息
      zhanshileiXinxi: 0, //展示类信息
      weixinXinxi: 0, //微信信息
      zongjieru: 0, //商务通总接入量
      swtXinxi: 0, //商务通总信息
      wbXinxi: 0, //网报总信息
      wbssXinxi: 0, //搜索网报信息
      wbzsXinxi: 0, //展示网报
      monthXinxi: 0, //本月总信息
      nowDate: "", //当前日期
      month_xinxi_total: 0, //今年当月总信息量
      month_telxinxi: 0, //
      month_wechat: 0, //
      month_zhanshilei_total: 0, //
      month_zimeiti_total: 0, //
      month_sstel: 0, //
      xinxi_time: "",
      lastmonth_telxinxi: 0, //
      lastmonth_wechat: 0, //
      lastmonth_zhanshilei_total: 0, //
      lastmonth_zimeiti_total: 0, //
      lastmonth_month_sstel: 0, //

      year_telxinxi: 0, //
      year_wechat: 0, //
      year_zhanshilei_total: 0, //
      year_zimeiti_total: 0, //
      year_sstel: 0, //

      lastyear_telxinxi: 0, //
      lastyear_wechat: 0, //
      lastyear_zhanshilei_total: 0, //
      lastyear_zimeiti_total: 0, //
      lastyear_year_sstel: 0, //

      nl_telxinxi: 0, //
      nl_wechat: 0, //
      nl_zhanshilei_total: 0, //
      nl_zimeiti_total: 0, //
      nl_sstel: 0, //

      lastyearnl_telxinxi: 0, //
      lastyearnl_wechat: 0, //
      lastyearnl_zhanshilei_total: 0, //
      lastyearnl_zimeiti_total: 0, //
      lastyearnl_year_sstel: 0, //
    });
    const Cha = reactive({
      lastmonth_telxinxi_cha: 0,
      lastmonth_month_sstel_cha: 0,
      lastmonth_wechat_cha: 0,
      lastmonth_zhanshilei_total_cha: 0,
      lastmonth_zimeiti_total_cha: 0,
      lastyear_telxinxi_cha: 0,
      lastyear_sstel_cha: 0,
      lastyear_wechat_cha: 0,
      lastyear_zhanshilei_total_cha: 0,
      lastyear_zimeiti_total_cha: 0,
      lastyearnl_telxinxi_cha: 0,
      lastyearnl_sstel_cha: 0,
      lastyearnl_wechat_cha: 0,
      lastyearnl_zhanshilei_total_cha: 0,
      lastyearnl_zimeiti_total_cha: 0,
    });
    const xiaofei = reactive({
      ssbaiduyd1: 0,
      ssbaiduyd2: 0,
      ssbaiduyd3: 0,
      ssbaiduyd4: 0,
      ssbaidupc: 0,
      ss360pc: 0,
      ttss1: 0,
      ttss2: 0,
      ttss3: 0,
      zsl1: 0,
      zsl2: 0,
      zsl3: 0,
      sougoupc: 0,
      sougouyd: 0,
      smyd: 0,
      PcSsXiaoFei: 0,
      YdSsXiaoFei: 0,
      ZsXiaoFei: 0,
      ZongXiaoFei: 0,
    });
    watch(
      () => [xiaofei.zsl1, xiaofei.zsl2, xiaofei.zsl3],
      ([newValue1, newValue2, newValue3]) => {
        xiaofei.ZsXiaoFei =
          Number(newValue1) + Number(newValue2) + Number(newValue3);
      }
    );
    watch(
      () => [xiaofei.ssbaidupc, xiaofei.ss360pc, xiaofei.sougoupc],
      ([newValue1, newValue2, newValue3]) => {
        xiaofei.PcSsXiaoFei =
          Number(newValue1) + Number(newValue2) + Number(newValue3);
      }
    );
    watch(
      () => [
        xiaofei.ssbaiduyd1,
        xiaofei.ssbaiduyd2,
        xiaofei.ssbaiduyd3,
        xiaofei.ssbaiduyd4,
        xiaofei.sougouyd,
        xiaofei.smyd,
        xiaofei.ttss1,
        xiaofei.ttss2,
        xiaofei.ttss3,
      ],
      ([
        newValue1,
        newValue2,
        newValue3,
        newValue4,
        newValue5,
        newValue6,
        newValue7,
        newValue8,
        newValue9,
      ]) => {
        xiaofei.YdSsXiaoFei =
          Number(newValue1) +
          Number(newValue2) +
          Number(newValue3) +
          Number(newValue4) +
          Number(newValue5) +
          Number(newValue6) +
          Number(newValue7) +
          Number(newValue8) +
          Number(newValue9);
      }
    );
    watch(
      () => [xiaofei.ZsXiaoFei, xiaofei.PcSsXiaoFei, xiaofei.YdSsXiaoFei],
      ([newValue1, newValue2, newValue3]) => {
        xiaofei.ZongXiaoFei =
          Number(newValue1) + Number(newValue2) + Number(newValue3);
      }
    );

    const go = () => {
      let d = {
        xinxi_total: Data.xinxi_total,
        telxinxi: Data.telXinxi,
        zimeiti: Data.zimeitiXinxi,
        zhanshilei: Data.zhanshileiXinxi,
        sstel: Data.sstelXinxi,
        wechat: Data.weixinXinxi,
        sszongXinxi: Data.sszongXinxi,
        sswechatXinxi: Data.sswechatXinxi,
        pcsstelXinxi: Data.pcsstelXinxi,
        ydsstelXinxi: Data.ydsstelXinxi,
        zongjieru: Data.zongjieru,
        swtXinxi: Data.swtXinxi,
        wbXinxi: Data.wbXinxi,
        wbssXinxi: Data.wbssXinxi,
        wbzsXinxi: Data.wbzsXinxi,
      };
      if (
        Data.xinxi_total === null ||
        Data.telXinxi === null ||
        Data.zimeitiXinxi === null ||
        Data.zhanshileiXinxi === null ||
        Data.sstelXinxi === null ||
        Data.weixinXinxi === null ||
        Data.sszongXinxi === null ||
        Data.sswechatXinxi === null ||
        Data.pcsstelXinxi === null ||
        Data.ydsstelXinxi === null ||
        Data.zongjieru === null ||
        Data.swtXinxi === null ||
        Data.wbXinxi === null ||
        Data.wbssXinxi === null ||
        Data.wbzsXinxi === null
      ) {
        ElMessage({
          showClose: true,
          message: "输入项不能为空",
          type: "error",
        });
        return false;
      }

      request
        .request({
          method: "post",
          url: "/api/getshuju",
          data: qs.stringify(d),
        })
        .then(function (response) {
          if (response.data.code == "2000") {
            Data.xinxi_time = response.data.data.xinxi_time;
            Data.xinxi_total = response.data.data.xinxi_total;
            Data.telxinxi = response.data.data.telxinxi;
            Data.zimeiti = response.data.data.zimeiti;
            Data.xinxi_time = response.data.data.xinxi_time;
            Data.wechat = response.data.data.wechat;
            Data.sstelXinxi = response.data.data.sstel;
            Data.zhanshilei = response.data.data.zhanshilei;
            Data.sszongXinxi = response.data.data.sszongXinxi;
            Data.sswechatXinxi = response.data.data.sswechatXinxi;
            Data.pcsstelXinxi = response.data.data.pcsstelXinxi;
            Data.ydsstelXinxi = response.data.data.ydsstelXinxi;
            Data.zongjieru = response.data.data.zongjieru;
            Data.swtXinxi = response.data.data.swtXinxi;
            Data.wbXinxi = response.data.data.wbXinxi;
            Data.wbzsXinxi = response.data.data.wbzsXinxi;
            Data.wbssXinxi = response.data.data.wbssXinxi;
            xiaofei.zsl1 = response.data.data.zsl1;
            xiaofei.zsl2 = response.data.data.zsl2;
            xiaofei.zsl3 = response.data.data.zsl3;
            xiaofei.ssbaidupc = response.data.data.ssbaidupc;
            xiaofei.ss360pc = response.data.data.ss360pc;
            xiaofei.sougoupc = response.data.data.sougoupc;
            xiaofei.sougouyd = response.data.data.sougouyd;
            xiaofei.smyd = response.data.data.smyd;
            xiaofei.ssbaiduyd1 = response.data.data.ssbaiduyd1;
            xiaofei.ssbaiduyd2 = response.data.data.ssbaiduyd2;
            xiaofei.ssbaiduyd3 = response.data.data.ssbaiduyd3;
            xiaofei.ssbaiduyd4 = response.data.data.ssbaiduyd4;
            xiaofei.ZsXiaoFei = response.data.data.ZsXiaoFei;
            xiaofei.PcSsXiaoFei = response.data.data.PcSsXiaoFei;
            xiaofei.YdSsXiaoFei = response.data.data.YdSsXiaoFei;
            xiaofei.ZongXiaoFei = response.data.data.ZongXiaoFei;

            //当月
            Data.month_xinxi_total = response.data.data.month_xinxi_total; //今年当月总信息
            Data.month_telxinxi = response.data.data.month_telxinxi; //今年当月电话总信息
            Data.month_wechat = response.data.data.month_wechat; //今年当月微信总信息
            Data.month_zhanshilei_total =
              response.data.data.month_zhanshilei_total; //今年当月展示类总信息
            Data.month_zimeiti_total = response.data.data.month_zimeiti_total; //今年当月自媒体总信息
            Data.month_sstel =
              Data.month_telxinxi -
              Data.month_zhanshilei_total -
              Data.month_zimeiti_total; //今年当月搜索电话总信息

            Data.lastmonth_telxinxi = response.data.data.lastmonth_telxinxi; //去年当月电话总信息
            Data.lastmonth_wechat = response.data.data.lastmonth_wechat; //去年当月微信总信息
            Data.lastmonth_zhanshilei_total =
              response.data.data.lastmonth_zhanshilei_total; //去年当月展示类总信息
            Data.lastmonth_zimeiti_total =
              response.data.data.lastmonth_zimeiti_total; //去年当月自媒体总信息
            Data.lastmonth_month_sstel =
              Data.lastmonth_telxinxi -
              Data.lastmonth_zhanshilei_total -
              Data.lastmonth_zimeiti_total; //去年当月搜索电话总信息

            Cha.lastmonth_telxinxi_cha =
              Data.month_telxinxi - Data.lastmonth_telxinxi;
            Cha.lastmonth_month_sstel_cha =
              Data.month_sstel - Data.lastmonth_month_sstel;
            Cha.lastmonth_wechat_cha =
              Data.month_wechat - Data.lastmonth_wechat;
            Cha.lastmonth_zhanshilei_total_cha =
              Data.month_zhanshilei_total - Data.lastmonth_zhanshilei_total;
            Cha.lastmonth_zimeiti_total_cha =
              Data.month_zimeiti_total - Data.lastmonth_zimeiti_total;
            //全年
            Data.year_telxinxi = response.data.data.year_telxinxi; //今年当年电话总信息
            Data.year_wechat = response.data.data.year_wechat; //今年当年微信总信息
            Data.year_zhanshilei_total =
              response.data.data.year_zhanshilei_total; //今年展示类总信息
            Data.year_zimeiti_total = response.data.data.year_zimeiti_total; //今年自媒体总信息
            Data.year_sstel =
              Data.year_telxinxi -
              Data.year_zhanshilei_total -
              Data.year_zimeiti_total; //今年搜索电话总信息

            Data.lastyear_telxinxi = response.data.data.lastyear_telxinxi; //去年电话总信息
            Data.lastyear_wechat = response.data.data.lastyear_wechat; //去年微信总信息
            Data.lastyear_zhanshilei_total =
              response.data.data.lastyear_zhanshilei_total; //去年展示类总信息
            Data.lastyear_zimeiti_total =
              response.data.data.lastyear_zimeiti_total; //去年自媒体总信息
            Data.lastyear_year_sstel =
              Data.lastyear_telxinxi -
              Data.lastyear_zhanshilei_total -
              Data.lastyear_zimeiti_total; //去年搜索电话总信息

            Cha.lastyear_telxinxi_cha =
              Data.year_telxinxi - Data.lastyear_telxinxi;
            Cha.lastyear_sstel_cha = Data.year_sstel - Data.lastyear_year_sstel;
            Cha.lastyear_wechat_cha = Data.year_wechat - Data.lastyear_wechat;
            Cha.lastyear_zhanshilei_total_cha =
              Data.year_zhanshilei_total - Data.lastyear_zhanshilei_total;
            Cha.lastyear_zimeiti_total_cha =
              Data.year_zimeiti_total - Data.lastyear_zimeiti_total;

            //阴历月
            Data.nl_telxinxi = response.data.data.nl_telxinxi; //今年当年电话总信息
            Data.nl_wechat = response.data.data.nl_wechat; //今年当年微信总信息
            Data.nl_zhanshilei_total = response.data.data.nl_zhanshilei_total; //今年展示类总信息
            Data.nl_zimeiti_total = response.data.data.nl_zimeiti_total; //今年自媒体总信息
            Data.nl_sstel =
              Data.nl_telxinxi -
              Data.nl_zhanshilei_total -
              Data.nl_zimeiti_total; //今年搜索电话总信息

            Data.lastyearnl_telxinxi = response.data.data.lastyearnl_telxinxi; //去年电话总信息
            Data.lastyearnl_wechat = response.data.data.lastyearnl_wechat; //去年微信总信息
            Data.lastyearnl_zhanshilei_total =
              response.data.data.lastyearnl_zhanshilei_total; //去年展示类总信息
            Data.astyearnl_zimeiti_total =
              response.data.data.lastyearnl_zimeiti_total; //去年自媒体总信息
            Data.lastyearnl_year_sstel =
              Data.lastyearnl_telxinxi -
              Data.lastyearnl_zhanshilei_total -
              Data.lastyearnl_zimeiti_total; //去年搜索电话总信息

            Cha.lastyearnl_telxinxi_cha =
              Data.nl_telxinxi - Data.lastyearnl_telxinxi;
            Cha.lastyearnl_sstel_cha =
              Data.nl_sstel - Data.lastyearnl_year_sstel;
            Cha.lastyearnl_wechat_cha = Data.nl_wechat - Data.lastyearnl_wechat;
            Cha.lastyearnl_zhanshilei_total_cha =
              Data.nl_zhanshilei_total - Data.lastyearnl_zhanshilei_total;
            Cha.lastyearnl_zimeiti_total_cha =
              Data.nl_zimeiti_total - Data.lastyearnl_zimeiti_total;
            ElMessage({
              showClose: true,
              message: response.data.msg,
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
    const select = () => {
      request
        .request({
          method: "post",
          url: "/api/getshuju",
          data: "",
        })
        .then(function (response) {
          if (response.data.code == "2000") {
            Data.xinxi_time = response.data.data.xinxi_time;
            Data.xinxi_total = response.data.data.xinxi_total;
            Data.telxinxi = response.data.data.telxinxi;
            Data.zimeiti = response.data.data.zimeiti;
            Data.xinxi_time = response.data.data.xinxi_time;
            Data.wechat = response.data.data.wechat;
            Data.sstelXinxi = response.data.data.sstel;
            Data.zhanshilei = response.data.data.zhanshilei;
            Data.sszongXinxi = response.data.data.sszongXinxi;
            Data.sswechatXinxi = response.data.data.sswechatXinxi;
            Data.pcsstelXinxi = response.data.data.pcsstelXinxi;
            Data.ydsstelXinxi = response.data.data.ydsstelXinxi;
            Data.zongjieru = response.data.data.zongjieru;
            Data.swtXinxi = response.data.data.swtXinxi;
            Data.wbXinxi = response.data.data.wbXinxi;
            Data.wbzsXinxi = response.data.data.wbzsXinxi;
            Data.wbssXinxi = response.data.data.wbssXinxi;
            xiaofei.zsl1 = response.data.data.zsl1;
            xiaofei.zsl2 = response.data.data.zsl2;
            xiaofei.zsl3 = response.data.data.zsl3;
            xiaofei.ssbaidupc = response.data.data.ssbaidupc;
            xiaofei.ss360pc = response.data.data.ss360pc;
            xiaofei.sougoupc =
              response.data.data.sougoupc === undefined
                ? 0
                : response.data.data.sougoupc;
            xiaofei.sougouyd =
              response.data.data.sougouyd === undefined
                ? 0
                : response.data.data.sougouyd;
            xiaofei.smyd =
              response.data.data.smyd === undefined
                ? 0
                : response.data.data.smyd;
            xiaofei.ssbaiduyd1 = response.data.data.ssbaiduyd1;
            xiaofei.ssbaiduyd2 = response.data.data.ssbaiduyd2;
            xiaofei.ssbaiduyd3 = response.data.data.ssbaiduyd3;
            xiaofei.ssbaiduyd4 = response.data.data.ssbaiduyd4;
            xiaofei.ZsXiaoFei = response.data.data.ZsXiaoFei;
            xiaofei.PcSsXiaoFei = response.data.data.PcSsXiaoFei;
            xiaofei.YdSsXiaoFei = response.data.data.YdSsXiaoFei;
            xiaofei.ZongXiaoFei = response.data.data.ZongXiaoFei;
            console.log(response.data.data.smyd);

            //当月
            Data.month_xinxi_total = response.data.data.month_xinxi_total; //今年当月总信息
            Data.month_telxinxi = response.data.data.month_telxinxi; //今年当月电话总信息
            Data.month_wechat = response.data.data.month_wechat; //今年当月微信总信息
            Data.month_zhanshilei_total =
              response.data.data.month_zhanshilei_total; //今年当月展示类总信息
            Data.month_zimeiti_total = response.data.data.month_zimeiti_total; //今年当月自媒体总信息
            Data.month_sstel =
              Data.month_telxinxi -
              Data.month_zhanshilei_total -
              Data.month_zimeiti_total; //今年当月搜索电话总信息

            Data.lastmonth_telxinxi = response.data.data.lastmonth_telxinxi; //去年当月电话总信息
            Data.lastmonth_wechat = response.data.data.lastmonth_wechat; //去年当月微信总信息
            Data.lastmonth_zhanshilei_total =
              response.data.data.lastmonth_zhanshilei_total; //去年当月展示类总信息
            Data.lastmonth_zimeiti_total =
              response.data.data.lastmonth_zimeiti_total; //去年当月自媒体总信息
            Data.lastmonth_month_sstel =
              Data.lastmonth_telxinxi -
              Data.lastmonth_zhanshilei_total -
              Data.lastmonth_zimeiti_total; //去年当月搜索电话总信息

            Cha.lastmonth_telxinxi_cha =
              Data.month_telxinxi - Data.lastmonth_telxinxi;
            Cha.lastmonth_month_sstel_cha =
              Data.month_sstel - Data.lastmonth_month_sstel;
            Cha.lastmonth_wechat_cha =
              Data.month_wechat - Data.lastmonth_wechat;
            Cha.lastmonth_zhanshilei_total_cha =
              Data.month_zhanshilei_total - Data.lastmonth_zhanshilei_total;
            Cha.lastmonth_zimeiti_total_cha =
              Data.month_zimeiti_total - Data.lastmonth_zimeiti_total;
            //全年
            Data.year_telxinxi = response.data.data.year_telxinxi; //今年当年电话总信息
            Data.year_wechat = response.data.data.year_wechat; //今年当年微信总信息
            Data.year_zhanshilei_total =
              response.data.data.year_zhanshilei_total; //今年展示类总信息
            Data.year_zimeiti_total = response.data.data.year_zimeiti_total; //今年自媒体总信息
            Data.year_sstel =
              Data.year_telxinxi -
              Data.year_zhanshilei_total -
              Data.year_zimeiti_total; //今年搜索电话总信息

            Data.lastyear_telxinxi = response.data.data.lastyear_telxinxi; //去年电话总信息
            Data.lastyear_wechat = response.data.data.lastyear_wechat; //去年微信总信息
            Data.lastyear_zhanshilei_total =
              response.data.data.lastyear_zhanshilei_total; //去年展示类总信息
            Data.lastyear_zimeiti_total =
              response.data.data.lastyear_zimeiti_total; //去年自媒体总信息
            Data.lastyear_year_sstel =
              Data.lastyear_telxinxi -
              Data.lastyear_zhanshilei_total -
              Data.lastyear_zimeiti_total; //去年搜索电话总信息

            Cha.lastyear_telxinxi_cha =
              Data.year_telxinxi - Data.lastyear_telxinxi;
            Cha.lastyear_sstel_cha = Data.year_sstel - Data.lastyear_year_sstel;
            Cha.lastyear_wechat_cha = Data.year_wechat - Data.lastyear_wechat;
            Cha.lastyear_zhanshilei_total_cha =
              Data.year_zhanshilei_total - Data.lastyear_zhanshilei_total;
            Cha.lastyear_zimeiti_total_cha =
              Data.year_zimeiti_total - Data.lastyear_zimeiti_total;

            //阴历月
            Data.nl_telxinxi = response.data.data.nl_telxinxi; //今年当年电话总信息
            Data.nl_wechat = response.data.data.nl_wechat; //今年当年微信总信息
            Data.nl_zhanshilei_total = response.data.data.nl_zhanshilei_total; //今年展示类总信息
            Data.nl_zimeiti_total = response.data.data.nl_zimeiti_total; //今年自媒体总信息
            Data.nl_sstel =
              Data.nl_telxinxi -
              Data.nl_zhanshilei_total -
              Data.nl_zimeiti_total; //今年搜索电话总信息

            Data.lastyearnl_telxinxi = response.data.data.lastyearnl_telxinxi; //去年电话总信息
            Data.lastyearnl_wechat = response.data.data.lastyearnl_wechat; //去年微信总信息
            Data.lastyearnl_zhanshilei_total =
              response.data.data.lastyearnl_zhanshilei_total; //去年展示类总信息
            Data.astyearnl_zimeiti_total =
              response.data.data.lastyearnl_zimeiti_total; //去年自媒体总信息
            Data.lastyearnl_year_sstel =
              Data.lastyearnl_telxinxi -
              Data.lastyearnl_zhanshilei_total -
              Data.lastyearnl_zimeiti_total; //去年搜索电话总信息

            Cha.lastyearnl_telxinxi_cha =
              Data.nl_telxinxi - Data.lastyearnl_telxinxi;
            Cha.lastyearnl_sstel_cha =
              Data.nl_sstel - Data.lastyearnl_year_sstel;
            Cha.lastyearnl_wechat_cha = Data.nl_wechat - Data.lastyearnl_wechat;
            Cha.lastyearnl_zhanshilei_total_cha =
              Data.nl_zhanshilei_total - Data.lastyearnl_zhanshilei_total;
            Cha.lastyearnl_zimeiti_total_cha =
              Data.nl_zimeiti_total - Data.lastyearnl_zimeiti_total;
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
    const savexiaofei = () => {
      let d = {
        ssbaiduyd1: xiaofei.ssbaiduyd1,
        ssbaiduyd2: xiaofei.ssbaiduyd2,
        ssbaiduyd3: xiaofei.ssbaiduyd3,
        ssbaiduyd4: xiaofei.ssbaiduyd4,
        ssbaidupc: xiaofei.ssbaidupc,
        ss360pc: xiaofei.ss360pc,
        ttss1: xiaofei.ttss1,
        ttss2: xiaofei.ttss2,
        ttss3: xiaofei.ttss3,
        zsl1: xiaofei.zsl1,
        zsl2: xiaofei.zsl2,
        zsl3: xiaofei.zsl3,
        sougoupc: xiaofei.sougoupc,
        sougouyd: xiaofei.sougouyd,
        smyd: xiaofei.smyd,
        PcSsXiaoFei: xiaofei.PcSsXiaoFei,
        YdSsXiaoFei: xiaofei.YdSsXiaoFei,
        ZsXiaoFei: xiaofei.ZsXiaoFei,
        ZongXiaoFei: xiaofei.ZongXiaoFei,
      };
      if (
        xiaofei.ssbaiduyd1 === null ||
        xiaofei.ssbaiduyd2 === null ||
        xiaofei.ssbaiduyd3 === null ||
        xiaofei.ssbaiduyd4 === null ||
        xiaofei.ssbaidupc === null ||
        xiaofei.ss360pc === null ||
        xiaofei.ttss1 === null ||
        xiaofei.ttss2 === null ||
        xiaofei.ttss3 === null ||
        xiaofei.ttss3 === null ||
        xiaofei.zsl1 === null ||
        xiaofei.zsl2 === null ||
        xiaofei.zsl3 === null ||
        xiaofei.sougoupc === null ||
        xiaofei.sougouyd === null ||
        xiaofei.smyd === null ||
        xiaofei.PcSsXiaoFei === null ||
        xiaofei.YdSsXiaoFei === null ||
        xiaofei.ZsXiaoFei === null ||
        xiaofei.ZongXiaoFei === null
      ) {
        ElMessage({
          showClose: true,
          message: "输入项不能为空",
          type: "error",
        });
        return false;
      }

      request
        .request({
          method: "post",
          url: "/api/savexiaofei",
          data: qs.stringify(d),
        })
        .then(function (response) {
          if (response.data.code == "2000") {
            ElMessage({
              showClose: true,
              message: response.data.msg,
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
    const ssbaiduyd1 = () => {
      request
        .request({
          method: "post",
          url: "/api/getxiaofei",
          data: "",
        })
        .then(function (response) {
          if (response.data.code == "2000") {
            if (response.data.data.body.data.length == 0) {
              xiaofei.ssbaiduyd1 = 0;
            } else {
              xiaofei.ssbaiduyd1 = response.data.data.body.data[0].kpis[0];
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
    const ssbaiduyd2 = () => {
      request
        .request({
          method: "post",
          url: "/api/getxiaofei2",
          data: "",
        })
        .then(function (response) {
          if (response.data.code == "2000") {
            if (response.data.data.body.data.length == 0) {
              xiaofei.ssbaiduyd2 = 0;
            } else {
              xiaofei.ssbaiduyd2 = response.data.data.body.data[0].kpis[0];
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
    const ssbaidupc = () => {
      request
        .request({
          method: "post",
          url: "/api/getxiaofei3",
          data: "",
        })
        .then(function (response) {
          if (response.data.code == "2000") {
            if (response.data.data.body.data.length == 0) {
              xiaofei.ssbaidupc = 0;
            } else {
              xiaofei.ssbaidupc = response.data.data.body.data[0].kpis[0];
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
    const ssbaiduyd3 = () => {
      request
        .request({
          method: "post",
          url: "/api/getxiaofei4",
          data: "",
        })
        .then(function (response) {
          if (response.data.code == "2000") {
            if (response.data.data.body.data.length == 0) {
              xiaofei.ssbaiduyd3 = 0;
            } else {
              xiaofei.ssbaiduyd3 = response.data.data.body.data[0].kpis[0];
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
    const ssbaiduyd4 = () => {
      request
        .request({
          method: "post",
          url: "/api/getxiaofei5",
          data: "",
        })
        .then(function (response) {
          if (response.data.code == "2000") {
            if (response.data.data.body.data.length == 0) {
              xiaofei.ssbaiduyd4 = 0;
            } else {
              xiaofei.ssbaiduyd4 = response.data.data.body.data[0].kpis[0];
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
    const ss360pc = () => {
      request
        .request({
          method: "post",
          url: "/api/getxiaofei360",
          data: "",
        })
        .then(function (response) {
          if (response.data.code == "2000") {
            xiaofei.ss360pc = response.data.data;
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
    const yiliaoxinxi = () => {
      request
        .request({
          method: "post",
          url: "/api/getyiliaoxinxi",
          data: "",
        })
        .then(function (response) {
          if (response.data.code == "2000") {
            Data.swtXinxi = response.data.data.total;
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
    const wangbaoNum = () => {
      request
        .request({
          method: "post",
          url: "/api/getwangbaoNum",
          data: "",
        })
        .then(function (response) {
          if (response.data.code == "2000") {
            Data.wbssXinxi = response.data.data.feizhanshiNum;
            Data.wbzsXinxi = response.data.data.zhanshiNum;
            Data.wbXinxi = Data.wbssXinxi + Data.wbzsXinxi;
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
    const JuLiang = () => {
      request
        .request({
          method: "post",
          url: "/api/getJuLiangcost",
          data: "",
        })
        .then(function (response) {
          if (response.data.code == "2000") {
            if (response.data.data.data.list.length > 0) {
              xiaofei.ttss1 = response.data.data.data.list[0].cost;
            } else {
              ElMessage({
                showClose: true,
                message: "头条消费获取失败",
                type: "error",
              });
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
    const JuLiang2 = () => {
      request
        .request({
          method: "post",
          url: "/api/getJuLiangcost2",
          data: "",
        })
        .then(function (response) {
          if (response.data.code == "2000") {
            if (response.data.data.data.list.length > 0) {
              xiaofei.zsl1 = response.data.data.data.list[0].cost;
            } else {
              ElMessage({
                showClose: true,
                message: "头条消费获取失败",
                type: "error",
              });
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
    const JuLiang3 = () => {
      request
        .request({
          method: "post",
          url: "/api/getJuLiangcost3",
          data: "",
        })
        .then(function (response) {
          if (response.data.code == "2000") {
            if (response.data.data.data.list.length > 0) {
              xiaofei.zsl2 = response.data.data.data.list[0].cost;
            } else {
              ElMessage({
                showClose: true,
                message: "头条消费获取失败",
                type: "error",
              });
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
    const JuLiang4 = () => {
      request
        .request({
          method: "post",
          url: "/api/getJuLiangcost4",
          data: "",
        })
        .then(function (response) {
          if (response.data.code == "2000") {
            if (response.data.data.data.list.length > 0) {
              xiaofei.zsl3 = response.data.data.data.list[0].cost;
            } else {
              ElMessage({
                showClose: true,
                message: "头条消费获取失败",
                type: "error",
              });
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
    const JuLiang5 = () => {
      request
        .request({
          method: "post",
          url: "/api/getJuLiangcost5",
          data: "",
        })
        .then(function (response) {
          if (response.data.code == "2000") {
            if (response.data.data.data.list.length > 0) {
              xiaofei.ttss2 = response.data.data.data.list[0].cost;
            } else {
              ElMessage({
                showClose: true,
                message: "头条消费获取失败",
                type: "error",
              });
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
    const JuLiang6 = () => {
      request
        .request({
          method: "post",
          url: "/api/getJuLiangcost6",
          data: "",
        })
        .then(function (response) {
          if (response.data.code == "2000") {
            if (response.data.data.data.list.length > 0) {
              xiaofei.ttss3 = response.data.data.data.list[0].cost;
            } else {
              ElMessage({
                showClose: true,
                message: "头条消费获取失败",
                type: "error",
              });
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
    const del = () => {
      request
        .request({
          method: "post",
          url: "/api/deleteshuju",
          data: "",
        })
        .then(function (response) {
          if (response.data.code == "2000") {
            ElMessage({
              showClose: true,
              message: response.data.msg,
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
    const Csv = reactive({
      fields: ["xinxi_time", "telxinxi_total"],
    });
    const getXinxi = () => {
      request
        .request({
          method: "post",
          url: "/api/Xinxitest",
          data: "",
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
            console.log("导出报表失败");
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
    const getxiaofei = () => {
      ssbaiduyd1();
      ssbaiduyd2();
      ssbaidupc();
      ssbaiduyd3();
      ssbaiduyd4();
      ss360pc();
      yiliaoxinxi();
      wangbaoNum();
      JuLiang();
      JuLiang2();
      JuLiang3();
      JuLiang4();
      JuLiang5();
      JuLiang6();
    };

    onMounted(() => {
      select();
    });
    return {
      userinfo,
      Data,
      getXinxi,
      go,
      Cha,
      select,
      del,
      getxiaofei,
      xiaofei,
      savexiaofei,
    };
  },
});
</script>

<style scoped>
.table {
  width: 100%;
  margin: 0 auto;
}
.table-title {
  width: 100%;
  height: 40px;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.table-item {
  flex: 1;
  display: flex;
  height: 100%;
  border-bottom: 1px solid #ccc;
  border-right: 1px solid #ccc;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.left ::v-deep .el-collapse-item__header {
  padding-left: 20px;
  font-size: 18px;
  letter-spacing: 2px;
  color: #1989fa;
}
.xiaofei {
  width: 100%;
  padding-top: 20px;
}
.xinxi {
  width: 100%;
}
.left {
  width: 100%;
  padding-bottom: 20px;
}
.caozuo {
  padding-left: 20px;
}
.right {
  width: 100%;
  padding: 2vw;
  border-top: 2px solid #ccc;
  line-height: 2;
  font-size: 16px;
  letter-spacing: 1px;
}
.line {
  margin: 0 auto;
  margin-bottom: 20px;
  width: 100%;
  height: 2px;
  background: #ccc;
}
</style>