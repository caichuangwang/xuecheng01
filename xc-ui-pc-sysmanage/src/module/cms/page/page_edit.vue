<template>
  <div>
    <el-form :model="pageForm" label-width="80px" :rules="pageFormRules" ref="pageForm">
      <el-form-item label="所属站点" prop="siteId">
        <el-select v-model="pageForm.siteId" placeholder="请选择站点">
          <el-option
            v-for="item in siteList"
            :key="item.siteId"
            :label="item.siteName"
            :value="item.siteId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="选择模版" prop="templateId">
        <el-select v-model="pageForm.templateId" placeholder="请选择">
          <el-option
            v-for="item in templateList"
            :key="item.templateId"
            :label="item.templateName"
            :value="item.templateId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="页面名称" prop="pageName">
        <el-input v-model="pageForm.pageName" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="别名" prop="pageAliase">
        <el-input v-model="pageForm.pageAliase" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="访问路径" prop="pageWebPath">
        <el-input v-model="pageForm.pageWebPath" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="物理路径" prop="pagePhysicalPath">
        <el-input v-model="pageForm.pagePhysicalPath" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="pageForm.pageType">
          <el-radio class="radio" label="0">静态</el-radio>
          <el-radio class="radio" label="1">动态</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="数据Url">
        <el-input v‐model="pageForm.dataUrl" auto‐complete="off" ></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addSubmit">提交</el-button>
      <el-button type="primary" @click="go_back">返回</el-button>
    </div>
  </div>
</template>
<script>
  import * as cmsApi from "../api/cms"

  export default {
    data() {
      return {
        pageId: "",
        siteList: [],
        templateList: [],
        pageForm: {
          siteId: '',
          templateId: '',
          pageName: '',
          pageAliase: '',
          pageWebPath: '',
          pageParameter: '',
          pagePhysicalPath: '',
          pageType: '',
          pageCreateTime: new Date()
        },
        pageFormRules: {
          siteId: [
            {required: true, message: '请选择站点', trigger: 'change'}
          ],
          templateId: [
            {required: true, message: '请选择模版', trigger: 'change'}
          ],
          pageName: [
            {required: true, message: '请输入页面名称', trigger: 'blur'}
          ],
          pageWebPath: [
            {required: true, message: '请输入访问路径', trigger: 'blur'}
          ],
          pagePhysicalPath: [
            {required: true, message: '请输入物理路径', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      addSubmit: function () {
        this.$refs["pageForm"].validate((valid) => {
          if (valid) {
            //alert('submit!');
            this.$confirm('您确认提交吗?', '提示', {}).then(() => {
              cmsApi.page_edit(this.pageId, this.pageForm).then(response => {
                if (response.success) {
                  this.$message.success("修改成功!!!");
                  //自动返回
                  this.go_back();
                } else {
                  this.$message.error("修改失败!!!");
                }
              })
            });
          }
        })
      },
      go_back: function () {
        this.$router.push({
          path: "/cms/page/list",
          query: {
            page: this.$route.query.page,
            siteId: this.$route.query.siteId
          }
        });
      }
    },
    created: function () {
      //根据id查询页面
      this.pageId = this.$route.params.pageId;
      cmsApi.page_get(this.pageId).then(response => {
        console.log(response);
        if (response.success) {
          this.pageForm = response.cmsPage;
        }
      });
      //查询所有站点
      cmsApi.querySite().then(response => {
        this.siteList = response.queryResult.list;
      });

      //查询所有模板
      cmsApi.queryTemplate().then(response => {
        this.templateList = response.queryResult.list;
      });
    }
  }
</script>
<style>

</style>
