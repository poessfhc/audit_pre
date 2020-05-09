<template>
  <el-dialog title="详细信息" :visible.sync="dialogVisible" :before-close="cancelDialog">
    <el-form class="form">
      <el-form-item label="工程名 : ">
        {{dialogInfo.projectName}}
      </el-form-item>
      <el-form-item label="阶段 : ">
        {{dialogInfo.stage}}
      </el-form-item>
      <el-form-item label="工程描述 : ">
        {{dialogInfo.description}}
      </el-form-item>
      <el-form-item label="申请人 : ">
        {{dialogInfo.createBy}}
      </el-form-item>
      <el-form-item label="申请时间 : ">
        {{dialogInfo.createTime}}
      </el-form-item>
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
  name: "projectAuditDialog",
  data() {
    return {
      dialogInfo: ""
    };
  },
  created() {},
  mounted() {},
  methods: {
    //修改父组件传过来的值
    success() {
      Business.changeProjectStageById({id: this.dialogInfo.id})
      this.$emit("update:dialogVisible", false);
      this.$parent.reload()
    },
    refuse(){
      Business.downStage({ id: this.dialogInfo.id });
      this.$emit("update:dialogVisible", false);
      this.$parent.reload();
    },
    cancelDialog(){
      this.$emit("update:dialogVisible", false);
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