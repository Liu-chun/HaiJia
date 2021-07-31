<template>
  <div class="box">
    <el-breadcrumb separator-class="el-icon-arrow-right" :replace="false" >
      <el-breadcrumb-item :to="{ path: pathOne }" ><span @click="routerBGC(pathOne)">{{nameOne}}</span></el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: pathTwo }">{{nameTwo}}</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: pathThree }" v-if="nameThree !== undefined">{{nameThree}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
// import store from 'vuex'
export default {
  name: "breadNav",
  props: ["nameOne", "pathOne", "nameTwo", "pathTwo", "nameThree", "pathThree"],
  data() {
    return {};
  },
  created(){
  },
  methods: {
    routerBGC(data) {
      this.$store.commit("OPEN_ROUTER", data);
    }
  },
  mounted() {
  },
};
</script>

<style>
.box {
  padding: 0.5%;
}
.el-breadcrumb {
  font-size: 12px;
}
</style>
