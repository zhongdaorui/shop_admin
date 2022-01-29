<template>
  <div class="container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>活动列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-row :gutter="20">
          <el-col :span="6">
            <el-input placeholder="请输入内容" v-model="input" clearable>
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-col>
          <el-col :span="6">
            <el-button type="primary">主要按钮</el-button>
          </el-col>
        </el-row>
        <div class="text item">

        </div>
      </div>  
    </el-card>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        //输入框的值
        input: "",
      };
    },
  };
</script>

<style lang="stylus" scoped>
  .container>>>.el-breadcrumb {
    font-size: 12px;
  }

  .container>>>.el-card {
    margin-top: 20px;
    box-shadow: 0 0 2px #ccc;
  }
</style>