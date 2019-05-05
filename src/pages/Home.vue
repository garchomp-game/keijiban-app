<template lang="pug">
  v-ons-page
    v-ons-card
      .title ようこそなりきり掲示板へ！
      v-ons-list
        v-ons-list-item
          p なりきり界隈が気兼ねなく利用できる掲示板があったらいいなと思い作成しました！もう一人の自分の生活をここから始めましょう！
      .content
        p(style="color:red") {{ error_message }}
        v-ons-list
          v-ons-list-item
            v-ons-input(v-model="email" placeholder="メールアドレス")
          v-ons-list-item
            v-ons-input(v-model="password" type="password" placeholder="パスワード")
          v-ons-list-item
            v-ons-button(
              modifier="large"
              @click="login"
            ) ログインする
          v-ons-list-item
            button(
              class="button button--outline"
              style="margin-bottom: 5px"
              @click="createUser"
            ) 新規登録の方はこちら
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import CreateUser from './User/Create'
import BoardIndex from './Board/Index'
import ProfileCreate from './Profile/Create'

export default {
  name: 'Home',
  data () {
    return {
      finishLoad: false,
      email: '',
      password: '',
      error_message: '',
      user: {},
      resultValue: false
    }
  },
  created () {
    this.error_message = ''
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user
      this.finishLoad = true
      this.$store.commit('user/login', this.user)
      if (this.user) {
        this.getCurrentUser(user)
        .then((res) => {
          if (res) {
            this.$emit('push', BoardIndex)
          } else {
            this.$emit('push', ProfileCreate)
          }
        })
      }
    })
  },
  computed: {
    hasLogin: function () {
      return this.$store.state.user.hasLogin
    }
  },
  methods: {
    async getCurrentUser (user) {
      let db = firebase.firestore()
      var userDocRef = db.collection('users').doc(user.uid)
      const doc = await userDocRef.get()
      if (doc) {
        return true
      } else {
        return false
      }
    },
    createUser () {
      this.error_message = ''
      this.$emit('push', CreateUser)
    },
    login () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
      .then((res) => {
        this.error_message = ''
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-email') {
          this.error_message = 'メールアドレスが存在しません。'
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
