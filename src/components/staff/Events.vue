<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>工作人员界面</el-breadcrumb-item>
      <el-breadcrumb-item>事件维护</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <!-- 搜索与添加区 -->

      <!-- 栅格布局 -->
      <el-row :gutter="20">
        <el-col :span="6"><div >
            <el-button>
            添加
          </el-button>
          </div></el-col>
        <el-col :span="6"><div ></div></el-col>
        <el-col :span="6"><div ></div></el-col>
        <el-col :span="6"><div >
            <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
               </el-input>
            </div></el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped></style>
