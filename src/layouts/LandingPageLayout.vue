<template>
  <q-layout view="hHh lpR lfr">
    <q-header>
         <q-tabs class="absolute-top-right">
           <q-route-tab
            v-if = 'loggedIn'
            to="/watchlist"
            icon= "visibility"
            label= "Watchlist"
           />
            <q-route-tab
            v-if = '!loggedIn'
            to="/login"
            icon="account_circle"
            label="Login"
           />
           <q-route-tab
            v-if = 'loggedIn'
            exact
             to="/"
            @click="logOut"
            icon="account_circle"
            label="Logout"/>
         </q-tabs>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
    }
  },
  methods: {
    ...mapActions('authStore', ['logoutUser']),
    logOut () {
      this.logoutUser()
    }
  },
  computed: {
    ...mapState('authStore', ['loggedIn'])
  }
}
</script>
<style>

</style>
