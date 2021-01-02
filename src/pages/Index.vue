<template>
  <q-page class="flex flex-center">
    <!-- <div class="text-h2 text-grey-5" style="padding-right:10px">Search Books</div> -->
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
export default {
  name: 'PageIndex',
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
    showLoading () {
      if (this.search !== '') {
        this.$q.loading.show({
          message: 'Searching books'
        })

        this.timer = setTimeout(() => {
          this.$q.loading.hide()
          this.timer = undefined
          this.$router.push('results')
        }, 3000)
      }
    }
  }
}

</script>
<style scoped>
  .q-page {
    background: linear-gradient(to left, #000000, #434343);
  }
</style>
