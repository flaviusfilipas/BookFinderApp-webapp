<template>
   <q-layout view= "hhr Lpr lFr">
    <q-header reveal class="bg-primary text-white" height-hint="98">
    <!-- <div class="header"> -->
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
    <q-drawer bordered show-if-above v-model="left" side="left" behavior="desktop">
        <q-list padding>
          <q-item-label class="q-ml-sm q-mb-sm text-h6">
            Autors
          </q-item-label>
          <q-option-group
            class="q-mb-sm"
            :options="authors"
            v-model="optAuthors"
             color="blue"
            type="checkbox"/>
          <q-item-label class="q-ml-sm q-mb-sm text-h6">
            Publishers
          </q-item-label>
          <q-option-group
          :options="publishers"
          v-model="optPublishers"
          color="blue"
          type="checkbox"
          />
        </q-list>
    </q-drawer>
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
      left: true,
      text: '',
      current: 1,
      optAuthors: ['yuval'],
      optPublishers: ['Gotham']
    }
  },
  methods: {
    goToLandingPage () {
      this.$router.push('search')
    }
  },
  computed: {
    authors () {
      return this.$store.getters['booksStore/getAuthors']
    },
    publishers () {
      return this.$store.getters['booksStore/getPublishers']
    }
  }
}
</script>

<style>
  .icon{
    cursor: pointer;
  }
</style>
