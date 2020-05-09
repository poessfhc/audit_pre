<template>
  <el-dialog title="详细信息" :visible.sync="settlementDialogVisible" :before-close="cancelDialog">
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
      projectId: ""
    };
  },
  created() {},
  mounted() {},
  methods: {
    //修改父组件传过来的值
    success() {
      Business.changeProjectStageById({ id: this.settlementDialogInfo.id });
      this.$emit("update:settlementDialogVisible", false);
      this.$parent.reload();
    },
    cancelDialog() {
      this.$emit("update:settlementDialogVisible", false);
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