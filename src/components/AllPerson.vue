<template>
  <el-col :span="19" style="margin-left: 20px">
    <h1 @click="getUserData">{{ msg }}</h1>
    <el-row :gutter="10" style="overflow: auto; height: 100%">
      <el-col :xs="12" :sm="8" :md="6" v-for="person in allUsers">
        <el-card style="margin-bottom: 0.8rem;">
          <div>姓名：{{person.fields.name}}</div>
          <div>学号：{{person.fields.student_id}}</div>
          <div>专业：{{person.fields.major}}</div>
          <div>第一志愿：{{person.fields.inclination_one}}</div>
          <div>第二志愿：{{person.fields.inclination_two}}</div>
          <div>性别：{{person.fields.gender}}</div>
          <div>电话号码：{{person.fields.phone_number}}</div>
        </el-card>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import axios from 'axios'
export default {
  name: 'hello',
  computed: {
    ...mapGetters([
      'allUsers',
      'getToken',
      'detailURL'
    ])
  },
  data () {
    return {
      msg: '你想要的，我都有'
    }
  },
  created: function () {
    let self = this
    if (this.getToken === '') {
      this.$message.error('对不起我不知道你是谁，我也不想和你说话')
      // this.$router.push('/login')
    } else if (self.allUsers.length > 0) {
      return
    } else {
      axios.get(this.detailURL, {
        params: {
          cookie: self.getToken,
          exclude: 1
        }
      }).then(
        response => {
          console.log(response.data)
          self.setUserData(response.data)
        }
      )
    }
  },
  methods: {
    ...mapMutations([
      'getUserData',
      'setUserData'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
