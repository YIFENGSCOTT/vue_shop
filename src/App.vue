<template>
  <div id="app">
    <!--路由占位符-->
    <router-view>

    </router-view>
  </div>
</template>

<script>


export default {
  name: 'app'
}
</script>

<style>
/**全局样式表 */

html,
body,
#app{
  height: 100%;
  margin: 0;
  padding: 0;

}

/**面包屑的格式 */
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 12px;
}

/**卡片的格式 */
.el-card {
  /* box-shadow: 0 1px 1px rgba(115, 171, 194, 0.15)!important; */
}
.el-table {
  margin-top: 15px;
  font-size: 12px;
}
/* #app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
