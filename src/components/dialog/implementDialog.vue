<template>
  <el-dialog
    title="工程进度"
    :visible.sync="implementDialogVisible"
    :before-close="cancelDialog"
    @open="open"
  >
    <el-tag type="warning" v-if="waringFlag">请加快进度</el-tag>
    <div class="step">
      <el-steps :active="active" finish-status="success">
        <el-step :title="item.title" :description="item.description" v-for="item in items"></el-step>
      </el-steps>
      <el-button style="margin-top: 12px;" @click="previous">上一步</el-button>
      <el-button style="margin-top: 12px;" @click="next">{{nextName}}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { Business } from "@/api/api.js";
export default {
  //父组件 传 过来的 值
  props: {
    implementDialogVisible: {
      type: Boolean,
      default: false
    },
    implementDialogInfo: {
      type: Object,
      default: {}
    },
    projectId: {
      type: Object,
      default: ""
    }
  },
  watch: {
    //监听 弹窗显示， 可以用来写 请求接口
    implementDialogVisible: function(newVal, oldVal) {
      if (newVal) {
        console.log(newVal);
      }
    }
  },
  components: {},
  name: "projectAuditDialog",
  data() {
    return {
      waringFlag: false,
      implementDialogInfo: "",
      projectId: "",
      items: [],
      active: 0,
      nextName: "下一步"
    };
  },
  created() {},
  mounted() {},
  methods: {
    //修改父组件传过来的值
    success() {
      Business.changeProjectStageById({ id: this.implementDialogInfo.id });
      this.$emit("update:implementDialogVisible", false);
      this.$parent.reload();
    },
    cancelDialog() {
      this.items = [];
      this.active = 0;
      this.nextName = "下一步";
      this.waringFlag = false;
      this.$emit("update:implementDialogVisible", false);
    },
    open() {
      Business.queryInstallationByProjectId({
        projectId: this.projectId
      }).then(res => {
        this.items = res.data.items;
        this.active = res.data.max;
        if (res.data.flag == "true") {
          this.waringFlag = true;
        } else {
          this.waringFlag = false;
        }
        if (this.active == this.items.length) {
          this.nextName = "提交";
        }
      });
    },
    previous() {
      // if (this.active-- < 0) this.active = this.items.length - 1;
      this.active--;
      this.nextName = "下一步";
      const data = {
        projectId: this.implementDialogInfo.id,
        installationId: this.items[this.active]["installationId"],
        stepFlag: "previous"
      };
      this.items[this.active]["description"] = "";
      Business.updateInstallationFlagByProjectId(data).then(res => {
        if (res.status == 200) {
          this.$message({
            message: "更新成功",
            type: "success"
          });
        }
      });
      if (this.active < 0) {
        this.active = 0;
      }
    },
    next() {
      this.active++;
      if (this.nextName == "提交") {
        Business.changeProjectStageById({
          id: this.implementDialogInfo.id
        }).then(res => {
          if (res.status == 200) {
            this.$emit("update:implementDialogVisible", false);
            this.$parent.reload();
          }
        });
      } else {
        const data = {
          projectId: this.implementDialogInfo.id,
          installationId: this.items[this.active - 1]["installationId"],
          stepFlag: "next"
        };
        this.items[this.active - 1][
          "description"
        ] = this.$options.methods.dateFormat(new Date());
        Business.updateInstallationFlagByProjectId(data).then(res => {
          Business.warning({ id: this.projectId, flag: "2" });
          if (res.status == 200) {
            this.waringFlag = false
            this.$message({
              message: "更新成功",
              type: "success"
            });
          }
        });
        if (this.active >= this.items.length) {
          this.nextName = "提交";
          this.active = this.items.length;
        }
      }
    },
    dateFormat(time) {
      var date = new Date(time);
      var year = date.getFullYear();
      /* 在日期格式中，月份是从0开始的，因此要加0
       * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
       * */
      var month =
        date.getMonth() + 1 < 10
          ? "0" + (date.getMonth() + 1)
          : date.getMonth() + 1;
      var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
      var hours =
        date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
      var minutes =
        date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
      var seconds =
        date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
      // 拼接
      return (
        year +
        "-" +
        month +
        "-" +
        day +
        " " +
        hours +
        ":" +
        minutes +
        ":" +
        seconds
      );
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