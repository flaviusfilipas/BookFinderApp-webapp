<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
        <q-page class="flex flex-center">
             <q-list bordered padding>
               <q-item v-for="drink in booksResults" :key="drink.id">
                  <q-item-section top thumbnail class="q-ml-none">
                  <img :src="drink.strDrinkThumb">
                  </q-item-section>
                  <q-item-section>
                    <q-item-label v-text="drink.strDrink"></q-item-label>
                    <q-item-label v-text="drink.strInstructions" caption></q-item-label>
                  </q-item-section>
               </q-item>
             </q-list>
        </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  data () {
    return { name: 'Books Result' }
  },
  computed: {
    booksResults () {
      return this.$store.getters['booksStore/getDrinks']
    }
  }
}

</script>
<style scoped>

</style>
