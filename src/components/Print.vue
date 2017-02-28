<template>
 <el-col :span="19" style=" margin-left: 20px; padding-bottom: 6rem;">
   <div style="height: 100%; overflow: auto">
  你想要什么：
    <el-select v-model="selectValue" placeholder="Select">
      <el-option
        v-for="item in depart"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <el-button @click="printIt">我选好了</el-button>
    <el-button @click="printAll">开始生成pdf</el-button>
    <div class="printContainer">
     <div class="printClass" v-if="allPersons" v-for="selectedPerson in allPersons">
        <el-row>
          <el-col :span="19">
            <p>大家好，我叫{{selectedPerson.fields.name}}, 性别{{selectedPerson.fields.gender}}, 我的浙江大学统一代号是：{{selectedPerson.fields.student_id}} 手机号是{{selectedPerson.fields.phone_number}}，
              现在在{{selectedPerson.fields.major}}读{{selectedPerson.fields.grade}}。 
              填写报名表用了{{selectedPerson.fields.time_spend | getTime}} 我的邮箱是 {{selectedPerson.fields.mail_address}}
              我的Box作品：<a :href="'https://box.zjuqsc.com/-' + selectedPerson.fields.share_work">{{selectedPerson.fields.share_work | filterPhoto}}</a>
            </p>
            <p>
              <el-tag type="primary">{{selectedPerson.fields.inclination_one}}</el-tag>
              <el-tag type="primary">{{selectedPerson.fields.inclination_two}}</el-tag>
              <p>{{selectedPerson.fields.user_agent}}</p>          
            </p>
          </el-col>
          <el-col :span="5">
            <img width="100%" v-on:error="handleErrorPhoto($event)"
             :src="'https://photo.haoxp.xyz:8197/' + selectedPerson.fields.student_id + '.jpg'">
          </el-col>
        </el-row>
        <p style="font-weight: bold">自我介绍:</p>
        <p>{{selectedPerson.fields.self_intro}}</p>
        <p style="font-weight: bold">{{selectedPerson.fields.inclination_one}}</p>
        <p>{{selectedPerson.fields.question_one}}</p>
        <p style="font-weight: bold">{{selectedPerson.fields.inclination_two}}</p>
        <p>{{selectedPerson.fields.question_two}}</p>
      </div>
   </div>
   </div>

</el-col>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      depart: [
        {text: '推广与策划中心', value: '推广与策划中心'},
        {text: '技术研发中心', value: '技术研发中心'},
        {text: '视频团队(主持人)', value: '视频团队(主持人)'},
        {text: '视频团队(拍摄与制作)', value: '视频团队(拍摄与制作)'},
        {text: '人力资源部门', value: '人力资源部门'},
        {text: '设计与视觉中心', value: '设计与视觉中心'},
        {text: '新闻与资讯中心', value: '新闻与资讯中心'},
        {text: '水朝夕工作室', value: '水朝夕工作室'},
        {text: '产品运营部门', value: '产品运营部门'},
        {text: '摄影部', value: '摄影部'}
      ],
      selectValue: '',
      allPersons: []
    }
  },
  filters: {
    getTime: function (value) {
      let timeSpend = Math.floor(parseInt(value) / 1000)
      return Math.floor(timeSpend / 60) + 'min ' + timeSpend % 60 + 's'
    },
    filterPhoto: function (value) {
      if (value === '') {
        return '没有啊'
      } else {
        return value
      }
    }
  },
  computed: {
    ...mapGetters([
      'detailURL',
      'getToken'
    ])
  },
  methods: {
    printIt: function () {
      let self = this
      let form = new FormData()
      form.append('cookie', self.getToken)
      form.append('print', '1')
      form.append('department', self.selectValue)

      axios.get(self.detailURL, {
        params: {
          cookie: self.getToken,
          print: '1',
          department: self.selectValue
        }
      }).then(response => {
        console.log(response.data)
        self.allPersons = response.data
      })
    },
    handleErrorPhoto: function (e) {
      let element = e.currentTarget
      element.src = 'https://photo.haoxp.xyz:8197/error.jpg'
    },
    printAll: function () {
      window.print()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
@media print {
  body * {
    display: none !important;
  }
  .printClass * {
    display: block !important;
  }
  .printContainer {
    position: relative;
    height: 100%;
    overflow: scroll;
  }
  * {transition: none !important}
}
</style>
<style scoped>


</style>
