<template lang="pug">
v-ons-page
  .toolbar
    .toolbar__left
      .toolbar-button(@click="BoardCreate") 掲示板を作成する
    .toolbar__center 新規作成
    .toolbar__right
      .toolbar-button(@click="pop") 戻る
  v-ons-list
    v-ons-list-item
      v-ons-input(placeholder="メールアドレス" v-model="email")
    v-ons-list-item
      v-ons-input(placeholder="パスワード" v-model="password")
    v-ons-list-item
      v-ons-button(@click="signup") 登録
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/auth'
export default {
  name: 'Create',
  data: () => ({
    email: '',
    password: '',
    sendFlg: false
  }),
  methods: {
    pop () {
      this.$emit('pop')
    },
    signup () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
      .then((res) => {
        this.$emit('pop')
        this.sendFlg = true
      })
    }
  }
}
</script>
<style lang="sass" scoped>
</style>
