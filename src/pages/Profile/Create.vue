<template lang="pug">
v-ons-page
  Navigation(centerMessage="ユーザー登録")
  v-ons-list
    v-ons-list-item
      label.left.label-left 名前
      v-ons-input.left-margin(v-model="name" placeholder="名前")
    v-ons-list-item
      label.left.label-left 年齢
      v-ons-select.left-margin(v-model="age" placeholder="年齢")
        option(v-for="age in ages" :value="age.value") {{ age.value }}
    v-ons-list-item
      label.left.label-left 自己紹介
      textarea.left-margin.textarea(v-model="description" placeholder="自己紹介")
    v-ons-list-item
      v-ons-button(modifier="large" @click="createProfile") 登録する
</template>
<script>
import Navigation from '../../components/Navigation'
import firebase from 'firebase/app'
import 'firebase/firestore'
export default {
  name: 'Create',
  components: {
    Navigation
  },
  data: () => ({
    ages: [],
    age: 1,
    name: '',
    description: ''
  }),
  created () {
    for (var i = 0; i < 120; i++) {
      this.ages.push({
        value: i
      })
    }
  },
  methods: {
    createProfile () {
      let db = firebase.firestore()
      let userId = this.$store.state.user.data.uid
      db.collection('users').doc(userId).set({
        name: this.name,
        age: this.age,
        description: this.description
      })
      .then(() => {
        console.log('Document successfully written!')
        this.$emit('pop')
      })
      .catch((error) => {
        console.error('Error writing document: ', error)
      })
    }
  }
}
</script>
<style lang="sass" scoped>
  .left-margin
    margin-left: 25px
</style>
