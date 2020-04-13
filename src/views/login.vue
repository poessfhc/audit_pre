<template>
  <div class="login">
    <el-container>
      <el-header>工程跟踪审计管理系统</el-header>
      <el-main class="login_form">
        <el-form :model="formLoginIn" ref="formLoginIn" label-width="100px" class="demo-ruleForm">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="formLoginIn.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="formLoginIn.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('formLoginIn')">提交</el-button>
            <el-button @click="resetForm('formLoginIn')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
      <el-footer></el-footer>
    </el-container>
  </div>
</template>
<script>
import { Login } from "@/api/api.js";
import {mapActions} from 'vuex'
export default {
  name: "login",
  data() {
    return {
      labelPosition: "right",
      formLoginIn: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    ...mapActions({ add_Routes: "add_Routes" }),
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const loginInfo = {
            username: this.formLoginIn.username,
            password: this.formLoginIn.password
          };
          Login.userLogin(loginInfo)
            .then(res => {
              if (res.status == 200) {
                localStorage.setItem("authToken", res.data.authToken);
                //将路由信息，菜单信息，用户信息存到sessionStorage里
                sessionStorage.setItem(
                  "menuData",
                  JSON.stringify(res.data.navData)
                );
                sessionStorage.setItem("user", res.data.username);
                sessionStorage.setItem(
                  "routes",
                  JSON.stringify(res.data.routerData)
                );
                console.log(res.data.routerData)
                this.add_Routes(res.data.routerData) //触发vuex里的增加路由
                console.log(this.$router)
                this.$router.push('menu1_item1')
              }
            })
            .catch(err => {
              alert(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      Login.jcnb("1024065905@qq.com").then(res => {
        console.log(res);
      });
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.login_form {
  width: 40%;
  margin: 0 auto;
}
</style>