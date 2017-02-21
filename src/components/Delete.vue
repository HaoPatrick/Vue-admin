<template>
 <el-col :span="19" style="margin-left: 20px; padding-bottom: 6rem;">
    <h1>{{ msg }}</h1>
      <el-table v-if="deletedPersons"  highlight-current-row 
        fit :data="deletedPersons"
        >
        <el-table-column sortable prop="fields.name" label="TA的名字">
        </el-table-column>
        <el-table-column sortable prop="fields.major" label="TA的专业"></el-table-column>
        <el-table-column sortable prop="fields.inc_one" label="最想去"></el-table-column>
        <el-table-column sortable prop="fields.inc_two" label="还想去"></el-table-column>
        <el-table-column sortable prop="fields.phone_number" label="移动设备"></el-table-column>
        <el-table-column sortable label="恢复">
          <template scope="scope">
            <el-button @click="handleRecover(scope.$index, scope.row)" size="small">恢复他</el-button>
          </template>
        </el-table-column>
      </el-table>
 </el-col>
</template>

<script>
import {mapGetters, mapMutations} from 'vuex'
import axios from 'axios'
export default {
  name: 'hello',
  computed: {
    ...mapGetters([
      'deleteURL',
      'getToken',
      'recycleURL',
      'allUsers',
      'deletedPersons'
    ])
  },
  created: function () {
    let self = this
    let form = new FormData()
    form.append('cookie', self.getToken)
    axios.get(self.recycleURL, form).then(
      response => {
        self.setDeleted(response.data.person)
      }
    )
  },
  data () {
    return {
      msg: '遗忘之地'
    }
  },
  methods: {
    ...mapMutations([
      'setDeleted',
      'setUserData'
    ]),
    handleRecover: function (index, row) {
      let self = this
      console.log(row)
      let form = new FormData()
      form.append('cookie', self.getToken)
      form.append('student_id', row.fields.student_id)
      form.append('recover', '1')
      axios.post(self.deleteURL, form).then(
        response => {
          console.log(response.data)
          if (response.data.message === 'OK') {
            let newUser = self.allUsers
            newUser.push(row)
            self.setUserData(newUser)

            let newDeleted = self.deletedPersons.filter(
              eachPerson => {
                return eachPerson.pk !== row.pk
              }
            )
            self.setDeleted(newDeleted)
          }
        }
      )
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
