<template>
  <div class="main">
    <navbar></navbar>
    <sidebar></sidebar>
    <router-view></router-view>
  </div>
</template>

<script>
import Sidebar from "./sidebar";
import Navbar from "./Navbar";
export default {
  name: "dashboard",
  components: { Sidebar, Navbar },
  data() {
    return {
      user: ""
    };
  }
};
</script>

<style scoped>
</style>