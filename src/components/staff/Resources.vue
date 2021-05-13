<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>工作人员界面</el-breadcrumb-item>
      <el-breadcrumb-item>物资维护</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区 -->
    <el-card class="box-card">
      <!-- 搜索与添加区 -->

      <!-- 栅格布局 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <div>
            <el-button type="success" round>新增</el-button>
            <el-button round>修改</el-button>
          </div></el-col
        >
        <el-col :span="6"><div></div></el-col>
        <el-col :span="6"
          ><div>
            <el-tooltip
              class="item"
              effect="dark"
              content="根据ID查询"
              placement="top"
            >
              <el-input placeholder="请输入内容"
              v-model="tableData.id">
                <el-button slot="append" icon="el-icon-search" @click="doFilter"></el-button>
              </el-input>
            </el-tooltip></div
        ></el-col>
        <el-col :span="6"
          ><div>
            <el-button type="danger" round>删除</el-button>
          </div></el-col
        >
      </el-row>

      <!-- 物资列表区域 -->
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :default-sort="{ prop: 'id' }"
      >
        <el-table-column type="selection" width="55"> </el-table-column>
        <!-- <el-table-column prop="id" label="ID" width="120" sortable>
        </el-table-column> -->
        <el-table-column
          prop="id"
          type="index"
          label="ID"
          sortable=""
          width="80"
        ></el-table-column>
        <el-table-column prop="name" label="物资名称" width="120">
        </el-table-column>
        <el-table-column prop="num" label="物资数量" width="100">
        </el-table-column>
        <el-table-column prop="type" label="物资类型" width="120">
        </el-table-column>
        <el-table-column prop="person" label="物资清点人" width="120">
        </el-table-column>
        <el-table-column prop="phone" label="物资清点人电话" width="120">
        </el-table-column>
        <el-table-column prop="seq" label="物资编号" width="120">
        </el-table-column>
        <el-table-column prop="date" label="物资清点时间" width="120">
        </el-table-column>
      </el-table>
      

      <!-- 分页区域 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[3, 5, 10, 20]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="5"
      >
      </el-pagination>
      <div style="margin-top: 20px">
        <!-- <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button> -->
        <el-button round @click="toggleSelection()">取消选择</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
        search: '',
      tableData: [
        {
          id: "1",
          name: "电热毯",
          num: "360",
          type: "生活用品",
          person: "桃桃",
          phone: "9011910826",
          seq: "16",
          date: "2021-05-03",
        },
        {
            id: "2",
          name: "方便面",
          num: "1700",
          type: "食物/饮料",
          person: "苹苹",
          phone: "9039847561",
          seq: "3",
          date: "2021-1-17",
        },
        {
            id: "3",
          name: "饮用水",
          num: "1500",
          type: "食物/饮料",
          person: "苹苹",
          phone: "9039847561",
          seq: "4",
          date: "2020-05-17",
        },
        {
            id: "4",
          name: "棉被",
          num: "600",
          type: "生活用品",
          person: "苹苹",
          phone: "9039847561",
          seq: "16",
          date: "2021-05-03",
        },
        {
            id: "5",
          name: "应急帐篷",
          num: "25",
          type: "生活用品",
          person: "桃桃",
          phone: "9011910826",
          seq: "19",
          date: "2021-05-03",
        },
      ],
      multipleSelection: [],
    };
  },
  //生命周期函数
  created() {
      
  },

  //当前页面的一些事件处理函数
  methods: {
    //前端搜索功能需要区分是否检索,因为对应的字段的索引不同
 //用两个变量接收currentChangePage函数的参数
 doFilter() {
  if (this.id == "") {
  this.$message.warning("查询条件不能为空！");
  return;
  }
  
  //每次手动将数据置空,因为会出现多次点击搜索情况
  this.filterTableDataEnd=[]
  this.tableData.forEach((value, index) => {
  if(value.id){
   if(value.id.indexOf(this.id)>=0){
   this.filterTableDataEnd.push(value)
   }
  }
  this.tableData = []
  });
  //页面数据改变重新统计数据数量和当前页
  this.currentPage=1
  this.totalItems=this.filterTableDataEnd.length
  //渲染表格,根据值
  this.currentChangePage(this.filterTableDataEnd)
  //页面初始化数据需要判断是否检索过
  this.flag=true
 },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.handleCurrentChange(this.currentPage);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        //需要判断是否检索
        if(!this.flag){
        //tableDataBegin不能写成tableDataEnd，不然在没有进行搜索功能的时候，不能进行分页操作，数据丢失
          this.currentChangePage(this.tableDataBegin)
        }else{
          this.currentChangePage(this.filterTableDataEnd)
        }
      }, //组件自带监控当前页码
      currentChangePage(list) {
        let from = (this.currentPage - 1) * this.pageSize;
        let to = this.currentPage * this.pageSize;
        this.tableDataEnd = [];
        for (; from < to; from++) {
          if (list[from]) {
            this.tableDataEnd.push(list[from]);
          }
        }
      }
  },
};
</script>

<style lang="less" scoped></style>
