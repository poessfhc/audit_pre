<template>
  <el-dialog
    title="详细信息"
    :visible.sync="finalAuditDialogVisible"
    :before-close="cancelDialog"
    custom-class="customWidth"
    @open="open"
  >
    <div slot="footer" class="dialog-footer">
      <el-form ref="form">
        <el-form-item label="预算金额">
          <el-col :span="16">
            <el-input v-model="form.budget" disabled></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="拨付金额">
          <el-col :span="16">
            <el-input v-model="form.actural" disabled></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="实际金额">
          <el-col :span="16">
            <el-input v-model="form.finalAmount" disabled></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <el-button @click="refuse">拒绝</el-button>
      <el-button type="primary" @click="success">通 过</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { Business } from "@/api/api.js";
export default {
  //父组件 传 过来的 值
  props: {
    finalAuditDialogVisible: {
      type: Boolean,
      default: false
    },
    finalAuditDialogInfo: {
      type: Object,
      default: {}
    }
  },
  watch: {
    //监听 弹窗显示， 可以用来写 请求接口
    finalAuditDialogVisible: function(newVal, oldVal) {
      if (newVal) {
        console.log(newVal);
      }
    }
  },
  components: {},
  name: "finalAuditDialog",
  data() {
    return {
      finalAuditDialogInfo: "",
      form: {
        budget: "",
        actural: "",
        finalAmount: ""
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    //修改父组件传过来的值
    success() {
      Business.changeProjectStageById({ id: this.finalAuditDialogInfo.id });
      this.$emit("update:finalAuditDialogVisible", false);
      this.form.budget = "";
      this.form.actural = "";
      this.form.finalAmount = "";
      this.$parent.reload();
    },
    cancelDialog() {
      this.$emit("update:finalAuditDialogVisible", false);
      this.form.budget = "";
      this.form.actural = "";
      this.form.finalAmount = "";
    },
    refuse() {
      Business.downStage({ id: this.finalAuditDialogInfo.id });
      this.$emit("update:finalAuditDialogVisible", false);
      this.form.budget = "";
      this.form.actural = "";
      this.form.finalAmount = "";
      this.$parent.reload();
    },
    open() {
      Business.queryProjectCapitalByProjectId({
        id: this.finalAuditDialogInfo.id
      }).then(res => {
        this.form.budget = res.data.projectCapitalDto.budget;
        this.form.actural = res.data.projectCapitalDto.actual;
        this.form.finalAmount = res.data.projectCapitalDto.finalAmount;
      });
    }
  }
};
</script>
<style>
.form {
  background: rgb(255, 255, 255);
  padding: 0 10px;
}
.dialog-footer {
  text-align: center;
}
.customWidth {
  width: 30%;
}
</style>