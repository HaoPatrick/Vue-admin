<template>
  <el-col :span="19" style="margin-left: 20px">
    <h1 @click="getUserData">{{ msg }}</h1>
    <el-row :gutter="20">
      <el-col :xs="12" :md="6" v-for="person in allUsers">
        <el-card >
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
export default {
  name: 'hello',
  computed: {
    ...mapGetters([
      'allUsers'
    ])
  },
  data () {
    return {
      msg: 'All person here'
    }
  },
  methods: {
    ...mapMutations([
      'getUserData'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
