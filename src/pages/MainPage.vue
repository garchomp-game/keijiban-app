<template lang="pug">
</template>
<script>
import BoardIndex from './Board/Index'
import firebase from 'firebase/app'
import 'firebase/auth'

export default {
  name: 'MainPage',
  components: {
    BoardIndex
  },
  created () {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.$emit('pop')
      }
    })
  },
  methods: {
    push (page) {
      this.$emit('push', page)
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
