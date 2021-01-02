<template>
  <q-layout view="hHh lpR lfr">
    <q-header>
         <q-tabs class="absolute-top-right">
           <q-route-tab
            to="/login"
            icon="account_circle"
            label="Login"
           />
           <q-route-tab
            to="/wishlist"
            icon= "favorite_border"
            label= "Wishlist"
           />
           <q-route-tab
            to="/help"
            icon="help_outline"
            label="Help"
           />
         </q-tabs>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
