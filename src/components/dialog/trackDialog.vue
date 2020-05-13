<template>
  <el-dialog
    title="工程进度"
    :visible.sync="trackDialogVisible"
    :before-close="cancelDialog"
    @open="open"
  >
    <div class="step">
      <el-steps :active="active" finish-status="success">
        <el-step :title="item.title" :description="item.description" v-for="item in items"></el-step>
      </el-steps>
    </div>
  </el-dialog>
</template>

<script>
import { Business } from "@/api/api.js";
export default {
  //父组件 传 过来的 值
  props: {
    trackDialogVisible: {
      type: Boolean,
      default: false
    },
    trackDialogInfo: {
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
    trackDialogVisible: function(newVal, oldVal) {
      if (newVal) {
        console.log(newVal);
      }
    }
  },
  components: {},
  name: "trackDialog",
  data() {
    return {
      trackDialogInfo: "",
      projectId: "",
      items: [],
      active: 0,
    };
  },
  created() {},
  mounted() {},
  methods: {
    //修改父组件传过来的值
    success() {
      // Business.changeProjectStageById({ id: this.trackDialogInfo.id });
      // this.$emit("update:trackDialogVisible", false);
      // this.$parent.reload();
    },
    cancelDialog() {
      this.items = [];
      this.active = 0;
      this.$emit("update:trackDialogVisible", false);
    },
    open() {
      Business.queryInstallationByProjectId({
        projectId: this.projectId
      }).then(res => {
        this.items = res.data.items;
        this.active = res.data.max;
        if (this.active == this.items.length) {
        }
      });
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