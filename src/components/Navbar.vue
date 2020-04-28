<template>
  <div class="navbar">
    <div class="user">
      <el-dropdown @command="logout">
        <span class="el-dropdown-link">
          {{user}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">
            <span>退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      user: ""
    };
  },
  methods: {
    // 退出是清空sessionStorage信息
    logout() {
      sessionStorage.removeItem("routes");
      sessionStorage.removeItem("user");
      sessionStorage.removeItem("menuData");
      this.$router.push("/login");
    }
  },
  created() {
    this.user = sessionStorage.getItem("user");
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.el-dropdown {
  vertical-align: top;
  color: aqua;
}
</style>