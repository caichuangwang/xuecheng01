<template>

  <div>
    <!--搜索表单-->
    <el-form :model="searchParam">
      <el-select v-model="searchParam.siteId" placeholder="请选择站点">
        <el-option
          v-for="item in siteList"
          :key="item.siteId"
          :label="item.siteName"
          :value="item.siteId">
        </el-option>
      </el-select>
      页面别名：
      <el-input v-model="searchParam.pageAliase" style="width: 100px"></el-input>
      <el-button type="primary" size="small" v-on:click="query">查询</el-button>
      <!--传递路由参数-->
      <router-link :to="{path:'/cms/page/add', query:{
        page:this.params.page,
        siteId:this.searchParam.siteId}}">
        <el-button type="primary" size="small">新增页面</el-button>
      </router-link>
    </el-form>
    <el-table
      :data="list"
      stripe
      style="width: 100%">
      <el-table-column
        type="index"
        width="60">
      </el-table-column>
      <el-table-column
        prop="pageName"
        label="页面名称" width="160">
      </el-table-column>
      <el-table-column
        prop="pageAliase"
        label="别名"
        width="120">
      </el-table-column>
      <el-table-column
        prop="pageWebPath"
        label="访问路径"
        width="250">
      </el-table-column>
      <el-table-column
        prop="pagePhysicalPath"
        label="物理路径"
        width="290">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="page">
          <el-button
            size="small" type="text"
            @click="edit(page.row.pageId)">编辑
          </el-button>
          <el-button
            size="small" type="text"
            @click="del(page.row.pageId)">删除
          </el-button>
          <el-button
            size="small" type="text"
            @click="preview(page.row.pageId)">页面预览
          </el-button>
          <el-button
            size="small" type="text"
            @click="publish(page.row.pageId)">发布
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页组件-->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :current-page="params.page"
      :page-size="params.size"
      @current-change="changePage"
      style="float: right">
    </el-pagination>
  </div>
</template>
<script>
  /*编写页面静态部分，即model及vm部分。*/
  import * as cmsApi from "../api/cms"

  export default {
    data() {
      return {
        list: [],
        siteList: [],
        total: 50,
        params: {
          page: 1,
          size: 10,
        },
        searchParam: {
          siteId: "",
          siteName: "",
          pageAliase: ""
        }
      }
    },
    methods: {
      //分页，条件查询所有页面
      query: function () {
        //alert(this.params.page);
        cmsApi.page_list(this.params.page, this.params.size, this.searchParam).then((response) => {
          console.log(response);
          this.list = response.queryResult.list;
          this.total = response.queryResult.total;
        })
      },

      //根据id删除页面
      del: function (pageId) {
        this.$confirm('您确认删除吗?', '提示', {}).then(() => {
          cmsApi.page_del(pageId).then(response => {
            if (response.success) {
              this.$message.success("删除成功!!!");
              //重新查询所有页面
              this.query();
            } else {
              this.$message.error("删除失败!!!");
            }
          });
        })
      },

      //页面预览
      preview: function (pageId) {
        window.open("http://www.xuecheng.com/cms/preview/" + pageId);
      },

      //页面发布
      publish: function (pageId) {
        this.$confirm('确认发布该页面吗?', '提示', {}).then(() => {
          cmsApi.page_postPage(pageId).then((res) => {
            if(res.success){
              console.log('发布页面id='+pageId);
              this.$message.success('发布成功，请稍后查看结果');
            }else{
              this.$message.error('发布失败');
            }
          });
        }).catch(() => {
        });
      },

      //查询所有站点
      querySite: function () {
        cmsApi.querySite().then((response) => {
          console.log(response);
          this.siteList = response.queryResult.list;
          //放开此行页码返回功能失效，会再次查询第一页
          //this.total = response.queryResult.total;
        })
      },

      //页码改变，重新加载页面
      changePage: function (page) {
        this.params.page = page;
        this.query();
      },

      //修改页面
      edit: function (pageId) {
        this.$router.push({
          path: "/cms/page/edit/" + pageId,
          query: {
            page: this.params.page,
            siteId: this.searchParam.siteId
          }
        })
      }
    },
    created() {
      //获取路由中的参数
      this.params.page = Number.parseInt(this.$route.query.page || 1);
      //alert(this.params.page)
      this.searchParam.siteId = this.$route.query.siteId || "";
    },
    mounted() {
      this.query();
      this.querySite();
      /*this.siteList = [
        {
          siteId:'5a751fab6abb5044e0d19ea1',
          siteName:'门户主站'
        },
        {
          siteId:'102',
          siteName:'测试站'
        }
      ]*/
    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>
