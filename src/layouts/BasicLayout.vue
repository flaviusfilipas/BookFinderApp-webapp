<template>
  <!--TODO move header into separate component -->
   <q-layout view="hHh lpR fFf">
      <q-header reveal class="bg-primary text-white">
      <q-toolbar>
        <q-toolbar-title class="icon" @click="goToLandingPage">
          <q-avatar>
            <img src="../assets/logo.png">
          </q-avatar>
          Bookify
        </q-toolbar-title>
        <q-tabs >
        <q-input class="header-searchbar" dark dense standout v-model="text">
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
        <q-route-tab
            v-if = 'loggedIn'
            exact
             to="/"
            @click="logOut"
            icon="account_circle"
            label="Logout"/>
        </q-tabs>
      </q-toolbar>
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
      text: ''
    }
  },
  methods: {
    ...mapActions('authStore', ['logoutUser']),
    logOut () {
      this.logoutUser()
    },
    goToLandingPage () {
      this.$router.push({ path: '/search' })
    }
  },
  computed: {
    ...mapState('authStore', ['loggedIn'])
  }
}
</script>

<style scoped>
   .icon{
    cursor: pointer;
  }
  @media(max-width: 897px){
    .header-searchbar{
      display: none;
    }
  }
</style>
