<template>
  <div id="app">
    <el-container style="height: 500px; border: 1px solid #eee">
      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
        <el-menu router :default-active="$route.path" unique-opened>
          <el-submenu v-for="(child, index) in currentNavItems" :key="index" :index="index+''">
            <template slot="title">
              <i :class="child.icon"></i>
              {{child.title}}
            </template>
            <el-menu-item-group v-for="(item,index) in child.subs" :key="index">
              <el-menu-item :index="item.index">{{item.title}}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {};
</script>