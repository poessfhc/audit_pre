<template>
  <el-dialog
    title="详细信息"
    :visible.sync="appropriationDialogVisible"
    :before-close="cancelDialog"
    @open="open"
  >
    <el-tag>{{appropriationDialogInfo.projectName}}</el-tag>
    <el-table :data="installations" border style="width: 100%" v-el-table-infinite-scroll="load">
      <el-table-column prop="installationName" label="设施名" width="180"></el-table-column>
      <el-table-column prop="price" label="单价(元/平方米)" width="180"></el-table-column>
      <el-table-column prop="installationNum" label="面积(平方米)"></el-table-column>
      <el-table-column prop="total" label="总计(元)"></el-table-column>
    </el-table>
    <el-form>
      <el-form-item label="合计(元) : ">{{appropriationDialogInfo.totalPrice}}</el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelDialog">取 消</el-button>
      <el-button type="primary" @click="success">拨 付</el-button>
    </div>
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
    appropriationDialogVisible: {
      type: Boolean,
      default: false
    },
    appropriationDialogInfo: {
      type: Object,
      default: {}
    },
    projectId: {
      type: Object,
      default: ""
    }
  },
  watch: {
    //监听 弹窗显示， 可以用来写 请求接口
    appropriationDialogVisible: function(newVal, oldVal) {
      if (newVal) {
        console.log(newVal);
      }
    }
  },
  components: {},
  name: "projectAuditDialog",
  data() {
    return {
      projectId: "",
      appropriationDialogInfo: "",
      installations: []
    };
  },
  created() {},
  mounted() {},
  methods: {
    load() {
      this.tableData = this.tableData;
    },
    open() {
      Business.queryInstallationCountById({ id: this.projectId }).then(res => {
        this.appropriationDialogInfo = {
          id: res.data.installationCountDto.id,
          projectName: res.data.installationCountDto.projectName,
          installations: res.data.installationCountDto.installations,
          totalPrice: res.data.installationCountDto.totalPrice
        };
        this.installations = this.appropriationDialogInfo.installations;
      });
    },
    //修改父组件传过来的值
    success() {

    },
    cancelDialog() {
      this.appropriationDialogInfo = {};
      this.installations = [];
      this.$emit("update:appropriationDialogVisible", false);
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