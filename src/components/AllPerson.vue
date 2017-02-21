<template>
  <el-col :span="19" style="margin-left: 20px; padding-bottom: 6rem;">
    <div style="font-size: 2rem;margin-bottom: 1.5rem;">{{ msg }}<el-switch
  v-model="imageOn"
  on-text="图"
  off-text="表">
</el-switch>
    <el-button @click="loadData" size="mini" type="text">再看一眼</el-button>
    </div>
    <el-row :gutter="10" style="overflow: auto; height: 100%;">
      <el-col v-if="imageOn" :xs="12" :sm="12" :md="8" :lg="6" v-for="person in allUsers">
        <el-card style="margin-bottom: 0.8rem;">
          <img width="100%" style="height: 20rem" v-on:error="handleErrorPhoto($event)" :src="'https://photo.haoxp.xyz:8197/' + person.fields.student_id + '.jpg'">
          <div><span class="title-caption">名字是：</span>{{person.fields.name}}</div>
          <div><span class="title-caption">代号：</span>{{person.fields.student_id}}</div>
          <div><span class="title-caption">学：</span>{{person.fields.major}}</div>
          <div><span class="title-caption">最想去：</span>{{person.fields.inclination_one}}</div>
          <div><span class="title-caption">也想去：</span>{{person.fields.inclination_two}}</div>
          <div><span class="title-caption">是：</span>{{person.fields.gender}}</div>
          <div><span class="title-caption">移动设备：</span>{{person.fields.phone_number}}</div>
        </el-card>
      </el-col>
      <el-table  highlight-current-row 
        fit v-if="!imageOn" :data="allUsers"
        @current-change="handleChange">
        <el-table-column sortable prop="fields.name" label="TA的名字">
        </el-table-column>
        <el-table-column sortable prop="fields.major" label="TA的专业"></el-table-column>
        <el-table-column sortable
           prop="fields.inclination_one" :filters="departFilter" :filter-method="filterDepart"
           label="最想去"></el-table-column>
        <el-table-column sortable :filters="departFilter" :filter-method="filterDepart" prop="fields.inclination_two" label="还想去"></el-table-column>
        <el-table-column sortable :formatter="splitPhone" prop="fields.phone_number" label="移动设备"></el-table-column>
        <el-table-column sortable prop="fields.gender" label="性别"></el-table-column>
      </el-table>
    </el-row>
    <el-dialog title="详细的信息" v-model="dialogPerson">
      <div v-if="selectedPerson">
        <el-row>
          <el-col :span="19">
            <p>大家好，我叫{{selectedPerson.fields.name}}, 性别{{selectedPerson.fields.gender}}, 手机号是{{selectedPerson.fields.phone_number}}，
              现在在{{selectedPerson.fields.major}}读{{selectedPerson.fields.grade}}。 
              填写报名表用了{{selectedPerson.fields.time_spend | getTime}} 我的邮箱是 {{selectedPerson.fields.mail_address}}
              我的Box作品：{{selectedPerson.fields.share_work | filterPhoto}}
            </p>
            <p>
              <el-tag type="primary">{{selectedPerson.fields.inclination_one}}</el-tag>
              <el-tag type="primary">{{selectedPerson.fields.inclination_two}}</el-tag>
            
              <el-tag type="danger"><i @click="addStar" style="color: #e74c3c" class="el-icon-star-on">
                  我喜欢 {{selectedPerson.fields.star_amount}}
                </i></el-tag>
                <el-button size="small" type="danger" @click="deleteHim">不想要他了</el-button>
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
    </el-dialog>
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
      'detailURL',
      'manageURL',
      'deleteURL',
      'deletedPersons'
    ])
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
  data () {
    return {
      msg: '你想要的，我都有',
      imageOn: false,
      departFilter: [
        {text: '推广与策划中心', value: '推广与策划中心'},
        {text: '技术研发中心', value: '技术研发中心'},
        {text: '视频团队', value: '视频团队'},
        {text: '人力资源部门', value: '人力资源部门'},
        {text: '设计与视觉中心', value: '设计与视觉中心'},
        {text: '新闻与资讯中心', value: '新闻与资讯中心'},
        {text: '水朝夕工作室', value: '水朝夕工作室'},
        {text: '产品运营部门', value: '产品运营部门'},
        {text: '摄影部', value: '摄影部'}
      ],
      dialogPerson: false,
      selectedPerson: '',
      loading: false
    }
  },
  created: function () {
    let self = this
    if (this.getToken === '') {
      this.$message.error('对不起我不知道你是谁，我也不想和你说话')
      this.$router.push('/login')
    } else if (self.allUsers.length > 0) {
      return
    } else {
      self.loading = true
      self.loadData()
    }
  },
  methods: {
    ...mapMutations([
      'getUserData',
      'setUserData',
      'setDeleted'
    ]),
    loadData: function () {
      let self = this
      axios.get(this.detailURL, {
        params: {
          cookie: self.getToken,
          exclude: 1
        }
      }).then(
        response => {
          console.log(response.data)
          self.setUserData(response.data.reverse())
          self.loading = false
          self.$message('成功获得重要数据')
        }
      )
    },
    deleteHim: function () {
      let self = this
      let form = new FormData()
      form.append('cookie', this.getToken)
      form.append('student_id', this.selectedPerson.fields.student_id)
      form.append('recover', '0')
      axios.post('https://joinus.zjuqsc.com/api/delete', form).then(
        response => {
          console.log(response.data)
          if (response.data.message === 'OK') {
            let newUser = self.allUsers.filter(
              eachPerson => {
                return eachPerson.pk !== self.selectedPerson.pk
              }
            )
            self.setUserData(newUser)
            self.dialogPerson = false
          }
        }
      )
    },
    handleErrorPhoto: function (e) {
      let element = e.currentTarget
      element.src = 'https://photo.haoxp.xyz:8197/error.jpg'
    },
    splitPhone: function (row, column) {
      return row.fields.phone_number.slice(0, 3) + '-' +
        row.fields.phone_number.slice(3, 7) + '-' +
        row.fields.phone_number.slice(7, 11)
    },
    filterDepart: function (value, row) {
      return row.fields.inclination_one === value
    },
    showDetail: function () {
      this.dialogPerson = !this.dialogPerson
    },
    handleChange: function (val) {
      let self = this
      if (this.getToken === '') {
        this.$message.error('对不起我不知道你是谁，我也不想和你说话')
        // this.$router.push('/login')
      } else {
        axios.get(this.detailURL, {
          params: {
            cookie: self.getToken,
            student_id: val.fields.student_id
          }
        }).then(
          response => {
            self.selectedPerson = response.data[0]
            self.dialogPerson = true
          }
        )
      }
    },
    addStar: function () {
      console.log('asdfasdf')
      let self = this
      let form = new FormData()
      form.append('cookie', self.getToken)
      form.append('star', '1')
      form.append('student_id', self.selectedPerson.fields.student_id)
      axios.post(this.manageURL, form).then(
        response => {
          if (response.data.message === 'OK') {
            self.selectedPerson.fields.star_amount += 1
          }
        }
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.title-caption{
  color: #95a5a6;
  font-size: 0.8rem;
}
</style>
