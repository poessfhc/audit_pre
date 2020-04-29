<template>
  <el-dialog title="详细信息" :visible.sync="dialogVisible" :before-close="cancelDialog">
    <el-form class="form">
      <el-form-item label="工程名 : ">
        <p>{{dialogInfo.projectName}}</p>
      </el-form-item>
      <el-form-item label="阶段 : ">
        <p>{{dialogInfo.stage}}</p>
      </el-form-item>
      <el-form-item label="工程描述 : ">
        <p>{{dialogInfo.description}}</p>
      </el-form-item>
      <el-form-item label="申请人 : ">
        <p>{{dialogInfo.createBy}}</p>
      </el-form-item>
      <el-form-item label="申请时间 : ">
        <p>{{dialogInfo.createTime}}</p>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelDialog">取 消</el-button>
      <el-button type="primary" @click="cancelDialog">通 过</el-button>
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
    cancelDialog() {
      Business.changeProjectStageById({id: this.dialogInfo.id})
      this.$emit("update:dialogVisible", false);
      this.$parent.reload()
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