<template>
  <div class="deit">
    <div class="crumbs">
      <div class="cantainer">
        <el-table style="width: auto;" :data="userList">
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column label="用户名" prop="username" width="120"></el-table-column>
          <el-table-column label="邮箱" prop="email" width="180"></el-table-column>
          <el-table-column label="电话号码" prop="phonenumber" width="120"></el-table-column>
          <el-table-column label="性别" prop="sex" width="150"></el-table-column>
          <el-table-column label="创建时间" prop="createTime" width="200"></el-table-column>
          <el-table-column align="center">
            <template slot="header" slot-scope="scope">
              <el-button type="primary" round @click="register">注 册</el-button>
            </template>
          </el-table-column>
        </el-table>
        <registerDialog
          :registerDialogVisible="registerDialogVisible"
          :registerDialogInfo="registerDialogInfo"
          @update:registerDialogVisible="registerDialogVisibles"
        ></registerDialog>
        <el-pagination
          class="pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { User } from "@/api/api.js";
import registerDialog from "@/components/dialog/registerDialog";
export default {
  inject: ["reload"],
  components: {
    registerDialog
  },
  data() {
    return {
      total: 0,
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      userList: [],
      registerDialogVisible: false,
      registerDialogInfo: {}
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const data = await User.queryUserList({
        pageNum: this.currentPage,
        pageSize: this.pagesize
      });
      this.total = data.data.pageResult.totalSize;
      this.userList = data.data.pageResult.content;
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
      User.queryUserList({
        pageNum: this.currentPage,
        pageSize: this.pagesize
      }).then(res => {
        this.total = res.data.pageResult.totalSize;
        this.userList = res.data.pageResult.content;
      });
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      User.queryUserList({
        pageNum: this.currentPage,
        pageSize: this.pagesize
      }).then(res => {
        this.total = res.data.pageResult.totalSize;
        this.userList = res.data.pageResult.content;
      });
    },
    clickEvent: function() {
      User.queryUserList({
        pageNum: this.currentPage,
        pageSize: this.pagesize
      }).then(res => {
        this.total = res.data.pageResult.totalSize;
        this.userList = res.data.pageResult.content;
      });
    },
    registerDialogVisibles(v) {
      this.registerDialogVisible = v;
    },
    register() {
      this.registerDialogVisible = true;
    }
  }
};
</script>
<style scoped>
.select_list {
  float: left;
}
</style>