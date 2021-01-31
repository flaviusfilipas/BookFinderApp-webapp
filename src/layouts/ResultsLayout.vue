<template>
  <!--TODO move header into separate component -->
   <q-layout view="hHh lpR fFf">
     <app-header class="bg-primary text-white" revealHeader include-searchbar include-toolbar-title></app-header>
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
import AppHeader from 'components/layout/AppHeader.vue'
export default {
  data () {
    return {
      current: 1
    }
  },
  components: { AppHeader }
}
</script>

<style>
</style>
