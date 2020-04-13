<template>
  <div class="sidebar">
    <div class="mini_bar">
      <ul class="mcd-menu">
        <li v-for="(child, index) in currentNavItems" class="mcd-menu-li" @mouseenter="sliderHover">
          <a class="child-title">
            <img style="width: 38px; height: 35px;" :src="child.icon" />
            <strong>{{child.title}}</strong>
          </a>
          <ul class="mcd-menu-li-ul" style="display: block">
            <ul class="mcd-menu-li-ul-group groupOne">
              <li v-for="item in child.subs" style="float: left; width: 100%; padding-left: 0px">
                <a :href="'#'+item.index">{{item.title}}</a>
              </li>
            </ul>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "v-sidebar",
  data() {
    return {
      isClicked: false,
      iconData: { metas: "" },
      systems: "",
      items: "",
      value: "",
      input2: "",
      navData: "",
      currentNavItems: [],
      isHover: false
    };
  },
  methods: {
    sliderHover() {
      this.isClicked = false;
    }
  },
  created() {
    // 从sessionStorage得到menuData
    this.currentNavItems = JSON.parse(sessionStorage.getItem("menuData"));
  }
};
</script>

<style scoped lang="scss" type="text/scss">
.sidebar-toggle {
  width: 20px;
  height: 80px;
  position: absolute;
  left: 198px;
  top: 300px;
  background: url(../assets/Button.png) no-repeat -3px -2px;
}
.groupOne {
  width: 100px;
  clear: both;
  height: 300px;
}
.mcd-title {
  margin-top: 10px;
  margin-left: -14px;
}
.mcd-title-child {
  margin-left: 20px;
}
a {
  cursor: pointer;
}
.sidebar {
  height: 100%;
  display: block;
  position: fixed;
  min-width: 200px;
  left: 0;
  top: 61px;
  background-color: rgb(239, 240, 241);
}
.sidebar > ul {
  height: 100%;
}
.select {
  position: fixed;
  bottom: 0;
  width: 178px;
  left: 2px;
}
.el-icon-plus {
  right: 0px;
}
.collect-icon {
  position: absolute;
  top: 21px;
  right: 0px;
}
.eltabs {
  height: calc(100% - 36px);
}
.navside {
  position: fixed;
  left: 100px;
  bottom: 0px;
  /*box-shadow:2px 2px 2px 2px rgba(0, 0, 0, 0.2);*/
  h3 {
    font-weight: normal;
    font-size: 20px;
    color: rgb(68, 68, 68);
    margin-bottom: 20px;
  }
  .system {
    div {
      font-size: 16px;
      margin-bottom: 10px;
    }
  }
}
.mini_bar {
  position: relative;
  .mcd-menu {
    list-style: none;
    padding: 0;
    margin: 0;
    border-radius: 2px;
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    width: 100%;
  }
  .mcd-menu .mcd-menu-li {
    position: relative;
    width: 200px;
    border-bottom: 1px solid #e4e4e4;
    /*height: 36px;*/
  }
  .mcd-menu .mcd-menu-li .child-title {
    display: block;
    text-decoration: none;
    padding: 12px 20px;
    color: rgb(149, 150, 151);
    text-align: left;
    height: 30px;
    line-height: 30px;
    position: relative;
    border-radius: 2px;
    font-size: 14px;
    img {
      float: left;
    }
    strong {
      float: left;
    }
  }

  .mcd-menu .mcd-menu-li .mcd-menu-li-ul {
    height: 100%;
    position: relative;
    width: 150px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.2);
  }
  .mcd-menu .mcd-menu-li .mcd-menu-li-ul .mcd-menu-li-ul-group li a {
    color: #777;
  }
  .mcd-menu .mcd-menu-li:hover > a {
    background-color: white;
    color: #eb4f52;
  }
  .mcd-menu .mcd-menu-li .mcd-menu-li-ul .mcd-menu-li-ul-group li:hover > a {
    background-color: #f8f8f8;
  }
  .mcd-menu .mcd-menu-li .mcd-menu-li-ul {
    position: absolute;
    height: auto;
    padding: 10px;
    margin: 0;
    background: #f8f8f8;
    /*opacity: 0;*/
    visibility: hidden;
    transition: all 300ms linear;
    -o-transition: all 300ms linear;
    -ms-transition: all 300ms linear;
    -moz-transition: all 300ms linear;
    -webkit-transition: all 300ms linear;
    left: 220px;
    top: 0px;
    border-left: 4px solid #eef0f7;
    border-radius: 5px;
  }

  .mcd-menu .mcd-menu-li .topreset {
    top: -310px;
  }

  .mcd-menu .mcd-menu-li .child-title {
    text-indent: 20px;
    font-size: 16px;
  }
  .mcd-menu .mcd-menu-li .mcd-menu-li-ul:before {
    content: "";
    position: absolute;
    top: 25px;
    left: -9px;
    border-right: 5px solid #eef0f7;
    border-bottom: 5px solid transparent;
    border-top: 5px solid transparent;
  }
  .mcd-menu .mcd-menu-li:hover > ul,
  .mcd-menu .mcd-menu-li .mcd-menu-li-ul .mcd-menu-li-ul-group li:hover > ul {
    display: block;
    z-index: 100;
    /*opacity: 1;*/
    visibility: visible;
    left: 200px;
    background-color: #ffffff;
    border-radius: 5px;
  }
  .mcd-menu .mcd-menu-li .mcd-menu-li-ul h3 {
    font-weight: normal;
    font-size: 14px;
    text-align: center;
    box-sizing: border-box;
    margin-bottom: 10px;
  }
  .mcd-menu .mcd-menu-li .mcd-menu-li-ul .mcd-menu-li-ul-group li {
    height: 20px;
    line-height: 20px;
    float: left;
    margin-left: 10px;
    font-size: 14px;
    border: 0;
    display: block;
    text-decoration: none;
    padding: 12px 20px;
    text-align: left;
    position: relative;
    border-radius: 2px;
  }
  .mcd-menu .mcd-menu-li .mcd-menu-li-ul .mcd-menu-li-ul-group li a {
    text-decoration: none;
    display: block;
    height: 20px;
    background-color: #ffffff;
    padding: 2px 10px;
    border-radius: 3px;
  }
  .mcd-menu .mcd-menu-li .mcd-menu-li-ul .mcd-menu-li-ul-group li a i {
    font-size: 16px;
    display: inline-block;
    margin: 0 10px 0 0;
  }
  .mcd-menu .mcd-menu-li .mcd-menu-li-ul .mcd-menu-li-ul-group li:hover > ul {
    top: 0px;
    left: 300px;
  }
}
.icon-style {
  color: rgba(0, 0, 0, 0.4);
}
.isShowSlider {
  visibility: hidden !important;
}
</style>
