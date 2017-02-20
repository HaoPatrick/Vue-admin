<template>
 <el-col :span="19" style="margin-left: 20px">
    <div>
      <div style="margin: 1rem;">获得身份许可</div>
      <el-input style="margin: 1rem;" placeholder="你的名字" v-model="username"></el-input>
      <el-input style="margin: 1rem;" type="password" placeholder="钥匙" v-model="password"></el-input>
      <el-button @click="loginTo" style="margin: 1rem;" type="primary">好的</el-button>
     </div>
  </el-col>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex'
import axios from 'axios'
export default {
  name: 'hello',
  computed: {
    ...mapGetters([
      'authURL'
    ])
  },
  data () {
    return {
      msg: 'Welcome to Vue.js App',
      username: '',
      password: ''
    }
  },
  methods: {
    ...mapMutations([
      'login',
      'setToken'
    ]),
    loginTo: function () {
      let form = new FormData()
      let self = this
      form.append('user_name', this.username)
      form.append('pass_word', this.password)
      axios.post(this.authURL, form).then(
        response => {
          console.log(response.data)
          if (response.data.message.includes('fail')) {
            self.$message.error('你是不是坏人，你的钥匙不对')
            self.setToken('')
          } else {
            self.setToken(response.data.message)
            self.$message('我知道了，你已经获得了系统最高机密')
            self.$router.push('/persons')
          }
        }
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-container{
  margin-left: 10%;
}
</style>
