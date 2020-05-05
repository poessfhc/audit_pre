<template>
  <el-dialog title="详细信息" :visible.sync="registerDialogVisible" :before-close="cancelDialog">
    <el-form
      :model="userForm"
      :rules="rules"
      ref="userForm"
      label-width="100px"
      class="demo-userForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="userForm.username" style="width:120px"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input :type="pwd" v-model="userForm.password" style="width: 300px;">
          <i slot="suffix" :class="icon" @click="showPass"></i>
        </el-input>
      </el-form-item>
      <el-form-item label="性别" prop="userForm.sex">
        <el-select v-model="userForm.sex" placeholder="选择性别" style="width:150px">
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号" prop="phonenumber">
        <el-input v-model="userForm.phonenumber" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="userForm.email" style="width:300px"></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input v-model="userForm.code" style="width:150px"></el-input>
        <el-button
          type="primary"
          :disabled="disable"
          :class="{ codeGeting:isGeting }"
          @click="getVerifyCode"
        >{{getCode}}</el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :plain="true" @click="onSubmit">注 册</el-button>
        <el-button @click="cancelDialog">取 消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { User } from "@/api/api.js";
export default {
  //父组件 传 过来的 值
  props: {
    registerDialogVisible: {
      type: Boolean,
      default: false
    },
    registerDialogInfo: {
      type: Object,
      default: {}
    }
  },
  watch: {
    //监听 弹窗显示， 可以用来写 请求接口
    registerDialogVisible: function(newVal, oldVal) {
      if (newVal) {
        console.log(newVal);
      }
    }
  },
  components: {},
  name: "projectAuditDialog",
  data() {
    var checkPhone = (rule, value, callback) => {
      const phoneReg = /^1[34578]\d{9}$$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        // Number.isInteger是es6验证数字是否为整数的方法,实际输入的数字总是识别成字符串
        // 所以在前面加了一个+实现隐式转换

        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (phoneReg.test(value)) {
            callback();
          } else {
            callback(new Error("电话号码格式不正确"));
          }
        }
      }, 100);
    };
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    };
    return {
      getCode: "获取验证码",
      isGeting: false,
      count: 60,
      disable: false,
      registerDialogInfo: "",
      //用于改变Input类型
      pwd: "password",
      //用于更换Input中的图标
      icon: "el-input__icon el-icon-view",
      userForm: {
        username: "",
        password: "",
        sex: "",
        phonenumber: "",
        email: "",
        code: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 4, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ],
        sex: [{ required: true, message: "选择性别", trigger: "change" }],
        phonenumber: [{ validator: checkPhone, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur" }],
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 4, max: 10, message: "长度在 5 到 10 个字符", trigger: "blur" }
        ]
      }
    };
  },
  created() {},
  mounted() {},
  methods: {
    onSubmit() {
      User.register(this.userForm).then(res => {
        debugger;
        if (res.status == 200) {
          this.$message({
            message: "注册成功",
            type: "success"
          });
          this.$emit("update:registerDialogVisible", false);
          this.userForm = {};
        } else if (res.status == 0) {
          this.$message.error("验证码错误");
        } else {
          this.$message.error("注册失败");
        }
      });
    },
    getVerifyCode() {
      console.log(this.userForm);
      if (this.userForm.email != "") {
        User.sendCodeEmail({ emailAddress: this.userForm.email });
        var countDown = setInterval(() => {
          if (this.count < 1) {
            this.isGeting = false;
            this.disable = false;
            this.getCode = "获取验证码";
            this.count = 60;
            clearInterval(countDown);
          } else {
            this.isGeting = true;
            this.disable = true;
            this.getCode = this.count-- + "s后重发";
          }
        }, 1000);
      } else {
        alert("填写邮箱");
      }
    },
    showPass() {
      //点击图标是密码隐藏或显示
      if (this.pwd == "text") {
        this.pwd = "password";
        //更换图标
        this.icon = "el-input__icon el-icon-view";
      } else {
        this.pwd = "text";
        this.icon = "el-input__icon el-icon-loading";
      }
    },
    cancelDialog() {
      this.$emit("update:registerDialogVisible", false);
      this.userForm = {};
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
</style>