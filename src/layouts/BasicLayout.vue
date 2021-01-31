<template>
   <q-layout view="hHh lpR fFf">
      <app-header class="bg-primary text-white" revealHeader include-toolbar-title include-searchbar></app-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import AppHeader from 'components/layout/AppHeader'
export default {
  components: { AppHeader }
}
</script>

<style>
</style>
