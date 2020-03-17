<template>
  <el-tree :data="data" :props="defaultProps" accordion @node-click="handleNodeClick"></el-tree>
</template>

<script>
import { Login } from "@/api/api.js";
const data = [];
export default {
  created() {
    this.init();
  },
  data() {
    return {
      data: [],
      defaultProps: {
        children: "children",
        label: "menuName"
      }
    };
  },
  methods: {
    async init() {
      const data = await Login.queryMenuList();
      console.log(data.data.data)
      this.data = data.data.data;
    },
    handleNodeClick(data) {
      console.log(data);
    }
  }
};
</script>