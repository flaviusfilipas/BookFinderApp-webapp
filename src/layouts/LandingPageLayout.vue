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
            to="/watchlist"
            icon= "visibility"
            label= "Watchlist"
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
