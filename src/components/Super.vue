<template>
  <el-container class="home-container">
    <!--头部区域-->
    <el-header>
      <div>
        <img src="../assets/logo.png" height="50px" width="50px" alt="" />
        <span>环保应急系统</span>
      </div>
      <el-button type="info" @click="logout">退出</el-button>
    </el-header>
    <!--页面主体区域-->
    <el-container>
      <!--侧边栏-->
      <el-aside :width="isCollapse ? '64px' : '200px' ">
        <div class="toggle-button" @click="toggleCollapse">| | |</div>
        <!-- 侧边栏菜单区 -->
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#409EFF"
          :collapse = "isCollapse"
          :collapse-transition="true"
          :router="true"
        >
        <!-- 一级菜单 -->
          <el-submenu index="1">
            <!-- 一级菜单模板区 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-info"></i>
              <!-- 文本 -->
              <span>超级用户界面</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item index="0-1">
              <template slot="title">
              <!-- 图标 -->
              <i class="el-icon-document"></i>
              <!-- 文本 -->
              <span>人员信息维护</span>
            </template>
            </el-menu-item>
            
          </el-submenu>
          
        </el-menu>
      </el-aside>
      <!--右侧内容主体-->
      <el-main>
        <!-- 路由占位符 -->
        <router-view>

        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      //是否折叠
      isCollapse: false
    }
  },
  methods: {
    logout() {
      window.sessionStorage.clear();
      this.$router.push("/login");
    },

    //点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  > div {
    display: flex;
    align-items: center;
    span {
      margin-left: 15px;
    }
  }
}
.el-aside {
  background-color: #333744;
}
.el-main {
  background: white;
  min-height: 80vh;
  width: 60%;
  background: linear-gradient(to right bottom,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.3));
  z-index: 2;
  backdrop-filter: blur(2rem);
  display: flex;
}

.toggle-button {
  background-color: #4A5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;

}
</style>
