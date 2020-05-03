<template>
  <el-dialog title="详细信息" :visible.sync="registerDialogVisible" :before-close="cancelDialog">
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
    registerDialogVisible: {
      type: Boolean,
      default: false
    },
    registerDialogInfo: {
      type: Object,
      default: {}
    }
  },
  watch: {
    //监听 弹窗显示， 可以用来写 请求接口
    registerDialogVisible: function(newVal, oldVal) {
      if (newVal) {
        console.log(newVal);
      }
    }
  },
  components: {},
  name: "projectAuditDialog",
  data() {
    return {
      registerDialogInfo: ""
    };
  },
  created() {},
  mounted() {},
  methods: {
    //修改父组件传过来的值
    success() {
      this.$emit("update:registerDialogVisible", false);
      this.$parent.reload()
    },
    cancelDialog(){
      this.$emit("update:registerDialogVisible", false);
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