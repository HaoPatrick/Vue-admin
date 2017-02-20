<template>
  <div id="app">
    <el-row>
      <el-col :span="4">
        <el-menu mode="vertical" default-active="1" class="el-menu-vertical-demo">
          <el-menu-item-group title="Group One">
            <el-menu-item index="1"><span @click="toPersons"><i class="el-icon-document"></i>每个人都在这里</span></el-menu-item>
            <el-menu-item index="2"><i class="el-icon-message"></i>概览</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="3"><i class="el-icon-message"></i>Navigator Three</el-menu-item>
            <el-menu-item index="4"><i class="el-icon-message"></i>Navigator Four</el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </el-col>
      <router-view></router-view>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'app',
  methods: {
    toPersons: function () {
      console.log('asd')
      this.$router.push('persons')
    }
  }
}
</script>

<style scoped>
.el-col{
  height: 100%;
}
.el-menu {
  height: 100%;
}
.el-row{
  height: 100%;
}

</style>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  position: absolute;
  overflow: hidden;
}
body {
  margin: 0;
}
</style>
