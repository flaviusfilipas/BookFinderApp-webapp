<template>
  <q-tabs>
    <q-input :class= "[includeSearchbar ? 'header-searchbar stretch' : 'hidden']"
      dark
      dense
      standout
      v-model="searchText"
      placeholder="Search By Title, ISBN, Author or Keyword"
      @keyup.enter="search">
      <template v-slot:append>
        <q-icon v-model='searchText' name="search" @click='search' />
        <!-- <q-icon v name="clear" class="cursor-pointer" @click="text = ''" /> -->
      </template>
    </q-input>
      <q-route-tab
        v-if = 'loggedIn'
        exact
        to="/watchlist"
        icon= "visibility"
        label= "Watchlist"/>
    <q-route-tab
        v-if = '!loggedIn'
        exact
        to="/login"
        icon="account_circle"
        label="Login"/>
     <user-account-avatar v-if = 'loggedIn'/>
    </q-tabs>
</template>

<script>
import UserAccountAvatar from './UserAccountAvatar.vue'
import { mapState, mapActions } from 'vuex'
export default {
  components: { UserAccountAvatar },
  props: {
    includeSearchbar: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      text: '',
      searchText: ''
    }
  },
  methods: {
    ...mapActions('booksStore', ['searchBooks']),
    search () {
      this.searchBooks(this.searchText)
    }
  },
  computed: {
    ...mapState('authStore', ['loggedIn'])
  }
}
</script>

<style scoped>
  @media(max-width: 897px){
    .header-searchbar{
      display: none;
    }
 }
</style>
