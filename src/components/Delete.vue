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
        <el-table-column sortable prop="fields.gender" label="性别"></el-table-column>
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
      'deletedPersons'
    ])
  },
  created: function () {
    let self = this
    let form = new FormData()
    if (self.deletedPersons !== []) return
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
      'setDeleted'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
