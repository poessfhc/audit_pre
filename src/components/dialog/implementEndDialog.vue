<template>
  <el-dialog
    title="详细信息"
    :visible.sync="implementEndDialogVisible"
    :before-close="cancelDialog"
    @open="open"
  >
    <el-table :data="installationInfo" height="250" border style="width: 100%">
      <el-table-column prop="installationName" label="设施名称" width="180"></el-table-column>
      <el-table-column prop="installationNum" label="设施面积" width="180"></el-table-column>
      <el-table-column prop="flag" label="是否完成"></el-table-column>
    </el-table>
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
    implementEndDialogVisible: {
      type: Boolean,
      default: false
    },
    implementEndDialogInfo: {
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
    implementEndDialogVisible: function(newVal, oldVal) {
      if (newVal) {
        console.log(newVal);
      }
    }
  },
  components: {},
  name: "implementEndDialog",
  data() {
    return {
      implementEndDialogInfo: "",
      projectId: "",
      installationInfo: []
    };
  },
  created() {},
  mounted() {},
  methods: {
    open() {
      Business.queryInstallationInfoByProjectId({
        projectId: this.projectId
      }).then(res => {
        this.installationInfo = res.data.installationInfo;
        for (var i = 0; i < this.installationInfo.length; i++) {
          if (this.installationInfo[i].flag == 1) {
            this.installationInfo[i].flag = "已完成";
          } else {
            this.installationInfo[i].flag = "未完成";
          }
        }
      });
    },
    //修改父组件传过来的值
    success() {
      Business.changeProjectStageById({ id: this.projectId });
      this.$emit("update:implementEndDialogVisible", false);
      this.$parent.reload();
    },
    refuse() {
      Business.downStage({ id: this.projectId });
      this.$emit("update:implementEndDialogVisible", false);
      this.$parent.reload();
    },
    cancelDialog() {
      this.installationInfo = [];
      this.$emit("update:implementEndDialogVisible", false);
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