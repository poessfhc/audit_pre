<template>
  <div class="deit">
    <div class="crumbs">
      <div class="cantainer">
        <el-table style="width: auto;" :data="roleList">
          <el-table-column label="序号" type="index" width="50"></el-table-column>
          <el-table-column label="角色名" prop="roleName" width="120"></el-table-column>
          <el-table-column label="角色描述" prop="remark" width="120"></el-table-column>
          <el-table-column label="创建时间" prop="createTime" width="180"></el-table-column>
          <el-table-column label="创建人" prop="createBy" width="120"></el-table-column>
          <el-table-column label="角色状态" prop="deleteFlag" width="120"></el-table-column>
          <el-table-column align="left">
            <template slot-scope="scope">
              <el-button type="primary" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
        <menuTreeDialog
          :menuTreeDialogVisible="menuTreeDialogVisible"
          :menuTreeDialogInfo="menuTreeDialogInfo"
          @update:menuTreeDialogVisible="menuTreeDialogVisibles"
        ></menuTreeDialog>
      </div>
    </div>
  </div>
</template>
<script>
import { User } from "@/api/api.js";
import menuTreeDialog from "@/components/dialog/menuTreeDialog";
export default {
  inject: ["reload"],
  components: {
    menuTreeDialog
  },
  data() {
    return {
      roleList: [],
      menuTreeDialogVisible: false,
      menuTreeDialogInfo: {}
    };
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      const data = await User.queryRoleList();
      this.roleList = data.data.roleList;
    },
    handleEdit(index, row) {
      this.menuTreeDialogInfo = row;
      this.menuTreeDialogVisible = true;
    },
    menuTreeDialogVisibles(v) {
      this.menuTreeDialogVisible = v;
    }
  }
};
</script>
<style scoped>
.select_list {
  float: left;
}
</style>