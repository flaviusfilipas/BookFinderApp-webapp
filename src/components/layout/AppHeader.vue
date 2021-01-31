<template>
   <q-header >
      <q-toolbar>
        <q-toolbar-title :class= "[includeToolbarTitle ? 'cursor-pointer' : 'hidden' ]" @click= "goToLandingPage">
          <q-avatar>
            <img src="../../assets/logo.png">
          </q-avatar>
          Bookify
        </q-toolbar-title>
        <navigation-tabs :includeSearchbar="includeSearchbar"></navigation-tabs>
      </q-toolbar>
    </q-header>
</template>

<script>
import NavigationTabs from './NavigationTabs.vue'
export default {
  components: { NavigationTabs },
  props: {
    includeSearchbar: {
      type: Boolean,
      default: false
    },
    revealHeader: {
      type: Boolean,
      default: false
    },
    includeToolbarTitle: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goToLandingPage () {
      this.$router.push({ path: '/search' })
    }
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
