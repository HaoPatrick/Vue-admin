<template>
  <div id="app">
    <el-row>
      <el-col :span="4">
        <el-menu mode="vertical" @select="selectMenu" default-active="1" class="el-menu-vertical-demo">
          <el-menu-item-group title="Group One">
            <el-menu-item index="1"><i class="el-icon-document"></i>每个人都在这里</el-menu-item>
            <el-menu-item index="2"><i class="el-icon-message"></i>获得身份许可</el-menu-item>
            <el-menu-item  index="3"><i class="el-icon-message"></i>我的遗忘之地</el-menu-item>
            <el-menu-item  index="4"><i class="el-icon-message"></i>记录在册</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="Group Two">
            <el-menu-item index="5"><span @click="advanced"><i class="el-icon-message"></i>高级功能</span></el-menu-item>
            <el-menu-item index="6"><span @click="advanced"><i class="el-icon-message"></i>设置</span></el-menu-item>
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

    },
    toDelete: function () {

    },
    toLogin: function () {

    },
    advanced: function () {
      this.$message.error('别点了，还没写呢')
    },
    selectMenu: function (index, indexPath) {
      // console.log(index)
      // console.log(index === '3')
      if (index === '1') {
        console.log('to persons')
        this.$router.push('persons')
      } else if (index === '3') {
        console.log('to delete')
        this.$router.push('delete')
      } else if (index === '2') {
        console.log('to login')
        this.$router.push('login')
      } else if (index === '4') {
        console.log('print')
        this.$router.push('print')
      } else {
        this.$message.error('别点了，还没写呢')
      }
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
