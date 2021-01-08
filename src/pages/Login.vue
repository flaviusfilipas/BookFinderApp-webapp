<template>
 <q-layout view="hHh lpR fFf">
     <q-page-container>
       <q-page class="flex flex-center">
            <h1 class="text-primary">Login</h1>
            <img src = "../assets/logo.png"  />

       </q-page>
        <q-pagination
              class="fixed-center"
              :max="5"
              :direction-links="true">
            </q-pagination>
     </q-page-container>

  </q-layout>

</template>
<script>
export default {
  data () {
    return {
      imgSource: require('../assets/logo.png')
    }
  }
}
</script>

<style scoped>
  .q-pagination{
    justify-content: center;
  }
</style>
