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
  font-family: "Poppins", sans-serif;
  background: linear-gradient(to right top, #65df9e, #b5c3ee);
}

/**面包屑的格式 */
.el-breadcrumb {
  margin-bottom: 15px;
  font-size: 12px;
}

/**卡片的格式 */
.el-card {
  /* box-shadow: 0 1px 1px rgba(115, 171, 194, 0.15)!important; */
  background: white;
  background: linear-gradient(to right bottom,
      rgba(255, 255, 255, 0.7),
      rgba(255, 255, 255, 0.3));
  
}
.el-table {
  margin-top: 15px;
  font-size: 12px;
}

/**解决了单击新增按钮时，屏幕有一瞬间变暗的bug */
.v-modal {
  display: none;
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
