<template>
  <!-- 成品 -->
  <div class="parcel">
    <BreadNav
      :nameOne="'原料需求'"
      :pathOne="'home'"
      :nameTwo="'原料供应状态'"
    ></BreadNav>
    <div class="search">
      <div class="condition">
        <el-select
          v-model="query"
          size="small"
          @change="changeSel"
          placeholder="请选择"
        >
          <el-option
            v-for="item in queryList"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="condition">
        <el-select v-model="query1" size="small" placeholder="请选择">
          <el-option
            v-for="item in queryList1"
            :label="item.label"
            :value="item.value"
            :key="item.value"
          >
          </el-option>
        </el-select>
      </div>
      <div class="condition">
        <el-input
          v-model="productNum"
          clearable
          size="small"
          @keyup.enter.native="add"
        >
        </el-input>
      </div>
      <!--  <div class="condition">
        <el-date-picker
          v-model="dateStart"
          type="date"
          placeholder="选择开始日期"
          size="small"
        >
        </el-date-picker>
        <span>至</span>
        <el-date-picker
          v-model="dateEnd"
          type="date"
          placeholder="选择结束日期"
          size="small"
        >
        </el-date-picker>
      </div> -->
      <div class="condition">
        <el-button
          v-if="condition.length <= 0"
          type="primary"
          size="small"
          @click="add()"
          >条件加入</el-button
        >
        <el-button
          v-if="condition.length > 0"
          type="primary"
          size="small"
          @click="and()"
          >AND</el-button
        >
        <el-button
          v-if="condition.length > 0"
          type="primary"
          size="small"
          @click="or()"
          >OR</el-button
        >
        <el-button type="primary" size="small" @click="getdata(1)"
          >搜索</el-button
        >
      </div>
    </div>
    <div class="title">
      <p v-if="this.condition1.length <= 0">{{ this.condition }}</p>
      <p v-else>{{ this.condition1 }}</p>
    </div>
    <div>
      <div class="searchBox">
        <el-button type="primary" @click="makePlan">
          <i class="icon el-icon-edit-outline"></i>
          <span>编辑</span>
        </el-button>
        <el-button size="mini" @click="countRaw">
          <i class="icon el-icon-copy-document"></i>
          <span>计划计算</span>
        </el-button>
        <el-button size="mini" @click="takeEffect">
          <i class="icon el-icon-success"></i>
          <span>调用无单</span>
        </el-button>
      </div>
      <div class="tableContent">
        <el-table
          :header-cell-style="tableBGC"
          :data="dataList"
          border
          size="mini"
          :default-sort="{ prop: 'SlideNo', order: 'ascending' }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55"> </el-table-column>

          <el-table-column
            prop="ORDERID"
            sortable
            label="订单号"
          ></el-table-column>
          <el-table-column
            prop="MATERIALID"
            width="90"
            sortable
            label="原料编码"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="FIRMCOLORNO"
            sortable
            label="厂商色号"
          ></el-table-column>
          <el-table-column
            sortable
            label="属性"
            width="90"
          >
            <template slot-scope="scope">
              <span v-show="scope.row.MATERIALATTRIBUTE === 0">{{
                scope.row.MATERIALATTRIBUTE === 0 ? "直接" : null
              }}</span>
              <span v-show="scope.row.MATERIALATTRIBUTE === 1">
                {{ scope.row.MATERIALATTRIBUTE === 1 ? "并线" : null }}
              </span>
              <span v-show="scope.row.MATERIALATTRIBUTE === 2">{{
                scope.row.MATERIALATTRIBUTE === 2 ? "染色" : null
              }}</span>
              <span v-show="scope.row.MATERIALATTRIBUTE === 3">{{
                scope.row.MATERIALATTRIBUTE === 3 ? "加捻" : null
              }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="QUANTITY"
            width="90"
            sortable
            label="需求数量"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            width="100"
            prop="REALQUANTITY"
            sortable
            label="内部库存"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            width="100"
            prop="NORETURNQUANTITY"
            sortable
            label="已排未返"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            width="120"
            prop="PLANTOTALQUANTITY"
            sortable
            label="计划总需求"
          ></el-table-column>
          <el-table-column
            width="120"
            prop="NOORDERQUANTITY"
            sortable
            label="无单数量"
          ></el-table-column>
          <el-table-column
            prop="PLANQUANTITY"
            sortable
            width="95"
            label="计划数量"
          ></el-table-column>
          <el-table-column
            prop="SCHEDULEQUANTITY"
            sortable
            width="95"
            label="安排数量"
          ></el-table-column>
          <el-table-column
            prop="FINISHQUANTITY"
            sortable
            width="95"
            label="完成数量"
          ></el-table-column>
          <el-table-column
            prop="STOCKUSEQUANTITY"
            sortable
            width="95"
            label="库存利用"
          ></el-table-column>
          <el-table-column
            prop="BEGINTIME"
            width="90"
            sortable
            label="开始日期"
          ></el-table-column>
          <el-table-column
            prop="ENDTIME"
            width="90"
            sortable
            label="结束日期"
          ></el-table-column>
          <el-table-column
            prop="NOTICETIME"
            width="90"
            sortable
            label="通知日期"
          ></el-table-column>
          <el-table-column
            prop="MATERIALNAME"
            width="90"
            sortable
            label="原料名称"
          ></el-table-column>
          <el-table-column
            width="95"
            prop="REMARK"
            sortable
            label="备注"
          ></el-table-column>
        </el-table>
      </div>
      <!-- <div class="total">
        <p>合计：</p>
        <p>
          <span>记录条数：</span>
          <span>{{ dataList.length }}</span>
        </p>
        <p>
          <span>订单米数：</span>
          <span>{{ this.num }}</span>
        </p>
        <p>
          <span>订单卷数：</span>
          <span>{{ this.pnum }}</span>
        </p>
        <p>
          <span>经轴长度1：</span>
          <span>{{ this.weavingNum1 }}</span>
        </p>
        <p>
          <span>经轴长度2：</span>
          <span>{{ this.weavingNum2 }}</span>
        </p>
        <p>
          <span>订单变更：</span>
          <span>{{ this.changeorder }}</span>
        </p>
        <p>
          <span> 需生产数：</span>
          <span>{{ this.sureamount }}</span>
        </p>
        <p>
          <span> 需生产卷数：</span>
          <span>{{ this.psureamount }}</span>
        </p>
      </div> -->
      <div class="pagingBox">
        <div class="leftBox">
          <span>
            共
            <span>{{ pageCount }}</span
            >页
          </span>
          <span>
            第
            <span>{{ pageIndex }}</span>
            页
          </span>
        </div>
        <div class="rightBox">
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="pageIndex"
            layout="total, prev, pager, next, jumper"
            :total="dataCount"
            :page-size="pageSize"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- 编辑 -->
    <el-dialog
      title="编辑"
      :visible.sync="userDialog"
      width="80%"
      :before-close="handleCloseUser"
    >
      <div class="tab">
        <!-- <el-row class="tit">
          <el-col :span="24">对应织造计划</el-col>
        </el-row> -->
        <el-table
          :data="selection"
          :header-cell-style="headerStyle"
          border
          style="width: 100%"
        >
          <el-table-column prop="ORDERID" label="订单号" width="90">
          </el-table-column>
          <el-table-column prop="MATERIALID" label="原料编码">
          </el-table-column>
          <el-table-column prop="QUANTITY" label="需求数量"> </el-table-column>
          <el-table-column label="库存利用">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.STOCKUSEQUANTITY"
                placeholder="请输入内容"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="BEAMTYPEID1" label="流水号"> </el-table-column>
          <el-table-column label="生产备注">
            <template slot-scope="scope">
              <el-input v-model="scope.row.REMARK"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="userDialog = false">取 消</el-button>
        <el-button size="mini" @click="makePlanOk()">保 存</el-button>
      </span>
    </el-dialog>
    <!-- 编辑弹窗 -->

    <!-- 查看弹窗 -->
  </div>
</template>

<script>
// // 导出的是组件选项
// import "../../validate/validate.js";
import { api } from "../../api/index";
import BreadNav from "../../components/breadNav/breadNav.vue";
export default {
  components: {
    BreadNav,
  },
  inject: ["reload"],
  data() {
    return {
      // 时间段
      timeList: [],
      // 开始时间
      startTime: null,
      // 结束时间
      endTime: null,
      // 产品型号
      productNum: "",
      dateStart: "",
      dateEnd: "",
      date: "",
      messageTable: [],
      messageStatic: true,
      appFile: "",
      excelDialog: false,
      searchKeyWord: "",
      extendIcon: true,
      dataList: [
        // {
        //   time: "",
        //   order: "Zf190021",
        //   production: "s14046-12",
        //   productionName: "",
        //   datatime: "2019-03-30",
        //   num: "888",
        //   pnum: "0",
        //   practicableNum: "0",
        //   practicablepNum: "0",
        //   weaving1: "DTY150D-TB06",
        //   reedNum: "4.6",
        //   weavingNum1: "598",
        //   allNum1: "2860",
        //   warpColor: "017-16,BC6779",
        //   weaving2: "SD*T4.5N-017-16/01",
        //   weavingNum2: "582",
        //   allNum2: "782",
        //   weftDensity: "9.3",
        //   throughNum: "",
        //   paperclipNum: "0",
        //   planNum: "210514014",
        //   weavingName1: "S14046细轴",
        //   weavingName2: "S14046粗轴",
        //   larghezza: "142.0",
        //   coupé: "",
        //   checkout: "",
        //   healdWay: "",
        //   remark: "",
        //   afterfinish: "扎毛稳泡涂层",
        //   rawcount: "Y",
        //   changeorder: "",
        //   start: "2019-05-16",
        //   end: "2019-07-30",
        //   changeorder: "4800",
        //   reedforword: "",
        // },
        // {
        //   time: "",
        //   order: "Zf190021",
        //   production: "S17059-160",
        //   productionName: "",
        //   datatime: "2019-03-30",
        //   num: "3000",
        //   pnum: "100",
        //   practicableNum: "4500",
        //   practicablepNum: "90",
        //   weaving1: "DTY300D-BA843/05",
        //   reedNum: "5",
        //   weavingNum1: "3360",
        //   allNum1: "2406",
        //   warpColor: "017-3,BA843",
        //   weaving2: "SD*T4.5N-017-3/01",
        //   weavingNum2: "3360",
        //   allNum2: "782",
        //   weftDensity: "11",
        //   throughNum: "4",
        //   paperclipNum: "0",
        //   planNum: "190406023",
        //   weavingName1: "S17059-14",
        //   weavingName2: "S17059-14",
        //   larghezza: "142.0",
        //   coupé: "",
        //   checkout:
        //     "有效门幅不低于142cm,毛边到毛边不超过149cm;两边各毛边不能超过1cm成品数量控制在10%内",
        //   healdWay: "",
        //   remark: "",
        //   afterfinish: "稳泡涂层",
        //   rawcount: "N",
        //   changeorder: "0",
        //   start: "2019-06-01",
        //   end: "2019-07-30",
        //   changeorder: "1021",
        //   reedforword: "",
        // },
      ],
      tableData: [],
      userTypeDialog: false,
      form: {
        title: "",
        id: "",
        //
        stateId: "6",
        taskNo: 1,
        productName: "",
        beamCardNo: "",
        orderNo: "",
        wide: "",
        needNumber: "",
        planEndDate: "",
        detailList: {},
        dataNow: "",
        planNum: 0,
        loomList: "",
        productMode: "",
      },
      // 计划号
      planNum: "",
      // 订单号
      orderNum: "",
      customerTypeOptions: [],
      userDialog: false,
      weavingType: "",
      allNum: null,
      dataCount: 0, //总条数
      pageIndex: 1, //当前第几页
      pageCount: 1, //总页数
      pageSize: 10, //每页显示条目个数
      // 选中
      selection: [],
      // 合计
      num: 0, // 订单米数
      pnum: 0, // 订单卷数
      weavingNum1: 0, // 经轴长度1
      weavingNum2: 0, // 经轴长度2
      changeorder: 0, // 订单变更
      sureamount: 0,
      psureamount: 0,
      // 经轴标志
      weavingSign: [
        {
          value: 1,
          label: "单",
        },
        {
          value: 2,
          label: "双",
        },
      ],
      // 重复次数
      repetition: 1,
      // 订单号
      billno: "",
      // 生产米数
      PRODUCTIONUM: 0,
      // 卷数
      VOLUMENUM: 0,
      // 经轴长度
      WEAVINGLENGTH: 0,
      // 经轴名称
      weavingName: "",
      // 产品型号
      productType: "",
      // 门幅
      menfu: "",
      // 织机类型
      loomList: [],
      option: [
        {
          value: 0,
          label: "单",
        },
        {
          value: 1,
          label: "双",
        },
      ],
      // 生产方式
      // PRODUCTMODE
      productMode: [
        {
          value: 0,
          label: "自产",
        },
        {
          value: 1,
          label: "外购",
        },
      ],
      // 织造去向
      beamdirection: [
        {
          value: 0,
          label: "本厂",
        },
        {
          value: 1,
          label: "外协",
        },
      ],
      // 原料计算标志
      iscallculate: [
        {
          value: false,
          label: "N",
        },
        {
          value: true,
          label: "Y",
        },
      ],
      //
      query: 0,
      queryList: [
        {
          value: 0,
          label: "订单号",
        },
        {
          value: 1,
          label: "原料编码",
        },
        {
          value: 2,
          label: "原料名称",
        },
        {
          value: 3,
          label: "需求数量",
        },
        {
          value: 4,
          label: "安排数量",
        },
        {
          value: 5,
          label: "完成数量",
        },
        {
          value: 6,
          label: "内部库存",
        },
        {
          value: 7,
          label: "库存利用",
        },
        {
          value: 8,
          label: "开始日期",
        },
        {
          value: 9,
          label: "结束日期",
        },
        {
          value: 10,
          label: "通知日期",
        },
      ],
      query1: 0,
      queryList1: [
        {
          value: 0,
          label: "包含",
        },
        {
          value: 1,
          label: "完全匹配",
        },
        {
          value: 2,
          label: "不包含",
        },
      ],
      //   条件
      condition: "",
      condition1: "",
      supName: "",
      sql: "",
      sqlQuery: "",
      sqlQuery1: "",
    };
  },
  created() {
    this.getdata(1);
  },
  computed: {},
  methods: {
    // 获取日期
    time() {
      var myDate = new Date();
      var y = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
      var m = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
      var d = myDate.getDate(); //获取当前日(1-31)
      if (m < 10) {
        m = "0" + m;
      }
      if (d < 10) {
        d = "0" + d;
      }
      var data = y + "-" + m + "-" + d;
      this.productNum = data;
    },
    // 供应商
    changeSel(val) {
      this.query1 = 0;
      if (val == 0 || val == 1 || val == 2 || val == 3) {
        this.queryList1 = [
          {
            value: 0,
            label: "包含",
          },
          {
            value: 1,
            label: "完全匹配",
          },
          {
            value: 2,
            label: "不包含",
          },
        ];
      } else {
        this.queryList1 = [
          {
            value: 0,
            label: "=",
          },
          {
            value: 1,
            label: "<",
          },
          {
            value: 2,
            label: "<=",
          },
          {
            value: 3,
            label: ">",
          },
          {
            value: 4,
            label: ">=",
          },
        ];
      }
      if (val == 8 || val == 9 || val == 10) {
        this.time();
      }
    },
    // 添加条件
    add() {
      if (this.productNum.length <= 0) {
        this.$message({
          showClose: true,
          message: "请您输入内容",
          type: "error",
        });
        return;
      }
      if (this.query == 0) {
        this.query = "订单号";
        this.supName = " A.ORDERID ";
        if (this.query1 == 0) {
          this.query1 = "包含";
          this.sql = "LIKE " + "'%" + this.productNum + "%'";
        } else if (this.query1 == 1) {
          this.query1 = "完全匹配";
          this.sql = "= " + "'" + this.productNum + "'";
        } else if (this.query1 == 2) {
          this.query1 = "不包含";
          this.sql = "NOT LIKE " + "'%" + this.productNum + "%'";
        }
      } else if (this.query == 1) {
        this.query = "原料编码";
        this.supName = " A.MATERIALID ";
        if (this.query1 == 0) {
          this.query1 = "包含";
          this.sql = "LIKE " + "'%" + this.productNum + "%'";
        } else if (this.query1 == 1) {
          this.query1 = "完全匹配";
          this.sql = "= " + "'" + this.productNum + "'";
        } else if (this.query1 == 2) {
          this.query1 = "不包含";
          this.sql = "NOT LIKE " + "'%" + this.productNum + "%'";
        }
      } else if (this.query == 2) {
        this.query = "原料名称";
        this.supName = " C.MATERIALNAME ";
        if (this.query1 == 0) {
          this.query1 = "包含";
          this.sql = "LIKE " + "'%" + this.productNum + "%'";
        } else if (this.query1 == 1) {
          this.query1 = "完全匹配";
          this.sql = "= " + "'" + this.productNum + "'";
        } else if (this.query1 == 2) {
          this.query1 = "不包含";
          this.sql = "NOT LIKE " + "'%" + this.productNum + "%'";
        }
      } else if (this.query == 3) {
        this.query = "需求数量";
        this.supName = " A.QUANTITY ";
        if (this.query1 == 0) {
          this.query1 = "包含";
          this.sql = "LIKE " + "'%" + this.productNum + "%'";
        } else if (this.query1 == 1) {
          this.query1 = "完全匹配";
          this.sql = "= " + "'" + this.productNum + "'";
        } else if (this.query1 == 2) {
          this.query1 = "不包含";
          this.sql = "NOT LIKE " + "'%" + this.productNum + "%'";
        }
      } else if (this.query == 4) {
        this.query = "安排数量";
        this.supName = " A.SCHEDULEQUANTITY ";
        if (this.query1 == 0) {
          this.query1 = "=";
          this.sql = "= '" + this.productNum + "'";
        } else if (this.query1 == 1) {
          this.query1 = "<";
          this.sql = "< '" + this.productNum + "'";
        } else if (this.query1 == 2) {
          this.query1 = "<=";
          this.sql = "<= '" + this.productNum + "'";
        } else if (this.query1 == 3) {
          this.query1 = ">";
          this.sql = "> '" + this.productNum + "'";
        } else if (this.query1 == 4) {
          this.query1 = ">=";
          this.sql = ">= '" + this.productNum + "'";
        }
      } else if (this.query == 5) {
        this.query = "完成数量";
        this.supName = " A.FINISHQUANTITY ";
        if (this.query1 == 0) {
          this.query1 = "=";
          this.sql = "= '" + this.productNum + "'";
        } else if (this.query1 == 1) {
          this.query1 = "<";
          this.sql = "< '" + this.productNum + "'";
        } else if (this.query1 == 2) {
          this.query1 = "<=";
          this.sql = "<= '" + this.productNum + "'";
        } else if (this.query1 == 3) {
          this.query1 = ">";
          this.sql = "> '" + this.productNum + "'";
        } else if (this.query1 == 4) {
          this.query1 = ">=";
          this.sql = ">= '" + this.productNum + "'";
        }
      } else if (this.query == 6) {
        this.query = "内部库存";
        this.supName = " C.REALQUANTITYSUM ";
        if (this.query1 == 0) {
          this.query1 = "=";
          this.sql = "= '" + this.productNum + "'";
        } else if (this.query1 == 1) {
          this.query1 = "<";
          this.sql = "< '" + this.productNum + "'";
        } else if (this.query1 == 2) {
          this.query1 = "<=";
          this.sql = "<= '" + this.productNum + "'";
        } else if (this.query1 == 3) {
          this.query1 = ">";
          this.sql = "> '" + this.productNum + "'";
        } else if (this.query1 == 4) {
          this.query1 = ">=";
          this.sql = ">= '" + this.productNum + "'";
        }
      } else if (this.query == 7) {
        this.query = "库存利用";
        this.supName = " A.STOCKUSEQUANTITY ";
        if (this.query1 == 0) {
          this.query1 = "=";
          this.sql = "= '" + this.productNum + "'";
        } else if (this.query1 == 1) {
          this.query1 = "<";
          this.sql = "< '" + this.productNum + "'";
        } else if (this.query1 == 2) {
          this.query1 = "<=";
          this.sql = "<= '" + this.productNum + "'";
        } else if (this.query1 == 3) {
          this.query1 = ">";
          this.sql = "> '" + this.productNum + "'";
        } else if (this.query1 == 4) {
          this.query1 = ">=";
          this.sql = ">= '" + this.productNum + "'";
        }
      } else if (this.query == 8) {
        this.query = "开始日期";
        this.supName = " A.BEGINTIME ";
        if (this.query1 == 0) {
          this.query1 = "=";
          this.sql = "= '" + this.productNum + "'";
        } else if (this.query1 == 1) {
          this.query1 = "<";
          this.sql = "< '" + this.productNum + "'";
        } else if (this.query1 == 2) {
          this.query1 = "<=";
          this.sql = "<= '" + this.productNum + "'";
        } else if (this.query1 == 3) {
          this.query1 = ">";
          this.sql = "> '" + this.productNum + "'";
        } else if (this.query1 == 4) {
          this.query1 = ">=";
          this.sql = ">= '" + this.productNum + "'";
        }
      } else if (this.query == 9) {
        this.query = " 结束日期 ";
        this.supName = " A.ENDTIME ";
        if (this.query1 == 0) {
          this.query1 = "=";
          this.sql = "= '" + this.productNum + "'";
        } else if (this.query1 == 1) {
          this.query1 = "<";
          this.sql = "< '" + this.productNum + "'";
        } else if (this.query1 == 2) {
          this.query1 = "<=";
          this.sql = "<= '" + this.productNum + "'";
        } else if (this.query1 == 3) {
          this.query1 = ">";
          this.sql = "> '" + this.productNum + "'";
        } else if (this.query1 == 4) {
          this.query1 = ">=";
          this.sql = ">= '" + this.productNum + "'";
        }
      } else if (this.query == 10) {
        this.query = "通知日期";
        this.supName = " A.NOTICETIME ";
        if (this.query1 == 0) {
          this.query1 = "=";
          this.sql = "= '" + this.productNum + "'";
        } else if (this.query1 == 1) {
          this.query1 = "<";
          this.sql = "< '" + this.productNum + "'";
        } else if (this.query1 == 2) {
          this.query1 = "<=";
          this.sql = "<= '" + this.productNum + "'";
        } else if (this.query1 == 3) {
          this.query1 = ">";
          this.sql = "> '" + this.productNum + "'";
        } else if (this.query1 == 4) {
          this.query1 = ">=";
          this.sql = ">= '" + this.productNum + "'";
        }
      }
      this.condition = this.query + this.query1 + this.productNum;
      this.sqlQuery = this.supName + this.sql;
      if (this.condition1.length <= 0) {
        this.condition1 = this.condition;
        this.sqlQuery1 = this.sqlQuery;
      }
    },
    and() {
      this.add();
      this.condition1 = this.condition1 + " AND " + this.condition;
      this.sqlQuery1 = this.sqlQuery1 + " AND" + this.sqlQuery;
      console.log(this.sqlQuery1);
    },
    or() {
      this.add();
      this.condition1 = this.condition1 + " OR " + this.condition;
      this.sqlQuery1 = this.sqlQuery1 + " OR" + this.sqlQuery;
      console.log(this.sqlQuery1);
    },
    // 获取主数据
    getdata(num) {
      this.sqlQuery1 = this.sqlQuery1.replace(/-/g, "");
      let params = {
        Page: num,
        PageSize: 10,
        Entity: this.sqlQuery1,
      };
      console.log(params);
      api.GetSpMaterialOrderList(this.$qs.stringify(params)).then((res) => {
        console.log(res.data);
        if (res.data.Success !== false) {
          this.dataList = res.data.Entities;
          this.dataCount = res.data.Total;
          this.pageCount = Math.ceil(res.data.Total / 10);
        } else {
          this.dataList = [];
          this.dataCount = 0;
        }
      });
    },
    // 编辑
    makePlan() {
      if (this.selection.length <= 0) {
        this.$message({
          message: "请您选择要操作的数据",
          type: "error",
        });
        return;
      } else {
        // this.getLoomList();
        this.userDialog = true;
      }
    },
    // 保存
    makePlanOk() {
      // this.userDialog = false;
      let params = [];
      this.selection.map((item) => {
        params.push({
          BILLNO: item.BILLNO,
          ORDERID: item.ORDERID,
          MATERIALID: item.MATERIALID,
          FIRMCOLORNO: item.FIRMCOLORNO,
          MATERIALATTRIBUTE: item.MATERIALATTRIBUTE,
          OrderState: item.OrderState,
          SUPPLIERID: item.SUPPLIERID,
          QUANTITY: item.QUANTITY,
          REALQUANTITY: item.REALQUANTITY,
          MINQUANTITY: item.MINQUANTITY,
          NORETURNQUANTITY: item.NORETURNQUANTITY,
          PLANTOTALQUANTITY: item.PLANTOTALQUANTITY,
          NOORDERQUANTITY: item.NOORDERQUANTITY,
          PLANQUANTITY: item.PLANQUANTITY,
          SCHEDULEQUANTITY: item.SCHEDULEQUANTITY,
          FINISHQUANTITY: item.FINISHQUANTITY,
          STOCKUSEQUANTITY: item.STOCKUSEQUANTITY,
          BEGINTIME: item.BEGINTIME,
          ENDTIME: item.ENDTIME,
          NOTICETIME: item.NOTICETIME,
          MATERIALNAME: item.MATERIALNAME,
          REMARK: item.REMARK,
          // CreatorId: item.CreatorId,
          LastUpdateId: "1",
        });
      });
      console.log(params);
      let param = {
        list: params,
      };

      api.UpdateSpMaterialOrder(this.$qs.stringify(param)).then((res) => {
        console.log(res.data);
        if (res.data.Success == true) {
          this.$message({
            message: res.data.Message,
            type: "success",
          });
          this.userDialog = false;
          setTimeout(() => {
            this.reload();
          }, 200);
        } else {
          this.$message({
            message: res.data.Message,
            type: "error",
          });
        }
      });
    },
    // 调用无单
    takeEffect() {
      // this.userDialog = false;
      // 织造去向
      console.log(this.selection);
      let params = [];
      this.selection.map((item) => {
        params.push({
          BILLNO: item.BILLNO,
          ORDERID: item.ORDERID,
          MATERIALID: item.MATERIALID,
          FIRMCOLORNO: item.FIRMCOLORNO,
          MATERIALATTRIBUTE: item.MATERIALATTRIBUTE,
          OrderState: item.OrderState,
          SUPPLIERID: item.SUPPLIERID,
          QUANTITY: item.QUANTITY,
          REALQUANTITY: item.REALQUANTITY,
          MINQUANTITY: item.MINQUANTITY,
          NORETURNQUANTITY: item.NORETURNQUANTITY,
          PLANTOTALQUANTITY: item.PLANTOTALQUANTITY,
          NOORDERQUANTITY: item.NOORDERQUANTITY,
          PLANQUANTITY: item.PLANQUANTITY,
          SCHEDULEQUANTITY: item.SCHEDULEQUANTITY,
          FINISHQUANTITY: item.FINISHQUANTITY,
          STOCKUSEQUANTITY: item.STOCKUSEQUANTITY,
          BEGINTIME: item.BEGINTIME,
          ENDTIME: item.ENDTIME,
          NOTICETIME: item.NOTICETIME,
          MATERIALNAME: item.MATERIALNAME,
          REMARK: item.REMARK,
          // CreatorId: item.CreatorId,
          LastUpdateId: "1",
        });
      });
      console.log(params);
      let param = {
        list: params,
      };

      api.UseWD(this.$qs.stringify(param)).then((res) => {
        console.log(res.data);
        if (res.data.Success == true) {
          this.$message({
            message: res.data.Message,
            type: "success",
          });
          this.userDialog = false;
          setTimeout(() => {
            this.reload();
          }, 200);
        } else {
          this.$message({
            message: res.data.Message,
            type: "error",
          });
        }
      });
    },
    //计划计算
    countRaw() {
      // this.userDialog = false;
      // 织造去向
      console.log(this.selection);
      let params = [];
      this.selection.map((item) => {
        params.push({
          BILLNO: item.BILLNO,
          ORDERID: item.ORDERID,
          MATERIALID: item.MATERIALID,
          FIRMCOLORNO: item.FIRMCOLORNO,
          MATERIALATTRIBUTE: item.MATERIALATTRIBUTE,
          OrderState: item.OrderState,
          SUPPLIERID: item.SUPPLIERID,
          QUANTITY: item.QUANTITY,
          REALQUANTITY: item.REALQUANTITY,
          MINQUANTITY: item.MINQUANTITY,
          NORETURNQUANTITY: item.NORETURNQUANTITY,
          PLANTOTALQUANTITY: item.PLANTOTALQUANTITY,
          NOORDERQUANTITY: item.NOORDERQUANTITY,
          PLANQUANTITY: item.PLANQUANTITY,
          SCHEDULEQUANTITY: item.SCHEDULEQUANTITY,
          FINISHQUANTITY: item.FINISHQUANTITY,
          STOCKUSEQUANTITY: item.STOCKUSEQUANTITY,
          BEGINTIME: item.BEGINTIME,
          ENDTIME: item.ENDTIME,
          NOTICETIME: item.NOTICETIME,
          MATERIALNAME: item.MATERIALNAME,
          REMARK: item.REMARK,
          CreatorId: item.CreatorId,
          LastUpdateId: "1",
        });
      });
      console.log(params);
      let param = {
        list: params,
      };

      api.CalcSpMaterialOrder(this.$qs.stringify(param)).then((res) => {
        console.log(res.data);
        if (res.data.Success == true) {
          this.$message({
            message: res.data.Message,
            type: "success",
          });
          this.userDialog = false;
          setTimeout(() => {
            this.reload();
          }, 200);
        } else {
          this.$message({
            message: res.data.Message,
            type: "error",
          });
        }
      });
    },

    handlelook(index, row) {
      console.log(index, row);
    },
    headerStyle() {
      return "color:#666;font-size:12px";
    },
    //  全选
    handleSelectionChange(val) {
      console.log(val);
      this.selection = val;
    },
    endMessage() {
      this.messageStatic = true;
    },
    excelFile(data) {
      this.appFile = data;
    },
    tableBGC() {
      return "border-color: #C1C1C1;color:#666;background-color:#F5F5F5;";
    },
    // 分页
    handleCurrentChange(val) {
      console.log(val);
      this.getdata(val);
      this.pageIndex = val;
    },
    handleCloseUser() {
      this.userDialog = false;
    },
    userTypeShow() {
      this.userTypeDialog = true;
    },
  },
};
</script>

<style scoped lang="less">
.endMessageBtn {
  text-align: right;
  button {
    margin-right: 15px;
  }
}
.dialog-footer {
  .el-button {
    margin-right: 10px;
  }
}
.parcel {
  background-color: #fff;
  height: 100%;
}
.title {
  border-bottom: 1px solid #ccc;
  padding: 5px 0;
  p {
    font-size: 14px;
    text-align: center;
    color: #666;
  }
}
.search {
  display: flex;
  width: 99%;
  padding: 0.5%;
  border-bottom: 1px solid #ccc;
  align-items: center;
  .condition {
    display: flex;
    align-items: center;
    margin-right: 20px;
    span {
      margin: 0 10px;
      color: #666;
    }
    .el-button {
      margin-right: 10px;
    }
    // margin-right: 10px;
  }
}
.searchBox {
  width: 99%;
  padding: 0.5%;
  border-bottom: 1px solid #ccc;
  .el-button {
    font-size: 12px;
    padding: 5px;
    border-radius: 2px;
    background-color: #f5f5f5;
    border-color: #ccc;
    color: #666;
    font-weight: 700;
    margin-right: 10px;
    span {
      span {
        padding: 0 5px;
        margin: 0;
      }
      i {
        color: #3c9ad0;
        // font-weight: bold;
      }
    }
  }
}
.searchExtend {
  width: 60%;
  margin-left: 28%;
  position: relative;
}
.total {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0.5%;
  p {
    margin-right: 10px;
    font-size: 12px;
    color: #666;
  }
}
.tableContent {
  padding: 0.5%;
  // margin-bottom: 10px;
  .el-table--border,
  .el-table--group {
    border-width: 2px;
    border-color: #c1c1c1;
  }
}
.pagingBox {
  z-index: 999;
  background-color: #fff;
  text-align: right;
  height: 5%;
  position: absolute;
  bottom: 0;
  right: 10px;
  opacity: 0.7;
  .leftBox {
    padding-top: 1.5%;
    height: 100%;
    display: inline-block;
    font-size: 13px;
    vertical-align: top;
    margin-right: 10px;
    box-sizing: border-box;
    span {
      vertical-align: top;
      margin-right: 10px;
      span {
        color: rgb(34, 106, 134);
        font-weight: bold;
        margin-left: 10px;
        margin-right: 10px;
        vertical-align: top;
      }
    }
  }
  .rightBox {
    box-sizing: border-box;
    margin-right: 20px;
    height: 100%;
    display: inline-block;
  }
}

.addUserType {
  float: right;
  margin-right: 2%;
}

.btn_type {
  color: blue;
  cursor: pointer;
  padding: 2px;
  border-radius: 2px;
}
.tab {
  .tit {
    text-align: center;
    color: #ff6600;
    margin: 20px 0 10px;
  }
}
.editAdd {
  width: 100%;
  margin: 0 auto;
  .tit {
    text-align: center;
    color: #ff6600;
    margin-bottom: 20px;
  }
  .item {
    text-align: center;
    margin-bottom: 10px;
    .itemCntent {
      display: flex;
      justify-content: flex-end;
      .titleOverall {
        display: inline-block;
        vertical-align: top;
        // overflow: hidden;
        // text-overflow: ellipsis;
        // white-space: nowrap;
        // white-space: nowrap;
        span {
          font-size: 12px;
        }
      }
      .bz {
        width: 78% !important;
      }
      .titleinput {
        width: 55%;
        display: inline-block;
      }
    }
  }
}
.tableStatic {
  i {
    font-size: 20px;
  }
}
.red {
  color: red;
}
.green {
  color: yellowgreen;
}
</style>
