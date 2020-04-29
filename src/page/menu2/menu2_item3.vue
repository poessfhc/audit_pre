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
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
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
            </template>
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">审核</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 
　　　　弹窗组件引入
　　　　dialogVisible : 表示 弹框是否显示 父组件 传 子组件的值 
　　　　dialogInfo : 表示 当前点击查看的数据 父组件 传 子组件的值
　　　　update:dialogVisible : 表示 组件 点击取消关闭确定 传过来的 是否显示弹窗 子组件 传 父组件
        -->
        <component-dialog
          :dialogVisible="dialogVisible"
          :dialogInfo="dialogInfo"
          @update:dialogVisible="dialogVisibles"
        ></component-dialog>

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
import componentDialog from "@/components/dialog/projectAuditDialog";
export default {
  inject:['reload'],
  components: {
    componentDialog
  },
  data() {
    return {
      //控制弹窗 显示
      dialogVisible: false, //点击查看按钮  这条数据详细信息
      dialogInfo: {},
      total: 0,
      currentPage: 1, //初始页
      pagesize: 10, //    每页的数据
      projectList: [],
      stageList: [
        { value: "", label: "" },
        { value: "2", label: "立项待审核" },
        { value: "4", label: "预算待审核" },
        { value: "6", label: "拨付待审核" },
        { value: "8", label: "结算待审核" }
      ],
      value: ""
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
      var stageList = {
        "": "",
        "2": "立项待审核",
        "4": "预算待审核",
        "6": "拨付待审核",
        "8": "结算待审核"
      };
      for (var i = 0; i < this.projectList.length; i++) {
        stage = this.projectList[i].stage;
        this.projectList[i].stage = stageList[stage];
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
        var stageList = {
          "": "",
          "2": "立项待审核",
          "4": "预算待审核",
          "6": "拨付待审核",
          "8": "结算待审核"
        };
        for (var i = 0; i < this.projectList.length; i++) {
          stage = this.projectList[i].stage;
          this.projectList[i].stage = stageList[stage];
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
        var stageList = {
          "": "",
          "2": "立项待审核",
          "4": "预算待审核",
          "6": "拨付待审核",
          "8": "结算待审核"
        };
        for (var i = 0; i < this.projectList.length; i++) {
          stage = this.projectList[i].stage;
          this.projectList[i].stage = stageList[stage];
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
        var stageList = {
          "": "",
          "2": "立项待审核",
          "4": "预算待审核",
          "6": "拨付待审核",
          "8": "结算待审核"
        };
        for (var i = 0; i < this.projectList.length; i++) {
          stage = this.projectList[i].stage;
          this.projectList[i].stage = stageList[stage];
        }
      });
    },
    handleEdit(index, row) {
      if (row.stage == "立项待审核") {
        var stageList = {
          "": "",
          "2": "立项待审核",
          "4": "预算待审核",
          "6": "拨付待审核",
          "8": "结算待审核"
        };
        Business.queryProjectById({ id: row.id }).then(res => {
          this.dialogInfo = {
            id: res.data.project.id,
            projectName: res.data.project.projectName,
            stage: stageList[res.data.project.stage],
            description: res.data.project.description,
            createBy: res.data.project.createBy,
            createTime: res.data.project.createTime
          };
        });
        this.dialogVisible = true;
      }
    },
    dialogVisibles(v) {
      this.dialogVisible = v;
      console.log(v);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>
<style scoped>
.select_list {
  float: left;
}
</style>