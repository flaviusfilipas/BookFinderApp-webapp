<template>
  <q-tabs>
    <q-input :class= "[includeSearchbar ? 'header-searchbar stretch' : 'hidden']" dark dense standout v-model="text">
      <template v-slot:append>
        <q-icon v-if="text === ''" name="search" />
        <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
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
import { mapState } from 'vuex'
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
      text: ''
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
