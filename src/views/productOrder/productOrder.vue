<template>
  <!-- 成品 -->
  <div class="parcel">
    <BreadNav
      :nameOne="'生产订单'"
      :pathOne="'home'"
      :nameTwo="'生产订单'"
    ></BreadNav>
    <div class="search">
      <div class="condition">
        <el-input
          placeholder="请输入计划号"
          v-model="planNum"
          clearable
          size="small"
          @keyup.enter.native="getdata(1)"
        >
        </el-input>
      </div>
      <div class="condition">
        <el-input
          placeholder="请输入订单号"
          v-model="orderNum"
          clearable
          size="small"
          @keyup.enter.native="getdata(1)"
        >
        </el-input>
      </div>
      <div class="condition">
        <el-input
          placeholder="请输入产品型号"
          v-model="productNum"
          clearable
          size="small"
          @keyup.enter.native="getdata(1)"
        >
        </el-input>
      </div>
      <div class="condition">
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
      </div>
      <div class="condition">
        <el-button type="primary" size="small" @click="getdata(1)"
          >搜索</el-button
        >
      </div>
    </div>
    <div>
      <div class="searchBox">
        <el-button type="primary" @click="makePlan">
          <i class="icon el-icon-edit-outline"></i>
          <span>编辑</span>
        </el-button>
        <el-button size="mini" @click="submit">
          <i class="icon el-icon-success"></i>
          <span>生效</span>
        </el-button>
        <el-button size="mini" @click="countRaw">
          <i class="icon el-icon-copy-document"></i>
          <span>计算原料</span>
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
            prop="billdate"
            width="90"
            sortable
            label="单据日期"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="PRODUCTID"
            sortable
            label="产品型号"
          ></el-table-column>
          <el-table-column
            prop="datatime"
            sortable
            label="下单日期"
            width="90"
          ></el-table-column>
          <el-table-column
            prop="time"
            width="90"
            sortable
            label="决议交期"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            width="100"
            prop="QUANTITY"
            sortable
            label="订单米数"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            width="100"
            prop="ROLLNUM"
            sortable
            label="卷数"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <!-- <el-table-column
            width="90"
            prop="HOLDNUM"
            sortable
            :show-overflow-tooltip="true"
            label="通知数量"
          ></el-table-column> -->
          <!-- <el-table-column
            width="90"
            prop="HOLDROLLNUM"
            sortable
            label="通知卷数"
          ></el-table-column> -->
          <!-- <el-table-column
            width="120"
            prop="AFTERWAYID"
            sortable
            label="后整理方式"
          ></el-table-column> -->
          <el-table-column
            width="120"
            prop="SUREAMOUNT"
            sortable
            label="需生产数"
          ></el-table-column>
          <el-table-column
            width="120"
            prop="SUREROLLNUM"
            sortable
            label="需生产卷数"
          ></el-table-column>
          <!-- <el-table-column
            width="95"
            prop="BEAMTYPEID1"
            sortable
            label="计划数量"
          ></el-table-column> -->
          <el-table-column sortable width="95" label="生产方式">
            <template slot-scope="scope">
              <span v-show="scope.row.PRODUCTMODE === 0">{{
                scope.row.PRODUCTMODE === 0 ? "自产" : null
              }}</span>
              <span v-show="scope.row.PRODUCTMODE === 1">
                {{ scope.row.PRODUCTMODE === 1 ? "外购" : null }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="REEDNUMBER"
            sortable
            width="95"
            label="筘号"
          ></el-table-column>
          <el-table-column
            prop="WARPCOLORNO"
            sortable
            width="95"
            label="经纱色号"
          ></el-table-column>
          <el-table-column
            prop="UPWEFT"
            sortable
            width="95"
            label="上机纬密"
          ></el-table-column>
          <el-table-column
            prop="BEAMTYPEID1"
            sortable
            width="95"
            label="经轴类型1"
          ></el-table-column>
          <el-table-column
            prop="BEAMTYPENAME1"
            sortable
            width="95"
            label="经轴名称1"
          ></el-table-column>
          <el-table-column
            prop="TOTALBEAMAMOUNT1"
            sortable
            width="95"
            label="总经数1"
          ></el-table-column>
          <el-table-column
            width="95"
            prop="BEAMTYPEID2"
            sortable
            label="经轴类型2"
          ></el-table-column>
          <el-table-column
            prop="BEAMTYPENAME2"
            sortable
            width="95"
            label="经轴名称2"
          ></el-table-column>
          <el-table-column
            prop="TOTALBEAMAMOUNT2"
            sortable
            width="95"
            label="总经数2"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="GATEWIDTH"
            sortable
            label="门幅"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="PASSNUM"
            sortable
            label="穿入数"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="NEEDLENUMBER"
            sortable
            label="纹针数"
          ></el-table-column>
          <el-table-column
            width="95"
            prop="BOLTLENGTHREQUIRE"
            sortable
            label="匹长要求"
          ></el-table-column>
          <el-table-column
            prop="CHECKREQUIRE"
            width="90"
            sortable
            label="检验要求"
          ></el-table-column>
          <el-table-column
            prop="DRAFTINGTYPE"
            width="90"
            sortable
            label="穿综方式"
          ></el-table-column>
          <el-table-column
            prop="AFTERWAYROUTEID"
            width="100"
            sortable
            label="后整理路线"
          ></el-table-column>
          <!-- <el-table-column
            prop="AFTERWAYREMARK"
            width="100"
            sortable
            label="后整理描述"
          ></el-table-column> -->
          <el-table-column
            prop="ORDERCHANGE"
            width="90"
            sortable
            label="订单变更"
          ></el-table-column>
          <el-table-column
            prop="beaginTime"
            width="90"
            sortable
            label="开始日期"
          ></el-table-column>
          <el-table-column
            prop="endTime"
            width="90"
            sortable
            label="结束日期"
          ></el-table-column>
          <!-- <el-table-column
            prop="ENDTIME"
            width="90"
            sortable
            label="经轴落实"
          ></el-table-column> -->
          <el-table-column width="90" sortable label="织造去向">
            <template slot-scope="scope">
              <span v-show="scope.row.BEAMDIRECTION === 0">{{
                scope.row.BEAMDIRECTION === 0 ? "本厂" : null
              }}</span>
              <span v-show="scope.row.BEAMDIRECTION === 1">
                {{ scope.row.BEAMDIRECTION === 1 ? "外协" : null }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            width="95"
            prop="PLSREMARK"
            sortable
            label="生产备注"
          ></el-table-column>
          <!-- <el-table-column
            width="90"
            prop="TOTALBEAMAMOUNT1"
            sortable
            label="缺省机型"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="WARPCOLORNO"
            sortable
            label="织造结束"
          ></el-table-column>
          <el-table-column
            width="100"
            prop="BEAMTYPEID2"
            sortable
            label="织造结束日"
          ></el-table-column>
          <el-table-column
            width="95"
            prop="BEAMLENGTH2"
            sortable
            label="生产结束"
          ></el-table-column>
          <el-table-column
            width="100"
            prop="TOTALBEAMAMOUNT2"
            sortable
            label="生产结束日"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="UPWEFT"
            sortable
            label="发货结束"
          ></el-table-column>
          <el-table-column
            prop="PASSNUM"
            width="100"
            sortable
            label="发货结束日"
          ></el-table-column>
          <el-table-column
            prop="NEEDLENUMBER"
            width="90"
            sortable
            label="订单备注"
          ></el-table-column>

          <el-table-column
            prop="SHEETSIGN"
            width="90"
            sortable
            label="幅宽标志"
          ></el-table-column>

          <el-table-column
            width="90"
            prop="MATERIALCALCULATE"
            sortable
            label="原料计算"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="DRAFTINGTYPE"
            sortable
            label="织机类型"
          ></el-table-column>
          <el-table-column
            width="100"
            prop="PLSREMARK"
            sortable
            label="其中剪样布"
          ></el-table-column>
          <el-table-column
            width="100"
            prop="AFTERWAYROUTEID"
            sortable
            label="客户名称"
          ></el-table-column>
          <el-table-column
            width="100"
            prop="CUSTOMERBILLNO"
            sortable
            label="客户订单号"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="CUSTOMERMODEL"
            sortable
            label="客户型号"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="ORDERCHANGE"
            sortable
            label="机型指定"
          ></el-table-column>
          <el-table-column
            width="110"
            prop="BEGINTIME"
            sortable
            label="最早生产日期"
          ></el-table-column>
          <el-table-column
            width="110"
            prop="ENDTIME"
            sortable
            label="最早落实日期"
          ></el-table-column>
          <el-table-column
            width="110"
            prop="changeorder"
            sortable
            label="最晚完成日期"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="PRODUCTMODE"
            sortable
            label="生产方式"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="BEAMDIRECTION"
            sortable
            label="安排数量"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="BEAMDIRECTION"
            sortable
            label="安排卷数"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="BEAMDIRECTION"
            sortable
            label="下机数量"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="BEAMDIRECTION"
            sortable
            label="下机匹数"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="BEAMDIRECTION"
            sortable
            label="坯检数量"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="BEAMDIRECTION"
            sortable
            label="坯检匹数"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="BEAMDIRECTION"
            sortable
            label="合格数量"
          ></el-table-column>
          <el-table-column
            width="120"
            prop="BEAMDIRECTION"
            sortable
            label="后处理发出数量"
          ></el-table-column>
          <el-table-column
            width="120"
            prop="BEAMDIRECTION"
            sortable
            label="后处理发出匹数"
          ></el-table-column>
          <el-table-column
            width="120"
            prop="BEAMDIRECTION"
            sortable
            label="后处理收回数量"
          ></el-table-column>
          <el-table-column
            width="120"
            prop="BEAMDIRECTION"
            sortable
            label="后处理收回匹数"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="BEAMDIRECTION"
            sortable
            label="检验数量"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="BEAMDIRECTION"
            sortable
            label="检验匹数"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="BEAMDIRECTION"
            sortable
            label="打码数量"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="BEAMDIRECTION"
            sortable
            label="打码卷数"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="BEAMDIRECTION"
            sortable
            label="入库数量"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="BEAMDIRECTION"
            sortable
            label="入库卷数"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="BEAMDIRECTION"
            sortable
            label="发货数量"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="BEAMDIRECTION"
            sortable
            label="发货卷数"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="BEAMDIRECTION"
            sortable
            label="累计次品"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="BEAMDIRECTION"
            sortable
            label="订单方式"
          ></el-table-column>
          <el-table-column
            width="110"
            prop="BEAMDIRECTION"
            sortable
            label="白坯利用数量"
          ></el-table-column>
          <el-table-column
            width="110"
            prop="BEAMDIRECTION"
            sortable
            label="白坯利用卷数"
          ></el-table-column> -->
          <!-- <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                type="danger"
                @click="handlelook(scope.$index, scope.row)"
                >查看</el-button
              >
            </template>
          </el-table-column> -->
          <!-- <el-table-column prop="status" label="状态">
            <template slot-scope="scope">{{
              scope.row.stateId == 0
                ? "未开始"
                : scope.row.stateId == 4
                ? "生产中"
                : scope.row.stateId == 5
                ? "生产已完工"
                : scope.row.stateId == 6
                ? "成品验布中"
                : scope.row.stateId == 7
                ? "成品验布已完工"
                : scope.row.stateId == 8
                ? "成品验布中"
                : scope.row.stateId == 100
                ? "已完工"
                : "暂无状态"
            }}</template>
          </el-table-column> -->
          <!-- <el-table-column
            prop="address"
            label="操作"
            width="160"
            fixed="right"
          >
            <template slot-scope="scope">
              <el-button @click="editTable(scope.row)" size="mini"
                >查看</el-button
              >
            </template>
          </el-table-column> -->
        </el-table>
      </div>
      <div class="total">
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
        <!-- <p>
          <span> 经轴长度1：</span>
          <span>{{ this.changeorder }}</span>
        </p>
        <p>
          <span> 经轴长度2：</span>
          <span>{{ this.changeorder }}</span>
        </p>
        <p>
          <span>计划数量：</span>
          <span>{{ this.changeorder }}</span>
        </p>
        <p>
          <span>安排数量：</span>
          <span>{{ this.changeorder }}</span>
        </p>
        <p>
          <span>下机数量：</span>
          <span>{{ this.changeorder }}</span>
        </p>
        <p>
          <span>下机匹数：</span>
          <span>{{ this.changeorder }}</span>
        </p>
        <p>
          <span>坯检数量：</span>
          <span>{{ this.changeorder }}</span>
        </p>
        <p>
          <span>坯检匹数：</span>
          <span>{{ this.changeorder }}</span>
        </p>
        <p>
          <span>合格数量：</span>
          <span>{{ this.changeorder }}</span>
        </p>
        <p>
          <span>累计次品：</span>
          <span>{{ this.changeorder }}</span>
        </p>
        <p>
          <span>次品安排：</span>
          <span>{{ this.changeorder }}</span>
        </p>
        <p>
          <span>后整理发出数量：</span>
          <span>{{ this.changeorder }}</span>
        </p>
        <p>
          <span>后整理发出匹数：</span>
          <span>{{ this.changeorder }}</span>
        </p>
        <p>
          <span>后整理收回数量：</span>
          <span>{{ this.changeorder }}</span>
        </p>
        <p>
          <span>后整理收回匹数：</span>
          <span>{{ this.changeorder }}</span>
        </p>
        <p>
          <span>打码数量：</span>
          <span>{{ this.changeorder }}</span>
        </p>
        <p>
          <span>打码卷数：</span>
          <span>{{ this.changeorder }}</span>
        </p>
        <p>
          <span>入库数量：</span>
          <span>{{ this.changeorder }}</span>
        </p>
        <p>
          <span>入库卷数：</span>
          <span>{{ this.changeorder }}</span>
        </p>
        <p>
          <span>发货数量：</span>
          <span>{{ this.changeorder }}</span>
        </p>
        <p>
          <span>发货卷数：</span>
          <span>{{ this.changeorder }}</span>
        </p>
        <p>
          <span>白坯利用数量：</span>
          <span>{{ this.changeorder }}</span>
        </p>
        <p>
          <span>白坯利用卷数：</span>
          <span>{{ this.changeorder }}</span>
        </p> -->
      </div>
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
    <!-- 制定整经计划弹窗 -->
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
          <el-table-column prop="PRODUCTID" label="产品型号"> </el-table-column>
          <el-table-column prop="SHEETSIGN" label="决议交期"> </el-table-column>
          <!-- <el-table-column prop="SHEETSIGN" label="通知数量"> </el-table-column>
          <el-table-column prop="SHEETSIGN" label="通知卷数"> </el-table-column> -->
          <el-table-column prop="SUREAMOUNT" width="120" label="需生产数">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.SUREAMOUNT"
                placeholder="请输入内容"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column label="生产方式">
            <template slot-scope="scope">
              <el-select v-model="scope.row.PRODUCTMODE" placeholder="">
                <el-option
                  v-for="item in productMode"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="织造去向">
            <template slot-scope="scope">
              <el-select v-model="scope.row.BEAMDIRECTION" placeholder="">
                <el-option
                  v-for="item in beamdirection"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="BEAMTYPEID1" label="经轴类型1">
          </el-table-column>
          <el-table-column prop="BEAMTYPEID12" label="经轴类型2">
          </el-table-column>
          <el-table-column
            prop="AFTERWAYROUTEID"
            width="120"
            label="后整理工艺路线"
          >
          </el-table-column>
          <!-- <el-table-column prop="STOPSKID" label="织造机型"> </el-table-column> -->
          <el-table-column prop="time" label="决议交期">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.time"
                placeholder="请输入内容"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="dataStart" width="110" label="最早开始日期">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.dataStart"
                placeholder="请输入内容"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="dataEnd" width="110" label="最晚完成日期">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.dataEnd"
                placeholder="请输入内容"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column width="110" label="原料计算标志">
            <template slot-scope="scope">
              <el-select v-model="scope.row.ISCALCULATE" placeholder="">
                <el-option
                  v-for="item in iscallculate"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
          <el-table-column prop="PLSREMARK" label="生产备注">
            <template slot-scope="scope">
              <el-input v-model="scope.row.PLSREMARK"></el-input>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="userDialog = false">取 消</el-button>
        <el-button size="mini" @click="makePlanOk()">保 存</el-button>
        <el-button size="mini" @click="takeEffect()">生 效</el-button>
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
      var data = y + "-" + m + "-" + d;
      data = data.replace(/-/g, "/"); //js不认2011-11-10,只认2011/11/10
      var t1 = new Date(new Date(data).valueOf() + 45 * 24 * 60 * 60 * 1000); // 日期加上指定的天数
      console.log(t1);
      let mm = "";
      let day = "";
      if (t1.getMonth() + 1 < 10) {
        mm = "0" + (t1.getMonth() + 1);
      } else {
        mm = t1.getMonth() + 1;
      }
      if (t1.getDate() < 10) {
        day = "0" + t1.getDate();
      } else {
        day = t1.getDate();
      }
      var dataend = y + "-" + mm + "-" + day;
      var m1 = "";
      var days = "";
      if (myDate.getMonth() + 1 < 10) {
        m1 = "0" + (myDate.getMonth() + 1);
      } else {
        m1 = myDate.getMonth() + 1;
      }
      if (myDate.getDate() < 10) {
        days = "0" + myDate.getDate();
      } else {
        days = myDate.getDate();
      }
      var datastart = y + "-" + m1 + "-" + days;
      this.form.dataNow = data;
      this.dataList.forEach((item) => {
        this.$set(item, "dataStart", datastart);
        this.$set(item, "dataEnd", dataend);
      });
    },
    // 获取主数据
    getdata(num) {
      if (this.dateStart != "") {
        var year = this.dateStart.getFullYear();
        var month = this.dateStart.getMonth() + 1;
        var day = this.dateStart.getDate();
        if (month < 10) {
          month = "0" + month;
        }
        if (day < 10) {
          day = "0" + day;
        }
        var date = year + "" + month + "" + day;
        this.startTime = date;
      }
      if (this.dateEnd != "") {
        var y = this.dateEnd.getFullYear();
        var m = this.dateEnd.getMonth() + 1;
        var d = this.dateEnd.getDate();
        if (m < 10) {
          m = "0" + m;
        }
        if (d < 10) {
          d = "0" + d;
        }
        var dateTime = y + "" + m + "" + d;
        this.endTime = dateTime;
      }
      let params = {
        Page: num,
        PageSize: 10,
        Entity: {
          billno: this.planNum,
          productid: this.productNum,
          orderid: this.orderNum,
          startdate: this.startTime,
          enddate: this.endTime,
        },
      };
      console.log(params);
      api.getproductdata(this.$qs.stringify(params)).then((res) => {
        console.log(res.data);
        if (res.data.Success !== false) {
          this.dataList = res.data.Entities;
          this.dataCount = res.data.Total;
          this.pageCount = Math.ceil(res.data.Total / 10);
          this.count();
          this.time();
        } else {
          this.$message({
            showClose: true,
            message: res.data.Message,
            type: "error",
          });
          this.dataList = [];
          this.dataCount = 0;
        }
      });
    },
    // 制定整经计划
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
      let params = [];
      this.selection.map((item) => {
        var tiemStart = item.dataStart.replace(/-/g, "");
        var tiemEnd = item.dataEnd.replace(/-/g, "");
        params.push({
          BILLNO: item.BILLNO,
          BILLDATE: item.BILLDATE,
          ORDERID: item.ORDERID,
          ORDERROWID: item.ORDERROWID,
          FROMBILLNO: item.FROMBILLNO,
          PRODUCTID: item.PRODUCTID,
          FINALDELIVERYTIME: item.FINALDELIVERYTIME,
          QUANTITY: item.QUANTITY,
          ROLLNUM: item.ROLLNUM,
          SUREAMOUNT: item.SUREAMOUNT,
          SUREROLLNUM: item.SUREROLLNUM,
          BEAMTYPEID1: item.BEAMTYPEID1,
          BEAMTYPENAME1: item.BEAMTYPENAME1,
          REEDNUMBER: item.REEDNUMBER,
          BEAMLENGTH1: item.BEAMLENGTH1,
          TOTALBEAMAMOUNT1: item.TOTALBEAMAMOUNT1,
          WARPCOLORNO: item.WARPCOLORNO,
          BEAMTYPEID2: item.BEAMTYPEID2,
          BEAMTYPENAME2: item.BEAMTYPENAME2,
          BEAMLENGTH2: item.BEAMLENGTH2,
          TOTALBEAMAMOUNT2: item.TOTALBEAMAMOUNT2,
          UPWEFT: item.UPWEFT,
          PASSNUM: item.PASSNUM,
          NEEDLENUMBER: item.NEEDLENUMBER,
          DOORSTICKER: item.DOORSTICKER,
          BOLTLENGTHREQUIRE: item.BOLTLENGTHREQUIRE,
          CHECKREQUIRE: item.CHECKREQUIRE,
          DRAFTINGTYPE: item.DRAFTINGTYPE,
          AFTERWAYID: item.AFTERWAYID,
          AFTERWAYROUTEID: item.AFTERWAYROUTEID,
          AFTERWAYREMARK: item.AFTERWAYREMARK,
          ORDERTIME: item.ORDERTIME,
          ISCALCULATE: item.ISCALCULATE,
          ORDERCHANGE: item.ORDERCHANGE,
          BEGINTIME: tiemStart,
          ENDTIME: tiemEnd,
          BEAMDIRECTION: item.BEAMDIRECTION,
          PRODUCTMODE: item.PRODUCTMODE,
          PLSREMARK: item.PLSREMARK,
          HOLDNUM: item.HOLDNUM,
          HOLDROLLNUM: item.HOLDROLLNUM,
          HOLDBEAMLENGTH1: item.HOLDBEAMLENGTH1,
          HOLDBEAMLENGTH2: item.HOLDBEAMLENGTH2,
          STOPSKID: item.STOPSKID,
          GATEWIDTH: item.GATEWIDTH,
          EFILENAME: item.CUSTOMERBILLNO,
          CUSTOMERBILLNO: item.CUSTOMERBILLNO,
          CUSTOMERMODEL: item.CUSTOMERMODEL,
          SHEETSIGN: item.SHEETSIGN,
          CURRENTSTATE: item.CURRENTSTATE,
        });
      });
      console.log(params);
      let param = {
        List: params,
      };
      api.updateproductdata(this.$qs.stringify(param)).then((res) => {
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
    // 生效
    takeEffect() {
      let params = [];
      this.selection.map((item) => {
        var tiemStart = item.dataStart.replace(/-/g, "");
        var tiemEnd = item.dataEnd.replace(/-/g, "");
        params.push({
          BILLNO: item.BILLNO,
          BILLDATE: item.BILLDATE,
          ORDERID: item.ORDERID,
          ORDERROWID: item.ORDERROWID,
          FROMBILLNO: item.FROMBILLNO,
          PRODUCTID: item.PRODUCTID,
          FINALDELIVERYTIME: item.FINALDELIVERYTIME,
          QUANTITY: item.QUANTITY,
          ROLLNUM: item.ROLLNUM,
          SUREAMOUNT: item.SUREAMOUNT,
          SUREROLLNUM: item.SUREROLLNUM,
          BEAMTYPEID1: item.BEAMTYPEID1,
          BEAMTYPENAME1: item.BEAMTYPENAME1,
          REEDNUMBER: item.REEDNUMBER,
          BEAMLENGTH1: item.BEAMLENGTH1,
          TOTALBEAMAMOUNT1: item.TOTALBEAMAMOUNT1,
          WARPCOLORNO: item.WARPCOLORNO,
          BEAMTYPEID2: item.BEAMTYPEID2,
          BEAMTYPENAME2: item.BEAMTYPENAME2,
          BEAMLENGTH2: item.BEAMLENGTH2,
          TOTALBEAMAMOUNT2: item.TOTALBEAMAMOUNT2,
          UPWEFT: item.UPWEFT,
          PASSNUM: item.PASSNUM,
          NEEDLENUMBER: item.NEEDLENUMBER,
          DOORSTICKER: item.DOORSTICKER,
          BOLTLENGTHREQUIRE: item.BOLTLENGTHREQUIRE,
          CHECKREQUIRE: item.CHECKREQUIRE,
          DRAFTINGTYPE: item.DRAFTINGTYPE,
          AFTERWAYID: item.AFTERWAYID,
          AFTERWAYROUTEID: item.AFTERWAYROUTEID,
          AFTERWAYREMARK: item.AFTERWAYREMARK,
          ORDERTIME: item.ORDERTIME,
          ISCALCULATE: item.ISCALCULATE,
          ORDERCHANGE: item.ORDERCHANGE,
          BEGINTIME: tiemStart,
          ENDTIME: tiemEnd,
          BEAMDIRECTION: item.BEAMDIRECTION,
          PRODUCTMODE: item.PRODUCTMODE,
          PLSREMARK: item.PLSREMARK,
          HOLDNUM: item.HOLDNUM,
          HOLDROLLNUM: item.HOLDROLLNUM,
          HOLDBEAMLENGTH1: item.HOLDBEAMLENGTH1,
          HOLDBEAMLENGTH2: item.HOLDBEAMLENGTH2,
          STOPSKID: item.STOPSKID,
          GATEWIDTH: item.GATEWIDTH,
          EFILENAME: item.CUSTOMERBILLNO,
          CUSTOMERBILLNO: item.CUSTOMERBILLNO,
          CUSTOMERMODEL: item.CUSTOMERMODEL,
          SHEETSIGN: item.SHEETSIGN,
          CURRENTSTATE: 2,
        });
      });
      console.log(params);
      let param = {
        List: params,
      };

      api.updateproductdata(this.$qs.stringify(param)).then((res) => {
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
    // 提交
    submit() {
      let params = [];
      this.selection.map((item) => {
        var tiemStart = item.dataStart.replace(/-/g, "");
        var tiemEnd = item.dataEnd.replace(/-/g, "");
        params.push({
          BILLNO: item.BILLNO,
          BILLDATE: item.BILLDATE,
          ORDERID: item.ORDERID,
          ORDERROWID: item.ORDERROWID,
          FROMBILLNO: item.FROMBILLNO,
          PRODUCTID: item.PRODUCTID,
          FINALDELIVERYTIME: item.FINALDELIVERYTIME,
          QUANTITY: item.QUANTITY,
          ROLLNUM: item.ROLLNUM,
          SUREAMOUNT: item.SUREAMOUNT,
          SUREROLLNUM: item.SUREROLLNUM,
          BEAMTYPEID1: item.BEAMTYPEID1,
          BEAMTYPENAME1: item.BEAMTYPENAME1,
          REEDNUMBER: item.REEDNUMBER,
          BEAMLENGTH1: item.BEAMLENGTH1,
          TOTALBEAMAMOUNT1: item.TOTALBEAMAMOUNT1,
          WARPCOLORNO: item.WARPCOLORNO,
          BEAMTYPEID2: item.BEAMTYPEID2,
          BEAMTYPENAME2: item.BEAMTYPENAME2,
          BEAMLENGTH2: item.BEAMLENGTH2,
          TOTALBEAMAMOUNT2: item.TOTALBEAMAMOUNT2,
          UPWEFT: item.UPWEFT,
          PASSNUM: item.PASSNUM,
          NEEDLENUMBER: item.NEEDLENUMBER,
          DOORSTICKER: item.DOORSTICKER,
          BOLTLENGTHREQUIRE: item.BOLTLENGTHREQUIRE,
          CHECKREQUIRE: item.CHECKREQUIRE,
          DRAFTINGTYPE: item.DRAFTINGTYPE,
          AFTERWAYID: item.AFTERWAYID,
          AFTERWAYROUTEID: item.AFTERWAYROUTEID,
          AFTERWAYREMARK: item.AFTERWAYREMARK,
          ORDERTIME: item.ORDERTIME,
          ISCALCULATE: item.ISCALCULATE,
          ORDERCHANGE: item.ORDERCHANGE,
          BEGINTIME: tiemStart,
          ENDTIME: tiemEnd,
          BEAMDIRECTION: item.BEAMDIRECTION,
          PRODUCTMODE: item.PRODUCTMODE,
          PLSREMARK: item.PLSREMARK,
          HOLDNUM: item.HOLDNUM,
          HOLDROLLNUM: item.HOLDROLLNUM,
          HOLDBEAMLENGTH1: item.HOLDBEAMLENGTH1,
          HOLDBEAMLENGTH2: item.HOLDBEAMLENGTH2,
          STOPSKID: item.STOPSKID,
          GATEWIDTH: item.GATEWIDTH,
          EFILENAME: item.CUSTOMERBILLNO,
          CUSTOMERBILLNO: item.CUSTOMERBILLNO,
          CUSTOMERMODEL: item.CUSTOMERMODEL,
          SHEETSIGN: item.SHEETSIGN,
          CURRENTSTATE: 2,
        });
      });
      console.log(params);
      let param = {
        List: params,
      };

      api.updateproductdata(this.$qs.stringify(param)).then((res) => {
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
    //计算原料
    countRaw() {
      let billno = [];
      this.selection.map((item) => {
        billno.push(item.BILLNO);
      });
      let params = {
        handle: "",
        progId: "",
        batchParams: billno,
      };
      console.log(params);
      api.plancreatmaterial(this.$qs.stringify(params)).then((res) => {
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
    // 计算
    count() {
      this.pnum = 0;
      this.num = 0;
      this.weavingNum1 = 0;
      this.weavingNum2 = 0;
      this.changeorder = 0;
      this.sureamount = 0;
      this.psureamount = 0;
      this.dataList.map((item) => {
        // 决议交期
        if (item.FINALDELIVERYTIME != 0) {
          item.FINALDELIVERYTIME = item.FINALDELIVERYTIME + "";
          var dd = item.FINALDELIVERYTIME.slice(0, 4);
          var dt = item.FINALDELIVERYTIME.slice(4, 6);
          var dm = item.FINALDELIVERYTIME.slice(6, 8);
          var t = dd + "-" + dt + "-" + dm;
          this.$set(item, "time", t);
        }
        if (item.FINALDELIVERYTIME == 0) {
          this.$set(item, "time", item.FINALDELIVERYTIME);
        }
        // 下单日期
        if (item.ORDERTIME != 0) {
          item.ORDERTIME = item.ORDERTIME + "";
          var year = item.ORDERTIME.slice(0, 4);
          var month = item.ORDERTIME.slice(4, 6);
          var date = item.ORDERTIME.slice(6, 8);
          var datatime = year + "-" + month + "-" + date;
          // console.log(t);
          this.$set(item, "datatime", datatime);
          // console.log(item.time);
        }
        if (item.ORDERTIME == 0) {
          this.$set(item, "datatime", item.ORDERTIME);
        }
        // 单据日期
        if (item.BILLDATE != 0) {
          item.BILLDATE = item.BILLDATE + "";
          var y = item.BILLDATE.slice(0, 4);
          var m = item.BILLDATE.slice(4, 6);
          var d = item.BILLDATE.slice(6, 8);
          var time = y + "-" + m + "-" + d;
          // console.log(time);
          this.$set(item, "billdate", time);
          // console.log(item.time);
        }
        if (item.BILLDATE == 0) {
          this.$set(item, "billdate", item.BILLDATE);
        }
        // 开始日期
        if (item.BEGINTIME != 0) {
          item.BEGINTIME = item.BEGINTIME + "";
          var y1 = item.BEGINTIME.slice(0, 4);
          var m1 = item.BEGINTIME.slice(4, 6);
          var d1 = item.BEGINTIME.slice(6, 8);
          var time1 = y1 + "-" + m1 + "-" + d1;
          // console.log(time);
          this.$set(item, "beaginTime", time1);
          // console.log(item.time);
        }
        if (item.BEGINTIME == 0) {
          this.$set(item, "beaginTime", item.BEGINTIME);
        }
        // 结束日期
        if (item.ENDTIME != 0) {
          item.ENDTIME = item.ENDTIME + "";
          var y2 = item.ENDTIME.slice(0, 4);
          var m2 = item.ENDTIME.slice(4, 6);
          var d2 = item.ENDTIME.slice(6, 8);
          var time2 = y2 + "-" + m2 + "-" + d2;
          // console.log(time);
          this.$set(item, "endTime", time2);
          // console.log(item.time);
        }
        if (item.ENDTIME == 0) {
          this.$set(item, "endTime", item.ENDTIME);
        }
        // 产品米数
        this.PRODUCTIONUM = item.SUREAMOUNT - item.HOLDNUM;
        this.$set(item, "PRODUCTIONUM", this.PRODUCTIONUM);
        // 卷数
        this.VOLUMENUM = item.SUREROLLNUM - item.HOLDROLLNUM;

        this.$set(item, "VOLUMENUM", this.VOLUMENUM);
        // 经轴长度
        this.WEAVINGLENGTH = item.BEAMLENGTH1 - item.HOLDBEAMLENGTH1;

        this.$set(item, "WEAVINGLENGTH", this.WEAVINGLENGTH);
        // 合计
        this.num += item.QUANTITY;
        this.pnum += item.ROLLNUM;
        this.weavingNum1 += item.BEAMLENGTH1;
        this.weavingNum2 += item.BEAMLENGTH2;
        this.changeorder += item.ORDERCHANGE;
        this.sureamount = item.SUREAMOUNT;
        this.psureamount = item.SUREROLLNUM;
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
      return "border-color: #C1C1C1;color:#666;background-color:#F5F5F5;white-space:nowrap;";
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
  // position: relative;
  background-color: #fff;
  height: 100%;
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
