<template>
  <el-dialog
    title="详细信息"
    custom-class="customWidth"
    :visible.sync="roleSelectDialogVisible"
    :before-close="cancelDialog"
    @open="open"
  >
    <el-checkbox-group v-model="checkedRoles" :min="0" :max="1">
      <el-checkbox v-for="role in roles" :label="role" :key="role">{{role}}</el-checkbox>
    </el-checkbox-group>
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancelDialog">取 消</el-button>
      <el-button type="primary" @click="success">分 配</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { User } from "@/api/api.js";
export default {
  //父组件 传 过来的 值
  props: {
    roleSelectDialogVisible: {
      type: Boolean,
      default: false
    },
    roleSelectDialogInfo: {
      type: Object,
      default: {}
    }
  },
  watch: {
    //监听 弹窗显示， 可以用来写 请求接口
    roleSelectDialogVisible: function(newVal, oldVal) {
      if (newVal) {
        console.log(newVal);
      }
    }
  },
  components: {},
  name: "roleSelectDialog",
  data() {
    return {
      roleSelectDialogVisible: false,
      roleSelectDialogInfo: {},
      checkedRoles: [],
      roles: []
    };
  },
  created() {},
  mounted() {},
  methods: {
    cancelDialog() {
      this.checkedRoles = [];
      this.$emit("update:roleSelectDialogVisible", false);
    },
    open() {
      User.queryRole().then(res => {
        this.roles = res.data.roleList;
        User.queryRoleByUserId({
          userId: this.roleSelectDialogInfo.userId
        }).then(res => {
          this.checkedRoles = res.data.roleList;
        });
      });
    },
    success() {
      const a = this.checkedRoles[0];
      let remark = "";
      if (a != null) {
        remark = a;
      }
      User.updateUserRoleByUserId({
        remark: remark,
        userId: this.roleSelectDialogInfo.userId
      }).then(res => {
        if (res.status == 200) {
          this.$message({
            message: "更新成功",
            type: "success"
          });
          this.checkedRoles = [];
          this.$emit("update:roleSelectDialogVisible", false);
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
.customWidth {
  width: 30%;
}
</style>