import axios from 'axios'

let baseURL = "";
if (process.env.NODE_ENV === 'development') { // 开发环境
  baseURL = "http://192.168.1.24:9996/api/"
  // baseURL = "http://192.168.1.34:9996/api/"
  // baseURL = "http://198.198.198.212:9996/api/"
} else { // 编译环境
  if (process.env.type === 'test') { // 测试环境
    baseURL = "http://192.168.1.24:9996/api/" // 在这里使用配置文件中的域名
    // baseURL = "http://198.198.198.212:9996/api/" // 在这里使用配置文件中的域名
  } else { // 正式环境
    baseURL = "http://192.168.1.24:9996/api/" // 在这里使用配置文件中的域名
    // baseURL = "http://198.198.198.212:9996/api/" // 在这里使用配置文件中的域名
  }
}

let instance = axios.create({
  baseURL: baseURL,
  headers: {
    //'Content-type':'application/x-www-form-urlencoded'
  },
})

const api = {
  //登录
  login: params => {
    return instance.post('user/login', params)
  },
  GetEquipmentList: params => {
    return instance.post('BaseDataGet/GetEquipmentList', params)
  },
  GetUserList: params => {
    return instance.post('BaseDataGet/GetUserList', params)
  },
  // 生产计划
  // 获取织机类型
  GetLoomList: params => {
    return instance.post('BaseDataGet/GetLoomList', params)
  },
  // 查看主计划数据
  getplandata: params => {
    return instance.post('planmanagement/getplandata', params)
  },
  // 制定整经计划保存数据
  saveplan: params => {
    return instance.post('planmanagement/saveplan', params)
  },
  // 生产订单
  // 生产订单-获取数据
  getproductdata: params => {
    return instance.post('planmanagement/getproductdata', params)
  },
  // 生产订单-提交保存数据
  updateproductdata: params => {
    return instance.post('planmanagement/updateproductdata', params)
  },
  // 生产订单-计算原料
  plancreatmaterial: params => {
    return instance.post('planmanagement/plancreatmaterial', params)
  },
  // 原料需求-获取数据
  GetSpMaterialOrderList: params => {
    return instance.post('SupplierPlatform/GetSpMaterialOrderList', params)
  },
  // 原料需求-更新供应单中库存利用和备注信息
  UpdateSpMaterialOrder: params => {
    return instance.post('SupplierPlatform/UpdateSpMaterialOrder', params)
  },
  // 原料需求-计划计算原料供应单
  CalcSpMaterialOrder: params => {
    return instance.post('SupplierPlatform/CalcSpMaterialOrder', params)
  },
  // 原料需求-调用无单
  UseWD: params => {
    return instance.post('SupplierPlatform/UseWD', params)
  },


  // 成品入库
  // 库位号
  getstorageinfo: params => {
    return instance.post('inventorymanagement/getstorageinfo', params)
  },
  // 流水号
  getproductstockindata: params => {
    return instance.post('inventorymanagement/getproductstockindata', params)
  },
  // 提交
  addstkproductstockin: params => {
    return instance.post('inventorymanagement/addstkproductstockin', params)
  },
  // 成品出库
  // 查询
  getproductstockoutdata: params => {
    return instance.post('inventorymanagement/getproductstockoutdata', params)
  },
  // 提交
  addstkproductstockout: params => {
    return instance.post('inventorymanagement/addstkproductstockout', params)
  },
  // 原料库
  // 整经领料出库--获取数据
  getwarpdata: params => {
    return instance.post('materialmanagement/getwarpdata', params)
  },
  // 整经领料出库--详情
  getmaterialdata: params => {
    return instance.post('materialmanagement/getmaterialdata', params)
  },
  // 织造领料出库--获取数据
  getweavdata: params => {
    return instance.post('materialmanagement/getweavdata', params)
  },



  // 成品检验报表
  getcheckstatistics: params => {
    return instance.post('qccheckfinishproduct/getcheckstatistics', params)
  },
  // 



};
export {
  api
}