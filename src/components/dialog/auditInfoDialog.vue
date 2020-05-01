<template>
  <el-dialog title="审核记录" :visible.sync="auditDialogVisible" :before-close="cancelDialog" @open="open">
    <el-form class="form"></el-form>
    <el-table :data="auditInfo" stripe style="width: 100%">
      <el-table-column prop="auditName" label="审核类型" width="180"></el-table-column>
      <el-table-column prop="auditResult" label="审核结果" width="180"></el-table-column>
      <el-table-column prop="auditTime" label="审核时间" width="180"></el-table-column>
      <el-table-column prop="auditUser" label="审核人" width="180"></el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
import { Business } from "@/api/api.js";
export default {
  //父组件 传 过来的 值
  props: {
    auditDialogVisible: {
      type: Boolean,
      default: false
    },
    auditDialogInfo: {
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
    auditDialogVisible: function(newVal, oldVal) {
      if (newVal) {
        console.log(newVal);
      }
    }
  },
  components: {},
  name: "projectAuditDialog",
  data() {
    return {
      auditDialogInfo: "",
      auditInfo: []
    };
  },
  created() {},
  mounted() {},
  methods: {
    cancelDialog() {
      this.$emit("update:auditDialogVisible", false);
    },
    open(){
      Business.queryProjectAuditByProjectId({projectId: this.projectId}).then(res=>{
        const info = res.data.auditInfo
        const flag = ["不通过","通过"]
        for(var i = 0;i<info.length;i++){
          info[i].auditResult = flag[info[i].auditResult]
        }
        this.auditInfo = info
      })
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