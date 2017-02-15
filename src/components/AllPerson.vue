<template>
  <div>
    <h1 @click="getUserData">{{ msg }}</h1>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'hello',
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
