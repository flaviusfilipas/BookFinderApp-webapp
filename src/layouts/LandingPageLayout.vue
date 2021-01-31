<template>
  <q-layout view="hHh lpR lfr">
    <q-header>
      <navigation-tabs class="absolute-top-right"></navigation-tabs>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import NavigationTabs from 'components/layout/NavigationTabs.vue'
export default {
  components: { NavigationTabs }
}
</script>
<style>

</style>
