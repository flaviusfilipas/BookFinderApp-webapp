<template>
  <q-page class="flex flex-center">
      <div class="column">
          <div class="column items-center">
            <div class="row justify-center">
                <img class="logo-image" src="../assets/logo.png">
                <div class="logo-text text-h2 q-mt-lg">
                  Bookify
                </div>
            </div>
            <div class="logo-text row text-h4 text-italic q-mb-xl">
                 Compare book prices from major providers
            </div>
          </div>
        <q-input
          class="text-white"
          autofocus
          dark
          rounded
          outlined
          v-model="search"
          placeholder="Search By Title, ISBN, Author or Keyword"
          @keyup.enter="searchBooks">
          <template v-slot:append>
            <q-btn round flat icon="search" @click = "searchBooks"/>
          </template>
        </q-input>
      </div>
  </q-page>
</template>

<script>
// import { mapActions } from 'vuex'
export default {
  data () {
    return {
      search: ''
    }
  },
  methods: {
    searchBooks () {
      this.showLoading()
    },
    // getDrinks () {
    //   return this.$axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita')
    //     .then(response => response.data)
    // },
    // ...mapActions('booksStore', ['saveDrinks']),
    showLoading () {
      this.$q.loading.show({
        message: 'Searching books'
      })
      setTimeout(() => {
        this.$q.loading.hide()
        this.$router.push('results')
      }, 3000)

      // this.getDrinks()
      //   .then(response => {
      //     this.saveDrinks(response, response)
      //     this.$q.loading.hide()
      //     this.$router.push('results')
      //   })
    }
  }
}

</script>
<style scoped>
  .q-page {
    /* background: linear-gradient(to left, #000000, #434343); */
    background: linear-gradient(145deg,#1976d2 11%,#0f477e 75%)
  }
  .logo-image{
    height: 10em;
  }
  .logo-text{
    align-self: center;
    color:white;
  }
  @media(min-width: 757px){
    .q-input{
      width: 700px;
    }

    /* .logo-image{
      height: 10em;
    } */
  }
</style>
