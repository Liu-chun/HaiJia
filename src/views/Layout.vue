<template>
  <div class="parcel">
    <el-container class="container">
      <el-aside style="width: auto; background-color: #545c64">
        <el-menu
          text-color="#b8c7ce"
          active-text-color="#ffd04b"
          collapse-transition
          :default-openeds="defaultOpeneds"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
          router
        >
          <el-submenu
            :index="index + ''"
            v-for="(item, index) in routerList"
            :key="index"
          >
            <template slot="title">
              <i class="el-icon-folder"></i>
              <span slot="title">{{ item.name }}</span>
            </template>
            <el-menu-item
              v-for="(itemTwo, indexTwo) in item.children"
              :key="indexTwo"
              @click="toRouter(itemTwo.routerPage)"
            >
              <img style="width: 15px" src="../assets/images/圆圈.png" alt="" />
              {{ itemTwo.name }}
            </el-menu-item>
            <!-- <el-menu-item
                
              index="1-1"
              @click="$router.push('/oddWarpingPlan')"
            >
              <img style="width: 15px" src="../assets/images/圆圈.png" alt="" />

              查单经轴未制整经计划
            </el-menu-item>
            <el-menu-item
              index="1-2"
              style="padding: 0 30px"
              @click="$router.push('/evenWarpingPlan')"
            >
              <img style="width: 15px" src="../assets/images/圆圈.png" alt="" />

              查双经轴未制整经计划</el-menu-item
            >
            <el-menu-item
              index="1-3"
              style="padding: 0 30px"
              @click="$router.push('/evenWarpingfPlan')"
            >
              <img style="width: 15px" src="../assets/images/圆圈.png" alt="" />

              查双经轴未制完整经计划</el-menu-item
            > -->
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main class="main">
          <router-view v-if="isRouterAlive"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
      isCollapse: false,
      animationStatic: false,
      defaultOpeneds: ["0", "1", "2"],
      routerList: [
        {
          id: "2",
          name: "生产计划",
          children: [
            {
              id: "1",
              name: "查单经轴未制定整经计划",
              routerPage: "oddWarpingPlan",
              children: [],
            },
            {
              id: "2",
              name: "查双经轴未制定整经计划（前）",
              routerPage: "evenWarpingPlan",
              children: [],
            },
            {
              id: "3",
              name: "查双经轴未制定整经计划（后）",
              routerPage: "evenWarpingfPlan",
              children: [],
            },
          ],
        },
        {
          id: "3",
          name: "生产订单",
          children: [
            {
              id: "1",
              name: "生产订单",
              routerPage: "productOrder",
              children: [],
            },
          ],
        },
        {
          id: "4",
          name: "原料需求",
          children: [
            {
              id: "1",
              name: "原料供应状态",
              routerPage: "rawStatus",
              children: [],
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    shIcon() {
      if (this.isCollapse) {
        this.isCollapse = false;
      } else {
        this.isCollapse = true;
      }
    },
    shIconGo() {
      this.animationStatic = true;
    },
    shIconLeave() {
      this.animationStatic = false;
    },
    toRouter(i) {
      this.$router.push({
        path: i,
      });
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
};
</script>
<style scoped lang="less">
@deep:~ '>>>';
.el-aside {
  @{deep} .el-submenu__title {
    background-color: #222d32 !important;

    border-left: 3px solid transparent;
  }
  @{deep} .el-submenu__title:hover {
    border-left: 3px solid #3c8dbc;
    color: #fff !important;
  }
  @{deep} .el-menu-item {
    background-color: #2c3b41 !important;
  }
  @{deep} .el-menu-item:hover {
    background-color: #2c3b41 !important;
    color: #fff !important;
  }
}
.main {
  height: 95.5%;
  // padding: 0.3%;
  padding-bottom: 0;
}
//
@keyframes myLine {
  from {
    width: 0;
    height: 3px;
    background-color: #000;
  }
  to {
    width: 100%;
    height: 3px;
    background-color: #000;
  }
}
//

.parcel {
  width: 100%;
  height: 100%;
  // position: absolute;
  
}
.container {
  height: 100%;
  overflow: hidden;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 95%;
  background-color: #222d32 !important;
}
.el-header,
.el-footer {
  color: #333;
  padding: 0;
  // background-color: #eee;
}

.el-aside {
  color: #333;
  height: 110vh;
  background-color: #222d32 !important;
}

.el-main {
  padding: 0;
  background-color: #fff;
}

body > .el-container {
  margin-bottom: 40px;
}
.el-menu {
  border: 0;
}
.el-submenu .el-menu-item {
  padding: 0 10px !important;
}
.el-dropdown {
  font-size: 12px;
}
</style>
