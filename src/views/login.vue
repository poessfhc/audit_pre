<template>
  <div class="login">
    <el-container>
      <el-header></el-header>
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
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          const loginInfo = {
            username: this.formLoginIn.username,
            password: this.formLoginIn.password
          };
          Login.userLogin(loginInfo)
            .then(res => {
              localStorage.setItem('authToken',res.data.authToken)
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
      Login.jcnb('1040861467@qq.com').then(res=>{
        console.log(res)
      })
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