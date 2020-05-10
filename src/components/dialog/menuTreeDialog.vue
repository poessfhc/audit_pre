<template>
  <el-dialog
    title="分配菜单"
    :visible.sync="menuTreeDialogVisible"
    :before-close="cancelDialog"
    custom-class="customWidth"
    @open="open"
  >
    <div class="divcss">
      <el-scrollbar style="height:80%">
        <el-tree
          :data="data"
          show-checkbox
          default-expand-all
          node-key="id"
          ref="tree"
          highlight-current
          :props="defaultProps"
          style="height:100px"
        ></el-tree>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelDialog">取 消</el-button>
        <el-button type="primary" @click="success">变 更</el-button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
import { User } from "@/api/api.js";
export default {
  //父组件 传 过来的 值
  props: {
    menuTreeDialogVisible: {
      type: Boolean,
      default: false
    },
    menuTreeDialogInfo: {
      type: Object,
      default: {}
    }
  },
  watch: {
    //监听 弹窗显示， 可以用来写 请求接口
    menuTreeDialogVisible: function(newVal, oldVal) {
      if (newVal) {
        console.log(newVal);
      }
    }
  },
  components: {},
  name: "menuTreeDialog",
  data() {
    return {
      menuTreeDialogInfo: {},
      menuTreeDialogVisible: false,
      data: [],
      defaultProps: {
        children: "children",
        label: "label"
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    //修改父组件传过来的值
    open() {
      User.queryTree().then(res => {
        if (res.status == 200) {
          this.data = res.data.menuTree;
          User.queryRoleTree({
            roleId: this.menuTreeDialogInfo.roleId
          }).then(res => {
            if (res.status == 200) {
              this.$refs.tree.setCheckedNodes(res.data.menuRoleTree);
              this.$message({
                message: "查询成功",
                type: "success"
              });
            }
          });
        }
      });
    },
    success() {
      const roleTree = [];
      const arr = this.$refs.tree.getCheckedKeys();
      const half = this.$refs.tree.getHalfCheckedKeys();
      const tree = arr.concat(half);
      const id = this.menuTreeDialogInfo.roleId;
      for (var i = 0; i < tree.length; i++) {
        roleTree.push({ roleId: id, menuId: tree[i] });
      }
      const data = { roleId: this.menuTreeDialogInfo.roleId, roleMenuDto: roleTree };
      User.updateRoleTreeByRoleId(data).then(res => {
        if ((res.status = 200)) {
          this.$message({
            message: "更新成功",
            type: "success"
          });
        }
        this.$emit("update:menuTreeDialogVisible", false);
      });
    },
    cancelDialog() {
      this.$refs.tree.setCheckedNodes([]);
      this.$emit("update:menuTreeDialogVisible", false);
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
.el-scrollbar .el-scrollbar__wrap {
  overflow-x: hidden;
}
.divcss {
  width: 100%;
  height: 400px;
}
.customWidth {
  width: 30%;
}
</style>