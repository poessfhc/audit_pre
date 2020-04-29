<template>
  <div class="deit">
    <div class="crumbs">
      <div class="cantainer">
        <el-table style="width: auto;" :data="logList">
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column label="用户名" prop="username" width="120"></el-table-column>
          <el-table-column label="请求方式" prop="operation" width="180"></el-table-column>
          <el-table-column label="接口方法" prop="method" width="450"></el-table-column>
          <el-table-column label="ip地址" prop="ip" width="150"></el-table-column>
          <el-table-column label="创建时间" prop="createTime" width="200"></el-table-column>
        </el-table>
        <el-pagination
          class="pagination"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >//这是显示总共有多少数据，</el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { Log } from "@/api/api.js";
export default {
  data() {
    return {
      total: 0,
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      logList: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const data = await Log.queryLogList({
        pageNum: this.currentPage,
        pageSize: this.pagesize
      });
      this.total = data.data.pageResult.totalSize;
      this.logList = data.data.pageResult.content;
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
      Log.queryLogList({
        pageNum: this.currentPage,
        pageSize: this.pagesize
      }).then(res => {
        this.total = res.data.pageResult.totalSize;
        this.logList = res.data.pageResult.content;
      });
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      Log.queryLogList({
        pageNum: this.currentPage,
        pageSize: this.pagesize
      }).then(res => {
        this.total = res.data.pageResult.totalSize;
        this.logList = res.data.pageResult.content;
      });
    },
    clickEvent: function() {
      Log.queryLogList({
        pageNum: this.currentPage,
        pageSize: this.pagesize
      }).then(res => {
        this.total = res.data.pageResult.totalSize;
        this.logList = res.data.pageResult.content;
      });
    }
  }
};
</script>
<style scoped>
.select_list {
  float: left;
}
</style>