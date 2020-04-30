<template>
  <el-dialog title="设施界面" :visible.sync="dialogVisible" :before-close="cancelDialog">
    <el-button type="text" @click="query()">选择设施</el-button>
    <el-table v-el-table-infinite-scroll="load" :data="checkedNames">
      <el-table-column property="installationName" label="产品名称" width="150"></el-table-column>
      <el-table-column property="price" label="单价(元/平方米)" width="200"></el-table-column>
      <el-table-column property="installationNum" label="面积(平方米 )" width="200">
        <template slot-scope="scope">
          <el-input
            v-model="scope.row.installationNum"
            οninput="value=value.replace(/[^\d]/g,'')"
            maxlength="9"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelDialog">取 消</el-button>
      <el-button type="primary" @click="success">通 过</el-button>
    </div>
    <el-dialog title="选择设施" :visible.sync="flag" width="32%">
      <el-table border height="400px" v-el-table-infinite-scroll="load" :data="list">
        <el-table-column property="installationName" label="产品名称" width="150"></el-table-column>
        <el-table-column property="price" label="单价" width="200"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="select(scope.$index, scope.row)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </el-dialog>
</template>

<script>
import { Business } from "@/api/api.js";
import elTableInfiniteScroll from "el-table-infinite-scroll";
export default {
  directives: {
    "el-table-infinite-scroll": elTableInfiniteScroll
  },
  //父组件 传 过来的 值
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    },
    dialogInfo: {
      type: Object,
      default: {}
    }
  },
  watch: {
    //监听 弹窗显示， 可以用来写 请求接口
    dialogVisible: function(newVal, oldVal) {
      if (newVal) {
        console.log(newVal);
      }
    }
  },
  components: {},
  name: "projectBudgetDialog",
  data() {
    return {
      flag: false,
      dialogTableVisible: true,
      dialogInfo: "",
      list: [],
      checkedNames: [],
      total: 0,
      currentPage: 1, //初始页
      pagesize: 100 //    每页的数据
    };
  },
  created() {},
  mounted() {},
  methods: {
    load() {
      this.tableData = this.tableData;
    },
    query: function() {
      Business.queryInstallationList({
        pageNum: this.currentPage,
        pageSize: this.pagesize
      }).then(res => {
        this.total = res.data.pageResult.totalSize;
        this.list = res.data.pageResult.content;
      });
      this.flag = true;
    },
    //修改父组件传过来的值
    cancelDialog() {
      this.$emit("update:dialogVisible", false);
    },
    select(index, row) {
      this.checkedNames.push(row);
    },
    handleDelete(index, row) {
      this.checkedNames.splice(index, 1);
    },
    success() {
      const data = this.checkedNames;
      const projectId = this.dialogInfo.id;
      for (var i = 0; i < data.length; i++) {
        data[i]["projectId"] = projectId
      }
      Business.insertInstallation(data);
      this.$emit("update:dialogVisible", false);
      this.$parent.reload();
    }
  }
};
</script>
<style lang='scss' scoped>
.form {
  background: rgb(255, 255, 255);
  padding: 0 10px;
}
.dialog-footer {
  text-align: center;
}
</style>