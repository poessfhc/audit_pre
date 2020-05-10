<template>
  <el-dialog
    title="详细信息"
    :visible.sync="settlementDialogVisible"
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
            <el-input v-model="form.finalAmount"></el-input>
          </el-col>
        </el-form-item>
      </el-form>
      <el-button @click="cancelDialog">取 消</el-button>
      <el-button type="primary" @click="success">通 过</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { Business } from "@/api/api.js";
export default {
  //父组件 传 过来的 值
  props: {
    settlementDialogVisible: {
      type: Boolean,
      default: false
    },
    settlementDialogInfo: {
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
    settlementDialogVisible: function(newVal, oldVal) {
      if (newVal) {
        console.log(newVal);
      }
    }
  },
  components: {},
  name: "settlementDialog",
  data() {
    return {
      settlementDialogInfo: "",
      projectId: "",
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
      Business.settlementByprojectId({
        projectId: this.settlementDialogInfo.id,
        finalAmount: this.form.finalAmount
      }).then(res => {
        if (res.status == 200) {
          Business.changeProjectStageById({ id: this.settlementDialogInfo.id });
        } else {
          alert("error");
        }
      });
      this.$emit("update:settlementDialogVisible", false);
      this.$parent.reload();
    },
    cancelDialog() {
      this.$emit("update:settlementDialogVisible", false);
      this.form.budget = "";
      this.form.actural = "";
      this.form.finalAmount = "";
    },
    open() {
      Business.queryProjectCapitalByProjectId({
        id: this.settlementDialogInfo.id
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