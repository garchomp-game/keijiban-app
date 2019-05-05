<template lang="pug">
v-ons-page
  .toolbar
    .toolbar__left
    .toolbar__center 掲示板作成
    .toolbar__right(@click="pull")
      span.toolbar-button 戻る
  v-ons-list
    v-ons-list-item
      v-ons-input(placeholder="タイトル" v-model="title")
    v-ons-list-item
      v-ons-input(placeholder="説明文" v-model="description")
    v-ons-button(modifier="large" @click="createBoard") 新規作成する
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/database'
export default {
  name: 'Create',
  data () {
    return {
      database: firebase.database(),
      lists: [],
      title: '',
      description: ''
    }
  },
  created: function () {
    this.boardRef = this.database.ref('board')
  },
  methods: {
    pull () {
      this.$emit('pop')
    },
    createBoard () {
      this.boardRef.push({
        title: this.title,
        description: this.description
      })
      .then(() => {
        this.pull()
      })
    }
  }
}
</script>
<style lang="sass" scoped>
</style>
