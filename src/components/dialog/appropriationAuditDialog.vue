<template>
  <el-dialog
    custom-class="customerDialog"
    title="详细信息"
    :visible.sync="appropriationAuditDialogVisible"
    :before-close="cancelDialog"
    @open="open"
  >
    <el-form class="form">
      <el-form-item label="工程名">{{appropriationAuditDialogInfo.projectName}}</el-form-item>
      <el-form-item label="工程描述">{{projectInfo.description}}</el-form-item>
      <el-form-item label="预算金额(元)">{{projectInfo.budget}}</el-form-item>
      <el-form-item label="实际金额(元)">{{projectInfo.actual}}</el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="refuse">拒 绝</el-button>
      <el-button type="primary" @click="success">通 过</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { Business } from "@/api/api.js";
export default {
  //父组件 传 过来的 值
  props: {
    appropriationAuditDialogVisible: {
      type: Boolean,
      default: false
    },
    appropriationAuditDialogInfo: {
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
    appropriationAuditDialogVisible: function(newVal, oldVal) {
      if (newVal) {
        console.log(newVal);
      }
    }
  },
  components: {},
  name: "projectAuditDialog",
  data() {
    return {
      appropriationAuditDialogInfo: "",
      projectInfo: {
        budget: "",
        actual: "",
        description: ""
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    //修改父组件传过来的值
    success() {
      Business.changeProjectStageById({
        id: this.appropriationAuditDialogInfo.id
      });
      this.$emit("update:appropriationAuditDialogVisible", false);
      this.$parent.reload();
    },
    refuse() {
      Business.downStage({ id: this.appropriationAuditDialogInfo.id });
      this.$emit("update:appropriationAuditDialogVisible", false);
      this.$parent.reload();
    },
    cancelDialog() {
      this.projectInfo.budget = "";
      this.projectInfo.actual = "";
      this.projectInfo.description = "";
      this.appropriationAuditDialogInfo = "";
      this.$emit("update:appropriationAuditDialogVisible", false);
    },
    open() {
      Business.queryProjectCapitalByProjectId({ id: this.projectId }).then(
        res => {
          this.projectInfo.budget = res.data.projectCapitalDto.budget;
          this.projectInfo.actual = res.data.projectCapitalDto.actual;
          this.projectInfo.description = res.data.projectCapitalDto.description;
        }
      );
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
.customerDialog {
  width: 100px;
}
</style>