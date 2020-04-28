<template>
  <div>
    <el-container style="height:860px ; border: 1 px solid #eee">
      <el-aside width="200px">
        <sidebar></sidebar>
      </el-aside>
      <el-container>
        <el-header>
          <navbar></navbar>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/sidebar";
export default {
  name: "dashboard",
  components: { Navbar, Sidebar },
  data() {
    return {
      user: ""
    };
  }
};
</script>

<style scoped>
.main .el-header {
  height: 131 px !important;
  background-color: white;
  color: #333;
  overflow: hidden;
  border-bottom: 1px #eee solid;
}
</style>