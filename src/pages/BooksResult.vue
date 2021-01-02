<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
        <q-page class="flex flex-center">
            <h1 class="text-primary">{{name}}</h1>
        </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return { name: 'Books Result' }
  }
}

</script>
<style scoped>

</style>
