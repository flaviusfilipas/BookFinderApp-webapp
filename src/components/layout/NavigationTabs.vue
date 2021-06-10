<template>
  <q-tabs>
    <searchbar :inputClass="includeSearchbar ? 'header-searchbar stretch' : 'hidden'"/>
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
import Searchbar from '../Searchbar.vue'
import { mapState } from 'vuex'
export default {
  components: { UserAccountAvatar, Searchbar },
  props: {
    includeSearchbar: {
      type: Boolean,
      default: false
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
