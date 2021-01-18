<template>
  <!--TODO move header into separate component -->
   <q-layout view="hHh lpR fFf">
      <q-header reveal class="bg-primary text-white"  height-hint="98">
      <q-toolbar>
        <q-toolbar-title class="icon" @click="goToLandingPage">
          <q-avatar>
            <img src="../assets/logo.png">
          </q-avatar>
          Bookify
        </q-toolbar-title>
        <q-space/>

        <q-tabs >
        <q-input class="strect" dark dense standout v-model="text" input-class="text-right">
          <template v-slot:append>
            <q-icon v-if="text === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="text = ''" />
          </template>
        </q-input>
        <q-route-tab
            to="/login"
            icon="account_circle"
            label="Login"/>
           <q-route-tab
            to="/wishlist"
            icon= "favorite_border"
            label= "Wishlist"/>
        </q-tabs>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
    <q-pagination class="relative-bottom justify-center"
          v-model="current"
          :max="5"
          :direction-links="true">
      </q-pagination>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
      text: '',
      current: 1
    }
  },
  methods: {
    goToLandingPage () {
      this.$router.push({ path: '/search' })
    }
  }
}
</script>

<style>
  .icon{
    cursor: pointer;
  }

</style>
