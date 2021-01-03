<template>
  <q-page class="flex flex-center">
      <!-- <div class="text-h2 text-grey-5">Search Books</div> -->
      <q-input
        autofocus
          dark
          rounded
          outlined
          v-model="search"
          placeholder="Search Books"
          @keyup.enter="searchBooks"
      >
       <template v-slot:after>
          <q-btn round dense flat icon="search" @click = "searchBooks"/>
        </template>

        </q-input>

  </q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      search: '',
      providerName: '',
      providerList: ['Carturesti', 'Libris', 'Elefant']
    }
  },
  methods: {
    searchBooks () {
      this.showLoading()
    },
    getDrinks () {
      return this.$axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
        .then(response => response.data)
    },
    ...mapActions('booksStore', ['saveDrinks']),
    showLoading () {
      this.$q.loading.show({
        message: 'Searching books'
      })
      this.getDrinks()
        .then(response => {
          this.saveDrinks(response, response)
          this.$q.loading.hide()
          this.$router.push('results')
        })
    }
  }
}

</script>
<style scoped>
  .q-page {
    background: linear-gradient(to left, #000000, #434343);
  }
</style>
