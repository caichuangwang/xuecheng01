import http from "../../../base/api/public"
import queryString from "querystring"

let sysConfig = require("@/../config/sysConfig");
let apiUrl = sysConfig.xcApiUrlPre;

//查询所有页面
export const page_list = (page, size, searchParam) => {
  //将搜索对象转换成字符串
  let query = queryString.stringify(searchParam);
  return http.requestQuickGet(apiUrl + "/cms/page/list/" + page + "/" + size + "/?" + query);
};

//新增页面
export const page_add = (params) => {
  return http.requestPost(apiUrl + "/cms/page/add", params);
};

//根据id查询页面
export const page_get = (id) => {
  return http.requestQuickGet(apiUrl + "/cms/page/findOne/" + id);
};

//修改页面
export const page_edit = (id, params) => {
  return http.requestPut(apiUrl + "/cms/page/update/" + id, params);
};

//根据id删除页面
export const page_del = id => {
  return http.requestDelete(apiUrl + "/cms/page/" + id);
};

//查询所有站点
export const querySite = () => {
  return http.requestQuickGet(apiUrl + "/cms/page/querySite");
};

//查询所有模板
export const queryTemplate = () => {
  return http.requestQuickGet(apiUrl + "/cms/page/queryTemplate");
};

//页面发布
export const page_postPage = id => {
  return http.requestPost(apiUrl + '/cms/page/postPage/' + id)
};
