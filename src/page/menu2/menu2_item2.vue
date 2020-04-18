<template>
  <div class="deit">
    <div class="crumbs">
      <el-select
        class="select_list"
        v-model="value"
        filterable
        placeholder="请选择"
        @change="clickEvent()"
      >
        <el-option
          v-for="item in stageList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <div class="cantainer">
        <el-table style="width: auto;" :data="projectList">
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column label="系统名字" prop="projectName" width="120"></el-table-column>
          <el-table-column label="创建时间" prop="createTime" width="180"></el-table-column>
          <el-table-column label="创建人" prop="createBy" width="120"></el-table-column>
          <el-table-column label="工程实施用户" prop="username" width="150"></el-table-column>
          <el-table-column label="工程描述" prop="description" width="200"></el-table-column>
          <el-table-column label="工程阶段" prop="stage" width="200"></el-table-column>
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
import { Business } from "@/api/api.js";
export default {
  data() {
    return {
      total: 0,
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      projectList: [],
      stageList: [
        { value: "", label: "" },
        { value: "1", label: "立项" },
        { value: "2", label: "立项审核中" },
        { value: "3", label: "预算" },
        { value: "4", label: "预算审核中" },
        { value: "5", label: "拨付" },
        { value: "6", label: "拨付审核中" },
        { value: "7", label: "结算" },
        { value: "8", label: "结算审核中" },
        { value: "9", label: "实施中" },
        { value: "10", label: "实施结束" }
      ],
      value: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const data = await Business.projectList({
        pageNum: this.currentPage,
        pageSize: this.pagesize,
        stage: this.value
      });
      this.total = data.data.pageResult.totalSize;
      this.projectList = data.data.pageResult.content;
      var stage;
      for (var i = 0; i < this.projectList.length; i++) {
        stage = this.projectList[i].stage;
        this.projectList[i].stage = this.stageList[stage - 1].label;
      }
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
      Business.projectList({
        pageNum: this.currentPage,
        pageSize: this.pagesize,
        stage: this.value
      }).then(res => {
        this.total = res.data.pageResult.totalSize;
        this.projectList = res.data.pageResult.content;
        var stage;
        for (var i = 0; i < this.projectList.length; i++) {
          stage = this.projectList[i].stage;
          this.projectList[i].stage = this.stageList[stage - 1].label;
        }
      });
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      Business.projectList({
        pageNum: this.currentPage,
        pageSize: this.pagesize,
        stage: this.value
      }).then(res => {
        this.total = res.data.pageResult.totalSize;
        this.projectList = res.data.pageResult.content;
        var stage;
        for (var i = 0; i < this.projectList.length; i++) {
          stage = this.projectList[i].stage;
          this.projectList[i].stage = this.stageList[stage - 1].label;
        }
      });
    },
    clickEvent: function() {
      Business.projectList({
        pageNum: this.currentPage,
        pageSize: this.pagesize,
        stage: this.value
      }).then(res => {
        this.total = res.data.pageResult.totalSize;
        this.projectList = res.data.pageResult.content;
        var stage;
        for (var i = 0; i < this.projectList.length; i++) {
          stage = this.projectList[i].stage;
          this.projectList[i].stage = this.stageList[stage - 1].label;
        }
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