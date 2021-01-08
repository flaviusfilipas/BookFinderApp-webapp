<template>
  <q-page class ="flex flex-center">
      <div class="column">
        <h2 class="text-grey-5">Search Books</h2>
        <q-input
          class="text-cyan-13"
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
    background: linear-gradient(to left, #000000, #434343);
  }
  @media(min-width: 757px){
    h2{
      margin-left: 135px;
    }
    .q-input{
      width: 700px;
    }
  }
</style>
