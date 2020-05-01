<template>
  <el-dialog
    title="详细信息"
    :visible.sync="budgetDialogVisible"
    :before-close="cancelDialog"
    @open="open"
  >
    <el-tag>{{budgetDialogInfo.projectName}}</el-tag>
    <el-table :data="installations" border style="width: 100%">
      <el-table-column prop="installationName" label="设施名" width="180"></el-table-column>
      <el-table-column prop="price" label="单价(元/平方米)" width="180"></el-table-column>
      <el-table-column prop="installationNum" label="面积(平方米)"></el-table-column>
      <el-table-column prop="total" label="总计(元)"></el-table-column>
    </el-table>
    <el-form>
      <el-form-item label="合计(元) : ">{{budgetDialogInfo.totalPrice}}</el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
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
    budgetDialogVisible: {
      type: Boolean,
      default: false
    },
    budgetDialogInfo: {
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
    budgetDialogVisible: function(newVal, oldVal) {
      if (newVal) {
        console.log(newVal);
      }
    }
  },
  components: {},
  name: "projectBudgetAuditDialog",
  data() {
    return {
      projectId: "",
      budgetDialogInfo: "",
      installations: []
    };
  },

  mounted() {},
  methods: {
    open() {
      Business.queryInstallationCountById({ id: this.projectId }).then(res => {
        this.budgetDialogInfo = {
          id: res.data.installationCountDto.id,
          projectName: res.data.installationCountDto.projectName,
          installations: res.data.installationCountDto.installations,
          totalPrice: res.data.installationCountDto.totalPrice
        };
        this.installations = this.budgetDialogInfo.installations;
      });
    },
    //修改父组件传过来的值
    success() {
      console.log(this.budgetDialogInfo.id);
      Business.changeProjectStageById({ id: this.budgetDialogInfo.id });
      this.$emit("update:dialogVisible", false);
      this.$parent.reload();
    },
    cancelDialog() {
      this.$emit("update:budgetDialogVisible", false);
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