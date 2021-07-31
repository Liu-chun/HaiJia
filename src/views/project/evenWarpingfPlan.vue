<template>
  <!-- 成品 -->
  <div class="parcel">
    <BreadNav
      :nameOne="'生产计划'"
      :pathOne="'home'"
      :nameTwo="'查双经轴未制定整经计划（后）'"
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
          <i class="icon el-icon-document-checked"></i>
          <span>制定整经计划</span>
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
            prop="datatime"
            sortable
            label="日期"
          ></el-table-column>
          <el-table-column
            prop="ORDERID"
            sortable
            label="订单号"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="PRODUCTID"
            sortable
            label="产品型号"
          ></el-table-column>
          <!-- <el-table-column
            width="90"
            prop="productionName"
            sortable
            label="产品名称"
          ></el-table-column> -->
          <el-table-column
            width="90"
            prop="time"
            sortable
            label="决议交期"
          ></el-table-column>
          <el-table-column
            prop="QUANTITY"
            sortable
            label="订单米数"
            width="90"
          ></el-table-column>
          <el-table-column
            prop="ROLLNUM"
            width="90"
            sortable
            label="订单卷数"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            prop="SUREAMOUNT"
            width="90"
            sortable
            label="需生产数"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            width="100"
            prop="SUREROLLNUM"
            sortable
            label="需生产卷数"
            :show-overflow-tooltip="true"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="HOLDNUM"
            sortable
            :show-overflow-tooltip="true"
            label="落实数量"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="HOLDROLLNUM"
            sortable
            label="落实卷数"
          ></el-table-column>
          <el-table-column
            width="120"
            prop="HOLDBEAMLENGTH1"
            sortable
            label="落实经轴长度1"
          ></el-table-column>
          <el-table-column
            width="120"
            prop="HOLDBEAMLENGTH2"
            sortable
            label="落实经轴长度2"
          ></el-table-column>
          <el-table-column
            width="95"
            prop="BEAMTYPEID1"
            sortable
            label="经轴类型1"
          ></el-table-column>
          <el-table-column
            prop="REEDNUMBER"
            sortable
            label="筘号"
          ></el-table-column>
          <el-table-column
            width="95"
            prop="BEAMLENGTH1"
            sortable
            label="经轴长度1"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="TOTALBEAMAMOUNT1"
            sortable
            label="总经数1"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="WARPCOLORNO"
            sortable
            label="经纱色号"
          ></el-table-column>
          <el-table-column
            width="95"
            prop="BEAMTYPEID2"
            sortable
            label="经轴类型2"
          ></el-table-column>
          <el-table-column
            width="95"
            prop="BEAMLENGTH2"
            sortable
            label="经轴长度2"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="TOTALBEAMAMOUNT2"
            sortable
            label="总经数2"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="UPWEFT"
            sortable
            label="上机纬密"
          ></el-table-column>
          <el-table-column
            prop="PASSNUM"
            sortable
            label="穿入数"
          ></el-table-column>
          <el-table-column
            prop="NEEDLENUMBER"
            sortable
            label="纹针数"
          ></el-table-column>
          <el-table-column
            prop="BILLNO"
            sortable
            label="计划号"
          ></el-table-column>
          <el-table-column
            width="95"
            prop="BEAMTYPENAME1"
            sortable
            label="经轴名称1"
          ></el-table-column>
          <el-table-column
            width="95"
            prop="BEAMTYPENAME2"
            sortable
            label="经轴名称2"
          ></el-table-column>
          <el-table-column
            prop="DOORSTICKER"
            sortable
            label="门幅"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="BOLTLENGTHREQUIRE"
            sortable
            label="匹长要求"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="CHECKREQUIRE"
            sortable
            label="检验要求"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="DRAFTINGTYPE"
            sortable
            label="穿综方式"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="PLSREMARK"
            sortable
            label="生产备注"
          ></el-table-column>
          <el-table-column
            width="100"
            prop="AFTERWAYROUTEID"
            sortable
            label="后整理路线"
          ></el-table-column>
          <el-table-column
            width="100"
            prop="AFTERWAYREMARK"
            sortable
            label="后整理描述"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="MATERIALCALCULATE"
            sortable
            label="原料计算"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="ORDERCHANGE"
            sortable
            label="订单变更"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="beginTime"
            sortable
            label="开始日期"
          ></el-table-column>
          <el-table-column
            width="90"
            prop="endTime"
            sortable
            label="结束日期"
          ></el-table-column>

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
      :visible.sync="userDialog"
      width="80%"
      :before-close="handleCloseUser"
    >
      <div class="editAdd">
        <el-row class="tit">
          <el-col :span="24">整经计划</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="item">
              <div class="itemCntent">
                <div class="titleOverall">
                  <i style="color: red">*</i>
                  <span>日期：</span>
                </div>
                <div class="titleinput">
                  <el-input
                    v-model="form.dataNow"
                    name="phone"
                    size="mini"
                  ></el-input>
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <div class="itemCntent">
                <div class="titleOverall">
                  <!-- <i style="color: red">*</i> -->
                  <span>订单号：</span>
                </div>
                <div class="titleinput">
                  <el-input
                    v-model="billno"
                    size="mini"
                    name="订单号"
                  ></el-input>
                  <!-- <div
                    v-show="errors.has('phone')"
                    style="color: red; font-size: 10px; margin-left: 40%"
                  >
                    {{ errors.first("phone") }}
                  </div> -->
                </div>
              </div>
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <div class="itemCntent">
                <div class="titleOverall">
                  <i style="color: red">*</i>
                  <span>经轴类型：</span>
                </div>
                <div class="titleinput">
                  <el-input
                    v-model="weavingType"
                    size="mini"
                    disabled
                  ></el-input>
                </div>
              </div>
              <!-- <div style="color: red; font-size: 10px; margin-left: 40%">
                {{ errors.first("部门") }}
              </div> -->
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <div class="itemCntent">
                <div class="titleOverall">
                  <!--                  <i style="color:red">*</i>-->
                  <span>经轴名称：</span>
                </div>
                <div class="titleinput">
                  <el-input
                    v-model="weavingName"
                    size="mini"
                    disabled
                  ></el-input>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="item">
              <div class="itemCntent">
                <div class="titleOverall">
                  <!-- <i style="color: red">*</i> -->
                  <span>织机类型：</span>
                </div>
                <div class="titleinput">
                  <el-select
                    style="width: 100%"
                    size="mini"
                    v-model="form.loomList"
                    placeholder="请选择"
                    name="织机类型"
                  >
                    <el-option
                      v-for="item in loomList"
                      :key="item.LOOMTYPEID"
                      :label="item.LOOMTYPENAME"
                      :value="item.LOOMTYPEID"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <!-- <div style="color: red; font-size: 10px; margin-left: 40%">
                {{ errors.first("部门") }}
              </div> -->
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <div class="itemCntent">
                <div class="titleOverall">
                  <!-- <i style="color: red">*</i> -->
                  <span>计划米数：</span>
                </div>
                <div class="titleinput">
                  <el-input
                    v-model="form.planNum"
                    size="mini"
                    name="NO"
                  ></el-input>
                </div>
              </div>
              <!-- <div style="color:red ; font-size: 10px;margin-left: 40%;">{{ errors.first('名称') }}</div> -->
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <div class="itemCntent">
                <div class="titleOverall">
                  <!-- <i style="color: red">*</i> -->
                  <span>计划日期：</span>
                </div>
                <div class="titleinput">
                  <el-input
                    placeholder="请选择日期"
                    v-model="form.dataNow"
                    size="mini"
                  >
                  </el-input>
                </div>
              </div>
              <!-- <div style="color:red ; font-size: 10px;margin-left: 40%;">{{ errors.first('名称') }}</div> -->
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <div class="itemCntent">
                <div class="titleOverall">
                  <!-- <i style="color: red">*</i> -->
                  <span>经轴标志：</span>
                </div>
                <div class="titleinput">
                  <el-select
                    style="width: 100%"
                    size="mini"
                    v-model="form.taskNo"
                    placeholder="请选择"
                    name="经轴标志"
                  >
                    <el-option
                      v-for="item in weavingSign"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <!-- <div style="color: red; font-size: 10px; margin-left: 40%">
                {{ errors.first("部门") }}
              </div> -->
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="item">
              <div class="itemCntent">
                <div class="titleOverall">
                  <!-- <i style="color: red">*</i> -->
                  <span>总经数：</span>
                </div>
                <div class="titleinput">
                  <el-input v-model="allNum" name="日期" size="mini"></el-input>
                </div>
              </div>
              <!-- <div style="color:red ; font-size: 10px;margin-left: 40%;">{{ errors.first('编码') }}</div> -->
            </div>
          </el-col>
          <el-col :span="12">
            <div class="item">
              <div class="itemCntent">
                <div class="titleOverall">
                  <!-- <i style="color: red">*</i> -->
                  <span>备注：</span>
                </div>
                <div class="titleinput bz">
                  <el-input
                    v-model="form.names"
                    size="mini"
                    name="NO"
                  ></el-input>
                </div>
              </div>
              <!-- <div style="color:red ; font-size: 10px;margin-left: 40%;">{{ errors.first('名称') }}</div> -->
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <div class="itemCntent">
                <div class="titleOverall">
                  <!-- <i style="color: red">*</i> -->
                  <span>重复次数：</span>
                </div>
                <div class="titleinput">
                  <el-input
                    v-model="repetition"
                    name="重复次数"
                    size="mini"
                  ></el-input>
                </div>
              </div>
              <!-- <div style="color:red ; font-size: 10px;margin-left: 40%;">{{ errors.first('编码') }}</div> -->
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="tab">
        <el-row class="tit">
          <el-col :span="24">对应织造计划</el-col>
        </el-row>
        <el-table
          :data="selection"
          :header-cell-style="headerStyle"
          border
          style="width: 100%"
        >
          <el-table-column prop="BILLNO" label="织造计划号" width="100">
          </el-table-column>
          <el-table-column prop="ORDERID" label="订单号" width="90">
          </el-table-column>
          <el-table-column prop="PRODUCTID" label="产品型号"> </el-table-column>
          <el-table-column label="幅宽标志">
            <template slot-scope="scope">
              <span v-show="scope.row.SHEETSIGN === 0">{{
                scope.row.SHEETSIGN === 0 ? "窄" : null
              }}</span>
              <span v-show="scope.row.SHEETSIGN === 1">
                {{ scope.row.SHEETSIGN === 1 ? "宽" : null }}
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="PRODUCTIONUM" label="产品米数">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.PRODUCTIONUM"
                placeholder="请输入内容"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="VOLUMENUM" label="卷数">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.VOLUMENUM"
                placeholder="请输入内容"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="WEAVINGLENGTH" label="经轴长度">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.WEAVINGLENGTH"
                placeholder="请输入内容"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="EFILENAME" label="花本编号">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.EFILENAME"
                placeholder="请输入内容"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="PLSREMARK" label="产品备注"> </el-table-column>
          <el-table-column prop="UPWEFT" label="上机纬密">
            <template slot-scope="scope">
              <el-input
                v-model="scope.row.UPWEFT"
                placeholder="请输入内容"
              ></el-input>
            </template>
          </el-table-column>
          <el-table-column prop="address" label="纬密牙">
            <template slot-scope="scope">
              <el-input v-model="scope.row.address"></el-input>
            </template>
          </el-table-column>
          <el-table-column label="是否停撬">
            <template slot-scope="scope">
              <el-select v-model="scope.row.STOPSKID" placeholder="">
                <el-option
                  v-for="item in isstopskid"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value"
                >
                </el-option>
              </el-select>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="userDialog = false">取 消</el-button>
        <el-button size="mini" type="primary" @click="makePlanOk()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <!-- 编辑弹窗 -->
    <el-dialog :title="form.title" :visible.sync="userTypeDialog" width="60%">
      <div class="editAdd">
        <el-row class="tit">
          <el-col :span="24">生产计划信息</el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="item">
              <div class="itemCntent">
                <div class="titleOverall">
                  <i style="color: red">*</i>
                  <span>日期：</span>
                </div>
                <div class="titleinput">
                  <el-input
                    v-model="form.dataNow"
                    name="日期"
                    size="mini"
                  ></el-input>
                </div>
              </div>
              <!-- <div style="color:red ; font-size: 10px;margin-left: 40%;">{{ errors.first('编码') }}</div> -->
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <div class="itemCntent">
                <div class="titleOverall">
                  <i style="color: red">*</i>
                  <span>计划号：</span>
                </div>
                <div class="titleinput">
                  <el-input
                    v-model="form.names"
                    size="mini"
                    name="NO"
                  ></el-input>
                </div>
              </div>
              <!-- <div style="color:red ; font-size: 10px;margin-left: 40%;">{{ errors.first('名称') }}</div> -->
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <div class="itemCntent">
                <div class="titleOverall">
                  <!-- <i style="color: red">*</i> -->
                  <span>订单号：</span>
                </div>
                <div class="titleinput">
                  <el-input
                    v-model="form.names"
                    size="mini"
                    name="订单号"
                  ></el-input>
                </div>
              </div>
              <!-- <div style="color: red; font-size: 10px; margin-left: 40%">
                {{ errors.first("部门") }}
              </div> -->
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <div class="itemCntent">
                <div class="titleOverall">
                  <!-- <i style="color: red">*</i> -->
                  <span>产品型号：</span>
                </div>
                <div class="titleinput">
                  <el-input
                    v-model="form.names"
                    size="mini"
                    name="产品型号"
                  ></el-input>
                </div>
              </div>
              <!-- <div style="color: red; font-size: 10px; margin-left: 40%">
                {{ errors.first("部门") }}
              </div> -->
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="item">
              <div class="itemCntent">
                <div class="titleOverall">
                  <!-- <i style="color: red">*</i> -->
                  <span>后整理方式：</span>
                </div>
                <div class="titleinput">
                  <el-input
                    v-model="form.dataNow"
                    name="后整理方式"
                    size="mini"
                  ></el-input>
                </div>
              </div>
              <!-- <div style="color:red ; font-size: 10px;margin-left: 40%;">{{ errors.first('编码') }}</div> -->
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <div class="itemCntent">
                <div class="titleOverall">
                  <!-- <i style="color: red">*</i> -->
                  <span>数量：</span>
                </div>
                <div class="titleinput">
                  <el-input
                    v-model="form.names"
                    size="mini"
                    name="数量"
                  ></el-input>
                </div>
              </div>
              <!-- <div style="color:red ; font-size: 10px;margin-left: 40%;">{{ errors.first('名称') }}</div> -->
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <div class="itemCntent">
                <div class="titleOverall">
                  <!-- <i style="color: red">*</i> -->
                  <span>匹数：</span>
                </div>
                <div class="titleinput">
                  <el-input
                    v-model="form.names"
                    size="mini"
                    name="匹数"
                  ></el-input>
                </div>
              </div>
              <!-- <div style="color: red; font-size: 10px; margin-left: 40%">
                {{ errors.first("部门") }}
              </div> -->
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <div class="itemCntent">
                <div class="titleOverall">
                  <!-- <i style="color: red">*</i> -->
                  <span>开始日期：</span>
                </div>
                <div class="titleinput">
                  <el-input
                    v-model="form.names"
                    size="mini"
                    name="开始日期"
                  ></el-input>
                </div>
              </div>
              <!-- <div style="color: red; font-size: 10px; margin-left: 40%">
                {{ errors.first("部门") }}
              </div> -->
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="item">
              <div class="itemCntent">
                <div class="titleOverall">
                  <!-- <i style="color: red">*</i> -->
                  <span>结束日期：</span>
                </div>
                <div class="titleinput">
                  <el-input
                    v-model="form.dataNow"
                    name="结束日期"
                    size="mini"
                  ></el-input>
                </div>
              </div>
              <!-- <div style="color:red ; font-size: 10px;margin-left: 40%;">{{ errors.first('编码') }}</div> -->
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <div class="itemCntent">
                <div class="titleOverall">
                  <!-- <i style="color: red">*</i> -->
                  <span>落实数量：</span>
                </div>
                <div class="titleinput">
                  <el-input
                    v-model="form.names"
                    size="mini"
                    name="落实数量"
                  ></el-input>
                </div>
              </div>
              <!-- <div style="color:red ; font-size: 10px;margin-left: 40%;">{{ errors.first('名称') }}</div> -->
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <div class="itemCntent">
                <div class="titleOverall">
                  <!-- <i style="color: red">*</i> -->
                  <span>落实卷数：</span>
                </div>
                <div class="titleinput">
                  <el-input
                    v-model="form.names"
                    size="mini"
                    name="落实卷数"
                  ></el-input>
                </div>
              </div>
              <!-- <div style="color: red; font-size: 10px; margin-left: 40%">
                {{ errors.first("部门") }}
              </div> -->
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <div class="itemCntent">
                <div class="titleOverall">
                  <!-- <i style="color: red">*</i> -->
                  <span>经轴落实：</span>
                </div>
                <div class="titleinput">
                  <el-input
                    v-model="form.names"
                    size="mini"
                    name="经轴落实"
                  ></el-input>
                </div>
              </div>
              <!-- <div style="color: red; font-size: 10px; margin-left: 40%">
                {{ errors.first("部门") }}
              </div> -->
            </div>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="6">
            <div class="item">
              <div class="itemCntent">
                <div class="titleOverall">
                  <!-- <i style="color: red">*</i> -->
                  <span>经轴类型1编号：</span>
                </div>
                <div class="titleinput">
                  <el-input
                    v-model="form.code"
                    name="经轴类型1编号"
                    size="mini"
                  ></el-input>
                </div>
              </div>
              <!-- <div style="color:red ; font-size: 10px;margin-left: 40%;">{{ errors.first('编码') }}</div> -->
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <div class="itemCntent">
                <div class="titleOverall">
                  <!-- <i style="color: red">*</i> -->
                  <span>经轴需求：</span>
                </div>
                <div class="titleinput">
                  <el-input
                    v-model="form.names"
                    size="mini"
                    name="经轴需求"
                  ></el-input>
                </div>
              </div>
              <!-- <div style="color:red ; font-size: 10px;margin-left: 40%;">{{ errors.first('名称') }}</div> -->
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <div class="itemCntent">
                <div class="titleOverall">
                  <!-- <i style="color: red">*</i> -->
                  <span>经轴类型2编号：</span>
                </div>
                <div class="titleinput">
                  <el-input
                    v-model="form.code"
                    name="经轴类型2编号"
                    size="mini"
                  ></el-input>
                </div>
              </div>
              <!-- <div style="color:red ; font-size: 10px;margin-left: 40%;">{{ errors.first('编码') }}</div> -->
            </div>
          </el-col>
          <el-col :span="6">
            <div class="item">
              <div class="itemCntent">
                <div class="titleOverall">
                  <!-- <i style="color: red">*</i> -->
                  <span>已计算原料：</span>
                </div>
                <div class="titleinput">
                  <el-input
                    v-model="form.code"
                    name="已计算原料"
                    size="mini"
                  ></el-input>
                </div>
              </div>
              <!-- <div style="color:red ; font-size: 10px;margin-left: 40%;">{{ errors.first('编码') }}</div> -->
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <div class="item">
              <div class="itemCntent">
                <div class="titleOverall">
                  <!-- <i style="color: red">*</i> -->
                  <span>经轴去向：</span>
                </div>
                <div class="titleinput">
                  <el-select
                    style="width: 100%"
                    size="mini"
                    v-model="form.departmentID"
                    placeholder="请选择"
                    name="经轴标志"
                  >
                    <el-option
                      v-for="item in customerTypeOptions"
                      :key="item.id"
                      :label="item.names"
                      :value="item.id"
                    ></el-option>
                  </el-select>
                </div>
              </div>
              <!-- <div style="color: red; font-size: 10px; margin-left: 40%">
                {{ errors.first("部门") }}
              </div> -->
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="tab">
        <!-- <el-row class="tit">
          <el-col :span="24">对应织造计划</el-col>
        </el-row> -->
        <el-table
          :data="tableData"
          :header-cell-style="headerStyle"
          border
          style="width: 100%"
        >
          <el-table-column prop="date" label="日期"> </el-table-column>
          <el-table-column prop="date" label="计划号"> </el-table-column>
          <el-table-column prop="name" label="订单号"> </el-table-column>
          <el-table-column prop="address" label="产品型号"> </el-table-column>
          <el-table-column prop="address" label="后整理方式"> </el-table-column>
          <el-table-column prop="address" label="数量"> </el-table-column>
          <el-table-column prop="address" label="匹数"> </el-table-column>
          <el-table-column prop="address" label="开始日期"> </el-table-column>
          <el-table-column prop="address" label="结束日期"> </el-table-column>
          <el-table-column prop="address" label="落实数量"> </el-table-column>
          <el-table-column prop="address" label="落实卷数"> </el-table-column>
          <el-table-column prop="address" label="经轴落实"> </el-table-column>
          <el-table-column prop="address" label="经轴类型1编号">
          </el-table-column>
          <el-table-column prop="address" label="经轴需求"> </el-table-column>
          <el-table-column prop="address" label="经轴类型2编号">
          </el-table-column>
          <el-table-column prop="address" label="已计算原料"> </el-table-column>
          <el-table-column prop="address" label="经轴去向"> </el-table-column>
        </el-table>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="editAddOKOff()">取 消</el-button>
        <el-button size="mini" type="primary" @click="editAddOK()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
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
      // 计划号
      planNum: "",
      // 订单号
      orderNum: "",
      // 产品型号
      productNum: "",
      dateStart: "",
      dateEnd: "",
      date: "",
      messageTableHead: {
        taskNo: "",
        productName: "",
        beamCardNo: "",
        orderNo: "",
        wide: "",
        needNumber: "",
        planEndDate: "",
      },
      messageTable: [],
      messageStatic: true,
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            },
          },
          {
            text: "明天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24);
              picker.$emit("pick", date);
            },
          },
          {
            text: "未来一周",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            },
          },
        ],
      },
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
      },
      customerTypeOptions: [],
      userDialog: false,
      staticOptions: [
        {
          name: "全部",
          id: 2,
        },
        {
          name: "未开始",
          id: 0,
        },
        {
          name: "生产中",
          id: 4,
        },
        {
          name: "生产已完工",
          id: 5,
        },
        {
          name: "成品验布中",
          id: 6,
        },
        {
          name: "成品验布已完工",
          id: 7,
        },
        {
          name: "成品验布中",
          id: 8,
        },
        {
          name: "已完工",
          id: 100,
        },
      ],
      weavingType: "",
      allNum: null,
      dataCount: 0, //总条数
      pageIndex: 1, //当前第几页
      pageCount: 1, //总页数
      pageSize: 10, //每页显示条目个数
      // 选中
      selection: [],
      // 合计
      num: 0,
      pnum: 0,
      weavingNum1: 0,
      weavingNum2: 0,
      changeorder: 0,
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
      // 是否停撬
      isstopskid: [
        {
          value: 0,
          label: "N",
        },
        {
          value: 1,
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
    // 获取织机类型
    getLoomList() {
      api.GetLoomList(this.$qs.stringify()).then((res) => {
        console.log(res.data);
        this.loomList = res.data;
      });
    },
    // 获取日期
    time() {
      var myDate = new Date();
      var y = myDate.getFullYear(); //获取完整的年份(4位,1970-????)
      var m = myDate.getMonth() + 1; //获取当前月份(0-11,0代表1月)
      var d = myDate.getDate(); //获取当前日(1-31)
      var data = y + "-" + m + "-" + d;
      this.form.dataNow = data;
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
          billtype: "3",
        },
      };
      api.getplandata(this.$qs.stringify(params)).then((res) => {
        console.log(res.data);
        if (res.data.Success !== false) {
          this.dataList = res.data.Entities;
          this.dataCount = res.data.Total;
          this.pageCount = Math.ceil(res.data.Total / 10);
          this.count();
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
      var newarr = [];
      var newArr = [];
      for (var i = 0; i < this.selection.length; i++) {
        if (newarr.indexOf(this.selection[i].BEAMTYPEID1) == -1) {
          newarr.push(this.selection[i].BEAMTYPEID1);
        }
      }
      for (var j = 0; j < this.selection.length; j++) {
        if (newArr.indexOf(this.selection[j].TOTALBEAMAMOUNT1) == -1) {
          newArr.push(this.selection[j].TOTALBEAMAMOUNT1);
        }
      }
      if (this.selection.length <= 0) {
        this.$message({
          message: "请您选择要操作的数据",
          type: "error",
        });
        return;
      }
      if (newarr.length > 1 && newArr.length > 1) {
        this.$message({
          message: "您选择的记录经轴类型不一致",
          type: "error",
        });
      } else {
        this.plan();
        this.time();
        this.getLoomList();
        this.userDialog = true;
      }
    },
    makePlanOk() {
      // this.userDialog = false;
      let weavdata = [];
      this.selection.map((item) => {
        weavdata.push({
          // WARPPLANNO: "string",
          WEAVPLANNO: item.BILLNO,
          ORDERID: item.ORDERID,
          ORDERROWID: item.ORDERROWID,
          WARPTYPE: 2,
          PRODUCTID: item.PRODUCTID,
          FINALDELIVERYTIME: item.time,
          QUANTITY: item.PRODUCTIONUM,
          ROLLNUM: item.VOLUMENUM,
          TOTALBEAMAMOUNT: item.TOTALBEAMAMOUNT1,
          BEAMLENGTH: item.WEAVINGLENGTH,
          UPWEFT: item.UPWEFT,
          STOPSKID: item.STOPSKID,
          CUSTOMERBILLNO: item.CUSTOMERBILLNO,
          CUSTOMERMODEL: item.CUSTOMERMODEL,
          EFILENAME: item.EFILENAME,
          REMARKS: item.PLSREMARK,
        });
      });
      let params = {
        ORDERID: this.billno,
        GATEWIDTH: this.menfu,
        // ROLLNUM: 0,
        BEAMTYPEID: this.weavingType,
        PLANMETERNUM: this.form.planNum,
        PRODUCTID: this.productType,
        // FLAG: 0,
        LOOMTYPEID: this.form.loomList,
        REMARKS: this.form.names,
        AROUND: "2",
        RENUM: this.repetition,
        WEAVDATA: weavdata,
      };
      console.log(params);
      api.saveplan(this.$qs.stringify(params)).then((res) => {
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
    //
    plan() {
      this.billno = "";
      this.allNum = null;
      this.productType = "";
      this.selection.map((item) => {
        // 订单号
        this.billno += item.ORDERID + ",";
        // 产品型号
        this.productType += item.PRODUCTID + ",";
        // 总经数
        this.allNum += item.TOTALBEAMAMOUNT2;
        // 经轴类型
        this.weavingType = item.BEAMTYPEID2;
        // 经轴名称
        this.weavingName = item.BEAMTYPENAME2;
        // 门幅
        this.menfu = item.GATEWIDTH;
      });
      this.billno = this.billno.substring(0, this.billno.length - 1);
      this.productType = this.productType.substring(
        0,
        this.productType.length - 1
      );
      // console.log(this.billno);
    },
    // 计算
    count() {
      this.pnum = 0;
      this.num = 0;
      this.weavingNum1 = 0;
      this.weavingNum2 = 0;
      this.changeorder = 0;
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
        // 日期
        if (item.BILLDATE != 0) {
          item.BILLDATE = item.BILLDATE + "";
          var year = item.BILLDATE.slice(0, 4);
          var month = item.BILLDATE.slice(4, 6);
          var date = item.BILLDATE.slice(6, 8);
          var datatime = year + "-" + month + "-" + date;
          // console.log(t);
          this.$set(item, "datatime", datatime);
          // console.log(item.time);
        }
        if (item.BILLDATE == 0) {
          this.$set(item, "datatime", item.BILLDATE);
        }
        // 开始日期
        if (item.BEGINTIME != 0) {
          item.BEGINTIME = item.BEGINTIME + "";
          var y1 = item.BEGINTIME.slice(0, 4);
          var m1 = item.BEGINTIME.slice(4, 6);
          var d1 = item.BEGINTIME.slice(6, 8);
          var time1 = y1 + "-" + m1 + "-" + d1;
          // console.log(time);
          this.$set(item, "beginTime", time1);
          // console.log(item.time);
        }
        if (item.BEGINTIME == 0) {
          this.$set(item, "beginTime", item.BEGINTIME);
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
        this.WEAVINGLENGTH = item.BEAMLENGTH2 - item.HOLDBEAMLENGTH2;

        this.$set(item, "WEAVINGLENGTH", this.WEAVINGLENGTH);
        // 合计
        this.pnum += item.ROLLNUM;
        this.num += item.QUANTITY;
        this.weavingNum1 += item.BEAMLENGTH1;
        this.weavingNum2 += item.BEAMLENGTH2;
        this.changeorder += item.ORDERCHANGE;
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

.parcel {
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
    span {
      span {
        padding: 0 5px;
        margin: 0;
      }
      i {
        color: #3c9ad0;
        font-weight: bold;
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
