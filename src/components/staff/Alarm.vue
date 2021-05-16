//工作人员接报界面
<template>
  <div>
    <!-- 面包屑导航区 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">工作人员界面</a></el-breadcrumb-item>
      <el-breadcrumb-item>接报管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 布局 -->
    <el-card class="box-card">
      <!-- 栅格布局 -->
      <el-row :gutter="20">
        <el-col :span="6">
          <div>
            <el-button type="success" round @click="addDialogVisible = true">新增</el-button>
            <!-- <el-button round @click="showEditDialog()">修改</el-button> -->
          </div>
        </el-col>

        <el-col :span="6">
          <div>
            <el-button type="success" round @click="addTrafficVisible = true">新增交通情况</el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-button round @click="toggleSelection()">刷新</el-button>
          </div>
        </el-col>
        <el-col :span="6">
          <div>
            <el-tooltip class="item" effect="dark" content="根据城市名称模糊查询" placement="top">
              <el-input placeholder="请输入城市名称" v-model="tableDataName">
                <el-button slot="append" icon="el-icon-search" @click="doFilter"></el-button>
              </el-input>
            </el-tooltip>
          </div>
          <el-col> </el-col>
        </el-col>
        <el-col :span="6">
          <div>
            <!-- <el-button type="danger" round>删除</el-button> -->
          </div>
        </el-col>
      </el-row>
      <!-- 信息列表区域 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" width="180"><template slot-scope="scope"> {{scope.$index + 1 }} </template>
        </el-table-column>
        <el-table-column prop="name" label="创建人" width="180"></el-table-column>
        <el-table-column prop="nameOfAccident" label="事件名称"></el-table-column>
        <el-table-column prop="peopleCallPolice" label="报警人"></el-table-column>
        <el-table-column prop="pCPMember" label="报警电话"></el-table-column>
        <el-table-column prop="state" label="流程状态"></el-table-column>
        <el-table-column prop="birthday" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" @click="editUser(scope.row,scope.$index)" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" @click="delUser(scope.$index)" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 新增接报信息模态框 -->
      <el-dialog title="编辑用户信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <div>
          <el-form ref="form" :model="editObj" label-width="80px">
            <el-form-item label="创建人">
              <el-input v-model="editObj.name"></el-input>
            </el-form-item>
            <el-form-item label="事件名称">
              <el-input v-model="editObj.nameOfAccident"></el-input>
            </el-form-item>
            <el-form-item label="报警人">
              <el-input v-model="editObj.peopleCallPolice"></el-input>
            </el-form-item>
            <el-form-item label="报警电话">
              <el-input v-model="editObj.pCPMember"></el-input>
            </el-form-item>
            <el-form-item label="流程状态">
              <el-input v-model="editObj.state"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        userInfo: {
          name: '',
          nameOfAccident: '',
          peopleCallPolice: '',
          pCPMember: '',
          state: '',
        },
        tableData: [{
          name: '小明',
          nameOfAccident: '火灾',
          peopleCallPolice: '安女士',
          pCPMember: '13540213667',
          state: '处理中',
        }, {
          name: '小红',
          nameOfAccident: '地震',
          peopleCallPolice: '何先生',
          pCPMember: '12412578641',
          state: '已完成',
        }, {
          name: '小智',
          nameOfAccident: '台风',
          peopleCallPolice: '金女士',
          pCPMember: '12845235982',
          state: '专家处理中',
        }],
        dialogVisible: false,
        editObj: {
          name: '',
          nameOfAccident: '',
          peopleCallPolice: '',
          pCPMember: '',
          state: '处理中',
        },
        userIndex: 0,
      };
    },
    methods: {
      doFilter() {
        if (this.tableDataName == "") {
          this.$message.warning("查询条件不能为空！");
          return;
        }
        this.tableDataEnd = [];
        //每次手动将数据置空,因为会出现多次点击搜索情况
        this.filterTableDataEnd = [];
        this.tableDataBegin.forEach((value, index) => {
          if (value.name) {
            if (value.name.indexOf(this.tableDataName) >= 0) {
              this.filterTableDataEnd.push(value);
            }
          }
        });

        //页面数据改变重新统计数据数量和当前页
        this.currentPage = 1;
        this.totalItems = this.filterTableDataEnd.length;
        //渲染表格,根据值
        this.currentChangePage(this.filterTableDataEnd);
        //页面初始化数据需要判断是否检索过
        this.flag = true;
        this.tableDataName = "";
      },

      //监听pagesize改变的事件
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.pageSize = val;
        this.handleCurrentChange(this.currentPage);
      },
      //监听页码值改变的事件
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage = val;
        //需要判断是否检索
        this.currentChangePage(this.tableDataBegin);
        // if (!this.flag) {
        //tableDataBegin不能写成tableDataEnd，不然在没有进行搜索功能的时候，不能进行分页操作，数据丢失
        this.currentChangePage(this.tableDataBegin);
        // } else {
        //   this.currentChangePage(this.filterTableDataEnd);
        // }
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
      },
      //取消搜索
      toggleSelection() {
        //直接重新加载界面，但是这样会出现一个问题：原先添加的元素消失了
        // this.reload()
        this.totalItems = this.tableDataBegin.length;
        if (this.totalItems > this.pageSize) {
          this.tableDataEnd = [];
          for (let index = 0; index < this.pageSize; index++) {
            this.tableDataEnd.push(this.tableDataBegin[index]);
          }
        } else {
          this.tableDataEnd = this.tableDataBegin;
        }
      },

      //添加
      addUser() {
        if (!this.userInfo.name) {
          this.$message({
            message: '请输入创建人！',

          });
          return;
        }
        if (!this.userInfo.nameOfAccident) {
          this.$message({
            message: '请输入事件！',
            type: 'warning'
          });
          return;
        }
        if (!this.userInfo.peopleCallPolice) {
          this.$message({
            message: '请输入报警人！',
            type: 'warning'
          });
          return;
        }
        if (!this.userInfo.pCPMember) {
          this.$message({
            message: '请输入报警人电话！',
            type: 'warning'
          });
          return;
        }
        if (!this.userInfo.state) {
          this.$message({
            message: '请输入接报状态！',
            type: 'warning'
          });
          return;
        }
        this.tableData.push(this.userInfo);
        this.userInfo = {
          name: '',
          nameOfAccident: '',
          peopleCallPolice: '',
          pCPMember: '',
          state: '',
        };
      },

      //删除
      delUser(idx) {
        this.$confirm('确认删除此条接报？')
          .then(_ => {
            this.tableData.splice(idx, 1);
          })
          .catch(_ => {});
      },
      //编辑
      editUser(item, idx) {
        this.userIndex = idx;
        this.editObj = {
          name: item.name,
          nameOfAccident: item.nameOfAccident,
          peopleCallPolice: item.peopleCallPolice,
          pCPMember: item.pCPMember,
          state: item.state,
        };
        this.dialogVisible = true;
      },

      //查询
      inquire() {

      },

      handleClose() {
        this.dialogVisible = false;
      },

      confirm() {
        this.dialogVisible = false;
        Vue.set(this.tableData, this.userIndex, this.editObj);
      }
    },
  }
</script>

<style scoped>


</style>