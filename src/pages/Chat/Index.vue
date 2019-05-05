<template lang="pug">
v-ons-page
  Navigation(@logout="logout" @pull="pull")
  h1 chat index
  .page-wrapper
    .lists-wrapper
      p(v-if="!lists") まだ何も投稿されていません
      v-ons-list.list-wrapper.scrollingContainer(v-else v-chat-scroll="")
        v-ons-list-item(v-for="(item, index) in lists" :key="index")
          .center
            span.list-item__subtitle {{ item.name }}
            span.list-item__title.font-comment {{ item.comment }}
    .comment-wrapper
      .flex-wrapper
        textarea(v-model="comment" class="textarea" placeholder="コメントを書く…")
        v-ons-button.custom-button(@click="submitComment") 送信
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/firestore'
import Navigation from '../../components/Navigation'
import formatDate from '../../library/formatDate.js'
export default {
  name: 'ChatIndex',
  data: () => ({
    lists: [],
    comment: ''
  }),
  mixins: [formatDate],
  props: {
    boardId: {
      type: String,
      default: ''
    }
  },
  components: {
    Navigation
  },
  created () {
    this.database = firebase.database()
    this.chatRef = this.database.ref('chat')
    this.database.ref('chat').orderByChild('createdAt').on('value', (res) => {
      var lists = []
      var values = Object.entries(res.val())
      values.forEach((items) => {
        let item = items[1]
        if (item.boardId === this.boardId) {
          lists.push(item)
        }
      })
      this.lists = lists
    })
  },
  computed: {
    userId: function () {
      return this.$store.state.user.data.uid
    },
    user: function () {
      return this.$store.state.user.data
    }
  },
  methods: {
    submitComment () {
      console.log(this.getFormatDate(new Date(), 'YYYY/mm/dd hh:mm:ss'))
      let db = firebase.firestore()
      let usersRef = db.collection('users')
      .doc(this.user.uid)
      usersRef.get()
      .then(res => {
        this.chatRef.push({
          name: res.data().name,
          userId: this.user.uid,
          boardId: this.boardId,
          comment: this.comment,
          createdAt: this.getFormatDate(new Date(), 'YYYY/mm/dd hh:mm:ss')
        })
        this.comment = ''
      })
    },
    pull () {
      this.$emit('pop')
    },
    logout () {
      firebase.auth().signOut().then(() => {
        this.$store.commit('user/logout')
        this.$emit('reset')
      })
    }
  }
}
</script>
<style lang="sass" scoped>
.page-wrapper
  position: relative
  height: 90vh
  .list-wrapper
    overflow: scroll
    height: 70vh
  .comment-wrapper
    height: 20vh
    position: absolute
    bottom: 0
    left: 0
    .flex-wrapper
      display: flex
      .textarea
        width: 80vw
      .custom-button
        width: 20vw
  .font-comment
    font-size: 16px
</style>
