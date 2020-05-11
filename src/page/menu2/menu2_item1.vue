<template>
  <el-form ref="form" :model="form" label-width="80px">
    <el-form-item label="工程名称" prop="name" :rules="[{required: true, message: '工程名不能为空'}]">
      <el-col :span="8">
        <el-input type="name" v-model="form.name"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="工程描述">
      <el-col :span="16">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即发布</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { Business } from "@/api/api.js";
export default {
  data() {
    return {
      form: {
        name: "",
        desc: ""
      },
      user: ""
    };
  },
  methods: {
    onSubmit() {
      this.user = sessionStorage.getItem("user");
      Business.insertProject({
        projectName: this.form.name,
        description: this.form.desc,
        userId: this.user,
        createBy: this.user,
        updateBy: this.user
      }).then(res => {
        if (res.status == 200) {
          this.$message({
            message: "发布成功",
            type: "success"
          });
          this.form = { name: "", desc: "" };
        } else {
          this.$message.error("发布失败,请联系管理员");
        }
      });
    }
  }
};
</script>