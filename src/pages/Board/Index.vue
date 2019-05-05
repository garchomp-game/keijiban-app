<template lang="pug">
v-ons-page
  Navigation(@logout="logout" :hideBack="true" @pull="pull")
  v-ons-search-input(placeholder="掲示板を検索する" v-model="search" style="margin-bottom: 15px;")
  Paginate(
    :page-count="20"
    :prev-text="'Prev'"
    :next-text="'Next'"
  )
  v-ons-list
    v-ons-list-item(
    v-for="(list, key, index) in lists"
    :key="index"
    @click="ChatIndex(key)"
    )
      .center
        span.list-item__title {{ list.title }}
        span.list-item__subtitle {{ list.description }}
  v-ons-button(@click="BoardCreate") 掲示板新規作成
</template>
<script>
import firebase from 'firebase/app'
import 'firebase/database'
import Paginate from 'vuejs-paginate'
import BoardCreate from './Create'
import ChatIndex from '../Chat/Index'
import Navigation from '../../components/Navigation'
export default {
  name: 'Index',
  data () {
    return {
      lists: [],
      search: '',
      pageNum: 10,
      currentPage: 1,
      pageList: []
    }
  },
  components: {
    Paginate,
    BoardCreate,
    ChatIndex,
    Navigation
  },
  created: function () {
    this.database = firebase.database()
    this.boardRef = this.database.ref('board')
    this.boardRef.on('value', (res) => {
      var pageList = {}
      var count = 1
      for (let i = 0; i < Object.entries(res.val()).length; i += this.pageNum) {
        let page = Object.entries(res.val()).slice(i, i + this.pageNum)
        let currentPageList = {}
        page.forEach(function (val) {
          currentPageList[val[0]] = val[1]
        })
        pageList[count] = currentPageList
        count++
      }
      this.pageList = pageList
      this.lists = pageList[this.currentPage]
    })
  },
  methods: {
    functionName (pageNum) {
      this.lists = this.pageList[pageNum]
    },
    pull () {
      this.$emit('pop')
    },
    BoardCreate: function () {
      this.$emit('push', BoardCreate)
    },
    logout () {
      firebase.auth().signOut().then(() => {
        this.$store.commit('user/logout')
        this.$emit('reset')
      })
    },
    ChatIndex (boardId) {
      this.$emit('push', {
        extends: ChatIndex,
        onsNavigatorProps: {
          boardId: boardId
        }
      })
    }
  }
}
</script>
<style lang="css">
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: blue;
}
.pagination {
  margin: 5% 25%;
}
.page-item.active {
  border-radius: 0px;
  position: static !important;
  background-color: #ed6528 !important;
}
</style>
