<template>
  <div class="deit">
    <div class="crumbs">
      <div class="cantainer">
        <el-table
          :data="projectList.filter(data => !search || data.name.toLowerCase().includes(search.toLowerCase()))"
          style="width: 100%"
        >
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column label="系统名字" prop="projectName" width="120"></el-table-column>
          <el-table-column label="创建时间" prop="createTime" width="180"></el-table-column>
          <el-table-column label="创建人" prop="createBy" width="120"></el-table-column>
          <el-table-column label="工程实施用户" prop="username" width="150"></el-table-column>
          <el-table-column label="工程阶段" prop="stage" width="200"></el-table-column>
          <el-table-column align="left">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">进度跟踪</el-button>
            </template>
          </el-table-column>
        </el-table>
        <trackDialog
          :trackDialogVisible="trackDialogVisible"
          :trackDialogInfo="trackDialogInfo"
          :projectId="projectId"
          @update:trackDialogVisible="trackDialogVisibles"
        ></trackDialog>
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
import trackDialog from "@/components/dialog/trackDialog";
export default {
  inject: ["reload"],
  components: {
    trackDialog
  },
  data() {
    return {
      //控制弹窗 显示
      trackDialogVisible: false, //点击查看按钮  这条数据详细信息
      trackDialogInfo: {},
      total: 0,
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      projectList: [],
      stageList: ["实施中"],
      value: "9",
      projectId: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const data = await Business.auditProjectList({
        pageNum: this.currentPage,
        pageSize: this.pagesize,
        stage: this.value
      });
      this.total = data.data.pageResult.totalSize;
      this.projectList = data.data.pageResult.content;
      var stage;
      for (var i = 0; i < this.projectList.length; i++) {
        stage = this.projectList[i].stage;
        this.projectList[i].stage = this.stageList[0];
      }
    },
    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function(size) {
      this.pagesize = size;
      Business.auditProjectList({
        pageNum: this.currentPage,
        pageSize: this.pagesize,
        stage: this.value
      }).then(res => {
        this.total = res.data.pageResult.totalSize;
        this.projectList = res.data.pageResult.content;
        var stage;
        for (var i = 0; i < this.projectList.length; i++) {
          stage = this.projectList[i].stage;
          this.projectList[i].stage = this.stageList[0];
        }
      });
    },
    handleCurrentChange: function(currentPage) {
      this.currentPage = currentPage;
      Business.auditProjectList({
        pageNum: this.currentPage,
        pageSize: this.pagesize,
        stage: this.value
      }).then(res => {
        this.total = res.data.pageResult.totalSize;
        this.projectList = res.data.pageResult.content;
        var stage;
        for (var i = 0; i < this.projectList.length; i++) {
          stage = this.projectList[i].stage;
          this.projectList[i].stage = this.stageList[0];
        }
      });
    },
    clickEvent: function() {
      Business.auditProjectList({
        pageNum: this.currentPage,
        pageSize: this.pagesize,
        stage: this.value
      }).then(res => {
        this.total = res.data.pageResult.totalSize;
        this.projectList = res.data.pageResult.content;
        var stage;
        for (var i = 0; i < this.projectList.length; i++) {
          stage = this.projectList[i].stage;
          this.projectList[i].stage = this.stageList[0];
        }
      });
    },
    handleEdit(index, row) {
      this.projectId = row.id;
      this.trackDialogVisible = true;
      this.trackDialogInfo = row
    },
    trackDialogVisibles(v) {
      this.trackDialogVisible = v;
    }
  }
};
</script>
<style scoped>
.select_list {
  float: left;
}
</style>